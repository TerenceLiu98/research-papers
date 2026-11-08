---
title: Nonuniform Fourier Neural Operators
type: concept
aliases:
  - NUFNO
tags:
  - neural-operators
  - fourier-neural-operators
  - particle-methods
  - operator-learning
---

## Overview

A nonuniform Fourier neural operator (NUFNO) is a [[neural-operators|Neural Operator]] whose spectral transforms run directly between features at irregular points and a fixed set of Fourier modes. In NEOPIC, the points and their weights define the input empirical measure rather than merely sampling an external function, allowing the operator to map particle configurations directly to fields at particle positions without mesh deposition.

## Key Ideas

- A type-1 nonuniform Fourier transform aggregates weighted particle features into Fourier coefficients, spectral weights mix those coefficients, and a type-2 transform evaluates the result back at the particle locations.
- Expressing each layer as an integral against the empirical measure makes it permutation-invariant and consistent across particle counts. Direct transforms are representation-equivalent; NUFFT evaluation preserves this property up to transform tolerance.
- Global Fourier modes suit long-range interactions such as electrostatic fields while avoiding local message-passing depth and hard-neighborhood discontinuities.
- For a fixed number of modes, layers, channels, and transform tolerance, evaluation is $\mathcal{O}(N_p)$ in the particle count. NUFFT evaluation also avoids the $\mathcal{O}(N_pM)$ matrix storage required by a directly assembled nonuniform discrete transform.
- Avoiding a mesh prevents high-frequency particle noise from being aliased onto retained low-frequency modes. This is distinct from guaranteeing that the learned response to sampling noise is accurate, which still depends on training data and teachers.

## Important Papers

- [[NEOPIC: A Neural Operator Framework for Particle-based Kinetic Plasma Simulations]]
- Lingsch et al. (2023), "Beyond Regular Grids: Fourier-Based Neural Operators on Arbitrary Domains."
- Bartolucci et al. (2023), "Representation Equivalent Neural Operators: A Framework for Alias-Free Operator Learning."
- Li et al. (2021), "Fourier Neural Operator for Parametric Partial Differential Equations."

## Related Concepts

- [[neural-operators|Neural Operators]]
- Fourier neural operators
- Nonuniform fast Fourier transforms
- Empirical measures
- Representation equivalence
- Particle-in-Fourier methods
- Mesh-free particle methods
