---
title: Preferential Sampling
type: concept
aliases:
  - Informative Sampling Locations
  - Informative Spatial Sampling
tags:
  - spatial-statistics
  - sampling-bias
  - point-processes
  - environmental-statistics
---

## Overview

Preferential sampling occurs when the locations selected for measurement depend on the spatial process being measured or on related latent processes. The resulting sample is not spatially representative by construction: locations with particular outcome levels or environmental conditions may be more likely to be observed. This can bias spatial inference, prediction, and causal effect estimates.

## Key Ideas

- A shared latent spatial process between the response model and the sampling-location model is a direct way to represent informative site selection.
- Log-Gaussian Cox processes model sampling locations with a stochastic intensity that varies over space. A coefficient linking the latent outcome process to that intensity measures the degree of preferential sampling.
- Preferential sampling can operate differently across policy or treatment groups. Comparing group-specific intensities therefore matters for causal estimands, not only for spatial prediction.
- Covariates explain part of the location-selection mechanism, but shared latent effects capture selection that remains associated with unmeasured spatial outcome variation.
- Accounting for preferential sampling requires assumptions about the sampling process and its dependence on latent fields. Those assumptions are not generally testable from the observed outcomes alone.

## Important Papers

- [[Spatial Causal Inference in the Presence of Preferential Sampling to Study the Impacts of Marine Protected Areas]]
- Diggle, Menezes, and Su (2010), "Geostatistical inference under preferential sampling."
- Pati, Reich, and Dunson (2011), "Bayesian geostatistical modelling with informative sampling locations."
- Gelfand, Sahu, and Holland (2012), "On the effect of preferential sampling in spatial prediction."
- Schliep, Wikle, and Daw (2023), "Correcting for informative sampling in spatial covariance estimation and kriging predictions."

## Related Concepts

- [[Spatial Causal Inference]]
- [[Marine Protected Areas]]
- Spatial confounding
- Log-Gaussian Cox processes
- Informative sampling
- Spatial prediction
