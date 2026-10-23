---
title: Concept Manifolds
type: concept
aliases:
  - Representation Manifolds
  - Neural Concept Manifolds
tags:
  - representation-geometry
  - mechanistic-interpretability
  - manifold-learning
---

## Overview

A concept manifold is a low-dimensional geometric object in a model's activation space whose coordinates encode continuously related values of a concept. Cyclic values can form loops, ordered quantities can trace curves, and concepts with several degrees of freedom can occupy surfaces. Neighborhoods and distances on the manifold may preserve semantic relationships that a single concept direction cannot express.

## Key Ideas

- **Intrinsic and embedding dimensions differ.** A circle has one intrinsic coordinate but needs a two-dimensional linear subspace. Recovering its ambient span is therefore not the same as identifying its intrinsic parameterization or topology.
- **Geometry can be behaviorally relevant.** Smooth interventions between concept-value centroids can induce smooth output changes, while [[concepts/manifold-steering|Manifold Steering]] more explicitly follows a fitted curved path. Either result is task- and intervention-specific rather than proof of a unique representation.
- **Additive superposition can extend from directions to manifolds.** A representation may combine points from several factor manifolds. This retains additive composition while allowing each factor to have nonlinear internal geometry.
- **Reconstruction does not imply coherent recovery.** A [[concepts/sparse-autoencoders|Sparse Autoencoder]] may preserve a manifold through many localized, overlapping features. Accurate aggregate reconstruction can coexist with a failure to allocate one compact feature group to the object.
- **Feature groups can be more meaningful than individual atoms.** Local tuning curves and feature co-activation may collectively trace the geometry even when no scalar latent represents the whole concept. This connects concept manifolds to [[concepts/irreducible-multidimensional-features|Irreducible Multidimensional Features]].
- **Discovery needs validation at several levels.** Low-dimensional geometry, semantic organization, and causal influence are separate claims. A useful analysis checks geometry, held-out stability, concept association, and interventions rather than relying on a visually suggestive projection alone.

## Important Papers

- [[papers/do-sparse-autoencoders-capture-concept-manifolds|Do Sparse Autoencoders Capture Concept Manifolds?]] formalizes compact capture and local tiling, finds dilution across current SAE architectures, and proposes Ising-based feature-group discovery.
- [[papers/not-all-language-model-features-are-one-dimensionally-linear|Not All Language Model Features Are One-Dimensionally Linear]] identifies irreducible multidimensional calendar features and tests interventions in their subspaces.
- [[papers/manifold-steering-reveals-the-shared-geometry-of-neural-network-representation-and-behavior|Manifold Steering Reveals the Shared Geometry of Neural Network Representation and Behavior]] compares curved activation trajectories with model behavior under intervention.
- Karkada et al. (2026), "Symmetry in language statistics shapes the geometry of model representations": relates symmetries in language statistics to representation geometry.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/sparse-autoencoder-receptive-fields|Sparse Autoencoder Receptive Fields]]
- [[concepts/irreducible-multidimensional-features|Irreducible Multidimensional Features]]
- [[concepts/manifold-steering|Manifold Steering]]
- [[concepts/riemannian-representation-learning|Riemannian Representation Learning]]
