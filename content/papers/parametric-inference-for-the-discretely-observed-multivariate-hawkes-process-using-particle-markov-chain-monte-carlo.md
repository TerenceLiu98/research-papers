---
title: Parametric inference for the discretely observed multivariate Hawkes process using particle Markov Chain Monte Carlo
type: paper
authors:
  - Jason Lambe
  - Feng Chen
  - Tom Stindl
  - Tsz-Kit Jefrey Kwan
year: 2026
doi: 10.1007/s11222-026-10997-4
tags:
  - hawkes-processes
  - aggregated-data
  - particle-mcmc
---

## TL;DR

An unbiased sequential Monte Carlo likelihood estimator enables pseudo-marginal inference for multivariate Hawkes processes observed as interval counts. Count-compatible proposals make the method practical without discretizing the underlying process. Simulations show better accuracy than MCEM and coarse-grained estimation at larger aggregation widths, and accuracy comparable to Bayesian latent-event MCMC with lower reported runtime.

## Research Question

How can continuous-time self-excitation and cross-excitation parameters be estimated, with uncertainty, when only counts by event type and observation interval are available?

## Motivation

Exact-event likelihoods cannot be evaluated from aggregated counts. Reconstructing timestamps deterministically or approximating the process by a count model can bias excitation estimates. Unequal observation intervals and changing background rates also limit some existing approximations.

## Contributions

- A latent-event state-space representation and unbiased particle estimate of the count-data likelihood.
- Ordered-uniform event-time proposals and random type assignments constrained to match every observed count, combined with adaptive resampling.
- Pseudo-marginal parameter inference and forecasts that integrate uncertainty in parameters and latent histories.
- Simulation comparisons and an application to daily terrorist-attack counts in Afghanistan and Pakistan.

## Method

The intensity for event type m combines a possibly time-varying background rate with contributions from previous events of every type. Branching-matrix entries quantify expected direct offspring counts; the model assumes spectral radius below one.

Within each observation interval, particles propose ordered uniform timestamps and randomly assign types subject to the observed totals. Importance weights correct these proposals using the continuous-time event likelihood. Thus uniform proposals do not assume that the conditional event-time distribution is uniform. Products of weighted incremental likelihood estimates yield a nonnegative unbiased likelihood estimate. Resampling occurs when effective sample size falls below a threshold (§2.2).

[[concepts/pseudo-marginal-metropolis-hastings|Pseudo-Marginal Metropolis-Hastings]] replaces the likelihood in the acceptance ratio with this estimate. Crucially, a rejected proposal leaves both the current parameter and its stored likelihood estimate unchanged. The parameter marginal targets the intended posterior. With a uniform prior, the authors use chain means or medians to approximate the MLE and sample quantiles for uncertainty; this interpretation relies on asymptotic concentration and normality rather than finite-sample unbiasedness of parameter estimates (§2.3).

Exponential kernels permit recursive intensity updates with linear cost in cumulative event count for fixed model size and particle count. General kernels require quadratic work. Unequal bins and integrable time-varying backgrounds fit the same framework. Forecasting samples parameters, reconstructs latent history with SMC, then simulates future events and aggregates them.

## Experiments

- **Likelihood checks:** Exponential- and gamma-kernel examples compare particle likelihood estimates against direct simulation using one million paths (§3.1).
- **Parameter recovery:** 500 bivariate paths, horizons 400 and 800, widths 0.1, 0.5, and 1.0, plus alternating 0.25/0.75 intervals. Bias is generally small, but coverage is imperfect: at horizon 400 and width 1.0, coverage for one kernel-scale parameter is 0.832 for nominal 95% intervals (Table 1).
- **Comparators:** MCEM and coarse-grained estimators deteriorate at width 1.0; Bayesian MCMC has broadly comparable MSE to PMMH. At width 0.1, reported mean runtimes are 15 minutes for PMMH, 25 for MCEM, 45 for coarse-graining, and 4.5 hours for Bayesian MCMC. These are implementation comparisons: the first three use 10 CPU cores, Bayesian MCMC uses one, and iteration budgets differ (§3.3.1).
- **Higher dimension:** A 21-parameter, three-dimensional experiment uses 100 paths to horizon 2,000. Some nonconvergent chains bias kernel-scale estimates despite comparatively good interval coverage (Appendix B).
- **Application:** Daily GTD counts from January 2019 through June 2021 model Kabul–Nangarhar and Khyber Pakhtunkhwa. The restricted model estimates self-excitation in Kabul–Nangarhar at 0.222 (SE 0.034) and cross-excitation from Khyber Pakhtunkhwa at 0.679 (SE 0.199). Forecasts trained through May use 500 simulated June paths; a likelihood-based posterior predictive check reports 0.612 (§4).

## Limitations

The paper leaves a proof of consistency and asymptotic normality for the discretely observed model to future work. Exact posterior targeting does not guarantee finite-chain convergence, unbiased parameter estimates, or nominal frequentist coverage. Heavy aggregation can require many particles and reduces information about excitation. Higher-dimensional chains can mix poorly, especially when near-zero branching ratios leave kernel parameters weakly identified. General kernels are more expensive than exponential kernels. The application holds excitation parameters constant and identifies temporal associations, not the political mechanisms causing violence.

## Related Concepts

- [[concepts/sequential-monte-carlo|Sequential Monte Carlo]]: integrates latent event histories and estimates the likelihood.
- [[concepts/pseudo-marginal-metropolis-hastings|Pseudo-Marginal Metropolis-Hastings]]: preserves the posterior target using an unbiased likelihood estimate.
- [[concepts/coarse-grained-hawkes-processes|Coarse-Grained Hawkes Processes]]: an alternative approximation of aggregated dynamics, used as a comparator.
- [[concepts/event-time-uncertainty-in-point-processes|Event-Time Uncertainty in Point Processes]]: related observation uncertainty; here bins may contain multiple events.

## Related Papers

- Chen, Kwan, and Stindl (2025), “Estimating the Hawkes process from a discretely observed sample path”: univariate predecessor extended here.
- Zhou and Papadogeorgou, “Bayesian inference for aggregated Hawkes processes”: latent-event Bayesian comparator; cited as 2025 in the body and 2026 in the supplied bibliography.
- [[papers/spatio-temporal-coarse-grained-hawkes-processes|Spatio-temporal coarse-grained Hawkes processes]]: related aggregation-aware modelling through effective kernels rather than particle integration of event histories.

Source: supplied parsed manuscript, DOI [10.1007/s11222-026-10997-4](https://doi.org/10.1007/s11222-026-10997-4).
