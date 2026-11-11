---
title: Cylindrical Representation Hypothesis
type: concept
aliases:
  - CRH
  - Cylindrical Representation Geometry
tags:
  - activation-steering
  - representation-geometry
  - mechanistic-interpretability
---

## Overview

The Cylindrical Representation Hypothesis (CRH) is a geometric account of sample-specific variation in language-model steering. It retains the premise that concepts correspond to linear directions but allows different concepts to overlap rather than requiring semantically independent concepts to be orthogonal. Their combined contribution induces an axis for the primary semantic transition, an orthogonal normal plane, and phase-dependent sectors that can facilitate or inhibit activation of a target concept.

## Key Ideas

- **Overlap is structural.** More concept directions than representation dimensions cannot all be linearly independent or mutually orthogonal. CRH therefore models interference as an expected property of representation geometry rather than only a defect in vector estimation.
- **The cylinder is sample-specific.** A difference vector between an original representation and a fluent target-concept representation defines the central axis. Orthogonal concept components balance around it, and a two-dimensional normal plane summarizes variation relevant to the target and competing concepts.
- **Axis and plane play different roles.** The axis-aligned component drives the main semantic change. Normal-plane magnitude affects the rate of target activation and the risk of semantic corruption, while phase within the plane determines whether competing concept contributions reinforce or suppress the target.
- **Predictability is asymmetric.** Under CRH, the magnitude of the plane component can be tracked by an observable orthogonal projection. Sensitive sectors depend on a latent concept mixture that is not uniquely recoverable from the difference vector when the concept-to-representation map is non-injective.
- **Aggregate trends need not predict individual outcomes.** A steering method can show stable population-level relationships between angle, intervention strength, activation, and corruption while remaining unreliable on a particular sample.
- **The hypothesis remains conditional.** Its cylinder lives in an idealized steering-aligned space, and empirical PCA probes only approximate that construction. Sector non-identifiability under the model does not establish that no predictor using richer model state or additional observations could improve sample-level forecasts.

## Important Papers

- [[papers/the-cylindrical-representation-hypothesis-for-language-model-steering|The Cylindrical Representation Hypothesis for Language Model Steering]] introduces CRH, derives its predictability claims, and tests three observable implications across concepts, models, and steering methods.
- Park, Choe, and Veitch (2024), "The Linear Representation Hypothesis and the Geometry of Large Language Models": develops the linear-representation and causal-separability account that CRH extends.
- Rimsky et al. (2024), "Steering Llama 2 via Contrastive Activation Addition": provides a widely used difference-vector steering method examined by CRH.

## Related Concepts

- [[concepts/model-steerability|Model Steerability]]
- [[concepts/manifold-steering|Manifold Steering]]
- [[concepts/spectral-superposition|Spectral Superposition]]
- [[concepts/irreducible-multidimensional-features|Irreducible Multidimensional Features]]
- [[concepts/disentangled-representations|Disentangled Representations]]
