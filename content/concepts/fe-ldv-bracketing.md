---
title: FE–LDV Bracketing
type: concept
aliases:
  - Fixed-Effects and Lagged-Dependent-Variable Bracketing
definition: "FE–LDV bracketing uses fixed-effects and lagged-outcome-adjusted estimators as opposite bounds on a treatment effect under assumptions about selection and dynamic specification."
tags:
  - panel-data
  - causal-inference
---

## Overview

FE–LDV bracketing interprets two panel estimators as bounding a causal effect. Its validity depends on their bias directions, rather than simply on observing different estimates.

## Key Ideas

- Fixed effects remove stable confounding but do not ensure strict exogeneity when past outcomes affect future treatment.
- Lagged-outcome adjustment can accommodate feedback while retaining bias from stable confounders.
- In Demetrescu et al.'s stationary baseline without direct outcome state dependence, matching signs of feedback and the product of treatment/outcome confounder loadings support opposing biases. Opposite signs cause bracketing to fail.
- Direct state dependence introduces additional misspecification bias in a static FE model, so the baseline sign rule is insufficient.
- A combined FE-LDV estimator can offer a conservative effect-magnitude reference under the analyzed assumptions. Its short-panel bias and sampling uncertainty remain; estimator ordering is not a confidence interval.

## Important Papers

- [[papers/fixed-effects-lagged-dependent-variables-and-bracketing-cautionary-remarks|Fixed Effects, Lagged Dependent Variables, and Bracketing: Cautionary Remarks]]: derives failures under simultaneous feedback and confounding, and analyzes secondary treatment bias in FE-LDV.
- Ding and Li (2019), “A Bracketing Relationship Between Difference-in-Differences and Lagged-Dependent-Variable Adjustment”: earlier bracketing analysis discussed by Demetrescu et al.

## Related Concepts

- [[concepts/fixed-effects-instrumental-variables|Fixed-Effects Instrumental Variables]]: addresses endogenous treatment using instrument restrictions in addition to fixed effects; bracketing alone does not solve contemporaneous endogeneity.
