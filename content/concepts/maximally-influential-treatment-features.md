---
title: Maximally Influential Treatment Features
type: concept
aliases:
  - MIF
  - MIF-MCF
tags:
  - causal-inference
  - unstructured-treatments
  - unstructured-outcomes
  - covariate-adjustment
---

## Overview

Maximally influential treatment features (MIFs) are learned bounded scores used to discover influential aspects of unstructured treatments. In the paired MIF-MCF formulation described here, a treatment score is learned jointly with a maximally contrasting outcome score. The pair identifies treatment and outcome directions whose association remains after removing the outcome baseline explained by observed covariates.

## Key Ideas

- Let $f(A)$ score the treatment object and $g(Y)$ score the outcome object. The joint objective is $\mathbb{E}[f(A)\{g(Y)-\mathbb{E}(g(Y)\mid X)\}]$, which is an average conditional covariance between the two learned scores.
- This centered-association identity is algebraic. Interpreting the pair as a causal effect of manipulating a named treatment attribute additionally requires a justified intervention and adjustment strategy.
- Matched negative-control outcomes approximate the covariate baseline. A negative control has the same conditional outcome distribution as $Y$ given $X$ but is independent of the treatment object after conditioning on $X$.
- In finite samples, nearest-neighbor or kernel matching over covariates supplies fixed matching weights while both scores are optimized together. The baseline values change with the outcome score; the neighborhoods and weights remain fixed. With repeated discrete covariates, exact within-stratum centering is an alternative (Section 3.2 of the paper below).
- With one score fixed, the other selects objects associated with positive residual values of the fixed score. This gives the pair a mutually reinforcing, selection-based interpretation.
- Covariate-adaptive scores $f(A,X)$ and $g(Y,X)$ allow the treatment-outcome direction to vary across contexts, but they remain dependent on the quality of covariate adjustment and the chosen representations.
- For covariate-adaptive matching, each negative outcome is scored at the target covariates: the baseline for unit $i$ is $\sum_j w_{ij}g(Y_j,X_i)$, rather than an average evaluated at neighbors' own covariates (Appendix W).

## Important Papers

- [[papers/causal-inference-with-unstructured-outcomes|Causal Inference with Unstructured Outcomes]]
- Wibisono and Wang (2026), "Causal inference with unstructured treatments," arXiv:2608.00657.
- Egami et al. (2022), "How to make causal inferences using texts."

## Related Concepts

- [[concepts/unstructured-outcome-causal-inference|Unstructured Outcome Causal Inference]]
- [[concepts/maximally-contrasting-feature|Maximally Contrasting Feature]]
- [[concepts/text-as-treatment|Text as Treatment]]
- Negative control outcomes
- Covariate adjustment
- Unstructured treatment effects
