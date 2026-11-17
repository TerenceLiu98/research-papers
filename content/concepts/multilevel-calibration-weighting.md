---
title: Multilevel Calibration Weighting
type: concept
definition: Survey calibration that exactly balances first-order covariate margins while approximately balancing higher-order interactions, with regularization controlling weight dispersion.
tags:
  - survey-weighting
  - statistical-calibration
---

## Overview

Multilevel calibration weighting bridges marginal raking and full post-stratification. It retains exact marginal constraints while reducing discrepancies in interactions without requiring a respondent in every cross-classified population cell. The weights are independent of the outcome and can be reused across survey questions.

## Key Ideas

- **Structured balance:** Separate first-order margins from interactions of increasing order. Penalize interaction imbalance rather than imposing potentially infeasible exact constraints on every cell.
- **Balance versus precision:** Stronger balance can increase weight dispersion and lower effective sample size. Examine both quantities when selecting regularization.
- **Population information:** Interaction balancing requires joint population information beyond marginal totals. Estimated targets introduce additional uncertainty.
- **Outcome augmentation:** Double regression with post-stratification (DRP) corrects the weighted estimate using model predictions in cells that remain imbalanced. It is outcome-specific and may extrapolate beyond the original bounded weighting estimate.
- **Identification remains substantive:** Missingness at random within cells and positive response probabilities are assumptions, not consequences of successful calibration.

## Important Papers

- [[papers/multilevel-calibration-weighting-for-survey-data|Multilevel Calibration Weighting for Survey Data]]: develops the weighting optimization and DRP correction, with an application to 2016 election polling.

## Related Concepts

- [[concepts/iterative-proportional-fitting|Iterative Proportional Fitting]]: marginal raking is a baseline calibration strategy; multilevel calibration additionally targets interaction balance.
