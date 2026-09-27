---
title: Dynamic Ideal Point Models
type: concept
aliases:
  - Dynamic Ideal Point Estimation
  - Time-Varying Ideal Point Models
tags:
  - political-methodology
  - ideal-point-estimation
  - latent-trait-estimation
  - time-series
---

## Overview

Dynamic ideal point models estimate how an unobserved position changes over time using repeated responses such as roll-call votes. They combine a measurement model connecting positions to observed items with a temporal model connecting positions across periods. The estimated trajectory depends on both components: a well-fitting response model alone does not determine how much change should count as movement in the underlying construct.

## Key Ideas

- **Measurement:** A binary specification uses $\Pr(Y_{ijt}=1)=\operatorname{logit}^{-1}(\gamma_j\alpha_{it}-\beta_j)$. Item discrimination $\gamma_j$ can have either sign, allowing items to indicate opposing ends of a latent dimension. Other likelihoods can accommodate counts, ordinal responses, or continuous measures.
- **Temporal assumptions:** Random walks permit cumulative innovations; stationary AR(1) models describe mean reversion; splines constrain trajectories through degree and knots; Gaussian processes express covariance across time. These encode different assumptions about the latent trait.
- **Sparsity and smoothness:** Finer time intervals reduce observations per position. More flexible trajectories can then absorb measurement noise or item scheduling. Low-dimensional splines can stabilize estimates when gradual change is substantively plausible, but that assumption limits the changes they can recover.
- **Identification:** Scale and orientation require restrictions or informative priors. Kubinec's idealstan framework bounds discrimination parameters and anchors selected items, allowing positions to vary without fixing individual trajectories. Anchors across time can be more useful than constraints confined to initial positions.
- **Participation:** Selective absence can alter estimated trajectories. [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]] links observation probabilities to the same latent position through a separate measurement component.
- **Validation:** Recovery, rank order, uncertainty, and downstream regression errors answer different questions. Good recovery under a matching simulation model does not establish that an empirical trajectory measures ideology rather than another source of behavioral variation.

## Important Papers

- [[papers/generalized-ideal-point-models-for-noisy-dynamic-measures-in-the-social-sciences|Generalized Ideal Point Models for Noisy Dynamic Measures in the Social Sciences]]: combines temporal priors, mixed outcomes, missingness adjustment, and Bayesian computation; contrasts flexibility with sparsity in monthly U.S. House estimates.
- Martin and Quinn (2002), "Dynamic Ideal Point Estimation via Markov Chain Monte Carlo for the U.S. Supreme Court, 1953-1999": random-walk approach discussed by Kubinec.
- Reuning, Kenwick, and Fariss (2019), "Exploring the Dynamics of Latent Variable Models": cited by Kubinec in discussing temporal specification and rapid shifts.

## Related Concepts

- [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]]
- [[concepts/text-scaling-models|Text Scaling Models]]
- [[concepts/political-polarization|Political Polarization]]
