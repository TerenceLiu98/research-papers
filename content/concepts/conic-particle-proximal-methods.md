---
title: Conic Particle Proximal Methods
type: concept
aliases:
  - Conic Particle Proximal Point
  - CP-PP
  - Conic Particle Mirror Prox
  - CP-MP
tags:
  - continuous-games
  - particle-methods
  - min-max-optimization
  - optimal-transport
---

## Overview

Conic particle proximal methods solve continuous games by representing mixed strategies as weighted atomic measures and updating both the particles' masses and locations. Their geometry combines Fisher-Rao mass change with Wasserstein transport, allowing a finite particle system to refine the support of a mixed strategy instead of fixing it to a preselected grid.

## Key Ideas

- **Joint parameterization:** A strategy $\mu$ is represented as $\sum_i a_i\delta_{x_i}$. Weight updates change how much mass each atom carries, while position updates move its pure strategy.
- **Implicit stabilization:** Conic Particle Proximal Point (CP-PP) uses an implicit saddle update with relative entropy for weights and weighted squared displacement for positions. This addresses the cycling or divergence possible for explicit mirror descent-ascent.
- **Wasserstein-Fisher-Rao geometry:** Mass variation and particle transport are the two components of Wasserstein-Fisher-Rao dynamics. CP-PP is an implicit discretization of the interacting flow; CP-MDA is explicit.
- **Practical approximation:** Replacing the payoff by successive local linearizations gives an inner-loop algorithm. One inner iteration yields CP-MDA, two yield Conic Particle Mirror Prox (CP-MP), and an exact inner solution yields CP-PP.
- **Local exactness:** Under smoothness, uniqueness, sparse equilibrium support, strict complementarity, and non-degenerate support Hessians, CP-PP has local exponential last-iterate convergence to the exact equilibrium rather than merely to a grid-dependent approximation.
- **Overparameterization tolerance:** The convergence constants can be independent of particle count. Particle counts still must be large enough to represent a sufficiently accurate initialization, and each iteration retains particle-dependent computational cost.
- **Scope of guarantees:** The practical CP-MP method inherits the proven rate in an exact-parameterization case. Experimental similarity to CP-PP in overparameterized settings is not itself a general theorem.

## Important Papers

- [[papers/an-exponentially-converging-particle-method-for-the-mixed-nash-equilibrium-of-continuous-games|An Exponentially Converging Particle Method for the Mixed Nash Equilibrium of Continuous Games]] (2025): introduces CP-PP, proves its local exponential convergence, and studies CP-MP as an implementable approximation.
- Domingo-Enrich et al. (2020), "A Mean-Field Analysis of Two-Player Zero-Sum Games": studies interacting Wasserstein-Fisher-Rao dynamics for continuous zero-sum games.
- Chizat (2022), "Sparse Optimization on Measures with Over-Parameterized Gradient Descent": develops related conic particle methods for optimization over measures.

## Related Concepts

- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]: provides the distributional gradient-flow viewpoint underlying the particle dynamics.
- [[concepts/approximate-nash-equilibrium|Approximate Nash Equilibrium]]: contrasts exact equilibrium convergence with bounded incentive-gap guarantees.
