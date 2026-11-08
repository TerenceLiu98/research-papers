---
title: Semantic Latent Space Editing
type: concept
tags:
  - image-editing
  - generative-models
---

## Overview

Semantic latent space editing changes selected properties of a generated or inverted image by manipulating a generative model's representations. Its central requirement is an intervention space where a change corresponds predictably to the desired attribute while retaining other content.

## Key Ideas

- Attribute directions can be estimated from differences between mean representations of positive and negative attribute groups, without paired images.
- The useful representation depends on the architecture. A U-Net bottleneck and a transformer input need not support the same editing behavior.
- In continuous-time generators, directions can vary with time. Interpolation makes directions stored on a fixed grid available to adaptive ODE solvers.
- Editing strength and timing determine the balance between attribute change and source preservation. Composable examples do not establish global disentanglement.
- Unsupervised PCA directions need not produce consistent semantics across samples; supervised directions and prompt-attention controls offer different sources of guidance.

## Important Papers

- [[papers/latent-space-editing-in-transformer-based-flow-matching|Latent Space Editing in Transformer-Based Flow Matching]]: identifies U-ViT u-space before patchification, demonstrates early-time attribute injection, and interpolates directions for adaptive sampling. Its PCA analysis also documents inconsistent semantic effects.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: learns the continuous dynamics in which time-dependent editing is applied.
- [[concepts/diffusion-models|Diffusion Models]]: another generative family studied for semantic representation manipulation.
