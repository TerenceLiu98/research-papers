---
title: Structural Identifiability
type: concept
aliases:
  - Structural Near-Identifiability
  - Latent-Structure Identifiability
tags:
  - identifiability
  - representation-learning
  - latent-variable-models
  - machine-learning-theory
---

## Overview

Structural identifiability asks whether a learned representation recovers a particular target structure from the data-generating process, such as the latent factors that generated an observation. It is stronger than statistical identifiability: models must be consistent with one another and aligned with a designated unobserved structure, up to an allowed transformation and possibly an error tolerance.

## Key Ideas

- The target structure must be specified through a data-generating model. Without such a target, representation stability alone cannot establish semantic correctness.
- In the paper by Nelson et al., the target is the inverse of a smooth data-generating diffeomorphism. Independent, non-Gaussian, standardized factors allow ICA to identify it up to signed permutations.
- The structural guarantee requires stronger assumptions than the statistical result, including sufficient model capacity and perfect reconstruction for the autoencoding setting.
- Structural identifiability can fail under model misspecification or imperfect reconstruction even when the learned representation remains statistically identifiable. A model may consistently recover the best approximation available within its class rather than the true generating process.
- Disentanglement is a prominent special case, but structural identifiability is broader: it concerns recovery of a specified latent structure, not only factor-wise separation.
- Structural near-identifiability does not eliminate scientific interpretation. The recovered coordinates can retain signs, permutations, nuisance factors, or approximation error that require domain knowledge.

## Important Papers

- [[Statistical and Structural Identifiability in Representation Learning]]
- Locatello et al. (2019), "Challenging Common Assumptions in the Unsupervised Learning of Disentangled Representations."
- Khemakhem et al. (2020), "Variational Autoencoders and Nonlinear ICA: A Unifying Framework."
- Zimmermann et al. (2021), "Contrastive Learning Inverts the Data Generating Process."
- Reizinger et al. (2025), "Cross-Entropy Is All You Need to Invert the Data Generating Process."

## Related Concepts

- [[Statistical Identifiability]]
- [[Independent Component Analysis]]
- [[Disentangled Representations]]
- Data-generating process
- Nonlinear independent component analysis
- Causal representation learning
