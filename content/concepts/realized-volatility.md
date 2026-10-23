---
title: Realized Volatility
type: concept
aliases:
  - Realized Variance
  - Integrated Volatility Estimation
tags:
  - financial-econometrics
  - high-frequency-finance
  - volatility-estimation
---

## Overview

Realized volatility, often called realized variance, is the sum of squared intraday log-price returns over an interval. For a continuously observed latent Itô price process, this statistic converges as the sampling mesh shrinks to integrated volatility, the quadratic variation $\int_0^T\sigma_t^2dt$. With observed transaction prices, increasingly fine sampling can instead amplify [[concepts/market-microstructure-noise|Market Microstructure Noise]].

## Key Ideas

- **Quadratic-variation target:** For latent log price $X_t$, realized variance on a grid is $\sum_i(X_{t_{i+1}}-X_{t_i})^2$. Under standard continuous-semimartingale conditions, it converges to integrated variance as observations become dense.
- **Sampling is consequential:** More observations reduce discretization error only when prices are observed without contamination. With fixed observation noise, adjacent high-frequency returns inherit differenced noise whose accumulated squared magnitude grows with the number of observations.
- **Volatility signature:** Plotting realized variance against sampling frequency can reveal the conflict between discretization error at coarse scales and microstructure contamination at fine scales.
- **Latent and observed variation differ:** The quadratic variation of transaction prices includes trading-mechanism effects. Many financial applications instead target variation in the latent efficient price and treat spreads or transaction costs separately.
- **Noise-robust alternatives:** Sparse sampling reduces contamination but discards data. Multiscale estimators, including [[concepts/two-scale-realized-volatility|Two-Scale Realized Volatility]], combine returns across sampling scales to estimate and remove noise effects.

## Important Papers

- Andersen, Bollerslev, Diebold, and Labys (2001), "The Distribution of Exchange Rate Realized Volatility": establishes realized volatility as an empirical measure of latent return variation.
- Barndorff-Nielsen and Shephard (2002), "Econometric Analysis of Realized Volatility and Its Use in Estimating Stochastic Volatility Models": develops econometric theory for realized volatility.
- [[papers/a-tale-of-two-time-scales-determining-integrated-volatility-with-noisy-high-frequency-data|A Tale of Two Time Scales]]: shows why full-grid realized volatility fails under additive noise and constructs a bias-corrected estimator using all observations.

## Related Concepts

- [[concepts/market-microstructure-noise|Market Microstructure Noise]]: explains why realized variance can increase at the finest sampling frequencies.
- [[concepts/two-scale-realized-volatility|Two-Scale Realized Volatility]]: corrects the leading noise bias by combining sparse subgrids and the full grid.
- [[concepts/stochastic-volatility|Stochastic Volatility]]: models time variation in the instantaneous variance whose integral realized volatility seeks to estimate.
