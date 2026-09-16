---
title: Subspace Clustering
type: concept
aliases:
  - Union-of-Subspaces Clustering
tags:
  - clustering
  - representation-learning
  - linear-algebra
---

## Overview

Subspace clustering groups observations according to the low-dimensional linear subspaces that generate them. Unlike a model with a single representative point per cluster, each cluster can vary along several directions. A union-of-subspaces model writes each sample as $x_i=U_kv_i+z_i$ for an unknown cluster $k$, its basis $U_k$, sample coefficients $v_i$, and noise $z_i$.

## Key Ideas

- **Membership and coordinates are distinct:** The goal is to recover which samples share a subspace; bases and within-subspace coordinates need not be unique.
- **Projector representation:** For an adequately ranked union-of-subspaces factorization, the row-space projector can have block structure after grouping samples by cluster. It is unchanged by rotations of the chosen row-space basis. Zero cross-cluster entries do not imply that all within-cluster entries are nonzero or positive.
- **Linear invariance is conditional:** Left multiplication preserves the signal row space if it preserves the signal rank. The rank of the transformation matrix alone does not establish this condition.
- **Noise and spectral separation:** Perturbation arguments compare noise size with the gap separating retained and discarded singular directions. Small gaps can make a projector unstable even when perturbations are modest.
- **Preservation versus performance:** A neural representation can cluster accurately while changing the original projector. Measuring projector distance therefore tests a specific structural property rather than clustering accuracy itself.
- **Activation distortion:** For a layer $Y=\sigma(WX)$, the residual $Y-WX$ measures how much the activation changes its linear input. Small residuals can support preservation bounds when the other rank and spectral-gap assumptions hold.

## Important Papers

- [[Some Neural Networks Inherently Preserve Subspace Clustering Structure]]: develops conditional projector-preservation bounds and examines whether trained networks approach this behavior.
- Elhamifar and Vidal (2013), "Sparse Subspace Clustering: Algorithm, Theory, and Applications." A foundational reference cited by the neural-preservation paper.
- Vidal, Ma, and Sastry (2005), "Generalized Principal Component Analysis (GPCA)." A union-of-subspaces reference cited there.

## Related Concepts

- [[Statistical Identifiability]]: addresses representation equivalence across model solutions, a distinct question from recovering subspace membership or preserving a sample projector.
- Principal component analysis
- Spectral perturbation theory
- Representation geometry
