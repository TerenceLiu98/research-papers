---
title: Forecast Combination
type: concept
aliases:
  - Forecast Averaging
tags:
  - forecasting
  - model-averaging
  - covariance-estimation
---

## Overview

Forecast combination pools several predictions of the same target. Its value depends on both individual predictive accuracy and dependence among errors: numerous nearly redundant forecasts do not supply the same information as complementary forecasts.

## Key Ideas

For unbiased forecast errors with positive-definite covariance $\Omega$, the minimum-variance weights subject to $\mathbf 1^\top\mathbf w=1$ are

$$
\mathbf w=\frac{\Omega^{-1}\mathbf 1}{\mathbf 1^\top\Omega^{-1}\mathbf 1}.
$$

- The sum-to-one constraint does not ensure nonnegative weights. Minimum variance coincides with minimum mean squared error under the unbiased-error assumption.
- A sample covariance becomes singular when there are too many forecasts relative to observed errors. Linear shrinkage combines it with a structured target to make estimation feasible and more stable.
- A constant-correlation target can retain different marginal error variances. Equal weighting follows under additional symmetry conditions; it is not a general consequence of shrinkage.
- Weights estimated from past out-of-sample errors target predictive performance. In-sample likelihood weights instead reflect historical fit and can favor indicators that arrive too late to help early nowcasts.
- Weight estimation should match forecast horizon and available information. In the GDP application, survey indicators help early nowcasts, while production indicators gain relevance as observations arrive.
- Dynamic model averaging recursively discounts older model probabilities and updates horizon-specific weights from recent forecast performance. It can adapt to model instability, but its behavior depends on the chosen forgetting factor and the diversity of the candidate models.
- Distribution-based aggregation can use contemporaneous disagreement as a signal of changing information relevance. PRISM-Now's dynamic quantile selection adjusts the aggregation quantile using changes in the ensemble mean and dispersion plus asymmetry; this requires reliable model diversity and does not by itself calibrate outcome probabilities.

## Important Papers

- [[papers/nowcasting-gdp-with-a-pool-of-factor-models-and-a-fast-estimation-algorithm|Nowcasting GDP with a Pool of Factor Models and a Fast Estimation Algorithm]]: uses horizon-specific dynamic model averaging over 49,152 factor specifications and interprets summed model weights as time-varying indicator importance.
- [[papers/point-and-risk-estimation-using-an-ensemble-of-models-for-nowcasting-prism-now|PRISM-Now]]: combines heterogeneous Korean GDP forecasts through a fitted cross-model distribution and a dynamic quantile rule, with the largest gains during the COVID period.
- [[papers/nowcasting-monthly-gdp-with-big-data-a-model-averaging-approach|Nowcasting monthly GDP with big data: A model averaging approach]]: applies shrinkage error-covariance weights to hundreds of bivariate GDP models.
- Newbold and Granger (1974), "Experience with Forecasting Univariate Time Series and the Combination of Forecasts": theoretical antecedent cited in the GDP paper's combination argument.
- Ledoit and Wolf (2004), "Honey, I Shrunk the Sample Covariance Matrix": covariance regularization used by the GDP application.

## Related Concepts

- [[concepts/dynamic-quantile-selection|Dynamic Quantile Selection]]: adapts a forecast quantile to distributional changes instead of assigning performance-based weights to individual models.
- [[concepts/temporal-disaggregation|Temporal Disaggregation]]: combining latent monthly paths can retain their observed quarterly totals when weights satisfy the appropriate constraints.
- [[concepts/mixed-frequency-dynamic-factor-models|Mixed-Frequency Dynamic Factor Models]]: a model family that can be pooled across predictor subsets and factor dimensions.
