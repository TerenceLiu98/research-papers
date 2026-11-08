---
title: Diffusion Transformers with Representation Autoencoders
type: paper
authors:
  - Boyang Zheng
  - Nanye Ma
  - Shengbang Tong
  - Saining Xie
year: 2025
arxiv: "2510.11690"
source_job_id: "285daf12-2a8d-44eb-a859-504b80010cd4"
url: https://rae-dit.github.io/
tags:
  - representation-autoencoders
  - diffusion-transformers
  - flow-matching
  - image-generation
  - dinov2
---

## TL;DR

This paper introduces [[concepts/representation-autoencoders|Representation Autoencoders]] (RAEs), which pair a frozen pretrained vision encoder such as DINOv2, SigLIP2, or MAE with a trained image decoder and use the resulting high-dimensional features as diffusion latents. Three adaptations make these latents practical for [[concepts/flow-matching|Flow Matching]]: matching model width to token dimensionality, shifting the noise schedule by effective data dimension, and training the decoder on noisy latent neighborhoods. A wide, shallow denoising head further improves scaling. On class-conditional ImageNet, the reported DiT-DH-XL model reaches FID 1.51 at 256x256 without guidance and 1.13 at both 256x256 and 512x512 with guidance.

## Research Question

Can frozen semantic representation encoders replace reconstruction-trained VAEs as the latent space for diffusion transformers, and what architectural, scheduling, and decoding changes are required to model their high-dimensional tokens effectively?

## Motivation

Conventional latent diffusion relies on heavily compressed VAE features learned primarily for reconstruction. The authors argue that these latents have limited information capacity, weak semantic structure, and an aging convolutional architecture. Pretrained vision encoders offer stronger semantic representations, but two assumptions discourage their use: that semantic features discard pixel detail and that their high channel dimension makes diffusion difficult. RAE tests both assumptions directly while avoiding auxiliary representation-alignment losses.

## Contributions

- Defines RAEs as frozen pretrained representation encoders paired with trained ViT decoders, without channel compression or encoder fine-tuning.
- Shows that DINOv2-B, SigLIP2-B, and MAE-B features can reconstruct ImageNet more faithfully than SD-VAE under the reported rFID evaluation while retaining much stronger linear-probe accuracy.
- Derives a lower bound showing that a DiT whose input-output bottleneck is narrower than the latent token dimension cannot represent the full-rank flow-matching target under the stated function class.
- Introduces a dimension-dependent noise-schedule shift based on token count times channel dimension and noise-augmented decoder training for off-manifold generated latents.
- Adds a two-layer, wide DDT denoising head to a standard DiT backbone, producing the DiT-DH architecture without widening every transformer block.
- Evaluates reconstruction, convergence, architecture scale, encoder choice, decoder robustness, conditional and unconditional generation, guidance, and 512x512 synthesis on ImageNet.

## Method

### Representation autoencoder

A frozen ViT representation encoder maps an image to spatial patch tokens. Class and register tokens are removed, and each patch token is normalized across channels. A ViT decoder is trained with L1, LPIPS, and adversarial losses to reconstruct pixels. The main configuration uses DINOv2-B features with 256 spatial tokens; SigLIP2-B and MAE-B test other pretraining objectives. Unlike a VAE, the encoder is not trained for reconstruction and the latent channels are not compressed.

### High-dimensional flow matching

The generator uses a linear flow-matching path between an RAE latent and Gaussian noise. The paper argues that Gaussian corruption gives the velocity target full-dimensional support: when the DiT hidden width $d$ is below token dimension $n$, the model's linear input-output bottleneck restricts predictions to a subspace. Single-image experiments and encoder/model-size sweeps support the reported requirement that width meet or exceed token dimensionality.

The timestep schedule is shifted according to effective data dimension rather than spatial resolution alone. With base dimension 4,096 and target dimension $m$, the scale is $\alpha=\sqrt{m/4096}$ and the shifted time is $t_m=\alpha t/(1+(\alpha-1)t)$. This moves training toward noise levels appropriate for tokens with hundreds of channels.

### Robust decoding and wide denoising head

Because a deterministic encoder gives the decoder a discrete empirical support while the diffusion model emits nearby continuous latents, decoder training adds Gaussian noise with a randomly sampled scale. This sacrifices some exact reconstruction fidelity but improves generation FID.

DiT-DH attaches a shallow, wide transformer head to the ordinary DiT backbone. The backbone produces conditioning features, while the head receives the noisy latent and predicts velocity. The default head has two layers and width 2,048, satisfying the latent-width requirement without paying the quadratic cost of widening the full backbone.

## Experiments

**Reconstruction and representation.** On reconstructed ImageNet validation images, DINOv2-B, SigLIP2-B, and MAE-B RAEs report rFID 0.49, 0.53, and 0.16, respectively, versus 0.62 for SD-VAE. Their encoder linear-probe accuracies are 84.5%, 79.1%, and 68.0%, versus about 8% for SD-VAE. A ViT-B decoder reports rFID 0.58 at 22.2 GFLOPs, while SD-VAE reports 0.62 at 310.4 GFLOPs.

**Core adaptations.** A standard DiT-XL on DINOv2-B RAE latents reports gFID 23.08 after 80 epochs. The dimension-dependent schedule changes this to 4.81, and noisy decoder training further changes it to 4.28 while worsening rFID from 0.49 to 0.57. The improved DiT-XL reaches gFID 2.39 after 720 epochs. These ablations change one component at a time within the paper's setup.

**Wide head and scaling.** At 80 epochs with DINOv2-B, DiT-DH-XL reports FID 2.16 versus 4.28 for DiT-XL. Across DINOv2-S, B, and L, the corresponding comparisons are 2.42 versus 3.50, 2.16 versus 4.28, and 2.73 versus 6.09. The head ablation favors two layers at width 2,048 over a deeper or narrower head at similar or greater compute.

**ImageNet generation.** After 800 epochs, class-balanced evaluation of 50,000 ImageNet-256 samples reports FID 1.51 without guidance and 1.13 with AutoGuidance. The guided 512x512 model reports FID 1.13 after 400 epochs. Reusing a 256-token generator with an upsampling decoder gives 512x512 FID 1.61 versus 1.13 for direct 1,024-token training. In unconditional ImageNet-256 generation, DiT-DH-XL with DINOv2-B and AutoGuidance reports FID 4.96, compared with 30.68 for the listed DiT-XL plus VAE baseline.

**Boundary tests.** The wide head is not universally beneficial: on SD-VAE latents it worsens 80-epoch FID from 7.13 to 11.70. On raw pixels with the same token dimension as DINOv2-B, it improves FID from 51.09 to 30.56, still far behind 2.16 on RAE features. The paper interprets this as evidence that both high dimension and pretrained representational structure matter.

## Limitations

- Most evidence is class-conditional ImageNet generation; the paper does not evaluate text-to-image generation, video, or broad domain transfer.
- The strongest results combine several choices: DINOv2 features, dimension-aware scheduling, noisy decoder training, a specialized wide head, and AutoGuidance. The ablations isolate major components but do not exhaust their interactions.
- Better reconstruction does not imply better generation. MAE-B has the best reported rFID but substantially worse gFID than DINOv2-B, leaving encoder selection empirical.
- Noise-augmented decoding improves generation while degrading exact reconstruction, and stronger noise continues that tradeoff in the reported sweep.
- The theoretical width result applies to the stated bottlenecked function family and squared flow-matching objective; it does not prove that every diffusion parameterization requires a full-width backbone.
- FID changes by roughly 0.1 between random and exactly class-balanced label sampling in the paper's evaluation. Comparisons require attention to that protocol difference.
- The 512x512 decoder-upsampling shortcut is cheaper but trails direct high-resolution training in both gFID and rFID.

## Related Concepts

- [[concepts/representation-autoencoders|Representation Autoencoders]]: the frozen semantic encoder and trained decoder that define the latent space.
- [[concepts/flow-matching|Flow Matching]]: the velocity-learning objective used for RAE latent generation.
- [[concepts/diffusion-models|Diffusion Models]]: the broader generative family containing DiT and latent diffusion.
- [[concepts/linear-probing|Linear Probing]]: the evaluation used to contrast semantic representation quality with SD-VAE features.

## Related Papers

- Peebles and Xie (2023), "Scalable Diffusion Models with Transformers": provides the DiT architecture adapted to RAE latents.
- Rombach et al. (2022), "High-Resolution Image Synthesis with Latent Diffusion Models": supplies the compressed VAE latent baseline that RAE replaces.
- Yu et al. (2025), "Representation Alignment for Generation: Training Diffusion Transformers Is Easier Than You Think": aligns generator states to pretrained representations rather than using those representations directly as latents.
- Wang et al. (2025), "DDT: Decoupled Diffusion Transformer": motivates the decoupled encoder-decoder design behind the wide denoising head.
- [[papers/rit-vanilla-diffusion-transformers-suffice-in-representation-space|RiT: Vanilla Diffusion Transformers Suffice in Representation Space]]: later models standardized RAE features with clean-target prediction using a vanilla DiT.
- [[papers/improved-baselines-with-representation-autoencoders|Improved Baselines with Representation Autoencoders]]: later extends RAE with multi-layer features, representation alignment, and internal guidance.

Source: supplied parsed manuscript, Cognitio job `285daf12-2a8d-44eb-a859-504b80010cd4`.

[[index|Library home]]
