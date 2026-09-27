---
title: World Models
type: concept
tags:
  - world-models
  - model-based-control
  - video-prediction
  - representation-learning
---

## Overview

World models learn predictive descriptions of an environment from observation histories, often conditioned on actions. Their predictions can support simulation or planning by estimating the consequences of candidate action sequences. A model may predict RGB observations, reconstructible latents, or semantic features; these representations expose different aspects of prediction quality.

## Key Ideas

- **Prediction and decision-making are distinct evaluations.** Image similarity measures how well observations are reproduced. Goal-reaching success tests whether predicted consequences help select effective actions. Strong visual metrics alone do not establish controllable dynamics.
- **Model predictive control closes the loop.** A planner evaluates candidate action sequences using the learned model, executes the first action of its selected sequence, observes the actual next state, and replans. NanoWM uses CEM to refine the candidate distribution.
- **Representation choice interacts with training.** Reconstruction-oriented VAE features can be decoded to pixels; semantic features need not have an RGB decoder. A common latent-prediction interface does not guarantee equally useful action-conditioned dynamics across these spaces.
- **Action sensitivity is a diagnostic.** Compare predictions under ground-truth, zero, and random actions within the same representation. In NanoWM's tested PushT checkpoints, VAE predictions respond to actions while Web-DINO and V-JEPA 2.1 predictions are almost unchanged. This finding is limited to those checkpoints and their training recipe.
- **Longer generation is not sustained accuracy.** Sliding-window prediction extends beyond the training horizon, but errors in generated context can accumulate. NanoWM's CSGO experiment preserves coarse scene structure while losing fine visual detail.
- **Generated views are inputs to geometry estimation.** Exporting predicted video to a reconstruction system can produce persistent scene assets. Their geometric accuracy depends on both the generated observations and the separate reconstruction system.

## Important Papers

- Ha and Schmidhuber (2018), "Recurrent world models facilitate policy evolution," is a foundational world-model reference cited by NanoWM.
- [[papers/nano-world-models-a-minimalist-implementation-of-future-video-prediction|Nano World Models: A Minimalist Implementation of Future Video Prediction]] compares video prediction and planning across modeling choices, including a negative result for semantic-latent planning under its tested recipe.
- Zhou et al. (2024), "DINO-WM: World models on pre-trained visual features enable zero-shot planning," is cited by NanoWM as a feature-based world-model approach and dataset source.

## Related Concepts

- [[concepts/diffusion-forcing|Diffusion Forcing]] connects conditional sequence prediction and progressive generation through per-frame noise levels.
- [[concepts/diffusion-models|Diffusion Models]] support generative observation prediction in pixel or latent spaces.
- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] learn predictive representations; downstream controllability depends on more than representation prediction alone.
