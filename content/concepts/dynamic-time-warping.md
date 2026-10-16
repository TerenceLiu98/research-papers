---
title: Dynamic Time Warping
type: concept
aliases:
  - DTW
tags:
  - time-series
  - sequence-alignment
  - analog-forecasting
---

## Overview

Dynamic Time Warping (DTW) compares ordered sequences by allowing nonlinear alignment along their time axes. Similar rises and falls can be matched even when they occur at different speeds or the sequences have different lengths. In analog forecasting, this alignment helps retrieve historical trajectories whose continuations supply candidate forecasts.

## Key Ideas

- **Alignment path:** Pairwise observation costs form a matrix. A constrained path through that matrix minimizes cumulative alignment cost while preserving temporal ordering and continuity.
- **Flexible timing:** Unlike index-by-index comparison, alignment can associate several observations in one sequence with observations in the other. This accommodates stretching and compression of time.
- **Smoothing changes shift sensitivity:** Soft-DTW replaces the minimum path cost with a log-sum-exp over paths. A shifted event can retain a zero-cost hard alignment while changing the number of low-cost paths. The STA dissimilarity paper bounds the resulting increase relative to self-alignment quadratically for its shift construction and sufficiently small positive smoothing. This is not a universal quadratic law or a metric guarantee.
- **Magnitude remains a separate choice:** Flexibility in timing does not by itself establish invariance to amplitude or comparability across substantive contexts. Representation and scaling choices affect which histories count as similar.
- **Retrieval is not prediction:** A low historical distance selects an analog; transferring its future requires the additional assumption that similar histories have informative continuations. Clustering several continuations can reduce dependence on an outlier match.
- **Forecast evaluation:** DTW can also compare predicted and realized trajectories when timing displacement is tolerated. That measures a different objective from exact month-by-month error.

## Important Papers

- [[papers/spatio-temporal-alignments-optimal-transport-through-space-and-time|Spatio-Temporal Alignments: Optimal transport through space and time]]: derives the conditional temporal-shift bound and combines Soft-DTW with a geometry-aware unbalanced transport cost.
- [[papers/accounting-for-variability-in-conflict-dynamics-a-pattern-based-predictive-model|Accounting for variability in conflict dynamics: A pattern-based predictive model]]: matches 10-month conflict-fatality inputs to 8-12-month historical sequences, then clusters their 12-month continuations. It also reports DTW evaluation as a robustness check.
- Keogh and Ratanamahatana (2005), "Exact indexing of dynamic time warping," *Knowledge and Information Systems* 7(3): 358-386: methodological reference cited by the Shape finder paper.

## Related Concepts

- [[concepts/spatiotemporal-analog-forecasting|Spatiotemporal Analog Forecasting]]: generalizes historical pattern retrieval to configurations with spatial structure; its three-dimensional ShapeFinder application uses optimal transport rather than DTW.
