---
title: Measure-Valued CARMA Processes
type: concept
aliases:
  - Measure-Valued Continuous-Time Autoregressive Moving-Average Processes
  - Measure-Valued CARMA
tags:
  - carma-processes
  - measure-valued-processes
  - levy-processes
  - stochastic-processes
  - functional-time-series
---

## Overview

A measure-valued continuous-time autoregressive moving-average process is a CARMA process whose output at each time is a finite measure over a spatial, temporal, or other index domain. Positive versions combine the flexible short-memory and mean-reverting structure of CARMA models with nonnegative spatial aggregation: pairing the random measure with a test or weighting function produces an observable scalar quantity.

## Key Ideas

- A higher-order CARMA equation can be represented as a first-order linear state-space model on a product Banach space. Companion transition operators encode the autoregressive polynomial, while an output operator encodes the moving-average polynomial.
- A Levy subordinator supplies nondecreasing pure-jump noise. If the transition semigroup is quasi-positive and the input and output operators preserve the relevant cones, the state and output remain positive.
- The space of finite signed measures with the total variation norm is generally nonseparable. One tractable construction restricts states to measures with $L^1$ densities relative to a reference measure; another retains general finite measures but uses finite-dimensional Levy noise.
- Weak evaluation against a bounded test function converts the measure-valued output into a scalar process. This supports regional totals, spatially weighted production, delivery-period averages, and other aggregated functionals without first specifying pointwise field values.
- Stationarity is governed by the operator-valued CARMA transfer function. In the positive-cone formulation, spectral stability and complete monotonicity ensure that the stationary convolution kernel is well defined and cone preserving.
- Laplace transforms yield moments and covariance formulas. Fourier-Laplace representations can evaluate conditional nonlinear functionals, while an Esscher transform changes risk compensation by exponentially tilting the Levy measure without leaving the pure-jump model class.

## Important Papers

- [[papers/measure-valued-carma-processes|Measure-Valued CARMA Processes]] (Benth, Karbach, and Khedher): develops existence, positivity, moment, stationarity, and expectation-functional results for Levy-driven measure-valued CARMA processes.
- Benth and Karbach (2023), "Multivariate continuous-time autoregressive moving-average processes on cones": establishes cone-valued multivariate CARMA models.
- Benth and Suss (2018), "Continuous-time autoregressive moving-average processes in Hilbert space": extends CARMA dynamics to Hilbert spaces.
- Cuchiero, Di Persio, Guida, and Svaluto-Ferro (2022), "Measure-valued processes for energy markets": develops measure-valued affine and polynomial processes for energy-market applications.

## Related Concepts

- [[concepts/nonstationary-functional-time-series|Nonstationary Functional Time Series]]
- [[concepts/measure-differential-inclusions|Measure Differential Inclusions]]
- [[concepts/vector-fields-over-discrete-measure-spaces|Vector Fields over Discrete Measure Spaces]]
