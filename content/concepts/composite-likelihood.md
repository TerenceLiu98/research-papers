---
title: "Composite Likelihood"
type: concept
aliases:
  - Pairwise Likelihood
  - Independence Likelihood
tags:
  - likelihood-estimation
  - statistical-inference
---

## Overview

Composite likelihood combines tractable likelihood contributions, such as univariate or bivariate margins, into an estimation objective when the full joint likelihood is expensive. The contributions can overlap and remain statistically dependent, so the resulting objective generally requires different uncertainty calculations from an ordinary full likelihood.

## Key Ideas

For component likelihoods $f_a$ and fixed nonnegative weights $w_a$,

$$
L_C(\theta;y)=\prod_a f_a(y;\theta)^{w_a}.
$$

- **Choice of margins:** Independence likelihood uses univariate contributions; pairwise likelihood uses pairs. These are special cases, with different information and computational costs.
- **Consistency and efficiency:** Correctly specified, identifying contributions can support consistent estimation under regularity conditions. Efficiency relative to full likelihood depends on the model, contributions, and weights.
- **Dependence-aware inference:** Treating overlapping contributions as independent can misstate uncertainty. Sandwich variance estimation accounts for covariance among their scores.
- **Two-stage estimation:** Some parameters can be estimated from univariate margins and plugged into pairwise objectives for the remaining parameters. Second-stage uncertainty must then account for estimation in the first stage, not just dependence within the pairwise objective.
- **Constraints can couple fits:** Separate component optimization is possible only when the parameter structure allows it. Shared coefficients or global matrix constraints can prevent independent maximization.

## Important Papers

- [[papers/fast-multivariate-probit-estimation-via-a-two-stage-composite-likelihood|Fast Multivariate Probit Estimation via a Two-Stage Composite Likelihood]]: uses univariate margins for probit coefficients and bivariate margins for latent correlations, with robust Murphy-Topel inference.
- Varin, Reid, and Firth (2011), *An overview of composite likelihood methods*, as cited by Ting, Wright, and Zhou: review of construction and inferential properties.
- Zhao and Joe (2005), *Composite likelihood estimation in multivariate data analysis*, as discussed by Ting, Wright, and Zhou: precursor using a two-stage approach in constrained familial models.

## Related Concepts

- [[concepts/multivariate-probit-models|Multivariate Probit Models]]: an application where marginal likelihoods avoid high-dimensional Gaussian probability calculations.
