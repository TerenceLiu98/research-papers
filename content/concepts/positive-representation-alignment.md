---
title: Positive Representation Alignment
type: concept
aliases:
  - PRA
tags:
  - energy-based-models
  - representation-learning
---

## Overview

Positive Representation Alignment supplements contrastive energy learning by aligning intermediate features of real data with a frozen vision foundation model. It supplies dense semantic supervision on the positive side of the energy landscape.

## Key Ideas

- Project energy-model features into the teacher feature space and maximize patchwise cosine similarity on real samples.
- Exclude MCMC negatives: their off-manifold features can be unreliable alignment targets, and aligning them can conflict with the contrastive objective.
- Unlike noisy-to-clean representation alignment in diffusion training, both networks receive the same clean example; supervision shapes representations rather than directly supervising a denoising trajectory.
- Positive-only alignment is an empirical design choice, not a general guarantee. TEM-B reports FID 19.9 with PRA, 36.6 with positive-and-negative alignment, and 42.8 without alignment at 50K iterations.

## Important Papers

- [[papers/scaling-transformer-energy-based-models-for-high-quality-image-synthesis|Scaling Transformer Energy-Based Models for High Quality Image Synthesis]] introduces PRA with DINOv2-L supervision for latent-space contrastive image generation.

## Related Concepts

- [[concepts/inference-time-energy-minimization|Inference-Time Energy Minimization]]: representation quality shapes the energy landscape used for refinement.
- [[concepts/diffusion-models|Diffusion Models]]: provides the contrasting noisy-to-clean alignment setting.
