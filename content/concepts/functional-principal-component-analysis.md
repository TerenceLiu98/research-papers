---
title: Functional Principal Component Analysis
type: concept
aliases:
  - FPCA
  - Functional Principal Components
tags:
  - functional-data-analysis
  - dimension-reduction
  - functional-regression
  - covariance-operator
---

## Overview

Functional principal component analysis (FPCA) is a data-adaptive representation of random functions through eigenfunctions of their covariance operator. A curve is approximated by a mean function plus a finite sum of eigenfunctions weighted by functional principal component scores. The representation reduces an infinite-dimensional predictor to a small set of interpretable coordinates while preserving directions of largest functional variation.

## Key Ideas

- For a centered process $X(t)$ with covariance function $G(s,t)$, the eigenfunctions $\psi_j$ and eigenvalues $\lambda_j$ define the expansion $X(t) \approx \sum_{j=1}^{K} \xi_j\psi_j(t)$, where $\xi_j = \langle X,\psi_j\rangle$.
- The truncation level $K$ controls the approximation and estimation trade-off. The FANMI paper selects it from a cumulative explained-variance criterion and uses the smallest $K$ exceeding 85% in its electricity application.
- Estimated curves can be smoothed first, followed by covariance estimation, eigendecomposition, score calculation, and scaling by $\Phi(\hat\xi_j/\sqrt{\hat\lambda_j})$ when a bounded score domain is useful.
- Eigenvalue decay and separation conditions support consistent estimation of the leading eigenfunctions and scores. Sparse or noisy observations require additional smoothing and score-estimation assumptions.
- FPCA is useful for interpretation as well as dimension reduction: in the paper's temperature application, the first three components summarize an overall temperature level, a winter-summer contrast, and a spring-autumn contrast.

## Important Papers

- [[Generalized Functional Additive Nonlinear Models with Multimodal Interaction Effects]]
- [[Functional Autoencoder for Smoothing and Representation Learning]]
- Yao, Müller, and Wang (2005), "Functional data analysis for sparse longitudinal data."
- Hall, Müller, and Wang (2006), "Properties of principal component methods for functional and longitudinal data analysis."
- Ramsay and Silverman (2005), "Functional Data Analysis."

## Related Concepts

- [[Generalized Functional Additive Nonlinear Models]]
- [[Function-Space Autoencoders]]
- Functional data analysis
- Covariance operators
- Basis expansion
- Functional regression
