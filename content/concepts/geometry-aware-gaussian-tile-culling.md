---
title: Geometry-Aware Gaussian-Tile Culling
type: concept
aliases:
  - Gaussian-Tile Intersection Culling
  - QuadBox Culling
tags:
  - 3d-gaussian-splatting
  - geometric-culling
  - rasterization
  - gpu-rendering
  - bounding-volumes
---

## Overview

Geometry-aware Gaussian-tile culling reduces rasterization work by rejecting image tiles that fall outside the meaningful screen-space support of a projected Gaussian. The central challenge is to approximate an oriented ellipse with inexpensive, tile-aligned bounds: loose bounds preserve coverage but create false positives, while aggressive bounds can remove pixels that affect the rendered image.

## Key Ideas

- **Opacity-supported footprints:** A Gaussian's effective support can be defined using the opacity threshold below which the renderer already ignores splats. This produces a tighter target region than a covariance-based box with a fixed conservative radius.
- **Axis-aligned decomposition:** A rotated ellipse can be approximated with several axis-aligned sub-boxes. In QuadBox, a major-axis DualBox is supplemented by adaptively stretched boxes covering the remaining minor-axis regions.
- **Geometry-aware stretching:** For inverse covariance $\Lambda=[a,b;b,c]$, the QuadBox stretch factor is $f=\sqrt{1-b^2/(ac)}$. It is independent of the opacity threshold and center translation, so the geometry can be constructed once per Gaussian.
- **Discrete traversal:** QPass converts sub-box bounds to tile coordinates, scans the shorter global tile axis, and merges active intervals with integer min/max tests. This avoids repeated tile visits and reduces branch divergence from independently traversing every box.
- **Coverage versus speed:** The method trades the complexity of exact ellipse intersection for conservative box coverage. Its value is highest when the baseline bounding box includes many non-contributing tiles; aggressive simplifications such as DualBox alone can harm image fidelity.

## Important Papers

- [[QuadBox: Accelerating 3D Gaussian Splatting with Geometry-Aware Boxes]]
- Wang, Yi, and Ma (2024), "AdR-Gaussian: Accelerating Gaussian Splatting with Adaptive Radius."
- Kerbl, Kopanas, Leimkuehler, and Drettakis (2023), "3D Gaussian Splatting for Real-Time Radiance Field Rendering."
- Feng et al. (2025), "FlashGS: Efficient 3D Gaussian Splatting for Large-Scale and High-Resolution Rendering."

## Related Concepts

- [[3D Gaussian Splatting]]
- Tile-based rasterization
- Bounding-volume hierarchies
- Interval overlap testing
- Conservative rasterization
