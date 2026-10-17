---
title: Scheduling-Driven Price Forecasting
type: concept
aliases:
  - Scheduling-Aware Electricity Price Forecasting
tags:
  - electricity-price-forecasting
  - energy-cost-aware-scheduling
  - forecast-evaluation
---

## Overview

Scheduling-driven price forecasting selects forecasts for the quality of the operational schedules they induce. A scheduler commits to energy use using predicted prices, while realized expenditure depends on actual prices. Prediction error is therefore an intermediate measure: lower MSE need not imply lower electricity cost.

## Key Ideas

- **Evaluate the induced decision.** Optimize a feasible schedule using forecast prices, then price that schedule using observed prices. Compare with a schedule built using actual prices under the same constraints and objective.
- **Combine ranking and magnitude.** Cheap-period identification affects where energy-intensive tasks run; the magnitude of a missed price spike determines how costly a mistaken assignment becomes. Rank correlation alone does not distinguish cheap and expensive ranking mistakes.
- **Distinguish error directions.** Underestimated prices can attract work into expensive periods. Separating MAE into overestimation and underestimation components allows their different operational consequences to enter model selection.
- **Use task-sensitive proxies.** Joint estimation/ranking criteria can guide forecast tuning without repeatedly solving an expensive scheduling problem. Weights fitted to schedule costs remain conditional on the scheduling constraints, data, and metric scaling.
- **Preserve application differences.** Fixed-energy production scheduling and household scheduling with thermal losses, battery inefficiency, and comfort penalties respond differently to prices. Feedmill-derived metric weights need not remain best for households.
- **Keep direct-cost evidence local.** In the simplified feedmill experiment, tuning directly for schedule cost underperformed combined proxies. Forecasts with the same ranking can produce the same schedule despite different magnitude errors; that observation does not establish a universal disadvantage for direct decision-cost learning.

## Important Papers

- [[papers/analyzing-the-impact-of-electricity-price-forecasting-on-energy-cost-aware-scheduling|Analyzing the Impact of Electricity Price Forecasting on Energy Cost-Aware Scheduling]] compares joint magnitude/ranking proxies across two feedmill scenarios and home energy management. It reports improved mean costs but application-dependent weight transfer and statistical significance.
- Ifrim, O'Sullivan, and Simonis (2012), "Properties of energy-price forecasts for scheduling," is the preceding study cited by that paper for the mismatch between price-estimation error and schedule cost.

## Related Concepts

- [[concepts/multi-criteria-decision-making|Multi-Criteria Decision Making]] provides a broader perspective on normalizing and weighting multiple evaluation criteria. Here the weights are intended to predict downstream scheduling performance.
