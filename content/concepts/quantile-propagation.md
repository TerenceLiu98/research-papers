---
title: Quantile Propagation
type: concept
aliases:
  - QP
tags:
  - bayesian-inference
  - gaussian-processes
  - optimal-transport
  - uncertainty-quantification
---

## Overview

Quantile propagation (QP) is an approximate inference algorithm for Gaussian-process priors with factorized likelihoods. It follows expectation propagation's cavity-and-site framework but fits each local Gaussian approximation by squared 2-Wasserstein distance. In one dimension this becomes matching quantile functions, replacing EP's moment matching (Zhang, 2022, Chapter 5).

## Key Ideas

For a univariate tilted distribution $P$ with finite second moment, the local projection minimizes

$$
\int_0^1\left[F_P^{-1}(v)-\mu-\sigma\Phi^{-1}(v)\right]^2\,dv,
$$

where $\Phi^{-1}$ is the standard-normal quantile function. Equation 5.1 gives the equivalent updates

$$
\mu^*=\mathbb E_P[X],\qquad
\sigma^*=\int_0^1F_P^{-1}(v)\Phi^{-1}(v)\,dv.
$$

- **Locality:** Remove one Gaussian site to form the cavity, multiply by its exact likelihood factor, project the resulting tilted distribution, then divide by the cavity to update the site. The thesis's locality result permits univariate sites within a coupled Gaussian posterior.
- **Variance comparison:** For the same tilted distribution, QP has the same projected mean as EP and no larger projected variance, with equality for a Gaussian tilted distribution. This is not a theorem comparing the independently converged algorithms or a universal guarantee of better calibration.
- **Computational tradeoff:** Lookup tables precompute the numerical integrals needed for variance updates. They preserve EP-like computational complexity at a memory cost; the reported implementation uses EP updates outside the table range.
- **Hyperparameters and convergence:** The implementation retains EP's approximate marginal-likelihood criterion for GP hyperparameters. This is not a Wasserstein-consistent global objective, and global convergence is not guaranteed.
- **Reported evidence:** Classification errors are nearly unchanged relative to EP, while negative test log likelihoods improve slightly across several datasets. Experiments cover classification and Poisson regression, not continuous-time Poisson or Hawkes process inference.

## Important Papers

- Zhang, Walder, Bonilla, Rizoiu, and Xie (2020), "Quantile propagation for Wasserstein-approximate Gaussian processes," NeurIPS 33, 21566-21578, as identified in the thesis.
- [[papers/approximate-inference-for-non-parametric-bayesian-hawkes-processes-and-beyond|Approximate Inference for Non-parametric Bayesian Hawkes Processes and Beyond]]: Chapter 5 and Appendix C supply the updates, locality argument, experiments, and numerical limitations.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]: Provides the Wasserstein distance and its univariate quantile representation.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: A prospective application whose integrated likelihood introduces additional difficulties.
