---
title: Finite-Precision Statistical Bias
type: concept
aliases:
  - Statistical Bias in Finite-Precision Dynamics
definition: Systematic discrepancy between statistics of a finite-precision dynamical simulation and those of its intended continuum dynamics, caused by representation and the implemented state transitions.
tags:
  - numerical-analysis
  - dynamical-systems
---

## Overview

Finite-precision dynamics evolve over finitely many representable states. Their invariant distributions can differ from the target continuum distribution even when local arithmetic errors are small. Statistical bias therefore requires assessment separately from trajectory accuracy and sampling uncertainty.

## Key Ideas

- Deterministic updates form functional graphs whose components each feed a periodic cycle. Merging trajectories can reduce reachable support and concentrate probability on unrepresentative states.
- Stochastic rounding creates a Markov chain, but exactly representable cycles can remain closed trapping classes. Unbiased local rounding does not guarantee unbiased stationary statistics.
- Multiple invariant components can make long-run averages depend on initialization, even when continuum equilibrium statistics forget the initial ensemble.
- Increasing averaging duration can dilute useful transient observations. Ensembles of shorter trajectories may reduce sampling uncertainty while retaining lower distributional bias, provided the finite-time distribution is sufficiently representative.
- [[concepts/optimal-transport|Optimal Transport]] supplies Wasserstein-1 distance as a measure of worst-case bias among unit-Lipschitz observables. A support-based error floor need not equal the actual bias, and does not imply monotone actual error.

## Important Papers

- [[papers/on-the-statistical-reliability-of-chaotic-simulations-at-reduced-precision|On the Statistical Reliability of Chaotic Simulations at Reduced Precision]] (Ah-Weng and Coveney, 2026): derives finite-state error and averaging-horizon bounds and tests deterministic and stochastic rounding on four chaotic maps.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]: connects discrepancies between simulated and target distributions to observable bias.
