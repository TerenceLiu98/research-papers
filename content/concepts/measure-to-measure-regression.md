---
title: Measure-to-Measure Regression
type: concept
aliases:
  - M2M Regression
  - Distribution-to-Distribution Regression
tags:
  - probability-measures
  - distribution-regression
  - operator-learning
  - optimal-transport
---

## Overview

Measure-to-measure (M2M) regression learns an operator that maps an input probability measure to its paired output measure. Each training observation is a pair $(\mu_i, \nu_i)$ rather than a pair of vectors, and prediction applies the learned operator to a previously unseen input measure. This differs from distribution alignment, which learns a meta-distribution over measures without preserving specific input-output pairings.

## Key Ideas

- The statistical units are whole distributions, often represented by empirical point clouds with varying support sizes.
- A nonlinear M2M operator can be written as $\mathcal{T}(\mu)=(f_\mu)_\#\mu$, where the transport map depends on the source measure. This dependence is more expressive than a single source-independent pushforward map or Markov operator.
- Permutation-equivariant transformers naturally define measure-dependent maps: self-attention lets every output particle depend on the empirical distribution of all input particles.
- Static methods learn a one-step pushforward and optimize a distributional loss such as energy distance, maximum mean discrepancy, or a Wasserstein distance.
- Dynamic methods learn a measure-dependent velocity field and integrate its ODE. [[concepts/flow-matching|Flow Matching]] can supervise this field along paths induced by couplings between paired source and target measures.
- Generalization is evaluated on unseen measures, not merely unseen particles drawn from a measure observed during training.

## Important Papers

- [[papers/measure-to-measure-regression-with-transformers|Measure-to-Measure Regression with Transformers]]: formalizes nonlinear M2M regression and develops static transformer maps and dynamic Transformer Flow Matching.
- Ghodrati and Panaretos (2022), "Distribution-on-Distribution Regression via Optimal Transport Maps": develops transport-based distribution regression.
- Atanackovic et al. (2025), "Meta Flow Matching: Integrating Vector Fields on the Wasserstein Manifold": learns distribution-dependent vector fields using a separate distribution embedding.
- [[papers/wasserstein-flow-matching-generative-modeling-over-families-of-distributions|Wasserstein Flow Matching: Generative Modeling over Families of Distributions]]: learns a distribution over measures rather than a paired M2M regression operator.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/wasserstein-flow-matching|Wasserstein Flow Matching]]
