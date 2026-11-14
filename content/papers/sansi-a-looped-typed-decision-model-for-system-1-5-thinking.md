---
title: "SanSi: A Looped Typed Decision Model for System 1.5 Thinking"
type: paper
authors:
  - Shuyu Gan
  - Young-Jun Lee
  - Dongyeop Kang
year: 2026
tags:
  - latent-reasoning
  - typed-decisions
  - probability-calibration
---

[[index|Library home]]

## TL;DR

SanSi repeatedly applies a frozen, pretrained looped backbone with trainable adapters and supervised readouts at every loop. It returns probabilities over declared options without generating reasoning text. Eight loops achieve 72.0% accuracy on 10,027 decisions, while three loops recover most of the gain at substantially lower cost. Later loops can increase confidence after accuracy has largely settled.

## Research Question

How much can recurrent hidden-state computation improve typed decisions, and how do additional loops affect computational cost, calibration, depth generalization, and usefulness as a reinforcement-learning judge?

## Motivation

A single forward pass fixes the computation available for every decision. Larger models increase resident parameters, while generated reasoning introduces token generation. Looping offers additional computation within a fixed parameter budget and preserves the typed probability interface.

## Contributions

- A typed decision model built on Ouro, with separately supervised predictions at all eight recurrent depths.
- A common training and evaluation recipe covering classification, reasoning, uncertain evidence, long documents, sentence pairs, and knowledge.
- Analyses of stopping, confidence, depth extrapolation, and downstream policy optimization that distinguish benefits of further computation from its failure modes.

## Method

Ouro-1.4B repeatedly applies the same 24-layer stack, passing its normalized hidden state into the next loop without reinjecting input tokens. The frozen backbone receives rank-64 LoRA adapters shared across loops. Each loop has a rank-16 readout correction and learned scale applied to frozen option-letter output rows. Approximately 61M parameters are trained.

Training averages cross-entropy plus Brier loss across eight loops. Targets are one-hot for determinate answers, uniform for unanswerable cases, and empirical annotator distributions for crowd-labelled cases. Every intermediate readout is therefore trained for use at its own inference budget. Training uses 12,800 items and 1,000 steps with batches of 16; comparisons generally use three seeds and the same data and adaptation recipe.

## Experiments

The test suite contains 10,027 decisions from 59 sources, including 382 unanswerable and 766 crowd-labelled cases. Accuracy uses the majority label for crowd annotations and a confidence threshold of `(1 + 1/K)/2` for unanswerable items; it is not exclusively ordinary gold-label accuracy. Reported costs are measured GPU evaluation time relative to the single-loop Ouro baseline (Table 2).

| Model / budget | Accuracy (%) | Relative cost | ECE |
| --- | ---: | ---: | ---: |
| SmolLM2-1.7B | 58.4 ± 0.7 | 1.1 | 0.069 |
| Ouro-1.4B, one-loop training | 58.6 ± 0.2 | 1.0 | 0.137 |
| Qwen3.5-2B | 66.7 ± 0.7 | 1.2 | 0.123 |
| Qwen3.5-4B | 73.8 ± 0.6 | 2.4 | 0.113 |
| SanSi, loop 3 | 70.4 ± 0.6 | 2.9 | 0.082 |
| SanSi, loop 8 | 72.0 ± 0.7 | 7.7 | 0.093 |
| SanSi-2.6B | 75.8 ± 0.6 | 14.8 | 0.078 |

Loop 3 captures 88% of the accuracy gain from loop 1 to loop 8. The frozen Ouro exit gate retains approximately final-loop accuracy using 4.5 loops on average. Training every loop improves first-loop accuracy to 58.4%, compared with 35.6% when only the last loop is supervised.

On liar chains with 9–16 steps, beyond the training maximum of eight, SanSi reaches 72.6% versus 50.0% for Qwen3.5-4B. These controlled depth results support extrapolation on the studied tasks, rather than unrestricted reasoning generalization.

As the sole learned reward for GRPO on 2WikiMultiHopQA, the loop-8 judge raises the generator's externally graded correctness from 37.0% to 52.1 ± 1.9% on 3,000 questions. Exact match is 32.2 ± 3.8%, versus 32.5% before training: the improvement depends on the answer-quality measure and should not be presented as an exact-match gain (Appendix I).

## Limitations

Looping saves resident parameters but adds substantial computation: the eight-loop model is slower than the larger single-pass Qwen reference in this evaluation. Calibration improves only through roughly loop 3, after which confidence continues increasing. On the 8,879 single-gold-label cases, loops fix 20.9% of items but break 6.4%; 19.7% of final-loop errors carry confidence of at least 0.9 (Appendix J). Backbone pretraining differs across model families, so matched fine-tuning does not isolate recurrence from every pretraining difference. The judge experiment is one downstream case study with metric-dependent outcomes.

## Related Concepts

- [[concepts/typed-probabilistic-decision-interfaces|Typed Probabilistic Decision Interfaces]] — the declared-option output contract.
- [[concepts/latent-reasoning|Latent Reasoning]] — computation in hidden states without generated reasoning tokens.
- [[concepts/probability-calibration|Probability Calibration]] — confidence reliability changes with recurrent depth.

## Related Papers

- [[papers/towards-looped-models-done-right|Towards Looped Models Done Right]] — complementary architectural comparisons of recurrence and input injection; SanSi studies typed readouts and adaptation.
- [[papers/decision-hijacking-prompt-injection-attacks-on-jevs-typed-probabilistic-decisions|Decision Hijacking]] — a complementary security perspective on typed decision interfaces, rather than evidence that SanSi itself was tested for injection robustness.
