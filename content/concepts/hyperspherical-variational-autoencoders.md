---
title: Hyperspherical Variational Autoencoders
type: concept
aliases:
  - S-VAE
tags:
  - variational-inference
  - latent-geometry
---

## Overview

A hyperspherical variational autoencoder models latent direction on a sphere rather than a Gaussian vector in unconstrained Euclidean space. The encoder learns a mean direction and concentration; the decoder receives a sample at a fixed radius.

## Key Ideas

- A uniform spherical prior and a directional posterior, such as von Mises–Fisher or Power Spherical, define a directional reconstruction–KL objective.
- Concentration controls angular dispersion without introducing token-wise radial variation. Power Spherical sampling avoids the rejection sampling used for von Mises–Fisher distributions.
- Normalizing Gaussian samples also fixes radius, but retaining a Euclidean Gaussian KL penalizes conditional radial information that a direction-only decoder discards.
- In sequential generation, projecting completed predictions to fixed radius removes radial perturbations before refeeding. Tangential errors can still propagate.
- Fixed-radius latent support and sphere-preserving transport are separate design choices. SphereAR uses ambient linear flow paths with endpoint projection, while spherical flow matching constrains the path itself.

## Important Papers

- Davidson et al. (2018), “Hyperspherical Variational Auto-Encoders”: foundational directional VAE formulation.
- De Cao and Aziz (2020), “The Power Spherical Distribution”: the directional posterior family adopted by SphereAR.
- [[papers/hyperspherical-latents-improve-continuous-token-autoregressive-generation|Hyperspherical Latents Improve Continuous-Token Autoregressive Generation]]: combines a Power Spherical tokenizer with normalized causal next-token generation and evaluates ImageNet quality and stability.

## Related Concepts

- [[concepts/spherical-latent-flow-matching|Spherical Latent Flow Matching]]: generative transport on fixed-radius latent tokens.
- [[concepts/riemannian-representation-learning|Riemannian Representation Learning]]: the broader use of manifold geometry in learned representations.
- [[concepts/flow-matching|Flow Matching]]: can model token distributions with either ambient or manifold-valued paths.
