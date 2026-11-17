---
title: Post-Double Selection
type: concept
aliases:
  - PDS
definition: "Selection of adjustment variables from models of both the outcome and focal regressors, followed by unpenalized estimation using the union of selected variables."
tags:
  - causal-inference
  - variable-selection
---

## Overview

Post-double selection uses sparse prediction models to choose controls for inference on low-dimensional target coefficients. Outcome-only selection can miss variables that weakly predict outcomes but strongly predict a focal regressor, creating substantial omitted-variable bias.

## Key Ideas

- Select controls from both outcome and focal-regressor models, then take their union.
- Estimate target coefficients in an unpenalized final regression to avoid direct shrinkage of those coefficients.
- For treatment moderation, select using three responses: outcome, treatment, and treatment–moderator product. Candidate controls include moderator–covariate interactions.
- Approximate sparsity and suitable penalty loadings support inference; selection does not guarantee correct causal identification or reliable estimation under dense nuisance structure.
- Marginal effects combining several target coefficients require their joint covariance, not just separate standard errors. Cluster dependence affects both selection penalties and uncertainty estimation.

## Important Papers

- Belloni, Chernozhukov, and Hansen (2014), “Inference on Treatment Effects after Selection among High-Dimensional Controls”: foundational treatment-effect inference procedure.
- [[papers/reducing-model-misspecification-and-bias-in-the-estimation-of-interactions|Reducing Model Misspecification and Bias in the Estimation of Interactions]]: adapts selection and covariance estimation to prespecified interactions and marginal effects.

## Related Concepts

- [[concepts/conditional-marginal-effects|Conditional Marginal Effects]]: moderator-indexed treatment effects motivate joint inference after selection.
