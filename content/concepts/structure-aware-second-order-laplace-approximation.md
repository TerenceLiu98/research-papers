---
title: Structure-Aware Second-Order Laplace Approximation
type: concept
aliases:
  - Second-order Laplace approximation
tags:
  - laplace-approximation
  - latent-variable-models
  - marginal-maximum-likelihood
---

## Overview

Second-order Laplace approximation improves a local Gaussian approximation to a latent-variable integral by adding a correction built from third and fourth derivatives at the posterior mode. A structure-aware implementation exploits zero and repeated derivative terms induced by the measurement model, making the correction less expensive without discarding nonzero contributions.

## Key Ideas

- **Local correction:** For an integral of $\exp[-h(z)]$, the log approximation adds $\log(1+\epsilon)$ to the usual mode-and-Hessian expression. The correction uses higher derivatives contracted with the inverse Hessian.
- **Structural sparsity:** If an item depends on only a few latent coordinates, many of its mixed derivatives vanish. For a Gaussian latent distribution, derivatives above order two of the log prior vanish, so higher derivatives come from item likelihoods.
- **Symmetry and multiplicity:** Compute each unique nonzero derivative product once, then multiply by its frequency in the full sum. This preserves the stated approximation while removing redundant work.
- **Model-dependent cost:** Independent-clusters models offer substantial savings. Cross-loadings increase the number of distinct terms; dense structures can sharply reduce the advantage.
- **Comparison with quadrature:** Tensor-product adaptive Gauss-Hermite quadrature uses $Q^p$ points. Four to six points per dimension have the same theoretical error order as second-order Laplace in the framework analyzed by Andersson, Jin, and Zhang (2023), but finite-sample accuracy differs.
- **Estimation needs more derivatives:** Directly differentiating the second-order approximated likelihood can require fifth derivatives and must account for changes in the posterior mode as parameters change. Computing the likelihood alone needs derivatives only through order four.

The method is useful when multidimensional integration is expensive and the loading structure provides reusable derivative patterns. It remains a local, fixed-order approximation; increasing quadrature resolution can provide greater accuracy when affordable. Evidence from Gaussian categorical latent models does not establish equivalent behavior for multimodal or non-Gaussian latent distributions.

## Important Papers

- [[papers/fast-estimation-of-multiple-group-generalized-linear-latent-variable-models-for-categorical-observed-variables|Fast estimation of multiple group generalized linear latent variable models for categorical observed variables]]: develops multiple-group estimation with structural filtering and compares it with adaptive quadrature in simulations and PISA data.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: an application in which categorical response likelihoods require integration over latent traits.
- [[concepts/amortized-variational-inference|Amortized Variational Inference]]: reduces repeated inference costs by learning a shared posterior approximation rather than computing local higher-order corrections.
