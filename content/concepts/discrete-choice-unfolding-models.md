---
title: Discrete-Choice Unfolding Models
type: concept
aliases:
  - Logit unfolding model
  - Probit unfolding model
tags:
  - discrete-choice
  - ideal-point-estimation
  - bayesian-measurement
---

## Overview

Discrete-choice unfolding models allow one observed answer to represent multiple latent alternatives. In binary spatial voting, an affirmative policy position lies between two negative positions. An actor chooses the alternative with the highest realized utility, but the data record only yes or no. Actors at opposing extremes can therefore reject the same proposal without being assigned similar latent preferences.

## Key Ideas

- **Three alternatives, two observations:** Quadratic distance utilities associate one location with approval and two locations with opposition. The affirmative response occurs only when its utility exceeds both negative alternatives.
- **Shock distributions change the response:** Independent Gaussian utility shocks give a probit unfolding model; independent Gumbel shocks give a logit version. Gumbel shocks accommodate larger deviations than Gaussian shocks, changing how strongly sporadic unusual choices influence the fit.
- **Nonmonotonicity can coexist with ordinary partisan items:** The logit response is $[1+\exp\{-\alpha_1(\beta-\delta_1)\}+\exp\{-\alpha_2(\beta-\delta_2)\}]^{-1}$ with opposite-sign slopes. It can be effectively monotonic over observed positions when one transition lies far outside their range.
- **Parameterization affects scope:** Lei and Rodriguez fit four slope/location parameters directly, with sign constraints, rather than restricting them to the three-dimensional manifold implied by three original policy locations. The fitted response family is consequently more flexible than that initial construction.
- **Posterior geometry needs explicit treatment:** Opposite-sign slope constraints produce separate orthants. Gaussian-mixture utility augmentation enables mostly Gibbs updates, supplemented by discrete orthant moves and Metropolis-Hastings proposals. Reflection identification and movement between orthants are separate computational concerns.
- **Fit does not identify motives:** Two-sided dissent and large random shocks can both account for exceptional choices. Choosing a better-fitting response model does not establish the reason for any individual vote, and sampling diagnostics remain necessary even when a chain crosses modes.

## Important Papers

- Lei and Rodriguez, "A novel class of unfolding models for binary preference data" (2025 in the later paper's reference list; DOI 10.1017/pan.2024.11): develops the utility-based family and its probit implementation, as described by the logit paper.
- [[papers/logit-unfolding-choice-models-for-binary-data|Logit unfolding choice models for binary data]]: introduces Gumbel shocks, a Gaussian-mixture augmented sampler, and comparisons across four U.S. Houses.

## Related Concepts

- [[concepts/generalized-graded-unfolding-model|Generalized Graded Unfolding Model]]: another approach to proximity-based responses, constructed through pooled hypothetical response categories.
- [[concepts/item-response-theory|Item Response Theory]]: general framework for measuring latent traits from item responses.
- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]: reflection is the one-dimensional orientation ambiguity.
- [[concepts/multiple-ideal-points|Multiple Ideal Points]]: domain-specific preference hypotheses motivate extensions of the augmented computation.
