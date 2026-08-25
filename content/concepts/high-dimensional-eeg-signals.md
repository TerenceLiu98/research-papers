---
title: High-Dimensional EEG Signals
type: concept
aliases:
  - HD-EEG
  - High-Density EEG
tags:
  - eeg
  - neuroscience
  - functional-data-analysis
  - spectral-analysis
---

## Overview

High-dimensional EEG signals record brain electrical activity at many scalp electrodes, producing measurements that are dense in both space and time. When the electrode array samples a smooth scalp field, each time point can be represented as a spatial function and the recording can be analyzed as a functional time series.

## Key Ideas

- The spatial dependence among many electrodes is part of the signal, not only a nuisance correlation among separate channels.
- Basis expansions can reduce a multichannel scalp map to a smaller time series of spatial basis coefficients while preserving smooth structure.
- Eyes-open and eyes-closed protocols create time-varying spectral behavior that makes HD-EEG a useful setting for nonstationary frequency analysis.
- Conventional delta, theta, alpha, beta, and gamma bands are useful summaries but may not align with subject- or region-specific dynamics.
- Region-specific frequency partitions can differ across parietal, occipital, frontal, and central channels, reflecting spatially localized nonstationarity.
- Data-adaptive spectral summaries can expose synchronization across conventional bands and support downstream source-localization or connectivity analyses, although the paper does not evaluate a downstream clinical task.

## Important Papers

- [[Adaptive Frequency Band Learning of Nonstationary Functional Time Series: An Application to High-Dimensional EEG Signals]]
- Trujillo, Stanfield, and Vela (2017), "The effect of electroencephalogram (EEG) reference choice on information-theoretic measures of the complexity and integration of EEG signals."
- Trujillo (2019), "Raw Empirical EEG Data."
- Newson and Thiagarajan (2019), "EEG Frequency Bands in Psychiatric Disorders: A Review of Resting State Studies."

## Related Concepts

- [[Nonstationary Functional Time Series]]
- [[Functional Empirical Band Analysis]]
- Spectral density
- Functional data analysis
- Source localization
