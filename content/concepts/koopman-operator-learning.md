---
title: Koopman Operator Learning
type: concept
aliases:
  - Learned Koopman Operators
  - Koopman Representation Learning
tags:
  - dynamical-systems
  - representation-learning
  - time-series
---

## Overview

Koopman operator learning seeks observables of a nonlinear dynamical system whose evolution is approximately linear. Rather than linearizing the original state transition locally, it maps states into a measurement space and learns a linear operator there. Practical neural methods use a finite-dimensional approximation, so their success depends on the learned representation, operator estimation, and stability over repeated application.

## Key Ideas

- **Lift, evolve, decode.** An encoder approximates measurement functions, a linear operator advances the encoded state, and a decoder maps predictions back to observation space. This supports [[concepts/latent-space-time-series-forecasting|Latent-Space Time Series Forecasting]], but the learned coordinates need not equal the system's physical state.
- **Finite-dimensional approximation.** Classical Koopman theory acts on an infinite-dimensional function space. Neural implementations select a finite family of observables, making exact linear evolution exceptional rather than guaranteed.
- **Operator estimation.** Dynamic mode decomposition and extended dynamic mode decomposition estimate a linear transition from paired snapshots, often using a pseudoinverse. Learned global operators can complement sample-specific estimates when local matrices are ill-conditioned.
- **Depth as discrete time.** Hidden states from consecutive neural-network layers can be treated as snapshots and fit with one recurrent operator. [[papers/dynamic-mode-decomposition-along-depth-in-vision-transformers|Dynamic Mode Decomposition along Depth in Vision Transformers]] shows that this approximation can be accurate over short ViT spans while still failing to preserve representations after subsequent nonlinear blocks.
- **Long-horizon stability.** Repeated matrix powers can amplify small representation or operator errors. Spectral properties, reconstruction residuals, and forecast degradation across horizons are therefore central diagnostics.
- **Residual correction.** A nominal Koopman trajectory can be paired with control inputs, residual networks, or filtering updates. Such corrections may improve forecasts, but they also mean the overall model is not purely linear in its observed inputs.
- **Stable latent generators.** A continuous-time latent operator can be decomposed into skew-symmetric and dissipative components, separating rotational behavior from contraction while constraining unstable growth. [[papers/prismflow-residual-dynamics-for-flow-matching-in-time-series-generation|PrismFlow]] uses a bank of such operators to produce mode-specific residual velocities; the nonlinear encoder and decoder still determine whether those finite-dimensional modes correspond to meaningful data dynamics.

## Important Papers

- Koopman (1931), "Hamiltonian Systems and Transformation in Hilbert Space": establishes the linear operator view of nonlinear dynamical systems.
- Schmid (2010), "Dynamic Mode Decomposition of Numerical and Experimental Data": develops a data-driven spectral decomposition used in practical operator estimation.
- [[papers/dynamic-mode-decomposition-along-depth-in-vision-transformers|Dynamic Mode Decomposition along Depth in Vision Transformers]]: fits DMD directly to raw DINO hidden states and tests when one operator can recurrently replace a contiguous block span.
- Liu et al. (2023), "Koopa: Learning Non-stationary Time Series Dynamics with Koopman Predictors": applies Koopman predictors to long-term deterministic time-series forecasting.
- [[papers/k2vae-a-koopman-kalman-enhanced-variational-autoencoder-for-probabilistic-time-series-forecasting|K2VAE: A Koopman-Kalman Enhanced Variational AutoEncoder for Probabilistic Time Series Forecasting]]: combines local and global learned operators with Kalman-style residual correction and uncertainty modeling.
- [[papers/prismflow-residual-dynamics-for-flow-matching-in-time-series-generation|PrismFlow: Residual Dynamics for Flow Matching in Time-Series Generation]]: uses dissipative Koopman-inspired operators as hard-routed residual experts within a flow-matching generator.

## Related Concepts

- [[concepts/latent-space-time-series-forecasting|Latent-Space Time Series Forecasting]]: predicts future representations before decoding them.
- [[concepts/dynamical-systems-reconstruction|Dynamical Systems Reconstruction]]: recovers dynamical structure from observed trajectories.
- [[concepts/dynamical-interpretability|Dynamical Interpretability]]: studies internal representations through their temporal evolution and governing dynamics.
