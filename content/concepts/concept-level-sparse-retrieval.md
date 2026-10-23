---
title: Concept-Level Sparse Retrieval
type: concept
aliases:
  - CL-SR
tags:
  - sparse-retrieval
  - dense-retrieval
  - sparse-autoencoders
  - information-retrieval
---

## Overview

Concept-Level Sparse Retrieval (CL-SR) converts a frozen dense retriever's embeddings into sparse codes with a [[concepts/sparse-autoencoders|Sparse Autoencoder]], then uses the active latent indices as the vocabulary of an inverted index. It aims to preserve semantic matching beyond exact words while retaining the compact storage, efficient matching, and inspectable contributions of sparse retrieval.

## Key Ideas

- Queries and documents are first embedded by a dense retriever and projected into a nonnegative sparse latent space. Each active coordinate acts as a learned retrieval unit rather than a lexical token.
- An inverted index stores documents under their strongest latent coordinates. At query time, only shared active coordinates contribute to the score.
- Latent activation magnitudes replace term frequencies. Saturation and document-length normalization adapt BM25-style scoring to the total activation mass in latent space.
- Inverse document frequency downweights latents that activate on many documents. This is important because frequent SAE features tend to describe abstract or stylistic properties rather than discriminative content.
- Retrieval fidelity, feature interpretability, and efficiency are distinct objectives. More active latents can better preserve a dense retriever's ranking while increasing index size and weakening individual-feature coherence.
- The learned units inherit the source retriever's and training corpus's biases and may be incomplete or unstable across SAE runs, so their natural-language labels are model-specific explanations rather than universal semantic categories.

## Important Papers

- [[papers/decoding-dense-embeddings-sparse-autoencoders-for-interpreting-and-discretizing-dense-retrieval|Decoding Dense Embeddings: Sparse Autoencoders for Interpreting and Discretizing Dense Retrieval]] introduces CL-SR and evaluates it on MS MARCO and TREC Deep Learning benchmarks.
- Formal et al. (2021), "SPLADE v2: Sparse lexical and expansion model for information retrieval": represents text with learned weighted lexical vocabularies and provides a central comparison point.
- Wang et al. (2023), "SimLM: Pre-training with representation bottleneck for dense passage retrieval": provides the dense representation decomposed in the initial CL-SR study.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/text-embedding-models|Text Embedding Models]]
- Dense passage retrieval
- Neural sparse retrieval
- Inverted indexes
- Vocabulary mismatch
