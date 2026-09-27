---
title: "An Experimental Design Approach to Evaluating Agentic AI's Autonomous Model Discovery"
type: paper
authors:
  - Hao He
  - Xueying Liu
  - Chris J. Kuhlman
  - Xinwei Deng
year: null
source_job_id: 5271933b-e330-4e0b-b51a-9f9d644ba12e
tags:
  - llm-agents
  - model-discovery
  - experimental-design
  - cost-aware-evaluation
  - multivariate-analysis
---

## TL;DR

A factorial experiment treats coding agents as stochastic model-discovery operators and measures model quality, cost, and process jointly. Across 144 scheduled runs on networked anagram data, with 140 retained for analysis, higher requested reasoning effort increases resource use without a consistently significant primary-metric gain. Under a pre-specified utility that rewards standardized quality and penalizes standardized cost, effort has a negative linear slope in all eight agent-task-metric strata, significant after Holm correction in seven. These findings concern two agents on one task family, without repeated executions of identical configurations.

## Research Question

How do reasoning effort, optimization target, and discovery-data composition change the quality, cost, and process of autonomous model discovery, and does the dominant multivariate effort effect align with a chosen performance-cost utility?

## Motivation

An autonomous modeling agent selects features, model classes, validation procedures, and executable code through a stochastic search. A single benchmark score cannot show whether extra reasoning buys better models or simply more computation. Predicting individual actions and generating whole group trajectories also require different forms of adequacy, making joint evaluation of multiple metrics and resource outcomes useful.

## Contributions

- A full factorial design crosses agent, task, target metric, reasoning effort, held-out fold, and discovery-data regime, with isolated discovery workspaces and external scoring.
- Eight outcomes capture two quality measures, monetary cost, elapsed time, and four process measures within each agent-task-metric stratum.
- A pre-specified directed utility test is paired with [[concepts/utility-aligned-canonical-decomposition|Utility-Aligned Canonical Decomposition]] (UACD), separating inference about utility from a description of the dominant covariance-adjusted effort direction.
- The case study documents metric specialization, weak corrected evidence for primary-quality gains, increasing resource use, and failures of simulator validity and self-assessment.

## Method

**Discovery operators and design.** The paper reports Codex CLI v0.125 with GPT-5.5 and Claude Code with Claude Opus 4.7. Their native settings are mapped to within-agent low/default/max ladders: low/medium/xhigh for Codex and medium/high/max for Claude Code. These are ordinal controls, not equivalent compute doses across providers. Two agents, two tasks, two target metrics per task, three effort levels, three folds, and two data regimes yield 144 configurations, each executed once (Sections 3.1-3.2).

**Tasks and scoring.** The predictive task estimates the next action among idle, reply, request, and word formation. Its metrics are prevalence-weighted one-vs-rest AUC (wAUC) and mean relative improvement on rare observations (MRI-RO), which compares probability assigned to true non-idle actions against discovery-split class frequencies. The generative task constructs an executable agent-based simulator. KL6 averages KL divergences over six player-level summaries: replies received/sent, requests received/sent, words formed, and mean inter-event time. DLD is the Wasserstein-1 distance between real and simulated distributions of edit distances between consecutive words. Higher wAUC/MRI-RO and lower KL6/DLD are better. Both task metrics are scored regardless of which one the agent optimizes (Section 3.3).

**Isolation and validity.** Held-out sessions remain inaccessible during discovery; prediction inputs cannot include future actions. Each simulator is evaluated with 100 seeds per held-out session and retained only if at least 90% of trajectories obey the game inventory rules. Simulation seeds supply repeated trajectories, not independent model-discovery runs (Appendix A).

**Multivariate model.** Each stratum starts with 18 runs. The eight responses are primary and secondary quality scores, log10 dollar cost and elapsed seconds, and log10(1 + count) for registered models, registered features, logged decisions, and script length. Divergence scores are sign-flipped, and all responses are standardized within stratum. Multivariate regression uses linear effort contrasts (-1, 0, 1), quadratic contrasts (1, -2, 1), and fold/regime blocking terms (Section 4.1).

For standardized response vector $y$, the fixed utility is

$$
U=u^\top y,\qquad
u=(1/2,1/2,-1/2,-1/2,0,0,0,0)^\top.
$$

The directed test estimates $u^\top\hat\beta_L$, the linear effort slope of utility, with model-based t intervals and Holm correction over eight strata. The contrast assigns no direct value to the process coordinates. It expresses an explicit standardized quality-cost preference rather than a universal economic utility.

**Canonical description.** Pillai's trace tests the joint linear and quadratic effort effect. UACD solves $S_Ha=\lambda S_Ea$, where $S_H$ and $S_E$ are effort and residual sums of squares and cross-products. The leading unit-length direction is oriented toward increasing linear effort. Its concentration $\pi=\lambda_1/(\lambda_1+\lambda_2)$ and alignment $\eta=a_1^\top u$ describe the effect's shape. Covariance adjustment means $\eta$ is distinct from the raw utility slope; it does not replace that slope's inferential test (Section 4.2).

## Experiments

**Data and sample.** The dataset contains 28 five-minute sessions, 209 players, and 62,700 player-time records. Twenty-four sessions use rings and four use partial paths. Session-level folds contain 9, 9, and 10 sessions. Full discovery uses both non-held-out folds; partial discovery uses one selected cyclically. Four generative DLD runs fail the validity screen, leaving 70 valid runs per agent and 16 rather than 18 observations in each DLD stratum (Sections 3 and 5; Appendices A-B).

**Quality and utility.** Joint effort tests in pooled primary-metric regressions have p-values 0.075 (wAUC), 0.108 (MRI-RO), 0.926 (KL6), and 0.029 (DLD); none passes the four-test Bonferroni threshold of 0.0125 (Table 4). The directed utility results are stronger under the specified weights (Table 5):

| Condition | Agent | Utility slope | Model-based 95% CI | Holm-adjusted p |
| --- | --- | --- | --- | --- |
| Prediction / wAUC | Claude Code | -0.82 | [-1.41, -0.23] | 0.042 |
| Prediction / wAUC | Codex | -0.97 | [-1.23, -0.70] | <0.001 |
| Prediction / MRI-RO | Claude Code | -0.95 | [-1.33, -0.57] | <0.001 |
| Prediction / MRI-RO | Codex | -0.82 | [-1.27, -0.37] | 0.010 |
| Simulation / KL6 | Claude Code | -0.58 | [-1.02, -0.13] | 0.044 |
| Simulation / KL6 | Codex | -1.08 | [-1.42, -0.74] | <0.001 |
| Simulation / DLD | Claude Code | -0.95 | [-1.67, -0.23] | 0.044 |
| Simulation / DLD | Codex | -0.46 | [-1.04, +0.12] | 0.105 |

Slopes are per unit of the coded linear effort contrast. Codex/DLD is the exception to corrected significance. Pooling agents retains a significant directed effect in three of four conditions, again excluding DLD.

**Omnibus and canonical results.** Four of eight per-stratum Pillai tests are significant before correction, and none passes the eight-test Bonferroni threshold. The leading canonical share ranges from 0.84 to 0.99, and alignment is negative in all eight strata. Replacing dollar cost with fresh-token count preserves those negative alignment signs. The reported sign-test p-value of 0.008 assumes approximately independent signs despite shared agents, tasks, and folds; the authors treat this as descriptive support (Table 6).

**Resource use and specialization.** Median fresh tokens rise from 29.4k to 91.6k for Claude Code and 69.6k to 170.5k for Codex between the lowest and highest effort settings. Fresh tokens exclude cached input. Median candidate-model counts rise from 3 to 4 to 6 across effort levels. Optimizing a metric improves that metric descriptively relative to runs targeting the alternative, most strongly for MRI-RO. More discovery data shows its clearest advantage on KL6. Median reported costs are USD 0.60 for Codex and USD 4.19 for Claude Code, but Codex cost is imputed while Claude Code cost is provider-accounted; this is a historical deployment-cost comparison, not a controlled price contrast (Section 5.1; Appendices A-B).

**Self-assessment and failure.** Self-reports closely track external predictive scores, but simulator self-reports are often optimistic and sometimes use incompatible scales. All four excluded runs violate combinatorial game specifications. The most extreme, a maximum-effort Claude Code run costing USD 15.37, produces only 1 valid trajectory out of 900 despite a favorable internal check. Extra effort therefore does not guarantee simulator validity in this testbed (Appendix B).

## Limitations

- Each configuration is executed once. Regression inference relies on the factorial structure and model assumptions; it cannot directly estimate repeated-run variability at a fixed setting. Strata contain only 16 or 18 observations for eight response coordinates.
- All formal results condition on the 140 retained runs. Excluding invalid submissions limits interpretation as an evaluation of overall deployment reliability.
- Utility conclusions depend on equal standardized rewards for two quality measures and penalties for two costs. Alternative utility weights were not systematically tested. Weak primary-metric significance does not establish zero quality benefit.
- Leading canonical directions are weakly identified in the authors' bootstrap analysis. Their alignment signs are descriptive, and shared folds and tasks undermine exact independence for the sign test.
- The 18 Codex predictive full-regime runs use earlier prompt wording, exactly aligned with their full/partial split. Their data-regime comparison cannot isolate a causal data-volume effect. Wording is held constant across effort levels within those runs.
- Only two agents and one discovery domain are tested. Provider effort settings are not directly comparable, and imputed versus metered accounting constrains cross-agent cost conclusions.
- The supplied Markdown gives no publication year, venue, DOI, or paper identifier. `year` remains null. It mentions a public repository but supplies no usable repository URL.

## Related Concepts

- [[concepts/utility-aligned-canonical-decomposition|Utility-Aligned Canonical Decomposition]] describes dominant multivariate effects relative to a fixed utility direction.
- [[concepts/cost-aware-model-selection|Cost-Aware Model Selection]] places quality alongside resource requirements when choosing agents and operating settings.
- [[concepts/bilevel-simulator-construction|Bilevel Simulator Construction]] concerns how executable simulators are generated and calibrated, complementing evaluation of the agent that constructs them.

## Related Papers

Works cited in the source, without matching Paper pages found in this library:

- Li, Fox, and Goodman (2024), "Automated Statistical Model Discovery with Language Models": a proposal-and-critique approach to probabilistic model discovery.
- Huang et al. (2024), "MLAgentBench: Evaluating Language Agents on Machine Learning Experimentation": a benchmark for machine-learning experimentation agents.
- He, Liu, and Deng (2025), "Model Validation and LLM-Based Model Enhancement for Analyzing Networked Anagram Experiments": the source's earlier single-model enhancement study.

Additional library connections, not citations attributed to this paper:

- [[papers/socia-evo-automated-simulator-construction-via-dual-anchored-bi-level-optimization|SOCIA-EVO]] studies simulator construction with fixed empirical specifications, parameter calibration, and repair memory; this paper instead evaluates how agent controls affect discovery outcomes.
- [[papers/the-embedders-dilemma-llms-are-better-but-at-what-cost|The Embedder's Dilemma: LLMs Are Better, but at What Cost?]] provides another setting for joint assessment of quality and computational cost.

[[index|Library home]]
