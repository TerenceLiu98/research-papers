---
title: Katz Centrality
type: concept
tags:
  - graph-algorithms
  - centrality
  - random-walks
---

## Overview

Katz centrality measures a node’s importance through counts of walks reaching it, discounting longer walks by an attenuation factor and adding a positive baseline. It captures influence through indirect connections as well as immediate neighbors.

## Key Ideas

Using an adjacency convention in which $A$ aggregates incoming influence, the score vector satisfies $K=\alpha AK+\beta\mathbf{1}$. For $\alpha\rho(A)<1$, its solution is $K=\beta\sum_{k=0}^{\infty}\alpha^kA^k\mathbf{1}$. With a source-row adjacency matrix, use the transpose for incoming centrality.

- **Attenuation matters:** Larger attenuation gives longer walks more weight; convergence requires remaining below the inverse spectral radius.
- **Two approximation errors:** A finite cutoff omits the tail of the series. Monte Carlo estimation introduces sampling variability even when its target is unbiased.
- **Corrected walk sampling:** Uniform neighbor selection does not sample paths uniformly. Products of encountered degrees supply inverse-probability weights for estimating walk counts.
- **Random horizons:** Geometric stopping can represent the full discounted sum in expectation, trading a fixed cutoff for random computation and sampling variability.

## Important Papers

- Leo Katz’s *A New Status Index Derived from Sociometric Analysis* (1953) introduced the measure, as cited by Cornett and colleagues.
- [[papers/efficient-monte-carlo-algorithms-for-approximating-katz-centrality-on-large-graphs|Efficient Monte Carlo Algorithms for Approximating Katz Centrality on Large Graphs]] develops fixed-length and geometric-length random-walk estimators with GPU implementations.

## Related Concepts

- [[concepts/heterogeneous-graph-vote-propagation|Heterogeneous Graph Vote Propagation]] uses graph-walk relevance for prediction; its predictive scores have a different target from Katz influence scores.
