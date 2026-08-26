---
title: Functional Data Classification
type: concept
aliases:
  - Functional Classification
tags:
  - functional-data-analysis
  - classification
  - statistical-learning
---

## Overview

Functional data classification predicts a label from an observation that is a curve, trajectory, or other function rather than a fixed-length vector. The main challenge is to use the dependence across the function's domain while handling infinite-dimensional structure, smoothing, irregular sampling, and potentially nonlinear variation.

## Key Ideas

- A common workflow smooths discrete noisy observations and represents each curve with FPCA scores, basis coefficients, distances, or learned coordinates before fitting a classifier.
- FPCA is effective when leading covariance directions contain the class information, but it can be inefficient when phase variation or other nonlinear effects inflate ambient variance.
- Manifold-based classification treats the curves as points on a lower-dimensional geometric object. Geodesic distances and nonlinear embeddings can reveal class boundaries that are difficult to express in the original function space.
- A useful functional classifier needs an out-of-sample map from a new curve to the representation used during training. Smoothing and interpolation are therefore part of the statistical procedure, not merely visualization steps.
- Performance depends on intrinsic dimension and data regime. The FSML experiments favor manifold methods on low-dimensional Swiss-roll, torus, and low-dimensional Gaussian models, while some FPCA-based or distributional methods perform better in higher-dimensional settings.

## Important Papers

- [[Supervised Manifold Learning for Functional Data]]
- Delaigle and Hall (2012), "Achieving near perfect classification for functional data."
- Dai, Muller, and Yao (2017), "Optimal Bayes classifiers for functional data and density ratios."
- Wang, Huang, and Cao (2024), "Review on functional data classification."
- Biau, Bunea, and Wegkamp (2005), "Functional classification in Hilbert spaces."
- Wang, Shang, Cao, and Liu (2024), "Optimal classification for functional data."

## Related Concepts

- [[Supervised Manifold Learning]]
- [[Functional Principal Component Analysis]]
- [[Geodesic Distance]]
- Functional regression
- Nonlinear dimension reduction
