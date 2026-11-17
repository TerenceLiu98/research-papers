---
title: Regularized Horseshoe Prior
type: concept
aliases:
  - Regularized Horseshoe
  - RHS Prior
definition: "A global-local shrinkage prior that concentrates parameters near zero while using a slab scale to regularize large deviations."
tags:
  - bayesian-inference
  - shrinkage-priors
---

## Overview

The regularized horseshoe combines strong shrinkage near zero with local escape from shrinkage. A slab scale controls large deviations, extending the original horseshoe beyond its unregularized tails. In dynamic measurement, applying this prior to innovations represents near-stasis interrupted by occasional substantial movement.

## Key Ideas

For parameter $\gamma_j$, the conditional variance is $\tau^2c^2\lambda_j^2/(c^2+\tau^2\lambda_j^2)$. The global scale $\tau$ encourages common shrinkage, local scales $\lambda_j$ permit departures, and the variance approaches $c^2$ as the local scale grows. This bound is conditional on the slab scale; a prior on $c^2$ retains uncertainty about its magnitude.

Shrinkage is continuous and does not create exact zero innovations or explicit discrete change points. Whether strong shrinkage is useful depends on the expected prevalence of near-zero parameters. In dynamic models, more precise trajectories still require checks of recovery and uncertainty calibration.

## Important Papers

- Piironen and Vehtari (2017), “Sparsity Information and Regularization in the Horseshoe and Other Shrinkage Priors”: introduces regularization of the horseshoe's large deviations.
- [[papers/adding-regularized-horseshoes-to-the-dynamics-of-latent-variable-models|Adding Regularized Horseshoes to the Dynamics of Latent Variable Models]]: applies the prior to latent-state innovations and compares recovery and democracy-measurement performance against normal and Student-t priors.

## Related Concepts

- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: a setting where innovation shrinkage can express stability punctuated by change.
- [[concepts/horseshoe-shrinkage-in-neural-networks|Horseshoe Shrinkage in Neural Networks]]: related global-local shrinkage applied to network weights; its parameter grouping and application differ from regularized latent-state innovations.
