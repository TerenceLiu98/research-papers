---
title: Human-Object Interaction Reconstruction
type: concept
aliases:
  - 3D Human-Object Interaction Reconstruction
  - HOI Motion Reconstruction
tags:
  - human-object-interaction
  - 3d-reconstruction
  - human-motion
  - computer-vision
  - motion-capture
---

## Overview

Human-object interaction reconstruction estimates the time-varying 3D motion of a person and one or more objects from visual observations. A useful reconstruction must preserve human pose, object pose, relative alignment, contact, and, when possible, trajectories in a shared world coordinate frame. The problem is harder than human-only reconstruction because objects may be partially occluded, symmetric, freely moving, or represented by category-specific geometry.

## Key Ideas

- Monocular 2D observations leave depth and global translation ambiguous for both the human and the object, so temporal priors, camera geometry, and reprojection objectives are commonly combined.
- Object motion can be represented by tracked semantic keypoints or canonical mesh points; fitting a rigid pose then estimates rotation, translation, and scale over time.
- Contact and penetration are useful behavioral checks in addition to joint and object-keypoint errors, because numerically plausible trajectories can still describe an implausible interaction.
- Category-specific representations can transfer interaction patterns across instances, but they also limit generalization to objects and geometries covered by training data.
- [[AnyLift: Scaling Motion Reconstruction from Internet Videos via 2D Diffusion]] uses category-specific multi-view 2D diffusion to reconstruct human and object motion under static and dynamic camera settings.

## Important Papers

- [[AnyLift: Scaling Motion Reconstruction from Internet Videos via 2D Diffusion]]
- Bhatnagar et al. (2022), "BEHAVE: Dataset and method for tracking human object interactions."
- Xie, Bhatnagar, and Pons-Moll (2022), "CHORE: Contact, human and object reconstruction from a single RGB image."
- Xie, Bhatnagar, and Pons-Moll (2023), "Visibility aware human-object interaction tracking from single RGB camera."
- Huang, Taheri, Black, and Tzionas (2024), "InterCap: Joint markerless 3D tracking of humans and objects in interaction from multi-view RGB-D images."

## Related Concepts

- [[Global 3D Motion Lifting]]
- [[Multi-View Motion Diffusion]]
- [[Epipolar Geometry]]
- Motion capture
- 3D reconstruction
