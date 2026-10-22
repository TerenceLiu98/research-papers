---
title: "EGU-GS: Efficient Gaussian Utilization for Real-Time 3D Gaussian Splatting"
type: paper
authors:
  - Zhiyu Zheng
  - Dake Zhou
  - Yiming Shao
  - Xin Yang
year: null
source_job_id: "86c39dbf-6e07-46f5-a460-79b793ea518b"
repository: "https://github.com/zhiyu-cv/EGU"
tags:
  - 3d-gaussian-splatting
  - novel-view-synthesis
  - adaptive-density-control
  - gaussian-pruning
  - model-efficiency
---

## TL;DR

EGU-GS modifies densification and pruning in [[3D Gaussian Splatting]] to use fewer redundant primitives while improving the reported reconstruction metrics. It places split Gaussians on opposite sides of a sampled cross-section, applies cloning only intermittently, prioritizes mature multi-view Gaussians with adaptive thresholds, and prunes low-opacity or small, low-gradient primitives. Across Mip-NeRF 360, Deep Blending, and Tanks & Temples, the paper reports better aggregate PSNR, SSIM, LPIPS, FPS, and model size than its retrained 3DGS baseline; on Mip-NeRF 360, it reports 27.80 dB PSNR, 305 FPS, and 406 MB versus 27.28 dB, 134 FPS, and 782 MB.

## Research Question

Can the split, clone, selection, and pruning rules in 3DGS be redesigned so that densification allocates Gaussian primitives to useful scene structure instead of producing overlapping, low-opacity redundancy?

## Motivation

Original 3DGS clones a selected primitive by copying its attributes and splits larger primitives through unconstrained probabilistic sampling. The authors argue that both operations can create highly overlapping Gaussians whose similar gradients make them difficult to separate. Repeated densification then propagates this redundancy, while optimization drives many overlapping primitives toward low opacity. The resulting representation consumes storage and rendering work and can introduce floating artifacts without contributing commensurate detail.

## Contributions

- Introduces cross-section-oriented splitting, which samples a cross-section along a Gaussian's long axis and places two new primitives on opposite sides while rescaling their covariance.
- Introduces heterogeneous cloning, which offsets a copied primitive through Gaussian sampling and runs cloning only once per 50 splitting operations.
- Adds iteration-dependent densification thresholds and importance weights based on view participation and scale evolution.
- Adds opacity-adaptive pruning during training and quantile-based Gaussian refinement pruning in 10,000 additional post-processing iterations.
- Evaluates the combined method and its components on 13 scenes from three established novel-view-synthesis datasets.

## Method

EGU-GS retains the 3DGS representation, differentiable tile rasterizer, and reconstruction objective, but replaces its [[Adaptive Density Control in 3D Gaussian Splatting|adaptive density control]] policy.

For splitting, the method samples along the original primitive's longest axis to define a cross-section. Two new Gaussian centers are generated on opposite sides using the primitive's rotation and scale,

$$
G_i^{\mathrm{new}}(x,y,z)=G_i(x,y,z)\pm R_{G_i}\,\mathcal N(0,S_{G_i}).
$$

Cross-sections far from the original center are discarded, and the child covariance is scaled according to its distance from the cross-section. Other attributes are inherited, while child opacity is reset to 0.1. The heterogeneous clone uses a sampled positional offset instead of an exact duplicate; to limit proliferation, cloning follows every 50 split operations.

During training, primitives below opacity 0.02 are pruned at iteration 300. During rapid densification, an opacity-quantile pruning pass occurs every 3,000 iterations so newly created primitives have time to optimize. The densification gradient threshold decreases in stages from twice the initial threshold to its initial value. Selection also weights the accumulated gradient by how many views contain a primitive and by its scale evolution, favoring multi-view primitives while avoiding immediate repeated densification of newly created ones.

After ordinary training, Gaussian refinement pruning uses opacity, position-gradient magnitude, and scale quantiles. Low-opacity primitives are removed, as are primitives that are both small and low-gradient. The reported configuration adds 10,000 refinement iterations and uses quantile coefficients 0.001 for opacity, 0.001 for gradient, and 0.025 for scale.

## Experiments

The evaluation covers all nine Mip-NeRF 360 scenes, the train and truck scenes from Tanks & Temples, and drjohnson and playroom from Deep Blending. Metrics are PSNR, SSIM, LPIPS, FPS, model size, training time, and Gaussian count. All experiments use one RTX 4090. The comparison baseline is a modified 3DGS implementation that already includes post-processing pruning; the proposed method also changes several optimization hyperparameters.

| Dataset | Method | PSNR | SSIM | LPIPS | FPS | Size |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Mip-NeRF 360 | 3DGS | 27.28 | 0.808 | 0.214 | 134 | 782 MB |
| Mip-NeRF 360 | EGU-GS | 27.80 | 0.832 | 0.181 | 305 | 406 MB |
| Deep Blending | 3DGS | 29.42 | 0.898 | 0.246 | 137 | 676 MB |
| Deep Blending | EGU-GS | 29.79 | 0.908 | 0.232 | 357 | 259 MB |
| Tanks & Temples | 3DGS | 23.35 | 0.837 | 0.185 | 106 | 433 MB |
| Tanks & Temples | EGU-GS | 24.13 | 0.862 | 0.152 | 391 | 213 MB |

Reported training times are also lower: 1,384 versus 1,581 seconds on Mip-NeRF 360, 828 versus 890 seconds on Tanks & Temples, and 1,092 versus 1,444 seconds on Deep Blending. The Mip-NeRF 360 ablation reports 2,258,132 Gaussians and 27.80 dB for the full method. Reverting to original cloning and splitting raises the count to 2,898,234 and lowers PSNR to 27.47 dB; removing opacity-adaptive pruning raises the count to 3,278,213 and lowers PSNR to 27.67 dB. Removing refinement pruning leaves 2,413,123 Gaussians at 27.72 dB.

The paper separately applies refinement pruning to the 3DGS garden baseline. A 0.1 quantile setting reduces the model from 5,834,784 Gaussians and 1,379.99 MB to 1,064,377 Gaussians and 251.74 MB, while PSNR changes from 27.17 to 27.10 dB. More aggressive settings produce much larger quality losses.

## Limitations

- In the treehill scene, EGU-GS uses more Gaussians than 3DGS for only a marginal metric improvement. The authors observe degradation after 10,000 iterations and state that their pruning cannot remove overfitted primitives.
- The single-view training strategy can overfit primitives to particular views; the paper suggests multi-view training and depth regularization as possible remedies but does not evaluate them.
- Opacity pruning may remove useful primitives in scenes containing translucent objects.
- The evaluation uses 13 static scenes and one GPU model, and reports no repeated-run uncertainty despite probabilistic split and clone operations.
- EGU-GS changes optimization hyperparameters and adds 10,000 refinement iterations, so the component ablations are more informative than attributing every aggregate gain solely to the new densification geometry.
- Compression acts on the number of primitives rather than their attribute encoding. The paper reports only about 2x aggregate model compression and trails dedicated compression methods in storage size.

## Related Concepts

- [[3D Gaussian Splatting]]
- [[Adaptive Density Control in 3D Gaussian Splatting]]
- Novel view synthesis
- Differentiable rendering
- Gaussian pruning

## Related Papers

- Kerbl et al. (2023), "3D Gaussian Splatting for Real-Time Radiance Field Rendering": original representation and adaptive density-control baseline.
- Ye et al. (2024), "AbsGS: Recovering Fine Details in 3D Gaussian Splatting": replaces signed gradient averaging with accumulated gradient magnitudes.
- Zhang et al. (2024), "Pixel-GS: Density Control with Pixel-Aware Gradient for 3D Gaussian Splatting": weights densification gradients by pixel coverage.
- Fang and Wang (2024), "Mini-Splatting: Representing Scenes with a Constrained Number of Gaussians": uses blur splitting and depth reinitialization to improve primitive distribution.
- Deng et al. (2024), "Efficient Density Control for 3D Gaussian Splatting": related recovery-aware density control and pruning.
- [[Speeding Up the Learning of 3D Gaussians with Much Shorter Gaussian Lists]]: reduces overlap and training work at a prescribed Gaussian count, with a reported quality trade-off.

[[index|Library home]]
