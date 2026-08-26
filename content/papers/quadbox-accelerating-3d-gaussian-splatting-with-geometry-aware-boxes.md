---
title: "QuadBox: Accelerating 3D Gaussian Splatting with Geometry-Aware Boxes"
type: paper
authors:
  - Xinze Li
  - Bohan Yang
  - Pengxu Chen
  - Yiyuan Wang
  - Hongcheng Luo
  - Wentao Cheng
  - Weifeng Su
year: null
repository: "https://github.com/Powertony102/QuadBox"
tags:
  - 3d-gaussian-splatting
  - novel-view-synthesis
  - gpu-rendering
  - geometric-culling
  - rasterization
---

## TL;DR

QuadBox accelerates the Gaussian-to-tile intersection stage of [[3D Gaussian Splatting]] by approximating each projected Gaussian ellipse with four adaptive axis-aligned boxes. Its QPass traversal merges the tile intervals of those boxes in one scan, replacing repeated sub-box visits and analytic intersection checks with integer range operations. The paper reports rendering speedups over vanilla 3DGS and opacity-aware AdR-AABB while retaining similar image quality, including 460 FPS versus 425 FPS for the corresponding RTX 4090 ablation.

## Research Question

Can projected Gaussian ellipses be enclosed tightly enough to reduce false-positive tile assignments in a 3DGS rasterizer, while keeping the intersection test inexpensive and compatible with GPU-parallel rendering?

## Motivation

The standard 3DGS rasterizer uses conservative screen-space bounding boxes to assign projected Gaussians to image tiles. These boxes can include tiles where the Gaussian contributes negligibly, and those false positives propagate into duplication, depth sorting, and rendering. Opacity-aware AdR-AABB reduces some of this work but remains a single axis-aligned box, so it can retain redundant tiles around elongated or diagonally oriented ellipses.

## Contributions

- Introduces QuadBox, a four-box, geometry-aware approximation of the opacity-supported projected Gaussian ellipse.
- Derives a stretching factor from the inverse 2D covariance entries, allowing the auxiliary boxes to cover the ellipse's minor-axis regions without depending on the opacity threshold or center translation.
- Introduces QPass, a single-pass tile traversal that scans the shorter global tile axis and merges active intervals with min/max operations.
- Reports speed improvements on Mip-NeRF 360, Deep Blending, and Tanks & Temples, and demonstrates plug-and-play integration with DashGaussian and Compact-3DGS.
- Includes ablations for AdR-AABB, DualBox, QuadBox without QPass, and the full QuadBox pipeline.

## Method

3DGS represents a scene with 3D Gaussian primitives parameterized by centers, covariances, opacities, and spherical-harmonic colors. After projection into screen space, the rasterizer maps each Gaussian to the tiles that may receive its alpha-composited contribution. QuadBox changes this mapping stage while leaving the later tile-based rendering pipeline intact.

The construction begins with the opacity threshold already used to ignore negligible splats. The resulting confidence region is expressed as an ellipse

$$
F(x_d,y_d)=a x_d^2+2b x_dy_d+c y_d^2-\gamma\leq 0.
$$

DualBox retains the two quadrants of the AdR-AABB aligned with the ellipse's major axis. QuadBox then adds two pairs of adaptively stretched sub-boxes to cover the remaining minor-axis regions. For the inverse covariance matrix $\Lambda=[a,b;b,c]$, the paper derives the stretch factor

$$
f=\sqrt{1-\frac{b^2}{ac}},
$$

which depends only on the matrix entries and satisfies $0<f\leq 1$ for a positive-definite covariance inverse.

QPass first converts the four sub-boxes to tile-space bounds and aggregates their global range. It scans along the shorter global axis. For each scanline, interval-overlap tests select the active sub-boxes, and min/max operations produce one vertical or horizontal tile interval. This visits each candidate tile once and avoids the repeated edge checks and branch divergence of independent sub-box traversal.

## Experiments

The evaluation uses Mip-NeRF 360, Deep Blending, and Tanks & Temples, with COLMAP poses and sparse point clouds for initialization. The rasterizer is implemented in the official 3DGS codebase, and throughput is measured with CUDA kernel timing on NVIDIA A100 and RTX 4090 GPUs.

On the A100 comparison, the reported vanilla 3DGS throughputs are 180 FPS on Mip-NeRF 360, 173 FPS on Deep Blending, and 214 FPS on Tanks & Temples. AdR-AABB reaches 302, 348, and 319 FPS, while 3DGS plus QuadBox reaches 322, 379, and 335 FPS, respectively. The reported PSNR, SSIM, and LPIPS values remain close across these methods.

The per-scene Mip-NeRF 360 comparison reports higher QuadBox FPS than AdR-AABB for all nine listed scenes: bicycle (206 versus 199), flowers (367 versus 360), garden (251 versus 241), stump (318 versus 309), treehill (318 versus 312), room (363 versus 324), counter (347 versus 312), kitchen (261 versus 242), and bonsai (464 versus 423). The paper also reports peak plug-and-play speeds of 364 FPS for DashGaussian plus QuadBox and 684 FPS for Compact-3DGS plus QuadBox.

The RTX 4090 ablation reports 425 FPS for 3DGS plus AdR-AABB, 467 FPS for DualBox, 413 FPS for QuadBox without QPass, and 460 FPS for the full method. DualBox alone has lower PSNR than the other variants, while adding the auxiliary QuadBox regions recovers the reported quality and QPass provides the final traversal-speed improvement.

## Limitations

The paper evaluates the method on three public datasets and two GPU types, so its behavior on other hardware, scenes, and rasterizer implementations is not established. QuadBox is a conservative geometric approximation whose usefulness depends on the opacity threshold and projected covariance quality; the reported ablation also shows that aggressive DualBox culling can reduce image quality. The paper focuses on tile-intersection efficiency and does not establish improvements in training cost, memory use, or end-to-end latency beyond the reported rendering measurements. Finally, the source reports aggregate speedups and selected scene results, but does not provide a broader analysis of worst-case ellipse orientations or numerical failure modes.

## Related Concepts

- [[3D Gaussian Splatting]]
- [[Geometry-Aware Gaussian-Tile Culling]]
- Tile-based rasterization
- Novel view synthesis
- Bounding-volume culling

## Related Papers

- Kerbl, Kopanas, Leimkuehler, and Drettakis (2023), "3D Gaussian Splatting for Real-Time Radiance Field Rendering."
- Wang, Yi, and Ma (2024), "AdR-Gaussian: Accelerating Gaussian Splatting with Adaptive Radius."
- Feng et al. (2025), "FlashGS: Efficient 3D Gaussian Splatting for Large-Scale and High-Resolution Rendering."
- Chen et al. (2025), "DashGaussian: Optimizing 3D Gaussian Splatting in 200 Seconds."
- Yu et al. (2024), "Mip-Splatting: Alias-Free 3D Gaussian Splatting."

[[index|Library home]]
