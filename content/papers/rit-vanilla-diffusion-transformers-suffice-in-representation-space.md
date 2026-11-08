---
title: "RiT: Vanilla Diffusion Transformers Suffice in Representation Space"
type: paper
authors:
  - Le Zhang
  - Ning Mang
  - Aishwarya Agrawal
year: 2026
source_job_id: "a22e5cc6-4e12-407b-a696-5bc53204b456"
url: https://github.com/lezhang7/RiT
tags:
  - flow-matching
  - diffusion-transformers
  - representation-autoencoders
  - image-generation
  - dinov2
---

## TL;DR

RiT trains a standard diffusion transformer with clean-feature prediction on standardized, frozen DINOv2 features from a [[concepts/representation-autoencoders|Representation Autoencoder]]. The paper argues that DINOv2 and pixels have similar intrinsic dimensionality but very different ambient geometry, making the representation-space regression better conditioned. On class-conditional ImageNet-256, RiT-XL reports FID 1.45 without guidance and 1.14 with classifier-free guidance; with guidance, five and ten Heun steps reach FID 1.99 and 1.25 without distillation.

## Research Question

Does a pretrained representation space embed the image manifold in a form that makes [[concepts/flow-matching|Flow Matching]] easier, and can clean-target prediction exploit that geometry without specialized diffusion heads or Riemannian transport?

## Motivation

Flow matching follows straight paths between Gaussian noise and data. In raw DINOv2 features, token-wise normalization concentrates data near a shell, so intermediate Euclidean states leave the encoder's support and velocity targets acquire a large radial component. Prior approaches respond by widening the prediction head or replacing Euclidean paths with [[concepts/riemannian-flow-matching|Riemannian Flow Matching]]. RiT instead asks whether predicting the clean representation directly can keep the network's output target on the data manifold while retaining an ordinary DiT and Euclidean path.

## Contributions

- Compares pixels, SD-VAE latents, and DINOv2 features using intrinsic dimension, effective rank, covariance conditioning, marginal kurtosis, and interpolation reconstruction error.
- Introduces RiT, a vanilla DiT that predicts standardized clean DINOv2 patch features and jointly models the DINOv2 `[CLS]` token.
- Uses a dimension-aware time shift to place more training mass in high-noise states for high-dimensional representation tokens.
- Evaluates convergence, component ablations, solver truncation error, sampling schedules, and few-step generation on ImageNet-256.

## Method

### Representation geometry

The analysis uses 10,000 ImageNet training images. TwoNN estimates intrinsic dimensions of $33.6\pm1.3$ for pixels and $32.6\pm0.8$ for DINOv2, so the reported advantage is not lower manifold dimension. DINOv2 instead has effective rank 327 versus 45 for pixels, covariance condition number about 56 versus 2,000 at $t=0.9$, median absolute excess kurtosis 0.083 versus 0.958, and interpolation reconstruction MSE 0.0080 versus 0.0136. SD-VAE measurements lie between pixels and DINOv2 on the reported comparisons.

### Clean-feature prediction

The frozen DINOv2-with-Registers encoder and RAE decoder map between images and a $16\times16$ feature grid. Patch and `[CLS]` features are standardized element by element with training-set means and variances before flow training, then inverse-transformed before decoding. Given the linear path

$$
z_t=t z_0+(1-t)\epsilon,
$$

the network directly predicts $\hat z_0$. Its velocity is recovered as $(\hat z_0-z_t)/(1-t)$ and trained with velocity MSE. This is a $(1-t)^{-2}$-weighted clean-prediction loss, but its direct network output remains a data-manifold target rather than an ambient velocity target.

### Joint token modeling and schedule

RiT concatenates the noisy `[CLS]` token with noisy patch tokens, applies shared self-attention, and uses separate output heads. The auxiliary `[CLS]` velocity-form loss has weight $\lambda=0.2$; only patch outputs are decoded. Patch and `[CLS]` noise are independent during training, while inference initialization optionally couples `[CLS]` noise to the spatial mean of patch noise.

The main RiT-XL has 28 layers, width 1,152, 16 heads, and 676M parameters. For DINOv2-Small features with $d=384$, training shifts a logit-normal time sample by $s=\sqrt{hwd/4096}\approx4.9$, moving the median toward noisier states. Sampling uses a second-order Heun solver and may apply classifier-free guidance.

## Experiments

**Main results.** After 800 ImageNet-256 epochs, RiT-XL reports FID 1.45 without guidance and 1.14 with guidance. The comparison table reports 1.51/1.16 for the 839M-parameter DDT-equipped DINOv2-B baseline and 1.48/1.29 for FAE with a fine-tuned DINOv2-G encoder. These are paper-reported, cross-method comparisons rather than a single newly rerun benchmark.

**Matched convergence.** Against RAE-XL using the same DINOv2-S encoder, decoder, and 676M parameter count, RiT reports FID 1.45 versus 1.87 at 800 epochs. The paper states that RiT at 200 epochs matches RAE-XL at 800 epochs. At the matched 80-epoch budget, RiT reports FID 2.48 versus 3.62 for the concurrent Riemannian-flow baseline using DINOv2-B.

**Ablations.** At 800 epochs, replacing the shifted schedule with ordinary logit-normal sampling changes FID from 1.44 to 3.17; removing `[CLS]` modeling gives 1.63; using DINOv2-Base gives 1.56; and removing element-wise standardization leaves FID at 344.8. With the same architecture and schedule, clean prediction improves over velocity prediction from 1.86 to 1.70 at 400 epochs.

**Few-step sampling.** With coupled noise and the time-shift discretization, five Heun steps give FID 2.38 without guidance and 1.99 with guidance; ten give 1.58 and 1.25; 25 give 1.45 and 1.14. Nonuniform schedules strongly outperform uniform spacing at five steps, while their results converge by 50 or more steps. Against each model's own 125-step endpoint, RiT's decoded truncation error falls 12.9-fold from two to 50 steps, compared with 3.6-fold for JiT.

## Limitations

- The experiments cover class-conditional ImageNet at $256\times256$ only; text conditioning, higher resolutions, and other modalities are not evaluated.
- RiT inherits DINOv2's emphasis on semantic content and its reported weaknesses on fine texture, thin structures, and small objects.
- The covariance-conditioning argument uses a local Gaussian approximation. The other geometric measurements are aggregate diagnostics and do not establish that every manifold region is favorable.
- The experiments correlate the four geometric properties with easier training and integration but do not isolate each property as individually necessary.
- The frozen encoder simplifies training but prevents adaptation of representation biases to the generative task.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: the Euclidean transport and velocity-regression framework reparameterized by RiT.
- [[concepts/representation-autoencoders|Representation Autoencoders]]: the frozen DINOv2 encoder and image decoder that define RiT's latent space.
- [[concepts/riemannian-flow-matching|Riemannian Flow Matching]]: an alternative that modifies transport geometry rather than the prediction target.
- [[concepts/diffusion-models|Diffusion Models]]: the broader generative-model family containing diffusion transformers and latent image generators.

## Related Papers

- Li and He (2025), "Back to Basics: Let Denoising Generative Models Denoise": introduces the clean-target JiT parameterization in pixel space that RiT extends to pretrained representations.
- Zheng et al. (2025), "Diffusion Transformers with Representation Autoencoders," arXiv:2510.11690: supplies the frozen DINOv2 encoder-decoder setup and the matched RAE baselines.
- Kumar and Patel (2026), "Learning on the Manifold: Unlocking Standard Diffusion Transformers with Representation Encoders," arXiv:2602.10099: addresses representation-space radial interference with Riemannian flow matching.
- [[papers/one-layer-is-enough-adapting-pretrained-visual-encoders-for-image-generation|One Layer Is Enough: Adapting Pretrained Visual Encoders for Image Generation]]: compresses and adapts pretrained features before generation, whereas RiT models frozen high-dimensional DINOv2 features directly.
- [[papers/aligning-latent-geometry-for-spherical-flow-matching-in-image-generation|Aligning Latent Geometry for Spherical Flow Matching in Image Generation]]: a library comparison that removes radial motion through fixed-radius VAE tokens and spherical transport rather than clean-target prediction.

Source: supplied parsed manuscript, Cognitio job `a22e5cc6-4e12-407b-a696-5bc53204b456`.

[[index|Library home]]
