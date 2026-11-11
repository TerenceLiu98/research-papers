---
title: Observation Self-Guidance
type: concept
tags:
  - diffusion-models
  - time-series
  - conditional-generation
---

## Overview

Observation self-guidance conditions an unconditionally trained diffusion model at inference by comparing observed values with the clean sample estimated by its own denoiser. It requires neither an auxiliary classifier nor conditional retraining.

## Key Ideas

- Bayes' rule motivates adding an observation-likelihood gradient to the unconditional score. The observation likelihood is approximated using a one-step clean-sample estimate.
- Gaussian likelihood yields squared-error guidance; asymmetric Laplace likelihood yields negative pinball-loss guidance. Differentiation passes through the denoiser.
- An observation mask specifies the conditioning coordinates, allowing different missing-history patterns without retraining the unconditional model.
- Guidance strength controls a soft constraint: generated values need not exactly reproduce observations, and approximate guidance is not a guarantee of exact conditional sampling.
- In TSDiff, guidance acts during reverse diffusion. Forecast refinement instead starts from a base forecast and updates it directly in data space.

## Important Papers

- [[papers/predict-refine-synthesize-self-guiding-diffusion-models-for-probabilistic-time-series-forecasting|Predict, Refine, Synthesize]] introduces observation self-guidance for TSDiff and evaluates mean-square and quantile variants.

## Related Concepts

- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time Series Forecasting]]
