---
title: "Scalable Patch-Level Self-Supervised Learning"
type: paper
authors:
  - Maximilian Seitzer
  - Maxime Oquab
  - Gabriele Trivigno
  - Huy V. Vo
  - Antonín Vobecký
  - Oriane Siméoni
  - Seungeun Yi
  - Piotr Bojanowski
year: null
tags:
  - self-supervised-learning
  - visual-representation-learning
  - dense-prediction
---

[[index|Library home]]

## TL;DR

JEM learns visual features by aligning corresponding patches across views, with explicit information-preservation and spatial-structure regularization. It scales from roughly 300M to 7B backbone parameters and improves segmentation over controlled DINOv2 baselines. Its 7B model exceeds DINOv3 on two panoptic probes, but does not dominate across tasks.

## Research Question

Can a patch-only student–teacher objective motivated by multi-view information maximization produce both global and dense visual representations while remaining stable at billion-parameter scale?

## Motivation

Strong visual SSL recipes combine image-level and patch-level objectives with several stabilization mechanisms. Patch alignment offers a unified learning signal, but avoiding constant outputs across images does not ensure that patches retain distinct spatial information within each image.

## Contributions

- Derives an alignment and anti-collapse decomposition of a variational multi-view InfoMax bound.
- Implements JEM with patch correspondence, explicit entropy regularization, and a learned structural similarity loss.
- Demonstrates stable training through 7B parameters and evaluates frozen features for classification, segmentation, and depth.

## Method

The objective maximizes information shared between student representations and teacher targets. Its lower bound combines teacher-target information with a negative expected teacher-to-student KL divergence (Sections 3.1 and A.4). Conditional factorization across patch/layer targets makes alignment additive; target information decomposes into per-element information minus total correlation.

JEM implements three terms:

1. **Alignment:** categorical distributions over 4,096 classes are matched at geometrically corresponding patches and supervised depths. Both masked and visible patches contribute.
2. **Global regularization:** maximize marginal prediction entropy across examples at each patch position while minimizing conditional entropy. Position-specific estimation prevents a position-only coding shortcut.
3. **Structural regularization:** learned projections of final student features reproduce pairwise cosine similarities from early and intermediate teacher layers. This is a practical proxy for controlling redundancy, not a direct total-correlation estimator.

Student and teacher crops share a patch lattice and use integer patch offsets, independent photometric transformations, and partial overlap. Two global and eight local student crops are used per image. Masking affects 80% of views, hiding 65% of global patches and 50% of local patches. ViTs use 16×16 patches, four registers, no class token, and an EMA teacher. Structural regularization begins during training rather than in a later refinement stage.

## Experiments

Evaluation freezes the backbone. Classification uses an attention probe; semantic segmentation and depth use linear probes; instance and panoptic segmentation use lightweight semantic and pairwise-instance heads. The authors train on ImageNet-1k, ImageNet-22k, and A140M, a curated reproduction of the LVD-142M recipe.

Selected Table 2 results for 7B models:

| Model | Data | IN1k accuracy | ADE semantic mIoU | ADE panoptic PQ | COCONut PQ |
| --- | --- | ---: | ---: | ---: | ---: |
| DINOv2* | A140M | 87.7 | 51.9 | 17.9 | 22.0 |
| JEM | A140M | 86.9 | 54.4 | 23.9 | 27.3 |
| DINOv3 | LVD-1689M | 89.0 | 55.9 | 21.6 | 27.0 |

DINOv2* denotes the authors' baseline trained in their shared setup. JEM and DINOv2* use approximately 1.85T student tokens; DINOv3 uses an estimated 4.06T, a roughly 12× larger dataset, and additional refinement. JEM's panoptic advantage therefore does not constitute a matched-budget DINOv3 ablation.

In ViT-L/ImageNet-22k ablations at 250k steps (Table 1), removing global regularization reduces IN1k accuracy from 82.8 to 10.3 and ADE mIoU from 48.1 to 0.5. Removing visible-patch alignment reduces ADE mIoU to 28.1. Removing structural regularization barely changes this small-scale result (48.0 mIoU), but larger-model diagnostics show progressive loss of spatial diversity without it. Removing masking retains 82.3 accuracy and 45.3 mIoU. The no-EMA experiment also changes entropy-regularization hyperparameters, so it is not a single-variable ablation.

## Limitations

The multi-view sufficiency assumption depends on the downstream task and augmentation choice. Similarity preservation is a surrogate for redundancy control rather than a guarantee of optimal information retention. A140M is curated from an internal image pool, limiting exact independent reproduction. External-checkpoint comparisons differ in training data and recipes, and token estimates are best-effort. Results concern frozen-feature probing rather than full downstream fine-tuning. The supplied Markdown does not establish this paper's publication year, venue, or stable identifier; those metadata are left unspecified.

## Related Concepts

- [[concepts/structural-collapse-in-patch-representations|Structural Collapse in Patch Representations]] distinguishes within-image redundancy from dataset-level collapse.
- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] provides the broader latent-target learning context.
- [[concepts/linear-probing|Linear Probing]] describes one of the frozen-feature evaluation protocols.

## Related Papers

- [[papers/v-jepa-2-1-unlocking-dense-features-in-video-self-supervised-learning|V-JEPA 2.1]] also supervises visible tokens and multiple depths; JEM uses categorical same-depth alignment and a separate final-layer structural loss.
- DINOv2 (Oquab et al., 2024) combines global self-distillation, patch prediction, and KoLeo regularization; its reproduced algorithm is the controlled baseline here.
- DINOv3 (Siméoni et al., 2026) uses later Gram anchoring from an earlier checkpoint, whereas JEM preserves early-to-middle-layer geometry through learned projections throughout training.
