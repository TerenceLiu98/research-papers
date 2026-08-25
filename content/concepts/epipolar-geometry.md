---
title: Epipolar Geometry
type: concept
aliases:
  - Epipolar Constraints
  - Multi-View Geometry
tags:
  - computer-vision
  - multi-view-geometry
  - 3d-reconstruction
  - pose-estimation
---

## Overview

Epipolar geometry describes the geometric relationship between observations of the same 3D point in two camera views. A point in one image constrains its correspondence in the other image to an epipolar line, providing a camera-dependent condition for multi-view reconstruction.

## Key Ideas

- Relative camera rotation and translation define an essential matrix; camera intrinsics convert it into a fundamental matrix that maps an observed point to an epipolar line.
- Epipolar constraints reduce correspondence search from a two-dimensional image region to a one-dimensional line, but they do not by themselves identify the correct point or guarantee global consistency across many views.
- Multi-view objectives can apply pairwise epipolar constraints across all camera pairs, while reprojection objectives connect a 3D estimate back to observed 2D points.
- In [[Lifting Motion to the 3D World via 2D Diffusion]], simulated or computed epipolar lines condition 2D motion diffusion and regularize generated views before 3D fitting.

## Important Papers

- [[Lifting Motion to the 3D World via 2D Diffusion]]

## Related Concepts

- [[Global 3D Motion Lifting]]
- [[Multi-View Motion Diffusion]]
- 3D reconstruction
- Camera calibration
- Reprojection error
