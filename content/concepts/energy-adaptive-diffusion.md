---
title: Energy-Adaptive Diffusion
type: concept
tags:
  - diffusion-models
  - wavelets
  - time-series
---

## Overview

Energy-adaptive diffusion scales corruption according to signal strength in different representation components. In a wavelet representation, equal noise variance can overwhelm weak detail bands earlier than strong trends; band-dependent noise can moderate this imbalance.

## Key Ideas

- Estimate relative band strength per instance and feature, rather than assigning fixed noise solely by frequency.
- EADiff centers log coefficient standard deviations across bands and applies an exponential of a bounded, learnably scaled transformation. This is an energy proxy, not a direct estimate of squared signal energy.
- Couple the resulting noise field to denoiser conditioning and loss weighting. Adapting corruption alone does not guarantee equal signal-to-noise ratios or better forecasts.
- Preserve the distinction between training targets and inference inputs: forecasting modulation can be calculated from observed history plus a future guess.
- Representation choice matters. Strong energy compaction may worsen numerical imbalance, so sparsity alone is insufficient for selecting a wavelet basis.

## Important Papers

- [[papers/not-all-frequencies-are-equal-energy-adaptive-diffusion-for-time-series-forecasting|Not All Frequencies Are Equal]]: introduces EADiff and evaluates adaptive wavelet-domain corruption under autoregressive forecasting, with dataset-dependent gains and ablations.

## Related Concepts

- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time Series Forecasting]]
