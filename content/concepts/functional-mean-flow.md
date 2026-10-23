---
title: Functional Mean Flow
type: concept
aliases:
  - FMF
  - Function-Space MeanFlow
tags:
  - generative-models
  - flow-matching
  - function-spaces
  - one-step-generation
---

## Overview

Functional Mean Flow extends [[concepts/average-velocity-fields|Average Velocity Fields]] to probability distributions over functions in Hilbert space. It learns the displacement induced by a marginal functional flow over a finite time interval, allowing a Gaussian random function to be transported to a generated function in one network evaluation.

## Key Ideas

- **Marginal and conditional flows differ.** Although [[concepts/functional-flow-matching|Functional Flow Matching]] can average conditional instantaneous velocities to recover a marginal velocity, averaging finite-interval conditional flow maps does not generally recover the marginal two-parameter flow.
- **Differential training identity.** Differentiating the marginal two-parameter flow with respect to its initial time produces a Frechet-derivative identity. A conditional instantaneous velocity and a stopped Jacobian-vector-product target make this identity trainable.
- **Two parameterizations.** Velocity prediction learns displacement per unit time. Endpoint prediction extrapolates that line to time one. Both represent the same exact transport quantity under the paper's derivation, but their neural optimization behavior can differ substantially.
- **One-step function generation.** The learned operator maps a Gaussian reference function directly to a sample. Neural operators, sparse-dense coordinate models, and point-based attention networks instantiate the same transport idea on different functional domains.
- **Stability is architecture-dependent.** In signed-distance-field experiments, velocity prediction collapses toward spatially constant outputs, while endpoint prediction trains successfully. Exact equivalence therefore does not imply equal practical conditioning.

## Important Papers

- [[papers/functional-mean-flow-in-hilbert-space|Functional Mean Flow in Hilbert Space]]: introduces the Hilbert-space formulation, endpoint variant, and evaluations on functions, images, PDE fields, and 3D geometry.
- [[papers/mean-flows-for-one-step-generative-modeling|Mean Flows for One-step Generative Modeling]]: develops the finite-dimensional average-velocity identity that FMF extends.

## Related Concepts

- [[concepts/functional-flow-matching|Functional Flow Matching]]: the instantaneous function-space transport framework.
- [[concepts/average-velocity-fields|Average Velocity Fields]]: finite-interval displacement in ordinary flow models.
- [[concepts/neural-operators|Neural Operators]]: function-to-function model families used to parameterize FMF.
- [[concepts/flow-matching|Flow Matching]]: the broader conditional vector-field learning framework.
