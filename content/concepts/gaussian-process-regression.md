---
title: Gaussian Process Regression
type: concept
aliases:
  - GP Regression
tags:
  - gaussian-processes
  - bayesian-inference
  - nonlinear-regression
---

## Overview

Gaussian process regression places a probability distribution over functions rather than fixing a finite-dimensional regression form. A covariance kernel determines how function values co-vary across inputs, allowing nonlinear prediction with posterior uncertainty while encoding assumptions such as smoothness and relevance of input dimensions.

## Key Ideas

- For observations $y_t=f(x_t)+\varepsilon_t$, a prior $f\sim\mathcal{GP}(m,\mathcal K)$ implies that function values at any finite set of inputs have a joint Gaussian distribution.
- Kernel hyperparameters govern amplitude, smoothness, and distance sensitivity. In an automatic-relevance formulation, predictor-specific inverse length scales can indicate how strongly the function changes along each input dimension.
- A shared length scale reduces computation and regularizes high-dimensional applications, but it cannot express different relevance or smoothness for individual predictors.
- Input transformations are part of the model. Projection or basis compression changes the distance metric seen by the kernel and can impose useful structure before nonlinear estimation.
- GP flexibility does not guarantee rapid adaptation outside the observed input regime. Strong smoothing can make predictions robust to isolated extremes but sluggish when a structural shock is already observed in predictors.
- Exact GP computation scales cubically with the number of observations unless algebraic structure or approximations are used; high input dimension creates a separate statistical challenge.

- Extrapolation uncertainty depends on the kernel: posterior function uncertainty can widen where support is sparse, while stationary kernels eventually revert to their prior mean and bounded variance. Polynomial components permit continuing growth but introduce substantive extrapolation assumptions. Observation-predictive intervals additionally include residual noise; conditional-mean intervals do not.

In sparse election polling, a linear-trend kernel plus smooth nonlinear deviations supports extrapolation. Passing the resulting support distribution into an outcome model preserves the distinction between uncertainty about public opinion and uncertainty about final votes; hyperparameters can be selected for election prediction rather than poll fit.

## Important Papers

- Rasmussen and Williams (2006), "Gaussian Processes for Machine Learning": standard reference for GP regression, covariance functions, and predictive inference.
- [[papers/nowcasting-with-mixed-frequency-data-using-gaussian-processes|Nowcasting with Mixed Frequency Data Using Gaussian Processes]]: uses structured MIDAS lag compression to define the inputs and induced kernel geometry for macroeconomic nowcasting.
- Guhaniyogi and Dunson (2016), "Compressed Gaussian process for manifold regression": develops random projection for GP regression in high-dimensional predictor spaces.

- [[papers/polls-context-and-time-a-dynamic-hierarchical-bayesian-forecasting-model-for-us-senate-elections|Polls, Context, and Time]]: combines analytic GP support projections with a historical Dirichlet election model, calibrated separately by forecast horizon.

## Related Concepts

- [[concepts/midas-regression|MIDAS Regression]]: provides structured lag features for mixed-frequency GP prediction.
- [[concepts/gaussian-process-priors-for-generative-time-series|Gaussian Process Priors for Generative Time Series]]: uses GPs as structured source distributions for generative forecasting rather than directly as regression functions.
- [[concepts/stochastic-volatility|Stochastic Volatility]]: models time-varying observation variance alongside a GP conditional mean.
