---
title: "Navigating the Latent Space Dynamics of Neural Models"
type: paper
authors:
  - Marco Fumero
  - Luca Moschella
  - Emanuele Rodolà
  - Francesco Locatello
year: null
tags:
  - representation-learning
  - autoencoders
  - dynamical-systems
  - memorization
  - out-of-distribution-detection
---

## TL;DR

This paper treats an autoencoder as a dynamical system in latent space by repeatedly applying its decoder and encoder. The resulting [[concepts/latent-vector-fields|latent vector field]] exposes attractors and trajectories that the authors use to study memorization and generalization, recover a signal dictionary from pretrained weights without input data, and detect distribution shifts.

## Research Question

What do the trajectories and fixed points induced by repeatedly applying an autoencoder's latent self-map reveal about the model, its learned data distribution, and the information stored in its weights?

## Motivation

Representations are usually analyzed as static latent points. The paper instead studies the map $f(z)=E(D(z))$ and its iterates, requiring no additional training. This view makes the model's long-run behavior available for analysis and connects regularization, contraction, fixed points, and the geometry of the learned latent distribution.

## Contributions

- Defines a latent vector field from the discrete dynamics $z_{t+1}=f(z_t)$, with residual field $f(z)-z$, for autoencoder-style models.
- Argues that common explicit and implicit regularizers make neural mappings locally contractive and thereby promote stable fixed points.
- Connects trajectories to ascent toward high-density regions of the latent marginal under stated smoothness, training, and contraction assumptions.
- Interprets attractors as a dictionary spanning regimes between memorization and generalization, and tracks this structure during training.
- Demonstrates data-free probing of a Stable Diffusion autoencoder and trajectory-based out-of-distribution detection with a pretrained ViT-MAE.

## Method

For an encoder $E$ and decoder $D$, the paper defines the latent self-map $f=E\circ D$ and iterates $z_{t+1}=f(z_t)$. Its continuous-time analogue is $\partial z/\partial t=f(z)-z$. A fixed point $z^*=f(z^*)$ is an attractor when the eigenvalues of the local Jacobian have magnitude below one; initial states converging to it form its basin of attraction.

The theoretical analysis assumes smooth latent densities and local contraction. Under additional training-optimality and Jacobian-regularization assumptions, the residual direction is related to ascent in the latent log density. A separate bound decomposes reconstruction error into error to the decoded nearest-attractor prototype and a latent coverage term scaled by the decoder's Lipschitz constant. The paper also derives local exponential convergence near an attractor from the spectral norm of its Jacobian.

## Experiments

On convolutional autoencoders trained on MNIST, FashionMNIST, and CIFAR, the authors vary bottleneck dimension and follow training over time. Strong bottleneck regularization produces fewer attractors resembling training samples and worse test reconstruction, while better-generalizing models develop a richer attractor set. In the reported training trace, attractors reached from data and Gaussian noise become more similar even though their trajectories remain distinguishable.

For data-free weight probing, 4,096 attractors are obtained by initializing the Stable Diffusion autoencoder with Gaussian noise. Used as an Orthogonal Matching Pursuit dictionary, these attractors reconstruct samples from six image datasets with lower error than a random orthogonal latent basis across the reported sparsity levels.

For OOD detection, trajectories from a ViT-MAE pretrained on ImageNet are scored by their mean distance to attractors computed from 2,000 training images. Across SUN397, Places365, Textures, and iNaturalist, the attractor-distance score reports AUROC values from 90.99 to 92.63 and FPR95 values from 25.85 to 29.95, outperforming the paper's KNN, Mahalanobis-distance, and reconstruction-error baselines.

## Limitations

The main construction directly applies to encoder-decoder self-maps, not arbitrary discriminative models. Extensions to self-supervised encoders and language models are preliminary and require a decoder or a compatible input-output representation space. The density and convergence results rely on smoothness, local contraction, and training assumptions that are not generally guaranteed; empirical contraction does not establish them globally. The data-free experiment shows that noise-derived attractors form a useful reconstruction dictionary, but decoded Stable Diffusion attractors are described as geometric or textural rather than individually semantic. The authors also leave the formation and alignment of vector fields across training and across models for future work.

## Related Concepts

- [[concepts/latent-vector-fields|Latent Vector Fields]]
- [[concepts/dynamical-interpretability|Dynamical Interpretability]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/diffusion-models|Diffusion Models]]

## Related Papers

- Alain and Bengio (2014), "What Regularized Auto-Encoders Learn from the Data-Generating Distribution."
- Radhakrishnan et al. (2020), "Overparameterized Neural Networks Implement Associative Memory."
- Rifai et al. (2011), "Contractive Auto-Encoders: Explicit Invariance During Feature Extraction."
- He et al. (2022), "Masked Autoencoders Are Scalable Vision Learners."
- Rombach et al. (2022), "High-Resolution Image Synthesis with Latent Diffusion Models."

[[index|Library home]]
