---
title: Attention as Message Passing
type: concept
aliases:
  - Self-Attention as Message Passing
  - Transformer Message Passing
tags:
  - attention
  - graph-neural-networks
  - transformers
  - representation-learning
---

## Overview

Attention can be written as a graph message-passing operation. Input elements become nodes, normalized attention scores act as learned edge weights, transformed value vectors carry messages, and a weighted sum aggregates incoming information. The graph over which attention is normalized determines whether the operation is global, local, or structurally masked.

## Key Ideas

- In self-attention, the query of a receiving node scores keys from possible senders. Softmax normalization produces data-dependent weights, and the weighted value vectors form the aggregated message.
- Global self-attention is message passing on a complete graph, including each node's self-connection. Neighborhood-masked attention instead uses a supplied sparse graph and yields a graph attention layer.
- Multi-head attention runs several message-passing channels with separate query, key, and value projections, allowing different learned relations to contribute to the update.
- Keeping the value-output maps explicit refines this picture into [[concepts/connection-walks|Connection Walks]]: scalar attention weights control movement between tokens, while linear transports control how channel vectors change along each edge.
- Without positional or structural features, self-attention respects permutations of the input elements and acts as a set-processing operation. Positional encodings distinguish order or inject graph structure without making that structure a hard communication constraint.
- The shared abstraction does not imply shared execution cost. Complete attention maps naturally to dense matrix multiplication, while sparse graph propagation commonly relies on indexed gather-scatter operations.
- [[papers/transformers-are-graph-neural-networks|Transformers are Graph Neural Networks]] uses this correspondence to explain both the relationship between Transformers and graph attention networks and their different behavior on current hardware.

## Important Papers

- Vaswani et al. (2017), "Attention Is All You Need."
- Velickovic et al. (2018), "Graph Attention Networks."
- Dwivedi and Bresson (2020), "A Generalization of Transformer Networks to Graphs."
- [[papers/transformers-are-graph-neural-networks|Transformers are Graph Neural Networks]]
- [[papers/from-self-attention-to-connection-laplacian-a-unified-operator-view-of-transformers|From Self-Attention to Connection Laplacian: A Unified Operator View of Transformers]]

## Related Concepts

- [[concepts/neural-message-passing|Neural Message Passing]]
- [[concepts/connection-walks|Connection Walks]]
- [[concepts/connection-laplacians|Connection Laplacians]]
- Graph attention networks
- Graph Transformers
- Multi-head attention
- Positional encodings
- Permutation equivariance
- Sparse attention
