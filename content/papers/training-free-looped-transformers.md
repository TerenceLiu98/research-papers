---
title: Training-Free Looped Transformers
type: paper
authors:
  - Lizhang Chen
  - Jonathan Li
  - Chen Liang
  - Ni Lao
  - Qiang Liu
year: null
tags:
  - looped-transformers
  - inference-time-compute
  - numerical-integration
---

## TL;DR

A frozen language model can reuse a short middle-layer window at inference without weight updates. Damped residual updates and blending with the original output reduce the degradation caused by naive repetition. Reported gains include +2.64 percentage points on MMLU-Pro for Qwen3-4B-Instruct and +1.14 points on CommonsenseQA for Qwen3-30B-A3B-Instruct. The supplied manuscript contains conflicting descriptions of hyperparameter selection, so these results should not all be treated as verified untuned transfer.

## Research Question

Can recurrence be added to released transformer checkpoints at inference, without fine-tuning, auxiliary parameters, or training with recurrent depth?

## Motivation

Middle-layer redundancy suggests that some existing computation may be reused. Direct repetition, however, changes the hidden-state distribution received by downstream layers. The paper motivates controlled reuse through a numerical-integration interpretation of residual updates.

## Contributions

- An inference wrapper for contiguous layer windows, with block-wise and layer-wise iteration.
- A residual-field formulation supporting damped Euler updates and a Runge–Kutta formulation that blends the refined endpoint with the original block output.
- Evaluation across dense, sparse-expert, and latent-attention checkpoints, plus cache, window, solver, and decoding ablations.

## Method

For a frozen window operator $g$, define $F_g(x)=g(x)-x$. Its ordinary forward pass is exactly one unit Euler step on the constructed field. Naively repeating $g$ takes multiple unit steps; the proposed refinement instead uses $K$ smaller steps:

$$
x_{k+1}=x_k+\frac{1}{K}F_g(x_k).
$$

Writing this damped update as $D$, Equation 16 combines $D^K(x_0)$ with the original output as $\beta g(x_0)+(1-\beta)D^K(x_0)$. This is an integration-based motivation, not a guarantee that a more accurate ODE solution improves task accuracy.

Block-mode repeats the composed window; layer-mode completes the iterations for each layer before advancing. The authors describe pinned expert routing in layer-mode as protection against routing changes on MoE models. During decoding, intermediate evaluations read past KV entries while snapshot/restore prevents duplicate cache writes; one final stash pass writes the canonical entries. FIRST and LAST cache strategies use pre-loop and post-loop hidden states, respectively.

## Experiments

The study uses lm-evaluation-harness and reports 45 model–benchmark cells across seven checkpoint families. Section 3.5 reports 27 positive, 12 neutral, and six negative cells, with neutrality defined by an absolute change of at most 0.3 percentage points.

| Model | Benchmark | Reported gain (pp) | Source |
| --- | --- | ---: | --- |
| Qwen3-4B-Instruct | MMLU-Pro, 5-shot | +2.64 | Table 3 |
| Qwen3-4B-Instruct | GPQA-Main, 0-shot | +2.01 | Table 3 |
| Qwen1.5-MoE-A2.7B | ARC-Challenge, 25-shot | +2.30 | Table 3 |
| Moonlight-16B-A3B | OpenBookQA, 0-shot | +1.20 | Table 3 |
| Qwen3-30B-A3B-Instruct | CommonsenseQA | +1.14 | Table 4 |

Table 4 separately presents a transfer check using two preselected solver choices. Appendix K reports selected positive cells rather than the complete 19-task suite.

Ablations favor short windows: on Qwen3-1.7B-Base, four layers yield +0.55 points on the 16-task aggregate, while six yield −0.82. Higher-order solvers and fixed-point accelerators do not outperform the damped Euler reference in the reported canonical sweep. On Qwen3-4B-Instruct GSM8K@200, full decode looping takes 236 seconds versus 194 for baseline (+21.6%); prefill-only looping takes 191 seconds, a difference described as within measurement noise.

## Limitations

- **Selection protocol is inconsistent.** Section 3.1 and Table 3 describe a fixed untuned recipe, but Section 3.4 describes best configurations and Appendix P explicitly documents approximately 720 cell–configuration evaluations with per-cell search. Appendix D also lists varied windows, strategies, and cache settings. The supplied text does not resolve which results belong to each protocol.
- **Implementation descriptions differ.** Layer-mode is described as the MoE default, while several appendix headline configurations use block-mode. Algorithm 3 lists fewer damped updates than Equation 16's endpoint definition. These details need clarification for exact reproduction.
- **Gains are conditional.** Small distilled models retain negative knowledge-task cells; window selection can improve the screening suite while hurting held-out MMLU. Disabling loop-region KV writes severely damages generation.
- **Uncertainty is incomplete.** Results are point estimates without confidence intervals; small-benchmark changes require caution. Failure of an accelerator alone does not establish non-contraction mathematically.

The supplied Markdown does not explicitly identify this paper's publication year, DOI, or arXiv identifier; these are left unspecified.

## Related Concepts

- [[concepts/damped-inference-time-layer-reuse|Damped Inference-Time Layer Reuse]]
- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]
- [[concepts/cyclic-fixed-points-in-looped-transformers|Cyclic Fixed Points in Looped Transformers]]
- [[concepts/sparse-mixture-of-experts|Sparse Mixture of Experts]]

## Related Papers

- [[papers/a-mechanistic-analysis-of-looped-reasoning-language-models|A Mechanistic Analysis of Looped Reasoning Language Models]] provides a complementary view of recurrent-state stability; the present paper studies retrofitted finite-step reuse.
- [[papers/looped-transformers-are-better-at-learning-learning-algorithms|Looped Transformers Are Better at Learning Learning Algorithms]] studies trained recurrence, contrasting with the frozen-checkpoint intervention here.

[[index|Library home]]
