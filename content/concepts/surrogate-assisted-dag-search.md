---
title: Surrogate-Assisted DAG Search
type: concept
tags:
  - causal-discovery
  - bayesian-optimization
---

## Overview

Surrogate-assisted DAG search learns an inexpensive approximation to a graph-scoring objective and uses it to select which directed acyclic graphs deserve costly evaluation. It separates graph generation, uncertainty-aware candidate selection, and actual statistical scoring.

## Key Ideas

- Acyclic parameterizations can generate valid candidates directly, avoiding repeated constrained optimization.
- Local parent-set scores provide reusable supervision across graphs. Independent local models can be combined using the original score formula, including formulas that couple local residual variances.
- Stochastic surrogate predictions balance exploration and exploitation. Their uncertainty concerns the scoring function; it does not directly provide a posterior distribution over causal structures.
- Continual updates with replay control the growing cost of surrogate training. The benefit depends on the relative expense of scoring, acquisition, and model updates.
- Search efficiency and causal identification are distinct: a high-scoring graph is only causally interpretable under the relevant statistical and causal assumptions. Compact representations also trade search efficiency against expressiveness.

## Important Papers

- [[papers/causal-discovery-via-bayesian-optimization|Causal Discovery via Bayesian Optimization]]: DrBO combines low-rank acyclic representations, node-wise dropout surrogates, Thompson sampling, and reservoir replay.

## Related Concepts

- [[concepts/bayesian-experimental-design|Bayesian Experimental Design]]: sequential selection through probabilistic models, with a different evaluation target.
- [[concepts/causal-pareto-optimization|Causal Pareto Optimization]]: searches intervention choices and outcome trade-offs rather than unknown graph structures.
