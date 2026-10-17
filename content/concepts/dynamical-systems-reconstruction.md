---
title: Dynamical Systems Reconstruction
type: concept
aliases:
  - DSR
tags:
  - dynamical-systems
  - generative-modeling
  - time-series
---

## Overview

Dynamical systems reconstruction infers a generative surrogate from observed time series so that its autonomous evolution reproduces properties of the underlying process. The objective includes attractor geometry and long-term temporal statistics as well as useful short-term predictions. Reconstructing those properties does not necessarily identify a unique set of physical governing equations.

## Key Ideas

- **Separate trajectory accuracy from dynamical fidelity.** Nearby trajectories of a chaotic system diverge exponentially. Large long-horizon pointwise error can therefore coexist with correct dynamics, while low short-horizon error can coexist with eventual collapse to a fixed point or artificial cycle.
- **Measure spatial and temporal structure together.** Occupation-distribution divergence measures where trajectories spend time; spectral distances measure their temporal organization. Lyapunov estimates provide another diagnostic of sensitivity to initial conditions. Each captures a different aspect, and finite trajectories limit their precision.
- **Train for autonomous evolution.** Sparse teacher forcing periodically corrects observed latent coordinates during training, allowing free rollout between corrections while controlling gradient growth. In DynaMix it is switched off at inference, so evaluation measures the model's own generated dynamics.
- **Preserve coupling and observability.** Independently forecasting interacting coordinates can destroy joint state-space structure. Delay embeddings can make partially observed dynamics accessible under suitable assumptions; embedding dimension and sampling resolution remain consequential choices.
- **Specify the transfer regime.** Fitting a surrogate to a target context differs from conditioning a pretrained model on that context with fixed weights. DynaMix demonstrates the latter for held-out systems, with separate architecture/pretraining choices when the number of input coordinates increases.
- **Detect context repetition.** Replaying a finite context can imitate spatial coverage while replacing chaotic evolution with periodic behavior. Power spectra and divergence diagnostics help distinguish such repetition from successful reconstruction.

## Important Papers

- [[papers/true-zero-shot-inference-of-dynamical-systems-preserving-long-term-statistics|True Zero-Shot Inference of Dynamical Systems Preserving Long-Term Statistics]] introduces DynaMix, a context-conditioned mixture of recurrent experts pretrained across synthetic systems. Its experiments distinguish zero-shot dynamical reconstruction from ordinary forecasting and from target-trained surrogates.

## Related Concepts

- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: reusable temporal models whose forecasting accuracy and reconstruction fidelity require separate evaluation.
- [[concepts/latent-space-time-series-forecasting|Latent-Space Time Series Forecasting]]: learning transitions over representations, with dynamical recovery requiring evidence beyond latent prediction loss.
