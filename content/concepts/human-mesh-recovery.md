---
title: Human Mesh Recovery
type: concept
aliases:
  - HMR
tags:
  - computer-vision
  - human-mesh-recovery
  - 3d-reconstruction
---

## Overview

Human mesh recovery estimates a person's three-dimensional pose and surface shape from images or video, typically by predicting parameters of a human body model. Full-body systems also recover articulated hands and feet. Image alignment alone does not resolve depth, hidden joints, or the distinction between body shape and skeletal structure.

## Key Ideas

- The parametric representation constrains reconstruction. SMPL-family models encode pose and shape; Momentum Human Rig explicitly separates skeletal structure and surface shape, giving different control over the recovered body.
- Supervision quality and coverage are separate concerns. Monocular pseudo-labels provide diverse images but retain depth ambiguity; multi-view fitting and synthetic data provide stronger geometric supervision with their own coverage limits.
- Body and hand reconstruction can need different crops, data, and camera parameterizations. Dedicated hand estimates must still be reconciled with the full-body kinematic chain.
- MPJPE measures joint error, PVE measures vertex error, and Procrustes-aligned metrics remove some global discrepancies. Two-dimensional keypoint agreement and visual preference provide complementary evidence rather than interchangeable measures of 3D accuracy.
- Recovering a surface mesh does not by itself recover muscle activations, contact forces, or physical interactions.

## Important Papers

- [[papers/sam-3d-body-robust-full-body-human-mesh-recovery|SAM 3D Body: Robust Full-Body Human Mesh Recovery]]: combines promptable inference, body/hand specialization, and diverse fitted supervision.
- Loper et al. (2015), *SMPL: A Skinned Multi-Person Linear Model*: a parametric body representation cited by SAM 3D Body.
- Ferguson et al. (2025), *MHR: Momentum Human Rig*: the representation used by SAM 3D Body.

## Related Concepts

- [[concepts/promptable-human-mesh-recovery|Promptable Human Mesh Recovery]]
- [[concepts/video-based-biomechanics|Video-Based Biomechanics]]
