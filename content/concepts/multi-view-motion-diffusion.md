---
title: Multi-View Motion Diffusion
type: concept
aliases:
  - Multi-View 2D Motion Diffusion
  - Consistent Multi-View Motion Generation
tags:
  - diffusion-models
  - 3d-motion
  - multi-view-geometry
  - motion-generation
---

## Overview

Multi-view motion diffusion uses diffusion models to generate or complete motion observations from several camera views while preserving temporal plausibility and geometric consistency. The views may be generated directly, optimized under geometric constraints, or learned from synthetic projections of fitted 3D motion.

## Key Ideas

- A 2D motion diffusion prior can provide realistic pose sequences even when synchronized multi-view training observations are unavailable.
- Conditioning on epipolar lines supplies pairwise geometric structure; cross-view attention or joint optimization can strengthen consistency across all generated views.
- A practical pipeline can bootstrap strict multi-view data by fitting 3D motion to roughly consistent views and reprojecting the result into known camera configurations.
- Camera-trajectory conditioning allows the generated views to account for moving cameras, while a hybrid source of global Internet-video poses and local projected poses can expand limited viewpoint coverage.
- Score Distillation Sampling can optimize motion observations toward a diffusion prior, but the resulting views may still deviate from the input or fail to be globally consistent.
- Consistency and realism should be evaluated separately, using reprojection or cross-view errors alongside motion-quality measures.

## Important Papers

- [[Lifting Motion to the 3D World via 2D Diffusion]]
- [[AnyLift: Scaling Motion Reconstruction from Internet Videos via 2D Diffusion]]
- Kapon, Tevet, Cohen-Or, and Bermano (2024), "MAS: Multi-view ancestral sampling for 3D motion generation using 2D diffusion."
- Tevet et al. (2023), "Human motion diffusion model."
- Poole et al. (2022), "DreamFusion: Text-to-3D using 2D diffusion."

## Related Concepts

- [[Global 3D Motion Lifting]]
- [[Epipolar Geometry]]
- [[Diffusion Models]]
- Motion synthesis
- Score Distillation Sampling

