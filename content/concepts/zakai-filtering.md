---
title: Zakai Filtering
type: concept
aliases:
  - Zakai Equation
tags:
  - nonlinear-filtering
  - latent-state-inference
  - stochastic-processes
---

## Overview

Zakai filtering represents inference about a hidden stochastic state through an unnormalized conditional distribution. Normalizing that distribution recovers the posterior given the observation history. Its evolution separates latent dynamics from observation-dependent likelihood updates, making it useful for numerical operator splitting.

## Key Ideas

- The filtered state is a distribution, $\pi_t(d\theta)=P(\Theta_t\in d\theta\mid\mathcal F_t^X)$, rather than only a point estimate. Posterior moments can supply compact features for downstream prediction.
- An equivalent reference measure and likelihood weighting yield an unnormalized filter $q_t$ with $\pi_t(\varphi)=q_t(\varphi)/q_t(1)$. Existence and uniqueness depend on assumptions about the dynamics and observation likelihood.
- For [[concepts/jump-diffusion-models|Jump-Diffusion Models]], belief updates must accommodate both continuous observations and discontinuous events. Jump likelihoods can shift posterior mass sharply after large observed increments.
- Splitting methods alternate prior propagation and observation updates. Positivity, mass control, grid approximation, and jump truncation affect whether a numerical implementation approximates the intended filter.
- Deep ZakaiJ uses a symmetric prior/diffusion/jump splitting architecture, but reports first-order global accuracy for an idealized operator. The symmetric sequence alone does not establish second-order accuracy for the complete learned implementation.
- Filtering incorporates observations as they arrive. Open-loop forecasting propagates the latent prior without applying likelihood updates from unavailable future observations.

## Important Papers

- [[papers/deep-zakaij-structured-filtering-for-jump-diffusion-time-series-forecasting|Deep ZakaiJ: Structured Filtering for Jump-Diffusion Time Series Forecasting]]: trains a split latent filter jointly with a structured predictive decoder.
- Zakai (1969), "On the optimal filtering of diffusion processes": foundational reference [45] in Deep ZakaiJ.
- Bensoussan, Glowinski, and Rascanu (1990), "Approximation of the Zakai equation by the splitting up method": reference [46] in Deep ZakaiJ.
- Ceci and Colaneri (2014), "Nonlinear filtering for jump diffusion observations: Zakai equation, existence and uniqueness": reference [55] in Deep ZakaiJ.

## Related Concepts

- [[concepts/jump-diffusion-models|Jump-Diffusion Models]]
