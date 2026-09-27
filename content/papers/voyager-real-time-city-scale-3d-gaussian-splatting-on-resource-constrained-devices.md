---
title: "VOYAGER: Real-Time City-Scale 3D Gaussian Splatting on Resource-Constrained Devices"
type: paper
authors:
  - Zheng Liu
  - He Zhu
  - Xingyang Li
  - Yirun Wang
  - Yujiao Shi
  - Yiming Gan
  - Wei Li
  - Jingwen Leng
  - Yu Feng
  - Minyi Guo
year: null
project: "https://voyager-web.netlify.app/"
tags:
  - 3d-gaussian-splatting
  - gpu-rendering
  - level-of-detail
  - temporal-coherence
  - mobile-rendering
---

## TL;DR

VOYAGER accelerates city-scale [[3D Gaussian Splatting]] by reusing the previous frame's level-of-detail selection and reducing exponential evaluations during rasterization. On NVIDIA AGX Orin, Table 1 reports 42.19, 39.01, and 56.42 FPS on the HierarchicalGS, UrbanScene3D, and MegaNeRF dataset groups at $\tau=3$, with quality metrics close to the corresponding HierarchicalGS baseline. Coarser detail increases throughput, but the source contains conflicting quality and energy values and does not support its claim of at least 60 FPS on every tested scene.

[[index|Library home]]

## Research Question

Can temporal coherence and GPU-aware scheduling make hierarchical city-scale Gaussian scenes practical to render on a constrained device while preserving the selected level of detail and limiting image-quality loss?

## Motivation

Large scenes require both a hierarchy search to select Gaussians and a splatting pipeline to render them. In the paper's SmallCity profiling, cut finding and rasterization together account for 83% of execution time on average. At LoD 6, 92% of tree-node accesses are reported as unnecessary and 99% of selected Gaussians overlap between adjacent frames in a simulated 60 FPS trajectory. Repeating a full search wastes that temporal coherence. Within rasterization, exponential evaluation accounts for roughly half the time in the reported profiling, motivating optimization of both stages (Section 3.2).

## Contributions

- Partitions the LoD hierarchy offline into GPU-friendly chunks that fit shared memory, enabling streaming traversal and balanced work assignment.
- Introduces [[Temporal-Aware Level-of-Detail Search]], which begins from subtrees containing the previous selection and expands to parents or children when needed to recover the current selection.
- Uses [[Log-Space Opacity Culling]] before exponentiation and a small shared-memory lookup table to approximate exponentials for surviving contributions.
- Evaluates rendering quality, throughput, operation counts, energy, component ablations, and lookup-table size on large and small scenes.

## Method

### Hierarchical Selection and Streaming Traversal

The LoD tree stores a Gaussian at each node. Cut finding selects nodes whose projected size is below the detail threshold $\tau^*$ while their parents exceed it. The resulting cut separates the hierarchy's coarse and fine regions. Selected Gaussians interpolate with their parents to smooth detail transitions before projection, sorting, and rasterization.

VOYAGER decomposes the hierarchy into small subtrees, orders them breadth first, and packs contiguous groups into chunks under a shared-memory capacity constraint. The paper formulates offline packing as minimizing the number of chunks and proposes an integer-programming solver. Runtime traversal streams these chunks, distributes local work across GPU threads, and overlaps loading with computation through warp specialization (Section 4.1).

For subsequent frames, search starts in subtrees containing the previous cut. Local results determine whether to move to a parent or descend into children. This continuation is essential: the previous cut is a starting point, not an unconditional cached answer. The authors claim bit-accurate cut selection relative to the baseline; the rendering approximation is introduced separately by the lookup table.

### Preemptive Alpha Filtering

For Gaussian opacity $\theta_i$ and screen-space exponent $\rho$, the paper evaluates

$$
\alpha_i=\min(0.99,\theta_i e^\rho).
$$

For a positive threshold below the cap, its strict acceptance test can be written

$$
\rho>\log\alpha^*-\log\theta_i.
$$

Precomputing Gaussian log-opacity lets the renderer reject negligible contributions without first evaluating an exponential. The paper also describes moving the check into culling and projection to reduce later sorting and rasterization work, though the supplied text does not fully specify the conservative spatial test needed to reject an entire Gaussian or tile from a per-intersection criterion (Section 4.2).

For survivors, a lookup table approximates $e^\rho$ over the reported effective range $[-5.55,0]$. The chosen design uses 32 intervals and is described as a 128-byte shared-memory table. This approximation trades some image accuracy for fewer special-function-unit operations; it is distinct from the algebraic threshold rewrite.

## Experiments

The platform is NVIDIA AGX Orin with a mobile Ampere GPU, approximately 5.33 FP32 TFLOPS, and 64 GB memory. Large-scene tests include SmallCity from HierarchicalGS, Residence and SciArt from UrbanScene3D, and Rubble and Building from MegaNeRF. Baselines are dense 3DGS, CityGaussian, Octree-GS, and HierarchicalGS. The paper reports PSNR, SSIM, LPIPS, FPS, operation counts, and energy, with latency including kernel launches and GPU power obtained from device sensors (Section 5.1 and Appendix A.1).

The following values are from **Table 1**, comparing matched detail settings. Quality is PSNR / SSIM / LPIPS; energy is in mJ as labeled in the source.

| Dataset group | Detail $\tau$ | HierarchicalGS FPS | VOYAGER FPS | HierarchicalGS quality | VOYAGER quality | Energy, baseline -> VOYAGER |
| --- | --- | --- | --- | --- | --- | --- |
| HierarchicalGS | 3 | 11.43 | 42.19 | 26.24 / 0.812 / 0.254 | 26.24 / 0.812 / 0.254 | 455.03 -> 127.99 |
| UrbanScene3D | 3 | 12.69 | 39.01 | 23.79 / 0.755 / 0.228 | 23.78 / 0.755 / 0.228 | 409.96 -> 139.69 |
| MegaNeRF | 3 | 15.39 | 56.42 | 25.18 / 0.783 / 0.280 | 25.17 / 0.783 / 0.280 | 344.55 -> 99.12 |
| HierarchicalGS | 15 | 15.53 | 68.84 | 25.39 / 0.771 / 0.316 | 25.39 / 0.771 / 0.316 | 334.73 -> 78.44 |
| UrbanScene3D | 15 | 17.94 | 58.67 | 23.11 / 0.716 / 0.306 | 23.11 / 0.716 / 0.306 | 290.29 -> 92.05 |
| MegaNeRF | 15 | 19.63 | 79.38 | 23.31 / 0.686 / 0.367 | 23.31 / 0.686 / 0.367 | 270.57 -> 70.60 |

The headline 6.6x speedup is against dense 3DGS: Table 1 lists 79.38 versus 12.03 FPS for MegaNeRF at VOYAGER's coarser setting. It is not a matched-HierarchicalGS speedup. Figures 8 and 9 report standalone gains of 5.1x for LoD search and 3.3x for the full splatting stage at $\tau=3$; the latter includes projection and sorting as well as rasterization.

Table 2's HierarchicalGS ablation at $\tau=3$ increases throughput from 11.43 FPS to 15.78 with fully streaming search, 22.15 with temporal search, and 42.19 for the full system. Rounded image metrics remain 26.24 dB PSNR, 0.812 SSIM, and 0.254 LPIPS. The full-system gain is approximately 3.7x for this setting.

Small-scene tests cover Mip-NeRF360, Tanks and Temples, and Deep Blending. Table 3 reports VOYAGER throughputs of 58.10, 46.52, and 53.27 FPS at $\tau=3$, rising to 70.28, 93.45, and 67.91 at $\tau=15$. Section 5.5 nevertheless notes visible approximation artifacts. The lookup-table sensitivity study reports useful quality improvement from 8 to 32 intervals, with little additional quality benefit and substantial performance loss when increasing to 128 (Section 5.6).

## Limitations

- **Conflicting quality results:** Table 1 gives identical baseline and VOYAGER quality at $\tau=15$, but Appendix Table 5 reports worse VOYAGER results. For SmallCity, the appendix gives VOYAGER 25.06 dB PSNR and 0.324 LPIPS versus 25.39 and 0.316 for HierarchicalGS. For UrbanScene3D, VOYAGER's appendix average is 22.66 dB, 0.707 SSIM, and 0.331 LPIPS, rather than Table 1's 23.11, 0.716, and 0.306. The supplied source does not reconcile these values.
- **Throughput claim exceeds the tables:** Section 5.3 claims consistent rendering at or above 60 FPS. Appendix Table 4 instead gives 58.19 FPS for Residence and 59.15 for SciArt even at $\tau=15$.
- **Energy reporting is inconsistent:** The abstract claims up to 85% savings, while Section 5.3 reports 82% against 3DGS and 80% against HierarchicalGS. Tables 1 and 4 also disagree on HierarchicalGS energy at $\tau=15$; SmallCity is 334.73 versus 405.95 mJ. The table above retains Table 1's values without treating the headline percentages as a single verified result.
- **Approximation and motion scope:** The authors report small-scene artifacts despite matching rounded quality metrics in Table 3. Temporal reuse is motivated by smooth motion; the supplied evaluation does not quantify abrupt camera jumps or worst-case traversal latency.
- **Hardware and memory scope:** Results come from one Orin platform, not a range of phones or mobile GPUs. Campus is omitted because all methods run out of memory (Table 5 caption).
- **Reproduction detail:** The text alternates between block-, warp-, chunk-, and subtree-level scheduling descriptions, and does not fully specify lookup-table endpoint handling. It states that code will be released upon publication. The supplied Markdown provides no publication year, venue, DOI, or paper identifier, so those are not inferred from the dates of cited work.

## Related Concepts

- [[3D Gaussian Splatting]]
- [[Temporal-Aware Level-of-Detail Search]]
- [[Log-Space Opacity Culling]]
- [[Geometry-Aware Gaussian-Tile Culling]]: related reduction of work before sorting and rasterization through spatial support tests.

## Related Papers

- Kerbl et al. (2024), "A Hierarchical 3D Gaussian Representation for Real-Time Rendering of Very Large Datasets": the hierarchy-based baseline whose cut selection VOYAGER aims to preserve.
- Liu et al. (2024), "CityGaussian: Real-Time High-Quality Large-Scale Scene Rendering with Gaussians": large-scene baseline.
- Ren et al. (2024), "Octree-GS: Towards Consistent Real-Time Rendering with LoD-Structured 3D Gaussians": alternative hierarchical baseline.
- [[TC-GS: A Faster Gaussian Splatting Module Utilizing Tensor Cores]]: related library paper that also tests opacity in log space, then accelerates exponent evaluation through matrix multiplication. VOYAGER does not report a comparison with TC-GS.
- [[QuadBox: Accelerating 3D Gaussian Splatting with Geometry-Aware Boxes]]: related library work on early geometric rejection; not an evaluated VOYAGER baseline.
