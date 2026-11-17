---
title: Pseudo-Marginal Metropolis-Hastings
type: concept
aliases:
  - PMMH
  - Pseudo-Marginal MCMC
definition: "Pseudo-marginal Metropolis-Hastings uses a nonnegative unbiased estimate of an intractable likelihood in an extended-state Markov chain whose parameter marginal preserves the intended posterior."
tags:
  - bayesian-inference
  - monte-carlo
  - particle-mcmc
---

## Overview

Pseudo-marginal Metropolis-Hastings permits posterior inference when the likelihood cannot be evaluated but a nonnegative unbiased estimate is available. The state includes the random likelihood estimate as well as the parameter. With the appropriate acceptance rule and regularity conditions, the parameter marginal has the desired posterior as its invariant distribution.

## Key Ideas

- Retain the current likelihood estimate after rejection. Recomputing both sides of every acceptance ratio generally changes the algorithm and its target.
- Unbiasedness concerns the likelihood estimate, not its logarithm or the parameter estimates derived from a finite chain.
- Likelihood-estimator variance affects mixing and computational efficiency. More particles can reduce noise but increase cost per transition.
- A sequential Monte Carlo likelihood estimate gives a particle implementation. Count-compatible proposals can improve efficiency when latent event paths must obey observed interval totals.
- Posterior means, medians, and quantiles have Bayesian interpretations; treating them as MLE approximations or frequentist confidence intervals requires additional justification.

## Important Papers

- Andrieu and Roberts (2009), “The pseudo-marginal approach for efficient Monte Carlo computations”: foundational formulation cited by the Hawkes study.
- [[papers/parametric-inference-for-the-discretely-observed-multivariate-hawkes-process-using-particle-markov-chain-monte-carlo|Parametric inference for the discretely observed multivariate Hawkes process using particle Markov Chain Monte Carlo]]: uses unbiased particle likelihood estimates for multivariate interval-count observations.

## Related Concepts

- [[concepts/sequential-monte-carlo|Sequential Monte Carlo]]: supplies likelihood estimates by integrating latent trajectories.
- [[concepts/particle-gibbs-sampling|Particle Gibbs Sampling]]: another particle MCMC construction, using conditional filtering to update trajectories rather than a noisy-likelihood acceptance ratio.
