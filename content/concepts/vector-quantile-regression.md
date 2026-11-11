---
title: Vector Quantile Regression
type: concept
aliases:
  - VQR
  - Conditional Vector Quantiles
tags:
  - quantile-regression
  - optimal-transport
---

## Overview

Vector quantile regression models a multivariate conditional distribution through a map from a fixed reference rank distribution. The map is the gradient of a convex potential, extending scalar monotonicity while preserving joint outcome dependence.

## Key Ideas

For a reference law with a density on a convex support, the conditional vector quantile map $Q(u,z)=\nabla_u\varphi(u,z)$ pushes that law to the outcome distribution conditional on $z$. The forward map is unique almost everywhere and accommodates discrete outcomes. A deterministic inverse rank additionally requires conditional outcome absolute continuity.

Linear VQR uses $Q(u,x)=\beta(u)^\top x$ and a potential $B(u)^\top x$. Its covariance-maximization formulation fixes the rank marginal and imposes $\mathbb E[X\mid U]=\mathbb E[X]$. This mean-independence constraint recovers full independence under correct specification, but does not generally imply it under misspecification.

With finite second moments, the conditional quantile construction is a quadratic optimal-transport problem. Unlike fitting separate marginal quantiles, it encodes the joint distribution. Finite-sample regression coefficients can nevertheless exhibit crossing; the population convex-gradient interpretation should not be treated as an unconditional guarantee for fitted curves.

## Important Papers

- [[papers/vector-quantile-regression-an-optimal-transport-approach|Vector Quantile Regression: An Optimal Transport Approach]] develops conditional transport quantiles, linear-programming regression, and a household expenditure illustration.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]] supplies the coupling and convex-potential foundations.
