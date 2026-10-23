---
title: Measure Differential Inclusions
type: concept
aliases:
  - Measure Differential Inclusion
  - MDI
  - Measure Differential Equations
  - MDE
tags:
  - measure-valued-dynamics
  - differential-inclusions
  - wasserstein-space
  - optimal-transport
---

## Overview

Measure differential equations and inclusions describe time evolution when the state is a probability measure and its velocity is itself represented by a probability measure on position-velocity pairs. An inclusion permits several admissible velocity distributions at the same state, making it suitable for dynamics built from nonunique [[concepts/optimal-transport|optimal transport]] couplings or barycenters.

## Key Ideas

- A probability vector field assigns to each state measure $\mu$ a measure on $(x,v)$ whose position marginal is $\mu$. It therefore specifies a distribution of velocities conditional on mass locations rather than an ordinary pointwise vector field.
- A measure differential inclusion replaces a single probability vector field with a set-valued map. A solution selects an admissible velocity measure almost everywhere in time and satisfies the corresponding continuity equation weakly against smooth test functions.
- Wasserstein geodesics fit this framework. Given an optimal coupling between $\mu_0$ and a target $\bar\mu$, displacement interpolation pushes each paired point from $x$ toward $y$; an exponential time reparameterization gives velocity $y-x$ toward the fixed target.
- In [[papers/dynamics-of-measure-valued-agents-in-the-space-of-probabilities|Dynamics of Measure-Valued Agents in the Space of Probabilities]], the admissible velocities arise from optimal couplings between every agent and a weighted [[concepts/wasserstein-barycenters|Wasserstein barycenter]]. Nonuniqueness of either object makes the dynamics genuinely set-valued.
- Existence arguments can combine explicit geodesic time steps, support invariance, Wasserstein equicontinuity, upper semicontinuity of the set-valued field, and compactness. These ingredients do not by themselves imply uniqueness or asymptotic consensus.

## Important Papers

- [[papers/dynamics-of-measure-valued-agents-in-the-space-of-probabilities|Dynamics of Measure-Valued Agents in the Space of Probabilities]] (Borghi, Herty, and Stavitskiy, 2025): formulates barycenter-driven multi-agent consensus as an MDI and proves existence for compactly supported probability-measure-valued agents.
- Piccoli (2018), "Measure Differential Inclusions": introduces the MDI framework used by Borghi, Herty, and Stavitskiy.
- Piccoli (2019), "Measure Differential Equations": develops the corresponding single-valued framework for probability vector fields.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]
