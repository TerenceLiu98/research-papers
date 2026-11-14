---
title: Scaling Transformer Energy-Based Models for High Quality Image Synthesis
type: paper
authors:
  - Jungsoo Lee
  - Alexi Gladstone
  - Yilun Du
year: null
source_job_id: "88204d90-4ea4-4d0b-ac82-56e8b8c8d703"
tags:
  - energy-based-models
  - image-generation
  - transformers
---

## TL;DR

Transformer Energy-Based Models (TEM) combine a latent-space Transformer, summed intermediate energy heads, and positive-only representation supervision to scale contrastive energy learning to ImageNet. TEM-XL reports FID-50K of 3.82 at 256×256 and 8.24 at 512×512 without classifier-free guidance, using 60-step persistent sampling. More sampling improves fidelity only up to a diversity trade-off.

## Research Question

Can an explicit scalar energy model trained with its own MCMC negatives generate high-resolution images while retaining compositional generation, inpainting, and energy-based out-of-distribution scoring?

## Motivation

High-dimensional MCMC and unstable deep energy architectures have limited contrastive EBMs. Moving learning into pretrained VAE latents reduces sampling dimensionality, while dense representation supervision supplements the weak scalar energy signal.

## Contributions

- A Transformer energy function sums heads at multiple depths to combine complementary constraints.
- Positive Representation Alignment (PRA) aligns real-image representations with a frozen vision foundation model without aligning generated negatives.
- ImageNet generation, CLEVR composition, zero-shot inpainting, and OOD experiments demonstrate several uses of the same energy formulation.

## Method

A frozen Stable Diffusion VAE maps 256×256 images into 32×32×4 latents. A class-conditioned Transformer uses rotary embeddings, query-key normalization, SwiGLU, and adaptive normalization. Three energy heads at different depths contribute to the scalar energy.

Training lowers real-data energies and raises sampled-negative energies, with squared-energy regularization. A sampler-matching loss encourages low-energy, diverse outputs, differentiating only through the final sampling step. Its nearest-neighbor entropy surrogate is a diversity regularizer, not an accurate entropy estimate. PRA aligns projected intermediate positive features with DINOv2-L patch features through cosine similarity.

Langevin-style updates use independently tuned step size and noise, so finite chains are biased approximations to equilibrium sampling. Training uses 40 updates, a 16,000-entry replay buffer, and replay probability 0.99. The standard recipe uses 50,000 training iterations and batch size 256. Evaluation initializes the first 5,000 chains from Gaussian noise, then continues from buffered step-40 states; each output takes 60 additional steps in the main benchmark. These are persistent-chain results, not independent fresh-noise generations for every image (Appendix B).

Summing class-conditioned energies implements product-distribution composition. Inpainting updates missing latents while restoring observed latents after each step. Class-label dropout enables an unconditional energy branch for single-pass OOD scoring.

## Experiments

| Setting | Reported result |
| --- | --- |
| ImageNet 256×256, TEM-XL, 609M parameters | FID-50K 3.82, no classifier-free guidance |
| ImageNet 512×512, TEM-XL | FID-50K 8.24, no classifier-free guidance |
| TEM-B, no alignment / positive-and-negative alignment / PRA | FID 42.8 / 36.6 / 19.9 at 50K iterations |
| TEM-B, one / two / three energy heads, full loss | FID 20.95 / 20.50 / 19.86 |
| CLEVR, one / two / three objects | Detection success 0.956 / 0.766 / 0.274 |
| OOD mean AUROC across four datasets | 0.717 versus DiT 0.598 |

Table 1 compares TEM with published baseline results: unguided SiT+REPA has FID 5.90, but its guided result is 1.42. The comparison therefore supports strong unguided performance rather than overall superiority to guided diffusion.

At 40, 60, and 80 inference steps, TEM-XL FID is 7.63, 3.82, and 4.72; precision rises from 0.65 to 0.81 while recall falls from 0.65 to 0.51 (Table 4). Additional compute does not monotonically improve FID.

CLEVR evaluation uses 1,000 scenes per composition count. TEM generates at 256×256 and is downsampled for a shared 128×128 classifier; Composable Diffusion generates at 128×128 and scores 0.863 / 0.598 / 0.262. OOD gains are not uniform: TEM scores 0.636 on Places365 versus DiT's 0.669 (Table 2). Inpainting evidence is qualitative.

Appendix C reports roughly six days on four H200 GPUs for TEM-XL training and one hour on one H200 for 50K samples. Its estimated sampling cost is 14.48 TFLOPs per image versus 29.66 for the reported 250-step unguided DiT setup; an energy step requires an input-gradient computation, so step counts alone are not comparable.

## Limitations

Iterative negative sampling remains costly. Longer inference trajectories can concentrate on modes and reduce coverage. Finite-chain sampling, truncated sampler differentiation, and the entropy surrogate do not establish exact likelihood learning. Published baseline numbers and different CLEVR generation resolutions constrain direct comparisons; accelerated diffusion solvers are not covered by the main cost table. The supplied manuscript does not state its publication year or a stable identifier, so these are not inferred from cited works.

## Related Concepts

- [[concepts/positive-representation-alignment|Positive Representation Alignment]]
- [[concepts/inference-time-energy-minimization|Inference-Time Energy Minimization]]
- [[concepts/joint-energy-based-models|Joint Energy-Based Models]]
- [[concepts/diffusion-models|Diffusion Models]]

## Related Papers

- [[papers/energy-based-transformers-are-scalable-learners-and-thinkers|Energy-Based Transformers are Scalable Learners and Thinkers]]: cited as learning energies through reconstruction losses over unrolled optimization; TEM instead uses contrastive learning with its own negatives.
- [[papers/your-classifier-is-secretly-an-energy-based-model-and-you-should-treat-it-like-one|Your Classifier is Secretly an Energy Based Model and You Should Treat It Like One]]: cited precedent for connecting energy modeling and discriminative capabilities.

[[index|Library home]]
