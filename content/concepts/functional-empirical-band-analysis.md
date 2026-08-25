---
title: Functional Empirical Band Analysis
type: concept
aliases:
  - fEBA
tags:
  - adaptive-frequency-bands
  - functional-time-series
  - frequency-domain-analysis
  - nonstationary-processes
---

## Overview

Functional Empirical Band Analysis (fEBA) is a framework for learning frequency partitions that preserve changes in the time-varying spectral density of a functional time series. It extends empirical frequency-band analysis to observations that are functions, such as spatially indexed high-dimensional EEG signals.

## Key Ideas

- A frequency band is defined by the behavior of a demeaned time-varying spectral density, rather than by a universal set of conventional endpoints.
- A local multitaper estimator produces blockwise estimates of the time-varying spectral density with reduced variance and bias relative to a single periodogram.
- An integrated scan statistic compares one frequency with the average over a preceding interval and integrates squared differences across time and the functional domain.
- Gaussian-process approximations provide a null distribution for testing whether a candidate interval contains a partition point.
- An inchworm search tests frequency batches, applies Hochberg family-wise error control, and advances from the smallest detected cut until the frequency range is covered.
- Computational reductions include a block-diagonal covariance approximation, smaller frequency batches, and functional-domain subsampling or basis expansion.
- Because the statistic integrates over the functional domain, it can detect a frequency change that occurs in only part of a spatial or functional domain.

## Important Papers

- [[Adaptive Frequency Band Learning of Nonstationary Functional Time Series: An Application to High-Dimensional EEG Signals]]
- Bruce, Tang, Hall, and Krafty (2020), "Empirical frequency band analysis of nonstationary time series."
- Sundararajan and Bruce (2025), "Frequency band analysis of nonstationary multivariate time series."
- Brubaker, Manning, Yentes, and Bruce (2026), "Frequency band analysis of multiple stationary time series."

## Related Concepts

- [[Nonstationary Functional Time Series]]
- [[Multitaper Spectral Estimation]]
- [[High-Dimensional EEG Signals]]
- Time-varying spectral density
- Change-point detection
