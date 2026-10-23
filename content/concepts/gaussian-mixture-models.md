---
title: Gaussian Mixture Models
type: concept
aliases:
  - GMM
  - Gaussian mixtures
tags:
  - mixture-models
  - soft-clustering
  - expectation-maximization
---

## Overview

A Gaussian mixture model represents a probability density as a weighted sum of Gaussian components. Each observation receives a posterior membership probability, or responsibility, for every component. This makes the model useful for density estimation and soft clustering, where ambiguous observations need not be committed to one cluster.

## Key Ideas

- A $K$-component mixture has nonnegative weights that sum to one, component means, and covariance parameters. Isotropic models use one scalar variance per component; richer covariance structures require more parameters and computation.
- Expectation-maximization alternates an E-step that computes responsibilities with an M-step that updates parameters from responsibility-weighted sufficient statistics.
- Computing responsibilities in log space with log-sum-exp avoids numerical underflow when component likelihoods are very small.
- Conventional batched implementations may materialize an $N \times K$ responsibility matrix. Fused or streaming implementations can instead accumulate the M-step statistics as responsibilities are produced.
- Maximum-responsibility assignment turns a fitted mixture into a hard partition, while retaining multiple sufficiently large responsibilities supports adaptive overlap between clusters.

## Important Papers

- Dempster, Laird, and Rubin (1977), "Maximum Likelihood from Incomplete Data via the EM Algorithm": establishes the general expectation-maximization framework.
- [[papers/flash-gmm-a-memory-efficient-kernel-for-scalable-soft-clustering|Flash-GMM: A Memory-Efficient Kernel for Scalable Soft Clustering]]: fuses responsibility computation with sufficient-statistic accumulation and applies the resulting soft assignments to IVF search.
- [[papers/clustering-with-bregman-divergences|Clustering with Bregman Divergences]]: connects exponential families, hard clustering, and soft clustering through Bregman geometry.
- [[papers/local-support-learning|Local Support Learning]]: uses per-matrix Gaussian mixtures as compact density gates for continual post-training.

## Related Concepts

- [[concepts/k-means-clustering|K-Means Clustering]]
- [[concepts/inverted-file-index|Inverted File Index]]
- Expectation-maximization
- Mixture models
- Soft clustering
- [[concepts/local-support-updates|Local-Support Updates]]
