---
title: Global 3D Motion Lifting
type: concept
aliases:
  - Global 3D Motion Estimation
  - 2D-to-3D Motion Lifting
tags:
  - 3d-motion
  - pose-estimation
  - computer-graphics
  - embodied-ai
---

## Overview

Global 3D motion lifting estimates a temporally coherent 3D pose, body configuration, and world-space trajectory from lower-dimensional observations such as a single-view 2D pose sequence. It differs from root-relative pose lifting because it must recover the subject's global translation and orientation as well as local joint structure.

## Key Ideas

- Single-view 2D observations leave depth and global translation ambiguous, so successful systems combine temporal priors, body models, camera geometry, or optimization objectives.
- Paired 2D and 3D motion data supports direct regression but can limit performance on motions outside the training distribution.
- Diffusion priors can supply plausible motion structure when 3D supervision is unavailable, while multi-view reprojection constraints provide additional geometric information.
- Evaluation should distinguish local joint accuracy from world-space root trajectory accuracy; a method can perform well on one and poorly on the other.
- Global motion lifting applies beyond humans when the observation model and pose representation support animals or articulated objects.

## Important Papers

- [[Lifting Motion to the 3D World via 2D Diffusion]]
- Shin, Kim, Halilaj, and Black (2024), "WHAM: Reconstructing world-grounded humans with accurate 3D motion."
- Zhu et al. (2023), "MotionBERT: A unified perspective on learning human motion representations."
- Kapon, Tevet, Cohen-Or, and Bermano (2024), "MAS: Multi-view ancestral sampling for 3D motion generation using 2D diffusion."

## Related Concepts

- [[Epipolar Geometry]]
- [[Multi-View Motion Diffusion]]
- [[Diffusion Models]]
- Human pose estimation
- Motion capture

