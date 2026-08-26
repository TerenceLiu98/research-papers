---
title: Supervised Manifold Learning
type: concept
aliases:
  - Functional Supervised Manifold Learning
  - FSML
tags:
  - manifold-learning
  - supervised-learning
  - nonlinear-dimension-reduction
  - functional-data-analysis
---

## Overview

Supervised manifold learning learns a low-dimensional representation using both the geometry of the observations and their labels. It is useful when the data lie near a nonlinear manifold and class boundaries are simpler in an unfolded coordinate system. Unlike a purely discriminative embedding, it must preserve enough local geometry for new observations to be mapped into the learned representation.

## Key Ideas

- A supervised embedding can preserve the manifold's geodesic distances while penalizing close pairs that have different labels. The balance is controlled by a tuning parameter rather than by discarding geometry altogether.
- In functional data, the observations are curves in a function space. A practical pipeline can recover smooth curves, estimate geodesic distances with a graph and local tangent spaces, and apply MDS to obtain coordinates.
- The representation is only useful for prediction if it admits out-of-sample interpolation. FSML estimates a global coordinate map with local linear regression on the tangent space around a new curve.
- Once coordinates are learned, ordinary multivariate classifiers such as k-NN, SVM, and LDA can be applied. The representation and classifier are separate components, so their behavior should be evaluated together.
- The coordinate map is generally non-unique. Geometric distance preservation identifies it only up to transformations unless additional assumptions are imposed.

## Important Papers

- [[Supervised Manifold Learning for Functional Data]]
- Tenenbaum, De Silva, and Langford (2000), "A global geometric framework for nonlinear dimensionality reduction."
- Vlachos, Domeniconi, Gunopulos, Kollios, and Koudas (2002), "Non-linear dimensionality reduction techniques for classification and visualization."
- Chao, Luo, and Ding (2019), "Recent advances in supervised dimension reduction: A survey."
- Chen and Muller (2012), "Nonlinear manifold representations for functional data."

## Related Concepts

- [[Functional Data Classification]]
- [[Geodesic Distance]]
- [[Functional Principal Component Analysis]]
- [[Riemannian Representation Learning]]
