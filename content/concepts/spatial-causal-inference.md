---
title: Spatial Causal Inference
type: concept
aliases:
  - Spatial Causal Effects
tags:
  - causal-inference
  - spatial-statistics
  - environmental-statistics
  - observational-studies
---

## Overview

Spatial causal inference estimates treatment or policy effects when observations are indexed by geographic location and outcomes, treatments, or confounders may be spatially dependent. The spatial structure can provide information about unmeasured confounding, but it also breaks the independence assumptions used by many standard causal estimators.

## Key Ideas

- Potential outcomes are defined at locations, allowing both local causal effects and domain-wide average effects to vary over space.
- Spatial confounding arises when latent geographic processes affect both treatment assignment and outcomes. Ignoring those processes can make nearby observations look like independent evidence or attribute spatial structure to the treatment.
- Identification still requires causal assumptions such as SUTVA, conditional ignorability, and positivity. In spatial applications, ignorability may be formulated conditional on latent spatial processes as well as measured covariates.
- Spatial point-process models can represent treatment assignment or sampling locations directly. In the presence of preferential sampling, policy-specific sampling intensities can induce spatially varying propensity scores.
- Grid approximations, Gaussian processes, and Bayesian hierarchical models make spatial causal models computationally tractable, but introduce choices about resolution, covariance structure, and extrapolation across unsampled regions.

## Important Papers

- [[Spatial Causal Inference in the Presence of Preferential Sampling to Study the Impacts of Marine Protected Areas]]
- Reich et al. (2021), "A review of spatial causal inference methods for environmental and epidemiological applications."
- "Addressing geographic confounding through spatial propensity scores" (2019).
- Schnell and Papadogeorgou (2020), "Mitigating unobserved spatial confounding when estimating the effect of supermarket access on cardiovascular disease deaths."
- Guan et al. (2023), "Spectral adjustment for spatial confounding."

## Related Concepts

- [[Preferential Sampling]]
- [[Marine Protected Areas]]
- Spatial confounding
- Potential outcomes
- Propensity scores
- Gaussian processes
