---
title: Temporal-Aware Level-of-Detail Search
type: concept
aliases:
  - Temporal-Aware LoD Search
tags:
  - level-of-detail
  - temporal-coherence
  - 3d-gaussian-splatting
  - gpu-rendering
---

## Overview

Temporal-aware level-of-detail search reuses the previous frame's hierarchy selection as the starting point for the next frame. In a hierarchical [[3D Gaussian Splatting]] renderer, the selected nodes form a cut between coarse and fine scene representations. Smooth camera motion often changes only a small part of that cut, making local updates cheaper than repeatedly traversing from the root.

## Key Ideas

- **Cache the search frontier:** Retain the prior cut and identify the local subtrees containing it. Recompute the detail criterion for the current camera before accepting nodes.
- **Repair in both directions:** Move toward parents when the previous selection is too fine and toward children when it is too coarse. Temporal coherence reduces expected work; correctness requires completing the current cut even when coherence fails.
- **Separate reuse from GPU scheduling:** VOYAGER combines temporal reuse with breadth-first subtree ordering, shared-memory-sized chunks, and streaming work assignment. Either an irregular memory layout or imbalanced parallel work can limit the benefit of fewer node visits.
- **Distinguish exact selection from approximate rendering:** VOYAGER claims bit-accurate LoD results. Its exponential lookup table is a separate source of image approximation and does not establish approximate hierarchy selection.
- **State the motion assumption:** VOYAGER reports 99% cut overlap at LoD 6 in a simulated 60 FPS trajectory. That measurement is specific to its profiling setup; abrupt-motion performance is not established by it.

## Important Papers

- [[VOYAGER: Real-Time City-Scale 3D Gaussian Splatting on Resource-Constrained Devices]]: combines local cut updates with GPU-oriented traversal and rasterization acceleration.
- Kerbl et al. (2024), "A Hierarchical 3D Gaussian Representation for Real-Time Rendering of Very Large Datasets": provides the hierarchical representation used as VOYAGER's reference for selection.

## Related Concepts

- [[3D Gaussian Splatting]]
- [[Log-Space Opacity Culling]]: addresses the subsequent rasterization bottleneck in VOYAGER.
- [[Geometry-Aware Gaussian-Tile Culling]]: rejects unnecessary projected work after scene-level detail selection.
