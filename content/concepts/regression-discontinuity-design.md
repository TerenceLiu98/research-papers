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

## Important Papers

- [[papers/when-can-we-trust-regression-discontinuity-design-estimates-from-close-elections|When Can We Trust Regression Discontinuity Design Estimates from Close Elections? Evidence from Experimental Benchmarks]]: lottery evidence from Colombia and Finland shows why curvature and inferential choices matter.
- Calonico, Cattaneo, and Titiunik (2014), *Robust Nonparametric Confidence Intervals for Regression-Discontinuity Designs*: bias correction with uncertainty-aware inference, as discussed in the benchmark study.

## Related Concepts

- [[concepts/electoral-closeness-in-proportional-representation|Electoral Closeness in Proportional Representation]]: constructing an electoral running variable is a measurement task distinct from establishing continuity at its cutoff.
