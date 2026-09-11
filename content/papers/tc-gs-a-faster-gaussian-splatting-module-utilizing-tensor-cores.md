---
title: "TC-GS: A Faster Gaussian Splatting Module Utilizing Tensor Cores"
type: paper
authors:
  - Zimu Liao
  - Jifeng Ding
  - Siwei Cui
  - Ruixuan Gong
  - Boni Hu
  - Yi Wang
  - Hengjie Li
  - Hui Wang
  - Xingcheng Zhang
  - Rong Fu
year: 2025
venue: SIGGRAPH Asia 2025 Conference Papers
doi: "10.1145/3757377.3764001"
tags:
  - 3d-gaussian-splatting
  - gpu-optimization
  - tensor-cores
  - mixed-precision
---

## TL;DR

TC-GS accelerates [[3D Gaussian Splatting]] by expressing Gaussian log-opacity evaluation as batched matrix multiplication on Tensor Cores. Tile-local coordinates make the FP16 formulation usable without the severe image degradation observed with global coordinates. On an NVIDIA A800, Table 3 shows roughly doubled forward-rendering throughput for original 3DGS, with smaller incremental gains for FlashGS. FlashGS with TC-GS reaches 479.338-735.777 FPS across the three dataset groups, with small changes in image-quality metrics.

[[index|Library home]]

## Research Question

Can the expensive per-pixel Gaussian opacity calculations in existing 3DGS renderers be mapped to Tensor Cores while retaining rendering quality and compatibility with existing acceleration pipelines?

## Motivation

Gaussian-tile culling reduces unnecessary tile assignments, but many remaining pixel-Gaussian pairs still incur opacity evaluation before being discarded. The paper's profiling separates fragments that are blended, culled after opacity evaluation, or skipped after transmittance-based termination. Culled fragments consume computation; skipped fragments do not. This motivates accelerating opacity evaluation alongside existing [[Geometry-Aware Gaussian-Tile Culling]].

## Contributions

- A runtime analysis identifying alpha computation and fragment culling as important costs within conditional alpha blending.
- EarlyCull, which compares log-opacity against the visibility threshold before evaluating the exponential.
- Frag2Mat, which separates pixel-coordinate polynomials from Gaussian coefficients to batch exponent evaluation as matrix multiplication.
- A global-to-local coordinate transformation (G2L) that controls the magnitude of quadratic pixel terms for FP16 computation.
- Integrations with original 3DGS, FlashGS, Speedy-Splat, and AdR-Gaussian, evaluated through rendering throughput, image quality, and component ablations.

## Method

### EarlyCull

For pixel $p_i$, projected Gaussian mean $\mu'_j$, covariance $\Sigma'_j$, and opacity $o_j$, define

$$
\beta_{ij}=\ln o_j-\tfrac12(\mu'_j-p_i)^T(\Sigma'_j)^{-1}(\mu'_j-p_i),
\qquad \alpha_{ij}=\exp(\beta_{ij}).
$$

The existing $\alpha_{ij}<1/255$ rejection rule is equivalent to $\beta_{ij}<-\ln 255$. Testing this first avoids exponentials for culled fragments, but still requires their log-opacity calculation (Section 4.1).

### Frag2Mat

The exponent expands into six pixel-coordinate basis terms:

$$
\beta_{ij}=u_i^T v_j,\qquad
u_i=[1,p_x,p_y,p_x^2,p_xp_y,p_y^2]^T.
$$

Writing the inverse covariance as $[a,b;b,c]$, the Gaussian coefficient vector is

$$
v_j=\left[
\ln o-\tfrac12\mu'^T\Sigma'^{-1}\mu',
a\mu'_x+b\mu'_y,
b\mu'_x+c\mu'_y,
-a/2,-b,-c/2
\right]^T.
$$

Stacking these vectors gives $B=U^T V$, an $m\times n$ matrix of exponents for $m$ pixels and $n$ Gaussians. This is an instance of [[Tensor Core Reformulation of Non-GEMM Computations]]. The implementation expands the six-term dot product to length eight by replacing the constant coefficient with three copies of $v_0/3$ and duplicating the corresponding unit basis entries. Matrix multiplication evaluates the exponents; thresholding, exponentiation of survivors, and ordered color compositing remain distinct operations (Sections 4.2 and 5.1).

### Local Coordinates

G2L subtracts a tile reference position from both the pixel and projected Gaussian mean. Their difference is unchanged, preserving the underlying quadratic expression. For 16 x 16 tiles, local pixel coordinates lie within $[-8,8]^2$, bounding their quadratic basis terms by 64. This reduces the large intermediate magnitudes encountered with global screen coordinates. Gaussian coefficients must correspond to the same local coordinate system. The paper attributes a reduction from quadratic to linear screen-dimension dependence of rounding error to a supplementary proof; that proof is not included in the supplied Markdown (Section 4.3).

## Experiments

All reported experiments use an NVIDIA A800 with 80 GB SXM memory. Evaluation covers all Mip-NeRF360 scenes, Truck and Train from Tanks and Temples, and Drjohnson and Playroom from Deep Blending. CUDA events bracket the forward-rendering procedure; reported dataset metrics include FPS, PSNR, SSIM, and LPIPS (Section 5.1).

The following are raw FPS values from Table 3, before and after adding TC-GS:

| Renderer | Tanks and Temples | Deep Blending | Mip-NeRF360 |
| --- | --- | --- | --- |
| 3DGS | 161.548 -> 323.423 | 131.373 -> 286.819 | 128.880 -> 258.809 |
| FlashGS | 326.835 -> 539.387 | 563.590 -> 735.777 | 399.772 -> 479.338 |
| Speedy-Splat | 268.602 -> 521.284 | 315.822 -> 579.988 | 264.230 -> 465.308 |
| AdR-Gaussian | 278.650 -> 545.154 | 324.180 -> 612.063 | 261.339 -> 467.310 |

The paper reports average incremental speedups of 1.38x for FlashGS, 1.84x for Speedy-Splat, and 1.87x for AdR-Gaussian. Table 4 separately reports 2.03-4.76x acceleration of the alpha-blending stage on selected scenes; these are not full forward-rendering speedups. Image metrics change slightly: for example, FlashGS on Mip-NeRF360 changes from 26.551 to 26.508 dB PSNR, while original 3DGS changes from 26.546 to 26.544 dB.

**Source consistency:** Table 3 labels the 3DGS Tanks and Temples improvement as 2.13x, but the listed FPS values yield approximately 2.002x. The raw measurements are retained here without endorsing that multiplier.

Table 5 shows that Frag2Mat with G2L supplies most of the gain. EarlyCull alone improves FPS across the four tested renderer-scene combinations, but adding it to Frag2Mat is not uniformly beneficial: Speedy-Splat on Truck falls from 732.008 to 727.647 FPS.

The precision ablation in Table 6 is decisive:

| Configuration | Drjohnson PSNR / FPS | Truck PSNR / FPS |
| --- | --- | --- |
| Original FP32 | 29.48 / 108.123 | 25.44 / 169.834 |
| Frag2Mat FP16, no G2L | 8.85 / 253.790 | 6.24 / 356.619 |
| Frag2Mat TF32, no G2L | 20.02 / 181.429 | 14.27 / 290.047 |
| Frag2Mat FP16 with G2L | 29.46 / 253.770 | 25.44 / 361.839 |

## Limitations

The evidence establishes performance on one GPU model and four rendering pipelines, rather than universal acceleration across hardware and implementations. The authors identify warp-level pipelining and preprocessing as remaining optimization opportunities; preprocessing occupies a larger fraction of runtime after rendering acceleration (Section 5.4).

Comparable PSNR, SSIM, and LPIPS do not establish bitwise equivalence or literally lossless rendering. Reduced precision without G2L fails badly in the reported ablation. Although Section 5.4 states that the module can be used during training without changing the model or training process, the supplied experiments do not quantify total training-time gains or convergence effects.

## Related Concepts

- [[3D Gaussian Splatting]]
- [[Tensor Core Reformulation of Non-GEMM Computations]]
- [[Geometry-Aware Gaussian-Tile Culling]]

## Related Papers

- Kerbl et al. (2023), "3D Gaussian Splatting for Real-Time Radiance Field Rendering": original pipeline and representation.
- Feng et al. (2024), "FlashGS: Efficient 3D Gaussian Splatting for Large-Scale and High-Resolution Rendering": optimized pipeline evaluated with TC-GS.
- Hanson et al. (2024), "Speedy-Splat: Fast 3D Gaussian Splatting with Sparse Pixels and Sparse Primitives": culling-based acceleration evaluated with TC-GS.
- Wang, Yi, and Ma (2024), "AdR-Gaussian: Accelerating Gaussian Splatting with Adaptive Radius": adaptive-radius baseline evaluated with TC-GS.
- [[Faster-GS: Analyzing and Improving Gaussian Splatting Optimization]]: related library work on rasterization and training bottlenecks; TC-GS does not report a comparison with it.
