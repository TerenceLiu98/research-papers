---
title: Measure-Valued CARMA Processes
type: paper
authors:
  - Fred Espen Benth
  - Sven Karbach
  - Asma Khedher
year: null
tags:
  - carma-processes
  - measure-valued-processes
  - levy-processes
  - banach-spaces
  - energy-markets
---

## TL;DR

The paper extends continuous-time autoregressive moving-average models to positive measure-valued processes driven by Levy subordinators. It formulates the dynamics as analytically weak solutions of linear state-space equations on cones in Banach spaces, derives conditions for existence, positivity, moments, covariance, and stationarity, and specializes the construction to finite signed measures. The framework supports spatially aggregated weather, renewable production, flow-forward prices, and related energy-market functionals, but the paper is theoretical and does not estimate the proposed models on data.

## Research Question

How can [[concepts/measure-valued-carma-processes|Measure-Valued CARMA Processes]] be defined so that they are mathematically well posed, remain positive, retain the dependence structure of CARMA models, and support functionals of spatiotemporal fields?

## Motivation

Ordinary and multivariate CARMA models offer continuous-time, mean-reverting dynamics with flexible autocorrelation, but they do not directly represent quantities distributed over space or delivery time. Renewable production, weather exposure, instantaneous forward curves, and power-purchase-agreement values are naturally expressed as weighted integrals over such domains. A positive measure-valued state can represent these distributed quantities while preserving aggregation through integration.

The main technical obstacle is that stochastic integration is not available uniformly across general infinite-dimensional spaces. In particular, the space of finite signed Borel measures with the total variation norm is nonseparable. The paper therefore first establishes cone-valued CARMA dynamics in separable Banach spaces and then treats measure-valued models through absolutely continuous measures, which are isomorphic to an $L^1$ space, or through finite-dimensional Levy noise.

## Contributions

- Defines cone-valued, Levy-driven CARMA processes as outputs of linear state-space models in Banach spaces.
- Establishes existence of analytically weak, stochastically strong solutions using Pettis integration with respect to the Poisson random measure of a Levy subordinator.
- Gives operator conditions under which the state and output remain in a prescribed positive cone.
- Derives Laplace transforms, first and second moments, conditional covariance, autocovariance, and stationary representations.
- Defines positive measure-valued CARMA processes for absolutely continuous finite measures and describes the finite-dimensional-noise alternative for general finite measures.
- Supplies convolution, multiplicative, integral-kernel, and differential operators as admissible spatial building blocks, together with CARMA(1,0) and CARMA(2,1) examples.
- Derives conditional expectation functionals and an Esscher-type change of measure that exponentially tilts the Levy measure while preserving the model class.
- Connects the framework to renewable production, flow forwards, power purchase agreements, and renewable-asset portfolios.

## Method

The starting point is a linear state-space system on a product Banach space,

$$
\mathrm d\mathbf X_t=\mathcal A_p\mathbf X_t\,\mathrm dt+\mathcal E_p\,\mathrm dL_t,
\qquad
Y_t=\mathcal C_q\mathbf X_t,
$$

where $\mathcal A_p$ is a companion block operator encoding the autoregressive polynomial, $\mathcal E_p$ injects the Levy input, and $\mathcal C_q$ encodes the moving-average polynomial. The driver is a Levy subordinator supported on a proper convex cone. Positivity follows when the transition semigroup is quasi-positive and the input and output operators preserve the relevant cones.

The stochastic convolution is constructed through Pettis integrals against the driver's Poisson random measure. Its weak formulation yields the generator and Laplace transform, from which the paper obtains moment formulas. A stationary output exists under a logarithmic moment condition, a spectral condition excluding roots on the imaginary axis, and complete monotonicity of the operator transfer function $\mathbf Q(\lambda)\mathbf P(\lambda)^{-1}$ with respect to the cone order.

For measure-valued states, the paper distinguishes two cases. General finite positive measures can be used with finite-dimensional Levy noise. Measures absolutely continuous with respect to a sigma-finite reference measure are represented by nonnegative $L^1$ densities, restoring separability and allowing the general Banach-space theory to apply. Pairing the resulting output with bounded test functions produces scalar aggregates and expectation functionals relevant to energy contracts.

## Experiments

The paper contains analytical examples rather than statistical or computational experiments. It constructs admissible parameter operators and works out measure-valued CARMA(1,0) and CARMA(2,1) specifications. The application sections show how weighted measure integrals can represent regional renewable generation, delivery-period forward prices, and power-purchase-agreement values.

The reported results are theorems and formulas: existence and cone invariance of the state process; its Laplace transform and martingale characterization; first and second moments; conditional and stationary covariance operators; a stationary moving-average representation; Fourier-Laplace formulas for conditional payoffs; and preservation of the pure-jump Levy structure under an Esscher transform.

## Limitations

- The paper does not fit the proposed processes to renewable-energy, weather, or price data, so empirical adequacy and estimation performance remain untested.
- General finite-measure spaces under the total variation norm are nonseparable. The full theory therefore requires either absolutely continuous measures represented in $L^1$ or finite-dimensional driving noise.
- Positivity and stationarity depend on substantive operator restrictions, including cone preservation, spectral conditions, moment assumptions, and complete monotonicity of the transfer function.
- The framework focuses on pure-jump Levy subordinators and positive cone-valued dynamics; it does not cover arbitrary signed or Gaussian infinite-dimensional noise under the same results.
- The energy-market examples motivate possible uses but do not establish calibration procedures, identifiability, forecasting accuracy, or arbitrage-free pricing for liquidly traded contracts.

## Related Concepts

- [[concepts/measure-valued-carma-processes|Measure-Valued CARMA Processes]]: the paper's central construction, combining CARMA state-space dynamics with positive measure-valued outputs.
- [[concepts/nonstationary-functional-time-series|Nonstationary Functional Time Series]]: an alternative functional-data perspective for temporally evolving spatial or functional observations.
- [[concepts/measure-differential-inclusions|Measure Differential Inclusions]]: another approach to measure-valued dynamics, based on continuity equations and set-valued velocity fields rather than Levy-driven linear state-space models.

## Related Papers

- Benth and Karbach (2023), "Multivariate continuous-time autoregressive moving-average processes on cones": provides the finite-dimensional cone-valued CARMA foundation extended here.
- Benth and Suss (2018), "Continuous-time autoregressive moving-average processes in Hilbert space": develops an earlier infinite-dimensional Hilbert-space formulation.
- Cuchiero, Di Persio, Guida, and Svaluto-Ferro (2022), "Measure-valued processes for energy markets": motivates measure-valued modeling of energy-market forward dynamics.
- Brockwell (2001), "Levy-driven CARMA processes": establishes a foundational real-valued Levy-driven CARMA framework.
- [[papers/dynamics-of-measure-valued-agents-in-the-space-of-probabilities|Dynamics of Measure-Valued Agents in the Space of Probabilities]]: a contrasting library treatment of measure-valued evolution through Wasserstein barycenters and differential inclusions.

Source: supplied manuscript; no stable identifier or publication year appears in the parsed text.

[[index|Library home]]
