---
title: "HiRAE: Hierarchical Representation Autoencoding with Residual Budgets"
type: paper
authors:
  - Xuanyu Zhu
  - Yan Bai
  - Yang Shi
  - Yihang Lou
  - Yuanxing Zhang
  - Tengfei Liu
  - Jing Jin
  - Yuan Zhou
year: 2026
source_job_id: "d7697b1f-68c9-49b2-bd75-41d36120e8fc"
tags:
  - representation-autoencoders
  - visual-tokenization
  - hierarchical-feature-fusion
  - image-generation
---

## TL;DR

HiRAE learns residual corrections from all layers of a frozen vision encoder while keeping the deepest representation as an anchor. Depth-dependent norm caps and dropout constrain shallow, middle, and deep corrections, allowing joint fusion-decoder training without changing latent dimensions. On ImageNet-256, HiRAE-24 lowers reconstruction FID from RAEv2's 0.299 to 0.209 while obtaining guided generation FID 1.038 after 80 epochs; it also improves three reported text-to-image alignment benchmarks under a shared protocol.

## Research Question

Can a [[concepts/representation-autoencoders|Representation Autoencoder]] learn from the full hierarchy of a frozen vision encoder, improve fine-detail reconstruction, and retain a latent distribution that a downstream generator can model without manually selecting layers or separately adapting the fusion module?

## Motivation

Final-layer vision features carry strong semantics but omit local detail useful for reconstruction. Intermediate layers retain that detail, yet unconstrained learned fusion can shift the latent distribution toward reconstruction at the expense of generation. RAEv2 addresses the problem with fixed aggregation over a selected layer subset, while DRoRAE learns full-depth fusion through staged optimization. HiRAE instead seeks controlled, jointly trained full-depth fusion.

## Contributions

- Introduces hierarchical residual fusion over all 24 layers of a frozen DINOv3-L encoder, with independent layer experts and spatially varying signed routing.
- Divides corrections into shallow, middle, and deep groups and bounds their Frobenius norms relative to the deepest-layer anchor, assigning larger budgets and less dropout to deeper groups.
- Jointly trains fusion and decoding while preserving the baseline latent shape of $16\times16\times1024$, then freezes the tokenizer for generator training.
- Evaluates reconstruction, class-conditional generation, text-to-image alignment, depth-group interventions, latent structure, and decoder sensitivity.

## Method

For each frozen encoder output $H_\ell$, a token-wise MLP expert produces $U_\ell$. A linear router conditioned on the deepest feature $H_{23}$ assigns an L2-normalized signed weight to every layer at every spatial token. The 24 routed expert outputs are collected into shallow (layers 0-7), middle (8-15), and deep (16-23) residuals.

After group-specific dropout, each residual is scaled down only when its Frobenius norm exceeds a fraction of the deepest anchor's norm. The caps are 0.025, 0.075, and 0.150, while dropout probabilities are 0.50, 0.25, and 0.10. The resulting latent is

$$
Z=\operatorname{LN}\left(H_{23}+\Delta_s+\Delta_m+\Delta_d\right),
$$

with a total pre-normalization correction bounded by $0.25\lVert H_{23}\rVert_F$. Stage 1 jointly trains the experts, router, and ViT-XL decoder for 16 epochs using pixel, perceptual, and adversarial reconstruction objectives while freezing DINOv3-L. Stage 2 freezes the complete tokenizer and trains a DiT generator for 80 epochs.

## Experiments

### ImageNet Reconstruction and Generation

On ImageNet-256, HiRAE-24 reports rFID 0.209 versus 0.299 for RAEv2 with the same latent dimensions. On a matched 5,000-image subset, PSNR rises from 22.667 to 26.377 dB and LPIPS falls from 0.074 to 0.043. With internal guidance after 80 generator epochs, gFID is 1.038 versus 1.060 for RAEv2, and the six-representation Frechet aggregate is 1.856 versus 2.170. Unguided gFID is worse for HiRAE-24, at 2.129 versus 1.650, so the generation advantage depends on the guided setting.

HiRAE-7, which learns fusion over the established seven-layer subset, reaches rFID 0.217 and the same guided gFID of 1.038 with fewer expert parameters. HiRAE-24 nevertheless has better PSNR, LPIPS, and guided six-representation distance.

### Text-to-Image Generation

Under the paper's shared training and evaluation protocol, HiRAE-24 improves over RAEv2 on GenEval, DPG-Bench, and GenAI-Bench before and after supervised fine-tuning. Post-fine-tuning GenEval increases from 84.86 to 87.70. These experiments use a 0.9B generator at $256\times256$ resolution, so they do not establish scaling to larger generators or resolutions.

### Ablations and Diagnostics

At a short matched budget, three depth groups give better guided and unguided generation than two or four groups, while two groups reconstruct slightly better. Removing any trained residual group increases LPIPS; the increase is largest for the deep group. Equal-norm frequency interventions associate shallower corrections more with high-frequency detail and deeper corrections more with low-frequency information, while the middle-group difference is inconclusive at the main intervention strength.

Within HiRAE-24, fusion increases mean spatial effective rank from 130.360 to 154.893 across 100 fixed images while mean spatial CKA remains 0.985. Same-class 10-nearest-neighbor fractions change little in raw coordinates. At a relative latent perturbation norm of 10%, HiRAE-24's decoded LPIPS changes are 21%-22% of RAEv2's across Gaussian, low-frequency, and high-frequency directions. The generator has lower clean-latent prediction error at five interior tested noise levels but slightly higher error at both endpoints.

## Limitations

- The main evidence uses DINOv3-L, ImageNet-256, one decoder family, and a fixed $16\times16\times1024$ latent; transfer across backbones, resolutions, and domains is not established.
- Guided generation improves slightly over RAEv2, but unguided gFID degrades from 1.650 to 2.129.
- The three-group choice is supported by a short-budget 10,000-sample ablation whose absolute FIDs are far from the final 80-epoch results.
- Several comparisons against external systems retain their original training durations, guidance methods, and sampling protocols, limiting direct system-level ranking.
- The latent analyses describe associations and intervention responses within trained models; they do not isolate which property causes downstream generation quality.
- The supplied manuscript states no stable identifier, publication venue, or code URL for HiRAE.

## Related Concepts

- [[concepts/representation-autoencoders|Representation Autoencoders]]: the visual-tokenizer family that HiRAE extends with controlled full-depth fusion.
- [[concepts/diffusion-models|Diffusion Models]]: the downstream latent generator used to test whether the enriched representation remains learnable.
- [[concepts/flow-matching|Flow Matching]]: the generator-training framework used in the RAEv2 lineage.

## Related Papers

- [[papers/improved-baselines-with-representation-autoencoders|Improved Baselines with Representation Autoencoders]]: the DINOv3-L baseline using fixed aggregation over selected encoder layers.
- [[papers/beyond-the-last-layer-multi-layer-representation-fusion-for-visual-tokenization|Beyond the Last Layer: Multi-Layer Representation Fusion for Visual Tokenization]]: the learned full-depth fusion predecessor whose staged adaptation HiRAE replaces with bounded residual groups and joint training.
- Zheng et al. (2025), "Diffusion Transformers with Representation Autoencoders": the original final-layer representation-autoencoder framework.
- Wang et al. (2026), "DecQ: Detail-Condensing Queries for Enhanced Reconstruction and Generation in Representation Autoencoders": an alternative intermediate-feature detail pathway.
- Liu et al. (2026), "Improving Reconstruction of Representation Autoencoder": a separate low-level detail encoder approach.

[[index|Library home]]
