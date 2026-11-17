---
title: Bipartite Bond Percolation
type: concept
aliases:
  - Bipartite Percolation
definition: "Bipartite bond percolation studies the emergence of a macroscopic connected component as edges between two disjoint node sets are randomly occupied."
tags:
  - percolation
  - random-graphs
  - phase-transitions
---

## Overview

Bipartite bond percolation studies connectivity in graphs whose edges always join two different node sets. Increasing edge occupation can join small components into a macroscopic connected component. Thresholds depend on degree distributions and graph structure.

## Key Ideas

- For independent random edges between large sets of sizes $M$ and $N$, the threshold scales as $p_c\simeq 1/\sqrt{MN}$; the corresponding expected edge count is of order $\sqrt{MN}$.
- Alternating paths connect nodes through shared neighbors. For a nonnegative incidence matrix $D$, $(DD^T)^nD$ represents paths between the two node types through repeated propagation.
- In a learning analogy, entity–property observations form edges and connectivity can support inference of unseen combinations within a class. This requires assumptions about class structure and the learner's inference process; graph connectivity alone does not establish neural generalization.
- Infinite-propagation connectivity and finite-step inference are distinct. A downstream task may need additional computation and exhibit a different transition scale.

## Important Papers

- [[papers/a-percolation-model-of-emergence-analyzing-transformers-trained-on-a-formal-language|A Percolation Model of Emergence: Analyzing Transformers Trained on a Formal Language]] uses this model to predict descriptive-type learning transitions, while leaving the different unscrambling exponent unexplained.

## Related Concepts

- [[concepts/lattice-percolation|Lattice Percolation]]: studies occupation on a fixed spatial lattice; its geometry and thresholds differ from random bipartite connectivity.
