---
title: Causal Global Optimization
type: concept
aliases:
  - CGO
tags:
  - causal-inference
  - bayesian-optimization
---

## Overview

Causal global optimization searches jointly over the subset of variables to manipulate and their assigned values to optimize an expected outcome under intervention. The empty subset represents leaving the system observational.

## Key Ideas

- Intervening on a variable removes its incoming causal dependencies. Manipulating additional variables can therefore change which outcomes are reachable, rather than merely increase cost.
- A known causal graph can identify redundant intervention sets and restrict attention to sets that could be optimal under compatible mechanisms. Feasible domains and non-manipulable variables remain part of the problem.
- Observational estimates of identifiable effects can inform surrogate priors, while experimental data refine predictions. Observation coverage limits how much this information can replace interventions.
- Causal Bayesian Optimization implements this search with Gaussian processes for candidate subsets, cost-normalized expected improvement, and a policy choosing between observing and intervening.
- Structural reductions in the search space do not themselves guarantee finite-budget convergence or robustness to an incorrect graph.

## Important Papers

- [[papers/causal-bayesian-optimization|Causal Bayesian Optimization]]: formulates the single-outcome problem and combines causal priors with sequential intervention selection.

## Related Concepts

- [[concepts/causal-pareto-optimization|Causal Pareto Optimization]]: extends the decision problem to nondominated trade-offs among multiple outcomes.
- [[concepts/gaussian-process-regression|Gaussian Process Regression]]: supplies the probabilistic surrogates used by CBO.
