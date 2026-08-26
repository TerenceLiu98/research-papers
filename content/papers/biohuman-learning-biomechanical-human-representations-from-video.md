---
title: "BioHuman: Learning Biomechanical Human Representations from Video"
type: paper
authors:
  - Yujun Huo
  - He Zhang
  - Chentao Song
  - Honglin Song
  - Zongyu Zuo
  - Tao Yu
year: null
tags:
  - biomechanical-modeling
  - human-motion
  - motion-capture
  - muscle-activation
  - video-understanding
---

## TL;DR

BioHuman introduces BioHuman10M, a dataset of approximately 10 million paired video, SMPL motion, ground-reaction-force, and muscle-activation frames generated from five motion datasets. Its BioSim pipeline converts SMPL motion into OpenSim-compatible biomechanics, while the BioHuman model uses PromptHMR features and a motion-visual temporal transformer to predict 72-D SMPL pose and 112-D muscle activations jointly from monocular video. On the supplied test protocol, BioHuman improves muscle-activation PCC from 0.42 to 0.71 over a PromptHMR+MinT two-stage baseline and also improves the reported pose metrics.

## Research Question

Can a model infer both observable human motion and internal muscle activation patterns from monocular video when trained on a large dataset that aligns visual observations, kinematics, ground-reaction forces, and biomechanical simulation outputs? The paper specifically asks whether joint visual-kinematic modeling avoids the error propagation of a pipeline that first estimates pose and then predicts muscle activations.

## Motivation

Video-based motion capture usually recovers surface geometry and kinematics, but does not explain the internal musculoskeletal state that produces movement. Full-body activation labels are difficult to collect because they require motion capture, force measurements, EMG or biomechanical modeling, and expert processing. Existing visual-to-biomechanics systems commonly separate motion reconstruction from downstream simulation or muscle prediction, so errors in the first stage can propagate into the second. BioHuman treats motion and activation as coupled outputs and uses temporal visual evidence to resolve activation ambiguity that cannot be determined from a single pose.

## Contributions

- Constructs BioHuman10M by augmenting MotionPRO, EMDB, 3DPW, Human3.6M, and BEDLAM with biomechanically simulated labels.
- Introduces BioSim, which maps SMPL motion through an OpenSim full-body model, synthesized ground-reaction forces, inverse dynamics, and static optimization to estimate muscle activations.
- Proposes BioHuman, an end-to-end monocular video model with a shared visual-kinematic temporal representation and separate pose and muscle heads.
- Shows that the joint model improves both muscle-activation prediction and motion estimation relative to the reported two-stage and monocular HMR baselines.

## Method

### BioHuman10M and BioSim

BioHuman10M combines video and motion data from MotionPRO, EMDB, 3DPW, Human3.6M, and BEDLAM. The supplementary dataset statistics report 10.1M frames: 4.7M from MotionPRO, 34K from EMDB, 55K from 3DPW, 73K from Human3.6M, and 5.3M from BEDLAM. Each aligned sample can include RGB observations, SMPL pose, ground-reaction forces, and a 112-D muscle-activation vector.

BioSim converts SMPL sequences into OpenSim-compatible kinematics using the ULBS-112 full-body model. It places 87 virtual markers at anatomical landmarks, scales the model using subject-specific body shape and mass, and uses inverse kinematics to recover joint trajectories. GaitDynamics then synthesizes three-dimensional foot ground-reaction forces and center-of-pressure locations from the kinematics, height, and mass. Inverse dynamics computes joint moments, and OpenSim static optimization estimates activations by minimizing an effort objective subject to the muscle-force and moment constraints.

The generated labels are filtered and smoothed. Sequences are retained only when the maximum inverse-kinematics marker error is at most 15 cm and the static-optimization constraint violation is at most $10^{-11}$. Activation trajectories are smoothed with an 11-frame, order-2 Savitzky-Golay filter at 30 fps and clipped to $[0,1]$. These choices improve numerical and temporal consistency but do not turn the labels into direct physiological measurements.

### Joint visual-kinematic model

For a video window and person boxes, BioHuman predicts a 72-D SMPL pose sequence and a 112-D activation sequence. PromptHMR supplies an initial pose and image-conditioned features. Its image encoder is frozen in the reported training stage, while the prompt encoder, SMPL decoder, residual adapter, temporal backbone, and prediction heads are trained with BioHuman10M supervision.

The pose stream encodes pose, velocity, and acceleration. Pose and visual features are projected into a shared token space, coupled with learned input and output gates, and interleaved frame by frame before a temporal transformer. The gates allow visual evidence to correct pose or activation uncertainty while relying more on the stable kinematic stream under occlusion or viewpoint ambiguity. A shared fused state feeds two heads: the pose head predicts a residual correction to the HMR pose, and the muscle head predicts the 112 activations.

Training combines pose reconstruction and temporal-difference losses with activation reconstruction, temporal-difference, Pearson-correlation, and amplitude-calibration terms. Losses and evaluation metrics use masks that exclude padded frames and samples without valid labels. The supplementary objective also includes regularizers for active amplitudes, peak amplitudes, and activation variation.

## Experiments

The test protocol uses sequence- or subject-level separation to reduce frame leakage. BEDLAM is training-only, with a fresh random 5% subset of its training windows sampled each epoch. The full exported test protocol contains 35,837 temporal windows of up to 32 frames, with pose and 112-D activation labels. The main neural baseline, PromptHMR+MinT, runs PromptHMR first and then feeds its reconstructed motion to a MinT-style temporal motion-to-muscle network. No ground-truth pose, OpenSim state, ground-reaction force, or muscle label is used at inference time.

For muscle prediction, the paper reports Pearson correlation (PCC), RMSE, normalized RMSE, and Active MAE@0.10. For motion estimation, it reports 72-D SMPL pose RMSE and ground-truth-shape Procrustes-aligned MPJPE.

### Muscle activation prediction

| Method | PCC | RMSE | nRMSE | Active MAE |
| --- | ---: | ---: | ---: | ---: |
| PromptHMR+MinT | 0.42 | 0.071 | 0.77 | 0.12 |
| BioHuman | 0.71 | 0.065 | 0.71 | 0.10 |

The focused ablation compares the full model with a two-stage pose-only temporal module that removes image-conditioned HMR tokens, visual-to-pose gates, and the end-to-end fine-tuning path. The full model reports PCC 0.71, RMSE 0.065, nRMSE 0.71, and Active MAE 0.10, compared with 0.58, 0.074, 0.82, and 0.12 for the two-stage variant.

### Motion estimation

| Method | Pose RMSE (rad) | PA-MPJPE with ground-truth shape (mm) |
| --- | ---: | ---: |
| CLIFF | 0.53 | 45.06 |
| HMR2.0 | 0.55 | 41.45 |
| PromptHMR | 0.53 | 40.89 |
| BioHuman | 0.30 | 35.21 |

The reported results indicate that the joint model does not trade away kinematic quality for better activation prediction. The paper evaluates representative qualitative predictions in addition to these quantitative comparisons.

## Limitations

The underlying OpenSim model lacks neck degrees of freedom, so neck motion is incompletely represented. BioHuman10M is simulation-based and therefore has a domain gap from real human biomechanics; the reported activation labels are not validated against real EMG measurements. The current pipeline estimates only foot-ground reaction forces and does not cover hand support, seated contact, or object interaction. The paper also notes a representational gap between SMPL and anatomical skeletal structures, motivating future OSSO-based modeling and direct physiological validation.

## Related Concepts

- [[Video-Based Biomechanics]]
- [[Muscle Activation Estimation]]
- Motion capture
- Musculoskeletal modeling
- Human mesh recovery

## Related Papers

- [[Muscles in Time: Learning to Understand Human Motion by Simulating Muscle Activations]]
- Uhlrich et al. (2023), "OpenCap: Human Movement Dynamics from Smartphone Videos."
- Werling et al. (2023), "AddBiomechanics: Automating Model Scaling, Inverse Kinematics, and Inverse Dynamics from Human Motion Data through Sequential Optimization."
- Keller et al. (2023), "From Skin to Skeleton: Towards Biomechanically Accurate 3D Digital Humans."
- Gozlan et al. (2025), "OpenCapBench: A Benchmark to Bridge Pose Estimation and Biomechanics."
- Gilon et al. (2026), "OpenCap Monocular: 3D Human Kinematics and Musculoskeletal Dynamics from a Single Smartphone Video."

[[index|Library home]]
