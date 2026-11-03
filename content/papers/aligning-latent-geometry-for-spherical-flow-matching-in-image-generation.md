---
title: Aligning Latent Geometry for Spherical Flow Matching in Image Generation
type: paper
authors:
  - Tuna Han Salih Meral
  - Kaan Oktay
  - Hidir Yesiltepe
  - Adil Kaan Akan
  - Pinar Yanardag
year: null
url: https://aligning-latent-geometry.github.io
tags:
  - flow-matching
  - image-generation
  - latent-geometry
  - variational-autoencoders
---

## TL;DR

This paper argues that linear latent [[concepts/flow-matching|Flow Matching]] wastes capacity on radial motion: Gaussian noise and VAE tokens occupy thin shells, but straight interpolation cuts through shell interiors, while component-swap probes indicate that VAE decoders respond much more strongly to token direction than radius. The proposed [[concepts/spherical-latent-flow-matching|Spherical Latent Flow Matching]] projects every token to radius $\sqrt d$, finetunes the frozen encoder's decoder, and transports projected Gaussian directions along spherical linear interpolation paths. Under matched ImageNet-256 training, it improves FID across three tokenizer families and two SiT scales without changing the diffusion architecture or using an auxiliary encoder.

## Research Question

Can latent flow matching generate images more efficiently and accurately by aligning both VAE latents and transport paths with their approximately spherical geometry, rather than treating the latent space as unconstrained Euclidean space?

## Motivation

Standard latent flow matching connects Gaussian noise to encoded images with a straight line. In the token dimensions studied here, both endpoints concentrate in thin radial shells. Even when preprocessing approximately matches their radii, the Euclidean chord moves inward; when the radii differ, it also sweeps between shells. The paper measures maximum deviations of 1.4, 1.8, and 2.5 endpoint-shell standard deviations for FLUX.2, VA-VAE, and REPA-E FLUX.1, respectively.

The authors also test what information the decoder uses. Swapping a token's radius with that of a same-class neighbor leaves the decoded image close to the anchor, whereas swapping direction changes the output nearly as much as replacing the entire token. Yet a linear flow target assigns roughly half of its velocity to radial motion near both endpoints for FLUX.2 and VA-VAE, and about 90% near the noise endpoint for REPA-E FLUX.1. This motivates removing the radial degree of freedom rather than asking one objective to balance radial and angular prediction.

## Contributions

- Identifies and measures a mismatch between thin-shell endpoint distributions and straight latent flow paths.
- Uses direction-versus-radius component swaps to show that decoded perceptual and semantic content is predominantly angular for the tested tokenizers.
- Converts existing pretrained VAEs into fixed-radius tokenizers by inserting a token-wise projection and finetuning only the decoder and discriminator for five ImageNet epochs.
- Replaces linear interpolation with spherical linear interpolation, projects predicted velocities onto the tangent space, and samples with the sphere's exponential map.
- Evaluates the same recipe across FLUX.2, VA-VAE, and REPA-E FLUX.1 tokenizers and SiT-B and SiT-XL backbones.

## Method

For each spatial VAE token $z\in\mathbb R^d$, the method applies

$$
\pi(z)=\sqrt d\frac{z}{\|z\|_2},
$$

so a latent tensor lies on a product of $h\times w$ copies of $S^{d-1}(\sqrt d)$. The pretrained encoder is frozen. The decoder and discriminator are finetuned with the tokenizer's original pixel $L_1$, LPIPS, and patch-adversarial losses; the KL term is removed because the projected encoder output is deterministic.

The source token is obtained by radially projecting ordinary Gaussian noise,

$$
z_0=\sqrt d\frac{\epsilon}{\|\epsilon\|_2},\qquad \epsilon\sim\mathcal N(0,I_d).
$$

Rotational invariance makes this source uniform on $S^{d-1}(\sqrt d)$. Given projected endpoints with angular separation $\omega$, training states follow the shortest spherical geodesic,

$$
z_t=\frac{\sin((1-t)\omega)}{\sin\omega}z_0+
\frac{\sin(t\omega)}{\sin\omega}z_1.
$$

The derivative of this path is tangent to the sphere. Both the target and network output are projected with

$$
\Pi_{z_t}v=v-\frac{\langle v,z_t\rangle}{\|z_t\|^2}z_t.
$$

At inference, exponential-map integration keeps every token on the sphere. With the exact slerp velocity, one exponential-map step lands exactly at the corresponding later point on the geodesic; projected Euler remains on the same great circle but undershoots its arc length.

## Experiments

All main comparisons use class-conditional ImageNet-256, 80 training epochs, batch size 256, 250 final sampling steps, and matched classifier-free guidance. Patch sizes are chosen so every tokenizer produces 256 generator tokens.

**Generation quality.** At SiT-B scale and CFG 1.0, spherical-slerp changes FID from 26.14 to 20.21 with FLUX.2, from 26.99 to 21.96 with VA-VAE, and from 38.00 to 26.07 with REPA-E FLUX.1. At the strongest shared guidance setting reported for each B-scale tokenizer, FID changes from 9.99 to 6.29 for FLUX.2 at CFG 1.5, from 6.84 to 5.46 for VA-VAE at CFG 2.0, and from 7.58 to 5.43 for REPA-E FLUX.1 at CFG 2.0. At XL scale and CFG 1.0, the gains remain 13.00 to 10.71 for FLUX.2 and 12.16 to 10.36 for VA-VAE.

**Support and path ablation.** On FLUX.2 SiT-B/2 at CFG 1.0 with the 50-step ablation evaluator, vanilla-linear, vanilla-shell, spherical-linear, and spherical-slerp obtain FIDs of 26.35, 27.26, 22.85, and 20.55. The fixed-radius latent explains most of the improvement, while geometry-matched transport gives the best result. Removing tangent projection worsens spherical-slerp from 20.55 to 25.79, and using a unit-radius rather than $\sqrt d$ sphere gives 22.08.

**Training and sampling budgets.** Spherical-slerp reaches FID 30 in about 2.2 times fewer training steps than vanilla-linear in the FLUX.2 B/2 curve. After extending training from 80 to 200 epochs, it remains ahead: 8.35 versus 9.15 at CFG 1.0 and 2.91 versus 3.22 at CFG 1.5. On VA-VAE B/1 it also wins at every tested sampling budget from 20 to 500 function evaluations; the FID gap narrows from 19.84 to 5.30 as the budget increases.

**Controls and tradeoffs.** Decoder-only matched finetuning without projection does not explain the gain: the FLUX.2 vanilla-linear result changes from 26.35 to 26.95. Swapping the vanilla and spherical decoders yields FIDs of 112.17 and 43.17, indicating that the learned flow and decoder are coupled to their latent geometry. Spherical projection increases reconstruction FID relative to the original tokenizer for FLUX.2, VA-VAE, and REPA-E FLUX.1 (0.186 to 1.072, 0.298 to 1.064, and 0.209 to 0.824), even though the generated-image FID improves.

## Limitations

- Evaluation is limited to class-conditional ImageNet at 256 by 256 pixels; the paper does not test text conditioning, higher resolution, or variable aspect ratios.
- The tokenizers have only 16 or 32 channels. More compressed latents may preserve useful information in radius and may not tolerate a fixed-radius projection as well.
- The spherical decoder requires a separate five-epoch finetune, and its reconstruction FID is worse than the original tokenizer's despite similar-looking reconstructions.
- The study fixes pretrained encoders rather than training a sphere-constrained tokenizer end to end.
- Solver comparisons focus on the exponential-map recipe and fixed function-evaluation budgets; adaptive solvers, distillation, and specialized sphere integrators are left open.
- The supplied manuscript states that code and checkpoints will be released but does not provide them, a publication venue, an arXiv identifier, or a DOI.

## Related Concepts

- [[concepts/spherical-latent-flow-matching|Spherical Latent Flow Matching]]: the paper's fixed-radius latent and geodesic transport construction.
- [[concepts/flow-matching|Flow Matching]]: the conditional vector-field regression framework modified by the paper.
- [[concepts/riemannian-representation-learning|Riemannian Representation Learning]]: the broader use of manifold constraints as representation inductive biases.
- [[concepts/diffusion-models|Diffusion Models]]: the latent image-generation family in which the SiT experiments are situated.

## Related Papers

- Chen and Lipman (2023), "Flow Matching on General Geometries": formulates flow matching on Riemannian manifolds and motivates tangent vector fields and geodesic interpolants.
- Davidson et al. (2018), "Hyperspherical Variational Auto-Encoders": learns a sphere-constrained VAE with a von Mises-Fisher distribution rather than projecting an existing pretrained VAE.
- Yao, Yang, and Wang (2025), "Reconstruction vs. Generation: Taming Optimization Dilemma in Latent Diffusion Models": studies why tokenizer reconstruction quality and downstream generation quality can diverge.
- Yu et al. (2024), "Representation Alignment for Generation: Training Diffusion Transformers Is Easier Than You Think": aligns diffusion features to an auxiliary representation encoder during training.
- Leng et al. (2025), "REPA-E: Unlocking VAE for End-to-End Tuning of Latent Diffusion Transformers": supplies one of the tokenizer families evaluated by the paper.

[[index|Library home]]
