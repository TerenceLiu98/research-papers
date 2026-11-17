---
title: Bayesian Information Criterion
type: concept
aliases:
  - BIC
  - Schwarz Criterion
definition: "A model selection criterion that combines maximized log likelihood with a parameter-count penalty scaled by log sample size, and can approximate Bayesian model evidence under suitable assumptions."
tags:
  - statistical-inference
  - model-selection
---

## Overview

The Bayesian information criterion is BIC = −2 log L + k log n, where L is the maximized likelihood, k the number of free parameters, and n the sample size. Lower values favor a model within a comparable candidate set. Its penalty balances improved fit against additional parameters.

## Key Ideas

- For Δ = BIC(H1) − BIC(H0), exp(Δ/2) approximates the Bayes factor in favor of H0. A positive difference favors H0.
- Posterior model probabilities additionally require prior model probabilities. With equal priors on two models, the approximate posterior for H0 is 1/[1 + exp(−Δ/2)].
- Avoiding explicit parameter-prior specification does not remove prior assumptions. A unit information prior provides one interpretation of the approximation.
- Comparisons can involve nested or nonnested models. Evidence is relative to the specified candidates, not proof that the preferred model is true.
- Parameter count does not capture every source of flexibility. Nonlinear functional form, prior concentration, and ambiguous sample size in multilevel designs can limit the approximation.

## Important Papers

- [[papers/a-practical-solution-to-the-pervasive-problems-of-p-values|A practical solution to the pervasive problems of p values]]: explains BIC-based evidence reporting and computation from normal linear-model sums of squares.

## Related Concepts

- [[concepts/multiple-hypothesis-testing|Multiple Hypothesis Testing]]: controls aggregate testing errors, a different inferential objective from approximating relative model evidence.
