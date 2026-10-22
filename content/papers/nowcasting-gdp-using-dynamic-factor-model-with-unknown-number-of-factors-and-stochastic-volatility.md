---
title: "Nowcasting GDP Using Dynamic Factor Model with Unknown Number of Factors and Stochastic Volatility: A Bayesian Approach"
type: paper
authors:
  - Yixiao Zhang
  - Cindy L. Yu
  - Haitao Li
year: 2021
doi: 10.1016/j.ecosta.2021.08.009
tags:
  - nowcasting
  - dynamic-factor-models
  - bayesian-inference
  - stochastic-volatility
  - mixed-frequency-data
---

## TL;DR

A Bayesian dynamic factor model jointly estimates how many latent factors to retain, their monthly paths, and time-varying volatility while updating quarterly GDP nowcasts from ragged-edge monthly releases. Simulations recover a four-factor design and improve on a random-walk benchmark; in the U.S. application, the posterior factor count is usually one and stochastic volatility gives modest average improvements, but the model still lags abrupt downturns.

## Research Question

Can a single Bayesian framework estimate the unknown factor dimension and stochastic volatility of a dynamic factor model while producing real-time GDP nowcasts from mixed-frequency, asynchronously released data?

## Motivation

Standard GDP nowcasting with [[concepts/mixed-frequency-dynamic-factor-models|Mixed-Frequency Dynamic Factor Models]] often fixes the number of common factors and treats macroeconomic volatility as constant. Factor-count choices based on explained variance can be subjective, while constant variance misses changes in the uncertainty of monthly indicators. Real-time panels also have ragged edges because indicators arrive on different schedules. The paper addresses all three issues within one posterior simulation scheme.

## Contributions

- Represents factor inclusion with binary indicators, making the number of active factors an estimated quantity rather than a fixed tuning choice.
- Lets the covariance of monthly measurement errors vary over time through correlated random-walk log standard deviations and an LKJ prior on their static correlation matrix.
- Handles unbalanced release panels directly in the likelihood and updates parameters, factors, factor indicators, and volatility after each release.
- Uses [[concepts/particle-gibbs-sampling|Particle Gibbs Sampling]] with backward simulation for high-dimensional volatility paths and evaluates both latent-state recovery and real-time nowcasting.

## Method

Monthly indicators are modeled as linear functions of latent AR(1) factors. Quarterly GDP growth depends on its own lag and the factors from each of the quarter's three months. A diagonal indicator matrix selects active factors from a prespecified maximum of $R$ candidates; the first factor is always included, while later inclusion probabilities receive increasingly sparse zero-inflated Beta priors.

The monthly measurement-error covariance combines time-varying marginal standard deviations with a constant correlation matrix. Each log standard deviation follows a random walk, and the correlation matrix has an LKJ prior. The likelihood selects only observed entries at each release date, so missing observations at the panel edge need not be imputed as complete data.

MCMC alternates over parameters, factor paths, inclusion indicators, and volatility paths. Particle Gibbs with backward simulation updates the latent volatility trajectories. Posterior means provide factor and volatility estimates; the posterior mean number of active indicators, rounded to the nearest integer, supplies the factor-count estimate. GDP nowcasts average the quarterly regression over posterior draws, propagating factors forward when the current month's panel is still empty.

## Experiments

Two Monte Carlo studies generate 60 quarters of data with four true factors and three releases per month. The first uses 50 monthly series and constant covariance; the second uses 30 series with stochastic volatility. Each study generates 100 datasets, nowcasts the final 20 quarters using rolling ten-year windows, and compares mean absolute nowcasting error (MANE) with a random walk.

When the candidate cap is $R=6$, estimated factor counts peak at the true value of four in both designs. Setting $R=3$ makes estimates pile up at the cap, which the authors propose as a diagnostic that $R$ is too small. In the stochastic-volatility design, average MANE reductions relative to the random walk are 15.78%, 34.08%, and 55.19% in the first, second, and third months. With the true factor count fixed at four, the corresponding reductions are 16.76%, 37.66%, and 60.11%. Latent factor paths and most simulated volatility paths are also recovered closely in the illustrated in-sample fits.

The empirical study uses 30 U.S. monthly indicators from nine categories and quarterly GDP growth from 1993Q1 through 2016Q4. It recursively nowcasts 2003Q1-2016Q4 under constant-volatility BAY and stochastic-volatility BAY-SV specifications, both with $R=6$, using approximate release groups on the 10th, 20th, and 30th of each month.

Across the empirical nowcasts, the estimated factor count is one about 90% of the time and two about 10% of the time. Relative to the random walk, BAY-SV reduces average MANE by 21.56%, 26.02%, and 25.18% across the three months; relative to a lagged-GDP regression, the reductions are 6.14%, 11.48%, and 10.47%. BAY-SV performs best among the three Bayesian variants in months two and three, while its first-month performance is comparable to constant-volatility BAY and BAY-SV with one fixed factor. Cumulative predictive scores generally favor BAY-SV, but not around the 2007-2008 financial crisis or the sharp slowdowns in 2011 and 2014.

## Limitations

- The candidate-factor cap $R$ remains user-chosen. A posterior distribution concentrated at the cap signals underspecification but requires rerunning the full analysis with a larger value.
- The empirical release calendar is an approximation rather than a historical-vintage dataset with exact release dates and revisions.
- The model assumes each monthly indicator reflects the contemporaneous factor. Mixing leading and lagging indicators can therefore make some new releases add noise rather than improve a nowcast.
- Both empirical specifications lag the onset of the 2008-2009 recession, and the predictive-score comparisons weaken during abrupt crises and disruptions.
- Particle Gibbs adds substantial computation: the stochastic-volatility simulation reduces the panel from 50 to 30 series and uses only five particles.
- The empirical evidence covers one economy, 30 indicators, and data ending in 2016, so it does not establish performance for larger panels or later disruptions.

## Related Concepts

- [[concepts/mixed-frequency-dynamic-factor-models|Mixed-Frequency Dynamic Factor Models]]: compress monthly indicators and bridge them to quarterly GDP while accommodating ragged-edge releases.
- [[concepts/stochastic-volatility|Stochastic Volatility]]: models time variation in the monthly indicators' measurement-error covariance.
- [[concepts/particle-gibbs-sampling|Particle Gibbs Sampling]]: samples the correlated latent volatility trajectories within the MCMC procedure.

## Related Papers

- Giannone, Reichlin, and Small (2008), "Nowcasting: The Real-Time Informational Content of Macroeconomic Data": supplies the core GDP-nowcasting DFM structure and release-by-release updating problem.
- Zhang et al. (2013): supplies the binary factor-selection construction adapted to estimate the number of factors.
- Follett and Yu (2019), "Achieving Parsimony in Bayesian Vector Autoregressions With the Horseshoe Prior": supplies the correlated stochastic-volatility specification and particle-Gibbs implementation adapted here.
- Bai and Ng (2002), "Determining the Number of Factors in Approximate Factor Models": provides a frequentist information-criterion alternative for factor-count estimation.
- [[papers/nowcasting-gdp-with-a-pool-of-factor-models-and-a-fast-estimation-algorithm|Nowcasting GDP with a Pool of Factor Models and a Fast Estimation Algorithm]]: a related mixed-frequency GDP model that trades full MCMC inference for fast estimation and averages across factor specifications.

[[index|Library home]]
