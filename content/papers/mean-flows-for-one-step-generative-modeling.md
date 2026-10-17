---
title: Mean Flows for One-step Generative Modeling
type: paper
authors:
  - Zhengyang Geng
  - Mingyang Deng
  - Xingjian Bai
  - J. Zico Kolter
  - Kaiming He
year: null
source_job_id: ce4a2d3d-bcab-4c00-b194-a37285e0e063
tags:
  - generative-models
  - flow-matching
  - one-step-generation
---

## TL;DR

MeanFlow learns the average velocity over a time interval, enabling a single network evaluation to approximate transport from noise to data. A differential identity supplies training targets without integrating trajectories or distilling a teacher. The paper reports ImageNet 256 x 256 FID of 3.43 at one function evaluation and 2.20 at two evaluations with longer training. The generator is trained from scratch, but ImageNet generation uses a pretrained VAE tokenizer.

## Research Question

Can a model learn finite-interval transport directly from instantaneous velocity supervision, allowing one-step generation without teacher distillation or a discretization curriculum?

## Motivation

[[concepts/flow-matching|Flow Matching]] learns instantaneous velocities and numerically integrates them at inference. Even straight sample-conditional interpolations generally induce curved marginal trajectories, so a single Euler step can be inaccurate. MeanFlow instead models [[concepts/average-velocity-fields|Average Velocity Fields]], whose displacement already accounts for an entire interval. The target field is defined independently of the neural network.

## Contributions

- A two-time average velocity field and the MeanFlow identity linking it to instantaneous velocity (Section 4.1).
- A stopped regression target using a Jacobian-vector product (JVP), with ordinary flow matching recovered when the interval vanishes.
- Classifier-free guidance incorporated into the learned field, preserving one network evaluation at sampling (Section 4.2).
- ImageNet and CIFAR-10 evaluations, including ablations of time sampling, loss weighting, conditioning, and JVP tangents.

## Method

The paper uses data at time zero and noise at time one: $z_t=(1-t)x+t\epsilon$, with sample-conditional velocity $v_t=\epsilon-x$. The marginal field is $v(z_t,t)=\mathbb E[v_t\mid z_t]$. Along its ODE trajectories, define

$$
u(z_t,r,t)=\frac{1}{t-r}\int_r^t v(z_\tau,\tau)\,d\tau.
$$

Differentiating $(t-r)u$ with respect to $t$, keeping $r$ fixed, gives

$$
u=v-(t-r)\frac{du}{dt},\qquad
\frac{du}{dt}=D_z u\,v+\partial_t u.
$$

The total derivative is a JVP with tangent $(v,0,1)$ over inputs $(z,r,t)$. Practical training substitutes the sample-conditional velocity and regresses toward

$$
u_{\mathrm{tgt}}=v_t-(t-r)\left(D_z u_\theta\,v_t+\partial_t u_\theta\right),
\qquad
\mathcal L=\mathbb E\left[\|u_\theta-\operatorname{sg}(u_{\mathrm{tgt}})\|_2^2\right].
$$

Stopping gradients through the target avoids differentiating through the JVP during parameter optimization. Adaptive weighting uses $\operatorname{sg}((\|\Delta\|_2^2+c)^{-p})$ for residual $\Delta$, with a small positive $c$. Time pairs are sampled and ordered so $r\le t$, with a specified fraction set to $r=t$. The main ImageNet configurations use 25% unequal pairs and embeddings of $(t,t-r)$.

Sampling uses $z_r=z_t-(t-r)u_\theta(z_t,r,t)$; one-step generation is $z_0=\epsilon-u_\theta(\epsilon,0,1)$. At the exact field level, Appendix B.3 shows the differential identity is sufficient for the integral definition because displacement $(t-r)u$ vanishes at $t=r$ for a regular average velocity field.

For classifier-free guidance, the method defines a guided instantaneous field and learns its induced average velocity. The basic target replaces $v_t$ with $\tilde v_t=\omega v_t+(1-\omega)u_\theta^{\mathrm{cfg}}(z_t,t,t)$, using an unconditional diagonal prediction. Appendix B.1 additionally mixes conditional and unconditional diagonal predictions with coefficient $\kappa$, giving effective guidance scale $\omega'=\omega/(1-\kappa)$. Guidance is learned during training, so inference requires no separate conditional/unconditional combination.

## Experiments

**ImageNet (Table 2).** Class-conditional 256 x 256 generation is evaluated with FID on 50,000 images. DiT-style transformers operate on pretrained VAE latents of size 32 x 32 x 4. Main MeanFlow models train for 240 epochs; XL/2+ trains for 1,000 epochs with revised settings.

| Model | Function evaluations | FID |
| --- | --- | --- |
| iCT-XL/2 | 1 | 34.24 |
| Shortcut-XL/2 | 1 | 10.60 |
| MeanFlow-B/2 | 1 | 6.17 |
| MeanFlow-M/2 | 1 | 5.01 |
| MeanFlow-L/2 | 1 | 3.84 |
| MeanFlow-XL/2 | 1 | 3.43 |
| IMM-XL/2 | 2 (one step with guidance) | 7.77 |
| MeanFlow-XL/2 | 2 | 2.93 |
| MeanFlow-XL/2+ | 2 | 2.20 |

These results improve on the paper's listed one-step diffusion/flow comparators. They do not establish dominance across all generative families: Table 2 includes StyleGAN-XL at 2.30 FID and multistep SiT-XL/2+REPA at 1.42.

**Ablations (Table 1).** For B/4 trained for 80 epochs, ordinary flow matching gives 328.91 FID at one evaluation; using 25% unequal time pairs gives 61.06, versus 67.32 with all pairs unequal. Incorrect JVP tangents worsen FID to 137.96-329.22. Adaptive weighting with $p=1$ gives 61.06 versus 79.75 for unweighted squared error. Guidance scale 3 improves FID to 15.53, while scale 5 worsens it to 20.75. These ablations use a smaller configuration than the headline results.

**CIFAR-10 (Table 3).** Unconditional pixel-space generation with a roughly 55M-parameter U-net achieves 2.92 FID at one evaluation, without EDM preconditioning. This is competitive with sCT at 2.97 and IMM at 3.20, but iCT is better at 2.83. Training uses 800,000 iterations.

**Training overhead (Appendix B.4).** On v4-8 TPUs with the JAX B/4 implementation, MeanFlow takes 0.052 seconds per iteration versus 0.045 for flow matching, about 16% overhead. This is a configuration-specific measurement.

## Limitations

- Evidence covers ImageNet 256 x 256 and CIFAR-10; broader modalities and higher resolutions are not evaluated here.
- The field identity characterizes an exact solution; it does not prove convergence of neural training with sampled, adaptively weighted, stopped targets.
- Training from scratch refers to the generator. ImageNet still depends on a pretrained VAE, and the reported generator NFE does not count separate VAE decoding.
- FID results are point estimates without reported uncertainty intervals. The best two-evaluation result uses substantially longer training and different settings.
- The supplied source contains numerical inconsistencies: SiT-XL/2 FID is 2.15 in Section 5.2 but 2.06 in Table 2; M/2 parameters are 308M in Table 2 but 497.8M in Table 4. Neither disputed value is used for quantitative conclusions here.
- The supplied Markdown states no publication year, venue, DOI, or arXiv identifier for this paper. The year is left null rather than inferred from its references.

## Related Concepts

- [[concepts/average-velocity-fields|Average Velocity Fields]]: finite-interval transport and the MeanFlow identity.
- [[concepts/flow-matching|Flow Matching]]: instantaneous velocity supervision and the zero-interval special case.
- [[concepts/diffusion-models|Diffusion Models]]: related iterative generators and consistency-model baselines.
- [[concepts/normalizing-flows|Normalizing Flows]]: the broader continuous transport perspective.

## Related Papers

- Boffi, Albergo, and Vanden-Eijnden (2024), "Flow Map Matching": cited two-time transport formulation based on flow maps.
- Frans et al. (2025), "One Step Diffusion via Shortcut Models": cited comparator using explicit interval self-consistency.
- Zhou, Ermon, and Song (2025), "Inductive Moment Matching": cited one-step comparator whose guided ImageNet result uses two evaluations.
- [[papers/generative-modeling-via-drifting|Generative Modeling via Drifting]]: a thematic library connection using distribution-dependent training updates for one-pass generation; not a citation in this source.
- [[papers/one-step-generative-modeling-via-wasserstein-gradient-flows|One-Step Generative Modeling via Wasserstein Gradient Flows]]: another library connection using distributional training dynamics rather than average velocity along a sampling trajectory; not cited here.

[[index|Library home]]
