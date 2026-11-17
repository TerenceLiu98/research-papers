---
title: Contrastive Flow Matching
type: paper
authors:
  - George Stoica
  - Vivek Ramanujan
  - Xiang Fan
  - Ali Farhadi
  - Ranjay Krishna
  - Judy Hoffman
year: null
tags:
  - flow-matching
  - image-generation
  - contrastive-learning
---

## TL;DR

Contrastive Flow Matching (∆FM) adds a negative-target repulsion term to conditional velocity regression, improving image-generation FID without additional model forward passes during training. On ImageNet-256, SiT-B/2 improves from 42.28 to 33.39 FID; REPA SiT-XL/2 improves from 11.14 to 7.29. The supplied manuscript does not establish a publication year or stable paper identifier.

## Research Question

Can training conditional flows to move away from independently sampled target velocities improve conditional image fidelity and reduce the number of training and sampling steps?

## Motivation

The authors argue that conditional flows can overlap across classes and produce ambiguous images. They propose training-time repulsion as a way to increase condition separation, complementing representation alignment (REPA) and inference-time classifier-free guidance (CFG). Their uniqueness argument is a motivation, rather than a demonstrated general guarantee that learned conditional trajectories cannot intersect.

## Contributions

- A contrastive extension of [[concepts/flow-matching|Flow Matching]] using existing minibatch samples and one prediction per training example.
- Experiments on class-conditioned ImageNet generation and text-conditioned CC3M generation, including combinations with REPA and CFG.
- Analyses of contrastive weight, batch size, training iterations, and sampling evaluations.

## Method

For interpolated state $x_t=\alpha_t x+\sigma_t\epsilon$, define the positive velocity target $u=\dot\alpha_t x+\dot\sigma_t\epsilon$. Draw a different example and noise pair from the batch to construct $\tilde u=\dot\alpha_t\tilde x+\dot\sigma_t\tilde\epsilon$. The negative example need not have a different class label. The objective is

$$
\mathcal L_{\Delta\mathrm{FM}}=\mathbb E[\|v_\theta(x_t,t,y)-u\|^2-\lambda\|v_\theta(x_t,t,y)-\tilde u\|^2],\qquad 0\leq\lambda<1.
$$

Repulsion acts against an independently sampled target velocity, not another network prediction. The authors use $\lambda=0.05$ in their main experiments; zero recovers ordinary flow matching. No extra forward pass or external encoder is required by this loss itself; REPA remains an optional separate component.

Appendix B characterizes the ideal velocity optimum as the usual conditional target mean minus a weighted negative-target mean, divided by $1-\lambda$. Section 5.4 uses that correction when combining ∆FM with CFG, applying guidance only within a selected interval. Finite training need not achieve the ideal decomposition.

## Experiments

Models train for 400,000 iterations, generally with batch size 256. ImageNet metrics use 50,000 generated samples; CC3M FID uses its validation set. Main comparisons use Euler–Maruyama sampling with 50 function evaluations and no CFG.

| Setting | Model | FM FID ↓ | ∆FM FID ↓ |
| --- | --- | ---: | ---: |
| ImageNet-256 | SiT-B/2 | 42.28 | 33.39 |
| ImageNet-512 | SiT-B/2 | 50.26 | 41.59 |
| ImageNet-256 | REPA SiT-B/2 | 27.33 | 20.52 |
| ImageNet-512 | REPA SiT-B/2 | 31.90 | 24.48 |
| ImageNet-256 | REPA SiT-XL/2 | 11.14 | 7.29 |
| CC3M-256 | REPA-MMDiT | 24 | 19 |

Sources: Tables 1–3. With separately tuned CFG weights and intervals, Table 4 reports 2.09 versus 1.97 FID for REPA SiT-XL/2 on ImageNet-256. This is not a comparison at identical guidance hyperparameters.

Figure 5 reports comparable quality with up to nine times fewer training iterations and better quality at 50 sampling steps than the baseline at 250. These are iteration/evaluation comparisons, not measured end-to-end wall-clock speedups. Table 5 finds FID 7.29 at $\lambda=0.05$, versus 11.14 at zero and 19.21 at 0.15. Larger contrastive weights can therefore worsen quality substantially.

## Limitations

- Improved FID does not imply uniform diversity gains: REPA recall decreases from 0.65 to 0.64 for XL/2 at 256 resolution, and from 0.63 to 0.62 at 512 resolution.
- Evidence covers ImageNet and CC3M image generation; broader modality or large-scale text-to-image generalization is not established.
- The source has internal reporting inconsistencies: Table 6 labels the B/2 batch-256 values as REPA although they reproduce Table 1 rather than Table 2. The summary above follows the dedicated main-result tables.
- Parsed equations contain malformed symbols and numbering. The objective above follows Section 4 and Algorithm 1; the appendix's idealized characterization should not be read as an empirical uniqueness guarantee.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: ∆FM changes velocity regression through negative-target repulsion.

## Related Papers

- Lipman et al., *Flow Matching for Generative Modeling* (2023): underlying velocity-regression framework, cited as references 24–25.
- Yu et al., *Representation Alignment for Generation: Training Diffusion Transformers Is Easier Than You Think* (2024): complementary representation supervision used in the REPA experiments, reference 44.
- Ho and Salimans, *Classifier-Free Diffusion Guidance* (2022): inference-time conditional amplification combined with ∆FM, references 17–18.
