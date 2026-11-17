---
title: "mHC: Manifold-Constrained Hyper-Connections"
type: paper
authors: [Zhenda Xie, Yixuan Wei, Huanqi Cao, Chenggang Zhao, Chengqi Deng, Jiashi Li, Damai Dai, Huazuo Gao, Jiang Chang, Kuai Yu, Liang Zhao, Shangyan Zhou, Zhean Xu, Zhengyan Zhang, Wangding Zeng, Shengding Hu, Yuqing Wang, Jingyang Yuan, Lean Wang, Wenfeng Liang]
year: null
tags: [transformers, residual-connections, training-stability]
---

## TL;DR

mHC constrains mixing between parallel residual streams to approximately doubly stochastic matrices. This stabilizes hyper-connections while preserving their performance benefits: the 27B model improves all eight reported benchmarks over a standard residual baseline, with optimized infrastructure reporting 6.7% training-time overhead at four streams.

## Research Question

Can wider, learnable residual connectivity retain stable signal propagation and practical training efficiency at language-model scale?

## Motivation

Hyper-connections expand residual capacity without widening the expensive attention and feed-forward computations. However, products of unconstrained mixing matrices can amplify signals, while expanded activations increase memory traffic and pipeline communication. In the 27B experiment, HC exhibits a loss surge around step 12,000 and composite gain approaching 3,000.

## Contributions

- A doubly stochastic constraint for cross-stream residual mixing, with nonnegative read and write gates.
- A stability analysis connecting composition of residual matrices to propagation gain.
- Fused mixed-precision kernels, selective recomputation, and communication overlap that reduce the cost of wider streams.
- Pretraining comparisons at 3B, 9B, and 27B total parameters and a separate long-training 3B experiment.

## Method

For an n-stream state X, propagation is X_next = H_res X + H_postᵀ F(H_pre X). Input-dependent projections of the flattened, RMS-normalized state combine with learned static biases. Sigmoid gates define H_pre; twice-sigmoid gates define H_post. Exponentiation followed by 20 alternating column and row normalizations approximates a doubly stochastic H_res.

[[concepts/doubly-stochastic-residual-mixing|Doubly Stochastic Residual Mixing]] preserves the stream mean and makes the fixed mixing operator non-expansive; exact doubly stochastic matrices remain so under multiplication. This generalizes a conservation property of identity mappings without making every learned matrix an identity matrix.

Infrastructure fuses coefficient generation and residual updates, recomputes connection activations without rerunning the expensive layer function, and aligns recomputation with pipeline stages. An extended DualPipe schedule overlaps the larger communication payload with computation (Section 4.3).

## Experiments

DeepSeek-V3-inspired MoE models use four residual streams. The 3B, 9B, and 27B configurations train on 39.3B, 105B, and 262B tokens; their active parameter counts are 612M, 1.66B, and 4.14B. A separate 3B run uses 1.05T tokens (Appendix A.1).

Table 4 reports the following 27B results:

| Benchmark | Shots | Baseline | HC | mHC |
| --- | --- | --- | --- | --- |
| BBH EM | 3 | 43.8 | 48.9 | 51.0 |
| DROP F1 | 3 | 47.0 | 51.6 | 53.9 |
| GSM8K EM | 8 | 46.7 | 53.2 | 53.8 |
| HellaSwag accuracy | 10 | 73.7 | 74.3 | 74.7 |
| MATH EM | 4 | 22.0 | 26.4 | 26.0 |
| MMLU accuracy | 5 | 59.0 | 63.0 | 63.4 |
| PIQA accuracy | 0 | 78.5 | 79.9 | 80.5 |
| TriviaQA EM | 5 | 54.3 | 56.3 | 57.6 |

mHC improves seven of eight tasks over HC; MATH declines by 0.4 points. Final training loss is 0.021 below the residual baseline. Compute-scaling curves retain the advantage across the tested sizes. With finite normalization iterations, composite gain reaches approximately 1.6, versus nearly 3,000 for HC (Section 5.4). The optimized implementation reports 6.7% additional training time at n = 4.

## Limitations

Twenty Sinkhorn iterations only approximate the constraint. The exact matrix properties concern the residual mixing path, not a general guarantee for the full nonlinear network or its input-dependent Jacobian. Non-expansion does not imply preservation of every feature norm. The reported overhead depends on specialized kernels and pipeline scheduling. Detailed scaling evidence covers the disclosed models; unspecified in-house larger runs do not establish an independently assessable scaling range. Benchmark tables provide no uncertainty intervals.

## Related Concepts

- [[concepts/doubly-stochastic-residual-mixing|Doubly Stochastic Residual Mixing]]: the conservation constraint underlying mHC.

## Related Papers

- Zhu et al., “Hyper-Connections” (2024), arXiv:2409.19606: the widened residual architecture that mHC constrains.
- He et al., “Identity Mappings in Deep Residual Networks” (2016): motivates stable direct propagation across depth.
- [[papers/hyperloop-transformers|Hyperloop Transformers]]: the existing Wiki entry describes a related architecture using diagonal gates at shared-block loop boundaries instead of dense doubly stochastic mixing.

Source: supplied Cognitio Markdown, job `98d49860-917d-499d-bd8c-05a444f15db6`. The supplied text does not explicitly identify this paper's year or stable identifier; these are not inferred from its references.
