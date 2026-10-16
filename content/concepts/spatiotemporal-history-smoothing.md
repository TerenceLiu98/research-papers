---
title: Spatiotemporal History Smoothing
type: concept
tags:
  - spatiotemporal-modeling
  - nonparametric-smoothing
  - generalized-additive-models
---

## Overview

Spatiotemporal history smoothing estimates how past outcomes at different distances and time lags relate to a current outcome. It pools information across nearby distance-lag combinations using a regularized basis, allowing a broad history to enter a regression without assigning an unrestricted coefficient to every lag. It differs from smoothing the outcome over absolute locations and calendar time: the target is a history-dependent response surface.

## Key Ideas

- **Represent the history jointly.** Sum temporal-spatial tensor-basis vectors weighted by transformed past outcomes over a bounded neighborhood and time window. The resulting features retain joint distance-lag structure.
- **Separate baseline and propagation.** A geographic smooth can describe persistent background intensity while a history term captures conditional dependence on previous outcomes. This statistical decomposition does not itself identify causal transmission.
- **Regularize broad coverage.** Large history windows retain potentially useful information, while a penalty reduces overfitting. Window size and basis shape still encode substantive assumptions; cutoffs are not automatically estimates of a process's true range.
- **Match the response scale.** In a Poisson log-link application, a history coefficient describes a multiplicative change in expected counts per unit change in the transformed lagged outcome, not an additive number of events.
- **Allow contextual interactions.** Multiplying the history basis by destination covariates permits heterogeneous sensitivity. A lower relative response can coexist with a larger absolute change when baseline intensity is higher.
- **Evaluate future periods.** More unrestricted lags can improve training fit while worsening held-out predictions. Compare both information coverage and regularization before attributing gains to a wider neighborhood.

## Important Papers

- [[papers/capturing-the-spatio-temporal-diffusion-effects-of-armed-conflict-a-nonparametric-smoothing-approach|Capturing the spatio-temporal diffusion effects of armed conflict: A nonparametric smoothing approach]]: combines 100 exponential tensor-basis terms with ridge penalization in a Poisson GAM, modeling African conflict histories over 24 months and approximately 550 km. A destination-population interaction improves held-out explained deviance and reveals heterogeneous relative dependence.

## Related Concepts

- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: describes dependence across locations; history smoothing explicitly adds temporal lag and a fitted distance-lag response.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: learns flexible triggering kernels for point processes, whereas the cited history-smoothing application models aggregated cell-month counts.
- [[concepts/spatiotemporal-analog-forecasting|Spatiotemporal Analog Forecasting]]: transfers observed continuations from similar histories rather than estimating a common regression surface over lag and distance.
