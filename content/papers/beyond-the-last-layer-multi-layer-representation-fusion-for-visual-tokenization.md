---
title: "Beyond the Last Layer: Multi-Layer Representation Fusion for Visual Tokenization"
type: paper
authors:
  - Xuanyu Zhu
  - Yan Bai
  - Yang Shi
  - Yihang Lou
  - Yuanxing Zhang
  - Jing Jin
  - Yuan Zhou
year: null
url: https://github.com/zhuzil/DRoRAE
tags:
  - visual-tokenization
  - representation-autoencoders
  - multi-layer-features
  - image-generation
---

## TL;DR

DRoRAE enriches a [[concepts/representation-autoencoders|Representation Autoencoder]] by routing features from every layer of a frozen DINOv2 encoder into a bounded correction to its last-layer latent. On ImageNet-256, the full three-phase system lowers reconstruction FID from 0.57 to 0.29 and AutoGuidance generation FID from 1.74 to 1.65. Fusion capacity also has a reported log-linear relationship with reconstruction quality, but the evidence is limited to one encoder family and the manuscript contains inconsistencies in its text-to-image score and fusion-module parameter count.

## Research Question

Can intermediate features from a pretrained vision encoder improve the reconstruction and generation quality of representation-based visual tokenizers without shifting the latent distribution so far that a downstream generator can no longer learn it?

## Motivation

Representation autoencoders conventionally expose only the final layer of a pretrained vision encoder. That layer is semantically strong, but repeated abstraction attenuates textures, edges, color gradients, and other local detail retained by shallower layers. Directly fusing those layers can improve reconstruction while changing the latent distribution enough to harm diffusion training. DRoRAE therefore treats feature richness and generation compatibility as a joint design problem.

## Contributions

- Introduces a depth-routed fusion module with per-layer MLP experts and per-token weights that may be positive or negative.
- Normalizes routing weights by their L2 energy and injects the fused feature as a correction anchored to the original final-layer representation.
- Uses a three-phase schedule that trains the decoder, trains fusion against the frozen decoder, and then fine-tunes the decoder while fusion remains fixed.
- Studies representation richness along expert-width and fused-layer axes, reporting a log-linear relationship between fusion capacity and reconstruction FID.
- Evaluates reconstruction, class-conditional diffusion, and text-to-image generation, with ablations separating reconstruction quality from latent learnability.

## Method

A frozen 12-layer DINOv2-B encoder supplies the hidden state from each transformer block. A separate two-layer MLP expert maps every layer to a common feature scale. For each spatial token, a linear router consumes the concatenated layer features and emits unconstrained layer weights. Unlike softmax routing, these weights permit active suppression. Their weighted sum is divided by the L2 norm of the routing vector and normalized with the backbone's layer normalization.

The fused representation does not directly replace the baseline latent. DRoRAE applies an incremental update, $z_{final}=\mathrm{LN}(z_{base}+\beta(z_{fuse}-z_{base}))$, with $\beta=0.2$. This keeps the output close to the latent distribution for which the decoder and downstream generator were designed.

Training is decoupled. Phase 1 trains a ViT-XL decoder for 100 epochs while the encoder is frozen. Phase 2 freezes both encoder and decoder and trains only the fusion module for 100 epochs, making the existing decoder an implicit distributional constraint. Phase 3 freezes fusion and fine-tunes the decoder for 20 epochs. The reconstruction objective combines L1, LPIPS, and adversarial losses. A separate 839M-parameter DiT-DH-XL is then trained for 80 epochs on the resulting latent space.

## Experiments

**Reconstruction and class-conditional generation.** On ImageNet-256, the RAE baseline reports rFID 0.57, PSNR 18.8 dB, LPIPS 0.256, and SSIM 0.483. Fusion alone improves these to 0.47, 21.79 dB, 0.195, and 0.583. Decoder fine-tuning reaches 0.29 rFID, 24.32 dB PSNR, 0.134 LPIPS, and 0.701 SSIM. With AutoGuidance, gFID improves from 1.74 for RAE to 1.70 after fusion-only training and 1.65 after decoder adaptation. Without guidance, the full model's gFID is 2.68 versus 2.16 for RAE, showing a residual distribution shift.

**Text-to-image generation.** Under the same Bagel-MoT and Qwen2.5-0.5B setup, DRoRAE scores 0.60 overall in the GenEval table, compared with 0.56 for RAE, 0.61 for VA-VAE, and 0.61 for RPiAE-VB. Its strongest category scores are single object at 0.98, counting at 0.56, and color at 0.79. The surrounding prose instead reports DRoRAE as 0.59.

**Design ablations.** Energy-normalized routing without incremental correction gives the best Phase 2 reconstruction result, 0.447 rFID, but a DiT loss of 0.81. Adding the incremental anchor changes these to 0.470 and 0.47, respectively. Softmax routing with the anchor obtains 0.512 rFID and 0.48 DiT loss. These results support the paper's claimed trade-off: unconstrained fusion can reconstruct well while producing a latent that is harder for the generator to model.

**Training ablations.** Fusion-only training reports 0.47 rFID and 1.70 gFID with AutoGuidance; adapting the decoder gives 0.29 and 1.65. Fine-tuning the backbone as well reaches 0.13 rFID, but its unguided gFID deteriorates to 18.36 and guided evaluation is not reported.

**Scaling and qualitative analysis.** With 12 fused layers, increasing expert capacity from 2.5M to 113.3M parameters changes rFID from 0.539 to 0.459, with a reported log-linear fit of $R^2=0.86$. Varying the number of fused layers gives a noisier trend, $R^2=0.49$, and the unified parameter fit reports $R^2=0.59$. Frequency analysis attributes reconstruction gains to better preservation of mid- and high-frequency content. Router visualizations show shallow texture-selective activation and opposing contributions from middle and deeper layers.

## Limitations

- The main experiments use DINOv2-B on ImageNet-256; the paper does not establish whether the design or scaling relationship transfers to larger encoders, other backbone families, higher resolutions, or video.
- The layer-count series is non-monotonic and has a modest fit ($R^2=0.49$), while the unified fit is $R^2=0.59$; claims of predictable scaling are strongest only for the expert-capacity sweep.
- AutoGuidance is important to the headline generation result. Without guidance, the full model performs worse than RAE in gFID (2.68 versus 2.16).
- The backbone-fine-tuned variant has substantially better reconstruction but severely degraded generation, and its guided generation result is pending.
- The text-to-image table reports 0.60 overall for DRoRAE, while the prose reports 0.59.
- The manuscript describes the fusion module as approximately 29M parameters, but its scaling appendix lists 56.7M parameters for 12 layers with hidden dimension 3072, the stated default configuration.
- The supplied manuscript provides a code URL but no publication venue, year, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/representation-autoencoders|Representation Autoencoders]]: the semantic visual-tokenizer framework extended by multi-layer fusion.
- [[concepts/diffusion-models|Diffusion Models]]: the downstream generator used to test whether enriched latents remain learnable.

## Related Papers

- Zheng et al., "Diffusion Transformers with Representation Autoencoders": the final-layer RAE baseline that DRoRAE extends.
- Gong et al., "RPiAE: A Representation-Pivoted Autoencoder Enhancing Both Image Generation and Editing": a representation-based tokenizer comparison.
- [[papers/dc-sae-deep-compression-semantic-autoencoder-for-faster-diffusion-convergence|DC-SAE: Deep Compression Semantic Autoencoder for Faster Diffusion Convergence]]: combines semantic and pixel branches to balance structured generation latents with reconstruction detail.
- [[papers/sage-salient-factor-discovery-and-generation-with-visual-foundation-representations|SAGE: Salient Factor Discovery and Generation with Visual Foundation Representations]]: reuses spatial RAE latents for factor discovery and conditional generation.

[[index|Library home]]
