---
title: "SpiralThinker: Latent Reasoning through an Iterative Process with Text–Latent Interleaving"
type: paper
authors:
  - Shengmin Piao
  - Sanghyun Park
year: null
tags:
  - latent-reasoning
  - recurrent-computation
  - knowledge-distillation
---

[[index|Library home]]

## TL;DR

SpiralThinker alternates textual reasoning with repeatedly refined latent steps, supervised by an explicit-reasoning teacher. It leads the reported latent baselines on three benchmarks, but exceeds the explicit teacher's accuracy only on ProsQA. Iteration without alignment can hurt performance.

## Research Question

Can iteration-aware alignment make repeated latent-state updates useful while retaining interleaved textual reasoning?

## Motivation

Single-pass latent representations compress reasoning without explicitly supervising how it evolves. Repeated computation alone need not improve those representations. Alternating latent and textual steps offers an interface for combining internal computation with readable intermediate reasoning.

## Contributions

- An alternating text–latent training scheme with repeated refinement of latent embeddings.
- A progressive alignment objective that emphasizes later iterations while supervising earlier ones.
- Ablations separating alignment from iteration, plus measurements of text reduction and forward-pass counts.

## Method

First, fine-tune an explicit reasoning model with step-boundary tokens. Then replace either odd or even reasoning steps with groups of latent tokens, retaining the final answer. The implicit model starts from the explicit model; a frozen copy supplies teacher representations.

At each refinement, final-layer latent hidden states pass through a residual MLP, RMSNorm, and a fixed scale derived from the pretrained embedding matrix. These replace latent input embeddings before another forward pass. Across layers, normalized L1 loss aligns student end-of-latent states with teacher end-of-text states. These are prefix-conditioned cumulative summaries, not isolated step meanings (§3.2.4).

The total objective combines cross-entropy, excluding latent-token prediction, with alignment losses weighted by a softmax over iteration indices; later iterations receive greater weight. Inference alternates latent refinement and text generation using greedy decoding. Selected latent-token counts are 5, 5, and 6 for GSM8K-Aug, ProsQA, and StrategyQA; iteration counts are 5, 4, and 3 respectively.

## Experiments

The main setup uses Llama-3.2-1B with LoRA on four A100 GPUs and answer-level accuracy. Public baselines are retrained; Token Assorted numbers are taken from its paper because its code was unavailable.

| Method | GSM8K-Aug | ProsQA | StrategyQA |
|---|---:|---:|---:|
| iCoT-KD | 24.11 | 98.00 | 62.88 |
| iCoT-SI | 29.72 | 99.00 | 60.69 |
| Token Assorted (reported baseline) | 48.70 | 96.20 | — |
| Coconut | 49.85 | 97.80 | 60.00 |
| CODI | 51.02 | 80.80 | 60.70 |
| Pause Token | 53.37 | 95.80 | 57.64 |
| SpiralThinker | 56.56 | 99.40 | 63.32 |
| Explicit reasoning model (Appendix D.2) | 62.02 | 97.60 | 64.19 |

Accuracies are percentages. Relative to the best latent baseline in each column of Table 1, improvements are 3.19, 0.40, and 0.44 percentage points.

Without alignment or iteration, accuracy is 45.49/98.00/59.39. Iteration alone gives 45.72/97.40/58.08; alignment alone gives 48.67/98.60/61.14 (Table 2). This supports a complementary effect rather than a general benefit from extra iteration. More iterations eventually saturate or degrade performance.

Appendix D.2 reports text reductions of 54.22%, 24.92%, and 48.44%. Total forward counts change from 30.56 to 22.54, 44.71 to 44.89, and 77.14 to 46.16. These counts are a computational proxy, not measured latency. Qwen2.5 experiments extend the evaluation to 0.5B and 1.5B models; the larger variant performs better on all three tasks (Table 5).

## Limitations

Iteration budgets and alternation patterns are fixed rather than difficulty-adaptive. StrategyQA testing uses 229 validation examples with generated reasoning annotations; small accuracy differences warrant caution. The reported tables provide no uncertainty intervals. Evaluation covers small backbones and three benchmarks, and does not establish large-model scaling or general speedups. Nearest-embedding examples illustrate latent contents but do not establish causal faithfulness.

The supplied Markdown does not identify a publication year or stable paper identifier, so the year is left null. Code link supplied by the paper: [SpiralThinker](https://github.com/shengminp/SpiralThinker).

## Related Concepts

- [[concepts/latent-reasoning|Latent Reasoning]]: repeated continuous-state computation with explicit teacher supervision.

## Related Papers

- [[papers/what-matters-for-latent-reasoning-with-flow-matching|What Matters for Latent Reasoning with Flow Matching]]: a library comparison for evaluating refinement, causal utility, and efficiency of latent thoughts; not presented here as a citation made by SpiralThinker.
- Coconut and CODI are direct baselines: the former feeds hidden states back as inputs, while the latter distills textual reasoning into continuous representations.
