---
title: Particle Gibbs Sampling
type: concept
aliases:
  - Particle Gibbs
tags:
  - bayesian-inference
  - particle-mcmc
  - sequential-monte-carlo
---

## Overview

Particle Gibbs is a particle Markov chain Monte Carlo method for sampling latent trajectories. It embeds a conditional particle filter in an MCMC update, retaining the current trajectory during filtering so that the resulting transition preserves the intended posterior distribution. Finite particle counts affect mixing without simply replacing the posterior target with an ordinary particle approximation.

## Key Ideas

- Updating a full trajectory can move through strongly dependent latent states more effectively than changing one state at a time.
- Conditioning on the previous trajectory is essential to the particle Gibbs construction. An unconstrained particle-filter draw is not an interchangeable update.
- In NetCP, one series' entire run-length path is updated conditional on the remaining series and network parameters. Backward sampling follows conditional filtering, and separate Gibbs or Metropolis updates handle static parameters.
- The discrete change-point filter explores possible run-length successors deterministically and uses conditional stratified optimal resampling to limit particle count without storing redundant copies.
- Integrating out conjugate segment parameters produces a Rao-Blackwellized filter. Nonconjugate extensions require additional inference machinery and can increase computation and Monte Carlo variability.
- NetCP reports $O(NT)$ particle-recursion cost per series with $N$ particles and $T$ observations, versus $O(T^2)$ exact recursions. Small integrated autocorrelation time for one indicator is evidence about that estimate's mixing, not a universal runtime or convergence guarantee.

## Important Papers

- Andrieu, Doucet, and Holenstein (2010), "Particle Markov Chain Monte Carlo Methods": foundational framework cited by NetCP.
- Whiteley, Andrieu, and Doucet (2011), "Bayesian Computational Methods for Inference in Multiple Change-points Models": discrete change-point particle MCMC method adapted by NetCP.
- [[papers/network-modeling-of-asynchronous-change-points-in-multivariate-time-series|Network Modeling of Asynchronous Change-Points in Multivariate Time Series]]: blocked multivariate application with learned lead-lag dependencies.

## Related Concepts

- [[concepts/asynchronous-change-point-detection|Asynchronous Change-Point Detection]]: an application requiring joint inference over dependent segmentations.
