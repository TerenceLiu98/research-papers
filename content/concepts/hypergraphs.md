---
title: Hypergraphs
type: concept
aliases:
  - Hypergraph
  - Hypergraph Networks
tags:
  - higher-order-networks
  - network-representation
  - social-network-analysis
---

## Overview

A hypergraph $\mathcal H=(V,E)$ represents entities as nodes and interactions as subsets of nodes called hyperedges. Unlike an ordinary graph edge, a hyperedge can join more than two participants in one event or relationship. This makes the representation useful for collaboration teams, group encounters, and multiplayer games where membership in a shared interaction matters.

## Key Ideas

- **Group identity survives.** A three-person meeting and three separate pairwise meetings have different hyperedge sets even though their pairwise clique projections can be identical. Projection can erase group size and inflate apparent transitivity.
- **Incidence representations preserve membership.** A bipartite graph with actor nodes and group nodes can encode which actors belong to which groups. It should be distinguished from a pairwise projection that collapses the groups.
- **Simplicial closure is an additional assumption.** A simplicial complex contains all faces of every simplex. General hypergraphs do not require every subset of an observed group to have its own interaction. Closure is useful for topological methods but may misrepresent observed group events.
- **Overlap and nesting differ.** Groups can share members without one being contained in another. Measures of motifs, nestedness, and recurring groups describe aspects of organization that ordinary degree and clustering may miss.
- **Temporal events retain social memory.** Time-indexed hyperedges can record repeated groups, burstiness, and assembly or disassembly. Recovering such events from pairwise proximity measurements requires temporal resolution and explicit reconstruction assumptions.
- **Structure and dynamics are separate.** Group membership does not by itself establish irreducible social influence. Transmission and payoff rules determine whether a process can be reduced to pairwise contributions and whether higher-order effects change its outcomes.
- **Baselines must fit the question.** Null models should preserve relevant constraints, such as actor activity, before treating recurring groups as unusually persistent. The combinatorial configuration space makes adequate sampling and scalable storage important.

## Important Papers

- [[papers/higher-order-interactions-shape-collective-human-behaviour|Higher-order interactions shape collective human behaviour]]: reviews social applications and illustrates representation-dependent findings with arXiv coauthorship data from 2007-2022.
- [[papers/when-groups-attract-coevolutionary-dynamics-of-cooperation-and-individual-and-group-based-imitating-rules|When groups attract: coevolutionary dynamics of cooperation and individual- and group-based imitating rules]]: models public goods games and coevolving individual- and group-level imitation on hypergraphs.
- Battiston et al. (2020), "Networks beyond pairwise interactions: structure and dynamics": foundational review cited as reference 17 by the Perspective.
- Benson et al. (2018), "Simplicial closure and higher-order link prediction": work on group closure cited as reference 28 by the Perspective.

## Related Concepts

- [[concepts/social-network-analysis|Social Network Analysis]]: measures and questions about relational structure extended to groups.
- [[concepts/higher-order-social-contagion|Higher-Order Social Contagion]]: one class of dynamics on explicit groups.
- [[concepts/group-biased-imitation|Group-Biased Imitation]]: a group-level learning rule whose effects depend on group payoffs and overlap.
- [[concepts/public-goods-games|Public Goods Games]]: multiplayer strategic interactions whose payoffs can depend on explicit hyperedges.
- [[concepts/network-games|Network Games]]: hyperedges can specify the groups participating in multiplayer strategic interactions.
- [[concepts/activity-driven-networks|Activity-Driven Networks]]: a temporal pairwise modeling approach; changing links and retaining explicit groups are distinct modeling choices.
