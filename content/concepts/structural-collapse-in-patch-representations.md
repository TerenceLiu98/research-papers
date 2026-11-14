---
title: "Structural Collapse in Patch Representations"
type: concept
tags:
  - self-supervised-learning
  - dense-prediction
---

## Overview

Structural collapse occurs when patches within an image encode nearly the same image-dependent information. Features can remain diverse across images while losing the spatial distinctions needed for dense prediction.

## Key Ideas

- **Per-patch information is insufficient:** under conditionally factorized targets, joint input–target information equals the sum of per-target information minus target total correlation. Repeatedly encoding the same image identity inflates the sum without adding joint information.
- **Three failures differ:** global collapse loses variation across examples; structural collapse loses within-image diversity; positional collapse encodes patch location rather than image content.
- **Geometry can supply a surrogate constraint:** JEM projects final student features to reproduce pairwise similarities from several teacher depths. The final representation must retain recoverable structure without being forced to directly share each earlier layer's geometry.
- **Scale changes the diagnosis:** JEM's structural regularizer has little effect in its smaller ablation but prevents progressive spatial degradation in larger-model training. A small-model ablation alone does not settle its scaling value.
- **Proxy versus guarantee:** similarity preservation does not directly estimate or provably minimize total correlation. Its justification combines the information decomposition with empirical spatial-diversity diagnostics.

## Important Papers

- [[papers/scalable-patch-level-self-supervised-learning|Scalable Patch-Level Self-Supervised Learning]] develops the decomposition and tests structural regularization in JEM (Sections 3.2.3, 4.2, and A.1).

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] learn through prediction of latent targets and require mechanisms that retain useful information.
- [[concepts/linear-probing|Linear Probing]] measures accessibility of downstream signals in frozen representations, complementing collapse diagnostics.
