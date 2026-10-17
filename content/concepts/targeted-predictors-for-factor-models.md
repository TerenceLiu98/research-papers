---
title: Targeted Predictors for Factor Models
type: concept
aliases:
  - Targeted Predictor Preselection
tags:
  - factor-models
  - variable-selection
  - nowcasting
---

## Overview

Targeted predictors are a supervised subset of an indicator panel selected before estimating a factor model. Screening uses the prediction target to identify useful inputs; factors are then extracted from those inputs. This can reduce contamination from irrelevant indicators and cross-correlated idiosyncratic noise that broad, unsupervised factor extraction may retain.

## Key Ideas

- **Screen before factor extraction.** Soft-thresholding approaches use elastic net or LASSO to retain predictors with nonzero coefficients. Hard-thresholding alternatives screen individual regressions by a significance threshold.
- **Validate the complete prediction procedure.** The best predictor subset for a linear screening regression need not be best for the subsequent factor model. Candidate sets can instead be ranked by historical errors from the final forecast or nowcast procedure.
- **Preserve the information set.** Mixed-frequency screening requires alignment, such as aggregation or within-quarter blocking. The final model can still use the original mixed-frequency series and their available releases. Historical validation should reproduce release delays.
- **Balance adaptability and stability.** A fixed subset size constrains selection, while data-driven tuning can adapt to the panel and target. Repeated selection can be unstable, especially when linear screening approximates complex factor dynamics.
- **Prediction is distinct from recovery.** A subset can improve finite-sample forecast accuracy without recovering all variables from the target's generating process. Good forecasts do not establish causal relevance of selected predictors.
- **More indicators need not help.** An expanding pool of irrelevant variables can degrade both screening and factor estimation. Accuracy gains depend on the data-generating process, noise level, and validation design.

## Important Papers

- Bai and Ng (2008), "Forecasting Economic Time Series Using Targeted Predictors": introduces hard and soft thresholding for targeted factor forecasting, as described in the paper below.
- [[papers/predictor-preselection-for-mixed-frequency-dynamic-factor-models|Predictor Preselection for Mixed-Frequency Dynamic Factor Models: A Simulation Study With an Empirical Application to GDP Nowcasting]]: compares elastic-net tuning strategies and proposes ranking candidate subsets by a preceding-quarter DFM nowcast error with release delays imposed.

## Related Concepts

- [[concepts/factor-augmented-sparse-regression|Factor-Augmented Sparse Regression]]: retains sparse individual effects alongside factors in the final prediction equation; preselection instead changes the panel used to estimate factors.
- [[concepts/midas-regression|MIDAS Regression]]: represents higher-frequency predictors for lower-frequency targets; within-quarter blocking also provides inputs for mixed-frequency screening.
- [[concepts/forecast-combination|Forecast Combination]]: pools predictions from separate models, offering another way to use a large information set without fitting one crowded factor model.
