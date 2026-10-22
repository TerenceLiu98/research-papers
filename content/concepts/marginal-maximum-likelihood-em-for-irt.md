---
title: Marginal Maximum Likelihood EM for IRT
type: concept
aliases:
  - MML-EM for IRT
  - Maximum Marginal Likelihood Estimation for IRT
tags:
  - item-response-theory
  - marginal-maximum-likelihood
  - expectation-maximization
---

## Overview

Marginal maximum likelihood estimates item and population parameters after integrating out respondent traits. EM implements this estimation by alternating posterior inference for unobserved traits with parameter updates based on expected complete-data statistics. In mixture IRT, unobserved group membership is included in the E step as well.

## Key Ideas

- **Integrate before calibration:** Each response-pattern probability averages the product of conditional item probabilities over a latent population distribution. Known groups have separate integrals; latent groups add a weighted sum over group membership.
- **Posterior expected counts:** Quadrature represents the latent distribution by weighted nodes. The E step distributes observed response-pattern frequencies across nodes, and across latent groups when applicable, producing expected category counts for item estimation.
- **Separate objective functions:** The M step optimizes an expected complete-data log likelihood with the current posterior weights held fixed. That auxiliary objective is not the observed marginal log likelihood itself.
- **Item and population updates:** Newton-Raphson can update item parameters using analytic gradients and Hessians. Gaussian population parameters use posterior moments, while mixture proportions use expected group counts. Constraints must anchor latent location, scale, and the relevant measurement structure.
- **Observed versus latent groups:** Known group labels permit direct conditioning. Latent labels require joint posterior inference and can coexist with group-specific item parameters; this is broader than using a mixture solely to approximate a common latent density.
- **Scoring after calibration:** Posterior node weights support EAP means, grid-based MAP scores, and conditional posterior covariances. These scoring summaries do not automatically propagate uncertainty in estimated calibration parameters.
- **Computation and uncertainty:** A grid with $D$ points on each of $J$ traits has $D^J$ nodes. Structured dimension reduction and stochastic methods address this cost. Standard errors need appropriate information calculations; curvature of the itemwise M-step objective alone is insufficient justification.

## Important Papers

- [[papers/marginal-maximum-likelihood-estimation-of-item-response-models-in-r|Marginal Maximum Likelihood Estimation of Item Response Models in R]]: derives a unidimensional GPCM EM implementation with Gauss-Hermite quadrature, Newton-Raphson updates, and EAP scoring, then diagnoses quadrature and local-dependence issues in applications.
- [[papers/estimating-voter-preference-distributions-from-individual-level-voting-data|Estimating Voter Preference Distributions from Individual-Level Voting Data]]: Lewis (2001) uses response-pattern counts, Gauss-Hermite quadrature, and EM to estimate means and dispersions for predetermined voter groups from a few binary items; uncertainty is calculated from the full marginal likelihood.
- [[papers/maximum-marginal-likelihood-estimation-with-an-expectation-maximization-algorithm-for-multigroup-mixture-multidimensional-item-response-theory-models|Fu (2019), Maximum Marginal Likelihood Estimation With an Expectation-Maximization Algorithm for Multigroup/Mixture Multidimensional Item Response Theory Models]]: explicit quadrature, derivative, and scoring formulas, with recovery simulations for GPCM-related models.
- [[papers/generalized-full-information-item-bifactor-analysis|Generalized Full-Information Item Bifactor Analysis]]: illustrates EM with structural integration reduction and supplemented-EM uncertainty estimation.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: response functions and latent measurement.
- [[concepts/gaussian-mixture-item-response-theory|Gaussian Mixture Item Response Theory]]: mixtures used to represent flexible trait populations.
- [[concepts/mixed-stochastic-approximation-em|Mixed Stochastic Approximation EM]]: combines simulation with analytical averaging instead of exhaustive quadrature.
- [[concepts/bifactor-item-response-models|Bifactor Item Response Models]]: loading restrictions enable lower-dimensional integrations.
- [[concepts/structure-aware-second-order-laplace-approximation|Structure-Aware Second-Order Laplace Approximation]]: an alternative numerical approximation to latent integrals.
