---
title: Deep Metric Learning
type: concept
aliases:
  - DML
  - Deep Distance Metric Learning
tags:
  - deep-metric-learning
  - representation-learning
  - image-retrieval
  - embedding-learning
---

## Overview

Deep metric learning trains an encoder so distances in its embedding space reflect task-relevant similarity. It supports retrieval, recognition, clustering, and fine-grained categorization, often under a zero-shot protocol in which training and test classes do not overlap. Its central challenge is not only separating observed classes but learning a geometry that transfers to unseen classes without relying on incidental cues.

## Key Ideas

- Pair- and tuple-based objectives, including contrastive and triplet losses, compare examples directly. Their effectiveness depends on sampling informative positives and negatives, which can make optimization expensive or unstable.
- Proxy-based objectives replace many example comparisons with learned representatives for classes or semantic modes. This reduces sampling complexity and makes global class relationships easier to optimize.
- Retrieval evaluation should cover both local and full-ranking behavior. Recall@K measures whether a relevant item appears near the top, while R-Precision and MAP@R account for more of the relevant set; NMI evaluates clustering structure.
- Embeddings can collapse into a low-dimensional or anisotropic subspace even when the training loss decreases. Geometry-aware regularizers aim to preserve effective dimensionality and distribute representations more usefully.
- Metric learners can exploit shortcuts such as class-correlated backgrounds, textures, colors, or viewpoints. Held-out classes alone do not distinguish genuine semantic transfer from reuse of shortcuts that persist across the benchmark split.
- Invariance objectives and data or feature interventions can reduce sensitivity to nuisance variation, but their causal interpretation depends on whether the intervention actually changes only the intended nuisance factor.

## Important Papers

- [[papers/couce-a-unified-causal-framework-for-debiased-deep-metric-learning|CouCE: A Unified Causal Framework for Debiased Deep Metric Learning]]
- Hadsell, Chopra, and LeCun (2006), "Dimensionality Reduction by Learning an Invariant Mapping."
- Schroff, Kalenichenko, and Philbin (2015), "FaceNet: A Unified Embedding for Face Recognition and Clustering."
- Movshovitz-Attias et al. (2017), "No Fuss Distance Metric Learning Using Proxies."
- Kim et al. (2020), "Proxy Anchor Loss for Deep Metric Learning."
- Musgrave, Belongie, and Lim (2020), "A Metric Learning Reality Check."

## Related Concepts

- [[concepts/causal-representation-learning|Causal Representation Learning]]
- [[concepts/disentangled-representations|Disentangled Representations]]
- [[concepts/geometry-aware-regularization|Geometry-Aware Regularization]]
- Representation learning
- Contrastive learning
- Out-of-distribution generalization
