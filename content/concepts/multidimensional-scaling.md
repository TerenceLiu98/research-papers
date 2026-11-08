---
title: Multidimensional Scaling
type: concept
aliases:
  - MDS
  - Classical Multidimensional Scaling
  - Principal Coordinates Analysis
tags:
  - dimensionality-reduction
  - distance-geometry
  - manifold-learning
  - visualization
---

## Overview

Multidimensional scaling (MDS) represents observations as points in a low-dimensional Euclidean space so that their pairwise distances approximate a supplied dissimilarity matrix. Classical MDS obtains coordinates by eigendecomposing a doubly centered matrix of squared distances. It is particularly useful when the meaningful geometry is available as distances rather than as ordinary feature vectors.

## Key Ideas

- Classical MDS forms $B=-\tfrac12 C D^{(2)}C$, where $D^{(2)}$ contains squared distances and $C=I-\tfrac1nJ$ centers the observations. Positive eigenvalues and their eigenvectors determine Euclidean coordinates.
- If the input distances are Euclidean, the full positive-eigenvalue embedding reproduces them exactly up to rigid transformations. Otherwise, Euclidean coordinates necessarily distort some distances, and negative eigenvalues diagnose the mismatch.
- Truncating to the leading coordinates produces a low-dimensional representation. The eigenvalue spectrum indicates how much of the centered distance geometry each coordinate captures, but does not by itself prove that the underlying dynamics are intrinsically low-dimensional.
- MDS accepts domain-specific distances, including geodesic, transport, temporal-alignment, and mixed field norms. Its interpretation therefore depends on what the chosen dissimilarity preserves.
- Classical MDS is an in-sample method. Mapping new observations requires distances to the training set and an extension formula, interpolation model, or a separately learned coordinate map.

## Important Papers

- Torgerson (1952), "Multidimensional scaling: I. Theory and method": an early formulation of metric scaling through centered inner products.
- Cox and Cox (2008), "Multidimensional scaling": a general reference for MDS methods and interpretation.
- [[papers/pattern-recognition-in-complex-systems-via-vector-field-representations-of-spatio-temporal-data|Pattern recognition in complex systems via vector-field representations of spatio-temporal data]]: embeds $L^{p,q}$ distances between spatio-temporal fields and uses selected coordinates for state reconstruction.
- [[papers/supervised-manifold-learning-for-functional-data|Supervised Manifold Learning for Functional Data]]: applies MDS after modifying estimated geodesic distances with a label-dependent penalty.

## Related Concepts

- [[concepts/consensus-multidimensional-scaling|Consensus Multidimensional Scaling]]: fits a shared embedding to several source-specific distance geometries.
- [[concepts/supervised-manifold-learning|Supervised Manifold Learning]]: incorporates labels into the geometry used for an embedding.
- [[concepts/geodesic-distance|Geodesic Distance]]: supplies manifold-aware dissimilarities that can be embedded with MDS.
- [[concepts/bregman-pca|Bregman PCA]]: a feature-based low-rank alternative adapted to Bregman geometry.
