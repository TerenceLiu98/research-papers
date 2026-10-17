---
title: Gromov-Wasserstein Distance
type: concept
aliases:
  - GW Distance
tags:
  - optimal-transport
  - geometry
  - distance-based-learning
---

## Overview

Gromov-Wasserstein (GW) comparison matches metric-measure spaces through their internal pairwise distances. It is useful when objects have different supports or no meaningful cross-space pointwise ground cost. A coupling matches probability mass while penalizing distortion of the two geometries.

## Key Ideas

- For distance matrices $D,E$ and probability weights $p,q$, a common squared-loss objective is $\min_{P\in\Pi(p,q)}\sum_{i,j,k,l}(D_{ik}-E_{jl})^2P_{ij}P_{kl}$. Root and normalization conventions must be checked before treating a reported objective as a metric distance.
- Intrinsic comparison depends on pairwise geometry, not absolute coordinates. Isometric configurations can match with zero distortion even if their physical locations differ.
- The coupling accommodates different numbers of support points. The quadratic dependence on the coupling makes optimization more demanding than ordinary linear transport.
- A GW barycenter represents multiple spaces through a representative distance matrix and associated probability weights. It differs from a Wasserstein barycenter on a shared ground space.
- In geo-referenced time-series clustering, GW compares the arrangements of measurement sites across regions. It does not directly enforce geographic adjacency or temporal ordering.

## Important Papers

- Memoli (2011), "Gromov-Wasserstein Distances and the Metric Approach to Object Matching": foundational reference cited in the ingested clustering paper.
- Peyre, Cuturi, and Solomon (2016), "Gromov-Wasserstein Averaging of Kernel and Distance Matrices": cited basis for structural barycenters.
- [[papers/a-new-clustering-strategy-for-geo-referenced-time-series-based-on-optimal-transport|A New Clustering Strategy for Geo-Referenced Time Series Based on Optimal Transport]]: uses spatial GW discrepancies to weight temporal Gromov-DTW costs and constructs spatial cluster prototypes.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]: ordinary transport uses cross-space ground costs.
- [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]: distributional representatives in a shared ground geometry.
- [[concepts/bi-gromov-dynamic-time-warping|Bi-Gromov Dynamic Time Warping]]: combines temporal structural alignment with spatial GW modulation.
