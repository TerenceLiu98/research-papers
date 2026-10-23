---
title: "PocketSplat: Mobile Gaussian Reconstruction via World-Space Latent Allocation"
type: paper
authors:
  - Wenzhi Guo
  - Xianda Chen
  - Dongxuan Chen
  - Guangchi Fang
  - Bing Wang
year: null
source_job_id: "b588a896-bd1f-4bf9-8ae5-396cb9170c88"
tags:
  - 3d-gaussian-splatting
  - feed-forward-reconstruction
  - mobile-inference
  - budgeted-representation
  - novel-view-synthesis
---

## TL;DR

PocketSplat is a feed-forward [[3D Gaussian Splatting]] reconstruction system that makes output cardinality an explicit input. It groups dense, image-conditioned candidates into predicted world-space cells, assigns each cell an exact integer quota, fuses repeated multi-view evidence before decoding, and enlarges retained Gaussian support according to local compression. On DL3DV, its 338K setting reports 23.122 dB PSNR, compared with 20.655 dB for 458,752-Gaussian MVSplat; on the target iPhone, all four PocketSplat budgets complete while native MVSplat and DepthSplat run out of memory.

## Research Question

Can a feed-forward Gaussian reconstructor execute on a mobile device while producing exactly a user-prescribed number of primitives, without tying asset size to image resolution and view count or decoding every dense candidate before pruning?

## Motivation

Dense feed-forward reconstructors usually predict image-aligned Gaussian candidates, so their output population grows with input resolution and the number of views. Repeated observations of the same region can consume separate primitives, and post-hoc pruning cannot use the discarded observations when decoding retained candidates. For mobile applications, this couples reconstruction to storage, transfer, rendering, and memory costs while preventing the application from choosing its asset-size operating point in advance.

## Contributions

- Formulates budgeted feed-forward reconstruction as [[World-Space Latent Allocation]], separating dense geometric inference from the cardinality of the delivered Gaussian asset.
- Introduces an exact-budget allocator with scene-relative world-space cells, local image-detail weights, cross-view redundancy discounting, a support floor for zero-detail cells, capacity completion, and corrected stochastic rounding.
- Pools reliability- and support-weighted features within each cell before decoding complete attributes for selected candidates.
- Introduces spatial responsibility decoding (SRD), which adjusts Gaussian covariance according to the ratio between a cell's original and retained populations.
- Evaluates exact-count reconstruction on DL3DV, frozen-checkpoint transfer to Tanks & Temples and MegaDepth, GPU execution, and a hybrid Core ML/ONNX Runtime deployment on an iPhone.

## Method

A frozen multi-view geometry backbone predicts features, depth, intrinsics, and camera poses from four images. A trainable head creates 451,584 latent candidates at the configured 252 by 448 geometry resolution. Each candidate contains a predicted world-space anchor, a 32-channel hidden feature, reliability, and cross-view support, but is not yet a complete Gaussian.

Candidates are unprojected into world space and assigned to cells whose width is 2% of the median positive scene depth. Each cell receives a weight from local 7 by 7 luma entropy. Dividing accumulated detail by the number of contributing views discounts evidence repeated across images, while occupied zero-detail cells receive a one-candidate floor. Active-set water filling produces real-valued residual quotas under cell capacities; capacity completion and corrected stochastic rounding convert them to integer quotas whose sum is exactly the requested budget.

Within a cell, reliability and support weight a pooled hidden feature. A learned channel-wise gate moves each retained candidate toward that pooled representation before the full center, covariance, spherical-harmonic color, and opacity attributes are projected. SRD then computes the local compression ratio $\rho_c=\log(n_c/k_c)$ and scales each retained covariance with an analytic square-root area prior plus learned modulation. It changes scale only, leaving centers, rotations, opacity, appearance, and predicted offsets unchanged.

The model is trained on DL3DV for 50,000 steps. Training uses the dense budget for 10,000 steps and then cycles through descending budgets, optimizing RGB mean-squared error, VGG LPIPS, and budget-selection supervision while keeping the geometry backbone frozen.

## Experiments

On the DL3DV benchmark, PocketSplat reports 21.018, 22.790, 23.122, and 23.070 dB PSNR at 113K, 226K, 338K, and 451,584 Gaussians. The 338K setting is 2.467 dB above MVSplat and 4.518 dB above the similarly sized F4Splat setting. The dense setting has the best reported DL3DV LPIPS, 0.1776, while 338K has slightly higher PSNR.

With the checkpoint frozen, 226K gives the highest PocketSplat PSNR on both transfer datasets: 17.965 dB on Tanks & Temples and 17.178 dB on MegaDepth. The dense setting instead gives the lowest LPIPS, 0.3335 and 0.3450. This non-monotonicity shows that increasing the primitive budget does not uniformly improve every reconstruction metric out of distribution.

On Mip-NeRF 360 sequences evaluated on the target iPhone, the four PocketSplat settings construct assets in 10.20-10.95 seconds. The 338K Quality setting reports 22.132 dB PSNR, 0.6503 SSIM, and 0.1923 LPIPS. Native MVSplat and DepthSplat are reported as out of memory. An engineering-modified MVSplat-Stream completes in 42.00 seconds at 17.875 dB; PocketSplat Dense reports 10.50 seconds and 22.034 dB.

Ablations attribute substantial sparse-budget gains to both allocation and support adaptation. Against count-matched random selection, world-space allocation plus SRD improves PSNR by 3.0049, 3.6915, and 2.1916 dB at 113K, 226K, and 338K. Removing SRD lowers PSNR by 3.3567, 0.8290, and 0.1707 dB at those budgets, with positive paired bootstrap intervals. Selecting before complete attribute projection reduces projection time by 68.5% at 113K, but total construction time by only 1.73% because allocation dominates that path.

## Limitations

- Lower output budgets do not lower the reported 2.705 GB peak GPU memory, and end-to-end GPU time increases from 322.3 ms at Full to 601.8 ms at 113K because dense features and allocation remain costly.
- The fixed mobile post-decoder retains all 451,584 rows and marks unselected rows with low opacity, so output cardinality control does not imply proportionally smaller intermediate tensors or decoding work throughout the deployment graph.
- The mobile baseline comparison is asymmetric: native MVSplat and DepthSplat fail, while the deployable MVSplat result uses streamed depth candidates and a CPU Core ML backbone. Device identity beyond "target iPhone" is not supplied in the parsed manuscript.
- Mobile evaluation uses four context frames and the first 20 remaining frames from Mip-NeRF 360; broader devices, capture patterns, resolutions, and precision modes are not established.
- World-space grouping depends on predicted depth and cameras, so geometric errors can place corresponding observations in different cells or merge unrelated regions. The manuscript notes that deployment rewrites need parity checks near voxel boundaries.
- Archived out-of-distribution qualitative panels do not specify image-level provenance or budgets and are presented as illustrations rather than controlled matched-budget evidence.

## Related Concepts

- [[3D Gaussian Splatting]]
- [[World-Space Latent Allocation]]
- [[Adaptive Density Control in 3D Gaussian Splatting]]
- Novel view synthesis
- Multi-view reconstruction
- Mobile inference

## Related Papers

- Charatan et al. (2024), "pixelSplat: 3D Gaussian Splats from Image Pairs for Scalable Generalizable 3D Reconstruction": feed-forward image-pair baseline.
- Chen et al. (2024), "MVSplat: Efficient 3D Gaussian Splatting from Sparse Multi-View Images": multi-view stereo baseline and basis of the streamed mobile comparison.
- Xu et al. (2025), "DepthSplat: Connecting Gaussian Splatting and Depth": depth-guided feed-forward baseline.
- Kim et al. (2026), "F4Splat: Feedforward Predictive Densification for Feed-Forward 3D Gaussian Splatting": threshold-controlled-count baseline.
- Park et al. (2025), "EcoSplat: Efficiency-Controllable Feed-Forward 3D Gaussian Splatting from Multiview Images": image-space adaptive-density method.
- Zhang et al. (2026), "SparseSplat: Towards Applicable Feedforward 3D Gaussian Splatting with Pixel-Unaligned Prediction": sparse primitive predictor without an exact output-budget guarantee.

[[index|Library home]]
