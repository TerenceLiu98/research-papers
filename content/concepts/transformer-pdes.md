---
title: Transformer PDEs
type: concept
aliases:
  - Transformer PDE
  - Mean-Field Self-Attention Dynamics
tags:
  - transformers
  - self-attention
  - partial-differential-equations
  - mean-field-limits
  - optimal-transport
---

## Overview

A Transformer PDE represents token states as a probability measure and models continuous layer depth with a nonlinear continuity equation. Finite token sequences appear as empirical measures of an interacting-particle system. The framework separates questions about the attention velocity field from questions about existence, stability, mean-field convergence, and long-time distributional behavior.

## Key Ideas

- **Tokens become a measure.** A sequence $x_1,\ldots,x_n$ is represented by $n^{-1}\sum_i\delta_{x_i}$. Attention supplies a velocity field $\Gamma_\mu$, and the measure evolves by $\partial_t\mu+\operatorname{div}(\mu\Gamma_\mu)=0$.
- **Depth becomes time.** Residual attention steps can be viewed as time discretizations, connecting Transformer layers to [[concepts/continuous-depth-transformers|Continuous-Depth Transformers]]. Time-dependent query, key, and value matrices represent parameters that vary across depth.
- **Stability supports mean-field limits.** A Wasserstein estimate between solutions propagates convergence of initial empirical measures to convergence of their later states. Existence and stability depend on growth and regularity properties of the chosen attention kernel.
- **Masks require conditional transport.** Causal attention introduces a position coordinate. Comparing measures while preserving their shared position marginal leads to a conditional Wasserstein metric rather than ordinary unrestricted transport.
- **Gaussian closure exposes anisotropy.** When an attention field is affine on Gaussian measures, the PDE reduces to ODEs for the mean and covariance. Rank-deficient limiting covariance describes collapse onto a lower-dimensional affine subspace; finite-time covariance blow-up is also possible.
- **Gradient-flow structure depends on geometry.** Sinkhorn attention can inherit standard [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flow]] structure. Softmax dynamics may require a distribution-dependent twisted metric, and formal gradient-flow structure does not imply geodesic convexity or convergence.

## Important Papers

- [[papers/a-unified-perspective-on-the-dynamics-of-deep-transformers|A Unified Perspective on the Dynamics of Deep Transformers]] proves compact-support well-posedness across several attention variants, derives Gaussian covariance dynamics, and studies twisted and Bures-Wasserstein gradient structures.
- Sander et al. (2022), "Sinkformers: Transformers with Doubly Stochastic Attention": introduces a doubly stochastic attention mechanism with a Wasserstein gradient-flow interpretation.
- Geshkovski et al. (2023), "The Emergence of Clusters in Self-Attention Dynamics": studies clustering in discrete self-attention particle dynamics.
- Burger et al. (2025), "Analysis of Mean-Field Models Arising from Self-Attention Dynamics in Transformer Architectures with Layer Normalization": analyzes related normalized dynamics on the sphere.

## Related Concepts

- [[concepts/continuous-depth-transformers|Continuous-Depth Transformers]]
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]
- [[concepts/bures-wasserstein-geometry|Bures-Wasserstein Geometry]]
- [[concepts/attention-as-message-passing|Attention as Message Passing]]
- [[concepts/drifting-models|Drifting Models]]
