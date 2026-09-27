---
title: Diffusion Forcing
type: concept
tags:
  - sequence-modeling
  - diffusion-models
  - video-prediction
---

## Overview

Diffusion forcing models sequences with a separate noise level for each frame or token. This permits a trajectory to contain relatively clean context alongside noisy future elements, connecting conditional next-step prediction with sequence denoising. Nano World Models uses this interface to share training and sampling machinery across future-video prediction settings.

## Key Ideas

- **Noise varies within a sequence.** A trajectory carries a vector of noise indices, rather than requiring every element to occupy the same denoising stage. Changing the noise schedule can express teacher-forced prediction, masked future prediction, or autoregressive generation.
- **The interface and the target are distinct.** NanoWM supports clean-data, noise, and velocity prediction, as well as flow-matching objectives, within a common sequence interface. Its RT-1 experiment changes both prediction target and noise schedule, so it does not establish a target-only ranking.
- **Finite context can support extended generation.** Predicted frames become context for later predictions, and a sliding attention window bounds the history. This enables longer sequences than the training window while retaining the risk of compounding error.
- **Sampling budget affects fidelity.** NanoWM reports lower rollout LPIPS with more DDIM steps. This is evidence that denoising effort can mitigate error in its video-generation setting, without demonstrating unlimited temporal consistency.
- **Action conditioning needs separate evidence.** A denoising model can learn future features while barely using actions. NanoWM's PushT diagnostics compare ground-truth, zero, and random actions to distinguish action-sensitive prediction from visually or semantically plausible extrapolation.

## Important Papers

- Chen et al. (2024), "Diffusion forcing: Next-token prediction meets full-sequence diffusion," is the foundational method cited by Nano World Models.
- [[papers/nano-world-models-a-minimalist-implementation-of-future-video-prediction|Nano World Models: A Minimalist Implementation of Future Video Prediction]] uses diffusion forcing as a shared experimental interface and measures target-schedule effects, action sensitivity, and rollout error.

## Related Concepts

- [[concepts/diffusion-models|Diffusion Models]] provide the iterative denoising foundation.
- [[concepts/world-models|World Models]] use learned temporal predictions for simulation and planning; a sequence generator's usefulness for control requires additional evaluation.
