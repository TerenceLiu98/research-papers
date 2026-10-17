---
title: Document Aggregation for Short-Text Topic Modeling
type: concept
aliases:
  - Global Clustering Context
tags:
  - topic-modeling
  - short-text
  - document-clustering
---

## Overview

Document aggregation pools related short texts to provide richer word co-occurrences for topic learning. Aggregation may also expand reconstruction targets with words found in related documents. The central design problem is to share useful context while retaining the topical differences between individual texts.

## Key Ideas

- **Two sparsity problems:** Data sparsity limits observed co-occurrences. Label sparsity means the reconstruction target omits relevant vocabulary absent from a short document; it does not refer to missing supervised category labels.
- **Semantic grouping:** Clustering pretrained text embeddings can group related texts whose sparse word-count vectors have little overlap. In GloCOM, K-means groups are converted into global bag-of-words documents. The number of groups and the number of topics serve different purposes.
- **Local adaptation:** A shared context need not force identical topic proportions. GloCOM combines a global topic representation with a learned document-specific latent adapter, then applies softmax to obtain local topic weights.
- **Target augmentation:** A target of the form $\tilde{x}^d=x^d+\eta x^g$ gives weight to words from the document's group. This changes reconstruction supervision as well as the available context. Stronger augmentation can lower topic diversity, as GloCOM's sensitivity analysis illustrates.
- **Aggregation choices:** Nearest-neighbor augmentation can tailor context to each document; cluster pooling reuses a shared context across a group. Their semantic quality and preprocessing costs must be measured separately from model-training costs.
- **Scope and failure modes:** Poor grouping can transfer irrelevant vocabulary. Group count, embedding choice, and the need to refresh clusters in changing corpora affect applicability. Coherence, diversity, and document-clustering agreement measure different consequences of aggregation.

## Important Papers

- [[papers/glocom-a-short-text-neural-topic-model-via-global-clustering-context|GloCOM: A Short Text Neural Topic Model via Global Clustering Context]] combines semantic cluster pooling, global/local inference, and reconstruction-target augmentation, with separate ablations of the latter two components.
- Quan et al. (2015), "Short and Sparse Text Topic Modeling via Self-Aggregation": an earlier self-aggregation approach discussed by GloCOM.
- Lin et al. (2024), "Combating Label Sparsity in Short Text Topic Modeling via Nearest Neighbor Augmentation": the neighbor-augmentation method compared against GloCOM.

## Related Concepts

- [[concepts/text-embedding-models|Text Embedding Models]]
- [[concepts/amortized-variational-inference|Amortized Variational Inference]]
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]
- [[concepts/contextual-and-graph-fusion-for-topic-modeling|Contextual and Graph Fusion for Topic Modeling]]
