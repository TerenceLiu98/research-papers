---
title: Phase Ordering in Dialects
type: concept
aliases:
  - Surface Tension in Dialect Dynamics
tags:
  - sociophysics
  - dialectology
  - spatial-dynamics
  - phase-ordering
---

## Overview

Phase ordering in dialects is the formation and evolution of geographic domains dominated by different linguistic variants. Local accommodation and short-range interaction can produce relatively coherent domains separated by isoglosses, analogous to interfaces in physical ordering systems. Surface tension here describes a mathematical tendency for interfaces to reduce curvature, not a literal force between speakers.

## Key Ideas

- **Reinforcement and smoothing act together.** Frequency-dependent accommodation favors locally dominant variants, while local copying couples neighboring locations. Long-range migration mixes variants and can erode regional distinctions.
- **A tractable interface model.** With uniform density and two variants, the linked paper obtains

  $$
  \partial_t x=D\partial_z^2x+\lambda(\bar x-x)
  +2sx(1-x)+\beta x(1-x)(2x-1),
  $$

  where $x$ is one variant's frequency, $\bar x$ its frequency among incoming migrants, $D$ the local diffusion coefficient, $s$ bias, and $\beta$ accommodation.
- **Stationary boundaries require specific conditions.** For $s=0$, an isolated planar interface, and $\bar x\approx1/2$ near it, a stationary solution exists for $\beta>2\lambda$, with characteristic width $\sqrt{D/(\beta-2\lambda)}$. Moving, curved, biased, or strongly interacting interfaces need the fuller model.
- **Population geography changes boundary motion.** The two-dimensional model connects curvature reduction with population-density gradients. Boundaries tend to move away from population centers, providing some protection for their linguistic variants. Bias and unbalanced migration can expand one domain at another's expense.
- **Spatial diversity differs from local bistability.** Stable alternative states in a homogeneous equation do not by themselves prove persistent geographic domains. Spatial coupling, migration, boundary geometry, and initial conditions determine whether those states coexist across space.
- **Empirical agreement is conditional evidence.** Reproducing dialect boundaries supports this mechanism under the fitted model. It does not uniquely identify accommodation or eliminate omitted social and historical migration processes.

## Important Papers

- [[papers/statistical-physics-of-language-change-inferred-from-time-evolving-maps|Statistical physics of language change inferred from time evolving maps]]: derives migration-accommodation interface conditions and fits a multi-variant model to reconstructed U.S. lexical fields.
- Burridge (2017), "Spatial evolution of human dialects," Physical Review X 7, 031008: cited there as an earlier curvature-driven account of dialect geography.
- Burridge (2018), "Unifying models of dialect spread and extinction using surface tension dynamics," Royal Society Open Science 5, 171446: cited there as a related surface-tension model.

## Related Concepts

- [[concepts/linguistic-accommodation|Linguistic Accommodation]]: the local reinforcement mechanism in the linked model.
- [[concepts/apparent-time-inference|Apparent-Time Inference]]: a method for reconstructing the historical fields used to assess the model.
- [[concepts/bistability-and-hysteresis|Bistability and Hysteresis]]: explains coexisting local attractors; bistability alone does not establish hysteresis or stationary spatial boundaries.
- [[concepts/opinion-dynamics|Opinion Dynamics]]: the broader study of emergent social patterns from individual interactions.
