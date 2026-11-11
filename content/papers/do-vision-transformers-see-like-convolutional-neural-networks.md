---
title: Do Vision Transformers See Like Convolutional Neural Networks?
type: paper
authors:
  - Maithra Raghu
  - Thomas Unterthiner
  - Simon Kornblith
  - Chiyuan Zhang
  - Alexey Dosovitskiy
year: null
source_job_id: "a75cbcf7-c96c-4960-b269-777be91aeb57"
tags:
  - vision-transformers
  - representation-learning
  - neural-network-interpretability
---

## TL;DR

Vision Transformers (ViTs) and ResNets develop different internal representations: ViTs aggregate global information earlier and propagate features more strongly through skip connections. Classification-token training preserves spatial localization in patch tokens, while larger pretraining datasets improve intermediate features in larger ViTs.

## Research Question

Do ViTs solve image classification using representations resembling CNNs, and how do attention, residual connections, classification heads, and training scale explain their differences?

## Motivation

Comparable classification accuracy does not establish comparable internal computation. Understanding architectural differences can inform transfer learning and the potential use of ViTs for spatial tasks.

## Contributions

- Compares within-model and cross-model layer similarity using [[concepts/centered-kernel-alignment|Centered Kernel Alignment]].
- Connects early global aggregation and strong residual propagation to ViT representation structure.
- Shows that spatial localization depends on classification-token versus global-average-pooling training.
- Studies how pretraining scale affects intermediate representations and few-shot transfer.

## Method

The study compares ResNet50x1, ResNet152x2, ViT-B/32, ViT-B/16, ViT-L/16, and ViT-H/14, generally pretrained on JFT-300M, with ImageNet-only and data-subset controls. CKA compares activation Gram matrices across layers, including internal block components, using minibatch estimates of unbiased HSIC.

Attention-weighted pixel distances are averaged over 5,000 examples. Gradient-based effective receptive fields are averaged over channels and 32 images. Residual influence is measured by the norm ratio of the identity branch to the transformed branch, and tested by training models with skip connections removed from selected blocks. Token-to-input-patch CKA measures localization. [[concepts/linear-probing|Linear Probing]] uses few-shot linear regression to assess class information at different depths and token aggregation settings.

## Experiments

| Analysis | Reported finding |
| --- | --- |
| Layer similarity (Figures 1–2) | ViTs have relatively uniform similarity across depth; ResNets show distinct stages. The highest ViT layers are relatively dissimilar to ResNet layers. |
| Attention and receptive fields (Figures 3–6) | Early ViT heads mix local and global attention; later heads are global. Local heads resemble early ResNet features more closely. ImageNet-only training of larger ViTs fails to learn the same early local attention. |
| Skip connections (Figures 7–8) | Identity-branch dominance shifts from CLS tokens early to spatial tokens later. Removing skips in a block separates the similarity structure across that block; removing middle-block skips produces a reported 4% performance drop. |
| Localization (Figures 9–11) | Interior patch tokens in CLS-trained ViTs retain strong location specificity; edge tokens also resemble other edge patches. GAP training reduces localization and makes individual final-layer tokens more useful for global classification. |
| Scale and transfer (Figures 12–13) | Higher layers and larger models require more pretraining data to resemble full-data representations. JFT-pretrained large ViTs show roughly a 30-percentage-point intermediate-layer probe accuracy advantage over ImageNet-only models in the reported 10-shot ImageNet comparison. |

## Limitations

CKA compresses representation relationships into a scalar; complementary interventions and probes do not make it an exhaustive description. Localization results motivate object detection applications but are not detection benchmark results. Some pretrained architectures have only one available checkpoint, limiting seed-level uncertainty assessment. The checklist reports no complete reproduction package or compute accounting.

The supplied Markdown references appendices A–H but does not include them, limiting recovery of training and supplementary experiment details. It supplies no explicit publication year or stable identifier for this paper; these are left unspecified. Section 8 mentions similar lower-layer representations with 3% of pretraining data, while the Figure 12 caption emphasizes 10%; neither establishes a universal data threshold.

## Related Concepts

- [[concepts/centered-kernel-alignment|Centered Kernel Alignment]]
- [[concepts/linear-probing|Linear Probing]]

## Related Papers

- Dosovitskiy et al., *An Image Is Worth 16x16 Words: Transformers for Image Recognition at Scale* (2020), reference [14], supplies the ViT foundation and pretrained-model context.
- Kornblith et al., *Similarity of Neural Network Representations Revisited* (2019), reference [17], supplies the CKA methodology.
- [[papers/understanding-transformer-based-vision-models-through-inversion|Understanding Transformer-based Vision Models through Inversion]] offers a complementary reconstruction-based approach to investigating spatial information in visual representations.

[[index|Library home]]
