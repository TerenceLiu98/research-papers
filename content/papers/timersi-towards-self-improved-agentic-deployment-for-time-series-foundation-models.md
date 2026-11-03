---
title: "TIMERSI: Towards Self-Improved Agentic Deployment for Time-Series Foundation Models"
type: paper
authors:
  - Haoxin Liu
  - Deqing Fu
  - Lucheng Fu
  - Yiqiao Jin
  - Rushi Qiang
  - Harshavardhan Kamarthi
  - B. Aditya Prakash
year: null
repository: "https://github.com/haoxin1998/TimeRSI"
tags:
  - time-series-forecasting
  - foundation-models
  - llm-agents
  - model-deployment
---

## TL;DR

TIMERSI places a coding agent around a frozen time-series foundation model. The agent repeatedly edits and evaluates task-specific preprocessing, feature, context-selection, and post-processing code on completed historical windows; a separate selector then chooses among retained pipelines for each new forecast using performance on similar past conditions. On the reported 98 TIME and 100 FEV-bench tasks, the system improves over direct TimesFM 3.0 inference and ranks first in the authors' October 10, 2026 benchmark snapshot. The evidence supports feedback-guided pipeline adaptation, but the system uses labeled historical windows, incurs a substantial per-task search budget, and does not improve the coding agent or foundation-model weights themselves.

## Research Question

Can a coding agent use task descriptions and chronological forecast feedback to construct and deploy task-specific pipelines around a frozen time-series foundation model more accurately than direct inference or non-iterative pipeline search?

## Motivation

[[concepts/time-series-foundation-models|Time Series Foundation Models]] can forecast previously unseen datasets without task-specific weight updates, but effective deployment may still depend on domain structure such as holidays, tidal periods, calendar effects, or measurement resets. Encoding that structure by hand requires expertise, while plausible automatic changes can make forecasts worse. TIMERSI treats pipeline construction as an empirical code-revision problem and separates the search for useful strategies from the choice of which strategy to use under current conditions.

## Contributions

- Introduces an agentic deployment interface that lets a coding agent edit preprocessing, feature construction, context selection, and post-processing while keeping the forecasting backbone frozen.
- Uses earlier historical windows for iterative code revision and a separate later block for candidate selection, preserving chronological forecast boundaries.
- Retains several task-specific pipelines and selects among them per target and forecast origin using similarity-weighted errors from completed windows.
- Evaluates the design on all 198 tasks from TIME and FEV-bench, including a controlled comparison with non-iterative candidate generation and tests with different coding agents and forecasting backbones.
- Documents concrete pipeline strategies for calendar effects, tidal decomposition, holiday rules, daily-reset counters, damped trends, and auxiliary predictors.

## Method

**Editable deployment pipeline.** For a task description and the history available at a forecast origin, a pipeline calls a frozen forecasting model and returns point and quantile forecasts. The agent can transform observations, construct known-future or history-derived features, choose histories and variable groups, combine forecasts with auxiliary predictors, and correct outputs. The model weights remain fixed, although fixed pipeline code may fit task-specific transforms or predictors from the history available at each invocation.

**Iterative pipeline improvement.** Search begins from direct model inference. In each iteration, the agent proposes a code revision, runs it on completed adaptation windows, and receives aggregate scores, window-level errors, and execution logs. It can refine, combine, or replace earlier ideas while retaining access to previous code and evaluations. The default budget permits six candidate revisions.

**Separated candidate selection.** After search, later historical windows rank the candidates by mean MASE, with a quantile score as a tiebreaker. The portable configuration retains three candidates plus the direct-inference reference when needed. This separation prevents the same windows from directly serving both iterative revision and final candidate ranking.

**Adaptive deployment.** For each target at a new forecast origin, the selector describes recent history and the reference forecast with six level, trend, and forecast-shape features. It retrieves up to 12 similar completed records and selects the retained pipeline with the lowest similarity-weighted MASE relative to the reference. Each selected pipeline supplies the full horizon and all quantiles for that target. Once outcomes are completely observed, every retained pipeline's errors become eligible feedback for later origins; pipeline code stays fixed during deployment.

**Chronological boundary.** Candidate code receives no target values after the current forecast origin. Adaptation labels reach the agent only as evaluation feedback, and later deployment feedback is used only after the corresponding horizon has completed. The authors therefore characterize the full system as task-adapted deployment with a frozen backbone, not as wholly zero-shot forecasting.

## Experiments

**Benchmarks and metrics.** TIME contributes 98 tasks and 111,177 series-window-target instances; FEV-bench contributes 100 tasks, 1,308 windows, and 235,039 instances. TIME reports normalized MASE and CRPS, where lower is better. FEV-bench reports MASE, SQL, WQL, and WAPE skill scores relative to Seasonal Naive, where higher is better. The default system pairs TimesFM 3.0 with Claude Code (Claude Fable 5).

**Main reported results.** Relative to direct TimesFM 3.0 in the same environment, TIMERSI lowers TIME MASE from 0.639759 to 0.630011 (1.52%) and CRPS from 0.536328 to 0.527713 (1.61%). On FEV-bench, MASE Skill rises from 37.786% to 40.579% and SQL Skill from 48.984% to 51.243%. Its reported WQL and WAPE Skill scores are 55.759% and 44.788%. In the October 10, 2026 comparison snapshot, these results rank first across all six reported metrics.

**Feedback-guided revision ablation.** With the same number of candidate pipelines, non-iterative search scores 0.650 MASE and 0.549 CRPS on TIME, worse than direct inference at 0.640 and 0.536. TIMERSI scores 0.630 and 0.528. On FEV-bench, non-iterative search reaches 30.509% MASE Skill and 42.832% SQL Skill, versus 37.786% and 48.984% for direct inference and 40.579% and 51.243% for TIMERSI. This comparison supports using forecast errors to revise candidates rather than only generating and selecting them.

**Component generalization.** With TimesFM 3.0 fixed, an Antigravity/Gemini 3.8 Flash agent reaches 0.637 MASE and 0.532 CRPS on TIME. With the Claude agent fixed, TIMERSI improves Chronos-2 from 0.662/0.556 to 0.647/0.545 and LPTM from 0.669/0.572 to 0.641/0.549. These tests show gains beyond the default pairing, although the Claude Code-TimesFM 3.0 configuration remains strongest among those reported.

**Task cases.** Complete-task MASE reductions over direct TimesFM range from 2.22% for atmospheric variables to 69.07% for an auto-production seasonal-factor series. The parking trace is informative: a calendar-expert blend first worsens adaptation MASE from 0.9421 to 0.9578, after which the agent switches to calendar inputs; separate selection ultimately deploys a weekend-time interaction variant rather than the final revision or the lowest-adaptation-error variant. The COVID trace similarly selects a milder trend blend from later selection windows instead of the revision with the lowest adaptation error.

## Limitations

- TIMERSI depends on clear task and variable descriptions, and improvements on historical windows need not survive distribution shift.
- The pipeline search uses labeled historical adaptation windows. Frozen backbone weights do not make the full deployment process zero-shot.
- The default search allows six iterations, up to 256 agent turns, and a 90-minute timeout per task session. The comparison includes methods with different published configurations rather than a common compute budget.
- The public comparison is tied to an October 10, 2026 snapshot and benchmark-specific rules for missing results, pretraining overlap, and hidden entries. The TIME entry was accepted, while the reported FEV-bench submission had not yet been merged.
- The non-iterative ablation isolates feedback-guided revision within the authors' search design, but the end-to-end gains combine agent proposals, pipeline execution, candidate retention, and adaptive selection.
- The term recursive self-improvement is used for repeated improvement of external deployment code under a fixed agent, evaluator, interface, and forecasting backbone. It does not demonstrate improvement of the agent's own improvement mechanism or indefinite compounding.
- The supplied Markdown states no publication venue, DOI, arXiv identifier, or explicit manuscript year. These fields are not inferred. Source: Cognitio job `8e2e0973-13e7-48d1-8605-f6bd8aaf980a`.

## Related Concepts

- [[concepts/agentic-time-series-forecasting|Agentic Time Series Forecasting]]: treating forecasting as a controlled sequence of tool use, evaluation, and revision.
- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: pretrained numerical forecasters used as frozen backbones in TIMERSI.
- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]: a broader and stronger family of claims whose system boundary matters when interpreting TIMERSI.
- [[concepts/forecast-combination|Forecast Combination]]: using historical predictive performance to decide among multiple forecasting strategies.
- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time Series Forecasting]]: evaluating quantile forecasts with CRPS, SQL, and WQL in addition to point error.

## Related Papers

- [[papers/a-decoder-only-foundation-model-for-time-series-forecasting|A Decoder-Only Foundation Model for Time-Series Forecasting]] introduces TimesFM, the model family used as TIMERSI's default frozen backbone.
- [[papers/alphacast-a-human-wisdom-llm-intelligence-co-reasoning-framework-for-interactive-time-series-forecasting|AlphaCast: A Human Wisdom-LLM Intelligence Co-Reasoning Framework for Interactive Time Series Forecasting]] is a related agentic forecasting system organized around context gathering, generation, and reflection.
- [[papers/recursive-self-improvement-of-ai-research-agents|Recursive self-improvement of AI research agents]] edits an AI research agent's harness, providing a contrasting system boundary for recursive self-improvement.
- Fu et al. (2026), "TabFM-Auto: Self-Evolving Pipelines for Tabular Foundation Models," is the cited pipeline-search precedent around a frozen tabular model.

[[index|Library home]]
