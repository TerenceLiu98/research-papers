---
title: Monte Carlo Dropout
type: concept
aliases:
  - MC Dropout
tags:
  - uncertainty-quantification
  - neural-networks
  - bayesian-approximation
---

## Overview

Monte Carlo Dropout keeps dropout active at inference and repeats prediction with stochastic masks. The resulting predictions approximate sampling across models, providing a computationally accessible representation of some model uncertainty. Their mean supplies a point estimate, while their variation describes sensitivity to the sampled network configurations.

## Key Ideas

- **Stochastic inference:** Repeated forward passes through a trained network generate different predictions without training a separate model for every draw.
- **Approximate Bayesian interpretation:** The approach is motivated by dropout as a Bayesian approximation, cited in the source paper to Gal and Ghahramani (2016). Samples should not be treated as exact draws from a fully specified posterior.
- **Separate uncertainty sources:** Variation across dropout predictions does not automatically represent all observation noise, distribution shifts, or recursive forecast error.
- **Evaluate the distribution:** Point-estimate accuracy alone does not establish interval coverage, tail reliability, or probability calibration.
- **Forecast trajectories:** HydraNet uses active dropout in 36-month recursive forecasts and averages 128 samples per forecasted value. Its frozen long-term memory and recursive feedback remain consequential design choices alongside stochastic sampling.

## Important Papers

- Gal and Ghahramani (2016), "Dropout as a Bayesian Approximation: Representing Model Uncertainty in Deep Learning," *International Conference on Machine Learning*, 1050-1059: methodological reference cited by HydraNet.
- [[papers/next-generation-conflict-forecasting-unleashing-predictive-patterns-through-spatiotemporal-learning|Next-Generation Conflict Forecasting: Unleashing Predictive Patterns through Spatiotemporal Learning]]: applies dropout sampling to joint occurrence and magnitude forecasts of political violence; reports point-based evaluation rather than predictive-distribution calibration.

## Related Concepts

- [[concepts/spatiotemporal-analog-forecasting|Spatiotemporal Analog Forecasting]]: obtains alternative future scenarios from historical continuations; the scenario frequencies likewise require validation before interpreting them as calibrated probabilities.
