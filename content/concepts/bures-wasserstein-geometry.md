---
title: Bures-Wasserstein Geometry
type: concept
aliases:
  - Bures-Wasserstein Space
  - BW Geometry
tags:
  - optimal-transport
  - gaussian-distributions
  - riemannian-geometry
  - covariance-matrices
---

## Overview

Bures-Wasserstein geometry is the restriction of 2-Wasserstein geometry to nondegenerate Gaussian measures. A Gaussian is represented by its mean and positive-definite covariance, and optimal maps between two Gaussians are affine. This yields closed-form distances, geodesics, tangent norms, and geometry-preserving covariance updates.

## Key Ideas

- **Closed-form Gaussian transport.** The mean follows a straight line. The covariance follows a matrix path determined by the unique symmetric positive-definite affine transport map between the endpoint Gaussians.
- **Coupled mean and covariance metric.** Squared distance is the Euclidean squared distance between means plus the Bures covariance term. Covariances therefore cannot generally be treated as unconstrained Euclidean vectors without changing the geometry.
- **Riemannian covariance updates.** A tangent matrix $S$ advances covariance as $(I+hS)\Sigma(I+hS)$ in a first-order integration step. This respects the positive-semidefinite structure that naive additive updates can violate.
- **Computational benefit.** Exact formulas avoid estimating an inner transport map from particles, making Gaussian families a tractable special case of [[concepts/wasserstein-flow-matching|Wasserstein Flow Matching]]. Matrix square roots and linear algebra remain important numerical costs.
- **Modeling trade-off.** A mean-covariance representation is compact and geometry-aware but discards non-Gaussian structure that an empirical distribution may retain.

## Important Papers

- Gelbrich (1990), "On a Formula for the $L^2$ Wasserstein Metric Between Measures on Euclidean and Hilbert Spaces": gives the Gaussian Wasserstein formula used for the affine map.
- Lambert et al. (2022), "Variational Inference via Wasserstein Gradient Flows": develops calculations on the Bures-Wasserstein manifold used by later generative methods.
- [[papers/wasserstein-flow-matching-generative-modeling-over-families-of-distributions|Wasserstein Flow Matching: Generative Modeling Over Families of Distributions]]: uses this geometry to define BW-FM over families of Gaussians.

## Related Concepts

- [[concepts/wasserstein-flow-matching|Wasserstein Flow Matching]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]
- [[concepts/riemannian-representation-learning|Riemannian Representation Learning]]
