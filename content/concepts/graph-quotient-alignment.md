---
title: Graph Quotient Alignment
type: concept
aliases:
  - Inner and Outer Graph Alignment
  - Representative Alignment for Graphs
tags:
  - graph-generation
  - optimal-transport
  - equivariance
  - gromov-wasserstein
---

## Overview

Graph quotient alignment treats an unordered graph as an orbit of labeled adjacency and feature tensors under simultaneous node permutation. When a generative transport method works with labeled tensors, it must choose representatives of those orbits. **Inner alignment** chooses the node correspondence within a source-target graph pair; **outer alignment** chooses which source and target graphs are paired. These are separate decisions even when the generative model itself is permutation-equivariant.

## Key Ideas

- **Equivariance does not choose a coupling:** A permutation-equivariant vector field reacts consistently to relabeling, but it does not determine which target labeling should be connected to a given source labeling.
- **Inner alignment is quotient geometry:** Minimizing Euclidean tensor distance over simultaneous node permutations defines the graph quotient metric and gives a hard Gromov-Monge matching problem.
- **Relaxations and search:** [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]] relaxes hard node permutations to soft couplings that can be rounded. Finite best-of-augmentation instead searches a sampled subset of permutations and gives an upper bound on the exact hard-alignment cost.
- **Outer alignment is sample assignment:** After defining a cost that includes inner alignment, a minibatch assignment can pair source and target graphs to reduce total transport cost.
- **Budgets interact:** More inner candidates improve each pairwise correspondence, while larger outer batches expose each source to more target graphs. Their computational scaling differs, so the best allocation depends on graph size, feature dimension, and the alignment solver.
- **Symmetrization restores invariant training laws:** Applying the same random group action to both endpoints of an aligned representative coupling preserves its cost and supports equivariant flow-matching minimizers.

## Important Papers

- [[papers/alignment-matters-inside-and-out-in-equivariant-graph-flow-matching|Alignment Matters Inside and Out in Equivariant Graph Flow Matching]] (Piening and Wald, 2026): formalizes representative lifts and symmetrization, separates inner node alignment from outer graph assignment, and evaluates GW and sampled-permutation approximations.
- Mémoli and Needham (2024), "Comparison Results for Gromov-Wasserstein and Gromov-Monge Distances": studies the relation between relaxed and hard relational matching distances.
- Klein et al. (2023), "Equivariant Flow Matching": develops flow matching under group symmetries.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: learns the transport field induced by the selected representative coupling.
- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: provides a practical relaxation for relational node matching.
- [[concepts/optimal-transport|Optimal Transport]]: supplies the graph-pair coupling problem and its minibatch approximation.
