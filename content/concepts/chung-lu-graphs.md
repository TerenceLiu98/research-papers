---
title: Chung-Lu Graphs
type: concept
aliases:
  - Chung-Lu Random Graphs
  - CL Graphs
tags:
  - random-graphs
  - sparse-networks
  - power-law-networks
  - graph-limits
---

## Overview

The Chung-Lu model generates a random graph from nonnegative node weights. An admissible weight vector $(w_i)_{i=1}^N$ connects each pair independently with probability $w_iw_j/\sum_k w_k$. A larger weight therefore produces a larger expected degree. The construction is simple enough for scalable sampling while supporting sparse and heavy-tailed networks, including power-law degree distributions with exponents above two.

## Key Ideas

- **Weights prescribe expected connectivity.** Node heterogeneity enters through one scalar weight per vertex, and edge probabilities factor into the product of endpoint weights.
- **Admissibility keeps probabilities valid.** A standard sufficient condition is that the square of the maximum weight does not exceed the sum of all weights.
- **Sparse limits can retain finite average degree.** Under convergence of the empirical weight distribution and its first moment, the expected degree of a uniformly sampled node stays finite as the graph grows.
- **Local weak convergence captures the relevant limit.** Rather than converging as a dense adjacency kernel, rooted neighborhoods converge in distribution and become locally tree-like.
- **Neighbors have a size-biased degree distribution.** Following a random edge overrepresents high-degree nodes, giving probabilities proportional to $kP(D=k)$. [[papers/learning-cooperative-mean-field-games-on-sparse-chung-lu-graphs|Learning Cooperative Mean Field Games on Sparse Chung-Lu Graphs]] uses this property to approximate neighborhood states.
- **Heavy tails preserve both leaves and hubs.** Finite first moment with infinite second moment describes networks where most nodes may have few connections but high-degree nodes still account for substantial interaction mass.
- **The model has structural scope conditions.** Independent edges and size-biased neighbor degrees are appropriate for Chung-Lu graphs but need not represent assortativity, clustering, or preferential-attachment dependence.

## Important Papers

- [[papers/learning-cooperative-mean-field-games-on-sparse-chung-lu-graphs|Learning Cooperative Mean Field Games on Sparse Chung-Lu Graphs]]: builds a cooperative control limit and scalable learning methods on sparse Chung-Lu sequences.
- Aiello, Chung, and Lu (2000; 2001): early work on random graphs with power-law degree distributions.
- Chung and Lu (2002; 2006): develops the expected-degree random graph framework and its structural properties.
- Van der Hofstad (2024), *Random Graphs and Complex Networks*: provides the local weak convergence result used by the CLCMFG analysis.

## Related Concepts

- [[concepts/chung-lu-cooperative-mean-field-games|Chung-Lu Cooperative Mean Field Games]]: degree-indexed control on sparse Chung-Lu networks.
- [[concepts/graphons|Graphons]]: kernel limits for dense graphs; fixed graphons do not directly describe finite-average-degree sequences.
- [[concepts/graphon-mean-field-games|Graphon Mean Field Games]]: network games based on graphon-weighted population interactions.
