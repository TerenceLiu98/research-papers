---
title: Probabilistic Time Series Forecasting
type: concept
aliases:
  - Distributional Time Series Forecasting
tags:
  - time-series
  - probabilistic-forecasting
  - uncertainty-quantification
---

## Overview

Probabilistic time-series forecasting predicts a distribution over future observations conditional on historical context. Unlike point forecasting, it represents uncertainty through samples, quantiles, intervals, or explicit distribution parameters. A useful forecast must therefore be judged both by the quality of its central prediction and by whether its predictive distribution is calibrated and appropriately sharp.

## Key Ideas

- **Conditional distributions.** The target is $p(Y\mid X)$ for future sequence $Y$ and observed history $X$, not only a conditional mean. Multivariate forecasting may additionally model dependence across variables and forecast steps.
- **Proper scoring rules.** Metrics such as the continuous ranked probability score reward predictive distributions that place mass near the observation without becoming unjustifiably diffuse. Point-error metrics remain useful but do not measure distribution quality by themselves.
- **Forecast horizon matters.** Longer horizons amplify state uncertainty, model misspecification, and autoregressive error. Methods can instead generate a complete horizon jointly, but joint generation does not by itself guarantee temporal coherence or calibration.
- **Distribution parameterization is consequential.** Gaussian output heads, quantile models, state-space models, variational autoencoders, normalizing flows, diffusion models, and flow-matching models impose different assumptions and computational costs. Equipping a point forecaster with a Gaussian head changes the evaluated model and should be stated explicitly.
- **Calibration and sharpness are distinct.** Wide intervals can achieve high empirical coverage without being informative. Evaluation should pair coverage with interval width or use proper distributional scores, and should report behavior under changing horizons and distribution shift.

## Important Papers

- Rasul et al. (2021), "Autoregressive Denoising Diffusion Models for Multivariate Probabilistic Time Series Forecasting": introduces TimeGrad for autoregressive diffusion forecasting.
- Rasul et al. (2021), "Multivariate Probabilistic Time Series Forecasting via Conditioned Normalizing Flows": models flexible multivariate predictive distributions with conditioned flows.
- [[papers/k2vae-a-koopman-kalman-enhanced-variational-autoencoder-for-probabilistic-time-series-forecasting|K2VAE: A Koopman-Kalman Enhanced Variational AutoEncoder for Probabilistic Time Series Forecasting]]: combines learned Koopman dynamics, Kalman-style uncertainty refinement, and variational generation.
- [[papers/flow-matching-with-gaussian-process-priors-for-probabilistic-time-series-forecasting|Flow Matching with Gaussian Process Priors for Probabilistic Time Series Forecasting]]: uses temporally structured source distributions in a flow-matching model.

## Related Concepts

- [[concepts/latent-space-time-series-forecasting|Latent-Space Time Series Forecasting]]: predicts learned representations that are decoded into future observations.
- [[concepts/gaussian-process-priors-for-generative-time-series|Gaussian Process Priors for Generative Time Series]]: encodes temporal covariance in a generative model's source distribution.
- [[concepts/diffusion-models|Diffusion Models]]: iterative generative models used for probabilistic forecasting and imputation.
- [[concepts/flow-matching|Flow Matching]]: learns continuous transports between source and data distributions.
