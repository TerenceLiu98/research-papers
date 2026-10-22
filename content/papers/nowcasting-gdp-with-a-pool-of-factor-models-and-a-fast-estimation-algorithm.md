---
title: "Nowcasting GDP with a Pool of Factor Models and a Fast Estimation Algorithm"
type: paper
authors:
  - Sercan Eraslan
  - Maximilian Schröder
year: 2022
doi: 10.1016/j.ijforecast.2022.07.009
tags:
  - nowcasting
  - dynamic-factor-models
  - mixed-frequency-data
  - stochastic-volatility
  - dynamic-model-averaging
---

## TL;DR

A fast, simulation-free algorithm makes it practical to nowcast U.S. GDP over 49,152 mixed-frequency factor-model specifications and combine them with horizon-specific dynamic model averaging. In the real-time exercise, stochastic volatility contributes most of the accuracy gains, particularly when COVID-19 is included; time-varying parameters are less consistently useful, while model averaging improves some horizons and exposes which indicators drive the forecast distribution.

## Research Question

Can a single computationally feasible framework jointly accommodate mixed-frequency releases, parameter instability, changing volatility, and time-varying model relevance when nowcasting GDP from a large factor-model space?

## Motivation

Macroeconomic data arrive at different frequencies and with publication lags, while crises can change both shock variance and predictor usefulness. A fully Bayesian time-varying mixed-frequency factor model can address these features, but repeated MCMC estimation across thousands of models and real-time vintages is too costly for operational nowcasting. The paper therefore combines [[concepts/mixed-frequency-dynamic-factor-models|Mixed-Frequency Dynamic Factor Models]] with an approximate one-pass estimator and performance-based [[concepts/forecast-combination|Forecast Combination]].

## Contributions

- Specifies a time-varying-parameter mixed-frequency dynamic factor model with [[concepts/stochastic-volatility|Stochastic Volatility]] (TVP-MF-DFM-SV) and embeds it in a dynamic model averaging framework.
- Extends the one-step approach of Koop and Korobilis (2014) to mixed-frequency data through dual Kalman filtering, missing-observation updates, principal-component initialization, and variance discounting.
- Assigns horizon-specific model probabilities using past absolute forecast errors, enabling both combined point forecasts and analysis of time-varying indicator importance.
- Uses the cross-section of model forecasts to study forecast disagreement, downside-risk drivers, and recession signals without treating that cross-section as a conventional simulated predictive density.

## Method

The observation equation relates monthly and quarterly variables to latent monthly factors. Quarterly GDP growth is connected to its latent monthly counterpart with the Mariano-Murasawa five-month aggregation weights $(1,2,3,2,1)$. Monthly factor loadings and factor-transition coefficients may follow random walks; quarterly loadings remain static because unrestricted time variation conflicts with the aggregation restriction.

Rather than iterating an MCMC sampler, the algorithm begins each vintage by standardizing the data and estimating preliminary factors with PCA through an EM procedure. Conditional on those factors, separate Kalman filters and smoothers estimate monthly loadings, static quarterly loadings, and factor VAR coefficients. Exponentially weighted moving averages estimate observation and factor-innovation variances, while forgetting-factor recursions determine parameter covariance. A final state-space pass estimates the factors and produces forecasts. The forgetting factors are reselected by grid search at each GDP release using average mean absolute deviation across horizons.

Every model contains GDP and four core monthly activity indicators. All subsets of 14 additional indicators are paired with one, two, or three factors, yielding $3\times2^{14}=49{,}152$ specifications per model class. Dynamic model averaging updates horizon-specific weights from inverse absolute forecast errors, with model-switching forgetting factor $\gamma=0.9$. The weighted average gives the combined point forecast; the cross-section of individual predictions supplies the paper's forecast distributions and indicator-importance summaries.

## Experiments

The real-time U.S. dataset contains quarterly GDP growth and 18 monthly indicators. The initial estimation window is 1975M01-1999M12, and recursive forecasts run from 2000M01 through 2021M09 using historical FRED-MD vintages and ALFRED GDP. The principal evaluation compares four nested classes, MF-DFM, TVP-MF-DFM, MF-DFM-SV, and TVP-MF-DFM-SV, both as full-indicator stand-alone models and as dynamically averaged pools. Horizons span two quarters ahead through the last month of the target quarter.

For 2010Q1-2019Q4, stochastic volatility gives small gains over the constant-parameter MF-DFM, while the stand-alone TVP and TVP-SV variants lose accuracy at every horizon. Dynamic averaging substantially improves both TVP classes and improves the SV class at shorter horizons, though not uniformly. The approximate models are competitive with the paper's fully Bayesian mixed-frequency DFM and VAR benchmarks despite those benchmarks having slightly timelier S&P 500 data.

Including observations through 2021Q3 changes the comparison. MF-DFM-SV and its averaged pool improve on the constant-parameter benchmark by about 12% on average and by roughly 40% in the most favorable case. TVP and TVP-SV variants also improve at selected horizons, but the paper attributes most pandemic-period gains to stochastic volatility. During 2020, the selected MF-DFM-SV pool adjusts its Q2 and Q3 forecasts by about 12 percentage points as releases arrive, although it misses the Q1 contraction and underpredicts the Q3 rebound.

Model weights indicate changing predictor relevance. Housing and stock-market indicators are prominent around the Great Recession, whereas interest rates, CPI, consumer sentiment, new orders, and retail sales become prominent in the lower tail during COVID-19. The share of models forecasting non-positive current-quarter growth also broadly aligns with the three NBER recessions in the evaluation period.

## Limitations

- The one-step approximation largely ignores parameter-estimation uncertainty, especially uncertainty in the forgetting factors; its speed comes at the cost of full Bayesian inference.
- Cross-sectional model-forecast distributions are not simulated predictive distributions. The COVID-period probability integral transforms show underdispersion, so their bands should not be read as fully calibrated outcome probabilities.
- Indicator weights are predictive and conditional on the model-switching factor. Correlated or omitted predictors can receive or induce apparent importance, so the heatmaps do not establish causal drivers.
- Results vary by horizon and regime. TVP variants lose to the constant-parameter model throughout the stable-period stand-alone comparison, and model averaging does not improve every model at every horizon.
- The 19-series application is deliberately small, omits some familiar indicators such as PMI, and assesses one target economy. The COVID extension is also short.

## Related Concepts

- [[concepts/mixed-frequency-dynamic-factor-models|Mixed-Frequency Dynamic Factor Models]]: the state-space structure joining monthly indicators to quarterly GDP.
- [[concepts/stochastic-volatility|Stochastic Volatility]]: the main source of reported accuracy gains during unstable periods.
- [[concepts/forecast-combination|Forecast Combination]]: dynamic, horizon-specific weighting over predictor subsets and factor dimensions.
- [[concepts/targeted-predictors-for-factor-models|Targeted Predictors for Factor Models]]: a related approach that screens indicators before factor estimation rather than averaging an exhaustive subset space.

## Related Papers

- Mariano and Murasawa (2003), "A New Coincident Index of Business Cycles Based on Monthly and Quarterly Series": supplies the mixed-frequency aggregation scheme.
- Koop and Korobilis (2014), "A New Index of Financial Conditions": supplies the fast approximate factor-model estimator extended here.
- Raftery, Kárný, and Ettler (2010), "Online Prediction Under Model Uncertainty via Dynamic Model Averaging": supplies the recursive model-weighting framework.
- Marcellino, Porqueddu, and Venditti (2016), "Short-Term GDP Forecasting with a Mixed-Frequency Dynamic Factor Model with Stochastic Volatility": closely related stochastic-volatility factor model estimated with Bayesian methods.
- [[papers/point-and-risk-estimation-using-an-ensemble-of-models-for-nowcasting-prism-now|PRISM-Now]]: a later ensemble-nowcasting approach that also uses cross-model distributions, but changes the selected quantile rather than recursively weighting each specification.

[[index|Library home]]
