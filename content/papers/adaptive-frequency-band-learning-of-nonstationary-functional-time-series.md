---
title: "Adaptive Frequency Band Learning of Nonstationary Functional Time Series: An Application to High-Dimensional EEG Signals"
type: paper
authors:
  - Pramita Bagchi
  - Scott A. Bruce
year: null
tags:
  - functional-time-series
  - frequency-domain-analysis
  - adaptive-frequency-bands
  - nonstationary-processes
  - high-dimensional-eeg
---

## TL;DR

This paper introduces functional Empirical Band Analysis (fEBA), a data-adaptive procedure for learning frequency bands whose time-varying spectral dynamics differ in a nonstationary functional time series. It combines a local multitaper spectral estimator, an integrated scan statistic, and an iterative multiple-testing search. Simulations show that the procedure estimates frequency partitions accurately when adjacent bands have distinguishable dynamics. In a high-dimensional EEG application, it finds subject- and region-specific bands that combine or subdivide conventional EEG bands.

## Research Question

Can frequency bands for nonstationary functional time series be estimated from the data so that band summaries preserve changes in time-varying spectral behavior better than fixed, conventional partitions?

## Motivation

High-dimensional EEG observations can be treated as spatial functions over the scalp that evolve over time. Their second-order behavior is therefore both functional and nonstationary. Direct analysis of the time-varying spectral density is expensive, so researchers commonly average spectral power within pre-specified bands. Those fixed endpoints can obscure subject-, task-, or region-specific dynamics, including differences within a canonical band and synchronization across canonical bands.

The paper addresses the lack of a data-driven frequency-band estimator for nonstationary functional time series. Its target is a minimal partition of frequency space in which the demeaned time-varying spectral density has a common functional form within each band.

## Contributions

- Establishes central-limit-theorem-type results for functional multitaper and local functional multitaper spectral estimators under stationary and locally stationary settings.
- Defines an integrated functional scan statistic for detecting frequency partition points and derives a Gaussian-process quadratic-functional approximation under the null.
- Develops an inchworm search that tests batches of frequencies, controls the family-wise error rate with a Hochberg step-up procedure, and iteratively identifies multiple partition points.
- Uses block-diagonal covariance approximations, smaller frequency batches, and functional-domain dimension reduction to make the search computationally scalable.
- Demonstrates that the method can reveal spatially localized and cross-band EEG dynamics that fixed EEG bands do not expose.

## Method

The observations are functions on a compact spatial domain, represented for the EEG application by basis coefficients over the scalp. Under local stationarity, a length-$T$ functional time series is locally approximated by stationary processes, and its second-order behavior is represented by a time-varying spectral density kernel $f_{u,\omega}$, where $u$ is rescaled time and $\omega$ is frequency. The demeaned kernel $g_{u,\omega}$ is assumed to be piecewise smooth in frequency, with unknown partition points.

The estimator divides the series into $B$ temporal blocks and averages $K$ sinusoidal-taper spectral estimates within each block. The local multitaper estimates are then demeaned over blocks. For a starting frequency $\omega_0$ and interval width $\delta$, the scan statistic integrates the squared difference between the estimated demeaned spectrum at $\omega_0+\delta$ and its average over $[\omega_0,\omega_0+\delta)$ across the temporal and functional domains. It should be small when the interval contains no partition point and large when it crosses a change.

Under the paper's asymptotic scheme, the null statistic is approximated by an average of squared norms of Gaussian processes. The search simulates this limiting null distribution, applies Hochberg correction across candidate frequencies, records the smallest rejected frequency, and repeats from just above that point. The implementation uses a block-diagonal covariance approximation, tests frequencies in batches, and reduces the functional domain either by subsampling evaluation points or by using basis coefficients.

## Experiments

The simulations include functional white noise, piecewise-linear and piecewise-sinusoidal time-varying spectral dynamics, and a latent mixture of four time-varying AR(2) components. With 100 replications, family-wise error rate set to $0.05$, and increasing numbers of observations per block and temporal blocks, the estimated number and locations of frequency bands generally improve. Accuracy is better when adjacent bands differ throughout most of the time domain than when their differences are periodic or localized. In the AR(2) mixture setting, estimated cuts bracket peaks with time-varying bandwidths even though the setting has no literal piecewise partition.

For EEG, the paper analyzes a four-minute, 64-channel, 256 Hz recording from an eyes-open/eyes-closed experiment, downsampled to 32 Hz and represented with nine two-dimensional cubic B-spline basis functions. Across 21 of 22 participants with at least four minutes of usable data, a 2.4 Hz partition point appears for every participant, while higher-frequency cuts vary across individuals.

The global analysis finds bands $(0,2.4)$, $[2.4,12.8)$, and $[12.8,16)$ Hz. The middle band combines much of the conventional theta and alpha ranges, while the low band subdivides the conventional delta range. For parietal and occipital channels, the estimated bands are $(0,3.8)$, $[3.8,12.6)$, and $[12.6,16)$ Hz. For frontal and central channels, the supplementary analysis finds five bands: $(0,2.2)$, $[2.2,4.9)$, $[4.9,8.1)$, $[8.1,11.8)$, and $[11.8,16)$ Hz. The localized results show that changes can be detected for only a subset of the functional domain.

## Limitations

The theoretical results require smoothness, local-stationarity, block and taper growth, and rate conditions that may not hold for every functional time series. The main estimator uses non-overlapping temporal blocks, even though the statistic can in principle use other consistent time-varying spectral estimators. The practical search also relies on approximations: a block-diagonal covariance, frequency subsampling or batching, and either selected functional-domain points or a low-dimensional basis.

The simulations use controlled settings and 100 replications; performance decreases when adjacent bands have weak, periodic, or spatially localized differences. The detailed EEG analysis is based on one participant, while the cross-participant result is summarized mainly through estimated partition points. The application examines a limited frequency range and does not establish that learned bands improve a downstream clinical or predictive task. The proposed method is for a single nonstationary functional time series; joint estimation across subjects or regions remains future work.

## Related Concepts

- [[Functional Empirical Band Analysis]]
- [[Nonstationary Functional Time Series]]
- [[Multitaper Spectral Estimation]]
- [[High-Dimensional EEG Signals]]
- Local stationarity
- Time-varying spectral density

## Related Papers

- Bruce, Tang, Hall, and Krafty (2020), "Empirical frequency band analysis of nonstationary time series."
- Sundararajan and Bruce (2025), "Frequency band analysis of nonstationary multivariate time series."
- Panaretos and Tavakoli (2013), "Fourier analysis of stationary time series in function space."
- van Delft and Eichler (2018), "Locally stationary functional time series."
- Brubaker, Manning, Yentes, and Bruce (2026), "Frequency band analysis of multiple stationary time series."
- Granados-Garcia, Prado, and Ombao (2024), "Bayesian nonparametric multivariate mixture of autoregressive processes with application to brain signals."
