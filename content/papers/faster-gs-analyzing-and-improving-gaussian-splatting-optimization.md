---
title: "Faster-GS: Analyzing and Improving Gaussian Splatting Optimization"
type: paper
authors:
  - Florian Hahlbohm
  - Linus Franke
  - Martin Eisemann
  - Marcus Magnor
year: null
project: "https://fhahlbohm.github.io/faster-gaussian-splatting"
tags:
  - 3d-gaussian-splatting
  - gpu-optimization
  - differentiable-rendering
  - novel-view-synthesis
---

## TL;DR

Faster-GS combines prior rasterizer optimizations with improved memory access, a custom fused Adam implementation, and spatial reordering to accelerate [[3D Gaussian Splatting]] training while retaining comparable reconstruction quality and Gaussian counts. Across 13 static scenes, Table 4 reports average training times of 4m10s versus 17m46s on an RTX 4090, and 2m43s versus 13m05s on an RTX 5090. A 4D Gaussian extension also accelerates dynamic reconstruction. Optional shortcuts that skip invisible-Gaussian updates or remove view-dependent color are evaluated separately because they reduce quality.

## Research Question

How much can the original 3DGS training pipeline be accelerated through implementation improvements while preserving its representation, broad optimization schedule, and reconstruction quality?

## Motivation

Prior acceleration methods often combine implementation improvements with pruning, changed representations, or rendering approximations, making their individual benefits difficult to compare. Faster-GS builds a common testbed to isolate useful techniques and identify bottlenecks that emerge after integration. Memory traffic dominates much of rasterization, but parameter updates become the main remaining cost once rendering and gradient computation are accelerated.

## Contributions

- Surveys and evaluates tight splat bounds, tile culling, separate sorting, per-Gaussian backward passes, and rasterizer kernel fusion under a common experimental setup.
- Improves shared-memory loading for the per-Gaussian backward pass, introduces periodic spatial reordering during densification, and implements a custom fused Adam routine.
- Evaluates additional fusion of backward computation and optimizer updates, including the consequences of skipping updates for invisible Gaussians.
- Extends the implementation to joint space-time 4D Gaussians and supplies supplementary experiments on inference, anti-aliasing, MCMC densification, and Gaussian truncation.

## Method

The basis implementation retains anisotropic Gaussians, spherical-harmonic appearance, tile-based rasterization, adaptive density control, and 30,000 training iterations. Its rewritten CUDA kernels compute alpha-blending gradients in front-to-back order and handle degenerate Gaussians explicitly. Persistent densification buffers, fewer parameter copies, and expandable memory segments reduce overhead and fragmentation (Section B.1).

The integrated pipeline applies opacity-aware rectangular bounds and load-balanced [[Geometry-Aware Gaussian-Tile Culling]]. It separates depth sorting from stable tile sorting, reducing key sizes and repeated sorting of identical depth values. Activation functions are fused into the rasterizer, and separate spherical-harmonic buffers avoid frontend concatenation.

For the backward pass, each warp handles a bucket of 32 Gaussians associated with one tile. Each thread accumulates one Gaussian's gradients across the tile's pixels before global atomic accumulation. Stored intermediate blending states make this possible; collaborative loading into shared memory reduces stalls compared with repeatedly loading states from global memory. This technique reduces atomic operations but requires additional VRAM.

Periodic z-ordering places spatially adjacent Gaussians near one another in parameter buffers, improving locality after densification. The authors reorder every 5,000 iterations while densification is active. Its benefit depends on using the per-Gaussian backward pass: with the original backward pass, spatial proximity can increase atomic contention and false sharing.

A custom fused Adam routine reduces optimizer overhead. Further fusion of updates into the rasterizer backward pass is an additional variant beyond the main full implementation. Preserving Adam behavior requires updating even parameters whose current gradient is zero, because optimizer moments can still cause a parameter change. Skipping invisible Gaussians therefore changes optimization behavior.

The dynamic extension follows Zeyu Yang et al. (2024), representing joint space-time Gaussians and conditioning each on the requested time to obtain a 3D Gaussian, with temporal marginal weight modulating opacity. This is a joint 4D representation within the broader family of [[Dynamic 3D Gaussian Splatting]], rather than a learned deformation of a canonical scene.

## Experiments

### Static Reconstruction

The main evaluation uses nine Mip-NeRF360 scenes, two Tanks and Temples scenes, and two Deep Blending scenes, with a 7:1 train/test split and an RTX 4090. All baselines use fused SSIM and unified hyperparameters, including an opacity learning rate of 0.025. Training-image upload time is excluded from timing but image storage is included in peak VRAM. Image-quality measurements average five runs; nondeterministic gradient accumulation can produce differences as large as 0.5 dB on individual scenes even with a fixed seed.

Table 1 reports the following dataset averages. Paired entries show original 3DGS followed by Faster-GS.

| Dataset | Training time | Peak VRAM | PSNR | SSIM | LPIPS | Gaussians |
| --- | --- | --- | --- | --- | --- | --- |
| Mip-NeRF360 | 18m44s / 4m31s | 8.8 / 6.1 GiB | 27.53 / 27.56 | 0.815 / 0.816 | 0.256 / 0.254 | 2.74 / 2.73 M |
| Tanks and Temples | 11m26s / 3m04s | 4.7 / 3.4 GiB | 23.77 / 23.75 | 0.852 / 0.853 | 0.204 / 0.204 | 1.57 / 1.55 M |
| Deep Blending | 19m43s / 3m46s | 8.1 / 6.0 GiB | 29.81 / 29.78 | 0.907 / 0.906 | 0.305 / 0.304 | 2.47 / 2.61 M |

The reported training speedup reaches 5.2x over 3DGS and 2.4x over the restricted Taming-3DGS baseline on Deep Blending. Speedy-Splat and StopThePop comparisons enable only selected contributions that preserve quality; these are not comparisons against their complete algorithms. Across all 13 scenes, Table 4 reports speedups of 3.9x, 4.3x, and 4.8x on RTX 3090, 4090, and 5090 GPUs, respectively. The 163-second average belongs to the RTX 5090 experiment.

### Ablations and Extensions

- **Optimizer fusion:** On Mip-NeRF360 outdoor scenes, full Faster-GS takes 5m31s at 24.72 dB. Fusing updates reduces this to 5m04s at 24.73 dB and lowers VRAM from 6.0 to 5.6 GiB. Skipping invisible updates reaches 3m03s at 24.59 dB; using only degree-zero spherical harmonics reaches 2m24s at 24.38 dB (Table 3).
- **Dynamic reconstruction:** On eight synthetic D-NeRF scenes at 800 by 800 resolution, both implementations train for 30,000 iterations with batch size four. Faster-GS takes 6m22s versus 18m09s for Yang et al., with 1.2 versus 1.9 GiB VRAM and PSNR of 31.79 versus 31.52 dB. SSIM and LPIPS match at 0.960 and 0.051 (Table 5).
- **Inference:** A separately optimized forward pass averages 903.4 FPS versus 290.4 FPS across the 13 static scenes, with baseline activations baked before rendering (Table 6).
- **Anti-aliasing:** The optional full anti-aliasing configuration retains 4m31s average training time. At half and double the training resolution, PSNR rises from 25.11 to 28.39 dB and from 25.73 to 26.87 dB, respectively (Tables 7-8). Its efficient implementation clips scales after updates and detaches the opacity compensation factor from covariance-gradient computation; the full analytical derivative remains optional.
- **MCMC densification:** The optimized extension takes 6m17s versus 27m22s for the adjusted original implementation, with PSNR of 28.00 versus 27.83 dB and VRAM of 7.2 versus 8.9 GiB (Table 9).
- **Truncation:** Opacity-independent truncation at two or one standard deviations reduces Gaussian counts and quality. PSNR falls from the default anti-aliased configuration's 27.54 dB to 27.23 and 25.86 dB, respectively (Table 10).

## Limitations

Comparable quality does not imply identical optimization trajectories or exact Gaussian counts. Section B.1 documents changes to numerical handling, training-time color clipping, and update ordering; moving the optimizer step before densification restores 145 updates with nonzero gradients omitted by the reference implementation. The main comparison also excludes pruning, compression, reduced precision, and other contributions that change the quality-cost trade-off.

Performance gains depend on scene size, memory layout, backward-pass design, and GPU generation. Isolated tile-culling or z-ordering improvements need not accelerate every configuration. Optimizer updates remain a major bottleneck, and fusing them into the backward pass reduces extensibility. Optional invisible-update skipping, reduced appearance complexity, aggressive truncation, and approximate anti-aliasing gradients should not be conflated with exact preservation of the original algorithm.

The supplied Markdown does not state a publication year, venue, DOI, or arXiv identifier. It ends at the caption of Table 11, so the additional real-world 4D reconstruction results cannot be quantified from this source. The conclusion's claim of reconstruction in less than two minutes is not the all-scene average in Table 4; the hardware-specific table values are used here.

## Related Concepts

- [[3D Gaussian Splatting]]
- [[Geometry-Aware Gaussian-Tile Culling]]
- [[Dynamic 3D Gaussian Splatting]]

## Related Papers

- Kerbl et al. (2023), "3D Gaussian Splatting for Real-Time Radiance Field Rendering" [37]: original representation, rasterizer, and training baseline.
- Mallick et al. (2024), "Taming 3DGS: High-Quality Radiance Fields with Limited Resources" [56]: per-Gaussian backward pass and visibility-aware optimizer updates.
- Radl et al. (2024), "StopThePop: Sorted Gaussian Splatting for View-Consistent Real-Time Rendering" [65]: opacity-aware bounds and load-balanced tile culling used in Faster-GS.
- Hanson et al. (2025), "Speedy-Splat: Fast 3D Gaussian Splatting with Sparse Pixels and Sparse Primitives" [25]: alternative tile enumeration, evaluated with only selected features enabled.
- Zeyu Yang et al. (2024), "Real-Time Photorealistic Dynamic Scene Representation and Rendering with 4D Gaussian Splatting" [93]: basis of the joint 4D extension.
- [[QuadBox: Accelerating 3D Gaussian Splatting with Geometry-Aware Boxes]]: a related library paper focused on Gaussian-to-tile assignment; Faster-GS does not report a direct comparison with QuadBox.

[[index|Library home]]
