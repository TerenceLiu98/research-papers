---
title: "Schoenfeld Residual Proportional Hazards Tests"
type: concept
aliases:
  - Schoenfeld-Based PH Tests
  - Grambsch–Therneau Test
definition: "Diagnostics for Cox models that assess proportional hazards by testing whether scaled Schoenfeld residuals vary systematically with a function of event time."
tags:
  - survival-analysis
  - model-diagnostics
---

## Overview

A Cox proportional hazards model assumes that a covariate’s multiplicative effect on the baseline hazard is constant over time. Schoenfeld-based diagnostics assess departures from this assumption through the relationship between scaled covariate-specific residuals and a chosen transformation of time.

## Key Ideas

- A rejection provides evidence of nonproportionality, but does not uniquely identify a genuinely time-varying covariate effect: omitted terms and functional-form errors can also affect the diagnostic.
- The full Grambsch–Therneau score test and its computational approximation can behave differently. Implementation details therefore matter for interpreting simulation evidence.
- Test size and power answer different questions. Average p-values alone do not measure false-positive frequency or the probability of detecting a violation.
- Correcting a quadratic term or interaction does not itself correct a time-varying coefficient. These are separate aspects of model specification.

## Important Papers

- Grambsch and Therneau (1994), “Proportional Hazards Tests and Diagnostics Based on Weighted Residuals” — develops the diagnostic framework.
- [[papers/proportionally-less-difficult-reevaluating-keeles-proportionally-difficult|Metzger (2023)]] — demonstrates calculation-dependent size and power under omitted quadratic and interaction terms; its results do not establish general immunity to misspecification.

## Related Concepts

Time-varying coefficients describe effects that change with duration; functional-form misspecification concerns how covariates enter the model. Both are relevant to interpreting a rejection, but they are not equivalent explanations.
