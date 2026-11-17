---
title: Asymmetric Outcome Measurement Error
type: concept
aliases:
  - Skewed Outcome Measurement Error
  - One-Sided Outcome Measurement Error
definition: "Asymmetric outcome measurement error is a skewed discrepancy between an observed dependent variable and its latent target, including the special case of exclusively under- or over-reported outcomes."
tags:
  - measurement-error
  - econometrics
---

## Overview

Systematic under- or over-reporting can change the conditional mean of an observed outcome. In a linear regression, a constant reporting-error mean shifts the intercept; dependence of that mean on regressors can also bias slopes. One-sided errors are a special case of asymmetry, whereas skewed errors can include discrepancies in both directions.

## Key Ideas

- **Model the conditional mean.** For $y=y^*+e$, the distortion is $E[e\mid x]$. Asymmetry alone does not imply a nonconstant conditional mean. In commonly used asymmetric scale families, changing scale affects both the mean and variance.
- **Separate reporting from ordinary noise.** A stochastic frontier combines a one-sided reporting component with symmetric noise. Identification depends on their distributional and scale specifications.
- **Scaling offers an alternative.** A common-shaped reporting distribution multiplied by a positive covariate-dependent scale yields a nonlinear conditional mean. NLLS can estimate this without a full likelihood, but functional-form assumptions and weak identification remain relevant.
- **Diagnostics motivate investigation.** Joint residual skewness and heteroskedasticity support examining reporting processes; neither identifies measurement error by itself.
- **Correction is not free.** Over-specification reduces precision, especially with small samples or weak reporting distortions. Estimated latent totals inherit the correction model's assumptions.

## Important Papers

- [[papers/accounting-for-skewed-or-one-sided-measurement-error-in-the-dependent-variable|Millimet and Parmeter (2022)]] — compares frontier and scaling-based corrections through simulations and conflict, crime, and emissions replications.

## Related Concepts

- [[concepts/measurement-error-correction-in-ranking-questions|Measurement Error Correction in Ranking Questions]] — a distinct design-based approach to response contamination; its randomized anchors supply information unavailable to purely parametric outcome corrections.
