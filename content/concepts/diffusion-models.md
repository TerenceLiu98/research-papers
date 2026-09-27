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

- In continuous Gaussian diffusion, the forward process adds Gaussian noise over a sequence of timesteps; the reverse process iteratively predicts less noisy states until a sample is obtained.
- Gaussian denoising diffusion probabilistic models can be understood through score estimation: predicted noise is related to the gradient of the noisy data's log density by a noise-level-dependent scaling and sign.
- [[concepts/discrete-diffusion-models|Discrete Diffusion Models]] instead corrupt categorical states through transition matrices. Structured kernels can encode ordinal locality or use [[concepts/absorbing-state-diffusion|Absorbing-State Diffusion]] to replace tokens with persistent masks. Austin et al.'s D3PM experiments show that the useful corruption structure depends on the data domain.
- Classifier guidance adds gradients from an external noisy-image classifier, while classifier-free guidance interpolates conditional and unconditional denoising predictions without that classifier.
- Latent diffusion performs the process in a lower-dimensional VAE latent space, reducing computation while relying on the decoder to recover image-space detail.
- Diffusion priors can also model temporal 2D motion and support multi-view completion when combined with geometric constraints. [[Multi-View Motion Diffusion]] applies this idea to 3D motion lifting.
- [[AnyLift: Scaling Motion Reconstruction from Internet Videos via 2D Diffusion]] conditions motion diffusion on camera trajectories and epipolar lines to synthesize multi-view evidence for dynamic-camera 3D reconstruction.
- Guidance and reconstruction terms create a quality-control tradeoff: stronger conditioning can improve target validity but increase distortion or instability. [[Visual Counterfactual Explanations]] make this tradeoff explicit by combining semantic validity with proximity to a source image.
- Diffusion can also act as a training curriculum for recurrent computation rather than solely as a sampling procedure. [[papers/diffusion-as-a-training-curriculum-for-timestep-free-iterative-reasoning|Diffusion as a Training Curriculum for Timestep-Free Iterative Reasoning]] trains a timestep-free denoiser with ordered annealed corruption, then preserves its hidden memory while injecting fresh maximal noise during iterative Sudoku inference.
- Diffusion can jointly generate data and parameters for a downstream dynamics model. Diff-MN learns the joint distribution of regularized time series and NCDE expert-mixture weights, then uses each generated pair for [[concepts/continuous-time-series-generation|Continuous Time Series Generation]]. It generates mixture coefficients over pretrained experts, rather than all neural-network parameters.

## Important Papers

- [[papers/structured-denoising-diffusion-models-in-discrete-state-spaces|Structured Denoising Diffusion Models in Discrete State-Spaces]]
- [[Concept-based Visual Counterfactual Explanations with Diffusion Models]]
- [[Lifting Motion to the 3D World via 2D Diffusion]]
- [[AnyLift: Scaling Motion Reconstruction from Internet Videos via 2D Diffusion]]
- [[papers/diffusion-as-a-training-curriculum-for-timestep-free-iterative-reasoning|Diffusion as a Training Curriculum for Timestep-Free Iterative Reasoning]]
- Ho, Jain, and Abbeel (2020), "Denoising diffusion probabilistic models."
- [[papers/diff-mn-diffusion-parameterized-moe-ncde-for-continuous-time-series-generation-with-irregular-observations|Diff-MN: Diffusion Parameterized MoE-NCDE for Continuous Time Series Generation with Irregular Observations]]
- Ho and Salimans (2022), "Classifier-free diffusion guidance."
- Dhariwal and Nichol (2021), "Diffusion models beat GANs on image synthesis."
- Jeanneret, Simon, and Jurie (2022), "Diffusion models for counterfactual explanations."

## Related Concepts

- [[concepts/discrete-diffusion-models|Discrete Diffusion Models]]
- [[concepts/absorbing-state-diffusion|Absorbing-State Diffusion]]
- [[Visual Counterfactual Explanations]]
- [[Concept Bottleneck Models]]
- [[Model Steerability]]
- [[concepts/adaptive-computation|Adaptive Computation]]
- Generative modeling
- Conditional generation
