---
title: "Latent Ordinary Differential Equations"
type: concept
aliases:
  - Latent ODEs
tags:
  - neural-odes
  - irregular-time-series
  - latent-variable-models
---

## Overview

A Latent ODE is a continuous-time latent-variable model in which a sampled initial state determines a trajectory through a learned ordinary differential equation. Observations are emitted at requested times, allowing irregular sampling without a fixed temporal grid.

## Key Ideas

- **Separate dynamics from inference:** the generative ODE evolves the state, an observation model maps states to measurements, and a recognition network infers an approximate posterior over the initial state.
- **Represent trajectory uncertainty:** different posterior initial-state samples induce different trajectories. The dynamics themselves remain deterministic conditional on the initial state.
- **Use observation-aware recognition:** an ODE-RNN evolves between measurements and applies recurrent updates at observations, incorporating time gaps into posterior inference.
- **Model informative timing:** a latent-dependent Poisson intensity can assign likelihood to observation times as well as values. This is an optional modeling component, not a guarantee of better prediction.
- **Distinguish observation from intervention:** measurements affect the inferred posterior but do not directly reset the generative trajectory. Systems with external interventions require additional modeling assumptions.

Continuous integration supports interpolation and extrapolation but introduces solver cost and does not guarantee accurate long-horizon predictions.

## Important Papers

- [[papers/latent-odes-for-irregularly-sampled-time-series|Latent ODEs for Irregularly-Sampled Time Series]]: develops ODE-RNN recognition and evaluates optional observation-time likelihoods.
- Chen et al., *Neural Ordinary Differential Equations* (2018): the initial Latent ODE construction, as credited by Rubanova and colleagues.

## Related Concepts

- [[concepts/continuous-time-series-generation|Continuous Time Series Generation]]: the broader task of generating trajectories defined beyond a fixed observation grid.
