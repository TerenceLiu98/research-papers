---
title: Linear Residual-Stream Transport
type: concept
aliases:
  - Linear Transport Subspace
tags:
  - mechanistic-interpretability
  - residual-stream
  - linear-transport
---

## Overview

Linear residual-stream transport describes downstream representation components that can be predicted by an affine map from upstream transformer states. It provides an operational test of information persistence across layers, with conclusions conditional on sampled inputs, source-target pairing, feature directions, and prediction quality.

## Key Ideas

- Fit $\hat v_{l+k,j}=T_rv_{l,i}+b$ on paired activations and evaluate on held-out samples. Same-token pairing measures a restricted channel and can miss cross-token routing.
- Downstream [[concepts/sparse-autoencoders|Sparse Autoencoders]] supply feature directions for evaluation. Decoder-direction projections measure alignment in residual space and need not equal encoded latent activations.
- Canonical correlations quantify linear channels after whitening. The optimal rank-$r$ fraction of whitened downstream variance explained is $d^{-1}\sum_{i=1}^r\rho_i^2$ under the paper's covariance assumptions.
- Transport efficiency compares a fitted operator with that ceiling using the same whitened metric. The participation ratio $(\sum_i\rho_i^2)^2/\sum_i\rho_i^4$ measures effective dimension, not a sharp count of nonzero channels.
- Successful residual replacement adds behavioral evidence to predictive fit. Linear predictability alone cannot distinguish unchanged features from newly composed linear combinations, and prediction failure does not uniquely identify nonlinear synthesis.
- [[concepts/transformer-green-operators|Transformer Green Operators]] describe infinitesimal intervention propagation along a fixed trajectory. A regression map across observed states has a different estimand and is not automatically an intervention Jacobian.

## Important Papers

- [[papers/activation-transport-operators|Activation Transport Operators]] fits regularized cross-layer maps on Gemma 2 2B, evaluates selected SAE directions and replacement perplexity, and introduces a whitened prediction ceiling and effective transport dimension.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/mechanistic-interpretability|Mechanistic Interpretability]]
- [[concepts/transformer-green-operators|Transformer Green Operators]]
