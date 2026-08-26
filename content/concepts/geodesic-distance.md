---
title: Geodesic Distance
type: concept
aliases:
  - Geodesic Metric
tags:
  - geometry
  - manifold-learning
  - distance-based-learning
  - functional-data-analysis
---

## Overview

Geodesic distance measures the length of the shortest path between two points constrained to a manifold. Unlike ambient Euclidean distance, it can follow curved structure and avoid treating points as close when the straight line between them cuts across an unobserved or low-density part of the manifold. It is a core quantity in Isomap-style nonlinear dimension reduction.

## Key Ideas

- For sampled data, geodesic distance is commonly approximated by shortest paths in a neighborhood graph whose edge weights are ambient distances. Connectivity and neighborhood selection directly affect the estimate.
- Functional parallel transport unfolding improves the estimate for functional manifolds by estimating local tangent spaces, transporting edge directions along a graph path, and measuring the resulting unfolded path.
- In supervised manifold learning, geodesic distance can be modified for pairs with different labels. A distance-dependent penalty separates classes while retaining the ordering of pairs by their original geodesic distance.
- MDS can use a pairwise distance matrix to produce Euclidean coordinates, but finite-sample estimation and embedding dimension introduce distance distortion. Out-of-sample interpolation must account for this distortion.
- Geodesic structure is informative only when the manifold assumption and graph approximation are reasonable. A flat or high-dimensional functional distribution may be better served by FPCA or other functional classifiers.

## Important Papers

- [[Supervised Manifold Learning for Functional Data]]
- Tenenbaum, De Silva, and Langford (2000), "A global geometric framework for nonlinear dimensionality reduction."
- Tan, Zang, and Yin (2024), "Nonlinear dimension reduction for functional data with application to clustering."
- Budninskiy, Yin, Feng, Tong, and Desbrun (2019), "Parallel transport unfolding: A connection-based manifold learning approach."
- Cox and Cox (2008), "Multidimensional scaling."

## Related Concepts

- [[Supervised Manifold Learning]]
- [[Riemannian Representation Learning]]
- [[Functional Data Classification]]
- [[Functional Principal Component Analysis]]
