---
title: Switching Linear Dynamical Systems
type: concept
aliases:
  - SLDS
tags:
  - dynamical-systems
  - latent-variable-models
---

## Overview

A switching linear dynamical system combines continuous state evolution with a discrete latent regime. Each regime has its own linear or affine dynamics and noise distribution; a Markov transition model describes persistence and switching.

## Key Ideas

- Regime-specific linear models can represent heterogeneous dynamics that a single global linear fit misses.
- Expectation-maximization combines posterior inference over regimes with weighted parameter estimation.
- Dimensionality reduction makes fitting tractable but may discard predictive dynamics; retained variance alone does not guarantee a closed reduced system.
- A regime label is a statistical state. Interpreting it as a reasoning phase or failure mode requires separate behavioral evidence.
- Evaluation should distinguish one-step prediction, long simulated trajectories, and transfer across observation spaces or data distributions.

## Important Papers

- [[papers/a-statistical-physics-of-language-model-reasoning|A Statistical Physics of Language Model Reasoning]] applies low-rank switching dynamics to sentence-boundary language-model states, using four regimes for general reasoning and three for an adversarial misinformation case study.
- Ghahramani and Hinton (2000), “Variational Learning for Switching State-Space Models,” is the switching-model reference cited by that application.

## Related Concepts

- [[concepts/dynamical-systems-reconstruction|Dynamical Systems Reconstruction]]
- [[concepts/dynamical-interpretability|Dynamical Interpretability]]
