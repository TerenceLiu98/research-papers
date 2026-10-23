---
title: Text Embedding Models
type: concept
aliases:
  - Text Embeddings
  - Sentence Embeddings
tags:
  - text-representations
  - semantic-similarity
  - information-retrieval
  - representation-learning
---

## Overview

Text embedding models map text to fixed-length numerical representations so that semantic relationships can be estimated with vector operations. They are commonly used for similarity search, classification, clustering, duplicate detection, and retrieval-augmented generation. Their deployment profile differs from generative LLMs because documents can be encoded once and reused across many queries.

## Key Ideas

- Encoder-based systems produce vectors for documents, queries, or sentences; cosine similarity or another distance then supplies the comparison operation.
- Contrastive training, hard-negative mining, instruction tuning, and multi-stage distillation are common ways to align vector geometry with retrieval and semantic tasks.
- A single embedding model can support different pipelines: k-nearest neighbors for classification, cosine similarity for STS and retrieval, and k-means for clustering.
- Bi-encoders encode queries and documents independently, enabling offline document indexing and high throughput but limiting direct cross-document or query-document reasoning.
- [[concepts/cross-encoders|Cross-Encoders]] instead process a text pair jointly. They can model token-level interactions across both inputs, but require a separate forward pass for every pair and therefore scale less efficiently for exhaustive search.
- Decoder-only LLMs can also be adapted to produce embeddings. Once the output is used as a fixed vector, its inference and evaluation behavior belongs to the embedding-pipeline comparison.
- [[concepts/multimodal-embedding-models|Multimodal Embedding Models]] extend vector comparison beyond text. Preserving the original text path can keep an existing index compatible while learned interfaces align images, audio, or video to the same backbone.
- Quality is workload-dependent. Reasoning-heavy retrieval can favor a model that jointly reads documents, while classification, similarity, and clustering can be served efficiently with specialized embeddings.
- Behavioral supervision can encode associations beyond semantic resemblance. In [[concepts/belief-embeddings|Belief Embeddings]], debate co-voting triplets improve held-out belief-triplet discrimination while reducing S-BERT's GLUE-STSB Spearman correlation from 0.877 to 0.718. Domain-specific geometry therefore needs evaluation alongside general semantic similarity.

## Important Papers

- [[The Embedder's Dilemma: LLMs Are Better, but at What Cost?]]
- [[papers/a-semantic-embedding-space-based-on-large-language-models-for-modelling-human-beliefs|A semantic embedding space based on large language models for modelling human beliefs]]
- [[papers/jina-embeddings-v5-omni-geometry-preserving-embeddings-via-locked-aligned-towers|jina-embeddings-v5-omni: Geometry-preserving Embeddings via Locked Aligned Towers]]
- Reimers and Gurevych (2019), "Sentence-BERT: Sentence embeddings using siamese BERT-networks." [arXiv](https://arxiv.org/abs/1908.10084)
- Wang et al. (2022), "Text embeddings by weakly-supervised contrastive pre-training." [arXiv](https://arxiv.org/abs/2212.03533)
- Su et al. (2023), "One embedder, any task: Instruction-finetuned text embeddings." [arXiv](https://arxiv.org/abs/2212.09741)
- Muennighoff et al. (2023), "MTEB: Massive text embedding benchmark." [arXiv](https://arxiv.org/abs/2210.07316)

## Related Concepts

- [[Massive Text Embedding Benchmark (MTEB)]]
- [[concepts/belief-embeddings|Belief Embeddings]]
- [[concepts/multimodal-embedding-models|Multimodal Embedding Models]]
- [[concepts/cross-encoders|Cross-Encoders]]
- [[Cost-Aware Model Selection]]
- Semantic textual similarity
- Dense retrieval
- Vector search
- Retrieval-augmented generation
