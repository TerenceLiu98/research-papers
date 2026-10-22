---
title: "DCBM: Data-Efficient Visual Concept Bottleneck Models"
type: paper
authors:
  - Katharina Prasse
  - Patrick Knab
  - Sascha Marton
  - Christian Bartelt
  - Margret Keuper
year: 2024
arxiv: "2412.11576"
repository: "https://github.com/KathPra/DCBM"
tags:
  - concept-bottleneck-models
  - visual-concept-discovery
  - interpretable-machine-learning
  - data-efficient-learning
  - out-of-distribution-generalization
---

## TL;DR

DCBM constructs a [[Concept Bottleneck Models|concept bottleneck model]] from image regions proposed by segmentation or detection foundation models. It embeds and clusters crops from as few as 50 training images per class, treats cluster representatives as dataset-specific visual concepts, and trains a sparse linear classifier over their activations. The approach is competitive on fine-grained classification and loses less accuracy than Discover-then-Name under the reported ImageNet-to-ImageNet-R shift, although its accuracy on ImageNet and Places365 trails several established CBMs.

## Research Question

Can an interpretable image classifier obtain dataset-specific, spatially grounded concepts from a small subset of training images, without handcrafted descriptions, language-model concept generation, or large-scale concept pretraining?

## Motivation

Many CBMs obtain their vocabulary from expert annotations, language models, or large external corpora. Such concepts can be costly to construct, too general for fine-grained tasks, or misaligned with the visual embedding space. DCBM instead derives concepts from regions of the target dataset. Each source image yields multiple proposals at object and part granularities, making concept discovery practical when few images are available while retaining visual examples that users can inspect.

## Contributions

- Defines concepts as target-dataset image regions proposed by segmentation or detection foundation models, then consolidates redundant proposals through clustering.
- Separates visual concept construction from optional textual naming, so prediction uses visual embeddings even when the nearest text label is imperfect.
- Supports concept intervention by removing visual concepts whose CLIP embeddings are sufficiently similar to a textual removal prompt.
- Evaluates classification, data efficiency, domain shift, concept localization, proposal models, backbones, clustering choices, and concept-set size across common and less-standard image datasets.

## Method

### Region-based concept discovery

For each class, DCBM samples 50 training images, except on CUB where it uses all available images. SAM, SAM2, Mask R-CNN, DETR, Semantic-SAM, or GroundingDINO generates multiple regions per image. The regions are cropped, optionally filtered by area, and embedded by a frozen CLIP image encoder. K-means groups the proposal embeddings; the standard configuration uses 2,048 clusters for the main experiments and represents each cluster by a median example. The resulting centroids form the visual concept bank.

### Sparse concept prediction

An image's activation for concept $c_j$ is the projection of its frozen CLIP embedding $f(x)$ onto that centroid, normalized by $\lVert c_j\rVert_2^2$. A single linear layer maps concept activations to class logits. Training minimizes cross-entropy plus an $L_1$ penalty on the class-concept weights, preserving a directly inspectable concept-to-label mapping. This classifier is closely related to a sparse [[Linear Probing|linear probe]], but operates through the discovered concept coordinates.

### Naming, localization, and intervention

Concept names are optional nearest neighbors from a corpus of common English words embedded by CLIP's text encoder. The visual crop remains the primary explanation because image-text alignment can be imperfect. Grad-CAM maps influential concepts back to regions in a test image, and the Grid Pointing Game tests whether these attributions favor the source image over three images from other classes. Users can also specify an unwanted concept in text and remove visually embedded concepts above a cosine-similarity threshold before retraining.

## Experiments

The main benchmark uses CLIP ViT-L/14 on ImageNet, Places365, CUB-200-2011, CIFAR-10, and CIFAR-100. DCBM variants based on SAM2, GroundingDINO, and Mask R-CNN reach 77.4-77.9% on ImageNet, 52.1-52.2% on Places365, 81.3-82.4% on CUB, 97.5-97.7% on CIFAR-10, and 85.3-85.6% on CIFAR-100. The corresponding linear-probe results are 83.9%, 55.4%, 85.7%, 98.0%, and 87.5%. Thus DCBM is strongest relative to other listed CBMs on fine-grained CUB, while it remains behind stronger CBM baselines on ImageNet and Places365.

For ImageNet-to-ImageNet-R transfer, Discover-then-Name's error rises from 16.4% on the shared ImageNet classes to 55.2% on renditions, a 38.8-point gap. DCBM's gaps are smaller: 27.4 points with SAM2, 24.6 with GroundingDINO, and 22.4 with Mask R-CNN. This comparison also shows a trade-off: DCBM begins with higher in-distribution error but attains lower ImageNet-R error.

On MiT-States, the three DCBM variants score 42.8-43.3%, above the 37.3% linear probe but below 48.1% zero-shot CLIP. On ClimateTV, results depend more strongly on the proposal model: 85.6% for SAM2, 81.8% for GroundingDINO, and 87.9% for Mask R-CNN, versus 84.5% for the linear probe. Concept-generation preparation on ImageNet uses 50,000 images and an estimated 6 GB, compared with the paper's stated 3.3 million image-caption pairs and 850 GB for Discover-then-Name. Training the entire CBM from only 50 images per class causes a larger accuracy decline, indicating that the strongest data-efficiency claim applies primarily to concept generation.

The localization study uses SAM2 concepts and CLIP RN50. In the 2-by-2 Grid Pointing Game, Places365 records Gini 0.4701, relative overlap 0.6519, and absolute localization 0.6551; CUB records 0.3608, 0.3402, and 0.3445. Both exceed the random-overlap reference for the latter metrics, but localization is substantially weaker on CUB. Qualitative cases also reveal concepts that are semantically associated with a prediction yet absent from the input.

## Limitations

DCBM depends on the proposal model producing useful regions and on CLIP representing the distinctions required by the target task. Its optional names inherit image-text misalignment, so a plausible word is not necessarily a faithful description of the visual crop. The concept bank may contain redundant concepts, its size is dataset-dependent, and choosing thousands of clusters limits simplicity. Grad-CAM and Grid Pointing Game provide localization evidence rather than proof that every concept is causally faithful.

The experiments address image classification and do not establish the framework for regression or other modalities. The reported OOD comparison uses a model trained on all 1,000 ImageNet classes rather than only the 200 ImageNet-R classes. Finally, the source reports both a broad claim that all results are within 5% of a linear probe and table values with larger gaps, including 6.0 points on ImageNet for DCBM-GroundingDINO; the numerical tables should therefore take precedence.

## Related Concepts

- [[Concept Bottleneck Models]]
- [[Linear Probing]]
- Visual concept discovery
- Out-of-distribution generalization
- Sparse linear models
- Vision-language representation alignment

## Related Papers

- [[Concepts from Representations: Post-hoc Concept Bottleneck Models via Sparse Decomposition of Visual Representations]]
- [[V2C-CBM: Building Concept Bottlenecks with Vision-to-Concept Tokenizer]]
- [[papers/zero-shot-concept-bottleneck-models|Zero-shot Concept Bottleneck Models]]
- Rao et al. (2024), "Discover-then-Name: Task-Agnostic Concept Bottlenecks via Automated Concept Discovery."
- Oikarinen et al. (2023), "Label-Free Concept Bottleneck Models."
- Yang et al. (2023), "Language in a Bottle: Language Model Guided Concept Bottlenecks for Interpretable Image Classification."

[[index|Library home]]
