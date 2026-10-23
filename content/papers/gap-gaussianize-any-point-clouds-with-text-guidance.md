---
title: "GAP: Gaussianize Any Point Clouds with Text Guidance"
type: paper
authors:
  - Weiqi Zhang
  - Junsheng Zhou
  - Haotian Geng
  - Wenyuan Zhang
  - Yu-Shen Liu
year: null
source_job_id: "8c7baa3a-547e-42d3-aeac-1ea7f8fd2111"
project_page: "https://weiqi-zhang.github.io/GAP"
tags:
  - point-clouds
  - 3d-gaussian-splatting
  - text-to-3d
  - diffusion-models
  - 3d-generation
---

## TL;DR

GAP converts uncolored point clouds into text-conditioned 2D Gaussian primitives. It progressively generates appearance with depth-aware multi-view diffusion, optimizes only the visible surface Gaussians while anchoring them to an unsigned distance field, and propagates attributes to regions unseen by the selected views. On an Objaverse subset, it reports FID 40.39, KID 5.28, and CLIP score 27.26, alongside qualitative results on synthetic objects, partial scans, and indoor scenes.

## Research Question

Can raw, colorless point clouds be converted directly into high-fidelity, text-controllable Gaussian representations without reconstructing and UV-unwrapping a mesh first?

## Motivation

Point clouds are easy to acquire but contain geometry rather than a renderable appearance. Mesh texturing pipelines require surface reconstruction and UV parameterization, which can introduce topology errors, distortion, fragmentation, and seams. Existing [[Point-to-Gaussian Generation|point-to-Gaussian]] methods either assume colored inputs or provide limited appearance diversity. GAP instead combines the geometry of a raw point cloud with the appearance prior of a text-to-image [[Diffusion Models|diffusion model]].

## Contributions

- Initializes oriented 2D Gaussian disks from point positions and normals inferred with a learned unsigned distance field.
- Progressively generates appearance across views with depth-aware diffusion and generate, keep, and update masks based on prior coverage and view-normal alignment.
- Selects the first Gaussian intersected by relevant camera rays and optimizes only that visible surface layer.
- Adds distance and scale losses that keep optimized Gaussians near the inferred surface and prevent oversized primitives.
- Completes hard-to-observe regions by propagating color, scale, and opacity from nearby optimized Gaussians using spatial, normal, opacity, and density cues.

## Method

Given a point cloud and text prompt, GAP places one Gaussian center at each input point. It learns an unsigned distance field with CAP-UDF, obtains normals from its gradients, and uses those normals to orient 2D Gaussian disks. This gives the representation an initial surface-aligned geometry before appearance optimization.

For each prescribed camera view, the method ray-marches the unsigned distance field to obtain depth, renders the current Gaussians, and sends the image, depth, mask, and text prompt to a depth-aware inpainting diffusion model. Pixels are partitioned into regions to generate for the first time, preserve, or update. A previously processed region is updated only when the current viewing direction is better aligned with its surface normal than earlier views. Newly generated regions receive stronger denoising than update regions.

GAP then identifies the first Gaussian intersected by each ray in the generate or update masks and optimizes that visible subset for a single pass at the current view. The objective combines an L1 and D-SSIM rendering loss with two geometry controls: a distance penalty pushes Gaussian centers toward the unsigned distance field's zero level set, and a scale penalty discourages primitives larger than a threshold. The paper reports a CUDA implementation that performs its Gaussian selection step in about three seconds.

Some initialized Gaussians remain unobserved after the view sequence. For each such primitive, GAP transfers color from nearby optimized Gaussians, weighting neighbors by inverse distance, normal agreement, and relative opacity and rejecting neighbors whose normal similarity is at most 0.5. It sets scale from mean neighbor distance and reduces opacity in locally dense regions. This final operation is attribute propagation in 3D Gaussian space rather than another image-diffusion pass.

## Experiments

The text-driven appearance evaluation uses 410 Objaverse objects from 225 categories, each represented by 100,000 sampled points and rendered at 1024 x 1024. Against TexTure, Text2Tex, SyncMVD, and Paint3D, including variants supplied with meshes reconstructed by BPA or CAP-UDF, GAP reports the best values in the table: FID 40.39, KID 5.28, CLIP score 27.26, mean user-study overall quality 4.21, and text fidelity 4.47. The user study included 30 participants rating multi-view results on a five-point scale.

Point-to-Gaussian comparisons on ShapeNet chairs and DeepFashion3D use 100,000-point inputs and provide qualitative comparisons against DreamGaussian, TriplaneGaussian, and DiffGS. Additional qualitative evaluations use partial depth-sensor scans from SRB and DeepFashion3D, 500,000-point synthetic scenes from 3D-FRONT, and real scans from the 3D Scene dataset.

The Objaverse ablation reports the following:

| Configuration | FID (lower) | KID (lower) | CLIP (higher) |
| --- | ---: | ---: | ---: |
| Full model | 40.39 | 5.28 | 27.26 |
| Without scale loss | 214.63 | 79.04 | 26.25 |
| Without distance loss | 161.04 | 23.29 | 24.30 |
| Without Gaussian inpainting | 46.37 | 8.77 | 27.21 |

These results support the geometry constraints particularly strongly on the reported benchmark. Removing Gaussian inpainting has a smaller effect on aggregate FID and CLIP, although the paper presents it as important for coverage of hard-to-observe surfaces.

## Limitations

- Quantitative appearance results are reported on one curated Objaverse subset. The point-to-Gaussian, partial-scan, and scene-level sections present qualitative comparisons rather than task-level quantitative geometry or appearance metrics.
- Mesh-based baselines incur surface reconstruction and automatic UV-unwrapping errors under the point-cloud-input setting. This tests the complete pipeline faced by those methods, but it does not isolate the Gaussian representation from reconstruction quality.
- The reported FID, KID, and CLIP metrics operate on rendered images and do not directly measure whether generated Gaussian centers preserve the input surface.
- The method depends on a learned unsigned distance field for normals, depth, and surface anchoring. The supplied experiments do not separately quantify sensitivity to errors in that field.
- Multi-view appearance is generated sequentially by a 2D diffusion model. Generate, keep, and update masks mitigate inconsistency, but the paper does not report a direct cross-view consistency metric.
- The source reports a three-second Gaussian-selection kernel but not end-to-end generation time, memory use, or repeated-run variability.
- The supplied paper text does not state a publication year, venue, DOI, or arXiv identifier.

## Related Concepts

- [[Point-to-Gaussian Generation]]
- [[3D Gaussian Splatting]]
- [[Diffusion Models]]
- Unsigned distance fields
- Depth-aware image inpainting
- Text-guided 3D generation

## Related Papers

- Huang et al. (2024), "2D Gaussian Splatting for Geometrically Accurate Radiance Fields": the surface-oriented Gaussian representation used by GAP.
- Zhou et al. (2024), "CAP-UDF: Learning Unsigned Distance Functions Progressively From Raw Point Clouds With Consistency-Aware Field Optimization": supplies the unsigned distance field used for normals, depth, and surface anchoring.
- Lu et al. (2024), "Large Point-to-Gaussian Model for Image-to-3D Generation": a point-to-Gaussian method that requires color attributes on input points.
- Zhou, Zhang, and Liu (2024), "DiffGS: Functional Gaussian Splatting Diffusion": a learned point-conditioned Gaussian-generation baseline.
- Zhou et al. (2025), "GaussianPainter: Painting Point Cloud into 3D Gaussians with Normal Guidance": uses reference images rather than text for appearance control.
- Kerbl et al. (2023), "3D Gaussian Splatting for Real-Time Radiance Field Rendering": the underlying explicit Gaussian rendering framework.

[[index|Library home]]
