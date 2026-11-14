---
title: "StartLux-Decision: AutoThink Decision Models with Reinforcement Learning for Calibrated Deliberative Decisions"
type: paper
authors:
  - Xialie Zhuang
  - Zunhai Su
  - Jia Pan
  - Ngai Wong
  - Guanhua Chen
  - Chuan-Wei Kuo
year: 2026
source_job_id: "ae1e8d36-77c4-4677-8936-a7830cb94079"
tags:
  - decision-models
  - reinforcement-learning
  - probability-calibration
  - adaptive-computation
---

[[index|Library home]]

## TL;DR

StartLux-Decision combines single-pass probabilistic decisions with confidence-gated reasoning. Its RLCD² training rewards improvements in probability quality and penalizes overlong traces: at 9B, held-out reasoning termination rises from 45.9% to 93.9%, while mean trace length falls from 2,494 to 868 tokens. The 27B AutoThink model reaches 86.9% pair accuracy on the independent DecisionPivot benchmark. The paper also shows why selection and routing require policy-aware calibration.

## Research Question

How can decision models reason selectively while preserving efficient direct predictions, useful probability estimates, and reliable confidence after downstream selection or routing?

## Motivation

Routing, verification, and tool validation require probabilities as well as labels. Single-pass models can struggle with computational decisions, while decision-oriented training can damage reasoning generation and termination. Moreover, calibration of individual predictions need not survive best-of-N selection or confidence-based escalation.

## Contributions

- Instant models at 0.8B–27B and AutoThink models at 4B, 9B, and 27B share an option-letter probability interface.
- A three-stage pipeline separates decision training, attention adaptation, and reasoning supervision plus reinforcement learning.
- RLCD² combines a frozen probability scorer, proper-score rewards, and a soft reasoning-length penalty.
- DecisionPivot evaluates sensitivity to answer-changing details through programmatically verifiable contrast pairs.
- Policy-aware calibration conditions confidence on selection and routing information.

## Method

Each question maps up to 26 options to letter logits, followed by temperature-scaled softmax. Longer lists use grouped screening and a final readout. Instant enables bidirectional attention in full-attention layers while leaving linear-attention layers causal. AutoThink retains causal attention: it returns its initial distribution when maximum probability is at least 0.9, otherwise generates up to 4,096 reasoning tokens and returns a mixture of 25% initial and 75% post-reasoning probabilities.

Stage 1 uses full-parameter supervised decision training; Stage 2 uses merged adapters for expanded task coverage and attention specialization. Stage 3 restores reasoning through supervision and then RLCD². For trace τ, its reward is the frozen scorer's post-reasoning proper score minus its initial proper score, less a penalty of 0.0001 per token beyond the released soft budget of 3,072. The decision-weighted scoring rule mixes uniform and Beta(8,2) threshold weights. Group-relative policy optimization centers rewards without standard-deviation normalization; the initial score cancels for groups of nonempty traces (Sections 2–3).

Policy-aware calibration fits confidence maps on outputs returned by the deployed policy. Routing uses isotonic calibration within initial-confidence strata; selection uses a logistic model of confidence, mean candidate score, candidate count and its logarithm, followed by isotonic calibration. Acceptance thresholds are certified separately for relevant policy routes (Section 5.5).

## Experiments

Reported results distinguish public DI 0.3 index points from DecisionPivot pair accuracy, which requires both members of a contrast pair to be correct.

| Model | DI 0.3 Instant | DI 0.3 AutoThink | DecisionPivot AutoThink pair accuracy |
| --- | ---: | ---: | ---: |
| 4B | 67.88 | 68.21 | 59.9% |
| 9B | 69.96 | 70.45 | 59.9% |
| 27B | 72.83 | 73.37 | 86.9% |

DecisionPivot contains 7,800 core examples across 13 generated families. AutoThink improves pair accuracy over Instant by 18.4, 12.4, and 11.5 percentage points at 4B, 9B, and 27B, respectively. These are comparisons of complete variants, not isolated reasoning effects. Within the fixed 27B AutoThink checkpoint, disabling reasoning yields 48.0% pair accuracy versus 86.9% at the default gate (Sections 4.3 and 5.2).

On 2,986 held-out examples with reasoning always invoked, RLCD² reduces 9B mean trace length by 65% while default accuracy changes from 80.38% to 80.48%. The 27B model already has short, reliably terminating traces and changes little. Ablations attribute most termination gains to the length penalty; proper-score rewards contribute to probability calibration (Section 3).

Across 184 selection and routing settings, policy-aware calibration reduces signed confidence–accuracy gaps from [−11.7, +20.5] to [−2.7, +2.1] percentage points. For a 9B verifier, responses in the 80–90% confidence band have 92% accuracy individually but 78% after best-of-32 selection (Section 5).

## Limitations

- Public DI 0.3 comprises only 20% of the leaderboard evaluation and guided data, attention, and checkpoint selection. Its scores are development results, not independent test evidence. Most task families are represented in training; DecisionPivot was not used for model or configuration selection.
- Additional decision data show limited transfer beyond represented task families. Instant and AutoThink differ in attention and training, so their score differences cannot all be attributed to inference-time reasoning.
- Tight budgets harm long computations: a 512-token soft budget lowers 4B DecisionPivot pair accuracy from 60.4% before RL to 52.9%. Calibration gains after temperature scaling are not uniform.
- Policy-aware calibration remains distribution-dependent, with transferred maps showing up to 6.1 points of residual overconfidence. Some certified routes accept no predictions; marginal error control does not guarantee route-wise control.
- Single-readout latency excludes AutoThink generation. Cross-backend top-choice agreement does not establish probability agreement, and quantization comparisons also reflect backend differences.

## Related Concepts

- [[concepts/probability-calibration|Probability Calibration]]: reliable probability semantics depend on the returned prediction distribution and policy.
- [[concepts/adaptive-test-time-reasoning-routing|Adaptive Test-Time Reasoning Routing]]: the Read-or-Think gate allocates reasoning by initial confidence.

## Related Papers

- [[papers/jev-thinks-i-dont-know-but-doesnt-say-it-introducing-sys1cal-v1-dataset-for-probability-calibration|Jev thinks I don't know, but doesn't say it: Introducing Sys1Cal-v1 Dataset for Probability Calibration]]: cited by this paper for evaluation of decision probabilities; complements its policy-level analysis.
- Gao and Wang (2026), *OpenJev-RLCD: A working RLCD implementation*: the cited precursor calibrates post-rationale readouts before proper-score reinforcement learning; RLCD² adds a frozen incremental scorer and reasoning-length cost.

Source: supplied parsed manuscript, Sections 2–5 and Appendices A–D. The manuscript provides no explicit DOI or arXiv identifier for this paper. Year follows its 2026 evaluation dates. [Code repository](https://github.com/StartLuxLabs/StartLux-Decision).
