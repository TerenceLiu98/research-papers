---
title: Sequential Monte Carlo
type: concept
aliases:
  - SMC
  - Particle Methods
tags:
  - bayesian-inference
  - monte-carlo
  - sequential-learning
  - importance-sampling
---

## Overview

Sequential Monte Carlo represents a sequence of probability distributions with weighted samples called particles. As the target distribution changes, particles are propagated, reweighted, and, when their weights become too concentrated, resampled and perturbed. SMC supports online Bayesian updating, state-space inference, and bridges toward difficult or multimodal targets while retaining a sample-based representation of uncertainty.

## Key Ideas

- Importance weights correct for the difference between the distribution used to propose particles and the current target distribution.
- Effective sample size summarizes weight concentration. Low ESS signals particle degeneracy and commonly triggers resampling.
- Resampling removes low-weight particles and duplicates high-weight particles; mutation or MCMC rejuvenation steps restore diversity afterward.
- The sequence may reflect observations arriving over time, an annealing path between distributions, or a state space whose dimension increases as new latent variables appear.
- Performance depends on proposal quality and the similarity of adjacent targets. Abrupt target changes can collapse weights and may require adaptive proposals, blocking, or additional intermediate distributions.
- Unlike a single MCMC chain targeting one fixed distribution, particles can be updated independently and are naturally amenable to distributed computation.

## Important Papers

- Gordon, Salmond, and Smith (1993), "Novel Approach to Nonlinear/Non-Gaussian Bayesian State Estimation."
- Liu and Chen (1998), "Sequential Monte Carlo Methods for Dynamic Systems."
- Del Moral, Doucet, and Jasra (2006), "Sequential Monte Carlo Samplers."
- Dai et al. (2022), "An Invitation to Sequential Monte Carlo Samplers."
- [[papers/parameter-estimation-in-conditional-sequential-monte-carlo-algorithms-through-particle-learning|Parameter estimation in Conditional Sequential Monte Carlo algorithms through Particle Learning]]: extends particle learning to conditional SMC for joint state and static-parameter inference.
- [[Sequential Bayesian Registration for Functional Data]]

## Related Concepts

- Bayesian inference
- Importance sampling
- Markov chain Monte Carlo
- Particle filtering
- Online learning
- Effective sample size
- [[concepts/parameter-conditional-sequential-monte-carlo|Parameter Conditional Sequential Monte Carlo]]
