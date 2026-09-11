---
title: Bayesian Spatial Disaggregation
type: concept
aliases:
  - Spatial Disaggregation Modeling
tags:
  - spatial-statistics
  - bayesian-modeling
  - spatial-disaggregation
---

## Overview

Bayesian spatial disaggregation infers a fine-scale spatial process from observations aggregated over larger geographic regions. A latent continuous field and an observation model connect the scales, allowing uncertainty in the inferred surface to be expressed through a posterior distribution. In disease mapping, the target can be a continuous relative-risk surface estimated from administrative-area case counts.

## Key Ideas

- The observation model must connect regional measurements to the underlying spatial process through aggregation. Merely assigning an area's observed rate to finer cells does not estimate within-area variation.
- Covariates represent systematic spatial variation, while a Gaussian random field represents remaining spatial dependence. Aggregated observations constrain the surface but do not directly reveal fine-scale truth.
- An INLA-SPDE implementation approximates the latent field on a triangular mesh and uses a projection matrix adapted to areal observations. Moraga and Alahmadi build on the integration framework of Moraga et al. (2017).
- [[posterior-exceedance-probabilities|Posterior Exceedance Probabilities]] can turn the inferred risk surface into a cluster map whose boundaries cross administrative borders.
- Finer output resolution is conditional on model assumptions, covariate information, mesh construction, and priors. Independent fine-scale validation is needed to establish the accuracy of inferred boundaries.

## Important Papers

- [[bayesian-spatial-disaggregation-modeling-for-the-detection-of-disease-clusters|Bayesian spatial disaggregation modeling for the detection of disease clusters]]: compares continuous exceedance-based clustering with areal models and scan statistics, including the false-positive tradeoff.
- Moraga et al. (2017), "A geostatistical model for combined analysis of point-level and area-level data using INLA and SPDE," cited by the cluster-detection paper as its spatial integration foundation.
- Nandi et al. (2023), "disaggregation: An R package for Bayesian spatial disaggregation modeling," cited as a related implementation using TMB.

## Related Concepts

- [[posterior-exceedance-probabilities|Posterior Exceedance Probabilities]]: posterior classification of high-risk locations on a disaggregated surface.
- Change of spatial support and Bayesian melding: connecting observations measured at different geographic resolutions.
- Gaussian random fields and SPDE approximations: representing continuous spatial dependence computationally.
