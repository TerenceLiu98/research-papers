---
title: Spatial Durbin Model
type: concept
aliases:
  - SDM
  - SD Model
definition: A spatial Durbin model includes spatial lags of both the outcome and explanatory variables, allowing covariate changes to propagate through direct exposure and outcome feedback.
tags:
  - spatial-econometrics
  - spatial-spillovers
---

## Overview

A spatial Durbin model combines dependence on neighboring outcomes with dependence on neighboring covariates. It separates local covariate coefficients from spatial exposure coefficients, while simultaneous outcome dependence propagates changes through the network.

## Key Ideas

For $y=\rho W_0y+\sum_k(\beta_k I+\gamma_kW_k)x_k+\varepsilon$, the effect matrix for covariate $k$ is $M_k=(I-\rho W_0)^{-1}(\beta_k I+\gamma_kW_k)$. Average diagonal entries summarize direct effects, including returning feedback; average off-diagonal row sums summarize indirect effects. Regression coefficients alone are therefore not marginal effects.

Using the same matrix for every lag constrains the spatial profile of spillovers across covariates. Lag-specific distance-decay parameters relax that restriction without estimating every network edge. Their uncertainty must enter effect standard errors. Decay cannot be identified when its associated spatial response coefficient is zero.

Setting all spatial covariate coefficients to zero yields a spatial autoregressive model; setting outcome dependence to zero yields a spatial lag-of-X model. These restrictions change the possible relationships between direct and indirect effects. A fitted spillover still requires substantive exogeneity and identification assumptions for causal interpretation.

## Important Papers

- [[papers/parameterizing-spatial-weight-matrices-in-spatial-econometric-models|Parameterizing Spatial Weight Matrices in Spatial Econometric Models]]: jointly estimates separate decay and response parameters and demonstrates sensitivity of indirect effects to common-weight misspecification.

## Related Concepts

- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: geographic dependence represented through a weights matrix.
- [[concepts/spatial-difference-in-differences|Spatial Difference-in-Differences]]: combines spatial exposure modeling with a policy-evaluation design whose identifying assumptions remain necessary.
