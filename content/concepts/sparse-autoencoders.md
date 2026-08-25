---
title: Sparse Autoencoders
type: concept
aliases:
  - SAEs
  - Sparse Autoencoder Features
tags:
  - sparse-representations
  - mechanistic-interpretability
  - representation-learning
  - feature-discovery
---

## Overview

Sparse autoencoders (SAEs) learn an overcomplete, sparse representation of a model's dense activations. Their latent neurons are intended to separate polysemantic activations into features that are easier to inspect and intervene on. SAEs are used in mechanistic interpretability across language, vision, and multimodal models.

## Key Ideas

- An encoder maps a dense activation into an expanded latent vector, a sparsity mechanism selects or encourages a small number of active features, and a decoder reconstructs the original activation.
- Reconstruction fidelity and sparsity are competing objectives. Top-k, Batch Top-k, ReLU-threshold, JumpReLU, and Matryoshka variants make different choices about this tradeoff.
- A feature can be interpretable without being causally effective when its activation correlates with a concept but intervening on it does not reliably change model behavior. Interpretability and [[Model Steerability]] should therefore be evaluated separately.
- Feature coverage is not guaranteed by dictionary size. An SAE may miss user-relevant concepts or represent them only through entangled or composite features.
- Post-hoc evaluation can assign concepts to neurons using tools such as CLIP-Dissect, but the resulting labels depend on the probing data, concept vocabulary, and evaluator model.
- SAE variants can be combined with explicit concept supervision. [[Concept Bottleneck Sparse Autoencoders]] retain useful discovered features while adding a bottleneck for missing user-specified concepts.

## Important Papers

- [[Interpretable and Steerable Concept Bottleneck Sparse Autoencoders]]
- Pach et al. (2025), "Sparse autoencoders learn monosemantic features in vision-language models."
- Gao et al. (2025), "Scaling and evaluating sparse autoencoders."
- Huben et al. (2024), "Sparse autoencoders find highly interpretable features in language models."
- Oikarinen and Weng (2023), "CLIP-Dissect: Automatic description of neuron representations in deep vision networks."

## Related Concepts

- [[Concept Bottleneck Models]]
- [[Concept Bottleneck Sparse Autoencoders]]
- [[Model Steerability]]
- Feature disentanglement
- Dictionary learning
