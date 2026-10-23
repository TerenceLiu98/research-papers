---
title: Neural Message Passing
type: concept
aliases:
  - Message Passing Neural Networks
  - MPNNs
tags:
  - graph-neural-networks
  - graph-representation-learning
  - neighborhood-aggregation
---

## Overview

Neural message passing is a general framework for learning representations on graphs. Each layer constructs messages from neighboring node and edge states, aggregates them with a permutation-invariant operation, and updates the receiving node. The same pattern extends to [[concepts/hypergraphs|Hypergraphs]] by aggregating within and across hyperedges.

## Key Ideas

- A message function determines what information one node sends along an edge; an aggregation such as sum, mean, or maximum makes the result insensitive to neighbor ordering.
- An update function combines the aggregated message with the node's current state. Repeating this operation expands the receptive field across the graph.
- Edge weights or attention scores can make influence depend on structure or learned node similarity.
- Continuous-time variants interpret propagation as a differential equation and use numerical solvers to obtain node representations.
- Repeated attractive aggregation can make node states increasingly similar, producing [[concepts/oversmoothing-in-graph-neural-networks|Oversmoothing in Graph Neural Networks]]. Repulsive, residual, or confidence-filtered interactions can preserve separation.
- Propagation need not use one fixed graph at every layer. [[papers/training-graph-neural-networks-by-graphon-estimation|Training Graph Neural Networks by Graphon Estimation]] samples adjacency matrices from estimated edge probabilities at each epoch or layer, turning structural uncertainty into graph augmentation.
- Generalization can depend on graph size as well as the number of training graphs. Under a finite graphon-mixture model, [[papers/generalization-bounds-for-message-passing-networks-on-mixture-of-graphons|Generalization Bounds for Message Passing Networks on Mixture of Graphons]] proves a uniform bound that improves with node count only below a dimension-dependent sparsity threshold.
- [[papers/a-unified-view-on-neural-message-passing-with-opinion-dynamics-for-social-networks|A Unified View on Neural Message Passing with Opinion Dynamics for Social Networks]] treats aggregation as an opinion-exchange process and uses bounded confidence to strengthen, remove, or reverse messages.
- [[papers/fs-gplib-breaking-the-web-scale-barrier|FS_GPlib: Breaking the Web-Scale Barrier]] uses the same message, aggregation, and update decomposition to execute mechanism-based graph simulations with synchronous tensor operations rather than to learn node representations.

## Important Papers

- Gilmer et al. (2017), "Neural Message Passing for Quantum Chemistry."
- Battaglia et al. (2018), "Relational Inductive Biases, Deep Learning, and Graph Networks."
- Chamberlain et al. (2021), "GRAND: Graph Neural Diffusion."
- [[papers/a-unified-view-on-neural-message-passing-with-opinion-dynamics-for-social-networks|A Unified View on Neural Message Passing with Opinion Dynamics for Social Networks]]
- [[papers/training-graph-neural-networks-by-graphon-estimation|Training Graph Neural Networks by Graphon Estimation]]
- [[papers/generalization-bounds-for-message-passing-networks-on-mixture-of-graphons|Generalization Bounds for Message Passing Networks on Mixture of Graphons]]
- [[papers/fs-gplib-breaking-the-web-scale-barrier|FS_GPlib: Breaking the Web-Scale Barrier - A Unified Acceleration Framework for Graph Propagation Models]]

## Related Concepts

- [[concepts/oversmoothing-in-graph-neural-networks|Oversmoothing in Graph Neural Networks]]
- [[concepts/hypergraphs|Hypergraphs]]
- [[concepts/opinion-dynamics|Opinion Dynamics]]
- [[concepts/graphons|Graphons]]
- [[concepts/graph-propagation-simulation|Graph Propagation Simulation]]
- Graph neural networks
- Graph attention
- Neural ordinary differential equations
