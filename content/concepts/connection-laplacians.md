---
title: Connection Laplacians
type: concept
aliases:
  - Connection Laplacian
  - Graph Connection Laplacian
  - Random-Walk Connection Laplacian
tags:
  - spectral-geometry
  - graph-operators
  - geometric-deep-learning
  - vector-fields
---

## Overview

A connection Laplacian extends a graph Laplacian from scalar functions to vector fields. Before neighboring vectors are compared or averaged, edge transports map them between node-local feature spaces. This lets the operator measure disagreement after alignment and model diffusion when features have orientation, frame, or other fiber-valued structure.

## Key Ideas

- Given a row-stochastic walk $A$ and transports $O_{ij}$, the random-walk form is $(\mathcal{L}^{\mathrm{rw}}_cX)_i=X_i-\sum_jA_{ij}X_jO_{ij}$.
- A parallel vector field satisfies $X_i=X_jO_{ij}$ on active edges and therefore lies in the null space when the walk weights at each target sum to one.
- Reversibility of the scalar walk and metric-compatible, inverse-consistent transports recover a self-adjoint operator under a stationary-distribution-weighted inner product.
- In that metric regime, the associated Dirichlet energy is a nonnegative weighted sum of $\|X_i-X_jO_{ij}\|^2$ and vanishes on parallel fields.
- Directed, non-reversible walks or non-isometric transports generally produce non-normal generators. Their quadratic forms need not be nonnegative, so Laplacian language should not imply classical positive-semidefinite spectral theory without checking the assumptions.
- [[concepts/connection-walks|Connection Walks]] are the broader propagation class. A connection Laplacian is the structured generator obtained from such a propagator under the relevant geometric conditions.

## Important Papers

- Singer and Wu (2012), "Vector Diffusion Maps and the Connection Laplacian": introduces a spectral construction for vector-valued diffusion with orthogonal alignments.
- Bandeira, Singer, and Spielman (2013), "A Cheeger Inequality for the Graph Connection Laplacian": relates its spectrum to synchronization and consistency over graphs.
- Barbero et al. (2022), "Sheaf Neural Networks with Connection Laplacians": applies connection Laplacians in graph neural networks.
- [[papers/from-self-attention-to-connection-laplacian-a-unified-operator-view-of-transformers|From Self-Attention to Connection Laplacian: A Unified Operator View of Transformers]] distinguishes generic directed attention generators from classical metric connection Laplacians.

## Related Concepts

- [[concepts/connection-walks|Connection Walks]]
- [[concepts/attention-as-message-passing|Attention as Message Passing]]
- [[concepts/vector-fields-over-discrete-measure-spaces|Vector Fields over Discrete Measure Spaces]]
- Spectral graph theory
- Graph diffusion
- Gauge equivariance
