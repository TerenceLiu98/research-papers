---
title: "Autoencoders in Function Space"
type: paper
authors:
  - Justin Bunker
  - Mark Girolami
  - Hefin Lambley
  - Andrew M. Stuart
  - T. J. Sullivan
year: null
tags:
  - function-space-learning
  - autoencoders
  - neural-operators
  - scientific-machine-learning
  - generative-modeling
---

## TL;DR

This paper develops probabilistic and deterministic autoencoders for functional data. The functional variational autoencoder (FVAE) matches encoder and decoder joint distributions through a KL objective, but that objective is finite only when the decoder generative model is compatible with the data distribution. The functional autoencoder (FAE) replaces this with a regularized reconstruction objective that is broadly defined under finite second moments. Neural-operator architectures make both models evaluable on arbitrary meshes, enabling masked training, inpainting, superresolution, and latent-space generative modeling for scientific data.

## Research Question

How can autoencoders represent, reconstruct, and generate data that are naturally functions rather than fixed-dimensional vectors, while remaining well defined as discretization resolution changes? In particular, when is a function-space VAE objective valid, and can a deterministic alternative retain useful resolution-independent behavior when the VAE assumptions fail?

## Motivation

Scientific data such as PDE solutions, stochastic paths, and images are often observed on grids but are more naturally viewed as functions. Fixed-resolution architectures can make the learned representation depend on the mesh, while linear reduction can be inefficient for data with nonlinear structure such as advection-dominated PDE solutions. Extending VAEs directly to function space introduces a more fundamental issue: probability distributions that look reasonable after discretization may be mutually singular in the continuum. The paper therefore pairs function-space objectives with architectures that can be discretized after the model is defined and treats objective well-definedness as a central modeling requirement.

## Contributions

- Defines FVAE by minimizing the KL divergence between an encoder-defined joint distribution and a decoder-defined joint distribution on latent and function spaces.
- Shows that the FVAE objective requires compatibility, expressed through absolute continuity, between the data distribution and the decoder generative model. White noise can make the objective ill-defined in infinite-dimensional spaces even when finite discretizations appear usable.
- Derives compatible decoder-noise constructions for SDE path distributions and posterior distributions in Bayesian inverse problems, including an OU-noise example for diffusion paths.
- Proposes FAE, a deterministic regularized autoencoder whose objective is broadly applicable when the data have a finite second moment, including settings where FVAE fails.
- Uses mesh-independent encoder and coordinate-decoder neural networks that can be evaluated on arbitrary, including irregular, meshes.
- Proposes complement and random masking over mesh points. The experiments show improved robustness to mesh changes and lower training cost, and use the resulting models for inpainting, superresolution, and generative modeling.

## Method

The data live in a separable Banach space $\mathcal{U}$ and the latent space is finite-dimensional. FVAE uses a probabilistic encoder $\mathbb{Q}_{z|u}^{\theta}$ and decoder $\mathbb{P}_{u|z}^{\psi}$, with a fixed latent prior. The training objective is the KL divergence between the encoder joint distribution $\mathbb{Q}_{z,u}^{\theta}$ and decoder joint distribution $\mathbb{P}_{z,u}^{\psi}$. Its tractable per-sample form contains a reconstruction or likelihood term relative to a reference distribution and a KL regularizer between the encoder and latent prior.

In function space, the decoder is a shift of a noise distribution rather than a density relative to Lebesgue measure. The decoder noise must be chosen so that the data and generated distributions are compatible. For SDE paths, the paper uses an auxiliary diffusion with the same diffusion coefficient and derives the loss with Girsanov's theorem; an OU process gives more suitable long-time variance than Brownian noise in the Brownian-dynamics experiment. For Bayesian inverse-problem posteriors, the prior is used as the reference distribution and Cameron-Martin conditions control valid decoder shifts.

FAE instead maps a function deterministically to a latent vector $f(u;\theta)$ and maps that vector back to a function $g(z;\psi)$. Its objective is

$$
\mathcal{J}_{\beta}^{\mathrm{FAE}}(\theta,\psi) = \mathbb{E}_{u \sim \Upsilon}\left[\frac{1}{2}\|g(f(u;\theta);\psi)-u\|^2 + \beta\|f(u;\theta)\|_2^2\right].
$$

The encoder aggregates coordinate-value features over the domain and the decoder is a coordinate neural network. Both use GELU networks and random Fourier features for coordinates. Discretized integrals and norms are approximated by normalized sums, so the same maps can be evaluated on different meshes. Masked training supplies one random subset of mesh points to the encoder and evaluates the decoder on another subset; complement masking uses disjoint subsets, while random masking samples both independently.

## Experiments

FVAE experiments use diffusion paths from Brownian dynamics and irregularly sampled paths for Markov state model estimation. In a one-dimensional asymmetric double-well system, a one-dimensional latent variable learned from data tracks the first-crossing or transition time. With a suitable OU decoder noise, the generated first-crossing-time distribution closely agrees with direct simulations; Brownian decoder noise reconstructs well but gives a poorer generative distribution. In a two-dimensional multiwell system, a model trained on paths with missing time steps produces a transition matrix close to one computed from direct numerical simulations.

FAE experiments use vorticity snapshots from incompressible Navier-Stokes flow and pressure fields from Darcy flow. On a $64 \times 64$ Navier-Stokes grid, the FAE architecture obtains held-out reconstruction MSE $4.82 \times 10^{-4} \pm 2.57 \times 10^{-5}$ with 64,857 parameters, compared with $2.38 \times 10^{-4} \pm 9.43 \times 10^{-6}$ for a 71,553-parameter CNN. The mesh-independent model reconstructs masked inputs, accepts low-resolution inputs and decodes them at higher resolution, and remains stable when evaluated on meshes finer than the training mesh. It can also decode only a region of interest, reducing the number of decoder evaluations.

For Darcy flow, random masking at encoder and decoder point ratios of 10%, 50%, and 90% converges faster than full-grid training in the wall-clock experiment because smaller tensors use GPU parallelism more effectively. Across the applications, masked training improves performance under mesh changes and can reduce memory demand. A separate generative model trained on the FAE latent space produces resolution-invariant samples, and interpolation between held-out latent codes gives sensible intermediate fields.

## Limitations

FVAE is not automatically valid in infinite dimensions. The paper shows that an $L^2$-white-noise decoder is supported in negative Sobolev spaces rather than $L^2$, making the joint KL divergence infinite for $L^2$-valued data. A misspecified example with Dirac distributions also shows the discretized FVAE objective diverging as resolution increases. Compatible reference and decoder distributions must therefore be established for each problem class.

FAE avoids these probabilistic compatibility requirements but remains dependent on the chosen norm, architecture, coordinate representation, masking policy, and latent dimension. The Navier-Stokes reconstruction error is higher than that of a comparable fixed-resolution CNN, and the paper notes oversmoothing in some inpainting results and incomplete recovery of fine-scale turbulent features. Zero-shot superresolution is a mesh-invariance test rather than a guarantee that unseen high-frequency information can be recovered. The scientific evaluations cover selected synthetic or simulated data distributions, so they do not establish performance for all functional data or downstream scientific decisions.

## Related Concepts

- [[Function-Space Autoencoders]]
- [[Neural Operators]]
- [[Diffusion Models]]
- Variational autoencoders
- Operator learning
- Inpainting
- Superresolution
- Scientific machine learning

## Related Papers

- Seidman, Kissas, Pappas, and Perdikaris (2023), "Variational autoencoding neural operators."
- Kovachki, Li, Liu, Azizzadenesheli, Bhattacharya, Stuart, and Anandkumar (2023), "Neural operator: Learning maps between function spaces with applications to PDEs."
- Li, Kovachki, Azizzadenesheli, Liu, Bhattacharya, Stuart, and Anandkumar (2021), "Fourier neural operator for parametric partial differential equations."
- Lu, Jin, Pang, Zhang, and Karniadakis (2021), "Learning nonlinear operators via DeepONet based on the universal approximation theorem of operators."
- Ghosh, Sajjadi, Vergari, Black, and Schoelkopf (2020), "From variational to deterministic autoencoders."
