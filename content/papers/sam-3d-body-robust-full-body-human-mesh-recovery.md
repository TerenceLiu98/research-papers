---
title: "SAM 3D Body: Robust Full-Body Human Mesh Recovery"
type: paper
authors:
  - Xitong Yang
  - Devansh Kukreja
  - Don Pinkus
  - Anushka Sagar
  - Taosha Fan
  - Jinhyung Park
  - Soyong Shin
  - Jinkun Cao
  - Jiawei Liu
  - Nicolas Ugrinovic
  - Matt Feiszli
  - Jitendra Malik
  - Piotr Dollar
  - Kris Kitani
year: null
tags:
  - human-mesh-recovery
  - computer-vision
  - interactive-reconstruction
  - data-curation
---

## TL;DR

SAM 3D Body (3DB) recovers a full-body human mesh from one image using a shared image encoder, separate body and hand decoders, and optional keypoint or mask prompts. It combines the Momentum Human Rig (MHR), which separates skeletal structure from surface shape, with a data engine that mines difficult images and produces mesh supervision through manual annotation, dense keypoints, multi-view fitting, and synthetic data. Reported gains are particularly strong on challenging poses and held-out domains; hand results are competitive with specialized models but do not dominate all hand metrics.

## Research Question

Can a promptable model recover body, feet, and hands accurately from a single image across unusual poses, occlusion, and unfamiliar viewpoints, while permitting user corrections and learning from both full-body and hand-only data?

## Motivation

Monocular mesh recovery is ambiguous, and existing training data trade off the diversity of unconstrained images against the geometric quality of controlled captures. Body and hand estimation also impose different crop resolutions, camera assumptions, and supervision requirements. 3DB addresses these problems jointly through specialized decoders, interactive conditioning, and more diverse, higher-quality supervision.

## Contributions

- A promptable full-body model using MHR, with separate body and hand decoders sharing an image encoder.
- A prompt-based integration procedure that reconciles hand predictions with the body's kinematic chain.
- A failure-driven data engine and fitting pipeline combining sparse manual labels, 595 dense keypoints, multi-view geometry, and synthetic supervision.
- Evaluation on standard benchmarks, five additional dataset domains, 24 image categories, 28 geometry-based categories, and a human preference study.

## Method

### Architecture and inference

The image encoder processes a person crop and optional hand crops. Keypoint prompts become position-and-label tokens; mask embeddings are added to image features. Transformer decoders attend to these features using tokens for MHR and camera parameters, auxiliary 2D/3D keypoints, and optional hand localization. The body decoder already produces a full-body rig; the optional hand decoder improves hand estimates using dedicated crops and hand-specific supervision.

Simply inserting hand predictions into the rig can distort adjacent joints. Instead, the body decoder is prompted again with wrist locations from the hand decoder and elbow locations from its own prediction. Local parameters are then merged along the kinematic tree. Training combines uncertainty-modulated keypoint losses, parameter regression, joint-limit penalties, hand-box losses, and simulated rounds of interactive prompts (Sections 3-4).

### Data engine and annotation

Semi-manual failure analysis supplies examples and descriptions to a vision-language model, which mines difficult images involving rare poses, occlusion, interactions, viewpoints, and hand-body coordination. Annotators correct sparse keypoints and assign visibility labels. A dense detector conditioned on these sparse labels predicts 595 points for gradient-based monocular mesh fitting with initialization regularization and pose/shape priors.

For multi-view sequences, triangulated keypoints and temporal constraints support joint fitting of pose, skeleton, shape, and cameras. Training combines in-the-wild images, multi-view captures, synthetic images, and hand datasets (Sections 5-7). The introduction describes approximately 7 million annotated images; Table 1 lists source counts separately, so these figures should not be treated as an independently verified unique-image total.

## Experiments

The two variants use ViT-H (632M) and DINOv3 (840M) encoders with 512-by-512 inputs. MHR outputs are mapped to SMPL for relevant benchmarks. Standard evaluation uses estimated camera intrinsics; the additional 3D benchmarks use ground-truth intrinsics for all methods, with estimated field of view for SA1B-Hard.

### Standard and held-out benchmarks

Selected Table 2 results below use lower-is-better MPJPE and higher-is-better PCK. RICH is absent from 3DB training but included in NLF training.

| Model | EMDB MPJPE | RICH MPJPE | LSPET PCK@0.05 |
| --- | ---: | ---: | ---: |
| CameraHMR | 70.3 | 55.7 | 49.1 |
| NLF-L+fit | 68.4 | 51.0 | 54.9 |
| 3DB-H | 62.9 | 55.0 | 68.9 |
| 3DB-DINOv3 | 61.7 | 53.7 | 67.8 |

The results support strong performance without implying that 3DB wins every metric. For example, NLF has lower RICH errors, and the video-based GENMO has lower 3DPW MPJPE (53.9) than either 3DB variant (54.8).

Table 3 evaluates 38.6K images across Ego-Exo4D, Harmony4D, Goliath, synthetic data, and SA1B-Hard. A leave-one-out 3DB-H excludes the evaluated dataset domain during training, while the full-data model is an in-domain comparison. On Harmony4D, MPJPE is 54.0 for leave-one-out 3DB-H versus 70.8 for CameraHMR and 33.9 for full-data 3DB-H. SA1B-Hard Avg-PCK is 73.1 for leave-one-out 3DB-H, 66.5 for NLF, and 76.6 for full-data 3DB-H. These settings must remain distinct when interpreting generalization.

### Hands, prompts, and preference

- On FreiHand, using the hand decoder without FreiHand training, both 3DB variants reach PA-MPJPE 5.5. DINOv3 PA-MPVPE is 6.2 versus WiLoR's 5.1; WiLoR uses FreiHand training data (Table 4).
- With error-based selection of corrective keypoints, zero, one, and two noiseless prompts yield COCO PCK 86.7, 90.2, and 93.0, respectively. EMDB MPJPE falls from 63.3 to 60.1 and 58.9. A single prompt with noise scale 0.1 worsens EMDB MPJPE to 67.8 (Table 7).
- Mask conditioning reduces DINOv3 Hi4D PVE from 91.4 to 58.3 and MPJPE from 76.4 to 47.0. Masks are ground truth where available and SAM2-derived for SA1B; these results depend on that prompt supply (Table 8).
- Six pairwise studies involve 7,800 unique participants and over 20,000 responses. Against NLF, 3DB wins 83.8% of evaluated stimuli. This is the fraction of stimuli receiving a majority preference, not the fraction of all individual votes (Section 8.7).

## Limitations

The model processes people independently and does not explicitly model human-human or human-object interactions, limiting relative-position and physical-interaction reasoning. Its hand accuracy does not surpass specialized hand models overall, and body-decoder-only hand estimates remain limited by full-body training data. Both 3DB and MHR inadequately cover all age groups, especially children (Appendix C).

Monocular annotations remain pseudo-ground truth, and training-data differences prevent a fully controlled comparison with prior methods. The prompting ablation selects the largest-error keypoint, so it does not establish the same gains for unguided users. Incorrect prompts can worsen predictions. The supplied Markdown does not state this paper's publication year or a stable bibliographic identifier; these are left unspecified.

## Related Concepts

- [[concepts/human-mesh-recovery|Human Mesh Recovery]]
- [[concepts/promptable-human-mesh-recovery|Promptable Human Mesh Recovery]]
- [[concepts/video-based-biomechanics|Video-Based Biomechanics]]: a downstream setting that requires additional dynamics and physiological modeling beyond surface reconstruction.

## Related Papers

- Wang et al. (2025), *PromptHMR: Promptable Human Mesh Recovery*: a prior promptable method and evaluated baseline.
- Ferguson et al. (2025), *MHR: Momentum Human Rig*: the underlying mesh representation, cited in the source as arXiv:2511.15586.
- Pavlakos et al. (2024), *Reconstructing Hands in 3D with Transformers*: the HaMeR hand-specialized comparator.
- [[papers/biohuman-learning-biomechanical-human-representations-from-video|BioHuman: Learning Biomechanical Human Representations from Video]]: a related library paper that extends visual pose estimation to muscle activation; it is not a citation or evaluated baseline in 3DB.

Source-listed resources: [Code](https://github.com/facebookresearch/sam-3d-body) and [project website](https://ai.meta.com/sam3d).

[[index|Library home]]
