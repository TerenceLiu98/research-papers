---
title: Discordant Identical-Twin Design
type: concept
aliases:
  - Discordant MZ-Twin Method
  - Discordant Twin Design
definition: "A within-pair observational design comparing identical twins who differ in an exposure to remove confounding by genetic and environmental factors shared within pairs."
tags:
  - causal-inference
  - twin-studies
---

## Overview

Discordant identical-twin designs estimate exposure–outcome associations using differences between genetically identical twins. Pair fixed effects absorb shared familial factors. Unlike heritability decomposition, the aim is to investigate exposure associations after removing shared sources of confounding.

## Key Ideas

- Identification uses exposure differences within pairs; shared characteristics cannot have separately estimated effects.
- Removing shared variation usually reduces precision. Aggregating related outcomes can help, provided their dependence enters uncertainty calculations.
- Nonshared confounders and inter-twin influence can still undermine causal interpretation.
- Random measurement error may become more consequential when true within-pair exposure variation is small.
- A smaller within-pair association is informative about specification sensitivity, but does not by itself identify how much of the original association was causal.

## Important Papers

- [[papers/quantifying-bias-from-measurable-and-unmeasurable-confounders|Quantifying Bias from Measurable and Unmeasurable Confounders Across Three Domains of Individual Determinants of Political Preferences]]: aggregates comparisons across 34 preference outcomes to assess residual familial confounding.
- Vitaro, Brendgen, and Arseneault (2009), “The Discordant MZ-Twin Method: One Step Closer to the Holy Grail of Causality”: methodological reference discussed in the application above.

## Related Concepts

- [[concepts/within-and-between-cluster-covariate-effects|Within- and Between-Cluster Covariate Effects]]: twin pairs define the clusters used for within-cluster comparisons.
- [[concepts/bayesian-sensitivity-analysis|Bayesian Sensitivity Analysis]]: represents uncertainty about confounding that a design may leave unresolved.
