---
title: Transferability Evaluation
type: concept
aliases:
  - Transfer-Gain Test
  - Sample-Efficiency Probe
tags:
  - transfer-learning
  - model-evaluation
  - sample-efficiency
---

## Overview

Transferability evaluation asks whether knowledge learned on a source task or dataset benefits a target task. Empirical comparisons can measure immediate zero-shot usefulness, gains after adaptation, or reductions in target-data requirements. These outcomes are related but do not establish the same claim.

## Key Ideas

For a lower-is-better error metric, compare a pretrained model with the same architecture initialized randomly under a specified adaptation regime:

$$
\Delta = \frac{E_{\mathrm{random}}-E_{\mathrm{pretrained}}}{E_{\mathrm{random}}},
\qquad E_{\mathrm{random}}>0.
$$

- **Control the comparison:** Use common target splits and comparable training budgets. A positive gain measures the advantage of pretrained initialization under that protocol, not superiority over other model families.
- **Separate zero-shot and trained controls:** A random model with no training is often a weak reference. Large zero-shot gains over that control can still accompany poor forecasts relative to a naive baseline.
- **Inspect learning curves:** Train both initializations on increasing amounts of target data. A lower data requirement to reach a specified error is evidence of sample efficiency. Gaps can shrink, persist, or reverse as more target data becomes available.
- **Distinguish history from sample count:** In time series, longer training windows also introduce different regimes. An apparent sample-efficiency gain need not arise from observation count alone.
- **Preserve evaluation independence:** Selecting hyperparameters or history lengths on the same outcomes later used to claim performance introduces selection concerns. Overlapping rolling test windows are dependent observations, and a practical gain threshold is not a significance test.
- **Check source exposure:** Pretraining on future or correlated evaluation data can confound claims of historical out-of-sample transfer.

## Important Papers

- [[papers/time-series-foundation-models-for-multivariate-financial-time-series-forecasting|Time Series Foundation Models for Multivariate Financial Time Series Forecasting]] operationalizes zero-shot and fine-tuned transfer gains alongside learning curves. Its TTM volatility results illustrate positive transfer gains despite stronger conventional benchmarks; its yield results show a much smaller gain with full target data.

## Related Concepts

- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: a setting in which reusable pretraining must be tested against both random initialization and practical forecasting baselines.
- [[concepts/linear-probing|Linear Probing]]: a complementary test of information accessible from frozen representations, with conclusions dependent on probe capacity.
