---
title: Connection Walks
type: concept
aliases:
  - Connection Walk
  - Connection Propagation
tags:
  - geometric-deep-learning
  - graph-operators
  - vector-fields
  - self-attention
---

## Overview

A connection walk propagates a vector field over a graph by combining scalar walk weights with linear edge transports. The walk weights determine how much information moves from each source node, while the transports align or transform feature vectors before aggregation. Ordinary random-walk averaging is the special case in which every transport is the identity.

## Key Ideas

- For node features $X_i\in\mathbb{R}^d$, walk weights $A_{ij}\geq 0$, and edge transports $O_{ij}\in\mathbb{R}^{d\times d}$, one propagation step is $(\mathcal{T}(A,O)X)_i=\sum_j A_{ij}X_jO_{ij}$.
- Row-stochastic weights make each target's incoming weights a probability distribution, but they do not make the full vector-valued operator symmetric or norm preserving.
- Transports need not be invertible or orthogonal. Singular maps, anisotropic scaling, and shearing still define connection propagation, although they fall outside a classical metric connection.
- [[concepts/attention-as-message-passing|Attention as Message Passing]] becomes a connection walk when value and output projections are retained as transports rather than absorbed into generic messages.
- In multi-head attention, head transports form a small dictionary and attention weights select an edge-dependent mixture. This separates token mixing from channel geometry.
- The generator $I-\mathcal{T}(A,O)$ is always a directed connection-walk generator. Additional structure is required before it becomes a self-adjoint [[concepts/connection-laplacians|Connection Laplacian]].

## Important Papers

- [[papers/from-self-attention-to-connection-laplacian-a-unified-operator-view-of-transformers|From Self-Attention to Connection Laplacian: A Unified Operator View of Transformers]] identifies single- and multi-head attention exactly as connection walks.
- Singer and Wu (2012), "Vector Diffusion Maps and the Connection Laplacian": combines graph affinities with orthogonal alignments to diffuse vector-valued data.
- Lin et al. (2013), "Parallel Vector Field Embedding": uses transported vector fields and connection energies in representation learning.

## Related Concepts

- [[concepts/connection-laplacians|Connection Laplacians]]
- [[concepts/attention-as-message-passing|Attention as Message Passing]]
- [[concepts/vector-fields-over-discrete-measure-spaces|Vector Fields over Discrete Measure Spaces]]
- [[concepts/neural-message-passing|Neural Message Passing]]
- [[concepts/transformer-pdes|Transformer PDEs]]
