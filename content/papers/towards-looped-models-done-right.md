---
title: "Towards Looped Models Done Right: Part I — Topology, Input Injection, Recurrent-State Design"
type: paper
authors:
  - Benhao Huang
  - Chufan Shi
  - Junlin Chen
  - Shicheng Wen
  - Zhengzhong Liu
  - Eric Xing
  - Xuezhe Ma
year: 2026
tags:
  - looped-transformers
  - recurrent-depth
  - mixture-of-experts
---

[[index|Library home]]

## TL;DR

Controlled pretraining comparisons favor a prelude–loop–coda architecture over full-stack recurrence. Input injection improves context use and code generation but can hurt mathematics; random initialization and shared high/low states offer no consistent additional benefit. A Huginn-style sparse model beats Ouro on eight of ten benchmarks while using one quarter of the resident parameters of its compute-matched feedforward reference.

## Research Question

Which differences between Ouro and Huginn explain their performance: recurrence placement, repeated input injection, or recurrent-state organization? Does the ordering between complete architectures persist with sparse experts?

## Motivation

Weight reuse increases logical depth without proportionally increasing stored parameters. Comparing complete recurrent recipes obscures which architectural choices matter, and resident parameter counts alone do not describe computation under repeated application.

## Contributions

- A common decomposition into prelude, shared recurrent body, input write, state initialization, and coda.
- Dense ablations matching stored parameters, logical block executions, training data, and token budgets.
- A sparse-model comparison and route-freezing intervention demonstrating that iteration-specific expert identities contribute to performance.

## Method

Ouro executes 28 shared blocks four times. The sandwich model uses eight untied prelude blocks, a 12-block core repeated eight times, and eight untied coda blocks. Both store 28 blocks and execute 112 logical blocks. Dense models have approximately 730M stored parameters and 2.9B unrolled parameter applications.

The input-write ablations compare injection against no injection within each architecture: raw embeddings for Ouro and a fixed prelude representation for the sandwich model. A learned diagonal write combines the current state with a projected input. State ablations compare prelude initialization, Gaussian initialization, and shared high/low states with six low-state and two high-state updates. The latter shares one recurrent body rather than using separate H/L modules.

Training uses TxT360, an 8,192-token sequence length, AdamW, and a learning-rate sweep. MoE variants replace each FFN with 25 experts and top-2 routing. Each recurrent MoE stores approximately 8B non-embedding parameters, with 793.9M physical active parameters and roughly 3.2B unrolled active parameter applications per token. The 112-layer feedforward MoE stores 32B parameters at matched logical active compute.

## Experiments

Dense comparisons span 42B, 84B, 168B, and 336B training tokens. At 336B tokens, moving recurrence into the sandwich envelope raises MATH500 from 20.80 to 32.80 and GSM8K from 54.97 to 62.02; ARC-C and HumanEval+ decline (Table 2). Adding prelude injection raises HumanEval+ from 28.66 to 34.15, but lowers MATH500 from 32.80 to 29.20 and GSM8K from 62.02 to 59.51 (Table 3).

Random initialization has gains exceeding one point on two tasks and losses exceeding one point on four. Shared H/L states reduce MATH500 by 7.20 points relative to the input-initialized single-state control (Table 4). The complete randomly initialized Huginn endpoint nevertheless exceeds the original Ouro endpoint on all ten dense benchmarks.

MoE results after 500B training tokens (Table 5; task-specific percentage metrics):

| Benchmark | Feedforward MoE | Ouro MoE | Huginn MoE |
| --- | ---: | ---: | ---: |
| ARC-C | 53.22 | 51.33 | 50.47 |
| HellaSwag | 57.30 | 54.82 | 55.10 |
| MMLU | 67.13 | 64.03 | 66.81 |
| BBH-CoT | 71.76 | 69.05 | 68.85 |
| TriviaQA | 59.02 | 50.98 | 51.04 |
| DROP | 56.81 | 57.70 | 59.65 |
| MATH500 | 53.40 | 49.80 | 53.40 |
| GSM8K | 80.82 | 78.92 | 83.62 |
| HumanEval+ | 56.10 | 48.17 | 49.39 |
| MBPP+ | 60.85 | 58.99 | 59.52 |

Huginn exceeds Ouro on eight tasks, trailing on ARC-C and BBH-CoT. The feedforward reference leads on seven tasks; Huginn wins on DROP and GSM8K and ties on MATH500 with 75% fewer resident parameters.

A 48-input routing probe finds a 49.4% mean top-1 expert-switch rate between adjacent iterations. Freezing iterations 2–8 to the first iteration's top-2 identities, while recomputing mixture weights, lowers accuracy on all six intervention tasks. MMLU drops 11.2 points; this intervention uses subject-macro accuracy rather than the main table's micro accuracy (Appendix C).

## Limitations

The study does not establish scaling laws or multi-seed uncertainty. MoE comparisons change complete architectures together, so they do not isolate each component's sparse-model effect. Raw and contextualized input sources remain coupled to different recurrence envelopes. Shared-module H/L results do not rule out separately parameterized hierarchies, and initialization experiments do not directly test multi-start path independence or depth extrapolation. Some evaluation traces differ in stopping or prompt conventions, documented in Appendix B. Lower parameter storage is not evidence of lower latency at matched FLOPs.

## Related Concepts

- [[concepts/sparse-mixture-of-experts|Sparse Mixture of Experts]]: combines conditional capacity with recurrent parameter reuse.
- [[concepts/cyclic-fixed-points-in-looped-transformers|Cyclic Fixed Points in Looped Transformers]]: provides a dynamical perspective on input injection and repeated blocks; convergence is distinct from benchmark accuracy.
- [[concepts/latent-reasoning|Latent Reasoning]]: computation proceeds through repeated hidden-state updates.

## Related Papers

- [[papers/a-mechanistic-analysis-of-looped-reasoning-language-models|A Mechanistic Analysis of Looped Reasoning Language Models]] is cited for the relationship between recurrent block size, injection, normalization, and cyclic dynamics.
- [[papers/solve-the-loop-attractor-models-for-language-and-reasoning|Solve the Loop: Attractor Models for Language and Reasoning]] is discussed among iterative models using random initial states; the present finite-unrolling ablations do not directly assess attractor-based objectives.

Source: supplied manuscript dated July 31, 2026. [Author-provided code repository](https://github.com/ifm-ai/xllm-loop).
