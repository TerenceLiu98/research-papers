---
title: Spherical Latent Flow Matching
type: concept
aliases:
  - Spherical Flow Matching for Image Generation
  - Spherical-Slerp Flow Matching
tags:
  - flow-matching
  - latent-geometry
  - image-generation
  - riemannian-geometry
---

## Overview

Spherical latent flow matching constrains each token of an image latent to a fixed-radius hypersphere and learns transport along spherical geodesics. It combines a projected VAE latent, a uniform spherical source distribution, tangent velocity prediction, and sphere-preserving integration. The construction introduced in [[papers/aligning-latent-geometry-for-spherical-flow-matching-in-image-generation|Aligning Latent Geometry for Spherical Flow Matching in Image Generation]] is designed to remove radial motion from latent [[concepts/flow-matching|Flow Matching]] when token direction carries substantially more decoded information than token length.

## Key Ideas

- **Token-wise product geometry.** Each $d$-dimensional spatial token is normalized to radius $\sqrt d$. A complete $h\times w$ latent therefore lies on a product of spheres rather than one sphere over the flattened tensor. The scale $\sqrt d$ matches the conventional concentration radius of a $d$-dimensional standard Gaussian.
- **Projected Gaussian source.** Normalizing an isotropic Gaussian token discards its radius but preserves its direction. Rotational invariance makes that direction uniform on the sphere, providing a source distribution on the same support as the projected data latent.
- **Spherical linear interpolation.** Slerp follows the shortest great-circle path between non-antipodal endpoints. Unlike a Euclidean chord, it stays at the fixed radius at every time and has a purely tangent velocity.
- **Tangent learning and sampling.** Projecting both target and predicted velocities into the current token's tangent space prevents radial prediction. Exponential-map updates remain on the sphere and exactly advance along a slerp curve when the velocity estimate is exact.
- **Latent support and path are separate choices.** A spherical latent with a linear path already improves over an unconstrained latent in the paper's FLUX.2 ablation, but spherical latent plus slerp performs best. A shell path on unconstrained latents does not improve the linear baseline because it retains radial velocity as a supervised target.
- **Decoder compatibility matters.** Projecting an existing VAE changes the coordinates supplied to its decoder. Decoder-only finetuning restores usable reconstruction, but decoder-swap experiments show that a learned flow and its decoder co-adapt to the chosen latent geometry.
- **The angular-information premise is empirical.** Direction-versus-radius swaps support it for the tested FLUX.2, VA-VAE, and REPA-E FLUX.1 tokenizers. It is not guaranteed for every tokenizer, especially under stronger compression.
- **The latent can be trained to emphasize direction.** [[papers/hyperspherical-autoencoder-for-high-fidelity-image-reconstruction-and-generation|HAE]] uses cosine teacher alignment and a magnitude-robust decoder before applying token-wise spherical transport. Its flow loss projects predictions into tangent and radial parts and penalizes radial velocity rather than assuming the network output is tangent.

## Important Papers

- [[papers/aligning-latent-geometry-for-spherical-flow-matching-in-image-generation|Aligning Latent Geometry for Spherical Flow Matching in Image Generation]]: projects pretrained VAE tokens to fixed radius, finetunes their decoders, trains along slerp paths, and reports ImageNet-256 gains across three tokenizer families.
- [[papers/hyperspherical-autoencoder-for-high-fidelity-image-reconstruction-and-generation|Hyperspherical Autoencoder for High-Fidelity Image Reconstruction and Generation]]: learns a directionally aligned DINOv3 autoencoder and trains a diffusion transformer on its product-of-spheres latent geometry.
- Chen and Lipman (2023), "Flow Matching on General Geometries": develops the general Riemannian flow-matching formulation used to define manifold-valued interpolants and tangent vector fields.
- Davidson et al. (2018), "Hyperspherical Variational Auto-Encoders": constrains VAE latents through a spherical probability model learned from scratch.
- Davis et al. (2024), "Fisher Flow Matching for Generative Modeling over Discrete Data": uses closed-form slerp geodesics after mapping categorical distributions to a sphere.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: the underlying conditional velocity-regression framework.
- [[concepts/riemannian-representation-learning|Riemannian Representation Learning]]: the broader family of manifold-constrained representations.
- [[concepts/geodesic-distance|Geodesic Distance]]: distance measured along a manifold rather than through its ambient Euclidean space.
- [[concepts/diffusion-models|Diffusion Models]]: closely related generative models commonly trained in VAE latent spaces.
