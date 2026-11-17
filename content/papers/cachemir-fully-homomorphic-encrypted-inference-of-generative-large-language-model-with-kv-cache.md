---
title: "Cachemir: Fully Homomorphic Encrypted Inference of Generative Large Language Model with KV Cache"
type: paper
authors:
  - Ye Yu
  - Pedro Soto
  - Yifan Zhou
  - Wenjie Xiong
  - Yi Chen
  - Meng Li
year: null
tags:
  - private-inference
  - homomorphic-encryption
  - llm-inference
---

## TL;DR

Cachemir adapts fully homomorphic encrypted Transformer inference to autoregressive decoding through compatible encrypted KV-cache layouts, efficient vector–matrix multiplication, and automatic bootstrapping placement. The paper reports 48.83× and 67.16× CPU speedups over modeled MOAI and THOR baselines and 1.61 minutes per Llama-3-8B output token with GPU acceleration.

## Research Question

How can encrypted inference exploit the reduced computation of KV-cache-enabled decoding without losing its benefits to ciphertext packing, rotations, and bootstrapping?

## Motivation

Prefill-oriented encrypted matrix multiplication does not efficiently handle the small activation vectors and incrementally growing attention state of decoding. Ciphertext slots greatly outnumber activation dimensions, while incompatible cache layouts can require costly transformations. Efficient decoding therefore requires joint design of layout, cache updates, and ciphertext level management.

## Contributions

- Interleaved replicated packing fills idle ciphertext slots and reduces rotations for ciphertext–plaintext vector–matrix multiplication.
- Complementary K and V layouts support encrypted attention and incremental cache updates.
- A pruned level-assignment graph and hierarchical optimization exploit repeated Transformer blocks and permit bootstrapping inside nonlinear modules.

## Method

The protocol uses RNS-CKKS with encrypted client activations and plaintext server weights under a two-party, semi-honest threat model (§2.3). Its confidentiality argument relies on the underlying encryption scheme.

Interleaved replicated packing spaces activation entries across slots, replicates them through ordinary rotations, multiplies packed weight diagonals, and reduces partial results. Baby-step giant-step scheduling further reduces rotations. Extraction masks are fused into downstream RoPE, nonlinear operations, or cache updates, leaving the linear multiplication at one multiplicative level (§4).

The K cache packs several tokens into each ciphertext, enabling parallel query–key products. The V cache distributes each token across ciphertexts so weighted attention produces the interleaved layout required by the output projection. New entries are aligned with unused slots and added; multi-head packing evaluates independent heads in parallel (§5).

Bootstrapping placement minimizes operation and refresh costs over feasible ciphertext levels. Dominated transitions are pruned, repeated blocks support hierarchical search, and nonlinear functions are subdivided where intermediate ciphertext counts remain small (§6). Nonlinear approximations follow THOR with profiled ranges and Goldschmidt reciprocal iterations.

## Experiments

The evaluation uses GPT2-base, TinyLlama-1.1B, and Llama-3-8B on an Intel Xeon Platinum 8558P and NVIDIA A100-80GB. CPU and GPU implementations use Lattigo and customized Phantom respectively. Runtime is estimated from module measurements; baseline runtime uses theoretical operation counts and measured primitive costs (§7.1). Parameters include polynomial degree 65,536, 32,768 slots, maximum level 13, and claimed 128-bit security.

| Result | Reported measurement |
|---|---|
| Llama-3-8B single-decoder step, prompt/current lengths 64/512 | 477.81 s CPU, versus 23,332.15 s MOAI and 32,087.85 s THOR (Table 5) |
| Ablation: cache only → cache plus VMM → full method | 822.58 → 522.57 → 477.81 s per decoder step |
| Full Llama-3-8B GPU generation | 1.61 minutes per token |
| VMM rotations at hidden dimension 4096 | 52 versus 375 for padded BOLT (Table 4) |
| Placement algorithm runtime | 234.24 versus 463.31 ms for Orion (§7.2) |
| MRPC accuracy, plaintext → approximated model | 71.32 → 71.57; F1 82.19 → 82.31 |
| WikiText-2 perplexity, plaintext and approximated | Byte 1.50; word 8.83 in both cases |

The 1.98× placement result in §7.2 measures search runtime; it should not be conflated with the approximately 1.10× inference improvement from adding placement optimization in Table 5. The abstract and introduction describe this benefit less precisely.

## Limitations

Baseline comparisons are analytical estimates calibrated with measured primitives, not uniform end-to-end baseline executions. Table 5 describes one decoder, whereas the GPU token figure covers the full model. Accuracy evidence concerns the approximated model on two datasets without downstream fine-tuning; it does not establish quality across arbitrary prompts and tasks. Nonlinear ranges are empirically profiled. Prefill is acknowledged to be suboptimal. A 1024-token encrypted KV cache occupies about 17 GB, and encoded model weights occupy hundreds of GB (§7.5). The threat model assumes correct protocol execution and does not cover malicious participants.

The supplied manuscript gives no explicit publication year or stable paper identifier; these remain unspecified.

## Related Concepts

- [[concepts/encrypted-kv-caching|Encrypted KV Caching]]: cache layout and append operations must support attention directly in ciphertext space.
- [[concepts/optimization-based-llm-serving|Optimization-Based LLM Serving]]: an analogous structure-aware optimization perspective, here applied to cryptographic level assignment rather than request scheduling.

## Related Papers

- MOAI (source reference [55]): interleaved batching for encrypted inference; Cachemir instead replicates a decoding vector and supports dynamic cache state.
- THOR ([38]): supplies the nonlinear approximation foundation and an encrypted Transformer baseline.
- NEXUS ([54]): non-interactive encrypted Transformer inference with an offline–online multiplication strategy whose preprocessing is costly for decoding.
- Orion ([17]): shortest-path bootstrapping placement extended here with graph pruning, repeated-block decomposition, and intra-module placement.
