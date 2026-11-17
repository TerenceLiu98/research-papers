---
title: Shewhart Control Charts
type: concept
aliases:
  - Shewhart Chart
  - Shewhart Monitoring
definition: Control charts that flag a monitored statistic when it departs from a reference center by more than a specified multiple of its reference standard deviation.
tags:
  - statistical-process-monitoring
  - change-point-detection
---

## Overview

Shewhart control charts compare successive statistics with a tolerance region around a reference center. Their usefulness depends on how stable variation is calibrated and how the center is updated after a signal.

## Key Ideas

- A common region is a reference center plus or minus three reference standard deviations. The reference distribution determines the width rather than the chronological extent of an analysis window.
- For regression monitoring, distinguish variability across calibration estimates from uncertainty in each individual coefficient estimate.
- A change signal can initiate a new regime by recentering the chart while retaining the calibrated width.
- Small or gradual shifts can motivate cumulative-sum or exponentially weighted moving-average monitoring instead.
- A threshold crossing is a detection rule; its false-positive behavior requires assessment under the intended data-generating process.

## Important Papers

- [[papers/a-permutation-based-changepoint-technique-for-monitoring-effect-sizes|A Permutation-Based Changepoint Technique for Monitoring Effect Sizes]]: calibrates chart width using random temporal subsamples and monitors regression coefficients, improving simulated change-count accuracy when changes exist while performing worse in the no-change setting.

## Related Concepts

- [[concepts/permutation-based-null-calibration|Permutation-Based Null Calibration]]: related way to obtain reference variation; temporal subsampling and exchangeable label permutations impose different constructions.
- [[concepts/regularized-change-point-regression|Regularized Change-Point Regression]]: estimates coefficient regimes jointly rather than detecting departures in a pre-estimated coefficient sequence.
