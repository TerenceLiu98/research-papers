---
title: "AnyLift: Scaling Motion Reconstruction from Internet Videos via 2D Diffusion"
type: paper
authors:
  - Hongjie Li
  - Heng Yu
  - Jiaman Li
  - Hong-Xing Yu
  - Ehsan Adeli
  - C. Karen Liu
  - Jiajun Wu
year: 2026
arxiv: "2604.17818"
tags:
  - 3d-motion
  - human-object-interaction
  - diffusion-models
  - multi-view-geometry
  - dynamic-cameras
  - computer-vision
---

## TL;DR

AnyLift reconstructs world-coordinated 3D human motion and human-object interaction (HOI) from monocular videos recorded with moving cameras. It first synthesizes multi-view 2D motion data with category-specific diffusion priors, then trains a camera-conditioned multi-view diffusion model to generate consistent 2D views that can be lifted to 3D. The method targets motion that is poorly represented in motion-capture datasets, including gymnastics and martial arts, and extends the same formulation to category-specific object interactions.

## Research Question

Can 2D keypoints and camera trajectories extracted from Internet videos support globally consistent 3D human and human-object motion reconstruction when the camera moves, viewpoints are limited, and the motion distribution is underrepresented in existing motion-capture data?

## Motivation

3D motion-capture datasets provide useful supervision but are expensive to collect and have limited coverage of dynamic everyday motion. Single-view 2D observations are scalable but leave depth, global translation, and camera motion ambiguous. AnyLift uses learned 2D motion priors together with camera and epipolar constraints to construct multi-view evidence, while using a hybrid data source to expand the narrow viewpoint coverage typical of Internet videos. Human-object interactions add a second reconstruction problem because object motion, contact, and relative alignment must remain coherent in world coordinates.

## Contributions

- Introduces a camera-trajectory-conditioned 2D motion diffusion model with epipolar-line conditioning for dynamic-camera videos.
- Combines global 2D motions extracted from Internet videos with locally centered 2D projections of reconstructed 3D motions, and decomposes root translation from local pose to reduce the bias caused by projected training data.
- Uses synthesized multi-view 2D motions to train a cross-view diffusion model that reconstructs world-coordinated 3D human motion from one 2D input sequence.
- Extends the pipeline to category-specific HOI reconstruction using human and object keypoints, canonical object meshes, and object pose fitting.

## Method

AnyLift has two stages. In Stage 1, a category-specific single-view 2D diffusion model is conditioned on camera trajectories and epipolar lines. Its Transformer denoiser uses an L1 reconstruction objective and a line-matching loss. For Internet-video motion, training combines extracted global 2D keypoints with local 2D projections reprojected from off-the-shelf 3D motion estimates. The two hip joints represent root translation; local pose is modeled separately so projected sequences can broaden viewpoint coverage without teaching the model that global translation is absent.

The learned prior is used with score distillation and multi-view line constraints to synthesize roughly consistent views. Multi-view reprojection optimization recovers 3D joints, which are fitted with SMPL and VPoser, then reprojected into four cameras to produce strictly consistent training sequences. Stage 2 trains a multi-view diffusion model with camera conditions and cross-view attention. At inference, ViTPose supplies human keypoints and MegaSaM estimates camera motion.

For HOI, human and category-specific object keypoints are concatenated into one representation, with random object-keypoint masking for occlusion and tracking failures. The reconstructed 3D object keypoints are aligned to canonical mesh keypoints to estimate a time-varying 6D rotation, translation, and scale. Real-world object keypoints can be tracked with DELTA, while the paper also describes mask-based object pose fitting for BEHAVE sequences.

## Experiments

Human motion is evaluated on AIST++ and newly collected gymnastics and martial-arts Internet videos. On AIST++ in the static-camera setting, AnyLift reports $J_{2D}=16.6$, centered $J_{2D}=13.3$, FID $=2.1$, root translation error $=64.9$, MPJPE $=108.0$, PA-MPJPE $=82.3$, and foot sliding $=0.475$. Under the synthetic dynamic-camera setting, it reports $16.7$, $13.7$, $2.0$, $64.2$, $109.3$, $83.0$, and $0.446$, respectively. On Internet videos, it reports $(J_{2D}, J_{2D}^{C}, \mathrm{FID}, \mathrm{FS})=(21.6,11.4,10.9,0.152)$ for gymnastics and $(15.1,9.8,3.6,0.136)$ for martial arts.

For HOI, the paper evaluates category-specific models for boxes, chairs, and tables on BEHAVE, using both original static cameras and simulated dynamic cameras. In the dynamic setting, AnyLift's box, chair, and table human root-translation errors are 29.99, 23.87, and 28.09, while object root-translation errors are 96.76, 79.16, and 88.93. It outperforms SMPLify on all reported human and object metrics and outperforms VisTracker in the static-camera comparison. A 300-person perceptual study on Internet-video human motion favors AnyLift over SMPLify, WHAM, GVHMR, MVLift, and the no-hybrid ablation for ground contact and motion quality. Removing hybrid training worsens all reported Internet-video metrics.

## Limitations

The method still depends on 2D pose extraction, camera-motion estimation, category-specific training data, and priors to resolve single-view depth ambiguity. Its human representation is based on SMPL, and object reconstruction assumes a scanned or canonical object mesh with selected keypoints. The Internet-video evaluation focuses on gymnastics and martial arts, while the HOI models are trained for selected object categories; the supplied experiments therefore do not establish broad out-of-distribution performance. Several dynamic-camera evaluations use simulated camera motion, so they do not replace evaluation on diverse real moving-camera 3D ground truth.

## Related Concepts

- [[Global 3D Motion Lifting]]
- [[Multi-View Motion Diffusion]]
- [[Epipolar Geometry]]
- [[Diffusion Models]]
- [[Human-Object Interaction Reconstruction]]

## Related Papers

- [[Lifting Motion to the 3D World via 2D Diffusion]]
- Kapon, Tevet, Cohen-Or, and Bermano (2024), "MAS: Multi-view ancestral sampling for 3D motion generation using 2D diffusion."
- Shen et al. (2024), "World-grounded human motion recovery via gravity-view coordinates."
- Shin, Kim, Halilaj, and Black (2024), "WHAM: Reconstructing world-grounded humans with accurate 3D motion."
- Bhatnagar et al. (2022), "BEHAVE: Dataset and method for tracking human object interactions."
- Xie, Bhatnagar, and Pons-Moll (2023), "Visibility aware human-object interaction tracking from single RGB camera."

[[index|Library home]]
