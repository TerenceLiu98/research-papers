---
title: Oversmoothing in Graph Neural Networks
type: concept
aliases:
  - GNN Oversmoothing
  - Graph Neural Network Oversmoothing
tags:
  - graph-neural-networks
  - representation-collapse
  - message-passing
  - dirichlet-energy
---

## Overview

Oversmoothing is the loss of discriminative variation among node representations as graph propagation becomes deep. Under repeatedly attractive or diffusion-like [[concepts/neural-message-passing|Neural Message Passing]], connected nodes can converge toward indistinguishable states, reducing the information available for node-level prediction.

## Key Ideas

- Repeated neighborhood averaging suppresses high-frequency variation over a graph and can drive representations toward a low-dimensional stationary subspace.
- Dirichlet energy measures representation differences across connected nodes. Exponential decay toward zero is a common formal signature of oversmoothing.
- Connectivity and propagation weights control the rate of convergence. Dense local connectivity in [[concepts/hypergraphs|Hypergraphs]] can make the problem especially pronounced for diffusion-style operators.
- Oversmoothing is distinct from oversquashing: oversmoothing concerns homogenized states, while oversquashing concerns compressing too much distant information into fixed-size representations.
- Residual connections, normalization, modified propagation spectra, and selective or repulsive interactions are among the mechanisms used to preserve node separation.
- Randomizing the propagation graph can keep successive layers from repeatedly contracting features toward the same graph-dependent subspace. [[papers/training-graph-neural-networks-by-graphon-estimation|Training Graph Neural Networks by Graphon Estimation]] samples epoch-wise or layer-wise adjacency matrices from estimated edge probabilities, with mixed but sometimes large gains in deep GNN experiments.
- [[papers/a-unified-view-on-neural-message-passing-with-opinion-dynamics-for-social-networks|A Unified View on Neural Message Passing with Opinion Dynamics for Social Networks]] connects feature collapse to consensus in [[concepts/opinion-dynamics|Opinion Dynamics]] and uses bounded-confidence attraction and repulsion to stabilize Dirichlet energy in its experiments.

## Important Papers

- Oono and Suzuki (2019), "Graph Neural Networks Exponentially Lose Expressive Power for Node Classification."
- Cai and Wang (2020), "A Note on Over-Smoothing for Graph Neural Networks."
- Chamberlain et al. (2021), "GRAND: Graph Neural Diffusion."
- [[papers/a-unified-view-on-neural-message-passing-with-opinion-dynamics-for-social-networks|A Unified View on Neural Message Passing with Opinion Dynamics for Social Networks]]
- [[papers/training-graph-neural-networks-by-graphon-estimation|Training Graph Neural Networks by Graphon Estimation]]

## Related Concepts

- [[concepts/neural-message-passing|Neural Message Passing]]
- [[concepts/hypergraphs|Hypergraphs]]
- [[concepts/opinion-dynamics|Opinion Dynamics]]
- [[concepts/graphons|Graphons]]
- [[concepts/bounded-confidence-models|Bounded Confidence Models]]
- Graph diffusion
- Dirichlet energy
- Oversquashing
