---
title: Diffusion Models
type: concept
aliases:
  - DDPMs
  - Denoising Diffusion Probabilistic Models
tags:
  - generative-models
  - image-generation
  - denoising
  - controllable-generation
---

## Overview

Diffusion models learn to generate data by reversing a gradual noising process. A denoising network predicts how to move each noisy state toward the data distribution, providing a flexible prior for image synthesis, editing, and conditional generation.

## Key Ideas

- The forward process adds Gaussian noise over a sequence of timesteps; the reverse process iteratively predicts less noisy states until a sample is obtained.
- Denoising diffusion probabilistic models can be understood through score estimation: the predicted noise is a scaled form of the gradient of log data density.
- Classifier guidance adds gradients from an external noisy-image classifier, while classifier-free guidance interpolates conditional and unconditional denoising predictions without that classifier.
- Latent diffusion performs the process in a lower-dimensional VAE latent space, reducing computation while relying on the decoder to recover image-space detail.
- Guidance and reconstruction terms create a quality-control tradeoff: stronger conditioning can improve target validity but increase distortion or instability. [[Visual Counterfactual Explanations]] make this tradeoff explicit by combining semantic validity with proximity to a source image.

## Important Papers

- [[Concept-based Visual Counterfactual Explanations with Diffusion Models]]
- Ho, Jain, and Abbeel (2020), "Denoising diffusion probabilistic models."
- Ho and Salimans (2022), "Classifier-free diffusion guidance."
- Dhariwal and Nichol (2021), "Diffusion models beat GANs on image synthesis."
- Jeanneret, Simon, and Jurie (2022), "Diffusion models for counterfactual explanations."

## Related Concepts

- [[Visual Counterfactual Explanations]]
- [[Concept Bottleneck Models]]
- [[Model Steerability]]
- Generative modeling
- Conditional generation

