---
title: Multiplex Node Diversity
type: concept
definition: "Multiplex node diversity measures how much an actor's connectivity patterns differ across layers of a multiplex network."
aliases:
  - Node Diversity in Multiplex Networks
tags:
  - multiplex-networks
  - network-analysis
---

## Overview

Multiplex node diversity describes variation in a node's structural position across relationship layers. An actor can participate in many layers with similar neighbors, or have substantially different connectivity in each layer; layer participation alone does not distinguish these cases.

## Key Ideas

- The formulation used by Toledo et al. compares node-distance distributions and transition distributions across pairs of layers using normalized square-root Jensen–Shannon divergence, then aggregates the resulting distances into diversity.
- Diverse connectivity may expose alternative routes and roles relevant to adaptation after removals. This structural interpretation requires separate validation against actual adaptive behavior.
- Diversity complements centrality rather than replacing it: a node can be a major hub in one layer while having little cross-layer diversity.

## Important Papers

- Carpi et al. (2019), “Assessing diversity in multiplex networks”: methodological source cited by Toledo et al.
- [[papers/multiplex-key-roles-to-disrupt-criminal-networks|Multiplex key roles to disrupt criminal networks]]: combines diversity with betweenness and degree; the combined ranking outperforms diversity alone in its disruption simulation.

## Related Concepts

- [[concepts/katz-centrality|Katz Centrality]] measures walk-based structural influence, a different property from cross-layer heterogeneity.
