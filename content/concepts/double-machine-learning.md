---
title: Double Machine Learning
type: concept
aliases:
  - Debiased Machine Learning
  - DML
tags:
  - causal-inference
  - semiparametric-inference
  - orthogonal-scores
  - cross-fitting
---

## Overview

Double machine learning is a framework for estimating low-dimensional causal or structural parameters while using flexible machine-learning models for high-dimensional nuisance functions. It combines Neyman-orthogonal scores with sample splitting and cross-fitting so that sufficiently small nuisance-estimation errors do not contribute first-order bias to the target estimator.

## Key Ideas

- A Neyman-orthogonal score is locally insensitive to perturbations of the nuisance functions at their true values. Plug-in error therefore enters primarily through second-order products rather than a first-order term.
- Cross-fitting trains nuisance models outside each evaluation fold. This separates nuisance fitting from score evaluation and limits overfitting bias without requiring a separate holdout sample for the final estimate.
- For an average treatment effect, nuisance components commonly include treated and control outcome regressions and the propensity score. An augmented inverse propensity weighted score yields the familiar double-robustness property: consistency can survive misspecification of either the outcome model or the propensity model, but not generally both.
- Root-sample-size inference requires more than orthogonality. Typical conditions include overlap, nuisance consistency, a product-rate bound, finite score variance, and regularity sufficient for a central limit theorem.
- Function-valued targets such as [[concepts/conditional-marginal-effects|Conditional Marginal Effects]] add a smoothing or basis-projection stage after cross-fitted signal construction. Inference must also control approximation bias and basis growth; scalar DML guarantees alone do not establish valid confidence bands for a whole curve.
- With continuous treatment, partialing out outcome and treatment conditional means can estimate a moderator-dependent slope under a partially linear dose-response model. Flexible nuisance learning does not remove that structural restriction or automatically identify an average derivative under misspecification.
- Computation can become expensive on massive data because every cross-fitting fold refits the nuisance learners. [[Uniform Design Subsampling]] is one approach to reducing the effective training size while trying to preserve covariate representativeness and treatment balance.

## Important Papers

- Chernozhukov et al. (2018), "Double/Debiased Machine Learning for Treatment and Structural Parameters."
- [[UD-DML: Uniform Design Subsampling for Double Machine Learning over Massive Data]]
- Semenova and Chernozhukov (2021), "Debiased Machine Learning of Conditional Average Treatment Effects and Other Causal Functions."
- [[papers/a-practical-guide-to-estimating-conditional-marginal-effects-modern-approaches|A Practical Guide to Estimating Conditional Marginal Effects: Modern Approaches]]: develops moderator-indexed estimation workflows and compares smooth basis methods with flexible learners across nuisance structures.

## Related Concepts

- Neyman orthogonality
- Cross-fitting
- Augmented inverse propensity weighting
- Propensity scores
- Causal overlap
- [[Uniform Design Subsampling]]
- [[concepts/conditional-marginal-effects|Conditional Marginal Effects]]
