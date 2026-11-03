---
title: "One Layer Is Enough: Adapting Pretrained Visual Encoders for Image Generation"
type: paper
authors:
  - Yuan Gao
  - Chen Chen
  - Tianrong Chen
  - Jiatao Gu
year: 2025
source_job_id: "ccad6878-a886-4406-bca8-1ae33788e0bf"
tags:
  - representation-autoencoders
  - image-generation
  - latent-diffusion
  - normalizing-flows
---

## TL;DR

Feature Auto-Encoder (FAE) compresses frozen DINOv2 or SigLIP2 patch features into a low-dimensional generative latent with one self-attention layer and a linear projection. A feature decoder first reconstructs the pretrained representation, and a separate pixel decoder maps that reconstruction to an image. On ImageNet at 256 by 256 pixels, the reported diffusion model reaches FID 1.48 without classifier-free guidance and 1.29 with guidance after 800 epochs; the corresponding 80-epoch results are 2.08 and 1.70. The compact latent also supports text-to-image diffusion and STARFlow, while reconstructed features retain most of the tested linear-probing and retrieval performance.

## Research Question

Can high-dimensional pretrained visual representations be converted into compact latents that existing generative models can learn efficiently, without complex alignment objectives or losing the semantic information needed for downstream understanding tasks?

## Motivation

Pretrained visual encoders favor high-dimensional features that capture semantic and spatial structure, whereas latent generative models benefit from compact codes that make noisy trajectories easier to model. Feature-alignment methods add auxiliary losses, while directly generating in a pretrained encoder's feature space requires wider, specialized generators. FAE instead asks whether a minimal adapter can remove redundant information while keeping the resulting code close enough to the original representation to support both generation and feature recovery.

## Contributions

- Introduces a feature encoder consisting of one self-attention layer and a linear projection that compresses frozen visual features into a low-dimensional continuous latent.
- Separates representation recovery from image synthesis with a six-layer feature decoder followed by a ViT-L pixel decoder.
- Uses the same compact latent interface with diffusion models and a latent normalizing flow, without adding alignment losses or changing their core architectures.
- Evaluates semantic preservation through ImageNet linear probing, COCO image-text retrieval, and patch-similarity analyses in addition to generative benchmarks.
- Ablates encoder depth, latent dimension, diffusion-transformer components, and timestep shifting.

## Method

For pretrained patch features $x$, the FAE encoder applies one self-attention layer and a linear projection to produce compact latents $z$. The attention layer mixes information across patches before dimensionality reduction; the paper argues that this can remove shared global redundancy that an independent linear projection cannot. The feature encoder is deliberately shallow because the feature-reconstruction objective is easier than the original masked pretraining task, and deeper adapters can re-encode the representation in ways that discard unsupervised information.

A six-layer Transformer feature decoder reconstructs $\hat{x}$ from $z$. It is trained with squared feature-reconstruction error and KL regularization:

$$
\mathcal{L}_{\mathrm{VAE}}=\lVert \hat{x}-x\rVert_2^2+\beta\,\mathrm{KL}\bigl(q(z\mid x)\,\|\,p(z)\bigr).
$$

A separate ViT-L pixel decoder maps reconstructed features to RGB images using adversarial, perceptual, and reconstruction losses. It is first trained on pretrained features perturbed with Gaussian noise and then fine-tuned on FAE-reconstructed features. This two-decoder design makes feature reconstruction an explicit intermediate target rather than asking one decoder to recover pixels directly from the compressed code.

After the latent space is trained, the frozen visual backbone and feature encoder map training images to $z$. The paper trains SiT/LightningDiT-style [[concepts/diffusion-models|Diffusion Models]] and the STARFlow [[concepts/normalizing-flows|Normalizing Flow]] on these codes. The generator and the feature/pixel decoders are decoupled, so different generator families can share the same latent representation.

## Experiments

**ImageNet-1K class-conditional generation.** Images are encoded as $16\times16\times32$ latents. At 80 epochs, FAE with timestep shift reports gFID 2.08 without classifier-free guidance and 1.70 with it. At 800 epochs, the corresponding gFID values are 1.48 and 1.29. The generator has 675M parameters in the reported comparison. In the encoder ablation at 320 epochs, single attention obtains unguided FID 1.98 and guided FID 1.61, compared with 2.07 and 1.76 for a linear adapter and 2.13 and 1.65 for a six-layer Transformer adapter.

**Text-to-image generation.** Models are trained on CC12M at 256 by 256 pixels and evaluated zero-shot on 30,000 MS-COCO validation examples. DINOv2-based FAE reports FID 7.47 without guidance and 6.90 with guidance after 400 epochs; the SigLIP2 variants report 7.57 and 7.11. Under the same listed setup, the SD-VAE baseline without guidance reports 21.25.

**Latent normalizing flow.** With STARFlow configured to use equal sequence lengths for FAE and the SD-VAE baseline, the DINOv2-g/14 FAE variant reports FID 2.67 after 400 epochs, compared with 4.51 for SD-VAE. The paper reports faster convergence for FAE in both guided and unguided settings.

**Representation preservation.** Feeding reconstructed DINOv2-g/14 embeddings to the original linear head yields 86.17% ImageNet top-1 accuracy, compared with 87.00% for the original encoder. On COCO retrieval, reconstructed SigLIP2 features obtain 55.79% text-to-image and 72.94% image-to-text top-1, versus 55.45% and 73.10% for the original features. Patch-level visualizations further show retained within-image similarity and cross-image matching behavior.

**Latent and schedule ablations.** Among 32-, 48-, and 64-channel latents, 32 channels give the best reported generation FID and fastest convergence, although timestep shifting narrows the gap. Adding SwiGLU, RoPE, and RMSNorm to the SiT backbone improves the reported 320-epoch unguided FID from 1.98 to 1.86.

## Limitations

- The single-layer claim applies to the feature encoder, not the full system: FAE also uses a six-layer feature decoder, a 24-layer pixel decoder in the listed configuration, and a large downstream generator.
- Because the feature encoder is not trained directly with image-reconstruction loss, reconstruction fidelity trails VA-VAE. The appendix reports rFID 0.68 and 0.66 for 32- and 64-channel FAE, compared with 0.28 for VA-VAE.
- The headline class-conditional results are limited to ImageNet at 256 by 256 pixels. The 384-by-384 MMDiT configuration is used for qualitative examples rather than the main quantitative benchmark.
- Text-to-image training uses CC12M and evaluation uses zero-shot MS-COCO FID; these results do not establish behavior across broader prompt distributions or higher resolutions.
- Semantic preservation is tested through linear probing, retrieval, and patch similarity. These measurements do not show that every property of the original pretrained representation survives compression.
- The supplied manuscript gives a date but no stable paper identifier or publication venue.

## Related Concepts

- [[concepts/representation-autoencoders|Representation Autoencoders]]: the broader family that makes pretrained visual features decodable and usable for latent generation.
- [[concepts/diffusion-models|Diffusion Models]]: one of the two generator families trained on FAE latents.
- [[concepts/normalizing-flows|Normalizing Flows]]: the second generator family, instantiated with STARFlow.
- [[concepts/flow-matching|Flow Matching]]: the continuous generative training framework used in the diffusion and flow experiments.
- [[concepts/linear-probing|Linear Probing]]: the downstream test used to measure how well reconstructed DINOv2 features retain class information.

## Related Papers

- Zheng et al. (2025), "Diffusion Transformers with Representation Autoencoders," arXiv:2510.11690: directly models pretrained encoder features as diffusion latents, motivating FAE's explicit dimensional compression.
- Yao, Yang, and Wang (2025), "Reconstruction vs. Generation: Taming Optimization Dilemma in Latent Diffusion Models": introduces VA-VAE, a principal reconstruction and generation baseline.
- Yu et al. (2024), "Representation Alignment for Generation: Training Diffusion Transformers Is Easier Than You Think," arXiv:2410.06940: aligns intermediate diffusion features to pretrained visual representations rather than reconstructing those representations through a compact latent.
- [[papers/improved-baselines-with-representation-autoencoders|Improved Baselines with Representation Autoencoders]]: a related approach that improves high-dimensional representation latents through multi-layer feature aggregation and internal representation guidance.

[[index|Library home]]
