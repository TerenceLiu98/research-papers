---
title: Parameter Conditional Sequential Monte Carlo
type: concept
aliases:
  - p-CSMC
  - p-CSMC-AS
  - Partially Collapsed p-CSMC-AS
tags:
  - conditional-sequential-monte-carlo
  - particle-learning
  - particle-mcmc
  - state-space-models
---

## Overview

Parameter Conditional Sequential Monte Carlo extends a conditional particle filter so that unknown static parameters are learned within the particle update rather than held fixed across the latent-trajectory sweep. A static parameter is represented by auxiliary time-indexed values, while the terminal value retains the intended joint posterior over the original parameter and latent trajectory. The construction targets settings where ordinary [[concepts/particle-gibbs-sampling|Particle Gibbs Sampling]] mixes poorly because parameters and latent states are strongly dependent.

## Key Ideas

- An extended target replaces a static parameter with auxiliary values $\theta_{1:T}$ while defining $\theta_T$ as the parameter of inferential interest. Marginalizing the auxiliary values recovers the original posterior.
- Particle-learning proposals sample a parameter from its posterior given a particle's latent history and then propagate the next latent state conditional on that draw.
- Sufficient statistics can make these sequential parameter conditionals inexpensive to update and can simplify ancestor-weight calculations.
- Ancestor sampling reconnects a retained reference suffix to alternative particle prefixes, reducing path degeneracy while preserving the extended target.
- A partially collapsed form marginalizes intermediate parameter values and samples only the terminal parameter. This reduces cross-iteration coupling while retaining a conditional Markov structure useful for ancestor sampling.
- Compared with full parameter marginalization, partial collapse can avoid repeatedly evaluating an entire future suffix for every particle and time point. The precise cost reduction is model-dependent; in the branching-process construction it is reported as $O(NT)$ rather than $O(NT^2)$ evaluations.
- Better outer-MCMC mixing does not eliminate particle degeneracy. Weak observations and poorly informed early proposals can still produce low diversity at the beginning of latent trajectories.

## Important Papers

- [[papers/parameter-estimation-in-conditional-sequential-monte-carlo-algorithms-through-particle-learning|Parameter estimation in Conditional Sequential Monte Carlo algorithms through Particle Learning]]: introduces p-CSMC-AS and its partially collapsed variant.
- Andrieu, Doucet, and Holenstein (2010), "Particle Markov Chain Monte Carlo Methods": foundational conditional SMC and Particle Gibbs framework.
- Lindsten, Jordan, and Schon (2014), "Particle Gibbs with Ancestor Sampling": ancestor-sampling method used to rejuvenate retained trajectories.
- Storvik (2002), "Particle Filters for State-Space Models with the Presence of Unknown Static Parameters": sufficient-statistic particle learning for static parameters.
- Wigren et al. (2019), "Parameter Elimination in Particle Gibbs Sampling": full marginalization of static parameters in Particle Gibbs.

## Related Concepts

- [[concepts/sequential-monte-carlo|Sequential Monte Carlo]]: weighted-particle inference underlying conditional particle filters.
- [[concepts/particle-gibbs-sampling|Particle Gibbs Sampling]]: alternates conditional SMC trajectory updates with parameter updates.
- Particle learning: sequential Bayesian parameter learning through particle-specific sufficient statistics.
- Ancestor sampling: backward-looking resampling of the retained trajectory's ancestry during a conditional SMC sweep.
- Rao-Blackwellization: analytical marginalization used to reduce Monte Carlo variance and alter dependence structure.
