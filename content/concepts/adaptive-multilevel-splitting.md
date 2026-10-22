---
title: Adaptive Multilevel Splitting
type: concept
aliases:
  - AMS
  - Multilevel Splitting
tags:
  - rare-event-simulation
  - monte-carlo-methods
  - particle-methods
  - bayesian-inference
---

## Overview

Adaptive multilevel splitting is a particle method for estimating rare-event probabilities and sampling states conditioned on rare events. It replaces one difficult event with a sequence of adaptively chosen score levels, repeatedly selecting particles that reach the next level and mutating resampled survivors to restore diversity.

## Key Ideas

- A scalar score orders states by progress toward a target event $\{Z:h(Z)\geq\lambda_\star\}$.
- Intermediate levels are commonly chosen as empirical score quantiles, keeping a controlled fraction of particles alive at each stage.
- The rare-event probability is estimated as a product of conditional survival fractions across levels.
- Resampling duplicates successful particles; transition kernels that preserve the level-truncated target are needed to diversify them without changing the intended conditional distribution.
- Accuracy depends on particle count, level choice, mutation quality, and mixing. Correlated descendants and poorly mixing kernels can reduce effective diversity even when the final particles all satisfy the event.

## Important Papers

- Cérou and Guyader (2007), "Adaptive Multilevel Splitting for Rare Event Analysis": develops the adaptive splitting framework used in modern rare-event estimation.
- [[papers/interpretable-causal-discovery-via-causal-effect-constraints|Interpretable Causal Discovery via Causal-Effect Constraints]]: applies splitting to rare causal-effect events in a posterior over DAGs and linear-Gaussian edge weights.

## Related Concepts

- [[concepts/conditional-causal-discovery|Conditional Causal Discovery]]
- Sequential Monte Carlo
- Importance sampling
- Markov chain Monte Carlo
- Rare-event simulation
