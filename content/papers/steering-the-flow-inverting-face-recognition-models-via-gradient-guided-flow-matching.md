---
title: "Steering the Flow: Inverting Face Recognition Models via Gradient-Guided Flow Matching"
type: paper
authors:
  - Ye Lu
  - Shen Wang
  - Zhaoyang Zhang
  - Yihan Yan
  - Li Liu
  - Runze Liu
  - Fanghui Sun
year: 2026
tags:
  - model-inversion
  - flow-matching
  - face-recognition
  - privacy
  - adversarial-attacks
---

## TL;DR

Steering Flow Model Inversion (SFMI) treats white-box face [[concepts/model-inversion-attacks|Model Inversion Attacks]] as guided integration through an unconditional [[concepts/flow-matching|Flow Matching]] prior. At every sampling step, it predicts a clean face, backpropagates a target-identity margin loss through both the frozen recognition model and the flow prior, normalizes that gradient to the current velocity scale, and injects it according to a four-phase schedule. Under the paper's identity-disjoint cross-evaluation protocol, SFMI has the highest attack accuracy and lowest LPIPS of the six evaluated attacks on all six target models, while its FID is best on one target and competitive on the others.

## Research Question

Can white-box inversion of face-recognition models be made more stable by steering a deterministic generative ODE with target-model gradients instead of optimizing through a GAN latent space or following a diffusion trajectory?

## Motivation

Pixel-space inversion is ill-posed and prone to adversarial-looking local optima. GAN priors constrain reconstruction to a face manifold, but their nonlinear latent-to-image maps can make optimization unstable. The paper argues that stochastic diffusion sampling can likewise deflect identity guidance and that existing diffusion attacks either require target-specific prior tuning or lack progressive correction from the target model. A reusable unconditional flow prior offers a smooth ODE trajectory on which target-specific feedback can act during sampling.

## Contributions

- Introduces SFMI, a two-stage white-box attack that first trains an unconditional face flow-matching prior on public identity-disjoint data and then steers its sampling trajectory toward a target identity.
- Defines a Progressive Guidance Scheduler (PGS) with warm-up, sustain, cosine-decay, and relaxation phases, limiting early disruption and reserving the last phase for unguided face-manifold refinement.
- Backpropagates a max-margin identity loss through the frozen target classifier and the prior's clean-image prediction, then normalizes the gradient to the flow velocity norm before injection.
- Uses a second-order Heun-style predictor-corrector update, omitting the final corrector, for 99 network evaluations in the default 50-step attack.
- Evaluates six face-recognition targets with identity-disjoint public and private data and independent cross-model evaluators, including architecture, prior, scheduler, loss, resolution, sensitivity, and defense studies.

## Method

The first stage trains an unconditional flow prior on public faces. For clean face $x_1$, Gaussian noise $x_0$, and a time sampled from a logit-normal distribution, the training state follows the straight interpolation

$$
x_t=(1-t)x_0+tx_1.
$$

The network predicts a clean endpoint $\hat{x}_1$, inducing velocity $v_\phi(x_t,t)=(\hat{x}_1-x_t)/(1-t)$. Its squared-error target is the constant conditional velocity $x_1-x_0$.

During inversion, the predicted endpoint is passed to the frozen target classifier. The identity objective is a max-margin loss between the strongest non-target logit and the requested identity logit. Backpropagation through the classifier and prior gives $g(x_t)=\nabla_{x_t}\mathcal L_{\mathrm{inv}}(x_t)$. SFMI rescales this gradient to the current velocity norm,

$$
g_{\mathrm{norm}}(x_t)=\frac{g(x_t)}{\|g(x_t)\|_2+\epsilon}\,\|v_\phi(x_t,t)\|_2,
$$

and integrates the modified field $\tilde v=v_\phi-\gamma(t)g_{\mathrm{norm}}$. The schedule $\gamma(t)$ linearly warms up, holds its peak, decays with a cosine, and becomes zero for final refinement. Default sampling uses 50 steps with global scale $M=0.3$ and phase boundaries $(0.1,0.3,0.7)$.

## Experiments

The private CelebA split contains 1,000 identities and 30,000 images. The default public CelebA split contains another 30,000 images with no identity overlap; a same-size FFHQ split tests distribution shift. Targets are Face.evoLVe and IR-152 at 64x64, plus CosFace, ArcFace, MobileFaceNet, and ViT at 112x112. Evaluation averages recognition by models other than the attacked target and reports attack accuracy (ACC), FID, and LPIPS. Baselines are GMI, PPA, PLGMI, IFGMI, and FGMIA.

SFMI records the best ACC and LPIPS for every target. Its ACC ranges from $0.8735$ on ViT to $0.9335$ on MobileFaceNet. On ArcFace it obtains ACC $0.9248\pm0.0089$, FID $22.61\pm0.30$, and LPIPS $0.3874\pm0.0059$, compared with FGMIA's $0.8880\pm0.0087$, $21.72\pm0.08$, and $0.4088\pm0.0012$. Thus SFMI improves identity recovery and perceptual similarity there but not FID. At 112x112, training the reusable prior takes about 18 hours on one RTX 5090 and inversion takes 0.23 seconds per image.

Ablations show large failures when replacing the flow prior with a DDPM prior plus DDIM sampling or replacing PGS with constant guidance. On ArcFace, the respective ACC values are 0.1086 and 0.1658 versus 0.9248 for full SFMI. Using FFHQ public data, cross-entropy instead of the margin loss, or 224x224 inputs yields smaller degradations. The best tested ArcFace ACC occurs at 50 steps and $M=0.30$; increasing either guidance or steps does not improve monotonically. Output perturbation lowers ArcFace attack ACC to 0.8858, while BiDO lowers it to 0.8611 and also reduces clean target accuracy from 0.9796 to 0.9110.

## Limitations

- SFMI assumes white-box access to model parameters and gradients, representing a high-access threat rather than a general remote attack.
- It requires relevant public face data and degrades when the public and private domains diverge.
- A common guidance configuration works across the tested targets, but substantially different targets or distributions may require retuning.
- The prior is expensive to train, especially at 224x224, even though it can be reused across attacked models.
- Cross-model recognition accuracy remains a proxy for identity recovery and need not agree with human identity judgments.
- The tested defenses reduce but do not eliminate the attack, and BiDO's stronger reduction comes with recognition-utility loss.
- The supplied manuscript states no venue, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/model-inversion-attacks|Model Inversion Attacks]]: the privacy threat and evaluation setting addressed by SFMI.
- [[concepts/flow-matching|Flow Matching]]: supplies the unconditional ODE prior and velocity field that SFMI steers.
- [[concepts/diffusion-models|Diffusion Models]]: the alternative iterative generative prior used by several inversion baselines and the DDPM/DDIM ablation.
- [[concepts/deep-metric-learning|Deep Metric Learning]]: contextualizes identity-discriminative face embeddings and margin-based recognition objectives.

## Related Papers

- Zhang et al. (2020), "The Secret Revealer: Generative Model-Inversion Attacks Against Deep Neural Networks": introduces GMI, the unconditional-GAN baseline.
- Struppek et al. (2022), "Plug & Play Attacks: Towards Robust and Flexible Model Inversion Attacks": uses a StyleGAN2 prior for model inversion.
- Yuan et al. (2023), "Pseudo Label-Guided Model Inversion Attack via Conditional Generative Adversarial Network": introduces PLGMI and the max-margin identity objective reused here.
- Qiu et al. (2024), "A Closer Look at GAN Priors: Exploiting Intermediate Features for Enhanced Model Inversion Attacks": develops the IFGMI baseline.
- Lu et al. (2025), "FGMIA: Feature-Guided Model Inversion Attacks Against Face Recognition Models": uses recovered feature encodings with diffusion generation.

Source: supplied parsed manuscript, Cognitio job `823fa8e9-99f0-46ee-88ce-ec5cd2f22f7b`.

[[index|Library home]]
