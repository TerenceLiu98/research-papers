---
title: Temporal Knowledge Graph Completion
type: concept
aliases:
  - Temporal Link Prediction
  - tKGC
tags:
  - temporal-knowledge-graphs
  - knowledge-graph-completion
  - link-prediction
---

## Overview

Temporal knowledge graph completion predicts missing elements of timestamped relational facts. A temporal fact is commonly represented as a quadruple $(e_s,p,e_o,t)$ containing a subject, predicate, object, and time. Given a query such as $(e_s,p,?,t)$, a model scores candidate entities using both relational structure and temporal information.

## Key Ideas

- **Time-conditioned plausibility:** A fact can be plausible at one time and false at another, so representations or score functions must depend on time.
- **Completion versus forecasting:** Completion is often evaluated on held-out facts whose timestamps lie within the dataset's observed period. This does not automatically demonstrate extrapolation to future timestamps.
- **Filtered ranking:** Standard evaluation ranks all candidate entities but removes other known true answers. Mean reciprocal rank and Hits@$k$ summarize the resulting ranks.
- **Temporal parameterization:** Models may learn timestamp embeddings, timestamp-specific projections, recurrent state, or continuous entity trajectories. The choice governs parameter growth and assumptions about temporal smoothness.
- **Structural geometry:** Hierarchies, cycles, and other relational patterns can motivate Euclidean, hyperbolic, spherical, or product-manifold representations.

## Important Papers

- [[papers/dyernie-dynamic-evolution-of-riemannian-manifold-embeddings-for-temporal-knowledge-graph-completion|DyERNIE: Dynamic Evolution of Riemannian Manifold Embeddings for Temporal Knowledge Graph Completion]]
- Leblay and Chekol (2018), "Deriving Validity Time in Knowledge Graph."
- Dasgupta, Ray, and Talukdar (2018), "HyTE: Hyperplane-based Temporally aware Knowledge Graph Embedding."
- Goel et al. (2020), "Diachronic Embedding for Temporal Knowledge Graph Completion."

## Related Concepts

- [[concepts/riemannian-representation-learning|Riemannian Representation Learning]]
- [[concepts/geodesic-distance|Geodesic Distance]]
- Knowledge graph embeddings
- Temporal event forecasting
