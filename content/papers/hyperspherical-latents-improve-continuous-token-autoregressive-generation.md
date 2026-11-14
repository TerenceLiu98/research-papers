---
title: Hyperspherical Latents Improve Continuous-Token Autoregressive Generation
type: paper
authors:
  - Guolin Ke
  - Hui Xue
year: null
source_job_id: "21ab8245-5658-41d7-b553-8bfefdc60746"
url: https://github.com/guolinke/SphereAR
tags:
  - image-generation
  - autoregressive-models
  - latent-geometry
---

## TL;DR

SphereAR combines a hyperspherical variational autoencoder with raster-order causal generation and a token-level diffusion head. Normalizing completed predictions before refeeding removes latent scale drift. On class-conditional ImageNet-256, the paper reports FID 1.34 for its 943M-parameter model and 1.54 for its 479M model.

## Research Question

Can constant-norm latent tokens close the quality gap between continuous-token next-token autoregression and masked or diffusion-based image generation?

## Motivation

The authors attribute part of this gap to heterogeneous Gaussian latent scales, whose errors compound during sequential decoding, especially under classifier-free guidance. Fixing variance or increasing KL regularization leaves radial degrees of freedom available.

## Contributions

- Couples a directional VAE posterior with normalization of completed autoregressive predictions.
- Analyzes local removal of radial perturbations and the radial KL penalty retained by a Gaussian posterior whose samples are normalized.
- Evaluates model scaling, posterior families, normalization interfaces, guidance robustness, and tokenizer architectures.

## Method

The hybrid CNN–Transformer tokenizer learns a Power Spherical posterior with unit mean direction and scalar concentration, using a uniform spherical prior. Each token has dimension 16 and radius $R=\sqrt{16}=4$. Reconstruction, KL, perceptual, and adversarial losses train the tokenizer for 100 epochs.

A causal Transformer consumes tokens in raster order under teacher forcing. Its MLP diffusion head learns a rectified-flow velocity from Gaussian noise to the next latent, conditioned on the Transformer state. Inference uses 100 Euler steps, guided conditional/unconditional velocities, and a single final projection $N_R(z)=Rz/\|z\|_2$ before refeeding and decoding. Intermediate flow states are not normalized: spherical endpoint support does not imply spherical transport paths.

At a point on the radius-$R$ sphere, the projection derivative is $I-zz^\top/R^2$, removing radial perturbations to first order while retaining tangential ones. Appendix B decomposes Gaussian KL into directional KL plus a nonnegative conditional radial KL. This explains an objective mismatch when the decoder ignores radius; it does not establish universal superiority of every spherical posterior family.

## Experiments

ImageNet-256 evaluation uses 50,000 generated images, ADM evaluation, and CFG sweeps in increments of 0.1. Generators train for 400 epochs.

| Model | Parameters | FID ↓ | IS ↑ |
| --- | --- | --- | --- |
| SphereAR-B | 208M | 1.92 | 277.8 |
| SphereAR-L | 479M | 1.54 | 295.9 |
| SphereAR-H | 943M | 1.34 | 300.0 |
| MAR-H | 943M | 1.55 | 303.7 |
| LatentLM-L | 479M | 2.24 | 253.8 |
| VAR-d30 | 2B | 1.92 | 323.1 |

These are the paper's Table 1 comparisons; training schedules differ across methods. In the shorter 50-epoch tokenizer/generator ablations, Section 4.3 reports FID 2.97 for Gaussian latents, 2.89 with decoder-only normalization, 2.68 with additional AR normalization, and 2.52 with a spherical posterior. Post-hoc Gaussian normalization helps but remains behind S-VAE. The parsed Table 2 marks all normalization cells identically, contradicting this prose; the interface assignments here follow the explicit prose.

At ImageNet-512, SphereAR-L reports FID 1.67 and IS 292.5 (481M parameters). The hybrid VAE trains at 5.81 iterations/s versus 2.25 for the CNN on eight A100 GPUs. Appendix G identifies the diffusion head as the inference bottleneck: default SphereAR is faster than MAR but slower than LlamaGen. Both Gaussian and spherical models deteriorate under very high guidance, with slower degradation for the spherical model.

## Limitations

Evaluation is restricted to ImageNet class conditioning; broader datasets and multimodal generation remain untested. Faces, text, and high-frequency details still exhibit artifacts. The stability argument is local and first-order and does not eliminate directional error propagation. The default sequential generator retains the cost of 100 flow steps per token. The supplied manuscript does not state a publication year or a stable paper identifier, so neither is inferred from its references.

## Related Concepts

- [[concepts/hyperspherical-variational-autoencoders|Hyperspherical Variational Autoencoders]]: directional posterior modeling with fixed latent radius.
- [[concepts/flow-matching|Flow Matching]]: the token-level velocity training objective.
- [[concepts/spherical-latent-flow-matching|Spherical Latent Flow Matching]]: a related approach that also constrains the transport path; SphereAR projects only the completed token.

## Related Papers

- [[papers/hyperspherical-autoencoder-for-high-fidelity-image-reconstruction-and-generation|Hyperspherical Autoencoder for High-Fidelity Image Reconstruction and Generation]]: a related library paper using directional teacher alignment and spherical transport rather than causal next-token generation.
- [[papers/aligning-latent-geometry-for-spherical-flow-matching-in-image-generation|Aligning Latent Geometry for Spherical Flow Matching in Image Generation]]: shares fixed-radius token geometry but trains spherical geodesic flows.
- Li et al. (2024), “Autoregressive Image Generation without Vector Quantization”: source of the MAR baseline and token-level diffusion-head design.
- Davidson et al. (2018), “Hyperspherical Variational Auto-Encoders,” and De Cao and Aziz (2020), “The Power Spherical Distribution”: foundations for the directional posterior.

Source: supplied parsed manuscript, Cognitio job `21ab8245-5658-41d7-b553-8bfefdc60746`.

[[index|Library home]]
