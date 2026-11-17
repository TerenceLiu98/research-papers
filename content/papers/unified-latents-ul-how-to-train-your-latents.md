---
title: "Unified Latents (UL): How to train your latents"
type: paper
authors:
  - Jonathan Heek
  - Emiel Hoogeboom
  - Thomas Mensink
  - Tim Salimans
year: null
source_job_id: "516af458-da0f-4bcc-a374-2bf7b4b354f9"
tags:
  - diffusion-models
  - latent-representations
  - image-generation
  - video-generation
---

## TL;DR

Unified Latents jointly trains an encoder, diffusion prior, and diffusion decoder to control latent information through fixed encoding noise and a likelihood-based prior penalty. A second-stage generator learns the frozen latents with perceptual loss weighting. The paper reports ImageNet-512 FID 1.4 and Kinetics-600 FVD 1.3, with improved base-model training efficiency but substantially more expensive decoding than conventional latent diffusion.

## Research Question

How should latent representations be regularized to preserve reconstruction detail while remaining easy for a downstream diffusion generator to model?

## Motivation

Channel count and weak Gaussian KL regularization provide only indirect control over latent information. Semantic encoders can simplify generation while losing fine detail. UL instead makes the reconstruction–modeling tradeoff explicit through a diffusion-based upper bound on latent bitrate.

## Contributions

- Matches fixed encoder noise to the diffusion prior's minimum noise, simplifying the latent KL bound to a denoising objective plus a terminal prior term.
- Combines an unweighted prior ELBO with a reweighted diffusion reconstruction objective.
- Uses decoder loss factor and sigmoid bias to tune information allocation between latent and decoder.
- Tests bitrate, latent shape, prior choice, encoder variance, image generation, and conditional video generation.

## Method

The deterministic encoder produces a clean latent, then adds fixed Gaussian noise at log-SNR 5 (noise standard deviation approximately 0.08). The diffusion prior terminates at this same noise level. Its unweighted ELBO bounds the encoder-to-prior KL; reweighting this prior during joint training would let the encoder exploit discounted noise levels.

The image-space diffusion decoder conditions on the noisy latent and noisy image. Its sigmoid-weighted loss discounts selected reconstruction details, while a multiplicative loss factor encourages use of the latent rather than posterior collapse. Increasing this factor generally increases bitrate and reconstruction fidelity. This is an information bound, not a demonstrated practical compressed-file size.

After joint training, the encoder and decoder are frozen and a new latent base model is trained with sigmoid loss weighting. This separates likelihood-based latent regularization from sample-quality optimization and permits larger base models and batches. Generation samples a slightly noisy latent and then runs the diffusion decoder. The image configuration maps 512×512 pixels to 32×32 spatial latents; the encoder is convolutional, the prior is a ViT, and the decoder is a U-ViT.

## Experiments

**ImageNet-512 bitrate sweep (Table 2).** Lower FID is better. Increasing information improves reconstruction but can make small generators harder to train.

| Loss factor | Bits/pixel | rFID | PSNR | Small gFID | Medium gFID |
| --- | --- | --- | --- | --- | --- |
| 1.3 | 0.035 | 0.79 | 25.7 | 1.42 | 1.37 |
| 1.5 | 0.059 | 0.47 | 27.6 | 1.54 | 1.31 |
| 1.7 | 0.083 | 0.36 | 28.9 | 1.77 | 1.38 |
| 2.1 | 0.116 | 0.27 | 30.1 | 2.38 | 1.58 |

**Text-to-image (Table 1).** On 30,000 unguided samples evaluated against an internal training dataset, UL reports gFID 4.1 and CLIP 27.1, versus 5.0/27.0 for pixel diffusion and 6.8/27.0 for Stable Diffusion latents. These are not MS-COCO results.

**Video.** On Kinetics-600 at 128×128, models condition on five frames and generate eleven. Small and medium UL models report FVD 1.7 and 1.3. Compared tokenizers use different frame counts; the authors adjust baseline FLOP accounting by discarding the extra token's processing cost.

**Ablations.** Removing encoder gradients from the learned prior worsens gFID from 1.54 to 7.80, with channel count also changed from 32 to 8. Reducing encoding noise to log-SNR 10 produces rFID 28.27 and no useful reported base-model result. Learning encoder variance gives gFID 1.81 and instability in the default noise setting. In Table 5, diffusion prior/decoder obtains gFID 1.4 versus 2.4 with MSE reconstruction and 2.5 with a normal prior. Latent channels 16–64 work substantially better than 4–8 for reconstruction.

## Limitations

- Training-efficiency plots exclude autoencoder training cost; they establish base-model compute comparisons rather than total lifecycle savings.
- Diffusion decoding is reported to cost an order of magnitude more at sampling time than GAN-based decoding without additional distillation.
- Autoencoder training datasets differ across baselines. Internal text-to-image data and differing video tokenization protocols complicate reproduction and comparison.
- Reconstruction FID uses the same samples for reconstructions and reference statistics, unlike standard generation FID; PSNR supplies a complementary fidelity measure.
- Single-stage experiments did not match the main recipe: one failed to reach FID below 2, and another reached approximately 4 after 400,000 steps (Appendix B).
- Optimal bitrate remains dependent on model size and training budget; proposed scaling laws and discrete-text extensions are future work.

## Related Concepts

- [[concepts/diffusion-models|Diffusion Models]]: diffusion supplies both the learned latent prior and conditional pixel decoder.
- [[concepts/representation-autoencoders|Representation Autoencoders]]: an alternative strategy that uses pretrained semantic features rather than jointly learning bitrate-regularized latents.

## Related Papers

- [[papers/diffusion-transformers-with-representation-autoencoders|Diffusion Transformers with Representation Autoencoders]]: cited alternative based on pretrained semantic latent representations.
- Rombach et al. (2022), “High-Resolution Image Synthesis with Latent Diffusion Models”: conventional autoencoder and latent-generation baseline.
- Vahdat et al. (2021), “Score-Based Generative Modeling in Latent Space”: diffusion-prior predecessor with more general encoder distributions.
- Kingma and Gao (2023), “Understanding the Diffusion Objective as a Weighted Integral of ELBOs”: basis for interpreting noise-level loss weighting.

Source: supplied parsed manuscript, Cognitio job `516af458-da0f-4bcc-a374-2bf7b4b354f9`. Publication year and a stable identifier for this paper are not supplied in the parsed text.
