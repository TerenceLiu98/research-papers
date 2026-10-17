---
title: Nash-Sutcliffe Efficiency
type: concept
aliases:
  - NSE
  - Nash-Sutcliffe Modelling Efficiency
tags:
  - evaluation-metrics
  - environmental-modelling
  - regression
---

## Overview

Nash-Sutcliffe efficiency evaluates predictions relative to the squared error obtained by predicting the observed mean. CarbonSense uses it alongside RMSE to compare carbon flux predictions across ecosystems with different target variability (Section 5.3, Equation 2).

## Key Ideas

For observed values $y_i$, predictions $\hat y_i$, and the mean $\bar y$ of the observations being evaluated,

$$
\mathrm{NSE}=1-\frac{\sum_i(y_i-\hat y_i)^2}{\sum_i(y_i-\bar y)^2}.
$$

- **Interpret the reference correctly.** NSE = 1 means zero prediction error, NSE = 0 matches the observed-mean predictor in squared error, and negative NSE is worse than that reference. Perfect correlation alone does not guarantee NSE = 1 because scale and offset errors still contribute to the numerator.
- **State the evaluation group.** The observations used for the reference mean and denominator determine the metric. Pooling observations across sites and averaging site-specific NSE values are different aggregations.
- **Retain absolute error measures.** NSE normalizes by target variation; RMSE retains target units. Together they distinguish small physical errors from errors that remain large relative to the signal.
- **Handle low variability cautiously.** The formula is undefined for a constant observed target and can become strongly negative when observed variation is small relative to prediction error. Negative scores have no finite lower bound.
- **Do not hide difficult groups.** CarbonSense reports water-body NSE of -11.0524 for XGBoost and -14.4010 for EcoPerceiver, despite considerably better scores in other ecosystems (Table 2). Its ablations exclude this class and therefore describe a different evaluation population.

## Important Papers

- [[papers/carbonsense-a-multimodal-dataset-and-baseline-for-carbon-flux-modelling|CarbonSense: A Multimodal Dataset and Baseline for Carbon Flux Modelling]] motivates ecosystem-specific NSE reporting and contrasts it with RMSE.
- McCuen, Knight, and Cutter (2006), "Evaluation of the Nash-Sutcliffe Efficiency Index," is the metric reference cited by CarbonSense (reference 31).

## Related Concepts

- [[concepts/data-driven-carbon-flux-modelling|Data-Driven Carbon Flux Modelling]] uses NSE to evaluate flux predictions relative to variability within an evaluation group.
