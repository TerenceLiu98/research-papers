---
title: "StochasticSplats: Stochastic Rasterization for Sorting-Free 3D Gaussian Splatting"
type: paper
authors:
  - Shakiba Kheradmand
  - Delio Vicini
  - George Kopanas
  - Dmitry Lagun
  - Kwang Moo Yi
  - Mark Matthews
  - Andrea Tagliasacchi
year: null
tags:
  - 3d-gaussian-splatting
  - stochastic-rendering
  - differentiable-rendering
  - order-independent-transparency
  - gpu-rendering
---

## TL;DR

StochasticSplats applies [[concepts/stochastic-transparency|Stochastic Transparency]] to [[concepts/3d-gaussian-splatting|3D Gaussian Splatting]], replacing sorted alpha compositing with randomized opaque fragments resolved by depth testing. An OpenGL renderer trades samples per pixel (SPP) against noise, with roughly 2.5x to 4x lower rendering latency than the CUDA 3DGS baseline at 1 SPP on the tested GPUs. A stochastic gradient estimator supports scene fine-tuning, while reoriented splats address popping. High-quality rendering needs more samples, and low-noise gradient estimation can be substantially slower than the baseline.

## Research Question

Can stochastic rasterization remove sorting from Gaussian rendering and differentiation, expose a runtime quality-cost control, and reduce popping while fitting standard graphics hardware?

## Motivation

Conventional 3DGS projects Gaussians onto camera-facing billboards and composites them in an approximate depth order. Sorting costs persist as image resolution falls, changes in Gaussian order cause temporal discontinuities, and flattened primitives cannot correctly intermix volumetric densities. Existing remedies often add sorting work or rely on specialized compute implementations. The paper investigates stochastic visibility as a route to hardware depth testing and an adjustable sampling budget.

## Contributions

- Adapts unbiased Monte Carlo estimation of alpha blending to Gaussian splats, using ordinary depth tests without sorting.
- Derives a detached gradient estimator and a three-pass implementation for differentiable stochastic transparency.
- Reorients billboards to approximate each Gaussian's maximum-density surface, addressing popping while retaining hardware depth interpolation.
- Extends the formulation to volumetric intermixing by sampling free-flight distances; demonstrates the extension on overlapping Gaussians.
- Evaluates CUDA and OpenGL implementations, sampling budgets, temporal accumulation, and open-vocabulary localization.

## Method

### Randomized visibility

For a pixel, independently retain fragment $i$ with probability $\alpha_i$ and use the depth buffer to keep the nearest retained fragment. Its selection probability is

$$
P(i)=\alpha_i\prod_{z_k<z_i}(1-\alpha_k).
$$

The sample returns color $c_i$, or the background color when no fragment survives. Averaging independent samples estimates the alpha-composited color without explicitly forming a sorted list (Section 3.2). This unbiasedness concerns the chosen fragment-depth model; fixed billboard depths do not themselves implement full volumetric transport. The OpenGL implementation uses fragment discard and hardware depth testing; higher sample counts use supersampling and downsampling.

### Differentiation and loss bias

For parameters $\theta$, the detached estimator samples $i$ from $P$ and evaluates

$$
\widehat{\nabla_\theta C}
=\frac{1}{P(i)}\nabla_\theta\left[c_i\alpha_i\prod_{z_k<z_i}(1-\alpha_k)\right],
$$

without differentiating the sampling probability in the denominator (Equations 5-8). The selected primitive receives a color gradient; it and the primitives in front receive opacity gradients. Primitives behind it receive neither in that sample.

The loss gradient multiplies a noisy image-loss derivative by a noisy rendering derivative. The implementation first renders an image to evaluate the loss derivative, then renders with an independent seed, and finally replays that second pass to compute parameter gradients. Decorrelation yields unbiased loss gradients for L2 loss; for other losses it reduces bias without generally eliminating it (Section 3.3).

### Depth models and temporal accumulation

Removing sorting while retaining Gaussian-center depths still permits popping. The fast remedy orients each billboard to the plane

$$
\mathbf n^\top(\mathbf x-\boldsymbol\mu)=0,
\qquad \mathbf n=\Sigma^{-1}(\boldsymbol\mu-\mathbf o),
$$

where $\mathbf o$ is the ray origin. This approximates the maximum-density surface and lets hardware interpolate depth without a fragment-shader depth override (Section 3.4).

For full volumetric intermixing, the paper instead treats Gaussians as extinction fields, independently samples their free-flight distances, and keeps the minimum. This resolves overlapping densities but requires per-fragment depth modification, which can prevent hardware early depth rejection. Figure 5 illustrates this extension; it is distinct from the fast plane-based renderer used in the main quality comparison.

Temporal anti-aliasing reprojects previous color and world-position averages into the current view. Accumulation resets when positions disagree beyond a threshold. It reduces 1-SPP noise across frames, but the supplement notes that average positions are less well defined in volumetric regions.

## Experiments

The rendering evaluation uses Mip-NeRF 360, comparing original CUDA 3DGS, the Splatapult OpenGL implementation, and StopThePop. Existing scenes are fine-tuned for 1,000 iterations at 128 SPP, without densification or pruning; average fine-tuning takes about 14 minutes on an RTX 3090. Table 1 specifically uses StopThePop-trained scenes. The supplementary timing tables list seven scenes: room, bonsai, counter, kitchen, stump, bicycle, and garden.

### Image quality

Table 1 reports the following results with the proposed popping compensation. Higher PSNR and SSIM and lower LPIPS are better.

| Method | PSNR (dB) | SSIM | LPIPS |
| --- | --- | --- | --- |
| 3DGS | 28.99 | 0.869 | 0.185 |
| StopThePop | 28.79 | 0.870 | 0.181 |
| StochasticSplats, 1 SPP | 17.95 | 0.285 | 0.611 |
| StochasticSplats, 16 SPP | 26.25 | 0.714 | 0.351 |
| StochasticSplats, 256 SPP | 28.50 | 0.856 | 0.178 |
| StochasticSplats, 1,024 SPP | 28.66 | 0.867 | 0.168 |

Increasing samples approaches baseline PSNR and SSIM; LPIPS is better than both baselines at the largest reported sample counts. These high-sample quality results do not establish comparable quality at the fastest rendering setting.

### Rendering and backward-pass cost

Table 2 gives mean forward times in milliseconds across scenes and views. StochasticSplats uses OpenGL here.

| GPU | 3DGS CUDA | 3DGS OpenGL | StochasticSplats, 1 SPP | StochasticSplats, 4 SPP | StochasticSplats, 16 SPP |
| --- | --- | --- | --- | --- | --- |
| T1000 Max-Q | 65.08 | 100.28 | 16.23 | 24.71 | 61.25 |
| RTX 3090 | 8.14 | 32.15 | 3.25 | 6.42 | 18.48 |
| RTX 4090 | 5.60 | 20.70 | 1.85 | 2.86 | 8.00 |

The advantage shrinks with sampling: at 16 SPP, StochasticSplats is slower than CUDA 3DGS on both RTX cards. For the CUDA backward pass on an RTX 3090, Table 3 reports 18.10, 33.19, and 478.93 ms at 1, 8, and 128 SPP, versus 23.06 ms for 3DGS and 25.77 ms for StopThePop. Thus the training configuration's low-variance gradients carry a large cost.

Resolution sweeps show that lowering alpha-blended rendering resolution eventually increases time as more Gaussians fall into each tile (Figure 8); this is an implementation-dependent observation, not a general law that smaller images render more slowly.

### Single-sample applications

Temporal anti-aliasing qualitatively reduces noise with reportedly negligible latency overhead (Figure 9). Replacing LangSplat's renderer on four LERF scenes yields mean localization accuracy of 82.0% at 1 SPP versus 84.3% with alpha blending (Table 4). Three scenes tie; Waldo-Kitchen falls from 95.5% to 86.4%. The paper reports 4x faster rendering for this application, with a measurable accuracy trade-off.

## Limitations

- **Variance and cost:** Few samples give noisy images and gradients. High sample counts can erase rendering gains and make the backward pass much more expensive.
- **Conditional gradient guarantee:** Unbiased image derivatives do not imply unbiased gradients for arbitrary nonlinear image losses. The decorrelated-loss guarantee is specific to L2.
- **Different depth approximations:** Sorting-free rendering alone does not remove popping. Plane-oriented splats approximate maximum-density surfaces, while full volumetric intermixing has separate costs and only an illustrative overlapping-Gaussian demonstration here.
- **Evaluation scope:** Experiments fine-tune existing scenes and test NVIDIA GPUs. OpenGL supports portability in design, but the paper does not benchmark other GPU vendors or establish training-from-scratch performance.
- **Temporal and rasterization constraints:** Reprojection depends on meaningful surface correspondence. The stochastic CUDA implementation also lacks the usual accumulated-transmittance early termination; tighter Gaussian bounds reduce work but do not restore that mechanism.
- **Source metadata:** The supplied Markdown has no explicit publication year or stable identifier for this paper; these are left unknown rather than inferred from its references.

## Related Concepts

- [[concepts/3d-gaussian-splatting|3D Gaussian Splatting]]
- [[concepts/stochastic-transparency|Stochastic Transparency]]
- [[concepts/weighted-sum-rendering|Weighted Sum Rendering]]: a deterministic order-independent alternative, discussed as prior work in Section 2.

## Related Papers

- Enderton et al. (2010), "Stochastic Transparency": the underlying randomized coverage method.
- Kerbl et al. (2023), "3D Gaussian Splatting for Real-Time Radiance Field Rendering": representation and CUDA baseline.
- Radl et al. (2024), "StopThePop: Sorted Gaussian Splatting for View-Consistent Real-Time Rendering": improved depth handling, a baseline, and initialization for Table 1.
- [[papers/sort-free-gaussian-splatting-via-weighted-sum-rendering|Sort-Free Gaussian Splatting via Weighted Sum Rendering]]: cited prior work using deterministic approximate blending rather than stochastic visibility.
- [[papers/gaussian-point-splatting|Gaussian Point Splatting]]: a related library paper using sampled opaque points and collision-aware opacity correction; it is not evaluated in the supplied StochasticSplats manuscript.

[[index|Library home]]
