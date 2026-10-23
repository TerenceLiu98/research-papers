---
title: "Accessing Vision Foundation Models via ImageNet-1K"
type: paper
authors:
  - Yitian Zhang
  - Xu Ma
  - Yue Bai
  - Huan Wang
  - Yun Fu
year: null
tags:
  - knowledge-distillation
  - vision-foundation-models
  - model-compression
  - representation-learning
---

## TL;DR

Proteus performs task-agnostic [[concepts/knowledge-distillation|knowledge distillation]] from a vision foundation model using only ImageNet-1K. It discards class labels and output-logit matching, then aligns teacher and student representations at token, feature, and masked-patch levels. A Proteus-L/14 student trained on 1.2 million images matches DINOv2-L/14's reported average across 12 fine-grained classification datasets and is close on semantic segmentation, while limitations remain for some out-of-distribution classes, smaller models, and mismatched patch sizes.

## Research Question

Can a randomly initialized student recover the task-general representations of a vision foundation model from a much smaller public proxy dataset, without access to the teacher's original training data?

## Motivation

Models such as DINOv2, CLIP, and SynCLR are trained on hundreds of millions or billions of images, often from undisclosed datasets. Their released weights permit inference but do not make derivative training broadly accessible. Conventional distillation on ImageNet-1K also risks encoding its 1,000-class supervision into the student, weakening transfer to unseen classes and dense prediction tasks.

## Contributions

- Introduces Proteus, a task-agnostic vision distillation framework that uses ImageNet-1K as a public proxy dataset and does not require the teacher's original data.
- Replaces label and logit supervision with intermediate-representation matching to reduce proxy-dataset bias.
- Combines classification-token, full-feature, and masked-patch objectives to cover classification and dense prediction.
- Evaluates students from ViT-Tiny through ViT-Large across classification, robustness, semantic segmentation, and depth estimation, and transfers from DINOv2, SynCLR, and CLIP teachers.
- Studies proxy-data diversity, data and class subsampling, teacher size, weight inheritance, projector design, and training cost.

## Method

Proteus initializes a student Vision Transformer randomly and runs teacher and student on images from a proxy dataset. It omits ImageNet labels, cross-entropy, and class-logit KL divergence. Instead, lightweight LayerNorm-plus-linear projectors map student representations to the teacher dimensions, and mean squared error aligns three outputs:

1. **Token objective:** matches the student's projected classification token to the teacher's classification token.
2. **Feature objective:** matches the projected final feature representation, supplying supervision useful for dense prediction rather than only global classification.
3. **Patch objective:** masks patches in the student's input and trains its projected patch tokens to recover the teacher tokens produced from the unmasked image.

The three losses receive equal weight in the default DINOv2 setup. For CLIP, which does not expose the same patch-oriented design, the experiments retain only token-level transfer. Students use the same patch size as their teachers. Training follows the DeiT recipe for 300 epochs on ImageNet-1K, generally with a batch size of 1,024 on eight A100 GPUs; ViT-L uses 256.

## Experiments

The main evaluation spans ImageNet-1K linear probing, 12 fine-grained classification datasets, ImageNet-Sketch/A/R/C robustness variants, ADE20K semantic segmentation, and NYU-Depth V2 monocular depth estimation.

The ablation on ViT-S/14 reports that conventional hard-logit distillation with cross-entropy reaches 78.7% average fine-grained accuracy, soft-logit distillation without cross-entropy reaches 80.5%, and feature-hint MSE reaches 85.3%. Adding full-feature alignment to token alignment raises ADE20K mIoU from 44.0 to 47.4; adding masked-patch alignment raises it to 50.0, while fine-grained accuracy changes from 86.1% to 85.8%.

Against DeiT at comparable student scales, Proteus improves ImageNet accuracy, fine-grained transfer, robustness, semantic segmentation, and depth estimation in the reported table. Proteus-S/14 obtains 81.8% ImageNet linear accuracy and 85.8% mean accuracy over the 12 fine-grained datasets. On ADE20K it reaches 41.8 linear-probe and 50.0 fine-tuned mIoU, compared with DINOv2-S/14's 45.7 and 51.0. On NYU-Depth V2, its RMSE is 0.404 under linear evaluation and 0.350 after fine-tuning, versus 0.344 and 0.327 for DINOv2-S/14.

Scaling narrows the gap. Proteus-L/14 reports 86.2% ImageNet accuracy and 91.0% average fine-grained accuracy, compared with 86.3% and 91.0% for DINOv2-L/14, despite using 1.2M rather than 142M training images. Fine-tuned Proteus-L reaches 57.7 mIoU on ADE20K versus 58.1 for DINOv2-L, and 0.240 RMSE on NYU-Depth V2 versus 0.243. These comparisons use different teacher/student training pipelines and do not establish identical compute or data provenance.

With other teachers, Proteus-B exceeds SynCLR-B on ImageNet linear evaluation (81.4% versus 80.5%) but trails its fine-grained mean (87.4% versus 88.8%). It exceeds CLIP-B on ImageNet (81.2% versus 78.7%) and nearly matches its fine-grained mean (85.7% versus 85.8%). Proxy-data experiments raise the fine-grained mean from 85.8% on ImageNet-1K to 86.7% on the more diverse 1.4M-image ImageNet-Merge. A 1.2M-example dataset augmented from one image still reaches 68.7%, but six of twelve datasets lose more than ten percentage points.

Robustness results are mixed: relative to corresponding DINOv2 models, Proteus is similar on ImageNet-Sketch and ImageNet-R, better on ImageNet-C, and worse on ImageNet-A. Weight inheritance from DINOv2 slightly reduces the reported classification results; random initialization is therefore used by default. Training time for ViT-S is reported as 30 hours for both DeiT and Proteus on eight A100 GPUs, with one hour of validation for Proteus versus nine for DeiT.

## Limitations

- The paper validates proxy training only at ImageNet-1K scale; effectiveness with larger proxy datasets is not established.
- Patch- and feature-level matching require the student and teacher to use the same patch size, limiting architectural freedom.
- Performance depends on proxy-data diversity. Proteus trails DINOv2 on several fine-grained categories and ImageNet-A, and the CLIP experiment improves materially when more diverse data are added.
- Dense prediction gaps remain at smaller scales, despite narrowing for ViT-L.
- The approach requires white-box access to teacher representations and pays the cost of teacher inference throughout distillation.
- The supplied Markdown gives no reliable publication year, venue, stable identifier, or code URL; those fields are therefore not inferred here.

## Related Concepts

- [[concepts/knowledge-distillation|Knowledge Distillation]]
- Vision foundation models
- Masked image modeling
- Dataset bias
- Task-agnostic model compression

## Related Papers

- Oquab et al. (2023), "DINOv2: Learning Robust Visual Features without Supervision": the principal teacher and oracle comparison.
- Touvron et al. (2021), "Training Data-Efficient Image Transformers & Distillation through Attention": supplies the DeiT training recipe and supervised-distillation baseline.
- Tian et al. (2023), "Learning Vision from Models Rivals Learning Vision from Data": introduces SynCLR, used as an alternative teacher and comparison.
- Radford et al. (2021), "Learning Transferable Visual Models from Natural Language Supervision": introduces CLIP, another alternative teacher and comparison.
- Wu et al. (2023), "TinyCLIP": a task-agnostic CLIP compression approach discussed as requiring the original large-scale data distribution.

[[index|Library home]]
