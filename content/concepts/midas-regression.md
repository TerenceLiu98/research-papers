---
title: MIDAS Regression
type: concept
aliases:
  - Mixed Data Sampling Regression
tags:
  - time-series
  - mixed-frequency-data
  - nowcasting
---

## Overview

Mixed Data Sampling (MIDAS) regression predicts a low-frequency outcome using higher-frequency observations. A compact lag-weight function controls the number of coefficients while retaining information about when predictor observations occurred within the low-frequency period.

## Key Ideas

- In a linear dictionary implementation, approximate a lag-weight function by $\omega_k(u)\approx\sum_{d=1}^D\theta_{kd}w_d(u)$. Each predictor then contributes $D$ weighted features $x_{t,kd}=\sum_{j=1}^{m_k}w_d((j-1)/m_k)\tilde x_{t-(j-1)/m_k,k}$ rather than one free coefficient per high-frequency lag.
- The dictionary can use fixed Legendre polynomials; nonlinear MIDAS specifications instead estimate parameters of a nonlinear lag-weight family. These are different implementations of lag compression.
- Sparse-group regularization can select entire original series and coefficients within their lag-basis groups. This addresses the number of series as well as the number of lags.
- Factor augmentation can compress shared variation across series. Extracting factors after MIDAS weighting differs from extracting high-frequency factors first and then weighting their lags.
- Real-time nowcasting requires information sets that respect release dates and revisions. The number of available monthly or weekly lags changes with the forecast origin.
- Basis compression introduces approximation error. Increasing flexibility also increases estimation burden, especially with short low-frequency histories.

## Important Papers

- [[papers/factor-augmented-sparse-midas-regressions-with-an-application-to-nowcasting|Factor-Augmented Sparse MIDAS Regressions with an Application to Nowcasting]]: combines linear lag compression, PCA, and sparse-group LASSO for real-time GDP prediction.
- Babii, Ghysels, and Striaukas (2022), "Machine Learning Time Series Regressions with an Application to Nowcasting": sparse-group MIDAS foundation cited by the factor-augmented paper.
- Andreou, Ghysels, and Kourtellos (2010), "Regression Models with Mixed Sampling Frequencies": mixed-frequency regression reference cited by the same paper.

## Related Concepts

- [[concepts/factor-augmented-sparse-regression|Factor-Augmented Sparse Regression]]: combines common-factor and individual-predictor signals after lag compression.
- [[concepts/temporal-disaggregation|Temporal Disaggregation]]: reconstructs a higher-frequency target under aggregation constraints; MIDAS can directly predict the low-frequency outcome without recovering that latent path.
- [[concepts/forecast-combination|Forecast Combination]]: pools predictions from separate models, including mixed-frequency specifications.
