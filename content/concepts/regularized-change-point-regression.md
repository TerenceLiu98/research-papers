---
title: Regularized Change-Point Regression
type: concept
aliases:
  - Shrinkage Change-Point Regression
definition: Regression that jointly estimates temporal regime boundaries and regularized regime-specific coefficients to stabilize inference within segmented samples.
tags:
  - change-point-detection
  - regularization
  - bayesian-inference
---

## Overview

Regularized change-point regression combines temporal segmentation with coefficient shrinkage. A design that is estimable in the full sample may become rank deficient within a short regime; regularizing the segmented regressions addresses this problem while joint inference represents uncertainty about boundary locations.

## Key Ideas

- Segmentation and regression depend on each other: coefficient estimates determine plausible breaks, and breaks determine the observations available for each regression.
- Bayesian shrinkage can stabilize many regime-specific coefficients without setting them exactly to zero. Sparse posterior summaries are a separate decision step.
- Forward-moving hidden Markov states represent successive, nonrecurring regimes. This is a different temporal assumption from recurrent switching.
- Predictive criteria may reward extra segments. Compare state probabilities and coefficient trajectories to identify redundant short regimes.
- Shared boundaries are a modeling restriction. They do not precisely recover distinct break times for individual coefficients.

## Important Papers

- [[papers/change-point-detection-and-regularization-in-time-series-cross-sectional-data-analysis|Change-Point Detection and Regularization in Time Series Cross-Sectional Data Analysis]]: combines Bayesian bridge shrinkage, hidden-state segmentation, and optional DSS summaries for fixed-effects panel regression.

## Related Concepts

- [[concepts/asynchronous-change-point-detection|Asynchronous Change-Point Detection]]: permits differing break locations across series.
- [[concepts/continuous-time-poisson-change-point-detection|Continuous-Time Poisson Change-Point Detection]]: addresses segmentation of event intensities, with regularization preventing collapsed segments rather than high-dimensional regression instability.
