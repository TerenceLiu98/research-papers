---
title: One-Step Generative Modeling via Wasserstein Gradient Flows
type: paper
authors:
  - Jiaqi Han
  - Puheng Li
  - Qiushan Guo
  - Renyuan Xu
  - Stefano Ermon
  - "Emmanuel J. Cand\u00e8s"
year: null
source_job_id: aef15256-cc52-4d5a-a97d-c74ab7f6047f
project_url: https://hanjq17.github.io/W-Flow/
tags:
  - generative-models
  - optimal-transport
  - wasserstein-gradient-flows
  - image-generation
---

## TL;DR

W-Flow trains a static one-step generator to imitate particle updates prescribed by a Wasserstein gradient flow of the Sinkhorn divergence. Two independent generated batches estimate self-transport, and guidance acts on the velocity field. The paper reports ImageNet 256 x 256 FID of 1.29 with one generator evaluation, plus improved minority-mode coverage and facial age transfer relative to Drifting Model in the tested settings. Its convergence theorem concerns idealized particle dynamics over finite time intervals, not convergence of finite neural-network training to the data distribution.

## Research Question

Can a distribution-level energy functional prescribe useful training dynamics for a one-step generator, combining efficient inference with stable transport and improved distribution coverage?

## Motivation

Iterative sampling in [[concepts/diffusion-models|Diffusion Models]] and [[concepts/flow-matching|Flow Matching]] can be expensive. Direct generators avoid that sampling cost, but adversarial objectives or handcrafted attractive and repulsive fields introduce other difficulties. W-Flow uses [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]] to specify how the generated distribution should evolve during training, then fits those local updates into a fixed-size network.

## Contributions

- A framework separating distributional training dynamics from the static generator used at inference (Section 3.1).
- A [[concepts/sinkhorn-divergence|Sinkhorn Divergence]] velocity computed from generated-to-real and generated-to-generated transport plans, with independent batches for self-transport (Sections 3.2-3.3).
- Velocity-based classifier-free guidance and a regression loss that avoids differentiating through the transport solver (Section 3.4).
- A finite-particle approximation theorem, ImageNet scaling experiments, and toy and FFHQ evaluations of transport and mode coverage.

## Method

**Distributional dynamics.** Let $q_\theta=(f_\theta)_\#p_{\mathrm{ref}}$ be the generator's output law. For an energy $\mathcal F(q)$, the prescribed evolution is

$$
\partial_t q_t+\nabla\cdot(q_tV_t)=0,
\qquad V_t=-\nabla\frac{\delta\mathcal F}{\delta q}(q_t).
$$

The paper uses $\mathcal F(q)=S_\varepsilon(q,p)$, where $p$ is the data law and

$$
S_\varepsilon(q,p)=\mathrm{OT}_\varepsilon(q,p)
-\tfrac12\mathrm{OT}_\varepsilon(q,q)
-\tfrac12\mathrm{OT}_\varepsilon(p,p).
$$

Here entropic [[concepts/optimal-transport|Optimal Transport]] uses quadratic cost $\|x-y\|^2/2$. If $T^\varepsilon_{q,p}(x)$ is the conditional barycenter of the optimal coupling, the induced velocity is

$$
V^\varepsilon_{q,p}(x)=T^\varepsilon_{q,p}(x)-T^\varepsilon_{q,q}(x).
$$

**Particle regression.** At each iteration, draw real samples and two independent generated batches. Sinkhorn scaling approximates the real-data coupling and the coupling between generated batches. Independent batches avoid the zero-cost self-matches that dominate a same-batch estimate. Given $x_i=f_\theta(z_i)$, optimize

$$
\mathcal L(\theta)=\frac1N\sum_i
\left\|x_i-\operatorname{sg}\left(x_i+\eta\widehat V^\varepsilon(x_i)\right)\right\|^2.
$$

The stopped target makes the transport plan an update oracle. In the ImageNet implementation, multiple pretrained latent-MAE feature maps supply the spaces in which velocities and regression losses are computed; gradients pass through these feature maps to the generator. Sampling evaluates the trained generator once and decodes its latent output.

**Guidance.** For class $c$ and scale $w$, velocity guidance adds $w(T^\varepsilon_{q,p(\cdot\mid c)}-T^\varepsilon_{q,p(\cdot\mid\varnothing)})$ to the conditional velocity. The scale is an input to the generator during training. Appendix A.3 derives an exponentially tilted target for this construction under a KL energy. For Sinkhorn divergence, that closed-form target is generally unavailable; the KL derivation motivates the analogous design.

**Theory.** Theorem B.4 bounds the finite-time $W_2$ discrepancy between idealized Euler particle dynamics and the population continuity equation by initial empirical error, target empirical error, and a term proportional to step size. Under Lipschitz and growth assumptions, the discrepancy vanishes almost surely as particle counts grow and step size shrinks. Proposition B.7 verifies the required estimates for Sinkhorn dynamics with bounded initial and target supports, over each finite time horizon. The theorem does not account for all errors introduced by neural regression, feature-space training, stochastic batch refreshes, or truncated Sinkhorn iteration.

## Experiments

**ImageNet (Table 3).** Class-conditional generation at 256 x 256 uses FID on 50,000 generated images and guidance where applicable. Generators are trained without teacher distillation, but rely on pretrained encoders and decoders. Parameter counts below separate generator and decoder.

| Model | Generator + decoder | Generator evaluations | FID |
| --- | --- | --- | --- |
| W-Flow B/2 | 133M + 49M | 1 | 1.52 |
| W-Flow L/2 | 463M + 49M | 1 | 1.35 |
| W-Flow XL/2 | 679M + 49M | 1 | 1.29 |
| Drifting Model B/2 | 133M + 49M | 1 | 1.75 |
| Drifting Model L/2 | 463M + 49M | 1 | 1.54 |
| iMeanFlow XL/2 | 610M + 49M | 1 | 1.72 |
| LightningDiT XL/2 | 675M + 70M | 250 x 2 | 1.35 |
| RAE + DiT-DH XL/2 | 839M + 415M | 50 x 2 | 1.13 |

The authors' state-of-the-art claim concerns the one-step comparisons reported in the paper. The multi-step RAE model has a lower FID.

**Ablations (Tables 2, 7-8).** With a B/2 backbone trained for 100 epochs, distribution-guided FID is 8.46 for Drifting, 10.40 for MMD, 10.17 for KL, and 7.29 for Sinkhorn. Velocity guidance improves Sinkhorn to 7.08 and KL to 7.68. For quadratic-cost Sinkhorn, same-batch self-transport gives 17.57, diagonal masking gives 7.45, and two independent batches give 7.08. Under distribution guidance, increasing Sinkhorn iterations from 1 to 10 improves FID from 7.92 to 7.29; 20 iterations gives 7.33.

**Configuration differences (Table 5).** Main models train for 1,280 epochs with effective batch size 8,192. B/2 uses 10 Sinkhorn iterations and $\varepsilon=0.05$; L/2 uses one iteration and $\varepsilon=0.05$; XL/2 uses one iteration and $\varepsilon=0.01$. Thus the large-model results do not all use the ablation defaults or exact optimal couplings.

**Throughput (Appendix D, Table 6).** On one H100 with batch size four, including latent preparation and VAE decoding, B/2, L/2, and XL/2 generate 107.76, 84.88, and 77.88 images/s. SiT-XL/2 generates 0.93 images/s and LightningDiT-XL/2 1.14 images/s, both with 250 sampling steps and guidance. Reported speedups over SiT are 115.87x, 91.27x, and 83.74x, respectively. These measurements depend on the stated hardware, batch size, and sampler settings.

**Transfer and coverage (Section 4.3).** A four-layer MLP operates in a pretrained ALAE's 512-dimensional FFHQ latent space. Senior-to-young-adult transfer uses ages 55-100 and 18-30, with identity-initialized residual mapping. Latent-distance histograms over 2,000 source images and visual examples favor W-Flow over Drifting. A separate generation task uses targets with 95% senior and 5% child faces; PCA plots and generated examples show better minority coverage for W-Flow. These diagnostics and an imbalanced Gaussian-mixture experiment support the reported behavior in the tested distributions, rather than a general guarantee against mode collapse.

## Limitations

- Evaluation is limited to ImageNet 256 x 256, FFHQ, and toy distributions. Higher-resolution, text-conditioned, video, and broader multimodal generation remain future work (Appendix G).
- Large-scale results depend on pretrained feature encoders and autoencoders; the choice of feature space is heuristic.
- Finite-time consistency of ideal particle dynamics does not prove that practical neural training converges globally to the target. The cited global-convergence result concerns Gaussian distributional assumptions; it should not be generalized to arbitrary image distributions.
- FID tables provide point estimates without uncertainty intervals. Facial identity preservation is supported by latent distances and visual comparisons, not a reported identity-recognition benchmark.
- Section 4.2 states that 384-epoch W-Flow approximately matches 1,280-epoch Drifting, but the supplied Table 4's row spans label the 384-epoch row ambiguously. That row is not silently reassigned here.
- The supplied Markdown has damaged mathematical notation and ends with an image after Appendix G. It states no publication year, venue, DOI, or arXiv identifier for this paper; `year` is therefore null. The [project page](https://hanjq17.github.io/W-Flow/) is source-listed and was not independently checked.

## Related Concepts

- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]: distributional steepest descent and particle approximation.
- [[concepts/sinkhorn-divergence|Sinkhorn Divergence]]: the debiased entropic transport energy.
- [[concepts/optimal-transport|Optimal Transport]]: globally constrained batch couplings and barycentric projections.
- [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]]: an alternative energy evaluated in the ablations.
- [[concepts/flow-matching|Flow Matching]] and [[concepts/diffusion-models|Diffusion Models]]: related generative formulations and sampling comparators.

## Related Papers

- Deng et al. (2026), "Generative Modeling via Drifting," arXiv:2602.04770: direct baseline and source of the generator architecture and pretrained feature encoders.
- He et al. (2026), "Sinkhorn-Drifting Generative Models," arXiv:2603.12366: concurrent work with a closely related Sinkhorn field. W-Flow emphasizes particle-dynamics analysis and large-scale training, so Sinkhorn-based drifting is not presented as exclusive to this paper.
- Feydy et al. (2019), "Interpolating between Optimal Transport and MMD using Sinkhorn Divergences": foundation for the energy construction.
- Hardion and Lacombe (2026), "The Wasserstein Gradient Flow of the Sinkhorn Divergence between Gaussian Distributions," arXiv:2602.10726: the cited Gaussian-case convergence result.
- [[papers/the-earth-moves-but-so-does-the-bias-systematic-upward-bias-of-the-wasserstein-earth-movers-distance-and-permutation-based-null-calibration|The Earth Moves, But So Does the Bias]]: a thematic library connection, not a citation in W-Flow. Its distinction between entropic bias and empirical sampling bias helps clarify what Sinkhorn debiasing corrects.

[[index|Library home]]
