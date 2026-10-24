---
title: Wasserstein Flow Matching
type: concept
aliases:
  - WFM
tags:
  - flow-matching
  - optimal-transport
  - generative-models
  - distribution-valued-data
---

## Overview

Wasserstein flow matching is a generative framework in which each state of the learned flow is itself a probability measure. It transports a source family of measures to a target family by training on Wasserstein geodesics between sampled source and target measures. This extends [[concepts/flow-matching|Flow Matching]] from vector-valued observations to distribution-valued observations such as point clouds and cellular niches.

## Key Ideas

- **Two distributional levels.** The outer source and target laws are distributions over measures. A conditional training example samples one measure from each outer law, then uses an inner [[concepts/optimal-transport|Optimal Transport]] map between those two measures. This does not require learning the outer optimal coupling.
- **Geodesic conditional paths.** A Monge map $T_*$ induces the displacement interpolation $((1-t)\operatorname{id}+tT_*)_\#\mu$. Its velocity is the regression target for a Riemannian flow-matching objective.
- **Representation-dependent computation.** Gaussian measures admit exact affine maps and closed-form [[concepts/bures-wasserstein-geometry|Bures-Wasserstein Geometry]]. General measures can be represented by point clouds and trained with estimated entropic transport maps.
- **Permutation equivariance.** For empirical measures, particle order is irrelevant. Self-attention provides an equivariant parameterization of the learned point-cloud velocity field and supports variable numbers of particles.
- **Approximation boundary.** Classical optimal-map theory justifies the ideal path, but practical point-cloud systems introduce entropic regularization, finite-sample map error, numerical integration, and sometimes discrete matching heuristics.

## Important Papers

- [[papers/wasserstein-flow-matching-generative-modeling-over-families-of-distributions|Wasserstein Flow Matching: Generative Modeling Over Families of Distributions]]: introduces WFM for Gaussian families and general point-cloud distributions.
- Chen and Lipman (2023), "Riemannian Flow Matching on General Geometries": provides the broader geometric flow-matching framework.
- Pooladian and Niles-Weed (2021), "Entropic Estimation of Optimal Transport Maps": develops the map estimator used for empirical distributions.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/bures-wasserstein-geometry|Bures-Wasserstein Geometry]]
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]
