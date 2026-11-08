---
title: Denoising Autoencoders
type: concept
aliases:
  - Denoising Autoencoder
  - DAE
tags:
  - representation-learning
  - autoencoders
---

## Overview

A denoising autoencoder learns to reconstruct a clean observation from a corrupted version. With squared reconstruction loss and sufficient capacity, the population-optimal reconstruction is the conditional mean of the clean data given its corruption.

## Key Ideas

- **Denoising is estimation.** For additive independent noise, $g^*(y)=\mathbb E[X\mid X+\varepsilon=y]$; individual corruptions need not be exactly reversible.
- **Gaussian denoising encodes a score.** With noise covariance $tI$, $g_t^*(x)-x=t\nabla\log(\nu_t*\mu)(x)$. The finite-noise score belongs to the smoothed data distribution.
- **Repeated denoising changes the distribution.** Training successive denoisers on transported data produces an evolving score field. In the ideal continuous-depth Gaussian limit, $\dot x_t=\nabla\log\mu_t(x_t)$ induces $\partial_t\mu_t=-\Delta\mu_t$ and decreases Shannon entropy while the smooth solution exists.
- **Stacking differs from direct composition.** Stacking trains on hidden codes; direct composition trains on reconstructed outputs. Their transport descriptions can be related through decoder maps under injectivity and generalized-DAE assumptions.
- **Concentration has a time limit.** Continuous Gaussian examples reach singular measures in finite time. Population formulas do not themselves bound finite-data or finite-width errors.

## Important Papers

- [[papers/transport-analysis-of-infinitely-deep-neural-network|Transport Analysis of Infinitely Deep Neural Network]]: develops the transport interpretation, continuous-depth limit, and conditional stacking equivalence.
- Alain and Bengio (2014), *What regularized auto-encoders learn from the data generating distribution*: population denoising analysis cited by the transport paper.

## Related Concepts

- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]: entropy descent describes ideal continuous denoising.
- [[concepts/optimal-transport|Optimal Transport]]: provides a geometry for comparing transported distributions.
