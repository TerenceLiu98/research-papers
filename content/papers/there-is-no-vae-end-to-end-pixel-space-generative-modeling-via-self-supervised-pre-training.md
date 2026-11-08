---
title: "There Is No VAE: End-to-End Pixel-Space Generative Modeling via Self-Supervised Pre-Training"
type: paper
authors:
  - Jiachen Lei
  - Keli Liu
  - Julius Berner
  - Haiming Yu
  - Hongkai Zheng
  - Jiahong Wu
  - Xiangxiang Chu
year: 2025
source_job_id: "c0aa63ec-a6f0-4481-abe9-541b14aec5ec"
tags:
  - pixel-space-generation
  - diffusion-models
  - consistency-models
  - self-supervised-learning
---

## TL;DR

End-to-end Pixel-space Generative modeling (EPG) pretrains a Vision Transformer encoder to preserve image semantics across noise levels on a shared probability-flow trajectory, then attaches a randomly initialized decoder and fine-tunes the full network for pixel-space diffusion or consistency training. On ImageNet, the reported diffusion models reach FID 1.58 at 256 by 256 pixels and 2.35 at 512 by 512 pixels with 75 function evaluations. The one-step consistency model reaches FID 8.82 at 256 by 256 pixels without a pretrained VAE or diffusion teacher.

## Research Question

Can high-resolution diffusion and consistency models be trained directly in pixel space with generation quality and computational efficiency comparable to latent-space systems, while avoiding a fixed pretrained VAE?

## Motivation

Latent generative models reduce the cost of processing high-resolution images, but their pretrained VAEs add a separate training stage and constrain generation through a fixed compression and reconstruction model. Existing pixel-space methods avoid this bottleneck but tend to require expensive backbones or converge slowly. EPG tests whether the encoder-decoder roles can instead be staged like self-supervised visual learning: first establish noise-robust semantic representations, then adapt those representations end to end for pixel prediction.

## Contributions

- Introduces a two-stage framework for high-resolution pixel-space generation: representation-consistency pretraining followed by end-to-end generative fine-tuning.
- Combines clean-image contrastive learning with temporal alignment of representations from adjacent noise levels on the same deterministic sampling trajectory.
- Applies the same pretrained encoder to both iterative [[concepts/diffusion-models|Diffusion Models]] and one-step consistency models without using an external VAE or diffusion teacher.
- Keeps the ViT token count fixed across 256- and 512-pixel training by increasing patch size from 16 by 16 to 32 by 32.
- Reports ImageNet generation quality that closes the evaluated gap between pixel-space models and leading latent-space baselines while using fewer function evaluations.

## Method

The pretraining stage learns an encoder with two NT-Xent objectives. A standard contrastive term uses two augmented views of a clean image to establish discriminative visual semantics. A [[concepts/representation-consistency-learning|Representation Consistency Learning]] term treats adjacent noisy states from the same probability-flow ODE trajectory as positives and states from different trajectories as negatives. The paired noisy states share the same sampled noise, and the time discretization is annealed from 20 to 1,280 intervals. A momentum encoder supplies the clean-view target, while a stopped-gradient encoder supplies the trajectory-alignment target.

The representation-consistency temperature begins with looser alignment at high noise levels and is annealed toward the low-noise temperature. The paper uses 0.1 and 0.2 as the endpoint temperatures and reports that a fixed value of 0.1 is also viable. After pretraining, the projection head is discarded. A randomly initialized ViT decoder is joined to the encoder through residual connections, and both components are updated end to end.

For diffusion fine-tuning, the network predicts clean pixels under an EDM-style denoising objective. For consistency fine-tuning, it combines the usual adjacent-trajectory consistency objective with an auxiliary contrastive loss: a frozen copy of the pretrained encoder compares the generated output with its corresponding clean image. This auxiliary term uses the model's own pretrained representation rather than external supervision.

## Experiments

**Setup.** Experiments use class-conditional ImageNet-1K at 256 by 256 and 512 by 512 pixels. Pretraining runs for 600,000 steps with batch size 1,024. Diffusion fine-tuning runs for up to two million steps; consistency fine-tuning runs for 700,000 steps. Diffusion results use 50,000 generated images and a 32-step Heun sampler, corresponding to 75 reported function evaluations with classifier-free guidance. Consistency results use 50,000 one-step samples.

**Guided diffusion.** EPG-G/16 reports FID 1.58, Inception Score 298.4, precision 0.80, and recall 0.63 on ImageNet-256. EPG-L/32 reports FID 2.35 on ImageNet-512 with 540M parameters and 113 GFLOPs. In the paper's system-level comparison, EPG-XXL/16 reaches FID 1.87 after 800 epochs, compared with SiT-XL/2 at FID 2.06 after 1,400 epochs; model sizes are 789M and 759M parameters when the latter includes its VAE.

**Unguided and low-compute comparisons.** At 800 epochs, EPG-XL/16 reports class-conditional FID 6.6 without guidance, compared with 9.6 for DiT-XL/2 and 8.3 for SiT-XL/2 after 1,400 epochs. The training-cost comparison reports FID 2.09 for EPG-XL/16 after 139 hours on eight H200 GPUs, versus 2.27 for DiT-XL/2 after an estimated 451 hours.

**One-step consistency generation.** EPG-L/16 reports FID 8.82 on ImageNet-256 with one function evaluation and 560 training epochs. The listed latent-space comparison reports one-step FID 34.24 for iCT-XL/2, 10.60 for Shortcut-XL/2, and 8.05 for IMM, although those systems differ in training cost and dependencies.

**Ablations.** On the smaller EPG-B/16 setting, removing the contrastive term worsens the reported diffusion FID from 52.67 to 115.48 and consistency FID from 46.99 to 117.63; removing representation consistency gives 58.18 and 56.41. For consistency fine-tuning, removing the auxiliary loss worsens FID from 36.75 to 129.16, while omitting pretrained RCM initialization gives 65.05. Freezing the pretrained encoder during diffusion fine-tuning gives FID 22.44, layer-wise learning-rate decay gives 18.56, and unrestricted end-to-end updating gives 12.46, supporting adaptation of semantic features toward pixel detail.

## Limitations

- The empirical study is limited to class-conditional ImageNet; the paper does not establish the same tradeoffs for text conditioning, diverse datasets, or non-image domains.
- The method removes the VAE but still requires a separate 600,000-step encoder-pretraining stage and substantial H200 GPU time.
- The strongest FID 1.58 result uses class-balanced sampling and classifier-free guidance, so it should not be read as an unconditional or single-pass result.
- Several efficiency comparisons combine reported measurements with estimates or compare systems with different model sizes, samplers, training schedules, and external-model requirements.
- The consistency-model auxiliary loss and temperature schedule are empirically motivated; the paper does not provide a general guarantee that they prevent instability or representation collapse.
- The paper notes that incorporating external semantic supervision may further improve EPG but does not evaluate that extension.

## Related Concepts

- [[concepts/representation-consistency-learning|Representation Consistency Learning]]
- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/representation-autoencoders|Representation Autoencoders]]
- [[concepts/contrastive-analysis|Contrastive Analysis]]
- [[concepts/flow-matching|Flow Matching]]

## Related Papers

- Lei et al. (2025), "Robust Representation Consistency Model via Contrastive Denoising": the direct representation-consistency precursor extended by EPG.
- Song et al. (2023), "Consistency Models": supplies the trajectory-consistency formulation used in pretraining and one-step generation.
- [[papers/one-layer-is-enough-adapting-pretrained-visual-encoders-for-image-generation|One Layer Is Enough: Adapting Pretrained Visual Encoders for Image Generation]]: adapts pretrained semantic features into a compact latent rather than generating directly in pixel space.
- [[papers/beyond-the-last-layer-multi-layer-representation-fusion-for-visual-tokenization|Beyond the Last Layer: Multi-Layer Representation Fusion for Visual Tokenization]]: enriches pretrained representation-autoencoder latents with information from multiple encoder depths.

[[index|Library home]]
