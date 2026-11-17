---
title: Regression Discontinuity Design
type: concept
aliases:
  - RDD
  - RD Design
definition: "A causal research design that uses a treatment-assignment threshold in a running variable to identify a local treatment effect under appropriate continuity assumptions."
tags:
  - causal-inference
  - regression-discontinuity
---

## Overview

A sharp regression discontinuity design assigns treatment according to whether a running variable crosses a known cutoff. If potential-outcome conditional expectations are continuous there, the outcome discontinuity identifies the average treatment effect at that cutoff.

## Key Ideas

- Identification is local: effects at the cutoff need not generalize to units far from it.
- Local polynomial estimation requires choices about bandwidth, polynomial degree, and observation weights. Curvature near the cutoff can make these choices consequential.
- Mean-squared-error-optimal bandwidths target point estimation. Coverage-error-rate-optimal bandwidths target confidence-interval accuracy for the associated inference procedure.
- Robust bias correction estimates and subtracts smoothing bias while incorporating the additional estimation uncertainty into inference. Merely narrowing a bandwidth is not equivalent.
- Random assignment at an exact electoral tie can supply a benchmark at the relevant cutoff. Such comparisons still involve uncertainty in both estimates.

Equivalence-based diagnostics ask whether covariate discontinuities and density ratios are substantively close to continuity. Nonrejection of an equality null alone does not supply that evidence; see [[concepts/equivalence-testing|Equivalence Testing]].

Close-election assignment can jointly change party identity and legislative majority status. Pooling control regimes need not isolate a pure partisan effect; separating the two requires additional assumptions and variation in chamber control.

## Important Papers

- [[papers/when-can-we-trust-regression-discontinuity-design-estimates-from-close-elections|When Can We Trust Regression Discontinuity Design Estimates from Close Elections? Evidence from Experimental Benchmarks]]: lottery evidence from Colombia and Finland shows why curvature and inferential choices matter.
- Calonico, Cattaneo, and Titiunik (2014), *Robust Nonparametric Confidence Intervals for Regression-Discontinuity Designs*: bias correction with uncertainty-aware inference, as discussed in the benchmark study.

- [[papers/equivalence-testing-for-regression-discontinuity-designs|Equivalence Testing for Regression Discontinuity Designs]]: develops covariate and density diagnostics that test a null of substantively consequential discrepancy.

- [[papers/the-role-of-majority-status-in-close-election-studies|The Role of Majority Status in Close Election Studies]]: distinguishes partisan effects from majority-status effects and proposes adjustment under nationally determined chamber control.

## Related Concepts

- [[concepts/electoral-closeness-in-proportional-representation|Electoral Closeness in Proportional Representation]]: constructing an electoral running variable is a measurement task distinct from establishing continuity at its cutoff.
