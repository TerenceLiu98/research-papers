---
title: Generative Modeling via Drifting
type: paper
authors:
  - Mingyang Deng
  - He Li
  - Tianhong Li
  - Yilun Du
  - Kaiming He
year: null
source_job_id: 37f32050-a2c4-40e6-b216-90380c26cad8
tags:
  - generative-models
  - drifting-models
  - image-generation
  - one-step-generation
---

## TL;DR

Drifting Models train a noise-to-data generator by regressing its outputs toward stopped targets defined by an attraction-repulsion field. Distributional evolution occurs through parameter updates during training, allowing one generator evaluation at inference. The paper reports ImageNet 256 x 256 FID of 1.54 in latent space and 1.61 in pixel space. These image results require pretrained feature encoders during training; the equilibrium construction does not establish general convergence to the data distribution.

## Research Question

Can a generator learn a single-pass pushforward map by following a distribution-dependent drifting field during training, without distilling a diffusion teacher or integrating a learned trajectory at inference?

## Motivation

Diffusion and flow generators commonly spend multiple network evaluations transporting noise into data. Drifting instead uses the iterations already present in neural-network optimization to evolve the generated distribution. Unlike adversarial training, it supplies an explicit sample-interaction field; unlike normalizing flows, it does not require an invertible architecture or tractable Jacobian.

## Contributions

- A fixed-point training objective for a static generator, with an antisymmetric drifting field that vanishes when generated and target distributions match.
- A kernelized attraction-repulsion implementation with feature-space losses, normalization, and guidance incorporated during training.
- ImageNet experiments with one-step latent and pixel generators, plus a one-step action generator evaluated against Diffusion Policy.
- An analysis of the relationship to MMD gradients and a conditional identifiability argument for zero-drift equilibria.

## Method

Let $x=f_\theta(\epsilon)$ for prior noise $\epsilon\sim p_\epsilon$, and let $q_\theta=(f_\theta)_\#p_\epsilon$. For target distribution $p$, training uses the stopped-target objective (Equation 6)

$$
\mathcal L=\mathbb E_\epsilon\left[\left\|f_\theta(\epsilon)-\operatorname{sg}\left(f_\theta(\epsilon)+V_{p,q_\theta}(f_\theta(\epsilon))\right)\right\|^2\right].
$$

Its numerical value equals the expected squared drift, but differentiation treats the entire target as fixed. Thus the output gradient is $-2V(x)$; this is not ordinary differentiation through the squared norm of a parameter-dependent field.

The main field subtracts two normalized mean-shift vectors (Equations 8-12):

$$
V_{p,q}(x)=\frac{\mathbb E_{y\sim p}[k(x,y)(y-x)]}{\mathbb E_{y\sim p}[k(x,y)]}
-\frac{\mathbb E_{y\sim q}[k(x,y)(y-x)]}{\mathbb E_{y\sim q}[k(x,y)]},
\qquad k(x,y)=\exp(-\|x-y\|_2/\tau).
$$

Real examples attract generated samples, while generated examples repel them. Swapping $p$ and $q$ reverses the field, implying $p=q\Rightarrow V=0$. Mini-batches estimate the expectations; generated samples also serve as negatives, with self-interactions masked. The practical implementation adds normalization over both sample axes.

For images, losses operate on multiple scales and locations of a pretrained encoder $\phi$: the target becomes $\operatorname{sg}(\phi(x)+V(\phi(x)))$. Gradients propagate through the feature encoder to the generator. Feature and drift normalization balance scales, with temperatures 0.02, 0.05, and 0.2. The latent generator uses SD-VAE latents and a ResNet-style MAE encoder; the final pixel configuration combines MAE and ConvNeXt-V2 features. The strongest encoders include classification fine-tuning. Encoders are unnecessary at inference, although latent generation still requires VAE decoding.

Guidance mixes unconditional real data into the negative distribution, $\tilde q=(1-\gamma)q_\theta(\cdot\mid c)+\gamma p_{\mathrm{data}}(\cdot\mid\varnothing)$. The generator is conditioned on $\alpha=1/(1-\gamma)$, so guidance strength can vary at inference without a second generator evaluation. The formal equilibrium yields a conditional-minus-unconditional density combination; this is the paper's guidance construction, not a general guarantee of an attainable nonnegative target for every scale.

Appendix C.2 relates MMD gradients to an attraction-repulsion field. Drifting's field-first formulation additionally supports normalized kernels and drift rescaling. The authors report unsuccessful attempts to obtain reasonable results with their MMD framework, without establishing a general failure of MMD generative modeling.

## Experiments

**ImageNet (Tables 4-6).** FID is evaluated on 50,000 generated images at 256 x 256 resolution. All four models below use one generator evaluation; latent parameter counts include a separate 49M-parameter decoder.

| Generator | Space | Parameters | Training epochs | FID | IS |
| --- | --- | --- | --- | --- | --- |
| B/2 | SD-VAE latent | 133M + 49M | 1,280 | 1.75 | 263.2 |
| L/2 | SD-VAE latent | 463M + 49M | 1,280 | 1.54 | 258.9 |
| B/16 | Pixel | 134M | 640 | 1.76 | 299.7 |
| L/16 | Pixel | 464M | 640 | 1.61 | 307.5 |

The latent L/2 result improves on the listed one-step iMeanFlow result of 1.72 FID, while some multistep systems score better, including RAE+DiT at 1.13. Pixel L/16 improves on the listed one-step StyleGAN-XL result of 2.30; its 1.61 matches PixelDiT and remains above the listed multistep SiD2 UViT/1 result of 1.38. These are the paper's system comparisons, not controlled comparisons of training cost. Latent L/2 achieves its best FID at guidance scale 1.0; larger guidance trades improved IS against worse FID.

**Ablations (Tables 1-3, 9, 11).** At the B/2, 100-epoch default, the balanced field gives FID 8.46. Scaling attraction by 1.5 worsens it to 41.05, scaling repulsion by 1.5 gives 46.28, and attraction alone gives 177.14. Increasing positive examples per class from 1 to 64 improves FID from 20.43 to 8.46 with 64 negatives. A stronger latent-MAE encoder followed by classification fine-tuning improves the default's 8.46 to 3.36. For pixel generation, the strongest MAE alone gives 9.35, and adding ConvNeXt-V2 features improves it to 3.70. Dual-axis kernel normalization gives 8.46 versus 8.92 for normalization over the reference-sample axis alone.

**Robotics (Table 7).** A one-step Drifting Policy replaces the 100-step generator in Diffusion Policy, using raw control representations without a feature encoder. Success rates average the last ten checkpoints. Results are mixed: state ToolHang improves from 0.30 to 0.38 and BlockPush phase 2 from 0.11 to 0.16, but visual ToolHang falls from 0.73 to 0.67, state PushT from 0.91 to 0.86, and Kitchen phase 4 from 0.99 to 0.96. The table supports competitive performance with fewer generator evaluations, not uniform task dominance or a measured 100-fold latency improvement.

**Diagnostics.** Toy distributions recover multiple modes from several initializations, including a collapsed initialization. CLIP nearest-neighbor visualizations show generated examples distinct from retrieved training images; these are qualitative diagnostics rather than comprehensive memorization tests.

## Limitations

- Antisymmetry proves that matching distributions is an equilibrium, not that every equilibrium matches or that optimization converges. Appendix C.1 assumes full support, a finite-dimensional density expansion, and linearly independent kernel interactions at sufficiently diverse probes. Its extension to approximate matching is an identifiability heuristic.
- The authors could not make ImageNet generation work without a feature encoder, even with a latent VAE. Matching selected feature distributions does not alone prove equality of raw image distributions.
- One-step inference does not imply inexpensive training: the strongest results use substantial generator training and pretrained, classification-fine-tuned feature encoders. NFE excludes separate latent decoding.
- The supplied Markdown contains damaged notation and inconsistent table entries: Table 2's caption describes batch size using positives, whereas the method and Table 8 define it using generated negatives; Table 8 lists latent-sized generator inputs for pixel models despite the explicit pixel-space description. The summary uses the stated method and unambiguous results.
- The supplied source states no publication year, venue, DOI, or arXiv identifier for this paper. `year` is left null rather than inferred from reference dates.

## Related Concepts

- [[concepts/drifting-models|Drifting Models]]: distribution-dependent targets for training a static generator.
- [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]]: kernel discrepancy whose gradients yield a related field.
- [[concepts/flow-matching|Flow Matching]]: learns transport dynamics, providing a contrasting route to generation.
- [[concepts/diffusion-models|Diffusion Models]]: iterative generation and the source of the Diffusion Policy comparator.
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]: related distributional evolution with an explicitly specified energy and geometry.

## Related Papers

- [[papers/one-step-generative-modeling-via-wasserstein-gradient-flows|One-Step Generative Modeling via Wasserstein Gradient Flows]]: an existing library connection that uses Drifting as a baseline and develops Sinkhorn-driven training. It is not cited in the supplied Drifting paper.
- Geng et al. (2025), "Improved Mean Flows: On the Challenges of Fastforward Generative Models": the one-step image comparator, cited as arXiv:2512.02012.
- Chi et al. (2023), "Diffusion Policy: Visuomotor Policy Learning via Action Diffusion": supplies the robotics protocol and baseline.
- Li, Swersky, and Zemel (2015), "Generative Moment Matching Networks," and Dziugaite, Roy, and Ghahramani (2015), "Training Generative Neural Networks via Maximum Mean Discrepancy Optimization": the MMD approaches discussed in Appendix C.2.

[[index|Library home]]
