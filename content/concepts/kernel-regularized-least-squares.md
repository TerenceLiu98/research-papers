---
title: Kernel Regularized Least Squares
type: concept
aliases:
  - KRLS
  - Kernel Ridge Regression
definition: "Kernel regularized least squares estimates a smooth regression function using a kernel similarity matrix and a quadratic penalty on function complexity."
tags:
  - kernel-methods
  - nonlinear-regression
---

## Overview

Kernel regularized least squares uses similarities between predictor vectors to estimate nonlinear regression functions and interactions without enumerating them explicitly. Regularization controls the flexibility of the fitted function.

## Key Ideas

For kernel matrix $K$, minimizing $\|y-K\alpha\|^2+\lambda\alpha^TK\alpha$ yields $\hat\alpha=(K+\lambda I)^{-1}y$. Predictor scaling and the kernel bandwidth affect the similarity geometry and therefore the model.

A Gaussian prior with covariance proportional to $K^{-}$ gives an equivalent penalized mode. This representation permits kernel components to coexist with unpenalized predictors, random effects, and other smooth terms. Group indicators outside the kernel impose additive shifts; placing them inside permits richer group-specific relationships and may demand more data.

Full-kernel computation is roughly cubic in sample size. Sampling kernel centers reduces the basis dimension while preserving all response observations in the objective. The resulting approximation depends on center selection and requires sensitivity checks.

## Important Papers

- Hainmueller and Hazlett (2014), “Kernel Regularized Least Squares: Reducing Misspecification Bias with a Flexible and Interpretable Machine Learning Approach.”
- [[papers/generalized-kernel-regularized-least-squares|Generalized Kernel Regularized Least Squares]]: combines modular hierarchical modeling, REML tuning, non-Gaussian outcomes, and subsampling sketching.

## Related Concepts

- [[concepts/double-machine-learning|Double Machine Learning]]: can use kernel regression for nuisance functions; flexible regression alone is not a debiased causal estimator.
