---
title: Gaussian Point Splating
type: paper
authors:
  - Joris Rijsdijk
  - Christoph Peters
  - Michael Weinmann
  - Ricardo Marroquim
year: 2026
doi: "10.1145/3811272"
journal: ACM Transactions on Graphics
tags:
  - 3d-gaussian-splatting
  - stochastic-rendering
  - gpu-rendering
  - visibility-culling
  - novel-view-synthesis
---

## TL;DR

Gaussian Point Splating replaces sorted alpha compositing in [[3D Gaussian Splatting]] with independently sampled, opaque, pixel-sized points written through 64-bit atomic depth tests. A Poisson point-process formulation corrects the opacity lost when multiple samples from one Gaussian hit the same pixel. Combined with scan-based GPU work distribution and hierarchical frustum and occlusion culling, the renderer handles scenes containing hundreds of millions of Gaussians interactively, at the cost of stochastic noise and different aliasing behavior.

## Research Question

Can a stochastic point renderer reproduce the effective opacity of 3D Gaussian splats while distributing work evenly enough to render scenes near the GPU memory limit in real time, without pruning, level-of-detail substitution, or approximate transparency?

## Motivation

Conventional 3DGS software rasterizers assign every visible Gaussian to at least one screen-space tile, sort tile assignments, and alpha-composite the resulting fragments. At large scene scales, sorting, overdraw, uneven tile workloads, and late visibility decisions reduce throughput before VRAM capacity becomes the limiting factor. Hierarchical level-of-detail methods reduce the active primitive count, but require preprocessing and may alter the original asset. The paper instead seeks an output-sensitive renderer whose work falls with each Gaussian's screen-space footprint and can exploit early occlusion information.

## Contributions

- Recasts Gaussian splatting as [[Stochastic Transparency]] using opaque point samples and 64-bit atomic depth-and-color updates.
- Derives an opacity correction from a Poisson point process so that sample collisions do not reduce a Gaussian's intended per-pixel coverage probability.
- Derives the corrected point-count rate and radial sampling distribution, using the dilogarithm and inverse-CDF sampling.
- Distributes point work through an exclusive prefix sum, scatter, and inclusive maximum scan, producing sorted Gaussian indices while balancing work across GPU threads.
- Adds two-phase hierarchical occlusion culling that uses the stochastic renderer's depth buffer without permanently dropping newly visible Gaussians.
- Demonstrates interactive rendering on scenes from 2.5 million to 425 million Gaussians, including cases where comparison renderers fail or become non-interactive.

## Method

### Atomic point splating

Each sampled point is projected to a pixel and packed into a 64-bit unsigned integer containing 28 depth bits and three 12-bit sRGB channels. An atomic minimum keeps the nearest point, updating depth and color together. The renderer normally uses a 2 x 2 supersampled framebuffer, resolves subpixels with a box filter, and reduces noise through temporal accumulation for static cameras or basic temporal reprojection for moving cameras.

### Opacity-corrected sampling

For a screen-space Gaussian with mean $\mu$, covariance $\Sigma$, and peak opacity $\alpha$, the target opacity at location $q$ is

$$
\alpha(q)=\alpha\exp\left(-\frac{1}{2}(q-\mu)^\top\Sigma^{-1}(q-\mu)\right).
$$

Independent samples can collide in a subpixel, where repeated opaque writes have no additional effect. The method draws the number of points from a Poisson distribution. Requiring the probability of zero points in a subpixel of area $A$ to equal $1-\alpha(q)$ gives the corrected sampling density

$$
p(q)=-\frac{1}{\lambda A}\ln(1-\alpha(q)).
$$

After transforming the Gaussian to radial coordinates, normalization yields the expected point count

$$
\lambda=\frac{2\pi}{A}\sqrt{|\Sigma|}\operatorname{Li}_2(\alpha).
$$

Compared with uncorrected Gaussian sampling, this increases the expected point count by at most about 64.5% and concentrates samples near high-opacity centers. A fitted inverse dilogarithm supports inverse-CDF radius sampling. The implementation optionally rounds the sampled point count to a multiple of $K$, typically four at 2 x 2 supersampling, so one thread can emit several points after loading a Gaussian once.

### Work distribution and culling

An exclusive prefix sum over per-Gaussian point counts identifies each Gaussian's first thread index. A scatter writes those Gaussian indices into a thread-to-Gaussian array, and an inclusive maximum scan fills the gaps. Each thread then handles a small fixed amount of work, while the monotonic index sequence supports cache coherence.

Visibility is evaluated first for roughly one million spatial groups and then for individual Gaussians in surviving groups. The renderer constructs a hierarchical depth buffer by repeated 2 x 2 max-depth reduction and tests screen-space bounding boxes at an appropriate hierarchy level. Its two-phase scheme first renders primitives visible according to the previous frame, then renders any additional primitives visible against the new depth buffer, preventing culling errors from becoming missing geometry.

### Representation

The CUDA implementation quantizes Gaussian parameters to reduce bandwidth and increase scene capacity. A Gaussian occupies 21 bytes without spherical harmonics or 81 bytes with them; work-distribution counts require another four bytes per Gaussian and culling masks require two bits. The paper estimates that 10 GiB available for Gaussian data can hold 425 million Gaussians without spherical harmonics or 125 million with them.

## Experiments

The main evaluation uses an NVIDIA RTX 4070 with 12 GiB VRAM at 1920 x 1080. Five 3DGS scenes range from the 2.5-million-Gaussian truck scene to the 106-million-Gaussian Jastrzebia Gora scene. Comparisons include the original 3DGS renderer, StochasticSplats, and Splatshop. Camera paths move from detailed close views toward broad views containing more Gaussians; reported timings are medians over ten runs.

At the default 2 x 2 supersampling, $K=4$, and with culling, the method reports that frame rate never falls below 24 Hz across the five paths. It is the only evaluated method that renders the full 106-million-Gaussian Jastrzebia Gora scene on the RTX 4070. Splatshop obtains similar timing only by rendering 8.2 million of those 106 million Gaussians, which the paper shows causes strong visual differences. On an RTX 4070 Ti SUPER, four copies of that scene, totaling 425 million Gaussians, render in 24.3 to 65.6 ms for the three reported views.

Quality converges toward the 3DGS reference as sample count increases. Averaged over scenes from Mip-NeRF 360, Deep Blending, and Tanks & Temples, the paper reports PSNR rising from 16.94 at one sample per pixel to 25.73 at 1024 samples per pixel, compared with 25.71 for 3DGS. At 256 samples per pixel, the reported SSIM is 0.750 versus 0.759 for 3DGS, while LPIPS is 0.166 versus 0.178. In the $K$ ablation at 2 x 2 supersampling, using $K=4$ reduces frame time from 13.3 ms to 9.7 ms relative to $K=1$, with a small reported bias.

## Limitations

The renderer introduces stochastic noise; 2 x 2 supersampling roughly doubles frame time, and temporal reprojection can cause ghosting and loss of detail. Its continuous point sampling behaves more like box prefiltering than the pixel-center sampling used by 3DGS, so converged images retain small differences in high-frequency and pixel-scale regions. Rounding point counts to multiples of $K$ also departs from the Poisson-process derivation and introduces some bias.

Performance is not uniformly better: 3DGS can be faster for small scenes, and close views of large Gaussians can produce excessive point counts. The implementation limits the worst case by clamping each Gaussian to at most one thread per pixel and selecting a reasonably distant near plane. The method is only a renderer; the paper does not provide differentiable rendering or scene optimization, and it relies on existing 3DGS implementations to construct scenes. The evaluation is concentrated on NVIDIA hardware and a small collection of static scenes, so performance on other architectures and content is not established.

## Related Concepts

- [[3D Gaussian Splatting]]
- [[Stochastic Transparency]]
- Poisson point processes
- Hierarchical depth buffers
- GPU prefix scans
- Temporal accumulation

## Related Papers

- Kerbl, Kopanas, Leimkuehler, and Drettakis (2023), "3D Gaussian Splatting for Real-Time Radiance Field Rendering."
- Schuetz, Kerbl, and Wimmer (2021), "Rendering Point Clouds with Compute Shaders and Vertex Order Optimization."
- Kheradmand et al. (2025), "StochasticSplats: Stochastic Rasterization for Sorting-Free 3D Gaussian Splating."
- Schuetz et al. (2025), "Splatshop: Efficiently Editing Large Gaussian Splat Models."
- Enderton, Sintorn, Shirley, and Luebke (2010), "Stochastic Transparency."
- Kerbl et al. (2024), "A Hierarchical 3D Gaussian Representation for Real-Time Rendering of Very Large Datasets."

[[index|Library home]]
