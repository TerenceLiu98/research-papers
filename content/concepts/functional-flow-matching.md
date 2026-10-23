---
title: Functional Flow Matching
type: concept
aliases:
  - Function-Space Flow Matching
tags:
  - generative-models
  - flow-matching
  - function-spaces
---

## Overview

Functional flow matching extends [[concepts/flow-matching|Flow Matching]] from finite-dimensional vectors to probability measures on a separable Hilbert space of functions. A learned function-to-function velocity field transports a Gaussian reference measure toward the data measure. Because the model represents functions rather than one fixed grid, its discretization can use coordinate subsets and can be evaluated on different meshes or resolutions.

## Key Ideas

- **Measure-valued transport.** A time-indexed measure path and velocity field satisfy a weak continuity equation on the function space. Sampling integrates the associated functional ODE from a random reference function.
- **Conditional objectives.** The marginal velocity is generally unavailable. Gaussian conditional paths centered on a target function provide closed-form conditional velocities whose squared-error objective has the same parameter-dependent part as marginal regression.
- **Gaussian reference functions.** Infinite-dimensional white noise is not itself a function-valued random variable. Implementations therefore use trace-class Gaussian processes, mollified noise, or finite-grid approximations appropriate to the domain.
- **Discretization flexibility is empirical.** Coordinate subsampling and mesh-independent architectures can reduce training cost and enable cross-resolution evaluation, but they do not guarantee equal fidelity at unseen resolutions.
- **Finite-interval extension.** [[concepts/functional-mean-flow|Functional Mean Flow]] learns average transport across an interval for one-step sampling. Its marginal finite-interval flow cannot generally be obtained by simply averaging sample-conditional flow maps.

## Important Papers

- Kerrigan, Migliorini, and Smyth (2023), "Functional Flow Matching": develops conditional flow matching for distributions on function spaces.
- [[papers/functional-mean-flow-in-hilbert-space|Functional Mean Flow in Hilbert Space]]: derives one-step mean-velocity and endpoint-prediction objectives in Hilbert space.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: the underlying vector-field regression framework.
- [[concepts/functional-mean-flow|Functional Mean Flow]]: finite-interval transport in function space.
- [[concepts/neural-operators|Neural Operators]]: common function-to-function parameterizations.
- [[concepts/average-velocity-fields|Average Velocity Fields]]: the finite-dimensional MeanFlow construction.
