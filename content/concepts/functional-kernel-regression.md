---
title: Functional Kernel Regression
type: concept
aliases:
  - Functional Nadaraya-Watson Regression
definition: Nonparametric regression that estimates a conditional mean by kernel-weighted averaging of responses according to distances between function-valued covariates.
tags:
  - functional-data
  - nonparametric-regression
---

## Overview

Functional kernel regression estimates a scalar conditional mean from curve-valued or other functional inputs. A distance or seminorm defines local neighborhoods, and a bandwidth controls how much nearby observations contribute. Using a binary response yields a propensity-score estimator.

## Key Ideas

- The local constant estimator is $\hat m(x)=\sum_i K(d(X_i,x)/h)Y_i/\sum_i K(d(X_i,x)/h)$. Evaluation at training points can exclude the observation itself.
- Geometry encodes what counts as similar: curve levels, derivatives, projections, or selected summaries can produce different neighborhoods. A seminorm may discard information, so its adequacy depends on the regression or identification problem.
- Small-ball probabilities $P(d(X,x)\le h)$ determine how much data fall into shrinking neighborhoods. Their decay replaces ordinary dimension as a central determinant of statistical difficulty.
- Fast estimation of an average causal effect can be possible even when the functional propensity is estimated more slowly. This requires bias control and sufficiently fast nuisance convergence, not merely applying a kernel to curves.

## Important Papers

- [[papers/nonparametric-causal-inference-with-functional-covariates|Nonparametric Causal Inference with Functional Covariates]]: develops efficient kernel-IPW inference under small-ball, smoothness, and complexity conditions, and demonstrates the importance of distance selection.
- Ferraty et al. (2010), “Rate of Uniform Consistency of Nonparametric Estimates with Functional Variables”: establishes uniform-rate foundations used by that paper.

## Related Concepts

- [[concepts/causal-overlap|Causal Overlap]]: remains necessary when kernel regression estimates treatment propensities.
- [[concepts/double-machine-learning|Double Machine Learning]]: provides a related route from flexible nuisance estimates to low-dimensional causal inference using orthogonal scores and cross-fitting.
