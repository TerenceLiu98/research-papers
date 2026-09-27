---
title: Synchronization Noise in Temporal Point Processes
type: concept
aliases:
  - Synchronization Noise
tags:
  - temporal-point-processes
  - hawkes-processes
  - synchronization-noise
  - causal-discovery
---

## Overview

Synchronization noise is an observation error in which every event in a given stream receives the same unknown timestamp offset. For latent event time $t_k^i$ in stream $i$, the observed time is $\tilde t_k^i=t_k^i+z_i$. The offset preserves ordering and intervals within that stream but can change event order across streams. Independent clocks or fixed source-dependent reporting delays can produce this observation pattern.

## Key Ideas

- **Temporal order affects inferred influence.** In a multivariate Hawkes process, earlier events contribute to later conditional intensities. Offsets can make a triggering event appear after its consequence, creating reverse edges or obscuring genuine excitation.
- **Observation windows matter.** Shifting a stream can move events into or out of a finite recording window. Likelihood calculations must account for the corresponding shifted limits.
- **Offsets can be estimated jointly with the event model.** DESYNC-MHP treats one offset per dimension as an unknown parameter alongside background intensities and excitation coefficients, without requiring a known offset distribution.
- **Event swaps make optimization difficult.** For causal exponential kernels, crossing zero lag changes which events contribute to the intensity and introduces likelihood jumps. DESYNC-MHP uses smoothed kernels for offset gradients while retaining exact likelihood gradients for the Hawkes parameters.
- **Smoothing trades bias for tractability.** Gentler smoothing eases optimization but changes the objective more. Stochastic updates over realizations help in the reported experiments, while high noise and local optima remain failure modes.
- **Predictive fit and graph recovery are separate evidence.** Synthetic data permit direct comparison with a known excitation graph. Improved likelihood on observational spike trains does not establish that estimated offsets reflect clock error or that inferred edges are biologically causal.
- **The model has a specific scope.** A fixed offset per stream does not describe event-specific jitter, time-varying clock drift, or arbitrary missing events.

## Important Papers

- [[papers/learning-hawkes-processes-under-synchronization-noise|Learning Hawkes Processes Under Synchronization Noise]]: defines the offset model, develops DESYNC-MHP estimation, and evaluates synthetic graph recovery and neuronal predictive likelihood (Sections 3-5).

## Related Concepts

- [[concepts/granger-causality|Granger Causality]]: predictive direction depends on which observations count as past history; timestamp misalignment can corrupt that history.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: flexible triggering-kernel inference addresses a separate modeling choice from timestamp alignment. A combined method is not evaluated in the DESYNC-MHP paper.
