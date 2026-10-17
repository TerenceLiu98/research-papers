---
title: Discrete-Time Hawkes Processes
type: concept
aliases:
  - Discrete-Time Hawkes Process
  - DTHP
tags:
  - hawkes-processes
  - count-time-series
  - point-processes
---

## Overview

A discrete-time Hawkes process models counts in successive intervals through a background rate plus excitation from earlier counts. It is useful when observations are already aggregated into days or weeks and the timing of individual events is unavailable or unnecessary for the analysis. A temporal Poisson specification is

$$
Y_t\mid\mathcal H_{t-1}\sim\operatorname{Poisson}(\lambda_t),
\qquad
\lambda_t=\mu+\alpha\sum_{u\geq1}Y_{t-u}g(u),
$$

where $g$ is a nonnegative probability mass function over positive lags. Earlier high counts raise subsequent expected activity, with $g$ determining how that influence decays.

## Key Ideas

- **Baseline and excitation:** Background activity and history-dependent clustering are distinct model components. Spatially varying baselines can represent geographic heterogeneity even without cross-region triggering.
- **Finite memory:** A truncated, renormalized lag kernel reduces computation and sets a maximum excitation horizon. Observations preceding the fitting window supply history and reduce boundary effects.
- **Spatial extension:** Replacing the temporal sum with a sum over lags and source regions, weighted by a spatial kernel, permits events in one area to affect the modeled rate in another.
- **Observation model matters:** With structural-zero probability $\pi$, a zero-inflated Poisson model has conditional mean $(1-\pi)\lambda_t$, not $\lambda_t$. The ordinary temporal interpretation of $\alpha$ as mean offspring count cannot be transferred unchanged to models with zero inflation and unnormalized spatial weights.
- **Aggregation tradeoff:** Coarser intervals reduce sparsity and computational expense but exclude excitation between events within the same interval. This can inflate the fitted background component and delays responses to new observations until the next interval.
- **Interpretation and prediction:** Excitation represents dependence on event history, not automatically causal contagion. Forecasts driven only by that history can miss externally driven surges, as illustrated by the Bangladesh crisis case in Browning et al.

## Important Papers

- [[papers/bayesian-spatiotemporal-modelling-of-political-violence-and-conflict-events-using-discrete-time-hawkes-processes|Bayesian spatiotemporal modelling of political violence and conflict events using discrete-time Hawkes processes]]: combines ICAR regional baselines, zero-inflated counts, and optional spatial triggering for weekly ACLED data.
- Browning et al. (2021), "Simple discrete-time self-exciting models can describe complex dynamic processes: A case study of COVID-19": a temporal application cited by the conflict study.
- Browning, Rousseau, and Mengersen (2022), "A flexible, random histogram kernel for discrete-time Hawkes processes": a flexible-kernel approach cited by the conflict study.

## Related Concepts

- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: regional baseline dependence can coexist with explicit spatial excitation.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: focuses on flexible triggering-kernel inference and uncertainty.
- [[concepts/dynamic-hawkes-processes|Dynamic Hawkes Processes]]: an alternative construction with time-varying community responsiveness and transformed excitation time.
