---
title: Score-Driven Models
type: concept
aliases:
  - Generalized Autoregressive Score Models
tags:
  - time-series
  - density-forecasting
  - nowcasting
---

## Overview

Score-driven models update time-varying distributional parameters using the gradient of the conditional log likelihood. They are observation-driven: given parameters, initial states, and past observations, the state recursion is deterministic, while future observations remain random. This often permits direct likelihood evaluation without integrating over stochastic latent-state paths.

## Key Ideas

- The score measures how a new observation changes local support for the current distributional parameters. Gain coefficients control how strongly that information changes the next state; some formulations scale the score by an information matrix.
- Dynamics can govern location, dispersion, and asymmetry rather than only a conditional mean. Link functions keep parameters within their valid domains.
- Factor structures can share updates across series while retaining series-specific trends. Common scale and shape factors capture dependencies that location factors can miss.
- A standard predictive recursion does not automatically update a current state when contemporaneous data arrive. Nowcasting can separate a filtering update from the transition to the next period, as in the framework of Buccheri et al. (2021).
- Missing observations can be omitted from the likelihood and score. Early-horizon density prediction still needs to propagate uncertainty about unreleased data, for example through simulation.
- Tractable likelihoods do not guarantee stable filtering or precise parameter estimates. Score scaling, initialization, identification, and dynamic restrictions remain substantive modeling choices.

## Important Papers

- Creal, Koopman, and Lucas (2013), "Generalized autoregressive score models with applications": foundational framework cited by Labonne.
- Buccheri et al. (2021), "Filtering and smoothing with score-driven models": filtering extension used for contemporaneous updates.
- [[papers/asymmetric-uncertainty-nowcasting-using-skewness-in-real-time-data|Asymmetric uncertainty: Nowcasting using skewness in real-time data]]: builds common location, scale, and shape factors for GDP density nowcasting and compares joint mixed-frequency and factor-augmented MIDAS implementations.

## Related Concepts

- [[concepts/midas-regression|MIDAS Regression]]: can use higher-frequency factors as regressors for lower-frequency distributional parameters.
- [[concepts/probability-calibration|Probability Calibration]]: evaluates the reliability of probabilities implied by the fitted conditional distributions.
- [[concepts/temporal-disaggregation|Temporal Disaggregation]]: supplies aggregation constraints when latent components and observations have different frequencies.
