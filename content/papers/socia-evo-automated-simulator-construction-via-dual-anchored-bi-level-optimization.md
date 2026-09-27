---
title: "SOCIA-EVO: Automated Simulator Construction via Dual-Anchored Bi-Level Optimization"
type: paper
authors:
  - Yuncheng Hua
  - Sion Weatherhead
  - Mehdi Jafari
  - Hao Xue
  - Flora D. Salim
year: null
source_job_id: bbb376ef-a484-4590-a413-4106d455b470
tags:
  - llm-agents
  - simulator-construction
  - simulation-calibration
  - agent-memory
  - program-search
---

## TL;DR

SOCIA-EVO constructs executable simulators through an LLM-driven loop constrained by a fixed, expert-reviewed Blueprint and a changing Strategy Playbook. It separates code revision from numerical parameter calibration and retrieves repair hypotheses according to their execution history. Across three tasks, it reports the lowest mean error on seven of eight evaluation measures and a tie on the eighth. These results support improved predictive and distributional fit under the reported protocols; they do not establish recovery of the true causal mechanisms.

## Research Question

Can persistent empirical constraints, separate structural and numerical optimization, and evidence-weighted repair memory reduce drift and repeated mistakes when LLM agents construct simulators from data?

## Motivation

Executable code can still generate statistically unrealistic behavior. During iterative simulator construction, agents can forget data constraints, rewrite sound logic to compensate for untuned parameters, or repeat unsuccessful repairs. SOCIA-EVO treats simulator fidelity as a modeling objective that requires both a stable specification and quantitative feedback on proposed changes.

## Contributions

- A static Blueprint specifies schemas, interactions, holdouts, metrics, and bounded tunable parameters, with human verification before code evolution.
- [[concepts/bilevel-simulator-construction|Bilevel simulator construction]] assigns discrete code revision to an outer agent loop and parameter search to a generated inner calibrator.
- A persistent Strategy Playbook tracks metric-linked repair hypotheses, their lifecycle, and success or failure attributions; a knapsack scheduler selects context under a token budget.
- Evaluations cover user ratings, synthetic mask adoption, and personal mobility, with component ablations, recurrence diagnostics, and a limited backbone comparison.

## Method

**Blueprint and orchestration.** Six agent roles handle data analysis, code generation, execution, feedback, playbook management, and iteration control. The data-analysis agent turns task intent and data summaries into a specification. Experts check it once at initialization; later iterations reuse it. The Blueprint distinguishes observed inputs from designed assumptions and fixes the evaluation and calibration contract (Sections 3.1-3.2; Appendix D).

**Nested search.** The code agent produces simulator structure $P_t$ and a calibrator $C_t$. With $P_t$ fixed, the calibrator searches bounded parameters to reduce a task-specific loss:

$$
\theta_t^* \approx \arg\min_{\theta\in\Theta(\mathcal B)}
\mathcal L\bigl(\operatorname{Sim}(P_t,\theta),\mathcal D_{\mathrm{calib}}\bigr).
$$

The approximate notation reflects finite numerical search; the paper writes an ideal optimum. Appendix D.5 gives a bounded random-search example with a weighted metric objective. The next structural revision uses the resulting diagnostics, Blueprint, selected strategies, and previous code. Iteration control stops on plateaus or regressions, with a maximum of nine rounds (Section 3.3; Appendix A.1).

**Repair memory.** Feedback must name valid Blueprint metric keys and supply a symptom, mechanism hypothesis, corrective approach, and severity. Strategies move among OPEN, QUEUED, INPROGRESS, and RESOLVED; recurring issues merge with prior entries while retaining counters. Empirical reliability is estimated as $(s_i+1)/(s_i+f_i+2)$ from success and failure attributions. Strategy value multiplies this estimate by severity and capped backlog urgency. A 0-1 knapsack maximizes total value within the context budget. The Blueprint and selected strategies appear near the end of the prompt (Section 3.4). This is [[concepts/experience-guided-program-evolution|experience-guided program evolution]] through repair-history selection, without reported model-weight updates.

**Concrete structural change.** In the mobility example, early code uses recent history only to initialize the first point of interest. Later code converts seven-day history into reusable features that affect candidate construction and weighting throughout the day. Other revisions fix serialization, metric implementation, time feasibility, and coordinate-missingness handling. The trajectory therefore includes measurement repairs as well as behavioral-model changes (Appendix B).

## Experiments

**Tasks and protocol.** User modeling calibrates on 20,000 user-item reviews and predicts 1,200 ratings. Mask adoption uses a synthetic population of 100 residents, with 30 days for calibration and ten for evaluation. Mobility uses LLMob records for 69 residents, averaging 124.10 active days, under normal-to-normal, abnormal-to-abnormal, and normal-to-abnormal settings. Main results use GPT-5.1 and five random seeds, reported as means with 95% confidence intervals (Section 4).

The detailed normal-to-abnormal Blueprint fits baseline behavior on 2019-2020 records, calibrates shift parameters on the first 80% of each resident's 2021 records, and reserves the last 20% for testing. Seven-day context may include earlier 2021 observations, excluding target-day and future data. This is transfer with target-regime calibration and historical context, rather than zero-shot prediction of the pandemic regime (Appendices D.5 and D.8).

Reflexion, Dynamic Cheatsheet, and ACE-Online are adapted to a shared implementation with the same numerical calibrator. YuLan-OneSim and G-SIM retain their native pipelines under aligned data access, iteration limits, and evaluation metrics. All baselines receive SOCIA-EVO-derived data summaries, but the human Blueprint verification step is specific to SOCIA-EVO (Section 4.2).

**Main results.** Lower is better throughout. The comparison column gives the strongest baseline mean for each measure, not one baseline selected across all tasks (Table 2).

| Task and measure | SOCIA-EVO, mean +/- 95% CI | Best baseline, mean +/- 95% CI |
| --- | --- | --- |
| User rating MAE | 0.11 +/- 0.012 | G-SIM-ES: 0.13 +/- 0.013 |
| Mask adoption RMSE | 0.07 +/- 0.010 | G-SIM-SBI: 0.11 +/- 0.019 |
| Mobility normal-to-normal arrival-time JSD | 0.04 +/- 0.013 | G-SIM-ES: 0.07 +/- 0.010 |
| Mobility normal-to-normal trip-length WD | 0.34 +/- 0.016 | G-SIM-ES: 0.38 +/- 0.018 |
| Mobility abnormal-to-abnormal arrival-time JSD | 0.03 +/- 0.013 | G-SIM-ES: 0.07 +/- 0.014 |
| Mobility abnormal-to-abnormal trip-length WD | 0.36 +/- 0.014 | G-SIM-SBI: 0.43 +/- 0.013 |
| Mobility normal-to-abnormal arrival-time JSD | 0.06 +/- 0.015 | G-SIM-SBI: 0.06 +/- 0.018 |
| Mobility normal-to-abnormal trip-length WD | 0.53 +/- 0.016 | G-SIM-SBI: 0.56 +/- 0.015 |

**Ablations and dynamics.** Removing the inner calibrator increases mask RMSE by 0.47, removing the Blueprint by 0.37, removing human verification by 0.34, and removing memory by 0.30. Replacing knapsack retrieval with a sliding window adds 0.23 RMSE. Expanding the default 1,000-token recency zone to 3,200 tokens adds 0.14 RMSE, so more history is not uniformly helpful (Table 3).

The reported average recurrent-error count falls from 2.20 at iteration 1 to 0.53 at iteration 5, approximately 76%. Despite its name, Cumulative Recurrent Errors (CRE) counts repeated errors within each generation batch against historical failures; it is not a cumulative running total. Detection uses normalized representations and a SequenceMatcher similarity threshold of 0.95. Later mobility issue-resolution rates fall below 50%, and some trajectories rebound after early gains (Appendices A.2-A.4).

**Backbone dependence.** On mask adoption only, the best reported Qwen3-Next-80B-A3B-Instruct iteration achieves RMSE 0.049 +/- 0.008, compared with GPT-5.1's 0.073 +/- 0.010 and Llama-3.3-70B-Instruct-Turbo's 0.739 +/- 0.014. Qwen's trajectory is nonmonotonic, and Llama's falling recurrence counts do not translate into good task accuracy. Lower error recurrence is therefore insufficient evidence of successful refinement (Tables 5-6).

**Resources.** Appendix A.1 reports approximately 30-50 minutes per iteration and a typical six-to-seven-round lifecycle costing about USD 1.50-2.00 in model usage. These are author-reported measurements, not independently verified current prices; LLM token throughput is not capped.

## Limitations

- Only three task families are evaluated, and mask adoption is synthetic. Backbone portability is tested on mask adoption alone. The authors identify limited support for strategic interaction, long-horizon planning, and real-time adaptation.
- Distributional fit and improved mobility distance metrics do not independently identify the true causal mechanism. The normal-to-abnormal setup includes target-regime calibration, narrowing claims about unseen distribution shifts. See [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]].
- Finite inner optimization can leave residual parameter error. Several strategies and code changes can affect the same metrics, so success/failure attribution is a scheduling heuristic rather than an isolated causal test of each repair.
- Expert verification is not provided to the baselines. The paper says verified Blueprints and accumulated Playbooks are reused across same-task runs; the independence and ordering of the five seed runs are not fully specified. Iteration limits also do not equalize actual tokens or elapsed compute.
- The source's Equation 4 defines current-minus-previous metric change, but the surrounding transition rules call positive change an improvement despite the reported errors being lower-is-better. Appendix C includes per-metric directions, but the exact reconciliation is unclear. The supplied text also contains malformed code and JSON examples; it is not an executable implementation specification.
- The authors claim significance at $p<0.05$ without specifying the test in the supplied text. Confidence intervals and the rounded JSD tie should be retained rather than interpreted as strict superiority on every measure.
- No publication year, venue, DOI, or identifier for this paper is stated in the supplied Markdown. The year remains null. The abstract names `cruiseresearchgroup/SOCIA`, branch `evo`, as the code/data repository; its availability was not independently checked.

## Related Concepts

- [[concepts/bilevel-simulator-construction|Bilevel Simulator Construction]]
- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]

## Related Papers

Works cited by SOCIA-EVO, without matching Paper pages in this library:

- Holt et al. (2025), "G-Sim: Generative Simulations with Large Language Models and Gradient-Free Calibration" (arXiv:2506.09272): simulator generation and calibration baseline.
- Shinn et al. (2023), "Reflexion: Language Agents with Verbal Reinforcement Learning": episodic feedback baseline.
- Suzgun et al. (2025), "Dynamic Cheatsheet: Test-Time Learning with Adaptive Memory" (arXiv:2504.07952), and Zhang et al. (2025), "Agentic Context Engineering: Evolving Contexts for Self-Improving Language Models" (arXiv:2510.04618): adaptive-context baselines.

Additional library connections, not presented as citations made by SOCIA-EVO:

- [[papers/frontis-ma1-training-an-ai4ai-model-towards-recursive-self-improvement-in-machine-learning-engineering|Frontis-MA1]] also uses execution records to guide program evolution, while additionally training program-transformation operators.
- [[papers/llm-based-social-simulations-require-a-boundary|LLM-Based Social Simulations Require a Boundary]] explains why validation measures and demonstrated heterogeneity constrain claims made from simulated populations.

[[index|Library home]]
