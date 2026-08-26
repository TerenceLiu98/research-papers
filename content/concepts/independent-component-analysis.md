---
title: Independent Component Analysis
type: concept
aliases:
  - ICA
  - Independent Components Analysis
tags:
  - independent-component-analysis
  - representation-learning
  - latent-variable-models
  - signal-separation
---

## Overview

Independent component analysis (ICA) is a family of methods for linearly transforming multivariate observations into components that are as statistically independent as possible. In representation learning, ICA is often used as post-processing: whitening removes second-order scale and correlation structure, then a contrast objective estimates a rotation that separates non-Gaussian components.

## Key Ideas

- Linear ICA assumes that observations arise from a linear mixture of latent components. With at most one Gaussian component, the classical identifiability result leaves scale and permutation ambiguities; whitening fixes scale and leaves an orthogonal ambiguity.
- Contrast functions such as those optimized by FastICA encourage non-Gaussian or independent projected components. The remaining ambiguity is typically a signed permutation, because component order and sign have no intrinsic meaning.
- ICA can be applied after a representation learner without changing the upstream training objective. This makes it useful for aligning independently trained representations and for testing whether a latent space contains separable factors.
- The near-identifiability result in [[Statistical and Structural Identifiability in Representation Learning]] shows how perturbations in the input latent space propagate through whitening and a well-converged ICA objective.
- ICA is not a guarantee of semantic disentanglement. Misspecification, finite samples, covariance conditioning, local optima, and non-independent or Gaussian sources can limit what it recovers.
- In the paper's microscopy application, ICA increases feature sparsity and concentrates predictive biological signal in highly ranked features, but these measurements do not by themselves identify every component as a biological or technical factor.

## Important Papers

- [[Statistical and Structural Identifiability in Representation Learning]]
- Comon (1994), "Independent Component Analysis, a New Concept?"
- Hyvarinen and Oja (2000), "Independent Component Analysis: Algorithms and Applications."
- Horan, Richardson, and Weiss (2021), "When Is Unsupervised Disentanglement Possible?"
- Khemakhem et al. (2020), "Variational Autoencoders and Nonlinear ICA: A Unifying Framework."

## Related Concepts

- [[Statistical Identifiability]]
- [[Structural Identifiability]]
- [[Disentangled Representations]]
- Whitening
- Nonlinear independent component analysis
- Representation alignment
