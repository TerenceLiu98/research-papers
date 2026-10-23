---
title: Honest Event Study Inference
type: concept
aliases:
  - Honest Event Study Plots
tags:
  - causal-inference
  - difference-in-differences
  - event-studies
  - sensitivity-analysis
---

## Overview

Honest event-study inference evaluates a path of event-time estimates against an explicit band of plausible identifying bias rather than treating zero as the only benchmark. It combines simultaneous inference across event time with separate pre-treatment and post-treatment questions: whether the proposed bias band is empirically compatible with pre-treatment behavior, and whether post-treatment estimates remain relevant after allowing for that bias.

## Key Ideas

- **A reference band encodes tolerated bias.** Its bounds may represent plausible treatment anticipation, differential trends, or both. Choosing the band is a substantive modeling decision, not a result delivered by the event-study estimator alone.
- **Pre-treatment analysis is an equivalence test.** The null is that the event-time path leaves the reference band somewhere. Validation requires an infimum-based simultaneous confidence band to lie inside the reference band throughout the chosen pre-anticipation interval.
- **Post-treatment analysis is a relevance test.** A treatment effect is detected where a supremum-based simultaneous confidence band and the reference band do not intersect.
- **Non-rejection has limited meaning.** Failure to validate a band does not prove it invalid, just as insignificant conventional pre-trends do not establish parallel trends.
- **Validation does not extrapolate automatically.** Compatibility before treatment does not guarantee that the same bias restriction holds afterward.
- **Band width trades validation against power.** A wide band is easier to validate but makes it harder to distinguish post-treatment effects from plausible bias.

## Important Papers

- [[papers/making-event-study-plots-honest|Making Event Study Plots Honest: A Functional Data Approach to Causal Inference]] (Fang and Liebl, 2025): develops the functional estimator, reference-band tests, and honest event-study plot.
- Rambachan and Roth (2023), "A More Credible Approach to Parallel Trends": develops robust DiD inference and sensitivity analysis under bounded departures from parallel trends.
- Dette and Schumann (2024), "Testing for Equivalence of Pre-Trends in Difference-in-Differences Estimation": formalizes equivalence testing for pre-trends.

## Related Concepts

- [[concepts/simultaneous-confidence-bands|Simultaneous Confidence Bands]]: control uncertainty over an event-time path rather than separately at each time.
- [[concepts/stacked-event-studies|Stacked Event Studies]]: addresses comparison construction with staggered timing; it does not by itself validate parallel trends.
- [[concepts/factorial-difference-in-differences|Factorial Difference-in-Differences]]: likewise separates the numerical DiD contrast from the assumptions needed for a causal interpretation.
