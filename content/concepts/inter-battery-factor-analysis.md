---
title: Inter-Battery Factor Analysis
type: concept
aliases:
  - IBFA
definition: "Inter-battery factor analysis decomposes two sets of measurements on matched observations into common latent factors and factors specific to each measurement set."
tags:
  - latent-variable-models
  - multi-view-learning
---

## Overview

Inter-battery factor analysis separates variation shared by two measurement sets from systematic variation unique to either set. It is useful when combining sources should preserve their differences as well as recover a common structure.

## Key Ideas

- A shared actor representation contributes to both observed matrices through source-specific feature loadings; each matrix also has its own latent component and noise.
- Shared and source-specific structure require identification restrictions. In MD2S, shared locations are orthogonal to each source-specific subspace, with additional within-subspace normalization and loading constraints.
- A source-specific component describes residual systematic structure under the model. It does not by itself identify a distinct causal mechanism or preference.
- Source weighting and inferential procedures depend on the estimator. MD2S adds likelihood-based weighting, covariate-dependent locations, bootstrap uncertainty, and permutation-based dimension assessment; these are not universal properties of every IBFA implementation.
- Feature locations can help interpret actor locations, especially when one measurement set contains words.

## Important Papers

- Tucker (1958), “An Inter-Battery Method of Factor Analysis”: foundational formulation cited by the MD2S paper.
- [[papers/scaling-data-from-multiple-sources|Scaling Data from Multiple Sources]]: develops MD2S for shared and source-specific scaling of two datasets and applies it to Senate speech and votes.

## Related Concepts

- [[concepts/consensus-multidimensional-scaling|Consensus Multidimensional Scaling]]: combines source distance geometries; IBFA instead models shared and source-specific components of measurement matrices.
- [[concepts/multidimensional-scaling|Multidimensional Scaling]]: another route to low-dimensional representations, typically starting from dissimilarities.
