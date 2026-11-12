---
title: Lyapunov Spectra of Recurrent Neural Dynamics
type: concept
aliases:
  - Lyapunov Spectral Analysis
  - Benettin Estimation for Recurrent Networks
tags:
  - dynamical-systems
  - recurrent-depth
  - mechanistic-interpretability
---

## Overview

Lyapunov spectra measure exponential growth or contraction of infinitesimal perturbations along repeated neural-state updates. For a shared recurrent map, they provide a stability diagnostic that representation similarity alone cannot supply.

## Key Ideas

- **Trajectory-local sensitivity:** Perturbations propagate through successive Jacobians. A positive leading asymptotic exponent indicates exponential sensitivity; negative estimates indicate contraction along the sampled trajectory. Finite-time signs alone do not prove a global attractor or an asymptotic regime.
- **Stable numerical estimation:** The Benettin procedure propagates orthonormal probes with Jacobian-vector products and repeatedly performs QR decomposition. Averaged log absolute diagonal entries of $R$ estimate directional growth without explicitly forming a long Jacobian product.
- **Finite-horizon qualification:** QR growth estimates depend on the horizon and probe initialization. They should not automatically be equated with exact finite-horizon singular-value exponents, although their asymptotic limits agree under appropriate conditions.
- **Component attribution:** Re-orthogonalizing after sublayers decomposes accumulated growth into additive contributions. Strong contraction and expansion can nearly cancel, so a small net exponent need not imply weak internal transformations.
- **Scope of inference:** A measured top spectrum samples only leading directions. Neither stability nor sensitivity alone establishes useful reasoning, improved accuracy, or a causal architectural mechanism without interventions.

## Important Papers

- [[papers/lyapunov-spectral-analysis-of-loop-transformer-dynamics|Lyapunov Spectral Analysis of Loop Transformer Dynamics]] applies top-50 estimation and sublayer attribution to Ouro and Huginn, finding finite-time expansion in the former and contraction in the latter.

## Related Concepts

- [[concepts/cyclic-fixed-points-in-looped-transformers|Cyclic Fixed Points in Looped Transformers]]: distinguishes block-boundary fixed points from within-block state cycles; perturbation growth provides a complementary stability test.
- [[concepts/latent-reasoning|Latent Reasoning]]: repeated hidden-state computation supplies the trajectories being analyzed.
- [[concepts/mechanistic-interpretability|Mechanistic Interpretability]]: component-level growth attribution helps explain observed recurrent behavior.
