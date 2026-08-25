---
title: Riemannian Representation Learning
type: concept
aliases:
  - Manifold-Valued Representation Learning
  - Geometry-Constrained Latent Spaces
tags:
  - representation-learning
  - riemannian-geometry
  - manifold-learning
  - latent-variable-models
---

## Overview

Riemannian representation learning constrains latent variables to a smooth manifold equipped with a position-dependent metric. The manifold supplies an inductive bias about topology, distances, angles, geodesics, and curvature: spheres can represent compact or periodic structure, while hyperbolic spaces can represent branching hierarchies. The goal is not merely to reduce dimension, but to make latent geometry correspond to a scientifically meaningful hypothesis about the data.

## Key Ideas

- **Geometry as an inductive bias:** A prescribed manifold restricts the family of representations and can make cyclic, hierarchical, or heterogeneous structure easier to inspect.
- **Riemannian optimization:** Euclidean gradients are converted with the inverse metric, and updates are retracted to the manifold so latent codes remain valid.
- **Encoder versus explicit codes:** Encoder-based variational methods must define tractable densities on the manifold. The Riemannian generative decoder instead treats every latent code as a parameter and jointly optimizes codes and decoder weights by MAP estimation.
- **Products of manifolds:** A product manifold can partition a latent vector into blocks with different geometries, allowing heterogeneous inductive biases in one representation.
- **Geometry is not automatically identified:** Unsupervised representations remain non-unique. A suitable manifold can improve alignment with a target geometry, but it does not guarantee a unique or globally interpretable coordinate system.
- Hyperbolic latent spaces are especially useful for tree-like data because their volume grows rapidly with radius, but curvature and coordinate choices affect how distances are interpreted.

## Important Papers

- [[Riemannian Generative Decoder]]
- Mathieu, Le Lan, Maddison, Tomioka, and Teh (2019), "Continuous Hierarchical Representations with Poincare Variational Auto-Encoders."
- Davidson, Falorsi, De Cao, Kipf, and Tomczak (2018), "Hyperspherical Variational Auto-Encoders."
- Kalatzis, Eklund, Arvanitidis, and Hauberg (2020), "Variational Autoencoders with Riemannian Brownian Motion Priors."
- Nickel and Kiela (2017), "Poincare Embeddings for Learning Hierarchical Representations."

## Related Concepts

- [[Geometry-Aware Regularization]]
- [[Function-Space Autoencoders]]
- [[Hierarchical Concept Embedding]]
- Hyperbolic embeddings
- Nonlinear dimensionality reduction
- Representation geometry
