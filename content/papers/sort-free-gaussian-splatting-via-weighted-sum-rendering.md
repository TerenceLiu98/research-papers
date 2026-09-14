---
title: Sort-Free Gaussian Splatting via Weighted Sum Rendering
type: paper
authors:
  - Qiqi Hou
  - Randall Rauwendaal
  - Zifeng Li
  - Hoang Le
  - Farzad Farhadzadeh
  - Fatih Porikli
  - Alexei Bourd
  - Amir Said
year: null
tags:
  - 3d-gaussian-splatting
  - differentiable-rendering
  - order-independent-transparency
  - mobile-gpu
---

## TL;DR

GS-WSR replaces depth-sorted alpha compositing in [[3D Gaussian Splatting]] with learned, commutative [[Weighted Sum Rendering]] and view-dependent opacity. Its linear-correction variant achieves similar aggregate reconstruction quality to 3DGS on 13 scenes. On a Snapdragon 8 Gen 3 GPU, the authors report a 1.23x average speedup over their Vulkan graphics baseline when mobile resources are not exhausted, with runtime memory around 63% of that baseline. Approximate occlusion, missing early termination, and scene-dependent performance remain important constraints.

## Research Question

Can a scene representation trained for order-independent weighted blending retain the visual quality of sorted Gaussian splatting while exploiting mobile hardware rasterization and eliminating sorting overhead?

## Motivation

Alpha compositing depends on depth order. The original 3DGS pipeline replicates Gaussians across screen-space tiles and sorts them before compute-based rasterization. A hardware graphics implementation can avoid tile replication but still needs a global sort. Both approaches consume time and memory, and changes in approximate depth order can create temporal popping. The paper treats the compositing rule as part of the learned representation rather than a fixed physical constraint.

## Contributions

- Introduces a differentiable, normalized weighted-sum renderer that removes depth sorting and maps to hardware additive blending.
- Compares constant, exponential, and linear-correction depth weights with learned parameters.
- Uses additional spherical harmonics coefficients for view-dependent, unclamped opacity to reduce contributions from occluded Gaussians.
- Evaluates reconstruction fidelity, mobile runtime, runtime memory, and component ablations against 3DGS and other scene representations.

## Method

### Learned weighted blending

For pixel color $\mathbf C$, Gaussian color $\mathbf c_i$, opacity contribution $\alpha_i$, depth $d_i$, and background color and weight $\mathbf c_B,w_B$, Equation 7 defines

$$
\mathbf C = \frac{\mathbf c_B w_B + \sum_i \mathbf c_i\alpha_i w(d_i)}{w_B + \sum_i\alpha_i w(d_i)}.
$$

Each contribution can be accumulated independently. Unlike conventional alpha compositing, this expression does not use products of preceding Gaussians' transmittance. Gaussian parameters and blending parameters are optimized for this renderer; the method changes scene training as well as rendering.

The three weighting rules in Section 4.2 are

$$
\begin{aligned}
w_{\mathrm{DIR}}(d_i)&=1,\\
w_{\mathrm{EXP}}(d_i)&=\exp(-\sigma d_i^\beta),\\
w_{\mathrm{LC}}(d_i)&=\max(0,1-d_i/\sigma)v_i.
\end{aligned}
$$

The exponential variant learns $\sigma,\beta$; the linear-correction variant learns $\sigma,v_i$. Constant weights blur overlapping surfaces because they lack depth information. Linear correction can set distant contributions to zero and is cheaper to evaluate than exponentiation.

### View-dependent opacity and optimization

An additional set of spherical harmonics coefficients replaces each Gaussian's scalar maximum opacity with a view-dependent value. The value is not clamped to the physical opacity interval. This supplies flexibility for fitting the approximate compositing rule, but does not guarantee physically correct transparency. Training uses PyTorch with custom CUDA kernels and the 3DGS L1/D-SSIM objective with the reported D-SSIM factor of 0.2. The original densification procedure is retained, while opacity-threshold pruning is removed (Appendix C).

### Mobile implementation

The Vulkan renderer projects Gaussians, evaluates appearance and opacity, and submits visible Gaussians through one instanced draw call. Fragment contributions use hardware additive blending, followed by a normalization subpass. Frustum culling is retained, but accumulated-opacity early termination is unavailable. The graphics baseline and WSR both use 16-bit RGBA render targets; the authors note that conventional 3DGS can instead use faster 8-bit targets with slightly reduced quality (Appendix A).

## Experiments

The evaluation follows the 3DGS setting: nine Mip-NeRF 360 scenes, two Tanks & Temples scenes, and two Deep Blending scenes. Quality is evaluated using the PyTorch implementation; mobile efficiency is measured at 1920 x 1080 on a Snapdragon 8 Gen 3 Adreno GPU. The two Vulkan baselines are a compute implementation with tile replication and a graphics implementation with global sorting.

### Reconstruction quality

Table 1 reports the following aggregate results. Higher PSNR and SSIM and lower LPIPS are better.

| Dataset | Method | PSNR (dB) | SSIM | LPIPS |
| --- | --- | --- | --- | --- |
| Mip-NeRF 360 | 3DGS | 27.21 | 0.815 | 0.214 |
| Mip-NeRF 360 | LC-WSR | 27.19 | 0.804 | 0.211 |
| Tanks & Temples | 3DGS | 23.14 | 0.841 | 0.183 |
| Tanks & Temples | LC-WSR | 23.61 | 0.842 | 0.177 |
| Deep Blending | 3DGS | 29.41 | 0.903 | 0.243 |
| Deep Blending | LC-WSR | 29.63 | 0.902 | 0.229 |

Similar averages conceal scene differences: Table 6 reports bicycle PSNR of 24.20 for LC-WSR versus 25.25 for 3DGS, while room improves from 30.63 to 31.93.

### Runtime and memory

Section 5.2 reports a 1.23x average total-time speedup over 3DGS-Graphics for cases without resource exhaustion. Table 2 includes much larger gains for resource-exhausted baseline scenes, which should not be conflated with that summary. WSR is not uniformly faster: train takes 53.13 ms versus 52.48 ms for 3DGS-Graphics, and kitchen is nearly tied at 74.47 versus 74.56 ms. Counter takes 34.06 versus 42.25 ms.

The learned WSR models average 2.88 million Gaussians versus 3.98 million for 3DGS, so the comparison combines sorting removal with representation-size changes. Runtime memory is reported as roughly 63% of 3DGS-Graphics; the authors attribute around 17% memory reduction to removing sorting and the remainder to fewer Gaussians. Reusing the alpha channel in their RGBA layout avoids extra GPU storage for opacity harmonics, but general per-Gaussian storage increases relative to RGB-only harmonics.

### Ablations

Table 4 gives Mip-NeRF 360 PSNR of 25.99, 26.97, and 27.19 for direct, exponential, and linear-correction weights. LC-WSR leads on Mip-NeRF 360 and Tanks & Temples; EXP-WSR has higher Deep Blending PSNR, 29.77 versus 29.63. On Mip-NeRF 360, removing learnable parameters lowers PSNR from 27.19 to 23.19, and removing view-dependent opacity lowers it to 25.88 (Table 5). Qualitative camera-rotation examples show removal of sorting-induced popping, rather than a comprehensive temporal-stability benchmark.

## Limitations

- **Occlusion approximation:** Dark foreground objects can appear transparent against bright backgrounds; Appendix C illustrates a bicycle seat failure. The authors attribute this to suboptimal training, but do not establish a remedy.
- **No early termination:** The hardware blending pipeline cannot cheaply inspect accumulated opacity within the draw pass. It therefore accumulates all visible Gaussians, losing a useful 3DGS optimization.
- **Limited performance scope:** Results concern one mobile GPU platform, specific Vulkan implementations, and learned models with different Gaussian counts. Added weighting and normalization can offset sorting savings. Table 2 lists WSR times from 34.06 to 85.85 ms, which does not establish 30 fps across all scenes despite the text's broad real-time claim.
- **Nonphysical representation:** Learned weights and unclamped view-dependent opacity fit images without enforcing optical laws. Plausible camera-motion examples do not establish general occlusion correctness.
- **Source completeness:** The supplied Markdown provides no explicit publication year or stable identifier for this paper. Its Table 7 contains PSNR-like values in several comparison methods' SSIM rows, some appendix aggregates differ from Table 1, and Table 8 has a caption without values. The summary above uses the main tables for aggregate quality and does not repair missing data by inference.

## Related Concepts

- [[3D Gaussian Splatting]]
- [[Weighted Sum Rendering]]
- [[Stochastic Transparency]]: another order-independent approach, based on randomized coverage rather than learned deterministic blending.

## Related Papers

- McGuire and Bavoil (2013), "Weighted Blended Order-Independent Transparency": the weighted-blending motivation, extended here through learned parameters and opacity.
- Kerbl et al. (2023), "3D Gaussian Splatting for Real-Time Radiance Field Rendering": the representation, training, and sorted-rendering baseline.
- Radl et al. (2024), "StopThePop: Sorted Gaussian Splatting for View-Consistent Real-Time Rendering": addresses popping through improved sorting.
- [[Gaussian Point Splatting]]: a related library paper that uses stochastic opaque point samples to avoid sorted alpha compositing; it is not a comparison evaluated in this manuscript.

[[index|Library home]]
