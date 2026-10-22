---
title: Stochastic Volatility
type: concept
aliases:
  - SV
tags:
  - time-series
  - uncertainty-quantification
  - macroeconomic-forecasting
---

## Overview

Stochastic volatility models time-varying conditional variance through a latent random process. It separates changes in the expected outcome from changes in shock magnitude, allowing predictive uncertainty to widen during volatile periods.

## Key Ideas

A common specification has conditionally Gaussian errors and autoregressive log variance:

$$
\varepsilon_t\mid\nu_t\sim\mathcal N(0,e^{\nu_t}),
\qquad
\nu_t=\mu+\rho(\nu_{t-1}-\mu)+\eta_t,
\qquad \eta_t\sim\mathcal N(0,\xi^2).
$$

- A separate variance process reduces pressure on a flexible conditional mean to explain every extreme observation through nonlinear mean relationships.
- Integrating over latent volatility and parameter uncertainty produces a mixture predictive distribution even when conditional errors are Gaussian.
- Density scores assess the probability assigned to realized outcomes. Better variance forecasts can improve those scores without improving the predictive mean or median.
- The log-variance transition remains a modeling assumption. It does not guarantee that unprecedented shocks receive appropriate predictive probability.
- Comparisons of nonlinear mean models should account for whether their competitors also include changing variance.

## Important Papers

- [[papers/nowcasting-gdp-with-a-pool-of-factor-models-and-a-fast-estimation-algorithm|Nowcasting GDP with a Pool of Factor Models and a Fast Estimation Algorithm]]: approximates changing variances with exponentially weighted updates; volatility adaptation provides the clearest reported GDP-nowcast gains during COVID-19.
- [[papers/bayesian-neural-networks-for-macroeconomic-analysis|Bayesian neural networks for macroeconomic analysis]]: combines BNN mean functions with AR(1) log volatility; removing volatility dynamics worsens most reported density-forecast results (Sections 2.4 and 4.2.3).
- Stock and Watson (2007), "Why has US inflation become harder to forecast?": cited source for the unobserved-components stochastic-volatility benchmark in that application.

## Related Concepts

- [[concepts/sampling-based-inference-for-bayesian-neural-networks|Sampling-Based Inference for Bayesian Neural Networks]]: jointly handles uncertain mean parameters and latent volatility in the cited application.
- [[concepts/bayesian-activation-function-averaging|Bayesian Activation-Function Averaging]]: models uncertainty in mean-function shape, complementing a separate variance process.
- [[concepts/mixed-frequency-dynamic-factor-models|Mixed-Frequency Dynamic Factor Models]]: can incorporate changing measurement and factor-innovation variances while handling asynchronous observations.
