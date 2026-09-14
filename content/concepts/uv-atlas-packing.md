---
title: UV Atlas Packing
type: concept
aliases:
  - UV Chart Packing
  - Texture Atlas Packing
tags:
  - geometry-processing
  - uv-packing
  - combinatorial-optimization
---

## Overview

UV atlas packing arranges planar charts from a parameterized 3D surface inside a texture domain without overlap. Packing density measures how much of the enclosing domain is occupied by chart area. A dense atlas reduces unused texture space, but practical comparisons must also account for runtime, atlas aspect ratio, spacing between charts, and whether the algorithm changes the input geometry.

## Key Ideas

- **Placement and ordering interact.** A sequential packer must choose both the next chart and its translation and orientation. A locally dense placement can obstruct later charts, making a fixed area-descending order suboptimal.
- **Geometric accuracy costs computation.** No-fit polygons characterize relative placements through geometric operations such as Minkowski sums. Rasterized scanline approaches trade that geometric representation for cheaper placement and overlap tests.
- **Packing can preserve or change parameterization.** Rigid chart placement preserves the supplied patch shapes. Atlas-refinement approaches may instead introduce cuts or deform charts, so their density gains involve different constraints.
- **Hierarchical grouping reduces the search scope.** Nearly rectangular groups can be assembled with rectangular bin packing. In the learning-assisted method of Yang et al., learned ordering and pose proposals handle small groups, while a learned ranker selects which groups to form.
- **Learned proposals still need geometric enforcement.** Collision-constrained optimization converts coarse pose predictions into valid placements and can compact a completed arrangement. Predicting a promising action is distinct from guaranteeing non-overlap.
- **Holes and small charts matter.** A method that only approaches groups from outside may leave usable interior space inaccessible. Separate hole filling can recover some density, but adds runtime and does not eliminate restrictions on larger-chart placement.

## Important Papers

- [[papers/learning-based-2d-irregular-shape-packing|Learning based 2D Irregular Shape Packing]] (Yang et al., 2023): combines learned hierarchical grouping, small-horizon reinforcement learning, local optimization, and hole filling while preserving input chart geometry.
- Sander et al. (2003), "Multi-chart geometry images": evaluated as a heuristic packing baseline by Yang et al.
- Liu et al. (2019), "Atlas Refinement with Bounded Packing Efficiency": discussed by Yang et al. as an approach that changes patch geometry for packing quality.

## Related Concepts

- Irregular shape packing
- Rectangular bin packing
- No-fit polygons
- Mesh parameterization
- Reinforcement learning for combinatorial optimization
