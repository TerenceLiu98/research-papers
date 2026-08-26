---
title: "From Tokens to Nodes: Semantic-Guided Motion Control for Dynamic 3D Gaussian Splatting"
type: paper
authors:
  - Jianing Chen
  - Zehao Li
  - Yujun Cai
  - Hao Jiang
  - Shuqin Gao
  - Honglong Zhao
  - Tianlu Mao
  - Yucheng Zhang
year: null
tags:
  - dynamic-3d-reconstruction
  - 3d-gaussian-splatting
  - motion-modeling
  - vision-foundation-models
  - novel-view-synthesis
---

## TL;DR

This paper proposes a sparse-control framework for monocular dynamic 3D Gaussian Splatting (3DGS) that allocates control nodes according to motion complexity. Vision foundation model (VFM) tokens, depth, and foreground priors generate and compress nodes so that static regions are merged more aggressively while dynamic regions retain higher density. Cubic Hermite splines, initialized from 2D tracklets, represent node trajectories; dual quaternion blending transfers those trajectories to Gaussian primitives.

## Research Question

Can sparse dynamic 3DGS allocate control points according to spatially varying motion complexity, while representing their trajectories compactly and optimizing them stably from monocular video?

## Motivation

Existing sparse-control methods commonly initialize nodes with farthest-point sampling or fixed-resolution voxelization. These strategies provide geometric coverage but can spend nodes on large static backgrounds and undersample smaller regions with complex motion. The paper addresses this static redundancy and dynamic insufficiency by transferring semantic and motion cues from image patches into 3D node initialization. It also replaces high-dimensional MLP deformation fields with smooth spline trajectories to reduce the difficulty of temporal optimization.

## Contributions

- Introduces Motion-Adaptive Node Initialization (MANI), which back-projects image patches with semantic tokens into 3D and compresses candidate nodes using appearance similarity, foreground priors, and adaptive motion tendency scores.
- Uses cubic Hermite splines for compact, smooth, differentiable node trajectories and initializes their translations by fitting unprojected 2D tracklets.
- Propagates node motion to nearby Gaussians with RBF-weighted dual quaternion blending and optimizes appearance, geometry, and motion with photometric, depth, mask, tracking, and as-rigid-as-possible constraints.
- Reports improved reconstruction quality and efficiency over the evaluated dynamic NeRF and dynamic 3DGS baselines on Hyper-NeRF and N3DV.

## Method

### Sparse node deformation

Each control node carries an SE(3) trajectory and an RBF radius. A Gaussian is bound to its K nearest nodes using normalized Gaussian-kernel weights. The neighboring node transforms are represented as dual quaternions, blended with those weights, normalized, and converted back to an SE(3) transform. This provides a sparse deformation field in which substantially fewer nodes control the larger Gaussian set.

### Motion-adaptive node initialization

For selected keyframes, the method divides each image into patches. A frozen VFM supplies a token embedding for each patch, while depth and camera poses back-project the patch center into canonical 3D space. Each candidate therefore retains both a position and a semantic descriptor.

Compression proceeds through progressively larger voxels. Within each voxel, bipartite soft matching connects nodes with similar tokens, and a selected fraction of the highest-similarity pairs is merged. The joint similarity combines token cosine similarity with a foreground prior. A cluster-level dynamic tendency score combines foreground probability and pairwise similarity; low-tendency, static clusters receive a higher compression ratio, while high-tendency clusters retain more representatives.

### Spline trajectories and initialization

The trajectory of each node is represented between neighboring keyframes by a cubic Hermite spline with learnable keyframe positions and first derivatives. Long-term 2D tracklets are unprojected using estimated depth and camera poses, and least squares fits the translational spline to the resulting 3D points. Rotations are initialized to identity and refined during joint optimization.

### Optimization

The total objective combines RGB reconstruction, foreground-mask, depth, 2D tracking and tracking-depth, and ARAP terms. The RGB term mixes MSE and D-SSIM. Tracking constrains rendered point trajectories and reprojection depth, while ARAP regularizes local distances and coordinates across time to discourage degenerate deformation. The canonical Gaussians and motion parameters are optimized jointly with Adam.

## Experiments

### Setup

The evaluation uses four Hyper-NeRF scenes and six Neural 3D Video (N3DV) scenes. The monocular protocol trains on one camera and evaluates on held-out views; for N3DV, the reported protocol uses cam0 for training and cams 5 and 6 for evaluation. The main metrics are PSNR, SSIM, and LPIPS. Experiments are trained on a single NVIDIA V100 GPU with 32 GB of VRAM.

### Main results

On Hyper-NeRF, the method reports a mean PSNR of 25.78 dB, SSIM of 0.723, and LPIPS of 0.242 across Broom, 3D-Printer, Chicken, and Banana. It is the best method in the supplied per-scene table for all three metrics. On N3DV, it reports mean PSNR 23.31 and SSIM 0.821, above the listed MoDGS results of 22.63 and 0.804 and Grid4D results of 22.51 and 0.805.

The reported Hyper-NeRF efficiency summary gives 39 minutes mean training time, 69.5 FPS mean rendering speed, and 25 MB storage for the method. The paper cautions that the efficiency comparison uses different GPUs for some baselines: the method uses a V100, while several comparison results use an RTX 3090 or RTX A6000.

### Ablations

On Hyper-NeRF, the baseline reports 22.35 PSNR, 0.613 SSIM, and 0.335 LPIPS. Adding MANI raises these to 23.89, 0.635, and 0.315; adding spline motion raises them to 24.51, 0.658, and 0.278; and the full method reaches 25.78, 0.722, and 0.242. Replacing MANI with FPS, voxel, or tracklet initialization, or replacing spline motion with MLP, grid, or tracklet alternatives, produces lower reported scores.

Additional ablations report that removing the mask, depth, or tracking loss lowers the full-model result to PSNR values of 25.46, 24.97, and 25.52, respectively, compared with 25.78 for the full objective. On the Nvidia dataset, the method reports the best mean PSNR among the listed methods at 25.79 across Balloon1, Balloon2, Jumping, and Umbrella.

## Limitations

The task remains ambiguous under monocular observation and depends on estimated depth, camera poses, segmentation masks, VFM tokens, and 2D tracks; errors in these priors can affect node placement and motion supervision. The method is evaluated on a limited set of dynamic-scene datasets and does not establish performance across broader motion types or camera conditions. The efficiency comparison is not hardware-controlled because the reported baselines and method use different GPUs. The ablations also show that VFM priors help but are not individually indispensable: removing depth or tracking causes moderate degradation while optimization remains stable.

## Related Concepts

- [[Dynamic 3D Gaussian Splatting]]
- [[3D Gaussian Splatting]]
- Sparse control points
- Vision foundation models
- Cubic Hermite splines
- Dual quaternion blending

## Related Papers

- Kerbl, Kopanas, Leimkuehler, and Drettakis (2023), "3D Gaussian Splatting for Real-Time Radiance Field Rendering."
- Huang et al. (2023), "SC-GS: Sparse-Controlled Gaussian Splatting for Editable Dynamic Scenes."
- Wu et al. (2024), "4D Gaussian Splatting for Real-Time Dynamic Scene Rendering."
- Lei et al. (2025), "MoSca: Dynamic Gaussian Fusion from Casual Videos via 4D Motion Scaffolds."
- Liang, Xu, and Kikuchi (2025), "HiMoR: Monocular Deformable Gaussian Reconstruction with Hierarchical Motion Representation."
- Li et al. (2022), "Neural 3D Video Synthesis from Multi-View Video."
