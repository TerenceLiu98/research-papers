---
title: Log-Gaussian Cox Processes
type: concept
aliases:
  - LGCP
  - Log-Gaussian Cox Process
tags:
  - spatial-statistics
  - point-processes
  - gaussian-processes
---

## Overview

A log-Gaussian Cox process models point locations with a random intensity whose logarithm contains a Gaussian spatial field. Conditional on that intensity, events follow a Poisson process. Spatially correlated variation in the latent field lets the model represent clustering beyond a fixed-intensity Poisson model.

## Key Ideas

- **Covariates and latent structure:** Observed predictors can explain part of the log intensity while the latent field captures residual spatial variation. Population density is one such predictor in models of recorded conflict-related violence.
- **Range and variation:** Correlation range describes the spatial scale of latent dependence; field standard deviation describes its magnitude. Both depend on the model's coordinates, parameterization, and covariates.
- **Intensity is not prevalence:** An intensity surface describes expected event concentration over space. It is not automatically an individual victimization probability, a per-capita rate, or a census of unrecorded events.
- **Clustering is not triggering:** Shared spatial conditions can cluster events without one event causing another. Temporal self-excitation requires a separate model and supporting assumptions.
- **Observation processes matter:** Uneven reporting can remain in the fitted surface. Modeling population density alone does not identify or correct differential detection. In preferential-sampling applications, the point process instead explicitly models where observations are collected.
- **Validation:** Simulated counts and spatial density surfaces assess different aspects of fit. Mesh-resolution checks test numerical sensitivity; neither substitutes for checking reporting bias or substantive assumptions.

## Important Papers

- [[papers/spatiotemporal-patterns-of-conflict-related-sexual-violence-in-colombia|Spatiotemporal patterns of conflict-related sexual violence in Colombia]]: compares population-adjusted spatial intensities across two periods and distinguishes geographic clustering from temporal excitation.
- [[papers/spatial-causal-inference-in-the-presence-of-preferential-sampling-to-study-the-impacts-of-marine-protected-areas|Spatial Causal Inference in the Presence of Preferential Sampling to Study the Impacts of Marine Protected Areas]]: uses policy-specific LGCP sampling intensities linked to latent outcome processes.
- Brix and Diggle (2001), "Spatiotemporal prediction for log-Gaussian Cox processes": methodological reference cited by the Colombian study.

## Related Concepts

- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: geographic dependence represented here through a latent field.
- [[concepts/preferential-sampling|Preferential Sampling]]: dependence between observation locations and the process being studied.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: models event-history excitation, a different source of clustering from latent spatial heterogeneity.
