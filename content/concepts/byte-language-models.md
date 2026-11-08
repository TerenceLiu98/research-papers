---
title: Byte Language Models
type: concept
aliases:
  - Byte-Level Language Models
  - Byte LMs
tags:
  - language-modeling
  - tokenizer-free-modeling
  - byte-representations
---

## Overview

Byte language models represent text as UTF-8 bytes rather than learned subword tokens. Their fixed, small vocabulary avoids unknown tokens and language-specific segmentation assumptions, but creates sequences several times longer than typical subword encodings. The central design problem is therefore how to use or reduce the additional computation while learning useful abstractions directly from raw byte sequences.

## Key Ideas

- **Universal input units.** Bytes provide deterministic coverage of valid UTF-8 text without a learned vocabulary or normalization-dependent merge inventory.
- **Granularity changes computation.** More prediction positions can improve parameter efficiency by applying a model repeatedly within spans that a subword model predicts once, but this generally raises training and sequential inference cost.
- **Local context remains necessary.** Hash embeddings, convolutions, pooling, learned patches, and hierarchical architectures help convert low-level bytes into representations useful for longer-range modeling.
- **Token-like structure can emerge.** [[papers/byte-language-models-scaling-emergent-abstractions-and-information-allocation|Byte Language Models: Scaling, Emergent Abstractions, and Information Allocation]] reports segmentation-like aggregation positions in a flat Transformer and shows that some later layers can operate on pooled local states without retraining.
- **Prediction difficulty is uneven.** Boundary bytes can carry high uncertainty while their within-span continuations are nearly deterministic. [[concepts/speculative-decoding|Speculative Decoding]] and adaptive computation can potentially avoid spending full target-model work uniformly across all byte positions.

## Important Papers

- Xue et al. (2022), "ByT5: Towards a Token-Free Future with Pre-trained Byte-to-Byte Models": studies byte-to-byte pretraining for multilingual text generation.
- Clark et al. (2022), "CANINE: Pre-training an Efficient Tokenization-Free Encoder for Language Representation": combines fine-grained inputs with downsampling for encoder tasks.
- Wang et al. (2024), "MambaByte: Token-free Selective State Space Model": applies selective state-space modeling directly to byte sequences.
- Pagnoni et al. (2025), "Byte Latent Transformer: Patches Scale Better Than Tokens": introduces a local-global-local architecture over dynamically formed byte patches.
- Hwang et al. (2026), "Dynamic Chunking for End-to-End Hierarchical Sequence Modeling": learns hierarchical sequence chunks end to end.
- [[papers/byte-language-models-scaling-emergent-abstractions-and-information-allocation|Byte Language Models: Scaling, Emergent Abstractions, and Information Allocation]]: analyzes scaling, emergent local abstractions, and nonuniform information allocation in flat byte Transformers.

## Related Concepts

- Tokenization-free language modeling
- Subword tokenization
- Neural scaling laws
- Adaptive computation
- [[concepts/speculative-decoding|Speculative Decoding]]
- [[concepts/pixel-language-models|Pixel Language Models]]: remove text tokenization by rendering text as images rather than encoding UTF-8 bytes.
