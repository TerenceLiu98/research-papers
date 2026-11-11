---
title: Stream-level Flow Matching
type: concept
aliases:
  - GP-CFM
tags:
  - flow-matching
  - gaussian-processes
---

## Overview

Stream-level flow matching trains a generative vector field on positions and derivatives of latent differentiable paths. Conditioning on a whole stream makes its instantaneous velocity the regression target; averaging over streams passing through a location recovers the marginal velocity.

## Key Ideas

- Endpoint coupling and the distribution of streams conditional on endpoints are separate modeling choices.
- A sufficiently smooth Gaussian process gives a tractable joint distribution of positions and derivatives. Conditioning this distribution on observations enables simulation-free training without drawing entire trajectories.
- Intermediate observations can constrain the same stream, sharing information across time or grouped measurements.
- Stream stochasticity changes training coverage and regularization. Its benefits depend on covariance design; crossing streams can require covariate-conditioned vector fields.
- Simulation-free training does not eliminate ODE integration during generation.

## Important Papers

[[papers/stream-level-flow-matching-with-gaussian-processes|Stream-level Flow Matching with Gaussian Processes]] develops GP-conditioned streams and evaluates image generation, grouped handwriting transformations, and neural time series.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]
- [[concepts/gaussian-process-regression|Gaussian Process Regression]]
- [[concepts/gaussian-process-priors-for-generative-time-series|Gaussian Process Priors for Generative Time Series]]: related use of GP structure as a source prior, distinct from modeling streams along flow time.
