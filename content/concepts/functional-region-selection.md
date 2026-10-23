---
title: Functional Region Selection
type: concept
aliases:
  - Region Selection in Functional Data
  - Functional Domain Selection
tags:
  - functional-data-analysis
  - variable-selection
  - structured-sparsity
  - interpretability
---

## Overview

Functional region selection identifies contiguous subdomains of a curve, spectrum, or spatial function that contribute to a response. Unlike pointwise variable selection, it treats neighboring measurements as parts of a continuous object and reports intervals or other regions on the original domain. The goal is often both statistical efficiency, by suppressing irrelevant portions of a function, and scientific interpretation, by locating predictive temporal or spatial structure.

## Key Ideas

- A functional coefficient can be locally sparse: it is nonzero only on one or more subregions even though the predictor is observed across the whole domain.
- Locally supported bases, such as B-splines, connect finite-dimensional feature selection to domain selection. Selecting a basis coefficient or projected feature activates the support of its basis function; overlapping supports can then be merged into intervals.
- Smooth local penalties, compact-support penalties, Bayesian neighborhood priors, and group-sparse neural input layers provide different mechanisms for selecting regions while respecting continuity.
- Basis resolution controls a bias-resolution trade-off. Coarse bases tend to recover broad regions with high recall, while overly fine bases can produce fragmented selections or reduce recall.
- Posterior inclusion probabilities or related importance scores can express uncertainty at the basis-feature level, but plug-in scores computed from a posterior mode are approximations rather than exact posterior marginals.
- Strong correlation between nearby portions of a functional predictor can make exact support non-identifiable. In that setting, a selected interval is better interpreted as a predictive region supported by the observed covariance structure than as a uniquely causal domain.
- Region-recovery evaluation commonly maps both estimated and reference regions to a shared domain and reports precision, recall, F1, or symmetric-difference measure. Reference intervals derived from scientific convention may be useful silver standards without being exact ground truth.

## Important Papers

- [[Sparse Bayesian Deep Functional Learning with Structured Region Selection]]
- Lee and Park (2012), "Sparse Estimation in Functional Linear Regression."
- Lin et al. (2017), "Locally Sparse Estimator for Functional Linear Regression Models."
- Nie, Wang, and Cao (2023), "Estimating Functional Single Index Models with Compact Support."
- Zhu, Sun, and Lee (2025), "Bayesian Functional Region Selection."

## Related Concepts

- [[Functional Neural Networks]]
- [[Functional Multiple-Index Models]]
- [[Adaptive Basis Layers]]
- [[Functional Principal Component Analysis]]
- Functional data analysis
- Functional regression
- Structured sparsity
- Spike-and-slab priors
