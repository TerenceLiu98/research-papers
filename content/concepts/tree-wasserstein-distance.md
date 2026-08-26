---
title: Tree-Wasserstein Distance
type: concept
aliases:
  - TWD
  - Tree-Wasserstein
tags:
  - tree-wasserstein-distance
  - optimal-transport
  - metric-learning
  - hierarchical-data
---

## Overview

Tree-Wasserstein distance is an optimal-transport distance whose ground geometry is represented by a weighted tree. When probability measures are supported on the tree's leaves, the distance can be computed from the absolute mass difference across the edges rather than by solving a general transport linear program. This makes it useful as a scalable approximation to 1-Wasserstein distance.

## Key Ideas

- A tree's edge weights define the path metric between leaves. The distance between two leaf-supported measures is the weighted sum of absolute distribution differences propagated through the tree.
- With a binary tree-parameter matrix $Z$ and edge weights $w$, the distance has the closed form $||diag(w)Z(x-y)||_1$, linear in the number of tree parameters.
- A root connected directly to all leaves gives a special case related to sliced-Wasserstein constructions. Deeper trees provide more structured, potentially higher-rank approximations but add parameters and conditioning concerns.
- Tree construction and edge-weight learning are separate choices. Tree geometry can be initialized from clustering, while weights can be fitted to approximate Wasserstein distances or learned from downstream supervision.
- For many measures at once, approximation quality is not automatically guaranteed by the existence of a good tree for an individual pair. The choice of branching, depth, and basis vectors matters.

## Important Papers

- [[Fast Unsupervised Ground Metric Learning with Tree-Wasserstein Distance]]
- Le, Yamada, Fukumizu, and Cuturi (2019), "Tree-sliced Variants of Wasserstein Distances."
- Yamada et al. (2022), "Approximating 1-Wasserstein Distance with Trees."
- Takezawa, Sato, and Yamada (2021), "Supervised Tree-Wasserstein Distance."

## Related Concepts

- [[Optimal Transport]]
- [[Unsupervised Ground Metric Learning]]
- [[Geodesic Distance]]
- Tree metrics
- Sliced-Wasserstein distance
