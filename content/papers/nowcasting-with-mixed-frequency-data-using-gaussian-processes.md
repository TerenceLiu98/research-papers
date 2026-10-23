---
title: Nowcasting with Mixed Frequency Data Using Gaussian Processes
type: paper
authors:
  - Niko Hauzenberger
  - Michael Pfarrhofer
  - Massimiliano Marcellino
  - Anna Stelzer
year: 2024
arxiv: 2402.10574
tags:
  - nowcasting
  - mixed-frequency-data
  - gaussian-processes
  - macroeconomic-forecasting
  - bayesian-inference
---

## TL;DR

GP-MIDAS combines structured compression of high-frequency lags with a Gaussian-process conditional mean. In simulations it is competitive across linear and nonlinear designs and strongest in several nonlinear cases. In pseudo-real-time forecasts of U.S. output growth and GDP-deflator inflation, Gaussian processes outperform BART among the nonlinear models and improve most clearly at the longer short-term forecast horizons; structured MIDAS weights and stochastic volatility are generally useful. The same smoothing that makes GP forecasts robust can make nowcasts react too slowly to unprecedented shocks such as the COVID-19 collapse.

## Research Question

Can [[concepts/gaussian-process-regression|Gaussian Process Regression]] model nonlinear relationships in large mixed-frequency information sets while [[concepts/midas-regression|MIDAS Regression]] preserves the timing of high-frequency predictors and controls dimensionality?

## Motivation

Nowcasting quarterly macroeconomic outcomes from monthly indicators poses two linked problems: each series contributes many correlated lags, and the mapping from those predictors to the target may be nonlinear. Unrestricted MIDAS retains every lag but becomes high-dimensional, while conventional restricted MIDAS compresses lags through prespecified basis functions but usually retains a linear conditional mean. The paper asks whether structured lag compression can supply an effective feature space for Bayesian nonparametric prediction.

## Contributions

- Defines GP-MIDAS by applying a Gaussian-process prior to the conditional mean of a MIDAS regression.
- Interprets restricted MIDAS weighting as structured input compression for a Gaussian process and shows how the weighting matrix changes the kernel distance metric.
- Compares unrestricted MIDAS with bridge, exponential Almon, Almon, Legendre, Bernstein, and Fourier lag constructions under GP, BART, and shrinkage-based linear conditional means.
- Combines each mean specification with homoskedastic errors or [[concepts/stochastic-volatility|Stochastic Volatility]] and develops MCMC inference for point, density, and tail prediction.
- Evaluates the framework in controlled simulations and a large pseudo-real-time U.S. nowcasting and forecasting exercise.

## Method

For a low-frequency target $y_t$, the model forms predictors $x_t$ from lags of the target and weighted high-frequency lag vectors. A matrix $W$ maps each predictor's $P_H$ raw lags into $L+1$ features. Unrestricted MIDAS sets $W=I$; restricted variants use bridge, exponential Almon, polynomial, or Fourier bases.

GP-MIDAS replaces the linear conditional mean with

$$
y_t=f(x_t)+\varepsilon_t,\qquad
f\sim\mathcal{GP}(0,\mathcal K_\kappa),
$$

using a squared-exponential kernel with a common inverse length scale. Because $x_t$ contains $W'\tilde z_t$, the kernel compares observations through distances induced by $WW'$. Restricted MIDAS therefore acts as a structured projection of the raw lag space, reducing dimension while embedding assumptions about lag relevance. The authors contrast this model with Bayesian additive regression trees and Bayesian linear regression with a horseshoe prior.

The observation variance is either constant or follows an AR(1) log-volatility process. Posterior simulation samples latent GP function values and hyperparameters, MIDAS-weight parameters where applicable, and volatility states. Predictive draws support median forecasts, continuous ranked probability scores (CRPS), and tail-weighted CRPS measures.

## Experiments

### Synthetic Data

The simulations use quarterly targets and monthly predictors, varying linear versus nonlinear conditional means, fast-decaying, hump-shaped, or equal lag weights, and sparse versus denser predictor relevance. GP variants win five of twelve designs and perform especially well for nonlinear designs. GP-MIDAS with exponential Almon weights is strongest when the data-generating lag profile is fast-decaying or hump-shaped. The nonparametric models remain competitive in linear designs, while excessive MIDAS flexibility can hurt GP performance.

### U.S. Output and Inflation

The empirical exercise predicts annualized quarterly real GDP growth and GDP-deflator inflation using monthly FRED-MD predictors. The sample spans 1963Q1-2023Q2; expanding-window evaluation begins with 1990Q1 after training through 1989Q4. The design respects publication timing but uses final-vintage data, so it is pseudo-real-time rather than a full vintage-data exercise.

Forecast origins cover three within-quarter nowcasts and three one-quarter-ahead forecasts. Models use 12, 23, or 116 monthly series, four quarterly target lags, and twelve monthly lags per predictor. Accuracy is assessed with mean absolute error, CRPS, and left- and right-tail weighted CRPS.

Reported patterns include:

- Monthly within-quarter information improves nearly all selected models relative to an autoregressive benchmark.
- Gaussian processes outperform BART among the nonlinear specifications and beat linear competitors more consistently for forecasts than for nowcasts.
- Exponential Almon weights often provide the best balance between lag flexibility and compression; unrestricted MIDAS is rarely among the best specifications.
- Stochastic volatility generally improves predictive scores, especially at longer horizons.
- Small predictor sets are often sufficient for GP-MIDAS, whereas linear models benefit somewhat more from medium or large information sets.
- GP predictions respond less strongly than linear predictions to incoming extreme monthly observations. This helped around part of the Great Recession but hurt nowcasts of the COVID-19 collapse.

## Limitations

- The empirical exercise respects release dates but uses final-vintage data and therefore omits the effects of data revisions.
- Relative results depend on the chosen lag bases, shared GP length scale, priors, information sets, and direct short-horizon forecast design.
- The GP's smoothing can suppress timely responses to unprecedented shocks when those shocks are already visible in monthly indicators.
- Predictive distributions are largely symmetric in this application; the flexible mean does not generate pronounced asymmetry or multimodality.
- Variable importance is approximated after estimation with Lasso regressions on predictive medians, rather than identified directly from the nonlinear model.
- The study covers two U.S. aggregate outcomes and does not establish the same ranking for other economies, targets, or genuine real-time vintages.

## Related Concepts

- [[concepts/midas-regression|MIDAS Regression]]: compresses predictor-specific high-frequency lag vectors while retaining their timing.
- [[concepts/gaussian-process-regression|Gaussian Process Regression]]: supplies the nonlinear Bayesian conditional mean and predictive uncertainty.
- [[concepts/stochastic-volatility|Stochastic Volatility]]: separates changes in conditional variance from nonlinear changes in the predictive mean.

## Related Papers

- Ghysels, Santa-Clara, and Valkanov (2007), "MIDAS regressions: Further results and new directions": cited foundation for restricted MIDAS lag weighting.
- Foroni, Marcellino, and Schumacher (2015), "Unrestricted mixed data sampling (MIDAS): MIDAS regressions with unrestricted lag polynomials": cited basis for the unrestricted comparison.
- Guhaniyogi and Dunson (2016), "Compressed Gaussian process for manifold regression": cited connection between projection to a lower-dimensional feature space and GP regression.
- Chipman, George, and McCulloch (2010), "BART: Bayesian additive regression trees": supplies the nonlinear tree-based benchmark.
- [[papers/bayesian-neural-networks-for-macroeconomic-analysis|Bayesian neural networks for macroeconomic analysis]]: library comparison combining nonlinear Bayesian mean functions with stochastic volatility for macroeconomic forecasting.
- [[papers/nowcasting-economic-activity-in-european-regions-using-a-mixed-frequency-dynamic-factor-model|Nowcasting economic activity in European regions using a mixed-frequency dynamic factor model]]: library comparison using latent-factor rather than MIDAS compression for mixed-frequency nowcasting.

Source: arXiv:2402.10574v2.

[[index|Library home]]
