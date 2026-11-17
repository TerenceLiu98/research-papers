---
title: GARCH Models
type: concept
aliases:
  - Generalized Autoregressive Conditional Heteroskedasticity
  - Generalized Autoregressive Conditional Heteroscedasticity
definition: "GARCH models update conditional error scale using past squared errors and past conditional scale, capturing persistent changes in volatility."
tags:
  - time-series
  - density-forecasting
---

## Overview

GARCH models describe volatility clustering through an observation-driven recursion. Given parameters, initial conditions, and past observations, current conditional scale is determined by the recursion. This differs from a latent volatility process with its own random innovations.

## Key Ideas

- GARCH(1,1) combines an intercept, the previous squared error, and the previous conditional scale squared. With unit-variance innovations, this is directly a conditional-variance recursion.
- Time-varying scale can generate heavy unconditional tails even with Gaussian conditional innovations. Heavy unconditional tails therefore do not by themselves establish a need for Student-t innovations.
- Innovation shape and scale dynamics are separate modeling choices. Compare them jointly to distinguish their predictive contributions.
- Better uncertainty estimates need not improve conditional-mean predictions. Evaluate point accuracy and density calibration separately.
- A zero lagged-scale coefficient reduces GARCH(1,1) to ARCH(1); persistence and boundary estimates matter when interpreting fitted dynamics.

## Important Papers

- [[papers/performance-analysis-of-nowcasting-of-gdp-growth-when-allowing-for-conditional-heteroscedasticity-and-non-gaussianity|Javed, Kiss, and Österholm (2022)]]: compares Gaussian and Student-t AR models with constant or GARCH scale across six countries. Density-calibration gains are clearer than point-prediction gains and vary across countries and diagnostics.
- Bollerslev (1986), “Generalized Autoregressive Conditional Heteroskedasticity”: foundational source cited by that study.

## Related Concepts

- [[concepts/stochastic-volatility|Stochastic Volatility]]: models volatility using a latent random process instead of a deterministic update from observed errors.
- [[concepts/score-driven-models|Score-Driven Models]]: broader observation-driven distributional dynamics based on likelihood scores; the updating rule must be specified rather than assuming equivalence with every GARCH variant.
