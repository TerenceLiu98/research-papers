---
title: Ordinal-Scale Sensitivity Analysis
type: concept
aliases:
  - Sensitivity to Cardinal Treatment of Ordinal Variables
definition: "Ordinal-scale sensitivity analysis examines how empirical conclusions change when ordered outcome categories receive alternative numerical scores that preserve their ordering."
tags:
  - ordinal-measurement
  - sensitivity-analysis
  - partial-identification
---

## Overview

Ordinal measurements identify order without identifying distances between categories. Regression on consecutive integer scores adds assumptions about those distances. Sensitivity analysis varies the scores while preserving order, separating conclusions supported by ranking information from those dependent on a particular scoring convention.

## Key Ideas

- **Different robustness targets:** Stable coefficient signs do not guarantee stable magnitudes or statistical significance.
- **Specification matters:** Re-estimate the full model, including controls and instruments where applicable. Bivariate sign diagnostics need not settle robustness in a multivariate specification.
- **Transformation families:** Power transformations explore globally concave and convex scoring; CDF transformations explore shapes with an inflection point. Neither alone spans all increasing transformations.
- **Conditional effect sets:** Collecting estimates over a specified family relaxes a single scoring assumption. Narrower plausible ranges yield tighter sets by imposing stronger substantive restrictions.
- **Two uncertainties:** Sampling uncertainty under a given scoring rule and sensitivity across scoring rules answer different questions.

## Important Papers

[[papers/how-much-does-the-cardinal-treatment-of-ordinal-variables-matter-an-empirical-investigation|Bloem (2022)]] develops a practical transformation-based procedure and illustrates why sign, magnitude, and significance must be evaluated separately in trust, well-being, and test-score applications.

## Related Concepts

[[concepts/item-response-theory|Item Response Theory]] can supply item-level evidence about how test performance relates to latent ability, helping motivate plausible transformations without making score intervals automatically cardinal.
