---
title: Bayesian Quadrature
type: concept
aliases:
  - Bayesian Numerical Integration
tags:
  - bayesian-inference
  - probabilistic-numerics
  - uncertainty-quantification
---

## Overview

Bayesian quadrature treats numerical integration as inference. It places a probability distribution over an unknown integrand, updates that distribution using function evaluations, and induces a posterior distribution over the integral rather than returning only a point approximation.

## Key Ideas

- For an integral $J[f]=\int_a^b f(x)\,dx$, observed evaluations constrain a prior over functions and thereby produce a posterior over $J[f]$.
- The posterior mean gives a numerical estimate, while posterior dispersion represents uncertainty caused by limited evaluations.
- The function prior encodes assumptions such as smoothness; Gaussian process priors can recover familiar deterministic quadrature rules under particular choices.
- When an expectation is written as the integral of a quantile function, its observed samples supply function values at unknown quantile levels. The input locations must then be modeled as well as the integrand.
- [[papers/conformal-prediction-as-bayesian-quadrature|Conformal Prediction as Bayesian Quadrature]] avoids choosing an explicit quantile-function prior by using the largest monotone quantile function consistent with bounded observed losses. Distribution-free Dirichlet quantile spacings then induce a conservative distribution over expected loss.

## Important Papers

- Diaconis (1988), "Bayesian Numerical Analysis": presents computation, including integration, as a Bayesian inference problem.
- O'Hagan (1991), "Bayes-Hermite Quadrature": develops quadrature based on probabilistic function models.
- [[papers/conformal-prediction-as-bayesian-quadrature|Conformal Prediction as Bayesian Quadrature]]: applies the perspective to loss quantile functions and recovers standard conformal methods from the posterior mean of a risk upper bound.

## Related Concepts

- [[concepts/conformal-prediction|Conformal Prediction]]
- [[concepts/bayes-assisted-conformal-prediction|Bayes-Assisted Conformal Prediction]]
- [[concepts/bayesian-predictive-coherence|Bayesian Predictive Coherence]]
