---
title: Unsupervised Ground Metric Learning
type: concept
aliases:
  - Unsupervised Metric Learning for Optimal Transport
  - Wasserstein Singular Vectors
tags:
  - ground-metric-learning
  - unsupervised-learning
  - optimal-transport
  - wasserstein-singular-vectors
---

## Overview

Unsupervised ground metric learning learns the feature distance used inside an optimal-transport comparison without labels or a pre-specified feature embedding. A data matrix supplies two linked views: each sample is a distribution over features, and each feature is a distribution over samples. Wasserstein singular vector methods exploit this duality to learn sample and feature geometries together.

## Key Ideas

- The learned sample and feature ground metrics are coupled by fixed-point equations: Wasserstein distances between sample distributions induce a feature-side metric, and the reverse operation induces a sample-side metric.
- Power iterations alternate these two updates and normalize the resulting distance matrices. Entropic regularization gives Sinkhorn singular vectors, while tree-Wasserstein distance gives a structured low-rank alternative.
- Tree-WSV represents samples and features as leaves in separate trees and learns nonnegative edge weights. The full pairwise-path system can be reduced to a basis set and solved with nonnegative least squares.
- Tree branching controls a rank-versus-computation tradeoff. Trees with fewer children provide more path parameters and can improve approximation accuracy, while higher branching can reduce computation.
- The approach is useful when embeddings or labels are unavailable, but its learned geometry depends on normalization, tree initialization, basis construction, and the behavior of the iterative updates.

## Important Papers

- [[Fast Unsupervised Ground Metric Learning with Tree-Wasserstein Distance]]
- Huizing, Cantini, and Peyre (2022), "Unsupervised Ground Metric Learning using Wasserstein Singular Vectors."
- Cuturi and Avis (2014), "Ground Metric Learning."
- Paty and Cuturi (2020), "Regularized Optimal Transport is Ground Cost Adversarial."

## Related Concepts

- [[Optimal Transport]]
- [[Tree-Wasserstein Distance]]
- Metric learning
- Wasserstein singular vectors
- Single-cell RNA sequencing
