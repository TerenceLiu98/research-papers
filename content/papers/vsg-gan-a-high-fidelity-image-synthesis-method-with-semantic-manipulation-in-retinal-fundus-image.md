---
title: "VSG-GAN: A High-Fidelity Image Synthesis Method with Semantic Manipulation in Retinal Fundus Image"
type: paper
authors:
  - Junjie Liu
  - Shixin Xu
  - Ping He
  - Sirong Wu
  - Xi Luo
  - Yuhui Deng
  - Huaxiong Huang
year: null
tags:
  - synthetic-retinal-images
  - medical-image-synthesis
  - generative-adversarial-networks
  - data-augmentation
  - diabetic-retinopathy
---

## TL;DR

VSG-GAN generates retinal fundus images by separating vessel structure from background style. A U-Net extracts artery-vein vessel masks, a hierarchical variational autoencoder represents reference-image style at multiple resolutions, and a conditional generator injects structure with SPADE and style with AdaIN. On the reported MESSIDOR comparison, the full model reaches SSIM 0.9231, FID 21.84, and KID 0.0111, while synthetic augmentation raises ResNet50 diabetic-retinopathy classification accuracy from 0.81 to 0.83 for the binary task and from 0.68 to 0.71 for the four-class task. The study does not establish clinical validity, and the authors identify missing lesion detail and generative pattern collapse as unresolved problems.

## Research Question

Can retinal fundus synthesis preserve a specified vascular tree while independently varying image style, and can the resulting images improve diabetic-retinopathy classification under limited and imbalanced training data?

## Motivation

Retinal datasets are constrained by privacy, limited expert annotation, and class imbalance. Conventional flips, rotations, and pixel transformations enlarge a dataset but do not create new combinations of anatomy and appearance. Earlier learned generators can synthesize fundus images, yet controllable generation requires both a representation of a real image's appearance and explicit conditioning on clinically relevant spatial structure. VSG-GAN treats the vessel tree as content and the remaining fundus appearance as style so that either factor can be held fixed while the other changes.

## Contributions

- A vessel-and-style-conditioned retinal generator that separates vascular structure from background appearance and injects both conditions throughout coarse-to-fine synthesis.
- A hierarchical variational autoencoder that derives coarse, medium, and fine style representations from U-Net encoder features and maps them into a multiresolution latent space.
- Restricted residual blocks that combine SPADE conditioning from vessel masks with AdaIN conditioning from reference-image style.
- Spherical latent interpolation and cross-pairing of vessel masks and style codes for controllable synthesis and class-targeted augmentation.
- Evaluation through image-similarity and distribution metrics, component ablations, latent interpolation, vessel segmentation, and downstream diabetic-retinopathy classification.

## Method

### Structure and Style Decomposition

The segmentor $S$ is a U-Net trained on image patches and reassembles its outputs into a vessel map that distinguishes arteries and veins. Its contracting path also supplies feature maps at coarse, medium, and fine resolutions. The hierarchical variational autoencoder converts these maps into Gaussian latent variables and then into scale-specific style codes. This reuses the segmentation encoder rather than training a separate image encoder.

The generator begins from noise and progressively upsamples through Restricted ResBlocks. Within every block, SPADE derives spatially varying scale and shift parameters from the vessel mask, preserving vascular layout, while AdaIN transfers the normalization statistics represented by the corresponding style code. The intended factorization is therefore explicit: the vessel map controls spatial content and the hierarchical latent controls texture and colour.

### Adversarial Training and Sampling

Two PatchGAN discriminators operate at different scales. They receive vessel-image pairs containing either a real image, a generated image, or a Gaussian-blurred real image; blurred examples are labeled false to discourage soft outputs. Generator training combines adversarial, feature-matching, VGG-19 perceptual, and KL losses. The generator and discriminator use Adam with learning rate $10^{-4}$, batch size 2, and 400 epochs.

Because arbitrary Gaussian latent samples may fall outside the learned manifold, the paper uses spherical interpolation between style codes from real reference images. It also constructs augmentation pairs by combining the vessel structure from one image with the background representation from another, assigning the generated image the label associated with the background representation.

## Experiments

The vessel segmentor is trained on RITE, whose predefined split contains 20 training and 20 test images. MESSIDOR contains 1,200 images and is split 80:20 for synthesis training and testing; all synthesis images are cropped and resized to $512 \times 512$. Evaluation uses SSIM, Inception Score (IS), FID, KID, RGB-histogram Jensen-Shannon divergence, component ablations, latent interpolations, and downstream classification with pretrained ResNet18 and ResNet50.

| Evaluation | Reported result |
| --- | --- |
| MESSIDOR synthesis | VSG-GAN reports SSIM 0.9231, IS $1.3033 \pm 0.0458$, FID 21.84, and KID $0.0111 \pm 0.0014$ in Table 2, compared with reproduced RetiGAN values of 0.8812, $1.2662 \pm 0.0257$, 33.7018, and $0.0264 \pm 0.0021$. |
| RITE synthesis | The full model reports SSIM 0.6802, IS $1.1174 \pm 0.06872$, FID 63.59, and KID $0.0342 \pm 0.0060$. |
| Component ablation | On MESSIDOR, removing HVAE lowers SSIM to 0.7058 and raises FID to 53.88; removing SPADE lowers SSIM to 0.7820 and raises FID to 188.85. Removing both gives SSIM 0.7622 and FID 235.72. |
| Colour distribution | Against original images, average JS divergence is reported as 0.2519, 0.2596, and 0.5931 for VSG-GAN's red, green, and blue channels, versus 0.3235, 0.3716, and 0.4025 for RetiGAN. VSG-GAN is closer for red and green but worse for blue. |
| Binary classification | Adding 250 synthetic images to each of MESSIDOR levels 1, 2, and 3 changes overall accuracy from 0.79 to 0.80 for ResNet18 and from 0.81 to 0.83 for ResNet50. |
| Four-class classification | Synthetic augmentation changes overall accuracy from 0.65 to 0.67 for ResNet18 and from 0.68 to 0.71 for ResNet50. Class-level effects are mixed: for example, ResNet18 level-2 F1 falls from 0.54 to 0.45 and level-3 F1 falls from 0.79 to 0.76. |
| Vessel segmentor | The reported vessel-segmentation scores are accuracy 0.9674, balanced accuracy 0.8915, Dice 0.8087, sensitivity 0.9836, and specificity 0.7993. Artery-vein classification reports accuracy 0.9160 and Dice 0.9264. |

The prose following Table 2 instead gives SSIM 0.9184, IS $1.3101 \pm 0.0358$, FID 21.57, and KID 0.0104. These values conflict with the table, so the table values above should not be treated as reconciled with the narrative.

## Limitations

- The HVAE captures global context but omits lesion details that may be essential for disease-specific fundus synthesis.
- The authors report a risk of pattern collapse, analogous to posterior collapse, which can reduce diversity and fail to represent individual retinal variation.
- Downstream gains are small in overall accuracy and are not uniform across classes or metrics; some class-level F1 scores decline after augmentation.
- The synthesis comparison uses generic perceptual and feature-distribution metrics without clinician assessment or pathology-specific fidelity validation.
- The MESSIDOR metric values in Table 2 disagree with the immediately following prose, and the supplied text does not resolve which set is authoritative.
- The supplied Markdown states no publication year, venue, DOI, or arXiv identifier for this paper; these are not inferred from its references.

## Related Concepts

- [[concepts/synthetic-retinal-fundus-image-generation|Synthetic Retinal Fundus Image Generation]]: situates VSG-GAN among procedural, patch-based, and learned methods for controllable retinal synthesis.
- [[concepts/statistical-shape-graphs|Statistical Shape Graphs]]: offers a complementary framework for measuring complete retinal vessel networks rather than generating their appearance.

## Related Papers

- [[papers/a-visual-framework-to-create-photorealistic-retinal-vessels-for-diagnosis-purposes|A Visual Framework to Create Photorealistic Retinal Vessels for Diagnosis Purposes]]: explicitly constructs and renders editable vessel trees, whereas VSG-GAN learns structure-conditioned appearance from data.
- Costa et al. (2018), "End-to-end adversarial retinal image synthesis": conditions fundus generation on a vessel tree and provides a principal GAN-based comparison.
- Guo et al. (2022), "A Novel Retinal Image Generation Model with the Preservation of Structural Similarity and High Resolution": introduces RetiGAN, the strongest named synthesis baseline reproduced in the study.
- Park et al. (2019), "Semantic Image Synthesis with Spatially-Adaptive Normalization": supplies SPADE, used to inject vessel geometry into each generation stage.
- Huang and Belongie (2017), "Arbitrary Style Transfer in Real-Time with Adaptive Instance Normalization": supplies AdaIN, used to inject reference-image style.
- Xia et al. (2023), "GAN Inversion: A Survey": provides context for mapping real images into manipulable generator latent spaces.

[[index|Library home]]
