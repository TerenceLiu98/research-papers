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

Optimal transport compares probability distributions by finding a transport plan that moves mass between them at minimum cost under a ground metric. In machine learning, it supplies distances between histograms, distributions, and structured observations whose coordinates may not be interchangeable. The 1-Wasserstein distance is the central instance used by the Tree-WSV paper.

## Key Ideas

- A discrete transport problem minimizes the inner product between a nonnegative transport plan and a ground-cost matrix, subject to matching the two distributions' marginals.
- The ground metric determines which movements are cheap. Learning it can therefore change the geometry of downstream tasks such as document comparison or cell-type clustering.
- Exact linear-programming solutions can be expensive. Entropic regularization, sliced constructions, and tree-based formulas trade approximation structure for faster computation.
- Tree-Wasserstein distance is an optimal-transport distance on a tree metric and has a closed form based on weighted mass differences across tree edges.
- In unsupervised ground-metric learning, samples and features can be treated symmetrically as distributions over one another, allowing their geometries to be learned jointly from a data matrix.

## Important Papers

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
