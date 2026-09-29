---
title: Bayesian Symbolic Regression
type: concept
tags:
  - symbolic-regression
  - bayesian-inference
  - scientific-discovery
---

## Overview

Bayesian symbolic regression infers a distribution over algebraic expression structures and their numerical parameters given observed inputs and outputs. It represents uncertainty about the formula itself, rather than only uncertainty about coefficients in a fixed model.

## Key Ideas

- **Structured posterior:** A prior over expression trees combines with parameter and noise priors and an observation likelihood. Operator libraries and structural constraints determine which formulas have support.
- **Scientific priors:** Length preferences and physical-unit rules can favor interpretable candidates and reduce search. They can also exclude the generating expression or favor a simpler approximation over the observed domain.
- **Joint inference:** Tree structure, constants, and noise interact. Methods include reversible-jump MCMC, sequential Monte Carlo, and learned samplers; optimizing constants for one candidate is not equivalent to integrating their uncertainty.
- **Posterior prediction:** Predictions average over expression and parameter uncertainty. A few functions that diverge outside the training domain can destabilize the predictive mean even when the best individual expression fits well.
- **Separate evaluation targets:** Formula recovery, best-expression accuracy, posterior-mean accuracy, and predictive likelihood measure different properties. Success on one does not establish posterior calibration.

## Important Papers

- [[papers/bayesian-symbolic-regression-with-entropic-reinforcement-learning|Bayesian Symbolic Regression with Entropic Reinforcement Learning]]: ERRLESS learns a constrained bottom-up sampler over expressions, constants, and noise, with mixed empirical results across predictive metrics.
- Jin et al. (2019), "Bayesian symbolic regression": reversible-jump MCMC precedent cited by ERRLESS.
- Bomarito and Leser (2026), "Bayesian symbolic regression via posterior sampling": sequential Monte Carlo precedent cited by ERRLESS.

## Related Concepts

- [[concepts/maximum-entropy-rl-for-posterior-sampling|Maximum-Entropy RL for Posterior Sampling]]: a policy-learning route to approximate inference over structured formulas.
- [[concepts/amortized-variational-inference|Amortized Variational Inference]]: shares inference computation through learned distributions; the scope of sharing must be specified.
