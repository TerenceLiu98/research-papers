---
title: Hyperloop Transformers
type: paper
authors:
  - Abbas Zeitoun
  - Lucas Torroba-Hennigen
  - Yoon Kim
year: null
tags:
  - transformers
  - parameter-sharing
  - model-compression
---

## TL;DR

Hyperloop combines a shared middle Transformer block with parallel residual streams and loop-specific hyper-connections. In the main FineWeb-Edu experiments it improves perplexity over depth-matched Transformers using roughly half the parameters, with small training-throughput overhead and competitive INT4 performance. The advantage over unshared models depends on initialization and training regime.

## Research Question

Can residual-stream flexibility recover the language-modeling quality lost through depth-wise parameter sharing while retaining its parameter savings?

## Motivation

Memory-constrained deployment makes total parameter storage important alongside computation. Repeating shared layers preserves effective depth with fewer weights, but ordinary looped models can lose perplexity quality. Hyperloop gives repeated computation a small amount of loop-specific flexibility.

## Contributions

- A middle-cycle architecture with hyper-connections at loop boundaries rather than every attention or MLP sublayer.
- A diagonal, input-dependent residual transition that avoids the Sinkhorn normalization used by manifold-constrained hyper-connections (mHC).
- Comparisons across three model sizes, weight-only GPTQ quantization, longer training, and architectural ablations.

## Method

Distinct begin and end blocks surround a shared middle block, normally repeated three times. The begin output is copied into four parallel residual streams. At each loop, an input-dependent projection reads these streams into one ordinary-width stream; the middle block processes it, a loop-position embedding is added, and a second projection writes the result into the parallel streams. A sigmoid-gated diagonal transition retains previous stream contents. The streams are averaged before the end block.

The middle-block weights are shared, while projection weights, gates, and position embeddings vary by loop. These additions require only about 150–300K parameters beyond ordinary looping. Unlike mHC, Hyperloop does not mix residual streams with a dense doubly stochastic transition. This is an architectural use of recurrence, distinct from the hypothesis that an existing untied model admits a faithful [[concepts/block-recurrent-transformer-depth|block-recurrent approximation]].

## Experiments

Models train on FineWeb-Edu with the Llama-2 tokenizer. Evaluation uses 50M held-out tokens; downstream accuracy averages eleven task evaluations. Table 1 reports:

| Effective depth | Training tokens | Transformer / Hyperloop parameters | BF16 perplexity, Transformer / Hyperloop | INT4 perplexity, Transformer / Hyperloop | BF16 task accuracy, Transformer / Hyperloop |
| --- | --- | --- | --- | --- | --- |
| 16 | 12.5B | 238.0M / 135.7M | 14.65 / 14.40 | 14.85 / 14.68 | 41.1% / 41.6% |
| 18 | 50B | 990.5M / 579.7M | 10.19 / 9.65 | 10.27 / 9.81 | 48.0% / 49.8% |
| 38 | 100B | 2018.0M / 990.8M | 8.60 / 8.49 | 8.71 / 8.59 | 52.8% / 54.6% |

Hyperloop also beats ordinary looping and mHC in the main aggregate results, but not on every downstream task. Training throughput on eight H100s is 750K, 354K, and 180K tokens/s, versus 786K, 367K, and 181K for vanilla Transformers. These are compiled PyTorch implementations, not a comparison against an optimized mHC kernel.

GPTQ uses 1024 calibration sequences and group size 128; Hessian estimation pools activations across repeated uses of each shared layer. Quantization slightly increases perplexity, but preserves the main comparisons.

At 100B training tokens, the smallest Hyperloop reaches 12.19 perplexity versus 12.15 for the Transformer and 12.56 for ordinary looping (Table 2). More streams and more loops show diminishing returns. At the smallest scale, diagonal transitions give 14.40 perplexity versus 14.59 for Sinkhorn and 14.61 for identity transitions; loop-boundary connections outperform the tested denser placements. Loop-specific LoRA improves ordinary looping less than Hyperloop in the reported comparison.

## Limitations

Appendix C materially qualifies the main results: with alternative initialization and tuned learning rates, the smallest Transformer achieves 12.94 perplexity, mHC 12.67, ordinary looping 13.47, and Hyperloop 13.08. Hyperloop still improves ordinary looping but does not outperform the untied baselines in this setting.

Experiments stop at approximately 2B untied parameters. Longer-training evidence covers only the smallest models. Lower cross-loop representation similarity supports a flexibility hypothesis but does not establish a causal explanation. Early exit and test-time scaling are proposed directions, not demonstrated deployment gains. Parameter savings and measured training throughput do not establish on-device latency or total runtime-memory savings.

## Related Concepts

- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]: provides the broader distinction between parameter reuse, effective computation depth, and trajectory fidelity.

## Related Papers

- [[papers/a-mechanistic-analysis-of-looped-reasoning-language-models|A Mechanistic Analysis of Looped Reasoning Language Models]]: cited for cyclic trajectories in looped latent states; Hyperloop instead studies modifying residual connectivity to improve parameter efficiency.
- Xie et al., “mHC: Manifold-Constrained Hyper-Connections” (2026): supplies the parallel residual-stream primitive that Hyperloop simplifies and moves to loop boundaries.
- Bae et al., “Relaxed Recursive Transformers: Effective Parameter Sharing with Layer-wise LoRA” (2024): motivates the alternative of loop-specific weight adaptation evaluated in Table 7.

Source: Cognitio parsed Markdown, job `4cfa2c87-17ea-46e1-932c-95f1718b2a6c`. The supplied text does not explicitly identify this paper's publication year or stable identifier; the year is left unspecified.
