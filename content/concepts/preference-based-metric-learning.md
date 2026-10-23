---
title: Preference-Based Metric Learning
type: concept
aliases:
  - Metric Learning from Preference Comparisons
  - Simultaneous Metric and Preference Learning
tags:
  - metric-learning
  - preference-learning
  - pairwise-comparisons
---

## Overview

Preference-based metric learning estimates a shared geometry from choices between pairs of items. Under an ideal-point model, each user chooses the item closer to a latent personal ideal point according to a common unknown metric. The observations therefore mix a population-level metric with user-specific latent variables.

## Key Ideas

- A Mahalanobis metric and a user's ideal point can be reparameterized so that unquantized pairwise comparisons are linear in a shared metric matrix and a user-specific pseudo-ideal point.
- More users do not automatically resolve underdetermination: every user contributes observations but also introduces a new latent ideal point. For generic items, at most $d$ comparisons per user can leave every positive-definite metric observationally equivalent to some alternative set of user points.
- Structural assumptions can lower the per-user requirement. When compared items lie in an $r$-dimensional subspace, their responses can be represented using a restricted metric and a phantom ideal point in that subspace, so the relevant dimension is $r$ rather than the ambient $d$.
- Local metric estimates can determine a global metric only when the collection of subspace restrictions spans enough independent directions in the space of symmetric matrices. Recovery quality also depends on the conditioning of this reconstruction map.
- Binary choices require a response-noise model or a surrogate loss. Estimation error then reflects both the accuracy of each local metric and how errors propagate during global reconstruction.

## Important Papers

- [[papers/metric-learning-from-limited-pairwise-preference-comparisons|Metric Learning from Limited Pairwise Preference Comparisons]]: proves the generic impossibility result and gives a subspace-based route to recovery with few comparisons per user.
- Canal et al. (2022), "One for All: Simultaneous Metric and Preference Learning over Multiple Users": gives convex estimators and recovery guarantees for joint metric and ideal-point learning across users.
- Xu and Davenport (2020), "Simultaneous Preference and Metric Learning from Paired Comparisons": develops the earlier single-user formulation.

## Related Concepts

- [[concepts/statistical-identifiability|Statistical Identifiability]]
- [[concepts/subspace-clustering|Subspace Clustering]]
- [[concepts/deep-metric-learning|Deep Metric Learning]]
- Pairwise preference learning
- Ideal-point models
