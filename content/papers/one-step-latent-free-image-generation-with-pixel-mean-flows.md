---
title: One-step Latent-free Image Generation with Pixel Mean Flows
type: paper
authors:
  - Yiyang Lu
  - Susie Lu
  - Qiao Sun
  - Hanhong Zhao
  - Zhicheng Jiang
  - Xianbang Wang
  - Tianhong Li
  - Zhengyang Geng
  - Kaiming He
year: null
source_job_id: 7390b4e6-4d05-4b75-b934-77a4b9b0d765
tags:
  - generative-models
  - flow-matching
  - one-step-generation
  - pixel-space-generation
---

## TL;DR

Pixel MeanFlow (pMF) performs one-step image generation directly in pixel space by separating what the network predicts from where its loss is evaluated. The network outputs a denoised-image-like quantity, which is converted into an average velocity and trained with an improved MeanFlow velocity loss. On class-conditional ImageNet, the paper reports 2.22 FID at 256 x 256 and 2.48 FID at 512 x 512, both with one function evaluation and no latent tokenizer.

## Research Question

Can a diffusion- or flow-based model generate high-resolution images from noise in one network evaluation, without relying on a pretrained latent tokenizer, by choosing a prediction target that remains learnable in the high-dimensional pixel space?

## Motivation

Few-step generation asks one network to summarize a long transport interval, while pixel-space generation asks it to model raw high-dimensional observations without a tokenizer. Combining the two makes direct prediction of a noisy velocity field difficult for finite-capacity networks. The paper builds on [[concepts/average-velocity-fields|Average Velocity Fields]] and the clean-target parameterization used in pixel-space [[concepts/flow-matching|Flow Matching]], arguing that a denoised-image output should lie closer to a low-dimensional image manifold than an average velocity does.

## Contributions

- Defines a generalized denoised-image field indexed by the MeanFlow interval endpoints and uses it as the network's direct output.
- Separates prediction and loss spaces through the conversion from clean-image prediction to average velocity and then to an instantaneous-velocity training target.
- Shows in a projected Swiss-roll experiment and ImageNet ablations that clean-image prediction is substantially easier than direct average-velocity prediction as observation dimension grows.
- Makes pixel-space perceptual losses directly applicable to the one-step generator and demonstrates large empirical gains from VGG- and ConvNeXt-based losses.
- Reports competitive one-evaluation ImageNet generation at 256 x 256 and 512 x 512, with a fixed transformer sequence length across resolutions.

## Method

The construction uses the linear interpolation $z_t=(1-t)x+t\epsilon$, with data at time zero and noise at time one. For the finite-interval average velocity $u(z_t,r,t)$, pMF defines

$$
\mathbf{x}(\mathbf{z}_t,r,t)=\mathbf{z}_t-t\,\mathbf{u}(\mathbf{z}_t,r,t).
$$

At $r=t$, this reduces to the usual denoised-image target associated with instantaneous flow matching. At $r=0$, it equals the clean endpoint of the exact ODE trajectory. For intermediate $r$, the paper does not prove that the field lies on the data manifold, but simulations show clean or blurred image-like outputs rather than noisy velocity-like quantities.

The network directly predicts $x_\theta(z_t,r,t)$ and converts it to

$$
u_\theta(z_t,r,t)=\frac{z_t-x_\theta(z_t,r,t)}{t}.
$$

Following improved MeanFlow, a Jacobian-vector product forms $V_\theta=u_\theta+(t-r)\operatorname{JVP}_{\mathrm{sg}}$, and training regresses $V_\theta$ toward the sample-conditional instantaneous velocity $\epsilon-x$. Thus the architecture uses clean-image prediction while the principal objective remains in velocity space. An auxiliary perceptual loss compares the predicted image with the clean target below a noise threshold. The implementation uses DiT-like transformers, Muon optimization, full-region sampling over $0\le r\le t$, and training-time classifier-free guidance conditioning.

## Experiments

**Prediction target.** On a Swiss-roll distribution projected from two dimensions into observation spaces as large as 512 dimensions, clean-image prediction remains effective while direct average-velocity prediction degrades. On ImageNet 256 x 256 with 16 x 16 patches, direct average-velocity prediction gives 164.89 FID versus 9.56 for clean-image prediction under the matched MSE ablation. At 64 x 64, where patch dimension is only 48, the two targets are nearly tied at 3.80 and 3.82.

**Design ablations.** For pMF-B/16 at 256 x 256, VGG LPIPS improves FID from 9.56 to 5.62, and adding the ConvNeXt-V2 variant improves it to 3.53. Preconditioned alternatives give 13.81-34.61 FID versus 3.53 without preconditioning. Restricting time samples to $r=t$, $r=0$, or both gives 194.53, 389.28, and 106.59 FID; sampling the full triangular region gives 3.53. Muon reaches 8.71 FID after 320 epochs in the reported training curve, versus 11.86 for Adam.

**Resolution and scaling.** With a fixed $16^2$ token sequence, the B model reports FID 3.53, 4.06, and 4.58 at 256, 512, and 1024 resolution after 160 epochs, despite patch dimensions increasing from 768 to 12,288. At 256 x 256, scaling from B to H and training longer improves FID from 3.53 to 2.22.

**System comparisons.** The final pMF-H models report 2.22 FID and 268.8 IS at 256 x 256 with 271 Gflops, and 2.48 FID and 284.9 IS at 512 x 512 with 272 Gflops. These are one-evaluation, pixel-space results trained without distillation. The comparison tables also contain stronger FID values from several multistep or latent-space systems, so the result establishes competitiveness within a constrained generation regime rather than overall state of the art.

## Limitations

- The generalized manifold claim for intermediate interval endpoints is supported by visualization and downstream performance, not a dimensionality theorem or direct manifold measurement.
- Evaluation is limited to class-conditional ImageNet and FID/IS; the paper does not test text conditioning, other datasets, human preference, memorization, or robustness.
- The strongest results require large models, long training, TPU infrastructure, Muon optimization, perceptual networks, and tuned classifier-free guidance; training cost is not compared comprehensively.
- Most ablations use the smaller 160-epoch B/16 setting, so their interactions with the final H models are not established.
- FID and IS are reported as point estimates without uncertainty intervals.
- The source does not provide this paper's publication year, venue, DOI, arXiv identifier, or code repository; these are left unspecified rather than inferred.

## Related Concepts

- [[concepts/average-velocity-fields|Average Velocity Fields]]: finite-interval transport, the MeanFlow identity, and the generalized denoised-image parameterization.
- [[concepts/flow-matching|Flow Matching]]: supplies the linear probability path and instantaneous velocity regression target.
- [[concepts/diffusion-models|Diffusion Models]]: the broader iterative generative-model family whose sampling steps pMF seeks to remove.

## Related Papers

- [[papers/mean-flows-for-one-step-generative-modeling|Mean Flows for One-step Generative Modeling]]: introduces the finite-interval average velocity and one-step sampling formulation on which pMF builds.
- Geng et al. (2025), "Improved Mean Flows: On the Challenges of Fast-forward Generative Models": supplies the velocity-space objective and JVP formulation used by pMF; cited as arXiv:2512.02012.
- Li and He (2025), "Back to Basics: Let Denoising Generative Models Denoise": supplies the pixel-space clean-image prediction strategy; cited as arXiv:2511.13720.
- [[papers/there-is-no-vae-end-to-end-pixel-space-generative-modeling-via-self-supervised-pre-training|There is No VAE: End-to-End Pixel-Space Generative Modeling via Self-Supervised Pre-Training]]: the EPG pixel-space baseline listed in the paper's one-evaluation comparison.
- Song et al. (2023), "Consistency Models": cited one-step approach that maps noisy states toward endpoints but uses a different training formulation and commonly a preconditioned output.

[[index|Library home]]
