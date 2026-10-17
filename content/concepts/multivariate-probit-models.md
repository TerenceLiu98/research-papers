---
title: "Multivariate Probit Models"
type: concept
aliases:
  - Multivariate Probit
tags:
  - binary-outcomes
  - latent-variable-models
  - statistical-inference
---

## Overview

Multivariate probit models represent multiple correlated binary outcomes as thresholded components of a latent multivariate normal vector. Regression coefficients determine marginal outcome probabilities, while latent correlations capture dependence among components conditional on predictors.

## Key Ideas

- **Identification:** Fixing latent marginal variances to one makes the covariance matrix a correlation matrix. With $K$ outcomes and $P$ predictors per outcome, an unrestricted specification has $P K$ coefficients and $K(K-1)/2$ correlations.
- **Computational burden:** Full likelihood evaluation involves normal probabilities over $K$-dimensional regions. This motivates simulation-based or marginal likelihood methods.
- **Marginal estimation:** Univariate probit fits can estimate component-specific coefficients without fitting the latent correlations. Bivariate margins then identify pairwise dependence under the model.
- **Global validity:** Individually admissible pairwise correlations need not form a positive semidefinite matrix. A pairwise estimator must check this before treating the assembled matrix as a valid joint Gaussian correlation structure.
- **Interpretation:** Correlations describe latent dependence conditional on predictors; they are not simply correlations between the observed binary indicators.

## Important Papers

- [[papers/fast-multivariate-probit-estimation-via-a-two-stage-composite-likelihood|Fast Multivariate Probit Estimation via a Two-Stage Composite Likelihood]]: separates coefficient and correlation estimation, corrects two-stage uncertainty, and evaluates speed and coverage.
- Chib and Greenberg (1998), *Analysis of multivariate probit models*, as discussed by Ting, Wright, and Zhou: earlier multivariate probit estimation framework.

## Related Concepts

- [[concepts/composite-likelihood|Composite Likelihood]]: replaces high-dimensional joint likelihood evaluation with tractable marginal contributions.
