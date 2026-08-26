---
title: Dynamic 3D Gaussian Splatting
type: concept
aliases:
  - Dynamic Gaussian Splatting
  - Dynamic 3DGS
tags:
  - 3d-gaussian-splatting
  - dynamic-3d-reconstruction
  - novel-view-synthesis
  - motion-modeling
---

## Overview

Dynamic 3D Gaussian Splatting extends [[3D Gaussian Splatting]] from static scenes to time-varying geometry and appearance. A canonical set of Gaussian primitives is transformed at each time step, either by directly parameterizing Gaussian motion or by using a smaller set of control nodes whose trajectories are interpolated to the Gaussians. The goal is to preserve 3DGS rendering efficiency while modeling non-rigid motion and temporal consistency.

## Key Ideas

- **Canonical representation:** Gaussians are stored in a reference state, and time-dependent transforms produce the scene at each frame.
- **Sparse motion control:** Control nodes, scaffolds, or other compact structures reduce the number of independently optimized motion parameters relative to per-Gaussian deformation.
- **Motion-aware allocation:** Uniform geometric sampling can waste control capacity on static backgrounds. Semantic, tracking, depth, or foreground cues can instead preserve higher node density where motion is complex.
- **Trajectory regularization:** Splines and other low-dimensional temporal parameterizations impose smoothness and can improve optimization stability under sparse monocular supervision.
- **Deformation interpolation:** RBF-weighted blending, linear blend skinning, or dual quaternion blending transfers sparse control motion to nearby Gaussians while approximating locally coherent deformation.
- **Multi-signal supervision:** RGB reconstruction can be complemented by depth, masks, 2D tracks, and local rigidity constraints, but each additional prior introduces sensitivity to prediction errors.

## Important Papers

- [[From Tokens to Nodes: Semantic-Guided Motion Control for Dynamic 3D Gaussian Splatting]]
- Huang et al. (2023), "SC-GS: Sparse-Controlled Gaussian Splatting for Editable Dynamic Scenes."
- Wu et al. (2024), "4D Gaussian Splatting for Real-Time Dynamic Scene Rendering."
- Yang et al. (2024), "Deformable 3D Gaussians for High-Fidelity Monocular Dynamic Scene Reconstruction."
- Lei et al. (2025), "MoSca: Dynamic Gaussian Fusion from Casual Videos via 4D Motion Scaffolds."
- Liang, Xu, and Kikuchi (2025), "HiMoR: Monocular Deformable Gaussian Reconstruction with Hierarchical Motion Representation."

## Related Concepts

- [[3D Gaussian Splatting]]
- Sparse control points
- Dynamic scene reconstruction
- Novel-view synthesis
- Non-rigid deformation
