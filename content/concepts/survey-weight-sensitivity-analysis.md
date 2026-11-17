---
title: Survey Weight Sensitivity Analysis
type: concept
aliases:
  - Sensitivity Analysis for Survey Weighting
definition: Analysis of how omitted selection-related variables or omitted covariate features could change population estimates obtained from weighted survey responses.
tags:
  - survey-weighting
  - sensitivity-analysis
---

## Overview

Survey weight sensitivity analysis evaluates robustness to residual selection bias after weighting on recorded covariates. It asks how estimates would change if ideal weights also accounted for omitted determinants of response and outcomes. The target is typically a population mean rather than a causal treatment contrast.

## Key Ideas

- **Partial observation:** When a variable is recorded in the survey but unavailable in population data, vary its assumed population moments and recalibrate the weights.
- **Full nonobservation:** Parameterize the discrepancy between estimated and ideal weights through its variance relative to ideal-weight variance and its correlation with the outcome.
- **Joint drivers:** Residual imbalance creates bias only when weight error also aligns with outcomes. Weight and outcome variability scale the resulting sensitivity.
- **Substantive thresholds:** Robustness values summarize the strength needed to reach a specified conclusion-changing threshold; contour plots retain the full two-parameter tradeoff.
- **Benchmarks:** Omitting measured covariates from weight estimation supplies reference strengths. Benchmarks require contextual interpretation and do not certify that unobserved selection is harmless.
- **Uncertainty:** Robustness of a point estimate's direction is distinct from statistical significance or uncertainty about the sensitivity parameters.

## Important Papers

- [[papers/sensitivity-analysis-for-survey-weights|Sensitivity Analysis for Survey Weights]]: develops partially observed and fully unobserved confounder analyses, with applications to 2020 state election polls.

## Related Concepts

- [[concepts/iterative-proportional-fitting|Iterative Proportional Fitting]]: calibrates survey weights to specified margins, including hypothetical population moments.
- [[concepts/weighting-diagnostics-for-causal-estimation|Weighting Diagnostics for Causal Estimation]]: diagnoses observed balance, concentration, and influence; sensitivity analysis addresses departures from identifying assumptions.
- [[concepts/bayesian-sensitivity-analysis|Bayesian Sensitivity Analysis]]: assigns distributions to assumption departures rather than only evaluating a grid of posited values.
