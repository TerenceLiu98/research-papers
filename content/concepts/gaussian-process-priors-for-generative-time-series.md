---
title: Gaussian Process Priors for Generative Time Series
type: concept
aliases:
  - GP Priors for Generative Time Series
tags:
  - gaussian-processes
  - time-series
  - generative-models
---

## Overview

A Gaussian-process prior supplies temporally correlated starting samples for a generative time-series model. On a finite time grid, the prior is a multivariate Gaussian whose covariance comes from a kernel. In [[concepts/flow-matching|Flow Matching]], the learned vector field transports these structured samples to the data distribution. The GP expresses a starting assumption about time dependence; it need not be the final forecasting model.

## Key Ideas

- **Temporal inductive bias.** Squared-exponential kernels favor smooth paths, Ornstein-Uhlenbeck kernels allow rougher paths, and periodic kernels encode repetition. Appropriate structure can reduce the transport distance from the prior to the data, but effectiveness depends on the dataset and generation task.
- **History-conditioned initialization.** GP regression turns observed history into a mean and covariance for future prior samples. A neural conditional flow can then transform this distribution into richer forecasts. Conditioning the prior and conditioning the vector field are separate modeling choices.
- **Coupling matters.** Unconditional samples can be paired with data through mini-batch [[concepts/optimal-transport|Optimal Transport]]. Alternatively, drawing a prior sample conditional on each target sequence's past constructs a data-dependent coupling. These are distinct training procedures.
- **Covariance reuse.** Fixed kernels and fixed observation layouts permit reuse of covariance factorizations and conditional covariance calculations. Changing layouts or kernels can require recomputation; the small overhead reported for a fixed benchmark setting is not a general scaling guarantee.
- **Numerical and statistical choices.** Time scaling controls the meaning of kernel length scales and periods. Adding white-noise covariance improves conditioning. Kernel selection should be evaluated against the actual task: sample distances, downstream predictive usefulness, and forecast scores can favor different priors.
- **Approximate posterior initialization.** For an unconditionally trained flow, conditioning the latent prior through an approximate likelihood of the generated observations is different from directly applying GP regression to observed values. TSFlow uses CPS for the former and analytic GP conditioning for its separately trained conditional model.

## Important Papers

- [[papers/flow-matching-with-gaussian-process-priors-for-probabilistic-time-series-forecasting|Flow Matching with Gaussian Process Priors for Probabilistic Time Series Forecasting]]: develops TSFlow with GP source distributions, conditional GP-regression priors, and inference-time conditional prior sampling. Its experiments show useful but task-dependent gains.
- Rasmussen and Williams, "Gaussian processes for machine learning": the GP-regression reference cited by TSFlow for analytic conditional means and covariances.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: learns the transformation from a structured prior to data.
- [[concepts/optimal-transport|Optimal Transport]]: supplies a coupling between source and target samples.
- [[concepts/diffusion-models|Diffusion Models]]: related generative models that can also incorporate temporally structured stochastic processes, with different training and sampling constructions.
