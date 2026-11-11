---
title: Hyperspherical Autoencoder for High-Fidelity Image Reconstruction and Generation
type: paper
authors:
  - Hun Chang
  - Byunghee Cha
  - Jong Chul Ye
year: 2026
source_job_id: "3470f03a-7955-4a0c-9e0e-3ccb9bc71ada"
url: https://github.com/wkdgnsgo/HAE
tags:
  - representation-autoencoders
  - image-generation
  - riemannian-flow-matching
  - latent-geometry
  - vision-foundation-models
---

## TL;DR

The Hyperspherical Autoencoder (HAE) adapts frozen DINOv3 features for both detailed image reconstruction and efficient generation. A hierarchical convolutional patch stem retains local detail, cosine feature alignment preserves teacher directions without fixing feature magnitudes, and latent noise makes the decoder robust near the encoded manifold. A diffusion transformer then applies [[concepts/riemannian-flow-matching|Riemannian Flow Matching]] token-wise on a product of hyperspheres. On ImageNet-256, the paper reports 0.78 reconstruction FID, 25.2 dB PSNR, and 1.96 generation FID after 550 epochs.

## Research Question

Can a [[concepts/representation-autoencoders|Representation Autoencoder]] retain the semantic structure of a pretrained vision foundation model while recovering high-frequency pixel detail, and can generation improve by matching the resulting latent geometry rather than treating it as Euclidean?

## Motivation

Pretrained visual representations provide strong semantic latents, but their patch embedding and invariances can discard texture and other reconstruction detail. Feature distillation with mean squared error adds another constraint by matching both direction and magnitude, even though the paper's probes indicate that decoded semantics and structure are much more sensitive to direction. Euclidean flow matching then spends capacity on radial motion that the decoder largely ignores.

## Contributions

- Replaces DINOv3-Large's single patchifying convolution with a four-stage hierarchical convolutional stem while freezing the transformer backbone.
- Introduces directional feature alignment: cosine similarity transfers the teacher's angular structure while leaving student feature norms available for reconstruction.
- Trains the decoder with stochastic latent smoothing so imperfect generated latents can still decode, explicitly trading some reconstruction fidelity for much better generation.
- Models each spatial token on a fixed-radius sphere and trains LightningDiT-XL with spherical geodesics, tangent velocity regression, and a radial-velocity penalty.
- Provides ablations for patch embedding, latent smoothing, Euclidean versus Riemannian transport, radial regularization, and decoder input scale.

## Method

HAE progressively downsamples an RGB image through four convolutional stages to a $16\times16$ grid of 1,024-channel tokens. These tokens enter a frozen DINOv3-Large transformer, and a DC-AE-style decoder reconstructs the image. Stage 1 trains the stem and decoder with cosine alignment to teacher features, L1 reconstruction, and LPIPS losses. The paper reports ImageNet linear-probe accuracy of 87% Top-1 and 97% Top-5 for HAE, compared with 89% and 98% for DINOv3.

After the latent space is established, the encoder is frozen. Stage 2 adds adversarial decoder training and Gaussian perturbations whose scale increases from 0.8 to 1.2. The perturbations thicken the empirical latent surface into a neighborhood that is easier to decode from generated trajectories.

For generation, every patch token is normalized to radius $R=32$, yielding a product of 256 hyperspheres. Training uses spherical linear interpolation between projected data and Gaussian-noise directions. The network output is split into tangent and radial components; tangent velocity is matched to the geodesic target and radial velocity receives a penalty with reported best weight $0.1$. Sampling uses tangent projection and exponential-map Euler steps, then rescales each generated token to norm 14 before decoding. This is an instance of [[concepts/spherical-latent-flow-matching|Spherical Latent Flow Matching]] specialized to a directionally aligned representation autoencoder.

## Experiments

All reported results use class-conditional ImageNet at $256\times256$. HAE reconstruction with latent smoothing reaches rFID 0.78 and PSNR 25.2 dB. Without smoothing, reconstruction improves to rFID 0.37 and 26.2 dB, but generation deteriorates to gFID 32.64; smoothing changes gFID to 2.65 at the 80-epoch generator checkpoint.

At 80 generator epochs, HAE with the 677M-parameter LightningDiT-XL reports gFID 2.65 without guidance, compared with 4.28 for the matched RAE LightningDiT baseline. At 550 epochs it reports gFID 1.96 without guidance and 1.90 with guidance. The matched 80-epoch ablation reports gFID 15.95 for Euclidean flow matching versus 2.65 for Riemannian flow matching.

Replacing the standard ViT patch embedding with the hierarchical CNN changes PSNR from 19.55 to 26.20 dB and rFID from 0.47 to 0.37 in the no-smoothing comparison. For 20-epoch flow training, radial-penalty weights 0, 1, and 0.1 yield gFID 4.40, 5.70, and 3.90. Decoder-scale sweeps report the best gFID, 2.65, at norm 14; both smaller and larger scales degrade output quality.

## Limitations

- The evaluation is limited to class-conditional ImageNet at one resolution and does not test text conditioning, higher resolutions, or other domains.
- Riemannian flow training requires FP32 in the reported implementation because BF16 caused numerical instability, reducing memory and throughput benefits.
- The 550-epoch run does not test longer convergence and remains behind the strongest reported specialized RAE DiT-DH result despite using a lighter standard transformer.
- Latent smoothing is essential for generation but measurably worsens exact reconstruction, so the reconstruction-generation trade-off is reduced rather than eliminated.
- The manuscript's patch-embedding discussion contains a prose typo claiming PSNR rises "to 19.55 dB"; its table reports the hierarchical CNN result as 26.20 dB, which is the value summarized here.

## Related Concepts

- [[concepts/representation-autoencoders|Representation Autoencoders]]: the pretrained semantic encoder and learned image decoder framework extended by HAE.
- [[concepts/spherical-latent-flow-matching|Spherical Latent Flow Matching]]: token-wise fixed-radius transport with spherical geodesics.
- [[concepts/riemannian-flow-matching|Riemannian Flow Matching]]: the general manifold-valued velocity-regression framework.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: HAE transfers teacher features through directional rather than full-vector matching.
- [[concepts/diffusion-models|Diffusion Models]]: the broader family containing the downstream diffusion transformer.

## Related Papers

- [[papers/diffusion-transformers-with-representation-autoencoders|Diffusion Transformers with Representation Autoencoders]]: the main representation-autoencoder baseline and source of decoder latent smoothing.
- [[papers/aligning-latent-geometry-for-spherical-flow-matching-in-image-generation|Aligning Latent Geometry for Spherical Flow Matching in Image Generation]]: similarly removes radial motion through fixed-radius token latents and spherical transport.
- [[papers/flow-matching-on-general-geometries|Flow Matching on General Geometries]]: develops the Riemannian flow-matching formulation used by HAE.
- [[papers/rit-vanilla-diffusion-transformers-suffice-in-representation-space|RiT: Vanilla Diffusion Transformers Suffice in Representation Space]]: an alternative that keeps Euclidean paths but changes representation-space prediction and standardization.
- Yao, Yang, and Wang (2025), "Reconstruction vs. Generation: Taming Optimization Dilemma in Latent Diffusion Models": studies the tokenizer trade-off that HAE addresses.

Source: supplied parsed manuscript, Cognitio job `3470f03a-7955-4a0c-9e0e-3ccb9bc71ada`.

[[index|Library home]]
