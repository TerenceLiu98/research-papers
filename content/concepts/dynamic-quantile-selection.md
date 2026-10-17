---
title: Dynamic Quantile Selection
type: concept
aliases:
  - DQS
tags:
  - forecasting
  - forecast-combination
  - nowcasting
---

## Overview

Dynamic quantile selection aggregates model forecasts by choosing a quantile of their current cross-sectional distribution. In PRISM-Now, the selected quantile changes with ensemble location, dispersion, and asymmetry to make GDP predictions more responsive to changing information relevance.

## Key Ideas

- **Direction:** a change in the ensemble mean across target quarters, evaluated at the same information date, determines the direction of adjustment from the median.
- **Activation:** adjustment occurs only when ensemble standard deviation increases. Otherwise, the selected quantile is 0.5.
- **Strength:** rising dispersion and current variance scale the adjustment. An exponential term amplifies it when the mean change aligns with the mean-median difference and attenuates it when they oppose one another.
- **Distribution estimation:** PRISM-Now uses Model Ensemble Growth at Risk (ME-GaR) to approximate model forecasts with a skew-t family, matching empirical quantiles. DQS then evaluates the fitted quantile function at its chosen probability level.
- **Historical dependence:** the rule uses contemporaneous distributional signals, while its magnitude parameter is trained on the preceding three years. Base models also require training and screening.

The motivating mixture contains unobserved good and bad forecasts. Skewness alone cannot reveal which tail contains better estimates; DQS adds an assumption that good models respond more strongly to economic change. A diverse, reliable ensemble is therefore central to the method. Cross-model disagreement is not automatically a calibrated predictive distribution, and the heuristic does not guarantee that the selected quantile minimizes forecast loss.

## Important Papers

- [[papers/point-and-risk-estimation-using-an-ensemble-of-models-for-nowcasting-prism-now|PRISM-Now]]: introduces DQS and ME-GaR, reports Korean GDP point-forecast gains concentrated in the COVID period, and documents sensitivity to ensemble quality and economic regime.

## Related Concepts

- [[concepts/forecast-combination|Forecast Combination]]: broader framework for pooling predictions; DQS adapts the aggregation quantile rather than estimating individual model weights.
- [[concepts/probability-calibration|Probability Calibration]]: outcome-probability reliability requires validation beyond fitting the cross-model forecast distribution.
