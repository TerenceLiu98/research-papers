---
title: Contextual and Graph Fusion for Topic Modeling
type: concept
tags:
  - topic-modeling
  - contextual-embeddings
  - graph-regularization
---

## Overview

Contextual and graph fusion combines document-level semantic representations with corpus-level word relationships to learn topics. The two sources address different requirements: document views help determine which themes a text expresses, while word relationships help ensure that words within a topic are coherent.

## Key Ideas

- **Complementary document views:** TF-IDF highlights corpus-specific vocabulary; pretrained contextual embeddings supply broader semantic information. Their latent coordinates need alignment before topic proportions can be meaningfully combined.
- **Topic-level fusion:** In CGTM, two shared-encoder branches reconstruct the same TF-IDF target through a common topic-word decoder. A learned transformation then combines their topic proportions. Reconstruction encourages alignment but does not prove unique semantic identification of the topics.
- **Sharpening:** A self-training target squares topic probabilities and adjusts for aggregate topic frequency. This emphasizes stronger document-topic assignments, with a tunable trade-off between salience and redundancy.
- **Graph-guided word geometry:** A corpus co-occurrence matrix can adjust word embeddings through residual propagation, $\hat\rho=(I+\epsilon R)\rho$. Graph reconstruction then encourages embedding similarities to reflect observed word relations.
- **Separate evaluation axes:** More coherent word lists need not produce better document clusters. Increased graph influence can also increase topic redundancy, so coherence, diversity, and document relevance require separate checks.
- **Computational scope:** Sparse observed co-occurrences can reduce graph storage, but a decoder computing all word pairs can still incur vocabulary-quadratic cost.

## Important Papers

- [[Neural Topic Modeling via Contextual and Graph Information Fusion]] introduces CGTM's topic alignment, sharpening, residual graph fusion, and graph decoder, with component ablations.

## Related Concepts

- [[Text Embedding Models]]
- [[Amortized Variational Inference]]
- [[Topic Model Evaluation]]
- [[Hierarchical Topic Models]]
