---
title: "CASCO-Agent: Cost-Aware Simulation Configuration via Surrogate-Guided Agents"
type: paper
authors:
  - Anonymous authors
year: null
source_job_id: 6bd611c2-8dab-483a-8c8e-95a7343b7d67
tags:
  - scientific-agents
  - simulation-optimization
  - surrogate-modeling
---

## TL;DR

CASCO-Agent uses a lightweight surrogate to predict simulation error and computational cost, allowing an LLM to explore candidate configurations before spending expensive simulator calls. Across three PDE environments it improves cost-normalized rewards in many comparisons, although success-rate and reward gains are not universal.

[[index|Library home]]

## Research Question

Can an LLM select simulation resolutions that meet accuracy requirements while minimizing both execution cost and the accumulated cost of iterative search?

## Motivation

Fine grids improve simulation accuracy but increase computation. Evaluating every candidate in an LLM search with the actual solver can erase the benefit of finding a cheaper configuration. Predicting a few decision-relevant metrics offers a cheaper feedback mechanism than reconstructing entire physical fields.

## Contributions

- Formulates single-turn and multi-turn cost-aware simulation configuration objectives.
- Integrates scalar error/cost surrogates with iterative LLM proposal generation and soft utility feedback.
- Evaluates spatial-resolution tuning on Heat 1D, Euler 1D, and transient Navier–Stokes 2D, with surrogate and prompt ablations.

## Method

The surrogate takes configuration and environmental parameters and predicts RMSE and cost; predicted RMSE is converted to a soft accuracy signal. This is [[cost-aware-simulation-configuration|cost-aware simulation configuration]] using decision metrics rather than full-field prediction.

Single-turn search begins with five surrogate-evaluated samples, repeatedly proposes candidate ensembles, and retains ten high-ranked examples in the prompt. The reported implementation uses five iterations with four branches. Only the selected configuration is evaluated by the actual simulator. Multi-turn search uses surrogate screening before real evaluations and feeds actual outcomes back into subsequent proposals, stopping on an agent decision or a cap of ten steps.

With binary feasibility utility $\Phi$ and normalized simulator cost $\hat C$, evaluation uses $R^0=\Phi/\hat C$ for a single configuration and $R^m=\max_i\Phi_i/\sum_i\hat C_i$ for a trajectory. Costs are operation-count proxies, normalized against coarse brute-force references; multi-turn references include search cost. These two rewards therefore have different normalizers. Soft utility guides search, while reported rewards use binary feasibility.

## Experiments

The main tasks tune one spatial-resolution parameter under three precision targets. Baselines include Gaussian-process Bayesian optimization, direct LLM prompting, and multi-turn OPRO. Base models are Llama3.2-3B-Instruct, Qwen-8B, and o4-mini. Appendix C lists 4,440 training samples for Heat, 4,020 for Euler, and 1,320 for Navier–Stokes.

Selected o4-mini results from Appendix F, Table 3 (means across precision levels):

| Setting / solver | Direct prompting reward | CASCO reward | Direct success | CASCO success |
| --- | ---: | ---: | ---: | ---: |
| Single / Heat | 0.362 | 1.239 | 0.253 | 0.679 |
| Single / Euler | 0.501 | 1.764 | 0.301 | 0.733 |
| Single / Navier–Stokes | 0.565 | 0.842 | 0.516 | 0.536 |
| Multi / Heat | 1.960 | 1.981 | 0.960 | 0.986 |
| Multi / Euler | 1.135 | 1.571 | 0.392 | 0.443 |
| Multi / Navier–Stokes | 0.991 | 1.538 | 0.674 | 0.972 |

Gains depend on model and metric: Qwen-8B multi-turn Euler reward falls from 1.511 to 1.359, while success rises from 0.421 to 0.624. Qwen-8B single-turn Navier–Stokes success falls from 1.000 to 0.702.

In Table 4, replacing soft surrogate feedback with sparse signals reduces single-turn reward from 0.571 to 0.420. Removing physics context produces reward 0.595 but success only 0.152, versus 0.708 for the full method. Table 1 shows data dependence: with 50 samples, GP-based CASCO scores 0.465 versus NN-based CASCO's 0.142 and BO's 0.459; the GP variant does not beat BO at every sample size.

## Limitations

Evidence concerns one-dimensional resolution choices, not demonstrated high-dimensional configuration search. Surrogate fidelity, training data generation, and human tuning remain dependencies. Reported cost rewards measure simulator work rather than complete end-to-end cost including surrogate training and LLM inference.

The soft-signal dominance proposition should be read cautiously: Appendix D shows that a policy can recover binary feedback from soft feedback, but this does not establish that an arbitrary prompted LLM will exploit additional information optimally. Empirical ablations provide the more direct evidence.

The supplied manuscript is anonymous and undated; no stable identifier is provided, so year is left unknown. It inconsistently labels some ablations o4-mini versus GPT-4o-mini and uses the older name CAED-Agent in later appendices. Although the contributions mention a released benchmark, the reproducibility section says release is planned after acceptance.

## Related Concepts

- [[cost-aware-simulation-configuration]]
- [[neural-operators]] — related physical surrogate modeling; CASCO predicts scalar decision signals instead of complete solution fields.

## Related Papers

- Yang et al., *Large Language Models as Optimizers* (cited in the supplied manuscript): OPRO supplies the iterative prompting framework and a simulator-evaluated baseline.
- [[modern-bayesian-experimental-design]] — broader experimental-design context; CASCO focuses on numerical configuration accuracy and execution cost.
