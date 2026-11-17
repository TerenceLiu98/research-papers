---
title: Logit Shift Recalibration
type: concept
aliases:
  - Logit Shift
  - Intercept Shift Recalibration
definition: 'Logit shift recalibration adds a common offset to binary prediction logits so that the adjusted probabilities sum to a known aggregate count.'
tags:
  - probability-calibration
  - election-prediction
---

## Overview

Logit shift recalibration reconciles individual binary probabilities with an observed aggregate total. It applies to probabilities from any predictive model, even though it can be interpreted as changing a logistic regression intercept while keeping other coefficients fixed.

## Key Ideas

- **One aggregate constraint.** Choose a common offset so that adjusted probabilities sum to the observed count. The sum is monotone in the offset, making scalar root finding practical.
- **Conditional interpretation.** Under independent Bernoulli sampling, the adjustment approximates individual probabilities conditional on the total. Rosenman, McCartan, and Olivella bound its large-sample error by the inverse aggregate variance.
- **Ranking is preserved.** All probabilities move in the same direction. Opposing subgroup biases cannot both be corrected by one common shift.
- **Aggregate agreement is limited evidence.** Correcting the total does not identify the individual probability distribution. If the initial sum already matches the target, the offset is zero even when the scores have the wrong shape.
- **Aggregation matters.** Smaller, more homogeneous units can reduce heterogeneous errors, but sufficiently large aggregate variance remains important for the approximation.

## Important Papers

- [[papers/recalibration-of-predicted-probabilities-using-the-logit-shift|Rosenman, McCartan, and Olivella (2023)]]: derives the conditional interpretation, establishes approximation bounds, and demonstrates failures under heterogeneous bias and distributional misspecification.

## Related Concepts

- [[concepts/probability-calibration|Probability Calibration]]: the broader objective; matching an aggregate count does not guarantee individual or subgroup calibration.
