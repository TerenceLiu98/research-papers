---
title: Multiple Imputation
type: concept
aliases:
  - MI
definition: "Multiple imputation replaces missing observations with several plausible completed datasets, analyzes each separately, and pools estimates to represent uncertainty about missing values."
tags:
  - missing-data
  - statistical-inference
---

## Overview

Multiple imputation propagates missing-value uncertainty into substantive inference by analyzing several plausible completions of the same observed data. A single completed dataset does not capture variation across plausible missing values.

## Key Ideas

- Completion, analysis, and pooling are separate stages. Pooling accounts for within-dataset estimation uncertainty and between-imputation variation.
- Valid inference depends on the missingness mechanism and an adequate imputation model. MCAR and MAR can support standard procedures under appropriate modeling assumptions; MNAR generally requires additional assumptions or sensitivity analysis.
- Joint-distribution models, conditional models, and neural reconstruction models offer different ways to produce completions. Accurate point predictions alone do not establish calibrated inferential uncertainty.
- Rich predictors can improve reconstruction, but computational scalability and model compatibility remain important.

## Important Papers

- [[papers/the-midas-touch-accurate-and-scalable-missing-data-imputation-with-deep-learning|The MIDAS Touch]]: combines observed-value reconstruction with stochastic dropout to make neural multiple imputation scalable.
- Rubin (1987), *Multiple Imputation for Nonresponse in Surveys*: foundational reference cited by the MIDAS paper.

## Related Concepts

- [[concepts/denoising-autoencoders|Denoising Autoencoders]]: reconstruction under corruption supplies one mechanism for imputing missing entries; stochastic draws are needed to produce multiple completions.
