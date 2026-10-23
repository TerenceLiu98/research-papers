---
title: Triple Differences
type: concept
aliases:
  - Difference-in-Difference-in-Differences
  - DDD
tags:
  - causal-inference
  - difference-in-differences
  - staggered-adoption
  - parallel-trends
---

## Overview

Triple differences (DDD) identifies a treatment effect by differencing outcome changes across two dimensions of untreated comparison. A canonical design requires both group-level policy enablement and unit-level eligibility for treatment. DDD can accommodate group-specific and eligibility-specific departures from ordinary parallel trends, but a numerical triple contrast is causal only under a corresponding DDD parallel-trends restriction.

## Key Ideas

- **Treatment has two criteria.** A unit becomes effectively treated only after its group enables treatment and if it belongs to the eligible partition. This distinguishes canonical DDD from analyses that merely compare heterogeneous DiD effects across subgroups.
- **The identifying restriction concerns a difference of trends.** Conditional on covariates, the eligible-ineligible difference in untreated outcome changes must match between the treated enabling cohort and a valid comparison cohort.
- **Covariates change the estimand construction.** When conditional adjustment is necessary, subtracting two independently adjusted DiD estimates generally integrates over the wrong covariate distribution. Valid adjustment targets the distribution of effectively treated units and can use regression adjustment, inverse probability weighting, or a doubly robust score.
- **Staggered comparisons remain cohort-specific.** Each cohort that has not enabled treatment by the outcome period may provide a separate comparison. Pooling all such cohorts can be biased when their eligibility composition or untreated trends differ, even though analogous pooling may be valid in ordinary staggered DiD.
- **Multiple valid comparisons create overidentification.** Separate cohort-specific estimates target the same group-time effect. Inverse-covariance GMM weighting can combine them for precision without treating the pooled cohort mixture as a single comparison group.
- **Diagnostics do not prove identification.** Event-study pre-trends can reveal some violations, but insignificant pre-treatment estimates do not establish no anticipation, overlap, or conditional DDD parallel trends. This parallels the caution behind [[concepts/honest-event-study-inference|Honest Event-Study Inference]].

## Important Papers

- [[papers/better-understanding-triple-differences-estimators|Better Understanding Triple Differences Estimators]] (Ortiz-Villavicencio and Sant'Anna, 2025): develops covariate-adjusted and staggered DDD identification, doubly robust estimation, and efficient combination of comparison cohorts.
- Olden and Moen (2022), "The Triple Difference Estimator": studies the canonical two-period DDD contrast and its interpretation as a difference between two DiDs.
- Strezhnev (2023), "Decomposing Triple-Differences Regression under Staggered Adoption": shows how heterogeneous effects complicate three-way fixed-effects DDD regressions.
- Gruber (1994), "The Incidence of Mandated Maternity Benefits": an influential early empirical application of the design.

## Related Concepts

- [[concepts/stacked-event-studies|Stacked Event Studies]]: constructs cohort-specific comparisons under staggered adoption, though DDD adds an eligibility dimension and distinct pooling restrictions.
- [[concepts/causal-overlap|Causal Overlap]]: requires comparable covariate support across the enabling-by-eligibility cells used by DDD.
- [[concepts/factorial-difference-in-differences|Factorial Difference-in-Differences]]: separates observed effect modification from causal moderation in a different multi-factor design.
- [[concepts/distributional-difference-in-differences|Distributional Difference-in-Differences]]: targets changes in outcome distributions rather than adding a third differencing dimension.
