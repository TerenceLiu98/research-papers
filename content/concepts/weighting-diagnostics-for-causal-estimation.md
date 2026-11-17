---
title: Weighting Diagnostics for Causal Estimation
type: concept
aliases:
  - Causal Weight Diagnostics
definition: Diagnostics that assess information concentration, observation influence, extrapolation, and covariate balance through the explicit or implied weights of a causal estimator.
tags:
  - causal-inference
  - diagnostics
  - weighting
---

## Overview

A causal estimator expressed as a difference of normalized weighted outcome means exposes how observations contribute to its target contrast. Explicit propensity or matching weights and implied linear-regression weights can therefore support comparable diagnostics even when their estimation procedures differ.

## Key Ideas

- **Information concentration:** Within group $z$, $n_{\mathrm{eff}}^{(z)}=(\sum_i w_i)^2/\sum_i w_i^2$. For the two-group difference, the effective size is $n_{\mathrm{eff}}^{(1)}n_{\mathrm{eff}}^{(0)}/(n_{\mathrm{eff}}^{(1)}+n_{\mathrm{eff}}^{(0)})$. Its maximum is $n_1n_0/(n_1+n_0)$, not total sample size. The variance interpretation uses an equal-variance assumption.
- **Influence:** Representing the contrast as the treatment coefficient in bivariate weighted least squares enables a DFBETA diagnostic. This diagnoses the weighted representation; refitting every component of a matching or propensity procedure after deletion is a separate sensitivity exercise.
- **Extrapolation:** Negative implied regression weights indicate departure from convex averaging. The ratio of absolute negative weight mass to positive weight mass measures its extent separately for each arm.
- **Target balance:** ASMD compares weighted group means; TASMD compares a weighted group mean to the intended target mean. Agreement between groups need not imply agreement with the scientific target.
- **Distributional balance:** Weighted KS distances and QQ-plots reveal discrepancies beyond means, but require nonnegative weights. Regression can balance included covariate means by construction, making omitted transformations especially useful checks.
- **Identification remains separate:** Good diagnostics cannot establish ignorability. Model selection using outcome-free balance and weight diagnostics can reduce opportunities for outcome-driven specification search.

## Important Papers

- [[papers/what-to-observe-when-assuming-selection-on-observables|What to Observe When Assuming Selection on Observables]]: integrates these checks across regression, matching, and weighting with two political-science applications.
- Chattopadhyay and Zubizarreta (2023), “On the Implied Weights of Linear Regression for Causal Inference”: establishes regression-weight representations underlying these comparisons.

## Related Concepts

- [[concepts/individual-treatment-effects|Individual Treatment Effects]]: weight diagnostics for average contrasts do not identify individual counterfactual differences.
- [[concepts/implicit-importance-weighting-by-marginal-sampling|Implicit Importance Weighting by Marginal Sampling]]: another use of target-distribution reweighting, implemented through sampling rather than these explicit diagnostic weights.
