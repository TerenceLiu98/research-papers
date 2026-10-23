---
title: Latent Vector Fields
type: concept
aliases:
  - Autoencoder Latent Dynamics
tags:
  - representation-learning
  - autoencoders
  - dynamical-systems
  - fixed-points
---

## Overview

A latent vector field describes the dynamics produced by repeatedly applying a model's latent-space self-map. For an autoencoder with encoder $E$ and decoder $D$, the map is $f(z)=E(D(z))$, the discrete trajectory is $z_{t+1}=f(z_t)$, and the residual $f(z)-z$ gives the corresponding vector field. This converts a static representation into trajectories, fixed points, and basins that can be used to characterize model behavior.

## Key Ideas

- **Attractors summarize long-run behavior:** A fixed point satisfies $f(z^*)=z^*$. It is locally attracting when the Jacobian eigenvalues have magnitude below one, although global convergence requires stronger conditions.
- **Training can encourage contraction:** Bottlenecks, weight decay, denoising or masking objectives, sparsity, and explicit Jacobian penalties can reduce sensitivity locally. These biases make attractors plausible without ensuring that the entire map is contractive.
- **Trajectories contain information beyond endpoints:** Two initial distributions can converge to similar attractors along different paths. Convergence speed and distance to known attractors can therefore carry distributional information that the final fixed point alone loses.
- **Attractors can act as prototypes or dictionary atoms:** Decoded attractors may summarize regions represented by a model. Their usefulness depends jointly on prototype quality and coverage of the relevant latent distribution.
- **Score interpretations are conditional:** Relating the residual field to the score of a latent density requires smoothness, local contraction, and assumptions about training optimality. A non-conservative field should not automatically be treated as the gradient of a global energy.
- **The iteration axis matters:** Encoder-decoder iteration evolves one representation through repeated applications of a self-map. This differs from [[concepts/dynamical-interpretability|Dynamical Interpretability]], where network depth is treated as time.

## Important Papers

- [[papers/navigating-the-latent-space-dynamics-of-neural-models|Navigating the Latent Space Dynamics of Neural Models]] defines autoencoder-induced latent vector fields and evaluates their attractors and trajectories for memorization, data-free model probing, and OOD detection.
- Alain and Bengio (2014), "What Regularized Auto-Encoders Learn from the Data-Generating Distribution," relates regularized reconstruction functions to the data score.
- Radhakrishnan et al. (2020), "Overparameterized Neural Networks Implement Associative Memory," studies autoencoder iteration and memorization in input space.
- Bai, Kolter, and Koltun (2019), "Deep Equilibrium Models," uses fixed points as implicit representations, providing a related but architecturally distinct equilibrium perspective.

## Related Concepts

- [[concepts/dynamical-interpretability|Dynamical Interpretability]]
- [[concepts/dynamical-systems-reconstruction|Dynamical Systems Reconstruction]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/diffusion-models|Diffusion Models]]
