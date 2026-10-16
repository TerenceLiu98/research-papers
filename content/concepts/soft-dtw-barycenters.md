---
title: Soft-DTW Barycenters
type: concept
aliases:
  - Soft-DTW Barycenter
tags:
  - time-series
  - sequence-alignment
  - barycenters
---

## Overview

A Soft-DTW barycenter is a representative sequence minimizing a weighted sum of smoothed dynamic-time-warping losses to observed sequences. It aligns events across time before averaging their values. Its spatial cost determines whether an observation is treated as a vector, image, or spatial measure.

## Key Ideas

- **Soft path selection.** For a pairwise cost matrix $\Delta$, Soft-DTW is $-\beta\log\sum_{A\in\mathcal A}\exp(-\langle A,\Delta\rangle/\beta)$ for $\beta>0$. It approaches the minimum path cost as $\beta$ approaches zero.
- **Expected alignments.** The derivative with respect to $\Delta$ is the expected path matrix under Gibbs weights. Dynamic programming computes it without enumerating paths.
- **Alternating means.** Entropy duality yields temporal weights $Z^i$. Each output frame minimizes $\sum_{i,s}w_iZ^i_{st}\delta(x_{i,s},a)$, reducing the spatial update to a weighted mean for the chosen cost $\delta$.
- **Geometry is modular.** Squared Euclidean costs yield vector averages; debiased unbalanced transport yields spatial measure averages that accommodate unequal mass.
- **Temporal sensitivity is not strict invariance.** Soft-DTW depends on the number and cost of feasible paths. Delannoy-number bounds explain why temporal shifts can change the loss even when hard DTW assigns zero cost. Smoothing can also produce saturation in shift sensitivity.
- **Guarantees remain separate.** A well-solved spatial update does not make the joint alignment problem convex. Initialization, output length, endpoint constraints, and smoothing all influence the result. Raw Soft-DTW need not be nonnegative or vanish on identical inputs.

## Important Papers

- [[papers/averaging-spatio-temporal-signals-using-optimal-transport-and-soft-alignments|Averaging Spatio-temporal Signals using Optimal Transport and Soft Alignments]]: derives the generic alternating formulation and specializes it to debiased unbalanced transport.
- Cuturi and Blondel (2017), "Soft-DTW: a differentiable loss function for time-series": differentiable alignment and barycenter foundation cited by the ingested paper.

## Related Concepts

- [[concepts/dynamic-time-warping|Dynamic Time Warping]]: the underlying monotone alignment paths.
- [[concepts/unbalanced-optimal-transport|Unbalanced Optimal Transport]]: a geometry-aware spatial cost for unequal-mass observations.
- [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]: transport averages without the outer temporal alignment.
