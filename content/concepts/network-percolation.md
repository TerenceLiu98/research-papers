---
title: Network Percolation
type: concept
aliases:
  - Percolation on Networks
definition: "Network percolation studies how node or edge occupation determines connected paths and macroscopic connected components in a graph."
tags:
  - percolation
  - complex-networks
---

## Overview

Network percolation relates local node or edge availability to collective connectivity. In a node model, unavailable nodes also remove their incident connections; in a bond model, edges are independently made available or unavailable according to the specified rule. Thresholds depend on topology, occupation assumptions, and the connectivity observable.

## Key Ideas

- **State the denominator.** Active-node fractions, retained-edge fractions, and removed-edge fractions measure different quantities.
- **Specify the observable.** Random-pair reachability, a giant component, and connectivity of every node are different events. A finite-network probability criterion should accompany a numerical threshold.
- **Separate fits from universal claims.** A regression over a limited degree range does not establish an infinite-degree threshold for arbitrary networks.
- **Connectivity enables transmission but does not prove adoption.** Social interpretations require additional assumptions about message acceptance and behavior.

## Important Papers

- [[papers/managing-social-networks-applying-the-percolation-theory-methodology-to-understand-individuals-attitudes-and-moods|Managing social networks: Applying the percolation theory methodology to understand individuals' attitudes and moods]] compares node and bond simulations and interprets connectivity through a simplified attitude model; its social applications remain conceptual.

## Related Concepts

- [[concepts/lattice-percolation|Lattice Percolation]]: specialization to spatial lattice geometry.
- [[concepts/bipartite-bond-percolation|Bipartite Bond Percolation]]: occupation of edges between two distinct node sets.
- [[concepts/induced-percolation|Induced Percolation]]: activity depends on neighborhood support rather than only an occupation assignment.
- [[concepts/resource-limited-percolation-control|Resource-Limited Percolation Control]]: introduces explicit costs and budgets for altering connectivity onset.
