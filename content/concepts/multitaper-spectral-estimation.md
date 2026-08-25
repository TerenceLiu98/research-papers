---
title: Multitaper Spectral Estimation
type: concept
aliases:
  - Local Multitaper Spectral Estimation
tags:
  - spectral-analysis
  - time-series
  - functional-time-series
  - frequency-domain-analysis
---

## Overview

Multitaper spectral estimation averages spectral estimates computed with several orthogonal data tapers. The averaging reduces variance while retaining frequency resolution. A local multitaper estimator applies the construction within temporal blocks to approximate a time-varying spectral density.

## Key Ideas

- A single periodogram is noisy and inconsistent as a spectral-density estimator; averaging multiple tapered estimates provides a more stable estimate.
- In the fEBA construction, the series is divided into temporal blocks and each block is analyzed with $K$ orthogonal sinusoidal tapers.
- The local frequency bandwidth is controlled by the taper count, with $h=(K+1)/(T_B+1)$ for block length $T_B$.
- Blockwise estimates are assembled into a time-varying spectral estimate and then demeaned over time blocks before frequency-change testing.
- Sinusoidal tapers avoid the numerical eigenvalue decomposition required for Slepian tapers and can provide comparable concentration with lower local bias in the cited work.
- Choosing the number of blocks and tapers trades temporal resolution, frequency resolution, variance, and spectral leakage; the paper gives asymptotic guidance and discusses cross-validation.

## Important Papers

- [[Adaptive Frequency Band Learning of Nonstationary Functional Time Series: An Application to High-Dimensional EEG Signals]]
- Thomson (1982), "Spectrum estimation and harmonic analysis."
- Percival and Walden (1993), "Spectral Analysis for Physical Applications."
- Walden, McCoy, and Percival (1995), "The effective bandwidth of a multitaper spectral estimator."

## Related Concepts

- [[Functional Empirical Band Analysis]]
- [[Nonstationary Functional Time Series]]
- Spectral density
- Local stationarity
- Frequency-domain smoothing
