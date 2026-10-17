---
title: Adaptive Sparse Embeddings
type: concept
tags:
  - sparse-representations
  - adaptive-embeddings
  - efficient-retrieval
---

## Overview

Adaptive sparse embeddings represent an input with a small number of nonzero coordinates in a larger latent dictionary. The activity budget controls retrieval cost while dictionary width controls available representational capacity. This offers an alternative to adaptive dense embeddings, whose cost is controlled by truncating vector length.

## Key Ideas

- Separate ambient dimension $h$ from active-coordinate budget $k$. Different examples can activate different coordinates in the same dictionary.
- A post-training [[concepts/sparse-autoencoders|sparse autoencoder]] can map frozen dense embeddings into this space. Reconstruction preserves input information, while a task-aware contrastive objective can improve retrieval geometry.
- Sparse similarity computation can skip zero entries, but realized speed depends on overlap patterns, database size, hardware, and sparse kernels. Coordinate indices also consume memory.
- Adaptive activity does not guarantee quality at every budget. Dead latents waste dictionary capacity, and highly sparse shared image-text spaces can lose alignment quality.
- Evaluate accuracy and measured latency together. Include embedding generation and sparse projection when reporting end-to-end cost, and distinguish controlled-backbone comparisons from comparisons between independently pretrained models.
- Retrieval quality and interpretability are separate goals: a useful sparse retrieval coordinate need not have a verified human-readable meaning.

## Important Papers

- [[papers/beyond-matryoshka-revisiting-sparse-coding-for-adaptive-representation|Beyond Matryoshka: Revisiting Sparse Coding for Adaptive Representation]] introduces contrastive sparse representations for image, text, and multimodal retrieval, and studies their accuracy-latency trade-off.
- Kusupati et al. (2022), "Matryoshka Representation Learning": the contrasting approach of jointly training nested dense prefixes, as discussed in the CSR paper.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/text-embedding-models|Text Embedding Models]]
- [[concepts/massive-text-embedding-benchmark-mteb|Massive Text Embedding Benchmark (MTEB)]]
