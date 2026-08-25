---
title: Video-Based Biomechanics
type: concept
aliases:
  - Visual Biomechanics
tags:
  - biomechanics
  - human-motion
  - motion-capture
  - computer-vision
  - musculoskeletal-modeling
---

## Overview

Video-based biomechanics estimates forces, joint dynamics, muscle activations, or other internal movement states from visual observations. It extends human motion capture beyond pose and surface geometry, but the inverse problem is underdetermined: the same visible pose can arise from different velocities, contact states, loads, and muscle-recruitment patterns.

## Key Ideas

- A sequential pipeline first estimates kinematics and then applies simulation or a motion-to-muscle model. This is practical, but errors in visual pose reconstruction can propagate into biomechanical estimates.
- Joint visual-kinematic models keep image evidence, pose priors, temporal context, and biomechanical supervision in one representation. [[BioHuman: Learning Biomechanical Human Representations from Video|BioHuman]] uses this design to predict pose and muscle activation together.
- Temporal windows provide velocity, acceleration, phase, and contact cues that are unavailable from a single image. Interleaving visual and pose tokens lets temporal attention use these cues jointly.
- Biomechanical labels can be produced by inverse kinematics, ground-reaction-force estimation, inverse dynamics, and static optimization when direct full-body measurements are unavailable. Such labels are useful for supervision but retain the assumptions and domain gap of the simulator.
- Evaluation should separate kinematic accuracy from internal-state accuracy. Muscle metrics such as PCC, RMSE, normalized RMSE, and active-entry MAE measure different aspects of activation prediction.

## Important Papers

- [[BioHuman: Learning Biomechanical Human Representations from Video]]
- Uhlrich et al. (2023), "OpenCap: Human Movement Dynamics from Smartphone Videos."
- Werling et al. (2023), "AddBiomechanics: Automating Model Scaling, Inverse Kinematics, and Inverse Dynamics from Human Motion Data through Sequential Optimization."
- Gozlan et al. (2025), "OpenCapBench: A Benchmark to Bridge Pose Estimation and Biomechanics."
- Gilon et al. (2026), "OpenCap Monocular: 3D Human Kinematics and Musculoskeletal Dynamics from a Single Smartphone Video."

## Related Concepts

- [[Muscle Activation Estimation]]
- Motion capture
- Human pose estimation
- Musculoskeletal modeling
- Inverse dynamics
