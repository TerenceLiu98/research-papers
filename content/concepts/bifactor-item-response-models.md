---
title: Bifactor Item Response Models
type: concept
aliases:
  - Item Bifactor Analysis
  - Bifactor IRT
tags:
  - item-response-theory
  - bifactor-models
  - latent-trait-estimation
---

## Overview

Bifactor item response models distinguish a general latent trait from specific sources of response dependence, such as shared passages, task contexts, or content domains. Each item loads on the general factor and at most one specific factor. Specific factors describe residual variation beyond the general trait, rather than independent total scores for their domains.

## Key Ideas

- **Structured multidimensionality:** Responses are conditionally independent given the general and specific factors. General-only items are permitted; unrestricted loading on several specific factors changes the model structure.
- **Flexible response formats:** Binary logistic, graded response, generalized partial credit, and nominal models can share the same bifactor structure. A lower asymptote can represent guessing in binary items, while estimated nominal category scores can distinguish patterns with equal number-correct scores.
- **Analytical integration reduction:** With independent factors, integrate each specific factor conditional on the general factor, then integrate the general factor. For $S$ specific factors and $Q$ quadrature nodes per dimension, this replaces a $Q^{S+1}$ grid with repeated two-dimensional calculations whose evaluation count scales proportionally to $S Q^2$.
- **Group comparisons require anchors:** Fixing a reference group's latent scale and imposing suitable invariant item parameters allows other groups' means and variances to be estimated. Relaxing selected item restrictions supports differential item functioning tests while retaining separate parameters for residual dependence.
- **Identification and interpretation:** Orthogonal Gaussian factors are the standard assumptions in the generalized full-information framework. Two-item specific factors need additional constraints. A statistically identified specific factor may still be too narrow to support a substantive domain interpretation.
- **Efficiency does not establish fit:** The computational gain is conditional on the specified dependency structure. Model-fit checks, anchor validity, and the missingness mechanism remain separate concerns.

## Important Papers

- [[papers/generalized-full-information-item-bifactor-analysis|Generalized Full-Information Item Bifactor Analysis]]: extends full-information estimation to mixed response formats, multiple groups, parameter restrictions, and DIF analysis while retaining dimension reduction.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: the broader measurement framework for respondent traits and item characteristics.
- [[concepts/structure-aware-second-order-laplace-approximation|Structure-Aware Second-Order Laplace Approximation]]: exploits derivative structure for a different approximation to marginal likelihood integration.
