---
title: Speeding Up the Learning of 3D Gaussians with Much Shorter Gaussian Lists
type: paper
authors:
  - Jiaqi Liu
  - Zhizhong Han
year: null
source_job_id: "ffc0a053-b55e-4558-9ab6-c64fd58100ac"
repository: "https://github.com/MachinePerceptionLab/ShorterSplatting"
tags:
  - 3d-gaussian-splatting
  - training-acceleration
  - differentiable-rendering
  - entropy-regularization
---

## TL;DR

The paper accelerates [[3D Gaussian Splatting]] training by periodically shrinking Gaussian scales and minimizing the entropy of alpha-blending contributions along each ray. Combined with progressive rendering resolution on a LiteGS backbone, these changes shorten Gaussian lists without requiring fewer scene primitives. On Mip-NeRF 360, training takes 99.58 seconds versus LiteGS's 191.17 seconds and original 3DGS's 919.51 seconds on an RTX 5090 D. Quality declines: PSNR is 27.28 dB versus 27.75 and 27.55 dB, respectively. The results support a speed-quality trade-off, despite the abstract's stronger quality-preservation wording.

## Research Question

Can training become faster at a fixed Gaussian count by learning smaller, more spatially concentrated primitives and more concentrated per-ray blending weights?

## Motivation

The number of Gaussians stored in a scene does not fully determine rasterization cost. Large or overlapping projected footprints create long tile candidate lists and more per-pixel blending work in both rendering and differentiation. Reducing the global primitive count can limit representational capacity. The authors instead modify the learned scales and contribution distributions to reduce overlap while retaining the prescribed Gaussian budget.

## Contributions

- Periodic scale reset directly reduces Gaussian footprints, with optimization between resets allowing other attributes to compensate.
- [[Blending-Weight Entropy Regularization]] sharpens contributions along rays and has a linear-time reverse accumulation for its gradients.
- Integration with a DashGaussian-derived resolution scheduler controls overlap at coarse resolutions.
- Evaluation separates the two regularizers and resolution scheduling, and includes full-budget and compact-model settings plus inference throughput.

## Method

### Scale Reset

Every 20 epochs, the method rescales all Gaussian scale vectors as

$$
s_i \leftarrow \zeta s_i, \qquad \zeta < 1.
$$

The default factor is $\zeta=0.2$. This changes footprints immediately, unlike a volume penalty that acts through gradient updates. The reported distributions show smaller scales and higher opacities after optimization (Sections 4.1-4.2).

### Entropy of Blending Weights

At pixel $j$, Gaussian opacity and projected density give $\alpha_{i,j}=\sigma_i g_i(j)$. With depth-ordered transmittance $T_{i,j}=\prod_{k<i}(1-\alpha_{k,j})$, the color contribution weight is $w_{i,j}=T_{i,j}\alpha_{i,j}$. Including background weight $w_{N+1,j}=T_{N+1,j}$ makes the weights sum to one. The objective is

$$
\mathcal L=\mathcal L_{\mathrm{base}}+\gamma\mathcal L_E,
\qquad
\mathcal L_E=-\frac{1}{M}\sum_{j=1}^{M}\sum_{i=1}^{N_j+1}w_{i,j}\log w_{i,j},
$$

where the base loss combines L1 reconstruction and D-SSIM. Entropy minimization concentrates contributions and influences opacity, position, scale, and rotation through $\alpha$. It requires no separate weight-normalization pass. The default $\gamma=0.015$ is applied every other epoch within each reset period.

For a single ray, define $R_i=\sum_{k=i}^{N+1}(\log w_k+1)w_k$. Then

$$
\frac{\partial H}{\partial\alpha_i}
=(-\log w_i-1)T_i+\frac{R_{i+1}}{1-\alpha_i}.
$$

A reverse scan accumulates $R_i$ in $O(N)$ operations, enabling integration with the rendering backward pass (Algorithm 1; supplementary Sections 8-10).

### Training and Resolution Schedule

The implementation uses the LiteGS stable branch. Each epoch samples 200 images with replacement, and the main schedule runs for 150 epochs, totaling 30,000 iterations. Progressive resolution scheduling uses downsampling factor $r\geq1$, ending at full resolution. The authors adapt the maximum factor to keep per-tile Gaussian counts below approximately 150 and cap it at four: excessively low resolution can increase tile overlap enough to impair parallelism. Regularization is weaker during coarse stages and adapted later; the source does not give a complete numerical stage schedule (Section 5.2).

## Experiments

### Main Comparison

All experiments use a single NVIDIA GeForce RTX 5090 D. Evaluation covers nine Mip-NeRF 360 scenes, two Deep Blending scenes (drjohnson and playroom), and two Tanks and Temples scenes (train and truck). Table 1 uses target Gaussian counts of 3.3M, 2.8M, and 1.8M, respectively, for controllable-count methods; other baselines retain their default counts.

| Dataset | Method | Training seconds | PSNR | SSIM | LPIPS |
| --- | --- | --- | --- | --- | --- |
| Mip-NeRF 360 | 3DGS | 919.51 | 27.55 | 0.819 | 0.209 |
| Mip-NeRF 360 | LiteGS | 191.17 | 27.75 | 0.822 | 0.208 |
| Mip-NeRF 360 | Proposed | 99.58 | 27.28 | 0.810 | 0.224 |
| Deep Blending | 3DGS | 963.66 | 29.74 | 0.907 | 0.237 |
| Deep Blending | LiteGS | 153.14 | 29.64 | 0.906 | 0.247 |
| Deep Blending | Proposed | 80.68 | 29.41 | 0.897 | 0.249 |
| Tanks and Temples | 3DGS | 560.52 | 23.77 | 0.854 | 0.166 |
| Tanks and Temples | LiteGS | 157.56 | 23.93 | 0.848 | 0.178 |
| Tanks and Temples | Proposed | 106.06 | 23.34 | 0.843 | 0.172 |

The reported speedups over original 3DGS are 9.2x, 11.9x, and 5.3x. Calculated from Table 1, training-time reductions relative to LiteGS are 47.9%, 47.3%, and 32.7%; the paper's roughly 50% characterization does not apply uniformly. PSNR and SSIM decrease against both baselines on every dataset, while Tanks and Temples LPIPS improves over LiteGS.

### Ablations and Compact Models

On Mip-NeRF 360 at 3.3M Gaussians, Table 4 isolates scale reset (R), entropy (E), and resolution scheduling (D) on LiteGS (L):

| Configuration | Training seconds | PSNR |
| --- | --- | --- |
| L | 191.17 | 27.75 |
| L+R | 147.33 | 27.33 |
| L+E | 162.53 | 27.35 |
| L+R+E | 141.28 | 27.14 |
| L+D | 134.99 | 27.85 |
| L+D+R | 108.62 | 27.52 |
| L+D+E | 112.13 | 27.38 |
| L+D+R+E | 99.58 | 27.28 |

Both regularizers contribute beyond scheduling, with lower final PSNR. At the tested settings, scale reset also outperforms volume regularization in time and quality (99.58 versus 107.91 seconds; 27.28 versus 27.17 dB, Table 6). Weight entropy improves speed and perceptual metrics over opacity-only regularization, although PSNR is slightly lower (27.28 versus 27.29 dB, Table 7).

At 18,000 iterations with 0.6M Gaussians on Mip-NeRF 360, training takes 43.87 seconds at 26.49 dB, compared with Mini-Splatting2's 92.68 seconds at 27.38 dB (Table 2). At FastGS's 0.4M budget and 30,000 iterations, the method takes 66.32 seconds at 26.50 dB, versus FastGS's 88.55 seconds at 27.43 dB (Table 3). These compact-model comparisons have larger quality gaps.

Supplementary Table 9 reports Mip-NeRF 360 testing throughput of 343.92 FPS, compared with 233.76 for LiteGS and 140.91 for 3DGS, at matching rendering resolution. List-length distributions and tile heatmaps support reduced overlap; the source supplies no tabulated average list-length reduction. Several figures labeled "3DGS" actually use LiteGS, as their captions or Section 5.4 clarify.

## Limitations

- Stronger shrinking or entropy regularization can degrade reconstruction. The quality losses in the tables should accompany efficiency claims, especially at small Gaussian budgets.
- The total speedup over original 3DGS includes the LiteGS backbone and resolution scheduler. It cannot be attributed entirely to scale reset and entropy; Table 4 provides the more relevant component comparison.
- The authors attribute compact-model quality limitations to LiteGS, but the proposed method also loses PSNR relative to LiteGS in Table 2. That explanation does not remove the method's additional quality cost.
- Evaluation is limited to 13 static scenes and one GPU model, without reported repeated-run uncertainty. Smaller images and fewer Gaussians yield smaller gains on Tanks and Temples; dynamic and city-scale behavior is not established.
- Per-pixel contribution lists and shared tile candidate lists are related but distinct measurements. Shrinking tiles alone need not accelerate training: original 3DGS takes 1004.30 seconds with 8-by-8 tiles versus 919.51 with 16-by-16 tiles (Table 8).
- The supplied Markdown does not establish a publication year, venue, DOI, or arXiv identifier. Its abstract gives a repository URL, while supplementary Section 12 describes release upon acceptance; code availability was not independently verified.

## Related Concepts

- [[3D Gaussian Splatting]]
- [[Blending-Weight Entropy Regularization]]
- [[Geometry-Aware Gaussian-Tile Culling]]: reduces unnecessary candidate assignments through footprint bounds; this paper instead changes the learned footprints and blending contributions.

## Related Papers

- Liao et al. (2025), "LiteGS: A High-Performance Framework to Train 3DGS in Subminutes via System and Algorithm Codesign" [26]: implementation backbone and main incremental baseline.
- Chen et al. (2025), "DashGaussian: Optimizing 3D Gaussian Splatting in 200 Seconds" [3]: source of the progressive resolution scheduler.
- Kerbl et al. (2023), "3D Gaussian Splatting for Real-Time Radiance Field Rendering" [18]: original scene representation and training baseline.
- Ren et al. (2025), "FastGS: Training 3D Gaussian Splatting in 100 Seconds" [33]: compact-budget comparison in Table 3.
- [[Faster-GS: Analyzing and Improving Gaussian Splatting Optimization]]: related library work on implementation and optimizer efficiency, distinct from FastGS [33]. No direct comparison with Faster-GS is reported here.
- [[QuadBox: Accelerating 3D Gaussian Splatting with Geometry-Aware Boxes]]: related library work on tighter Gaussian-to-tile assignment; no direct comparison is reported here.

[[index|Library home]]
