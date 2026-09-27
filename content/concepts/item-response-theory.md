---
title: Item Response Theory
type: concept
aliases:
  - IRT
tags:
  - item-response-theory
  - latent-trait-estimation
  - educational-assessment
  - bayesian-measurement
---

## Overview

Item response theory models an observed answer using a respondent's latent traits and an item's characteristics. It separates differences between respondents from differences between questions, allowing response prediction and latent measurement within the same statistical model. Interpreting the latent scale requires substantive and identification assumptions beyond predictive fit.

## Key Ideas

- **Logistic response models:** A multidimensional two-parameter logistic model can be written as $\Pr(r_{ij}=1)=\sigma(\mathbf a_i^\top\mathbf k_j+d_j)$, where $\sigma$ is the logistic function, $\mathbf a_i$ is ability, $\mathbf k_j$ is discrimination, and $d_j$ is an item intercept. In this sign convention, larger $d_j$ increases success probability; it should not be read directly as increasing difficulty.
- **Response shape:** Rasch/1PL models constrain discrimination; 2PL estimates it; 3PL adds a lower asymptote for guessing. Logistic positive exponent models allow asymmetric curves. Ideal-point/unfolding response functions can be non-monotonic, so a larger latent value need not imply a higher response probability.
- **Multiple dimensions:** Vector-valued ability and discrimination permit several traits to contribute to a response. Increasing dimensionality also increases inference and identification demands.
- **Inference is a separate choice:** Joint maximum likelihood, marginal maximum likelihood, HMC, and variational inference can fit related response models. A change in estimator should be distinguished from a change in the response function.
- **Neural response functions:** Learned links, joint neural interactions, and residual corrections allow departures from logistic forms. Better held-out prediction does not by itself validate the resulting latent traits or response shapes.
- **Missingness and time:** Predicting omitted responses does not model why responses are absent. Static IRT also does not represent learning or temporal movement unless a temporal component is added.

## Important Papers

- [[papers/modeling-item-response-theory-with-stochastic-variational-inference|Modeling Item Response Theory with Stochastic Variational Inference]]: introduces VIBO and compares conventional and neural response functions on synthetic, language, and educational data.
- [[papers/generalized-ideal-point-models-for-noisy-dynamic-measures-in-the-social-sciences|Generalized Ideal Point Models for Noisy Dynamic Measures in the Social Sciences]]: develops related latent response models with temporal priors, mixed outcomes, and informative nonresponse.

## Related Concepts

- [[concepts/amortized-variational-inference|Amortized Variational Inference]]: scalable approximate Bayesian estimation of respondent abilities.
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: connects latent positions across time.
- [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]]: jointly models responses and participation.
