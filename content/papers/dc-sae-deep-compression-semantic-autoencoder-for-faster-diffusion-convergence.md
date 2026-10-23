---
title: "DC-SAE: Deep Compression Semantic Autoencoder for Faster Diffusion Convergence"
type: paper
authors:
  - Xu Huang
  - Ye Huang
  - Zijun Liao
  - Yuwei Niu
  - Xiaojie Li
  - Menghan Zhou
  - De Wen Soh
  - Xiaotong Li
  - Daquan Zhou
year: null
url: https://dagroup-pku.github.io/DCSAE
tags:
  - visual-tokenization
  - representation-autoencoders
  - latent-diffusion
  - image-generation
---

## TL;DR

DC-SAE combines a frozen semantic encoder with a trainable pixel encoder, then expands their compact fused latent only on the decoder side. This separates generation-friendly semantic structure from reconstruction-critical local detail while retaining a 32x spatially compressed latent for diffusion. On ImageNet at 512 x 512, the paper reports 29.79 PSNR, 0.16 rFID, and 3.37 gFID without classifier-free guidance; its autoencoder throughput is 4.41x that of DC-AE at 1024 x 1024. A 1.6B-parameter text-to-image DiT reaches 0.84 GenEval and 86.007 DPG-Bench, although the text-to-image evidence uses one generator configuration and partly internal data.

## Research Question

Can a visual tokenizer preserve high-fidelity image detail at 32x spatial compression while retaining the structured latent space and fast diffusion convergence associated with pretrained semantic encoders?

## Motivation

Deep-compression tokenizers shorten the latent sequence and reduce each generator forward pass, but reconstruction-oriented high-capacity latents can be difficult for diffusion models to learn. Conversely, [[concepts/representation-autoencoders|Representation Autoencoders]] expose semantically structured features that can accelerate generation training, yet pretrained semantic encoders discard texture, color statistics, local boundaries, and other information needed for faithful reconstruction. DC-SAE treats these requirements as complementary rather than forcing one encoder to satisfy both.

## Contributions

- Adapts a frozen 16x semantic encoder to a 32x token grid by resizing the input before semantic feature extraction, avoiding post-hoc merging of already abstracted tokens.
- Introduces a jointly trained semantic-pixel encoder: the frozen semantic branch supplies generation-friendly structure, while an unconstrained pixel branch preserves low-level appearance.
- Adds Spatial DeMerger, which expands each compact fused token into a denser decoder-side grid without increasing the sequence modeled by the diffusion generator.
- Evaluates reconstruction, class-conditional generation, convergence, throughput, and text-to-image generation under deep compression, with component and compression-strategy ablations.

## Method

The semantic stream downsamples the input to half resolution before applying a frozen pretrained visual encoder such as DINOv2. Relative to its native patch grid, this produces an effective 32x spatial compression without merging semantic tokens after feature extraction. A separate trainable pixel encoder maps the full-resolution image to a compact latent grid with the same spatial dimensions.

The two feature maps are concatenated channel-wise and fused by a lightweight projection into the generator-facing latent. Sample-wise dropout on the pixel latent during tokenizer training forces the decoder to retain use of semantic structure rather than relying exclusively on the reconstruction-oriented branch. Both reconstruction and diffusion training use the fused semantic-pixel representation. Before the ViT decoder, Spatial DeMerger projects each latent token into four channel groups and rearranges them into a 2 x 2 neighborhood, giving the decoder a denser grid while leaving the diffusion sequence compact. The tokenizer is trained with L1, perceptual, and adversarial reconstruction losses; the semantic encoder remains frozen while the pixel encoder, fusion projection, demerger, and decoder are learned.

## Experiments

**ImageNet at 256 x 256.** With a DiT-XL plus DDT wide head, DC-SAE-f32c64 reports 0.45 rFID, 3.31 gFID, and 180.71 Inception Score. Under the matched DiT-XL backbone without the wide head, its 5.67 gFID improves on DC-AE-f32c32 at 10.18 and DC-AE-1.5-f32c32 at 10.50, though the compared latent channel counts differ.

**ImageNet at 512 x 512.** A 0.83B-parameter DiT-XL variant trained for 400 epochs in the frozen 32x DC-SAE latent reports 3.37 gFID without classifier-free guidance and 1.99 with it, together with 205.83 Inception Score, 29.79 PSNR, and 0.16 rFID. The DC-AE-f32c32 comparison reports 26.25 PSNR and 0.20 rFID; generator architectures and parameter counts vary across some generation baselines.

**Text-to-image generation.** A 1.6B DiT with a Qwen3-1.7B text encoder is progressively trained at 256 and 512 resolutions, then fine-tuned at 1024. With classifier-free guidance it obtains 0.84 GenEval and 86.007 DPG-Bench. In the reported table, this exceeds the 12B DC-Gen DC-AE baseline on GenEval (0.72) but not DPG-Bench (87.073); the models use different training configurations.

**Throughput.** On one NVIDIA H200 with bf16 and batch size 32, DC-SAE-f32c64 reports 1,233.5, 330.8, and 76.8 images per second at 256, 512, and 1024 resolutions. The corresponding DC-AE-f32c32 rates are 265.6, 69.7, and 17.4 images per second, giving reported speedups of 4.64x, 4.75x, and 4.41x.

**Ablations.** At 32x compression, pre-merge DINOv2 reaches 3.31 gFID after 80 epochs, while tested post-merge variants range from 8.60 to 25.96. Spatial DeMerger consistently raises validation PSNR. Jointly training the decoder on semantic and pixel latents yields 4.02 FID after 80 epochs, compared with 5.64 for late concatenation despite the latter's better 31.91 PSNR. Masking experiments indicate that the pixel branch supplies most reconstruction detail, whereas the semantic branch primarily structures the latent for generation.

## Limitations

- The text-to-image study covers one 1.6B DiT configuration and uses a mixture of LAION-COCO and an unspecified subset of internal data, limiting reproducibility and scaling conclusions.
- Generator architectures, parameter counts, channel capacities, and training configurations differ across several headline comparisons, so not every table isolates the tokenizer alone.
- The experiments show that semantic features help convergence, but do not identify which properties of the pretrained encoder cause the benefit or provide a general criterion for choosing pre-merge over post-merge compression.
- Most tokenizer analysis uses ImageNet, and broader evidence across datasets, generator families, and semantic backbones remains open.
- The supplied manuscript does not state a publication venue, year, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/representation-autoencoders|Representation Autoencoders]]: the semantic autoencoding foundation and the reconstruction-detail limitation DC-SAE addresses.
- [[concepts/diffusion-models|Diffusion Models]]: the downstream generator family trained in the compressed latent space.

## Related Papers

- Zheng et al., "Diffusion Transformers with Representation Autoencoders": establishes semantic representation autoencoders for diffusion training.
- Chen et al., "Deep Compression Autoencoder for Efficient High-Resolution Diffusion Models": the principal 32x compression baseline.
- Chen et al., "DC-AE 1.5: Accelerating Diffusion Model Convergence with Structured Latent Space": a structured-latent deep-compression baseline.
- Shi et al., "Latent Diffusion Model without Variational Autoencoder": augments frozen semantic features with a residual branch for generative use.
- [[papers/sage-salient-factor-discovery-and-generation-with-visual-foundation-representations|SAGE: Salient Factor Discovery and Generation with Visual Foundation Representations]]: reuses a decodable semantic representation for factor discovery and conditional generation.

[[index|Library home]]
