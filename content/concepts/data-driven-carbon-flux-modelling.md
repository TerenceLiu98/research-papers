---
title: Data-Driven Carbon Flux Modelling
type: concept
aliases:
  - DDCFM
tags:
  - carbon-flux-modelling
  - remote-sensing
  - environmental-modelling
---

## Overview

Data-driven carbon flux modelling learns relationships between ecosystem carbon exchange and biophysical predictors, typically combining eddy covariance tower measurements, meteorological observations, and remote sensing. Models can estimate fluxes at measurement sites and support regional or global upscaling where compatible predictors are available. Success at observed sites and reliable geographic extrapolation are distinct evaluation goals.

## Key Ideas

- **Distinguish net and component fluxes.** Net ecosystem exchange (NEE) is directly measured through eddy covariance; gross primary productivity (GPP) and ecosystem respiration (RECO) are derived through partitioning. Under the CarbonSense convention, NEE = RECO - GPP, and negative NEE indicates a carbon sink.
- **Combine complementary predictors.** Meteorological variables describe local conditions, imagery supplies spatial and seasonal ecosystem information, and semantic land-cover labels describe ecosystem classes. A model may also use recent conditions because biological responses need not depend only on the current hour.
- **Preserve observation quality.** Network harmonization, units, duplicate releases, temporal resolution, and gap-filling quality influence the learning problem. Missing-input masks can exclude unavailable values while still retaining selected upstream imputed values.
- **Evaluate transfer at the site level.** Holding out entire stations tests transfer to unseen sites. Reporting by ecosystem exposes failures hidden by aggregate scores, but broad ecosystem labels cannot capture every disturbance or regional difference.
- **Specify what stratification holds out.** CarbonFluxBench partitions sites within vegetation or climate categories, retaining each category in both training and testing. This evaluates transfer to unseen locations within represented categories; it does not test withholding an entire biome. Site-level medians and lower quartiles reveal different aspects of transfer performance.
- **Treat target and feature choices jointly.** CarbonFluxBench finds that temporal models and richer meteorological inputs help different flux targets unevenly. NEE is a residual between opposing component fluxes, and normalization by its small mean magnitude can magnify relative errors. Carbon-balance penalties encourage consistency but do not ensure uniformly accurate predictions.
- **Interpret errors relative to variability.** [[concepts/nash-sutcliffe-efficiency|Nash-Sutcliffe Efficiency]] complements RMSE when ecosystems have markedly different flux variability. Low absolute error alone can coexist with worse-than-mean predictions.
- **Separate benchmark gains from global validity.** Uneven tower coverage and differences between tower observations and gridded inference predictors constrain the interpretation of upscaling performance.

## Important Papers

- [[papers/carbonfluxbench-a-global-benchmark-for-upscaling-of-carbon-fluxes-using-zero-shot-learning|CarbonFluxBench: A Global Benchmark for Upscaling of Carbon Fluxes Using Zero-Shot Learning]] standardizes daily GPP, RECO, and NEE regression across 474 sites with vegetation- and climate-stratified site splits. Temporal models lead several component-flux comparisons, while LightGBM remains competitive and feature richness can reduce lower-quartile transfer accuracy.
- [[papers/carbonsense-a-multimodal-dataset-and-baseline-for-carbon-flux-modelling|CarbonSense: A Multimodal Dataset and Baseline for Carbon Flux Modelling]] provides 385 sites, aligned MODIS imagery, configurable quality filtering, and a temporal multimodal baseline. Sections 2-3 introduce the domain and dataset; Section 5 and Appendix B show ecosystem-specific evaluation.
- Pastorello et al. (2020), "The FLUXNET2015 Dataset and the ONEFlux Processing Pipeline for Eddy Covariance Data," is the measurement-standardization reference cited by CarbonSense.

## Related Concepts

- [[concepts/nash-sutcliffe-efficiency|Nash-Sutcliffe Efficiency]] compares model error with an observed-mean reference.
- [[concepts/patch-masking-for-missing-time-series-inputs|Patch Masking for Missing Time-Series Inputs]] addresses a related incomplete-observation problem at the temporal-patch level; CarbonSense's EcoPerceiver instead masks individual input observations.
