---
title: Riemannian Flow Matching
type: concept
aliases:
  - RFM
  - Riemannian Conditional Flow Matching
  - RCFM
tags:
  - flow-matching
  - riemannian-geometry
  - generative-models
  - manifold-learning
---

## Overview

Riemannian flow matching extends [[concepts/flow-matching|Flow Matching]] from Euclidean vector spaces to data supported on a Riemannian manifold. It trains a time-dependent tangent vector field along manifold-valued probability paths and samples by integrating that field with geometry-aware updates. The construction is useful when Euclidean interpolation leaves the valid state space, such as rotations, products of spheres, molecular configurations, and structured latent representations.

## Key Ideas

- **Manifold-valued paths:** Source and target samples are connected by geodesics or another geometry-compatible conditional path rather than ambient straight lines. For a geodesic interpolant $x_t=\operatorname{Exp}_{x_0}(t\operatorname{Log}_{x_0}(x_1))$, every intermediate state remains on the manifold.
- **Tangent velocity regression:** The learned vector $v_\theta(x_t,t)$ belongs to the tangent space $T_{x_t}\mathcal M$. On embedded manifolds, an ambient network output can be projected into that tangent space before the loss or integration step.
- **Conditional flow matching:** Conditioning variables influence the learned marginal field through the joint training distribution, while the per-pair target velocity is determined by the sampled source and target endpoints. This separates the geometry of a path from the information used to choose its destination.
- **Geometry-aware sampling:** Retractions or exponential-map ODE updates replace unconstrained Euler steps so numerical trajectories remain valid manifold elements.
- **Products act blockwise:** On product manifolds, exponential maps, logarithm maps, tangent projections, and norms can be evaluated factor by factor. This makes heterogeneous or multi-scale structured states tractable when each component has a known geometry.
- **Euclidean failure is application-dependent:** A curved support does not by itself prove that Euclidean flow matching will fail. The practical case for Riemannian transport depends on decoder compatibility, off-manifold behavior, path length, and whether discarded ambient directions contain useful information.

## Important Papers

- Chen and Lipman (2024), "Flow Matching on General Geometries": formulates flow matching with Riemannian probability paths and tractable conditional vector fields.
- [[papers/latent-riemannian-flow-matching-for-geometry-grounded-3d-foundation-models|Latent Riemannian Flow Matching for Geometry-Grounded 3D Foundation Models]]: models VGGT tokens on a product of four zero-mean hyperspheres for sparse-view 3D generation.
- [[papers/aligning-latent-geometry-for-spherical-flow-matching-in-image-generation|Aligning Latent Geometry for Spherical Flow Matching in Image Generation]]: projects VAE tokens to fixed-radius spheres and uses spherical geodesic transport for image generation.
- [[papers/flow-matching-on-lie-groups|Flow Matching on Lie Groups]]: constructs tractable exponential-curve flows on Lie groups and clarifies when they coincide with Riemannian geodesics.
- [[papers/wasserstein-flow-matching-generative-modeling-over-families-of-distributions|Wasserstein Flow Matching: Generative Modeling over Families of Distributions]]: specializes Riemannian flow matching to probability distributions equipped with Wasserstein geometry.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: the Euclidean and conditional velocity-regression framework generalized here.
- [[concepts/riemannian-representation-learning|Riemannian Representation Learning]]: uses manifold geometry as a latent-space inductive bias.
- [[concepts/spherical-latent-flow-matching|Spherical Latent Flow Matching]]: a hyperspherical specialization with fixed-radius latent tokens and slerp paths.
- [[concepts/lie-group-flow-matching|Lie Group Flow Matching]]: uses group exponentials and logarithms to define probability paths.
- [[concepts/wasserstein-flow-matching|Wasserstein Flow Matching]]: transports distribution-valued states on Wasserstein space.
- [[concepts/normalizing-flows|Normalizing Flows]]: the broader class of invertible continuous transports implemented by the learned vector field.
