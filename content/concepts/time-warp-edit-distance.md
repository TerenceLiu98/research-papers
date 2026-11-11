---
title: Time Warp Edit Distance
type: concept
aliases:
  - TWED
  - Soft-TWED
tags:
  - time-series
  - sequence-alignment
---

## Overview

Time Warp Edit Distance (TWED) compares time series through temporal alignment and edit operations. A deletion penalty and temporal stiffness parameter control the cost of discarding observations and shifting matches. With the appropriate metric local costs and parameter conditions, it supplies a metric alternative to DTW.

## Key Ideas

- Dynamic programming chooses between matching observations and deleting from either sequence, including local transition costs.
- Stiffness controls temporal flexibility; it does not imply unrestricted invariance to time deformation.
- Soft-TWED replaces each hard minimum with a log-sum-exp soft minimum. Forward and backward recursions enable gradient-based learning when the local costs are differentiable. The smoothed objective should not automatically be assigned the metric properties of hard TWED.
- A learned ideal waveform can be ranked against observations using TWED, turning pairwise preferences into an interpretable prototype model.

## Important Papers

- Marteau (2009), “Time Warp Edit Distance with Stiffness Adjustment for Time Series Matching”: introduces TWED; cited by the ranking paper.
- [[papers/ranking-time-series-using-a-time-warping-ideal-point-model|Ranking Time Series using a Time Warping Ideal Point Model]]: establishes Lipschitz bounds, introduces soft-TWED, and learns ideals from comparisons.

## Related Concepts

- [[concepts/dynamic-time-warping|Dynamic Time Warping]]
- [[concepts/preference-based-metric-learning|Preference-Based Metric Learning]]
