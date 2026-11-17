---
title: Lee Trimming Bounds
type: concept
aliases:
  - Trimming Bounds
  - Lee Bounds
definition: "Lee trimming bounds bound treatment effects among units whose outcomes would be observed under either treatment status by trimming the observed outcome distribution in the arm with higher response under monotonic selection."
tags:
  - causal-inference
  - partial-identification
  - missing-data
---

## Overview

Lee trimming bounds address outcome selection affected by treatment without requiring missingness to be independent of outcomes. The target is the effect among always-responders, the principal stratum with observable outcomes under both assignments.

## Key Ideas

- Under randomized assignment and selection that weakly increases for every unit, control responders are always-responders. Treated responders mix always-responders and treatment-only responders.
- The ratio of control to treatment response rates identifies the always-responder fraction among treated responders. Keeping that fraction from either outcome tail gives lower and upper treated means, from which the control responder mean is subtracted.
- Covariate-specific trimming can tighten bounds. Aggregation must reflect the covariate distribution of always-responders rather than equally weighting conditional effects.
- Conditional monotonicity permits the selection direction to vary across covariate values but rules out both directions coexisting at the same value. The arm to trim changes with that direction.
- Identification uncertainty and sampling uncertainty differ: estimated bound endpoints are not themselves a confidence interval.

## Important Papers

- Lee (2009), “Training, Wages, and Sample Selection: Estimating Sharp Bounds on Treatment Effects”: original construction, as discussed in the paper below.
- [[papers/generalizing-trimming-bounds-for-endogenously-missing-outcome-data-using-random-forests|Generalizing Trimming Bounds for Endogenously Missing Outcome Data Using Random Forests]]: uses forests for covariate adjustment and conditional monotonicity with orthogonalized inference.

## Related Concepts

- [[concepts/double-machine-learning|Double Machine Learning]]: orthogonalization and cross-fitting support inference when nuisance response probabilities and trimming thresholds are learned flexibly.
