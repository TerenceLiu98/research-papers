---
title: "Latent Riemannian Flow Matching for Geometry-Grounded 3D Foundation Models"
type: paper
authors:
  - Lisa Weijler
  - Irene Ballester
  - Guofeng Mei
  - Tolga Birdal
  - Pedro Hermosilla
year: null
source_job_id: "292bef9c-e31e-45b5-bca5-1847c403d55f"
tags:
  - riemannian-flow-matching
  - geometric-foundation-models
  - 3d-scene-generation
  - novel-view-synthesis
  - latent-geometry
---

## TL;DR

This paper turns the deterministic Visual Geometry Grounded Transformer (VGGT) into a conditional 3D scene generator by applying [[concepts/riemannian-flow-matching|Riemannian Flow Matching]] directly to its multi-scale latent tokens. Because VGGT's post-LayerNorm token blocks lie on four zero-mean hyperspheres, the model uses geodesic interpolation, tangent velocity prediction, and manifold-preserving ODE updates rather than Euclidean paths. It improves depth and fused-point-cloud geometry over Gen3R and DepthSplat across the reported ScanNet++ settings and generalizes to ETH3D, while its RGB advantage is less consistent, especially for two-sided RealEstate10K views.

## Research Question

Can a frozen geometric foundation model support probabilistic sparse-view reconstruction and novel-view generation directly in its latent space, without converting its features to Gaussian splats, meshes, or video-VAE latents, if generation respects the latent space's manifold geometry?

## Motivation

Feed-forward 3D foundation models infer strong geometry from unposed images but return a single deterministic reconstruction and cannot represent plausible unseen content. Generative novel-view systems can fill unobserved regions, yet pixel- and video-space approaches must learn geometry implicitly or rely on expensive reconstruction stages. The paper argues that VGGT already contains the needed geometric prior, but ordinary Euclidean [[concepts/flow-matching|Flow Matching]] takes its normalized tokens through low-density sphere interiors and produces invalid inputs for the frozen decoding heads.

## Contributions

- Identifies VGGT's selected post-LayerNorm encoder features as a product of four zero-mean hyperspheres, one for each of layers 4, 11, 17, and 23.
- Defines a context- and pose-conditioned Riemannian flow over this product manifold, including a uniform manifold source, geodesic training paths, tangent projection, and exponential-map sampling.
- Builds an order-invariant generator that accepts one to four unposed context views and a relative target pose, generating one target view at a time.
- Reuses frozen VGGT geometry heads for depth and point maps and trains a separate DPT-style RGB head for appearance.
- Evaluates visible-region reconstruction, generated-region realism, and fused 3D scans on RealEstate10K, ScanNet++, and out-of-distribution ETH3D scenes.

## Method

VGGT supplies four $C=2048$-dimensional feature blocks per token. Layer normalization removes each block's mean and fixes its norm to $\sqrt{C}$, so the decoder input lies on

$$
\mathcal M=\left(S^{C-2}\right)^4,
$$

where every sphere is embedded in the zero-mean hyperplane. Training rescales each block to unit radius. A Gaussian vector projected onto each sphere provides the source $x_0$, and a target VGGT token $x_1$ is connected to it by the manifold exponential and logarithm maps. Conditional Riemannian flow matching regresses the velocity of this geodesic while conditioning the network on context tokens $c$ and target pose $\pi$.

The 50-million-parameter transformer projects the four sphere components into a 512-dimensional working representation. Self-attention uses RoPE and time-conditioned AdaLN; cross-attention reads the context tokens and injects target-pose information with Projective Positional Encoding. Four output heads return ambient vectors that are projected into the current token's tangent spaces. At inference, a 20-step Riemannian Euler solver advances states with exponential-map updates, keeping all tokens on the manifold. Frozen VGGT heads decode depth and point maps, while a separately trained and distribution-matched DPT head decodes RGB.

## Experiments

The flow model is trained for 320,000 steps on 59,103 RealEstate10K and ScanNet++ scenes, sampling one to four context views. Evaluation compares with Gen3R and DepthSplat under one-sided and two-sided camera layouts and high- and low-overlap regimes. ScanNet++ reports visible-region RGB and depth metrics plus FID on generated regions; RealEstate10K has RGB metrics only. Fused point maps are evaluated on ScanNet++ and ETH3D after common-grid processing, metric alignment, voxel downsampling, and matched 20,000-point sampling.

**Novel-view geometry.** On ScanNet++, the proposed method has the best reported depth result in every listed context and overlap configuration. For one-sided, one-context high overlap, it reduces RMSE from Gen3R's 0.341 to 0.197 and raises $\delta_1$ from 0.744 to 0.899. In the two-sided, four-context low-overlap setting, it reports RMSE 0.208 and $\delta_1=0.911$, compared with DepthSplat's 0.453 and 0.607.

**Appearance.** The method generally leads on ScanNet++ and is competitive with Gen3R in one-sided RealEstate10K evaluation. It does not dominate reconstruction-oriented baselines everywhere: on two-sided RealEstate10K, DepthSplat is substantially better on PSNR, SSIM, and LPIPS, while Gen3R also outperforms it at two contexts. The authors attribute the smaller RGB gains to VGGT features being optimized for geometry rather than appearance.

**3D scans and manifold ablation.** Fused-cloud Chamfer distance falls from 20.03 cm for Gen3R to 11.20 cm on ScanNet++ and from 177.7 cm to 46.37 cm on ETH3D. Replacing the manifold flow with a Euclidean flow in the two-sided, two-context ScanNet++ setting worsens RGB FID from 47.50 to 61.24, LPIPS from 0.163 to 0.235, and depth RMSE from 0.202 to 0.225. Sampling remains stable from 5 to 100 tested steps, with the paper selecting 20 to balance detail, geometry, and approximately 0.88-second generation on an RTX A6000.

## Limitations

- The generator produces one target view at a time. Fused scans suggest cross-view consistency, but the method does not jointly generate multiple target views or enforce global consistency across an entire synthesized trajectory.
- RGB quality is not uniformly competitive. In the two-sided RealEstate10K settings, DepthSplat and Gen3R obtain markedly stronger appearance metrics, and the learned RGB head must adapt geometry-oriented VGGT features to photometric reconstruction.
- The reported evaluation does not quantify sample diversity, uncertainty calibration, or whether repeated samples capture distinct plausible scene completions.
- Cross-method comparison requires method-specific camera inputs and a common cropped grid. The protocol documents these differences, but the systems do not receive identical pose or trajectory information.
- Training is compute-intensive: the flow model uses 16 H100 GPUs, and the RGB head is trained on 20 GPUs before an additional generated-token fine-tuning stage.
- ETH3D evidence covers 13 scenes and 26 target samples, so the reported out-of-distribution gain is strong but narrow.

## Related Concepts

- [[concepts/riemannian-flow-matching|Riemannian Flow Matching]]: supplies the manifold-valued probability paths, tangent vector fields, and exponential-map integration used by the generator.
- [[concepts/flow-matching|Flow Matching]]: the underlying conditional vector-field regression framework.
- [[concepts/spherical-latent-flow-matching|Spherical Latent Flow Matching]]: a closely related fixed-radius latent construction; this paper instead uses the explicit product geometry imposed by VGGT's normalization layers.
- [[concepts/riemannian-representation-learning|Riemannian Representation Learning]]: the broader view of latent manifold structure as an inductive bias.
- [[concepts/3d-gaussian-splatting|3D Gaussian Splatting]]: an explicit scene representation used by reconstruction baselines but avoided by the proposed latent generator.

## Related Papers

- [[papers/aligning-latent-geometry-for-spherical-flow-matching-in-image-generation|Aligning Latent Geometry for Spherical Flow Matching in Image Generation]]: independently aligns image-token transport with hyperspherical latent geometry, but projects pretrained VAE tokens and finetunes their decoder.
- [[papers/flow-matching-on-lie-groups|Flow Matching on Lie Groups]]: constructs non-Euclidean probability paths from Lie-group exponentials rather than the hyperspherical geodesics used here.
- Chen and Lipman (2024), "Flow Matching on General Geometries": the Riemannian conditional-flow framework specialized by this paper.
- Wang et al. (2025), "VGGT: Visual Geometry Grounded Transformer": supplies the frozen encoder and geometry decoders whose latent space is modeled.
- Huang et al. (2026), "Gen3R: 3D Scene Generation Meets Feed-Forward Reconstruction": the closest baseline, which maps VGGT tokens into a video generative model's latent space.

[[index|Library home]]
