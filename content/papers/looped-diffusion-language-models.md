---
title: Looped Diffusion Language Models
type: paper
authors:
  - Sanghyun Lee
  - Chunsan Hong
  - Seungryong Kim
  - Jonghyun Lee
  - Jongho Park
  - Dongmin Park
year: null
tags:
  - diffusion-models
  - latent-reasoning
  - adaptive-computation
---

## TL;DR

LoopMDM repeatedly applies a small shared block inside a masked diffusion denoiser. Selectively looping early-middle layers improves training-compute efficiency without adding parameters: the paper reports up to 3.3× fewer training FLOPs to match baseline language-modeling quality and up to 8.5 percentage points higher GSM8K accuracy. Inference gains require additional internal computation, distinct from increasing denoising steps.

## Research Question

Can repeated computation inside a masked diffusion denoiser improve quality under matched parameter and total training-FLOP budgets, and where should that computation be allocated?

## Motivation

Masked diffusion already iterates across denoising steps, so the usefulness of additional internal recurrence is not automatic. Unresolved positions also provide hidden states that can exchange information before tokens are committed. LoopMDM investigates whether selectively refining those states is more effective than uniformly increasing depth.

## Contributions

- A shared early-middle block that increases effective depth while preserving parameter count.
- Matched-training-compute comparisons across language modeling, downstream evaluation, and mathematical reasoning, including deeper unshared baselines.
- Stochastic training depths and an inference stopping rule based on hidden-state convergence.
- Controlled Sudoku experiments, attention analysis, and an illustrative masked-workspace construction supporting a computational interpretation of unresolved positions.

## Method

A head runs once, a shared middle block runs S times, and a tail runs once. With respective layer counts h, m, and o, effective depth is h + Sm + o, while parameterized depth remains h + m + o. Training samples S uniformly from 1 through a maximum and applies the standard masked-diffusion negative evidence lower bound to the final output. Higher per-step cost is offset by fewer training steps in matched-total-FLOP comparisons.

The language models loop layers 1–2 in zero-based indexing in a 12-layer, 170M-parameter transformer, with maximum training loop count 12. The math model uses 14 layers and 125M parameters, with maximum loop count 8. Inference can exceed those training maxima.

Adaptive inference stops when the norm of the hidden-state update divided by the norm of the new hidden state falls below 0.1, or when the loop budget is exhausted. This allocates more iterations to intermediate diffusion timesteps, where the reported NLL gains are largest.

## Experiments

Language modeling uses LM1B, OpenWebText, and FineWeb-Edu, with sequence lengths 128, 1024, and 1024. Math training uses TinyGSM's 11.8M problems with Python solutions; GSM8K evaluation uses Top-2 and Top-3 confidence-based unmasking.

| Evaluation | Baseline | LoopMDM | Source |
| --- | --- | --- | --- |
| PTB zero-shot perplexity | 108.5 ± 6.61 | 90.2 ± 8.59 at S=12 | Table 2 |
| Generative perplexity, 1024 denoising steps | 42.56 ± 1.09 | 38.53 ± 1.23 at S=12 | Table 1 |
| Mean accuracy across nine downstream tasks | 40.0 ± 0.3% | 41.4 ± 0.6% at S=12 | Table 3 |
| GSM8K gain over same-size baseline | — | +8.5 / +8.1 percentage points at S=16, Top-2 / Top-3 | Section 4.2 |

The language-modeling tables report five random seeds; math experiments report three. Section 4.2 reports matching the same-size baseline's final accuracy with 43% of its training FLOPs, and gains over a 21-layer baseline with comparable per-step training cost of 2.7 points at S=8 and 3.4 at S=16.

Loop placement and extent matter: Table 4 reports NLL 3.729 for two looped layers versus baseline 3.798, while looping all twelve layers produces 3.933 under matched training compute. Running the trained looped model only once can underperform the baseline.

Table 5 reports adaptive inference reducing average loops from 12 to 5.1 for zero-shot perplexity (51.7 → 52.9), 5.2 for generative perplexity (38.53 → 39.11), and 4.9 for downstream accuracy (41.4% → 41.3%). These are quality–compute trade-offs, not identical-quality results or measured wall-clock speedups.

Under fixed left-to-right Sudoku generation, the one-layer baseline solves 10.9% of test puzzles and the looped model at S=1 solves 10.6%. A representative puzzle improves from 24 errors to 7 to 0 over three loop counts; this example is not an aggregate solve rate. Mask-to-mask attention rises with looping, providing correlational evidence for interaction among unresolved positions.

## Limitations

Experiments cover medium-scale models; billion-parameter models, longer contexts, and combinations with remasking or search remain untested. Block selection and stopping thresholds are manually specified. Additional loops can move an initially correct token prediction away from the answer (Appendix D.3).

The prose claims that S=12 matches or improves all nine downstream tasks, but Table 3 shows lower ARC-Challenge accuracy (25.3 versus 25.5) and OpenBookQA accuracy (28.0 versus 30.8). The table supports an average gain, not uniform improvement. Appendix D.1 reports adaptive-perplexity values different from Table 5; these should not be merged into a single operating point without clarification.

The k-clique construction assumes a finite-precision, logarithmic-width model and an explicit circuit-simulation bound, and adds n^k masked workspace positions. It illustrates the value of extra workspace at fixed loop count, not a practical equal-total-compute separation. Attention patterns do not establish a causal mechanism.

The supplied Markdown does not explicitly identify this paper's publication year or stable identifier; year is left null. Source: Cognitio parsed Markdown, job `93f85f82-d1e2-4d9d-a1bb-9399178b9d44`.

## Related Concepts

- [[concepts/absorbing-state-diffusion|Absorbing-State Diffusion]]: the masking and denoising framework.
- [[concepts/latent-reasoning|Latent Reasoning]]: iterative refinement before discrete output commitment.
- [[concepts/adaptive-computation|Adaptive Computation]]: varying internal depth using a stopping criterion.

## Related Papers

- [[papers/looped-transformers-are-better-at-learning-learning-algorithms|Looped Transformers Are Better at Learning Learning Algorithms]]: cited prior work on iterative shared transformer computation; LoopMDM studies its application within masked diffusion.
- [[papers/structured-denoising-diffusion-models-in-discrete-state-spaces|Structured Denoising Diffusion Models in Discrete State-Spaces]]: cited foundation for discrete diffusion, including absorbing corruption.

[[index|Library home]]
