---
title: Nonstationary Functional Time Series
type: concept
aliases:
  - Locally Stationary Functional Time Series
tags:
  - functional-data-analysis
  - time-series
  - nonstationary-processes
  - spectral-analysis
---

## Overview

A nonstationary functional time series is a sequence of random functions whose dependence structure changes over time. Local stationarity models a finite series as locally approximated by stationary functional processes, allowing a time-varying spectral density to describe evolving second-order behavior.

## Key Ideas

- Each observation is a function on a spatial or temporal domain, so the data are high-dimensional while retaining smooth structure that ordinary multivariate models may ignore.
- Local stationarity represents changing dynamics through a smoothly varying rescaled time $u \in [0,1]$ and a time-varying spectral density kernel $f_{u,\omega}$.
- Functional frequency-domain analysis must account for dependence across domain locations as well as dependence across time and frequency.
- Demeaning or detrending before spectral analysis targets second-order dynamics without changing the main spectral object under the paper's assumptions.
- Frequency-band summaries can reduce computational cost, but fixed partitions may hide localized or synchronized changes in the spectral dynamics.
- In high-dimensional EEG, each time point can be viewed as a spatial field over the scalp sampled at electrode locations, making functional modeling a natural representation.

## Important Papers

- [[Adaptive Frequency Band Learning of Nonstationary Functional Time Series: An Application to High-Dimensional EEG Signals]]
- van Delft and Eichler (2018), "Locally stationary functional time series."
- Panaretos and Tavakoli (2013), "Fourier analysis of stationary time series in function space."
- van Delft, Characiejus, and Dette (2021), "A nonparametric test for stationarity in functional time series."
- Horvath, Liu, Rice, and Wang (2020), "A functional time series analysis of forward curves derived from commodity futures."

## Related Concepts

- [[Functional Empirical Band Analysis]]
- [[Multitaper Spectral Estimation]]
- [[High-Dimensional EEG Signals]]
- Functional data analysis
- Local stationarity
- Time-varying spectral density
