---
title: Separation in Discrete Choice Models
type: concept
aliases:
  - Perfect Prediction in Discrete Choice Models
definition: Separation occurs when a linear combination of covariates perfectly predicts an outcome category, potentially preventing finite maximum likelihood estimates in discrete choice models.
tags:
  - statistical-estimation
  - discrete-choice
---

## Overview

Separation can arise in a finite sample even when the population parameters are finite. A likelihood can improve as a coefficient diverges, so numerical convergence need not establish a finite, well-behaved maximum likelihood estimate.

## Key Ideas

- Inflated estimates and standard errors depend on numerical tolerances and may undermine both power and false-positive control.
- Linear-programming diagnostics offer a more explicit check than judging whether coefficients look implausibly large.
- In strategic models, a distorted response probability can affect another player's utility estimates. Checks must account for the conditional samples and generated covariates used by the estimator.
- Penalized likelihood can stabilize estimation. Jeffreys penalties depend on the information matrix; density-based penalties offer alternatives when its curvature makes the logged determinant unusable.
- Reduced coefficient bias does not guarantee reduced probability bias. Penalty sensitivity and uncertainty calibration require separate attention.

## Important Papers

- [[papers/detecting-and-correcting-for-separation-in-strategic-choice-models|Detecting and Correcting for Separation in Strategic Choice Models]] extends diagnostics and corrections to two-player strategic models, with Monte Carlo and deterrence-replication evidence.

## Related Concepts

Penalized likelihood supplies additional information to regularize otherwise divergent estimates. Statistical backward induction propagates estimated response probabilities through a game tree, explaining why separation at a later decision can affect estimation of an earlier decision.
