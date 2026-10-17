---
title: Temporal Disaggregation
type: concept
tags:
  - time-series
  - mixed-frequency-data
  - macroeconomics
---

## Overview

Temporal disaggregation reconstructs a higher-frequency series from lower-frequency observations, often using related indicators. For a flow such as GDP, reconstructed monthly values must sum to the observed quarterly total. This constraint identifies the total but does not by itself identify the within-quarter path.

## Key Ideas

- Indicators inform the allocation of an observed total across months. Dynamic regression and latent-component models provide assumptions linking indicator movements to the target.
- State-space models encode aggregation in the observation equation and can process mixed frequencies, delayed releases, and missing observations with filtering and smoothing.
- Aggregation need not be an exact restriction: approximate log-growth mappings can include measurement error. Regional applications may additionally constrain weighted regional common components to match higher-frequency national growth, allowing discrepancies for coverage and accounting differences.
- Historical smoothing conditions on later observations; nowcasting uses the currently available information set. Their weights and uncertainty need not coincide.
- A weighted combination of aggregation-consistent paths remains consistent when weights sum to one and are shared across the months in the aggregation interval.
- Accurate predictions of observed quarterly values are evidence about quarterly prediction, not direct verification of latent monthly values. Release-delay simulations using revised data also differ from genuine real-time vintage evaluation.

## Important Papers

- [[papers/nowcasting-economic-activity-in-european-regions-using-a-mixed-frequency-dynamic-factor-model|Nowcasting economic activity in European regions using a mixed-frequency dynamic factor model]]: reconstructs quarterly regional GVA from annual observations and national quarterly GVA using factors and approximate temporal and cross-sectional restrictions.
- [[papers/nowcasting-monthly-gdp-with-big-data-a-model-averaging-approach|Nowcasting monthly GDP with big data: A model averaging approach]]: combines many bivariate state-space reconstructions and compares historical and predictive weighting.
- Chow and Lin (1971), "Best Linear Unbiased Interpolation, Distribution, and Extrapolation of Time Series by Related Series": classical regression-based approach cited by the GDP paper.
- Proietti (2006), "Temporal Disaggregation by State Space Methods: Dynamic Regression Methods Revisited": state-space formulation cited by the GDP paper.

## Related Concepts

- [[concepts/mixed-frequency-dynamic-factor-models|Mixed-Frequency Dynamic Factor Models]]: share latent dynamics across series while encoding their different observation frequencies.
- [[concepts/forecast-combination|Forecast Combination]]: pools high-frequency reconstructions or predictions while retaining aggregation constraints under suitable weights.
