---
title: Median-of-Means
type: concept
aliases:
  - MoM Estimator
tags:
  - robust-statistics
  - ensemble-estimation
---

## Overview

Median-of-means estimates a central value by partitioning samples into groups, averaging within each group, and taking the median across group means. It combines averaging with resistance to unusually large group-level deviations.

## Key Ideas

- Group means use multiple observations; the median reduces the influence of extreme group means.
- Group size and number determine the aggregation procedure and should be reported for reproducibility.
- SimDif repeats the procedure with shuffled partitions and averages the resulting medians to aggregate diffusion forecast samples.
- Robust aggregation cannot repair systematic forecast bias by itself. Its forecasting value must be evaluated against ordinary averaging and single-sample prediction.
- SimDif refers to finite-sample theoretical guarantees in an appendix not present in the supplied source; those guarantees are not reproduced here.

## Important Papers

- [[papers/simdif-simpler-yet-better-diffusion-model-for-time-series-point-forecasting|SimDif]]: applies repeated median-of-means to generated trajectories, reporting lower MSE than ordinary averaging on four ablation datasets (Table 5).

## Related Concepts

- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time Series Forecasting]]: sampled predictive distributions can be aggregated into point forecasts.
- [[concepts/diffusion-models|Diffusion Models]]: stochastic denoising provides the samples aggregated in SimDif.
