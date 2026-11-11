---
title: "Solve the Loop: Attractor Models for Language and Reasoning"
type: paper
authors:
  - Jacob Fein-Ashley
  - Paria Rashidinejad
year: 2026
source_job_id: "1b92e28a-5f8b-4599-b316-f3cb852b47e1"
tags:
  - latent-reasoning
  - equilibrium-models
  - recurrent-depth
---

## TL;DR

Attractor Models train recurrent refinement as an output-embedding fixed-point problem. A Transformer proposes a prediction, a smaller conditioned module refines it with Anderson acceleration, and implicit gradients avoid storing the full solver trajectory. The paper reports improved language modeling and strong 27M-parameter puzzle results. In language models, the proposal learns to approximate the equilibrium, often making inference-time refinement unnecessary.

## Research Question

Can equilibrium training make recurrent language modeling memory-efficient and scalable while retaining useful iterative reasoning?

## Motivation

Finite-loop models couple training depth, activation memory, and inference budgets. The convergence observed in looped models motivates learning the equilibrium directly, while a meaningful backbone proposal avoids constructing predictions from an uninformative initial state.

## Contributions

- Output-space equilibrium refinement with persistent proposal injection and residual-based stopping.
- Training memory independent of solver iteration count, with approximate implicit gradients reducing backward cost.
- Evidence for [[concepts/equilibrium-internalization|Equilibrium Internalization]]: trained backbone outputs approach the solver's final predictions.
- Evaluation across language-model pretraining and small-data grid reasoning, with architectural and gradient ablations.

## Method

The backbone produces $y_0=B(E(x))$. The attractor solves $y^*=T_a(y^*,y_0)$ and decodes through the tied embedding matrix. The proposal is injected at every refinement step. Anderson acceleration stops at a relative residual tolerance or maximum iteration budget.

For loss gradient $v$, exact implicit differentiation solves $(I-J^T)u=v$. The one-step approximation uses $u\approx v$, avoiding differentiation through all forward iterations. Appendix C specifies one-step backward passes at 140M and 370M, but Anderson backward solving at 770M; the broad main-text description of one-step language-model training therefore needs this qualification.

Puzzle experiments instead retain TRM's deep-supervision protocol and solve for the joint answer/reasoning state. Previous supervision states initialize the solver; there is no separate Transformer backbone. These experiments use phantom gradients rather than the one-step approximation.

## Experiments

Language models train on FineWeb-Edu with 11.2B, 29.6B, and 61.6B tokens at the respective scales. Table 1 reports:

| Parameters | Transformer validation PPL | Attractor validation PPL | Transformer Lambada PPL | Attractor Lambada PPL | Transformer CORE | Attractor CORE |
| --- | --- | --- | --- | --- | --- | --- |
| 140M | 21.48 | 18.30 | 127.39 | 68.02 | 13.00 | 14.59 |
| 370M | 15.79 | 14.03 | 40.77 | 27.14 | 17.46 | 20.24 |
| 770M | 13.08 | 12.09 | 22.37 | 15.21 | 22.42 | 26.83 |

The paper reports 25–31% fewer training FLOPs than Parcae. The 770M Attractor beats the 1.3B Transformer on Lambada and CORE, but not validation perplexity (12.09 versus 11.95) or CORE-Extended (15.42 versus 15.90). At 370M, Parcae also slightly exceeds Attractor on CORE-Extended (12.75 versus 12.64).

With approximately 1,000 training examples per puzzle task, the 27M Attractor reaches 91.4% Sudoku-Extreme and 93.1% Maze-Hard accuracy. Its 7M version reaches only 54.3% and 46.7%, below 7M TRM's 74.7% and 85.3%. The reported advantage is thus strongly size-dependent; 27M TRM scores zero on both tasks in Table 2.

At 60.3M parameters and 1B tokens, the Attractor achieves validation PPL 34.05 versus 42.18 for the DEQ baseline and 38.74 with tied unembedding. Additive persistent injection yields 99.7% convergence versus 12.4% for initialization-only conditioning. Full implicit gradients improve PPL from 34.05 to 33.91 but require 4.8 times the memory and 2.7 times the step time in this ablation.

Inference sweeps find peak language-model performance at one refinement step and near-converged quality even with backbone-only decoding (Section 4.3).

## Limitations

- The theoretical convergence result assumes a locally contractive map on an invariant neighborhood; this is not guaranteed for an arbitrary trained Transformer. The proposed stability mechanism should not be read as an unconditional convergence guarantee.
- Solver removal is demonstrated for the language-model backbone setup, not established for the distinct backbone-free puzzle configuration.
- FLOP reductions do not establish equivalent wall-clock reductions. Appendix C notes that implicit-gradient hooks prevent compiling the Attractor model with the compilation setting used for baselines.
- Results cover models up to 770M and two specialized puzzle tasks. Reported zero scores for frontier baselines concern those benchmark protocols, not general reasoning ability.

## Related Concepts

- [[concepts/equilibrium-internalization|Equilibrium Internalization]]
- [[concepts/cyclic-fixed-points-in-looped-transformers|Cyclic Fixed Points in Looped Transformers]]
- [[concepts/adaptive-computation|Adaptive Computation]]
- [[concepts/latent-reasoning|Latent Reasoning]]

## Related Papers

- [[papers/a-mechanistic-analysis-of-looped-reasoning-language-models|A Mechanistic Analysis of Looped Reasoning Language Models]] supplies the convergence observations motivating equilibrium refinement.
- Bai, Kolter, and Koltun (2019), *Deep Equilibrium Models*, supplies the implicit fixed-point framework; the present paper changes initialization and the role of the equilibrium.
- Prairie et al. (2026), *Parcae: Scaling Laws for Stable Looped Language Models*, is the main looped pretraining baseline.

Source: supplied manuscript dated May 12, 2026. [Project website](https://attractor-models.github.io/) · [Code](https://github.com/jacobfa/Attractor).

[[index|Library home]]
