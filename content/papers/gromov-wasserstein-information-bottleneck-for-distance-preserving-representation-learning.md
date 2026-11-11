---
title: Gromov-Wasserstein Information Bottleneck for Distance-Preserving Representation Learning
type: paper
authors:
  - Anonymous authors
year: null
source_job_id: "3634c30a-73ce-47d9-b679-ede90eca7839"
tags:
  - optimal-transport
  - representation-learning
  - causal-inference
  - autoencoders
---

[[index|Library home]]

## TL;DR

GWIB regularizes an encoder through its pairwise geometric distortion and fused Gromov–Wasserstein alignment to a reference distribution. The manuscript connects an empirical kernelized information score to the Gromov–Monge gap, then applies a reference relaxation to image autoencoding and counterfactual regression. Reported gains include CelebA FID of 51.46 versus 67.70 for WAE-MMD and lower held-out treatment-effect errors on ACIC and IHDP. The information bound concerns a particular finite-sample score; the practical shared-plan causal objective does not automatically inherit the exact-distance guarantee.

## Research Question

Can an information-bottleneck-inspired geometric regularizer preserve useful relationships among samples while supporting prior matching in generative models and group balancing in treatment-effect prediction?

## Motivation

Reconstruction accuracy and marginal distribution matching leave substantial freedom in latent geometry. A decoder can compensate for distorted neighborhoods, and matching treatment and control distributions can erase outcome-relevant variation. [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]] provides a way to compare internal geometry across input and latent spaces.

## Contributions

- Bounds a specified empirical RBF-kernel information score by a scaled [[concepts/gromov-monge-gap|Gromov–Monge Gap]] plus a kernel- and diameter-dependent constant.
- Derives a reference-distribution upper bound combining encoder distortion with fused GW alignment.
- Instantiates the construction with a fixed Gaussian prior for Wasserstein autoencoders and mutually learned treatment-group references for coupled GWIB (C-GWIB).
- Evaluates task performance, geometry, and component ablations across generative and causal benchmarks.

## Method

For an encoder with pushforward distribution q, let R squared be its expected squared pairwise-distance distortion. The order-2 gap is R squared minus the squared GW distance between the input distribution and q. Theorem 1 bounds the empirical kernelized information score by this gap divided by twice the squared kernel bandwidth, plus an additive constant. Bounded metric spaces and the stated kernel conditions matter; zero gap does not imply zero information.

For a latent reference distribution, the reference bound is the square of R plus the fused-GW distance divided by beta, minus the squared input-to-reference GW distance (Equations 8–9). Fused GW combines feature and structural costs under one coupling. The geometric proposition assumes finite second moments and metric intrinsic distances.

In WAE+GWIB, the fixed-prior subtraction is constant and can be dropped during training. The remaining regularizer replaces the MMD prior penalty. C-GWIB uses each group's encoded distribution as the other's reference, retaining the representation-dependent negative terms. A shared cross-group plan and its transpose support the three alignments. Conditional gradient approximately solves an auxiliary alignment problem; network updates hold that plan fixed. This auxiliary problem differs from minimizing the final regularizer.

## Experiments

CelebA uses official splits, 64-by-64 images, a 64-dimensional Normal prior, 50 training epochs, and checkpoint selection by validation KID. Test generation metrics use 10,000 real and generated images. Table 1 reports means and sample standard deviations across three training seeds:

| Model | FID ↓ | KID × 1,000 ↓ | PSNR ↑ | SSIM ↑ |
| --- | --- | --- | --- | --- |
| WAE-MMD | 67.70 ± 0.64 | 71.70 ± 1.53 | 22.08 ± 0.01 | 0.6775 ± 0.0004 |
| SWAE | 60.70 ± 1.07 | 60.47 ± 2.79 | 22.00 ± 0.05 | 0.6709 ± 0.0012 |
| VAE | 62.22 ± 0.49 | 61.96 ± 0.69 | 22.37 ± 0.03 | 0.6862 ± 0.0018 |
| WAE+GWIB | 51.46 ± 0.24 | 51.05 ± 0.80 | 22.50 ± 0.05 | 0.6962 ± 0.0005 |

On the fixed 1,024-image geometry subset, full GWIB reduces squared distortion from 0.0348 to 0.0058 and squared GW discrepancy from 0.0260 to 0.0039. The full combination outperforms distortion-only and FGW-only variants on the displayed task metrics, although MMD variants retain the closest IMQ-MMD prior match.

IHDP and ACIC use 63/27/10 percent train/validation/test splits and five random seeds. The manuscript defines PEHE as mean squared treatment-effect error, without a square root. Held-out results are:

| Dataset | C-GWIB ATE error | C-GWIB PEHE | Best listed baseline PEHE |
| --- | --- | --- | --- |
| ACIC | 0.5163 ± 0.2786 | 1.4527 ± 0.0389 | 1.6045 ± 0.0442 (MitNet) |
| IHDP | 0.0503 ± 0.0003 | 0.6988 ± 0.0002 | 0.8138 ± 0.0138 (CausalVIB) |

C-GWIB has the lowest mean across all eight main causal table columns and all displayed causal ablation columns. Supplementary Twins experiments report held-out ATE error 0.0327 and PEHE 0.2504. Hyperparameter sensitivity varies across datasets.

## Limitations

The bound is not a general KL mutual-information guarantee or a guarantee of absolute distance preservation. Its additive constant cannot be ignored. The geometric relaxation permits Gaussian references, but that does not extend the bounded-space information theorem.

An approximate feasible plan preserves an upper estimate for the positive fused term; substituting an uncertified upper estimate into a subtracted GW term can invalidate the bound. Consequently, the shared-plan CFR objective lacks an automatic exact-bound interpretation. Appendix D requires unsquared metric distances, while Algorithm 1 displays squared Euclidean intrinsic matrices; this implementation/theory convention needs resolution before reproducing the guarantee.

The conditional-gradient problem is nonconvex, reaches only a local stationary point, and has cubic group-size scaling. The causal identification assumptions support conditional average effects, not individual missing outcomes. Held-out random splits are not out-of-distribution tests, and the manuscript leaves the historical in-sample index set to be verified. Several source equations contain extraction corruption. Authors, year, and a stable publication identifier are unavailable in this anonymous review manuscript.

## Related Concepts

- [[concepts/gromov-monge-gap|Gromov–Monge Gap]]: relative structural cost of an encoder-induced coupling.
- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: compares pairwise geometry across spaces.
- [[concepts/optimal-transport|Optimal Transport]]: supplies couplings for prior and group alignment.
- [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]]: prior-matching baseline replaced in WAE+GWIB.

## Related Papers

- [[papers/gromov-wasserstein-autoencoders|Gromov-Wasserstein Autoencoders]]: a related library paper using GW geometry and trainable priors; GWIB instead derives a gap-based regularizer and evaluates a fixed-prior WAE application.
- Uscidda et al. (2025), *Disentangled Representation Learning with the Gromov-Monge Gap*: cited antecedent for relational map regularization.
- Shalit et al. (2017), *Estimating Individual Treatment Effect: Generalization Bounds and Algorithms*: cited CFR backbone and balancing framework.
