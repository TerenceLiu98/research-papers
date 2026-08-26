---
title: Statistical Identifiability
type: concept
aliases:
  - Representation Identifiability
  - Statistical Near-Identifiability
tags:
  - identifiability
  - representation-learning
  - machine-learning-theory
---

## Overview

Statistical identifiability asks whether optimizing the same learning problem yields the same representation across solutions or retraining runs, up to a specified transformation group. For representation learning, the group may contain invertible linear maps, rigid transformations, or another model-appropriate equivalence class. Statistical epsilon-near-identifiability relaxes exact equality by allowing a bounded representation error.

## Key Ideas

- It is a statement about consistency between learned models, not about whether the representation corresponds to a true latent variable.
- The allowed transformation matters. A linear guarantee permits scale and shear; a rigid guarantee permits rotations, reflections, and translations; a signed-permutation guarantee leaves only coordinate ordering and sign choices unresolved.
- Near-identifiability is useful when exact pointwise equality is unrealistic. The error can be measured in a function norm, such as an essential-supremum representation distance over the data distribution.
- A nonlinear decoder need not destroy stability. Under smoothness, injectivity, convex latent support, and local bi-Lipschitz control, identifiable outputs imply intermediate representations that are close up to a rigid map.
- The result is model-centric: it trades strong assumptions about the data-generating process for assumptions about the decoder and end-to-end model. It does not automatically establish semantic correctness.
- Whitening and ICA can reduce linear ambiguity, but the residual signed-permutation ambiguity is generally not identifiable without additional conventions or supervision.

## Important Papers

- [[Statistical and Structural Identifiability in Representation Learning]]
- Roeder, Metz, and Kingma (2021), "On Linear Identifiability of Learned Representations."
- Nielsen et al. (2025), "When Does Closeness in Distribution Imply Representational Similarity? An Identifiability Perspective."
- Reizinger et al. (2025), "Position: An Empirically Grounded Identifiability Theory Will Accelerate Self-Supervised Learning Research."

## Related Concepts

- [[Structural Identifiability]]
- [[Independent Component Analysis]]
- [[Disentangled Representations]]
- [[Riemannian Representation Learning]]
- Representation similarity
- Bi-Lipschitz mappings
