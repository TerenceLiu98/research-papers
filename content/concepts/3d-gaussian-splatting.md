---
title: 3D Gaussian Splatting
type: concept
aliases:
  - 3DGS
  - Gaussian Splatting
tags:
  - novel-view-synthesis
  - radiance-fields
  - differentiable-rendering
  - gpu-rendering
---

## Overview

3D Gaussian Splatting represents a scene with a collection of differentiable 3D Gaussian primitives. Each primitive stores a center, covariance, opacity, and appearance coefficients. During rendering, the primitives are projected to screen-space Gaussians and composited in depth order to synthesize novel views in real time.

## Key Ideas

- **Explicit scene primitives:** The scene is represented directly by spatial Gaussians rather than by evaluating a neural field at every sample point.
- **Screen-space projection:** A projected Gaussian becomes a 2D ellipse whose covariance determines its footprint and whose opacity controls its contribution.
- **Tile-based rasterization:** The image is partitioned into tiles; a preprocessing stage assigns Gaussians to potentially intersecting tiles, depth sorting orders those assignments, and a render stage performs front-to-back alpha compositing.
- **Representation-computation trade-off:** More or larger Gaussians can improve scene coverage but increase tile assignments and compositing work. Conservative footprints can therefore become a rendering bottleneck even when the scene representation itself is unchanged.
- **Rasterizer optimization:** Methods such as [[Geometry-Aware Gaussian-Tile Culling]] reduce false-positive tile assignments by using more informed approximations of projected Gaussian support.

## Important Papers

- [[QuadBox: Accelerating 3D Gaussian Splatting with Geometry-Aware Boxes]]
- Kerbl, Kopanas, Leimkuehler, and Drettakis (2023), "3D Gaussian Splatting for Real-Time Radiance Field Rendering."
- Zwicker, Pfister, van Baar, and Gross (2002), "EWA Splatting."
- Yu et al. (2024), "Mip-Splatting: Alias-Free 3D Gaussian Splatting."
- Wang, Yi, and Ma (2024), "AdR-Gaussian: Accelerating Gaussian Splatting with Adaptive Radius."

## Related Concepts

- [[Geometry-Aware Gaussian-Tile Culling]]
- [[Multi-View Motion Diffusion]]
- Differentiable rendering
- Neural radiance fields
- Alpha compositing
- Novel view synthesis
