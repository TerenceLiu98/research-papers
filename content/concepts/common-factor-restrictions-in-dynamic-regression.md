---
title: Common Factor Restrictions in Dynamic Regression
type: concept
aliases:
  - Dynamic Regression Common Factor Restrictions
definition: "Parameter restrictions under which lag polynomials share a factor, allowing observed-variable lags to represent serially correlated disturbances in a simpler structural regression."
tags:
  - time-series
  - specification-testing
---

## Overview

Common factor restrictions characterize when a dynamic regression can be reduced to a simpler systematic model with serially correlated errors. They distinguish lag coefficients representing independent systematic effects from coefficients induced by an error process. Here “factor” refers to lag-polynomial factorization, not latent-factor dimensionality reduction.

## Key Ideas

A static regression with AR(1) errors can be expressed as an ADL(1,1), but the reverse interpretation requires $\beta_2=-\alpha\beta_1$, where $\alpha$ is the outcome-lag coefficient and $\beta_1,\beta_2$ are current and lagged predictor coefficients.

For an ADL(2,1) with outcome coefficients $\alpha_1,\alpha_2$ and predictor coefficients $\beta_1,\beta_2$, the restriction studied by Cook and Webb is

$$
g(\theta)=\beta_2^2+\beta_1\beta_2\alpha_1-\alpha_2\beta_1^2=0.
$$

It follows from the coefficient mapping for first-order partial adjustment with AR(1) errors. A nonlinear Wald test assesses this single restriction using an asymptotic $\chi^2_1$ reference distribution. Failure to reject is compatibility with the restriction, not proof that the structural interpretation is correct.

Valid factor cancellation can simplify the long-run multiplier; invalid cancellation changes the quantity being estimated. Restriction testing belongs within a dynamically complete specification, after considering stationarity and equation balance. Small samples can have low power, and more complicated dynamics require broader models.

## Important Papers

- [[papers/lagged-outcomes-lagged-predictors-and-lagged-errors-a-clarification-on-common-factors|Cook and Webb (2021)]]: derives and simulates the ADL(2,1) restriction, clarifying implications for long-run effects.
- Sargan (1964, 1980), as discussed by Cook and Webb: establishes the dynamic-specification testing tradition behind this approach.

## Related Concepts

Dynamic completeness is the prerequisite that the specification adequately capture temporal dependence. Long-run multipliers summarize accumulated predictor effects and must be calculated from the supported dynamic model.
