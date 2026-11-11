---
title: Modular Feature Inversion
type: concept
aliases:
  - Component-wise Feature Inversion
tags:
  - feature-inversion
  - model-interpretability
  - vision-transformers
---

## Overview

Modular feature inversion trains separate neural networks to approximately reverse successive components of a vision model. Composing these local inverses reconstructs an image from a selected intermediate representation, providing a visual diagnostic of recoverable color, shape, and scene structure.

## Key Ideas

- **Local supervision:** each inverse predicts the preceding component's representation, rather than learning a separate full path to pixels for every stage.
- **Reusable composition:** early inverse modules serve multiple reconstruction paths, reducing duplicated parameters. The savings depend on the selected components and inverse architectures.
- **Fidelity and interpretability differ:** lower pixel MSE can favor average-looking outputs. A structured reconstruction with higher MSE may still expose useful representational patterns.
- **Interventions strengthen interpretation:** recoloring inputs and corrupting selected tokens can test whether reconstructed features persist and whether information remains spatially local.
- **Decoder effects remain:** reconstruction artifacts may arise from the learned inverse, accumulated error, or forward information loss. Visual outputs alone cannot distinguish these causes or establish causal importance for a prediction.
- **Layer transfer is empirical:** matching token shapes allows an inverse to accept other layers, but useful reconstruction across those layers must be checked rather than assumed.

## Important Papers

- [[papers/understanding-transformer-based-vision-models-through-inversion|Understanding Transformer-based Vision Models through Inversion]] develops modular inversion and applies it to DETR and ViT, with additional DeiT III and Swin analyses.
- Dosovitskiy and Brox (2016), *Inverting Visual Representations with Convolutional Networks*, provides the full-path learned inversion approach contrasted with modular supervision.

## Related Concepts

- [[concepts/mechanistic-interpretability|Mechanistic Interpretability]]
- [[concepts/patch-token-decoding-explainability|Patch-Token Decoding Explainability]]: decodes class scores with an existing head rather than reconstructing pixels with learned inverse modules.
