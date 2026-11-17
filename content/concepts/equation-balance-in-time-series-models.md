---
title: Equation Balance in Time Series Models
type: concept
aliases:
  - Time Series Equation Balance
  - I(0) Balance
definition: "Equation balance requires a time-series regressand and its regressors collectively to have the same integration order; I(0) balance additionally requires a balanced reparameterization with a stationary regressand."
tags:
  - time-series
  - specification-testing
---

## Overview

Equation balance checks whether the persistence implied by a dynamic model is internally consistent. A stationary outcome cannot be explained by an uncancelled integrated component, and stationary regressors alone cannot account for an integrated outcome under stationary errors. This is a necessary specification condition, not proof of causality or overall model adequacy.

## Key Ideas

An I(d) process requires d differences to become covariance stationary. Regressors must be evaluated collectively: cointegration can make a linear combination stationary even when its components are I(1). An additional uncancelled I(1) component prevents that combination from making the whole right-hand side I(0).

**I(0) balance** strengthens ordinary balance by requiring an equivalent balanced representation with an I(0) regressand. Regressing one I(1) level on another can satisfy ordinary balance while lacking cointegration and producing nonstationary errors and spurious conventional inference. Simply differencing into a different substantive model is not evidence that the original model has an equivalent stationary representation.

In an error correction model for I(1) series, a stationary cointegrating level combination supplies I(0) balance. Alternatively, a justified zero adjustment coefficient removes the long-run component. Required restrictions must precede estimation and retain a defensible substantive interpretation.

Use theoretical integration expectations before collecting data, then reconsider them against empirical evidence. Weak integration tests and ambiguous bounds tests limit certainty. Balance alone does not guarantee standard inference; other estimator and specification assumptions still matter.

## Important Papers

- [[papers/balance-as-a-pre-estimation-test-for-time-series-analysis|Pickup and Kellstedt (2023)]]: distinguishes ordinary and I(0) balance and develops pre-estimation checks for theoretical and empirical models.

## Related Concepts

- [[concepts/common-factor-restrictions-in-dynamic-regression|Common Factor Restrictions in Dynamic Regression]]: addresses a different consistency question—when lag-polynomial restrictions permit interpreting observed lags through a simpler model with serially correlated disturbances.
