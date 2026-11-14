---
title: Causal Pareto Optimization
type: concept
aliases:
  - Multi-Objective Causal Bayesian Optimization
  - MO-CBO
tags:
  - causal-inference
  - multi-objective-optimization
---

## Overview

Causal Pareto optimization searches for interventions whose expected outcome vectors are not dominated by another feasible intervention. Both the set of manipulated variables and the values assigned to them are decision variables. A causal Pareto front collects the attainable trade-offs across these intervention choices.

## Key Ideas

- For minimization, an intervention dominates another when it is no worse on every expected outcome and strictly better on at least one.
- Fixing a treatment subset creates a local multi-objective optimization problem. The global front is obtained by filtering the union of local fronts for nondominance.
- Intervening on more variables can remove causal paths that help achieve good outcomes. Consequently, optimizing all treatments simultaneously can miss trade-offs attainable by smaller subsets.
- With a known causal graph, graphical intervention-set criteria can reduce the local problems worth exploring. Such structural claims depend on the model assumptions and are separate from an optimizer's finite-sample accuracy.
- Bayesian optimization can allocate expensive evaluations across retained subsets. CAUSAL PARETOSELECT uses independent Gaussian processes, diverse batches, and relative hypervolume improvement for this allocation.

## Important Papers

- [[papers/multi-objective-causal-bayesian-optimization|Multi-Objective Causal Bayesian Optimization]]: formalizes the problem, proposes graphical pruning, and evaluates adaptive batch allocation on three structural causal models.

## Related Concepts

- [[concepts/multi-criteria-decision-making|Multi-Criteria Decision Making]]: provides the wider decision context; Pareto-front discovery leaves the eventual choice among trade-offs open.
