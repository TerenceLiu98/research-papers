---
title: Improved Baselines with Representation Autoencoders
type: paper
authors:
  - Jaskirat Singh
  - Boyang Zheng
  - Zongze Wu
  - Richard Zhang
  - Eli Shechtman
  - Saining Xie
year: 2026
tags:
  - representation-autoencoders
  - diffusion-transformers
  - representation-alignment
  - image-generation
  - world-models
---

## TL;DR

RAEv2 improves [[concepts/representation-autoencoders|Representation Autoencoders]] by summing features from the last $K$ layers of a frozen vision encoder, retaining REPA supervision inside the diffusion transformer, and reusing the REPA head for single-pass internal guidance. On ImageNet-256, it reaches guided FID 1.06 after 80 epochs and unguided FID at most 2 after 35 epochs, compared with 177 epochs for the original RAE. The same recipe also improves text-to-image generation and navigation video prediction, although encoder and layer-count selection remain empirical.

## Research Question

Can representation autoencoders improve reconstruction, generation, and training efficiency without fine-tuning their pretrained encoder, and can their representation-alignment head replace the extra model or unconditional pass normally used for guidance?

## Motivation

The original RAE uses only the final feature layer of a pretrained vision encoder. This gives a semantically structured latent but omits lower-level information useful for reconstruction. It was also assumed that using the representation as the autoencoder latent made intermediate representation alignment redundant, while RAE's weak response to classifier-free guidance led to AutoGuidance with a separately trained model. The paper tests these assumptions rather than treating them as fixed properties of RAE.

## Contributions

- Defines a generalized RAE whose latent is a parameter-free sum of the final $K$ encoder layers, preserving the original token count and channel dimension.
- Evaluates 27 vision encoders and argues that RAE and representation alignment exploit complementary encoder properties: global semantics for the latent space and spatial token structure for intermediate diffusion features.
- Reparameterizes the diffusion output as clean-latent prediction and interprets the REPA head as an intermediate clean-latent estimate, enabling internal guidance within one model evaluation.
- Proposes $\mathrm{EP}_{\mathrm{FID}@k}$, the epochs needed to reach a specified unguided FID, as a convergence measure alongside final guided quality.
- Tests the recipe on ImageNet generation, text-to-image generation, and an autoregressive navigation world model.

## Method

Let $z_\ell\in\mathbb R^{N\times d}$ be the token features from layer $\ell$ of a frozen $L$-layer vision encoder. RAEv2 primarily uses multi-layer summation,

$$
x=\sum_{\ell=L-K+1}^{L}z_\ell,
$$

which retains the original $N\times d$ latent shape and introduces no learned aggregation parameters. The paper also tests concatenating the same layers and applying a fixed random projection; summation gives better downstream generation FID at every reported $K$, while reconstruction is similar.

A decoder is trained to reconstruct images from this latent. A DiT-DH generator is then trained with flow matching and REPA: an intermediate transformer state is projected toward the same encoder representation used as the RAE latent. Across the encoder sweep, linear-probe accuracy is most predictive for RAE alone, local-distance similarity is most predictive for REPA with a VAE, and their average is most predictive when RAE and REPA are combined. The authors interpret this as semantic and spatial complementarity rather than a redundant skip connection.

For guidance, the final diffusion output is expressed as clean-latent ($x$) prediction. Since the REPA head also predicts the clean RAE representation from an intermediate block, its output supplies the weaker estimate in internal guidance. Both estimates come from one forward pass, unlike classifier-free guidance's conditional and unconditional evaluations or AutoGuidance's separate weak model.

## Experiments

**ImageNet-256.** With DINOv3-L, DiT-DH-XL, and $K=7$, RAEv2 reports guided FID 1.06 and six-representation Frechet distance $\mathrm{FD}_r^6=2.17$ after 80 epochs. The original RAE comparison reports FID 1.13 and $\mathrm{FD}_r^6=3.26$ after 800 epochs. RAEv2 reaches unguided FID at most 2 in 35 epochs, versus 177 for RAE and 480 for REPA-E. At 20 epochs, it improves FID over RAE for B, L, and XL generator scales (3.37 versus 5.48, 2.76 versus 3.80, and 2.61 versus 3.75).

**Layer aggregation and guidance.** Reconstruction improves monotonically as more DINOv3-L layers are summed, while the best guided generation result occurs at $K=7$. ImageNet linear-probe top-1 changes from 85.39% at $K=1$ to 85.10% at $K=7$ and 85.24% at $K=23$. At $K=7$, no guidance, classifier-free guidance, AutoGuidance, and REPA guidance obtain FIDs of 1.65, 1.49, 1.14, and 1.06, respectively. The last method requires neither a second model nor an extra inference pass.

**Text-to-image.** A 0.9B model pretrained on JourneyDB and BLIP3o subsets scores 62.4 on GenEval, compared with 58.4 for RAE and 41.7 for Flux-VAE under the reported setup. After BLIP3o-60k fine-tuning, the scores are 82.7, 81.5, and 78.3. RAEv2 also leads the same comparisons on the reported DPG-Bench and GenAI-Bench results.

**Navigation world modeling.** On RECON, the action-conditioned RAEv2 model reports FVD 105.61 over autoregressive rollouts through 16 seconds, compared with 312.01 for RAE, 200.97 for NWM, and 762.73 for DIAMOND. In the single-shot training protocol, it matches RAE's final FID within roughly 10,000 iterations and converges near 30,000 iterations to FID 7.5 and LPIPS 0.24, versus 18.0 and 0.29 for RAE.

## Limitations

- The generalized encoder study covers only addition and fixed random projection; it does not establish an optimal aggregation rule.
- The best pretrained encoder and layer count are selected through empirical sweeps rather than learned end to end.
- The headline ImageNet setting is 256 by 256 pixels, and the paper does not establish the same quality or efficiency at higher resolutions.
- Comparisons across published baselines use different training durations and systems; $\mathrm{EP}_{\mathrm{FID}@k}$ improves convergence comparability but is still measured in epochs rather than compute or energy.
- Text-to-image experiments use one 0.9B generator configuration, and the navigation evaluation uses the RECON dataset; broader scale and domain transfer remain open.
- The supplied manuscript does not state a stable identifier or publication venue.

## Related Concepts

- [[concepts/representation-autoencoders|Representation Autoencoders]]: the semantic latent framework generalized across encoder layers.
- [[concepts/diffusion-models|Diffusion Models]]: the generative family in which RAEv2 trains its transformer.
- [[concepts/flow-matching|Flow Matching]]: the generator's training objective.
- [[concepts/linear-probing|Linear Probing]]: the measure used to characterize an encoder's global semantic information.
- [[concepts/world-models|World Models]]: the action-conditioned future-frame setting used for transfer evaluation.

## Related Papers

- Zheng et al. (2025), "Diffusion Transformers with Representation Autoencoders," arXiv:2510.11690: the original RAE baseline that RAEv2 revises.
- Yu et al. (2024), "Representation Alignment for Generation: Training Diffusion Transformers Is Easier Than You Think," arXiv:2410.06940: introduces REPA supervision for diffusion transformers.
- Singh et al. (2025), "What Matters for Representation Alignment: Global Information or Spatial Structure?," arXiv:2512.10794: motivates the spatial-structure interpretation used in the encoder analysis.
- [[papers/beyond-the-last-layer-multi-layer-representation-fusion-for-visual-tokenization|Beyond the Last Layer: Multi-Layer Representation Fusion for Visual Tokenization]]: learns a routed correction from intermediate encoder layers, whereas RAEv2 uses parameter-free summation.
- [[papers/dc-sae-deep-compression-semantic-autoencoder-for-faster-diffusion-convergence|DC-SAE: Deep Compression Semantic Autoencoder for Faster Diffusion Convergence]]: combines separate semantic and pixel branches instead of aggregating one frozen encoder across depth.

[[index|Library home]]
