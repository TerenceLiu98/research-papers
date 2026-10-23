---
title: Functional Multiple-Index Models
type: concept
aliases:
  - Functional Multiple Index Models
  - Multiple-Index Functional Models
tags:
  - functional-data-analysis
  - sufficient-dimension-reduction
  - nonlinear-models
  - multivariate-functional-data
---

## Overview

Functional multiple-index models predict a response through several scalar projections of one or more functional covariates. They extend functional single-index models, which use one inner product such as $\langle X,\theta\rangle$, by allowing a nonlinear link function to combine multiple learned projections. This separates functional dimension reduction from the finite-dimensional prediction rule.

## Key Ideas

- Each index is an inner product between a functional covariate and an index function, reducing a curve to a scalar score while retaining the curve's domain structure.
- Multiple indices allow the response to depend on several directions in function space rather than a single projection.
- With multivariate functional data, projections can be computed for each component and combined by a nonlinear link function.
- Index functions may be estimated with fixed basis expansions, functional principal components, nonparametric methods, or [[Adaptive Basis Layers|supervised neural basis layers]].
- A learned transformation can precede the projections. Transformer encoders, for example, can model dependencies among functional components before their index scores are computed.
- Interpretation requires care because different index functions or rotations of their scores may describe the same predictive map; prediction does not necessarily identify a unique set of functional directions.

## Important Papers

- [[Deep Functional Multiple Index Models with an Application to SER]]
- Jiang et al. (2020), "A Functional Single-Index Model."
- Jiang and Wang (2011), "Functional Single Index Models for Longitudinal Data."
- Ferraty, Park, and Vieu (2011), "Estimation of a Functional Single Index Model."

## Related Concepts

- [[Functional Neural Networks]]
- [[Adaptive Basis Layers]]
- [[Functional Principal Component Analysis]]
- Functional data analysis
- Sufficient dimension reduction
- Multivariate functional data
- Functional additive models
