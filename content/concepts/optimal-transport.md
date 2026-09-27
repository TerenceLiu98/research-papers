---
title: Optimal Transport
type: concept
aliases:
  - OT
  - Wasserstein Distance
tags:
  - optimal-transport
  - probability
  - distance-based-learning
  - machine-learning
---

## Overview

Optimal transport compares probability distributions by finding a transport plan that moves mass between them at minimum cost under a ground metric. It supplies distances between histograms, distributions, and structured observations whose coordinates may not be interchangeable, with applications in machine learning and political preference comparisons. The 1-Wasserstein distance, also called Earth Mover's Distance, measures minimum transport cost using the ground distance itself.

## Key Ideas

- A discrete transport problem minimizes the inner product between a nonnegative transport plan and a ground-cost matrix, subject to matching the two distributions' marginals.
- The ground metric determines which movements are cheap. Learning it can therefore change the geometry of downstream tasks such as document comparison or cell-type clustering.
- Exact linear-programming solutions can be expensive. Entropic regularization, sliced constructions, and tree-based formulas trade approximation structure for faster computation.
- Tree-Wasserstein distance is an optimal-transport distance on a tree metric and has a closed form based on weighted mass differences across tree edges.
- In unsupervised ground-metric learning, samples and features can be treated symmetrically as distributions over one another, allowing their geometries to be learned jointly from a data matrix.
- Population equality does not imply zero empirical distance: independent finite samples generally differ, producing a positive expected transport cost even under the null. The magnitude depends on sample sizes and support geometry, and can be substantial in sparse or high-dimensional settings.
- [[concepts/permutation-based-null-calibration|Permutation-Based Null Calibration]] tests whether an observed distance is unusually large under exchangeable group labels. Subtracting the mean null distance gives a descriptive excess, not generally an unbiased estimate of population distance; ordinary within-group bootstrap intervals do not supply this null reference.

## Important Papers

- [[papers/the-earth-moves-but-so-does-the-bias-systematic-upward-bias-of-the-wasserstein-earth-movers-distance-and-permutation-based-null-calibration|The Earth Moves, But So Does the Bias]] (Hung, 2026): Examines finite-sample null distances and permutation calibration for distributional comparisons.
- [[Fast Unsupervised Ground Metric Learning with Tree-Wasserstein Distance]]
- Peyre and Cuturi (2019), "Computational Optimal Transport."
- Cuturi (2013), "Sinkhorn Distances: Lightspeed Computation of Optimal Transport."
- Paty and Cuturi (2020), "Regularized Optimal Transport is Ground Cost Adversarial."
- Kusner, Sun, Kolkin, and Weinberger (2015), "From Word Embeddings to Document Distances."

## Related Concepts

- [[Tree-Wasserstein Distance]]
- [[Unsupervised Ground Metric Learning]]
- [[Geodesic Distance]]
- Probability measures
- Metric learning
