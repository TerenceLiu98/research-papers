---
title: Promptable Human Mesh Recovery
type: concept
tags:
  - human-mesh-recovery
  - interactive-reconstruction
  - computer-vision
---

## Overview

Promptable human mesh recovery conditions image-based 3D body estimation on auxiliary information such as labeled 2D keypoints or a person mask. Prompts allow users or other models to correct a reconstruction or identify the intended person when an image is ambiguous.

## Key Ideas

- Keypoint prompts constrain projected joint locations, while segmentation masks identify the image region belonging to the target person. Their effects depend on the model's learned 3D prior.
- A decoder can attend to keypoint tokens and mask-conditioned image features. Training with simulated corrective rounds teaches it to use prompts alongside visual evidence.
- Prompts can coordinate specialized predictors. SAM 3D Body uses hand-decoder wrists and body-decoder elbows to refine the full-body prediction before merging parameters, reducing kinematic inconsistencies.
- Prompt-following and prompt correctness are distinct: an inaccurate prompt can degrade an otherwise better estimate. SAM 3D Body's keypoint-noise ablation demonstrates this failure mode.
- Evaluation must report how prompts were obtained. Ground-truth masks and largest-error keypoint selection provide more information than an arbitrary interactive session and should not be treated as fully automatic inference.

## Important Papers

- [[papers/sam-3d-body-robust-full-body-human-mesh-recovery|SAM 3D Body: Robust Full-Body Human Mesh Recovery]]: evaluates corrective keypoints, mask conditioning, and prompt-mediated body/hand integration.
- Wang et al. (2025), *PromptHMR: Promptable Human Mesh Recovery*: prior promptable reconstruction work cited and compared in SAM 3D Body.

## Related Concepts

- [[concepts/human-mesh-recovery|Human Mesh Recovery]]
