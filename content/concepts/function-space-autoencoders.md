---
title: Function-Space Autoencoders
type: concept
aliases:
  - Autoencoders in Function Space
  - Functional Autoencoders
  - FAE and FVAE
tags:
  - function-space-learning
  - autoencoders
  - representation-learning
  - scientific-machine-learning
---

## Overview

Function-space autoencoders learn low-dimensional representations of objects treated as functions, such as PDE solutions, stochastic paths, images, and discretely sampled curves. The family includes basis-expanded architectures that project observations and reconstruct smooth functions, as well as mesh-independent models designed to remain usable across discretizations. The functional variational autoencoder (FVAE) gives a probabilistic formulation, whereas deterministic FAEs use reconstruction objectives, sometimes with explicit regularization.

## Key Ideas

- FVAE matches an encoder-defined joint distribution with a decoder-defined joint distribution through a KL objective. In infinite dimensions, this objective is finite only when the data distribution and decoder generative model satisfy an appropriate compatibility or absolute-continuity condition.
- Decoder noise must reflect the regularity and stochastic structure of the data. For diffusion paths, an auxiliary diffusion with matching noise structure can provide a valid reference; a well-chosen OU process can model bounded long-time variance better than Brownian noise.
- FAE maps a function to a latent vector and back, optimizing reconstruction error plus a penalty on the latent code. Under a finite second-moment assumption, this objective avoids the measure-theoretic compatibility problem that can make FVAE undefined.
- For discretely observed functional data, a deterministic feature layer can approximate inner products with input basis functions before the hidden network, and a coefficient layer can reconstruct the output from basis functions. This lets one model learn representations and smooth noisy curves in one pass, including with irregular observation times.
- A one-hidden-layer linear functional autoencoder is closely related to FPCA under orthonormal weight constraints, while nonlinear hidden layers can capture relationships that linear projections miss.
- A mesh-independent encoder can aggregate coordinate-value features, while a coordinate decoder can be evaluated at arbitrary points. This supports heterogeneous meshes, irregular observations, inpainting, and superresolution.
- Masking can subsample encoder and decoder mesh points independently. Complement masking uses disjoint subsets; random masking gives separate control over encoder and decoder cost. Training on partial meshes can improve mesh robustness and reduce memory use.
- A deterministic FAE is not itself a generative model, but a separate model trained on its latent codes can provide resolution-independent generation. Latent interpolation is another way to test whether the learned representation captures structure beyond memorization.

## Important Papers

- [[Functional Autoencoder for Smoothing and Representation Learning]]
- [[Autoencoders in Function Space]]
- Seidman, Kissas, Pappas, and Perdikaris (2023), "Variational autoencoding neural operators."
- Ghosh, Sajjadi, Vergari, Black, and Schoelkopf (2020), "From variational to deterministic autoencoders."
- Kingma and Welling (2014), "Auto-encoding variational Bayes."

## Related Concepts

- [[Neural Operators]]
- [[Diffusion Models]]
- Variational autoencoders
- Regularized autoencoders
- Operator learning
- Mesh invariance
- Scientific machine learning
