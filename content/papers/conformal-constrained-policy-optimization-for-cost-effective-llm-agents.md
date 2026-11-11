---
title: Conformal Constrained Policy Optimization for Cost-Effective LLM Agents
type: paper
authors:
  - Wenwen Si
  - Sooyong Jang
  - Insup Lee
  - Osbert Bastani
year: 2026
arxiv: "2511.11828"
tags:
  - llm-agents
  - conformal-prediction
  - constrained-reinforcement-learning
---

## TL;DR

CCPO jointly learns an LLM orchestration policy and a conformal threshold to reduce API cost while retaining a target coverage level for answer sets. Its reliability metric counts questions whose correct answer is unreachable by any available orchestration as covered; it is therefore not ordinary answer accuracy. The supplied version carries a 2026 copyright and links to the extended preprint, arXiv:2511.11828.

## Research Question

Can a learned controller combine cheap base-model reasoning with expensive guide-model judgments while minimizing cost subject to an explicit answer-set coverage constraint?

## Motivation

Small models can generate inexpensive reasoning but assess their own correctness poorly. A stronger guide can inspect that reasoning using mostly input tokens and return a short judgment and corrected answer. Fixed uncertainty thresholds do not directly optimize the resulting sequential cost, while pointwise policies can struggle to reach high coverage.

## Contributions

- A finite-horizon formulation of cost-aware base–guide orchestration with set-valued actions and an optional answer-set-size penalty.
- Joint policy and threshold learning combining constrained policy optimization, V-trace off-policy correction, and online conformal calibration.
- Evaluation on HotpotQA and MMLU with two base models, including comparisons with prompted controllers, uncertainty thresholding, and separately calibrated CPO policies.

## Method

At each round the base model proposes reasoning and an answer; GPT-4o judges that output and proposes a correction. The controller selects base answer, guide answer, or another round. A conformal policy retains every action whose learned probability exceeds a threshold. Executing these branches yields an answer set; only continuation branches further, so the maximum number of terminal answers is twice the horizon.

Training uses a stochastic surrogate uniform over retained actions, with a sigmoid approximation for differentiation. V-trace importance weights correct the discrepancy between rollout and target policies. Trust-region updates optimize cost and a coverage surrogate; online threshold updates track coverage. The authors additionally calibrate the final policy on held-out data to avoid depending on policy convergence.

Writing the attainable answer set as V(Q), the constraint is P(Y* ∈ C(Q) or Y* ∉ V(Q)) ≥ 1 − α. This bounds the joint event of excluding an attainable correct answer, rather than guaranteeing conditional accuracy among solvable questions. The paper's asymptotic claims require the stated step-size conditions and, for the final-policy convergence argument, policy convergence; held-out conformal calibration remains subject to its sampling assumptions.

## Experiments

The horizon is four rounds. Base models are 8-bit LLaMA-2-7B and LLaMA-3.2-3B, with GPT-4o as guide. Training uses 1,000 HotpotQA or 560 MMLU examples, plus 200 calibration and 200 test examples for each benchmark. HotpotQA uses Wikipedia search; MMLU uses chain-of-thought sampling. Controllers have three hidden layers of 64 units.

Selected results from Tables 2–5, all captioned α = 0.1, use CCPO with no set-size penalty. Cost is cumulative API cost over the test set in cents, not cost per question.

| Dataset / base model | CPO batch cost | CCPO cost | CCPO coverage | CCPO set size |
| --- | ---: | ---: | ---: | ---: |
| HotpotQA / LLaMA-2-7B | 7.835 | 6.552 | 0.902 | 2.35 |
| HotpotQA / LLaMA-3.2-3B | 8.007 | 7.061 | 0.901 | 3.18 |
| MMLU / LLaMA-2-7B | 22.25 | 7.949 | 0.920 | 2.14 |
| MMLU / LLaMA-3.2-3B | 12.12 | 10.82 | 0.901 | 2.66 |

The abstract reports cost reductions of up to 30%; the table entries above preserve the reported measurements rather than treating that headline as a universal bound. Positive set-size penalties can shrink answer sets at extra cost, but do not uniformly do so: Table 5 reports a slight increase from 2.66 to 2.70. Coverage and cost distributions are also evaluated over 100 random splits.

## Limitations

- Coverage exempts unreachable correct answers and permits multiple returned answers; it must not be read as single-answer accuracy.
- Reported costs measure API expenditure, not full local inference or training costs. Zero API cost for a local-model baseline does not mean zero computation.
- Evidence covers two QA benchmarks, two base models, one guide, and a short horizon; broader tool environments are not established.
- The setup mentions a stricter α = 0.05 for LLaMA-3.2-3B, whereas the displayed result captions specify α = 0.1. The table above follows the captions.
- The parsed mathematical presentation contains apparent inconsistencies, including an upper-bound coverage surrogate and a threshold-update direction that warrants checking against the original equations before implementation. These notes summarize the algorithm without treating every transcribed formula as verified.

## Related Concepts

- [[concepts/conformal-prediction|Conformal Prediction]] — calibration of set-valued outputs, extended here to sequential orchestration.

## Related Papers

- [[papers/conformal-prediction-with-large-language-models-for-multi-choice-question-answering|Conformal Prediction with Large Language Models for Multi-Choice Question Answering]] — related answer-set calibration; CCPO additionally learns sequential decisions under an API-cost objective.
- The source contrasts its method with FrugalGPT (Chen, Zaharia, and Zou, 2024), which optimizes model use without this coverage constraint, and builds on CPO (Achiam et al., 2017), IMPALA/V-trace (Espeholt et al., 2018), and online conformal prediction with decaying step sizes (Angelopoulos, Barber, and Bates, 2024).

[[index|Library home]]
