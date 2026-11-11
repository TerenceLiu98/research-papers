---
title: "Bridging RGB and RAW: Single-step Deterministic Flow with Homogeneous Representation Alignment"
type: paper
authors:
  - Diedong Feng
  - Peiyi Zeng
  - Zhen Liu
  - Zhongyang Li
  - Bing Zeng
  - Shuaicheng Liu
year: null
tags:
  - rgb-to-raw
  - flow-matching
  - representation-alignment
---

## TL;DR

SHADE combines single-step deterministic latent transport with DINOv3 representation alignment for RGB-to-RAW reconstruction. It reports the best PSNR among compared methods on five camera-specific benchmarks, with mixed SSIM leadership and 1.51-second inference at 4096 × 4096 on an RTX 4090.

[[index|Library home]]

## Research Question

Can observation-initialized latent transport and pretrained representation alignment provide accurate RAW reconstruction in one inference step?

## Motivation

ISP nonlinearities, quantization, and clipping make [[concepts/rgb-to-raw-reconstruction|RGB-to-RAW Reconstruction]] ambiguous. Regression can smooth details, while iterative generative methods introduce latency.

## Contributions

- A circle-to-star experiment motivates deterministic transport under noisy observations.
- Homogeneous Representation Alignment (HRA) couples matched student–teacher initialization with intermediate feature supervision.
- Reconstruction benchmarks, ablations, runtime comparisons, and downstream detection evaluate the combined SHADE system.

## Method

A shared trainable encoder produces paired RGB and RAW latents. Reversible dimensional alignment places packed Bayer samples at fixed anchors in a three-channel tensor, allowing exact recovery of those samples. Training linearly interpolates the latents and uses an RGB-conditioned transformer to predict their displacement through [[concepts/flow-matching|Flow Matching]]. Inference adds the predicted velocity at time zero to the RGB latent in one Euler step, then decodes with RGB conditioning.

The student encoder starts from the frozen DINOv3 teacher's weights. HRA aligns projected seventh-layer transformer features to clean RAW teacher features with patch-wise cosine similarity. Flow, alignment, and reconstruction objectives have equal weights. Reconstruction supervises both autoencoded and predicted RAW latents with MSE plus 0.1 times log-L1. Training uses Adam, initial learning rate 0.0005, batch size eight, and 400 epochs.

## Experiments

RawPy produces spatially registered RGB–RAW pairs; each camera dataset uses a random 85%/15% train/test partition. Table 1 reports:

| Dataset | PSNR (dB) | SSIM |
| --- | ---: | ---: |
| PASCALRAW | 39.07 | 0.9849 |
| FiveK-Nikon | 30.89 | 0.8858 |
| FiveK-Canon | 33.69 | 0.9495 |
| NOD-Nikon | 40.61 | 0.9856 |
| NOD-Sony | 39.07 | 0.9687 |

SHADE leads PSNR on all five datasets but SSIM on only two. With HRA enabled, the formulation ablation reports PASCALRAW PSNR of 39.07 for SSDF versus 37.69 for regression. Removing pretrained initialization or alignment lowers PSNR to 38.29 or 38.60, respectively, although removing initialization improves SSIM.

At 4096 × 4096, inference takes 1.5117 seconds versus 9.3551 for 20-step RAW-Flow and 2.0502 for ReRAW. ReRAW is faster at the two lowest tested resolutions. SHADE has 57.09M parameters and 212.76T reported FLOPs at the largest resolution; RAW-Flow has fewer FLOPs, so latency gains do not imply uniformly reduced computation.

Synthetic RAW pretraining followed by real RAW finetuning improves YOLOv8 mAP from 41.78 to 50.54 in daylight and from 33.76 to 38.13 at night relative to RGB pretraining (Appendix E).

## Limitations

Deterministic transport cannot sample diverse sensor-noise realizations for the same RGB input. Camera-specific paired evaluation leaves cross-sensor and cross-ISP transfer unresolved. Toy geometry and velocity-direction consistency are empirical support, not a general robustness or invertibility proof. Reconstructed RAW is not an original sensor measurement.

The source reports PASCALRAW SSIM as 0.9849 or 0.9850 across tables; the summary follows Table 1. Its publication year, venue, and stable identifier are not explicitly supplied and remain unspecified.

## Related Concepts

- [[concepts/rgb-to-raw-reconstruction|RGB-to-RAW Reconstruction]]
- [[concepts/flow-matching|Flow Matching]]

## Related Papers

The manuscript identifies RAW-Flow (Liu et al., 2026) as its deterministic latent transport predecessor and REPA (Yu et al., 2025) as background for representation alignment. HRA adapts alignment to single-step reconstruction through matched student–teacher initialization.
