---
title: Simulation-Based Calibration
type: concept
aliases:
  - SBC
tags:
  - bayesian-inference
  - calibration
  - simulation-based-inference
---

## Overview

Simulation-based calibration checks a Bayesian inference procedure by repeatedly generating parameters from its prior, generating data from its model, and comparing the generating parameters with posterior draws. It evaluates inference under the assumed model, rather than whether that model describes real-world observations.

## Key Ideas

1. Draw $\tilde\theta\sim p(\theta)$ and simulate $\tilde y\sim p(y\mid\tilde\theta)$.
2. Obtain $L$ independent draws from the posterior approximation for $\tilde y$.
3. For a continuous scalar parameter, record the number of posterior draws below its generating value. Repeat across independent simulated datasets.
4. Under exact posterior sampling, ranks are discrete-uniform on $\{0,\ldots,L\}$. For vector parameters, coordinate-wise histograms provide marginal diagnostics.

Systematic rank asymmetry can reveal bias; deviations in histogram shape can reveal errors in posterior spread. Sampling dependence and finite Monte Carlo variation must be considered. Passing selected marginal diagnostics does not establish correctness of every aspect of the joint posterior.

Amortized estimators make repeated inference relatively cheap because the trained network is reused across datasets. Observation-specific sequential estimators do not automatically share this benefit. Posterior predictive checks answer a complementary question: whether simulations from the inferred posterior resemble the observed data on selected features.

## Important Papers

- Talts, Betancourt, Simpson, Vehtari, and Gelman, "Validating Bayesian Inference Algorithms with Simulation-Based Calibration": the methodological reference cited by Dyer and colleagues.
- [[papers/black-box-bayesian-inference-for-agent-based-models|Black-box Bayesian inference for agent-based models]]: applies SBC to neural inference for the Franke and Westerhof model, identifying a small downward bias in wealth sensitivity despite broadly compatible rank histograms.

## Related Concepts

- [[concepts/neural-simulation-based-inference|Neural Simulation-Based Inference]]: amortized posterior and ratio learning makes calibration across many datasets practical.
- [[concepts/density-ratio-estimation|Density Ratio Estimation]]: estimated ratios require a posterior sampling step whose error also enters calibration.
