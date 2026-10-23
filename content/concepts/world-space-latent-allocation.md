---
title: World-Space Latent Allocation
type: concept
aliases:
  - Budgeted World-Space Latent Allocation
tags:
  - 3d-gaussian-splatting
  - feed-forward-reconstruction
  - budgeted-representation
  - multi-view-reconstruction
---

## Overview

World-space latent allocation converts a dense, multi-view candidate field into a representation with a prescribed output cardinality. Instead of decoding an independent primitive for every image-aligned candidate and pruning afterward, it first groups latent candidates by predicted 3D location, allocates a finite integer budget among those groups, fuses repeated observations, and only then decodes retained candidates. [[PocketSplat: Mobile Gaussian Reconstruction via World-Space Latent Allocation]] applies this pattern to mobile [[3D Gaussian Splatting]].

## Key Ideas

- **Common spatial responsibility:** Predicted depth and cameras lift candidates from different views into shared world-space cells. This lets observations of the same local region participate in one capacity decision even when their image coordinates differ.
- **Exact constrained allocation:** Cell quotas obey lower support bounds and upper population capacities while summing exactly to a requested global budget. This makes representation size an application-controlled variable rather than a by-product of input sampling.
- **Redundancy-aware evidence:** Aggregating local detail within a cell and discounting repeated cross-view evidence can prevent repeatedly observed regions from receiving capacity merely because they appear in more images.
- **Latent fusion before materialization:** Features from selected and discarded observations are pooled before complete primitive attributes are decoded, allowing retained primitives to incorporate evidence that would be lost under independent decoding followed by pruning.
- **Support adaptation:** When a cell retains only $k$ of its $n$ candidates, each survivor represents more local area. Spatial responsibility decoding uses the compression ratio $n/k$ to enlarge Gaussian covariance, with learned modulation for scene-dependent adjustment.
- **Dependence on geometry:** Allocation quality relies on predicted depth and camera consistency. Incorrect world-space grouping can split corresponding observations or combine unrelated surfaces, and hard cell boundaries require careful numerical parity across deployment implementations.

## Important Papers

- [[PocketSplat: Mobile Gaussian Reconstruction via World-Space Latent Allocation]]: combines exact cell quotas, view-mean detail weighting, latent fusion, and scale-only spatial responsibility decoding for mobile feed-forward Gaussian reconstruction.

## Related Concepts

- [[3D Gaussian Splatting]]
- [[Adaptive Density Control in 3D Gaussian Splatting]]
- Multi-view reconstruction
- Representation budgeting
- Spatial feature aggregation
