---
title: Feature-Enriched Percolation
type: concept
aliases:
  - Feature-Based Percolation
definition: "Feature-enriched percolation studies network connectivity under node occupation or removal rules that depend on node metadata as well as degree."
tags:
  - percolation
  - network-robustness
  - node-metadata
---

## Overview

Feature-enriched percolation encodes attributes such as age, spatial proximity, or infection probability in a joint degree–feature distribution. An occupation rule selects which nodes survive, allowing robustness to be assessed for interventions grounded in those attributes.

## Key Ideas

- Degree–feature dependence matters: preserving marginal distributions while shuffling features can change which structurally important nodes an intervention removes.
- In a configuration-model approximation, occupation-weighted generating functions determine the surviving giant component through an edge nonconnection fixed point. The threshold occurs when the excess-degree generating function has slope one at that fixed point's trivial solution.
- Metadata does not itself add edges, layers, or node interaction types. Multiple feature dimensions can enter an occupation rule while the generating functions remain univariate.
- Dynamics can generate features, but the resulting connectivity calculation is distinct from simulating how dynamics readjust after removal.
- Spatial clustering and other topological correlations can invalidate the locally tree-like approximation even when the degree–feature distribution is accurately known.

## Important Papers

- [[papers/percolation-on-feature-enriched-interconnected-systems|Percolation on feature-enriched interconnected systems]]: develops the joint-distribution framework and tests independent, correlated, spatial, and dynamics-derived features.

## Related Concepts

- [[concepts/lattice-percolation|Lattice Percolation]]: shares the connectivity order parameter, but fixed low-dimensional geometry changes the analytical treatment.
- [[concepts/induced-percolation|Induced Percolation]]: removes nodes through iterative neighborhood-support rules, a different mechanism from occupation based on measured metadata.
