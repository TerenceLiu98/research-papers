---
title: "Lifting Motion to the 3D World via 2D Diffusion"
type: paper
authors:
  - Jiaman Li
  - C. Karen Liu
  - Jiajun Wu
year: null
tags:
  - 3d-motion
  - pose-estimation
  - diffusion-models
  - multi-view-geometry
  - computer-graphics
---

## TL;DR

MVLift estimates global 3D motion, including joint rotations and root trajectories in world coordinates, from a single-view 2D pose sequence without 3D motion supervision. It progressively builds geometrically consistent multi-view 2D sequences with diffusion priors, epipolar constraints, optimization, 3D fitting, and reprojection. The final model improves many reported metrics across human, animal, and human-object interaction datasets, while WHAM remains stronger on some AIST++ joint-position errors.

## Research Question

Can global 3D motion be recovered from a single-view 2D pose sequence using only single-view 2D motion data for training, including for out-of-distribution human, animal, and interaction motions where paired 3D data is unavailable?

## Motivation

Most 2D-to-3D motion methods rely on paired videos and ground-truth 3D motion or on motion-capture datasets. That dependence limits generalization to activities such as complex athletics, dance, and animal motion. A single 2D sequence is geometrically ambiguous, but learned 2D motion priors can provide plausible pose structure while multi-view geometry supplies constraints for recovering depth and world-space translation.

## Contributions

- Introduces MVLift, a four-stage framework for global 3D motion estimation from a single-view 2D sequence without 3D training data.
- Uses a line-conditioned 2D motion diffusion model and epipolar constraints to generate plausible observations from unobserved views.
- Combines score distillation with multi-view consistency optimization, then fits 3D motion and reprojects it to create strictly consistent synthetic multi-view training data.
- Trains a final cross-view diffusion model that generates consistent multi-view 2D motion in one forward pass.
- Demonstrates results on human, animal, and human-object interaction motion, including motions outside common motion-capture distributions.

## Method

MVLift represents a motion as a temporal sequence of 2D joint locations. At test time, a specified camera intrinsic matrix and relative camera poses define fundamental matrices and epipolar lines for five unobserved views. The Stage 1 conditional diffusion model predicts 2D sequences whose joints lie near their supplied lines, using a transformer denoiser, an L1 reconstruction objective, and a line-matching loss.

Stage 2 jointly optimizes the input and generated views. Score Distillation Sampling (SDS) keeps each sequence within the learned 2D motion distribution, while a multi-view consistency loss evaluates epipolar constraints for all 15 pairs among six views. Because this optimization produces only roughly consistent views, Stage 3 minimizes reprojection error to recover 3D joints, fits SMPL parameters with VPoser, and reprojects the fitted motions into four views at 90-degree intervals. These strictly consistent sequences train the Stage 4 diffusion model, whose transformer blocks add cross-view attention to generate three additional views from one input view.

## Experiments

The evaluation uses AIST++ for 3D dance motion, Steezy for online dance instruction videos, NicoleMove for in-the-wild yoga, Pilates, and fitness videos, CatPlay for cat motion, and OMOMO for human-object interaction. The authors extract 2D poses from single views and evaluate 3D root translation, MPJPE, PA-MPJPE, reprojected 2D joint errors, and motion FID where applicable.

On AIST++, MVLift reports root translation error 67.6, MPJPE 110.7, PA-MPJPE 79.2, centered 2D joint error 12.8, and FID 1.9. It has the lowest reported root translation, 2D joint, centered 2D joint, and FID values in that table, while WHAM has lower MPJPE and PA-MPJPE. On Steezy, NicoleMove, and CatPlay, MVLift reports 2D joint errors of 11.7, 26.2, and 57.0, respectively, with centered errors of 11.7, 22.7, and 39.4. The reported OMOMO interaction results are root translation error 54.9, MPJPE 67.0, PA-MPJPE 53.4, object root translation error 172.9, and object MPJPE 76.9, compared with 97.9, 142.0, 99.3, 751.8, and 106.7 for SMPLify.

The ablation study finds that the final learned multi-view model improves on Stage 1 and Stage 2 generated views. Directly optimizing 3D motion with SDS on reprojected views causes the input-view reprojection to drift, while removing the epipolar-line condition from that variant produces implausible 3D motion and much larger errors. In a perceptual study over AIST++, Steezy, and NicoleMove, participants preferred MVLift over the baselines; for AIST++, 39% preferred MVLift over ground truth and 11% reported no noticeable difference.

## Limitations

The approach still relies on priors and camera assumptions to resolve the depth ambiguity inherent in a single view. The Stage 2 optimization does not guarantee perfect multi-view consistency or exact agreement with the input sequence, which motivates the synthetic-data stage. Its final training data is produced by fitting SMPL or related pose models and therefore inherits their representation and fitting limitations. The reported evaluation covers selected human, animal, and interaction domains; broader out-of-distribution behavior is not established by the supplied experiments.

## Related Concepts

- [[Global 3D Motion Lifting]]
- [[Epipolar Geometry]]
- [[Multi-View Motion Diffusion]]
- [[Diffusion Models]]

## Related Papers

- Kapon, Tevet, Cohen-Or, and Bermano (2024), "MAS: Multi-view ancestral sampling for 3D motion generation using 2D diffusion."
- Zhu et al. (2023), "MotionBERT: A unified perspective on learning human motion representations."
- Shin, Kim, Halilaj, and Black (2024), "WHAM: Reconstructing world-grounded humans with accurate 3D motion."
- Tevet et al. (2023), "Human motion diffusion model."
- Bogo et al. (2016), "Keep it SMPL: Automatic estimation of 3D human pose and shape from a single image."
- Poole et al. (2022), "DreamFusion: Text-to-3D using 2D diffusion."


[[index|Library home]]
