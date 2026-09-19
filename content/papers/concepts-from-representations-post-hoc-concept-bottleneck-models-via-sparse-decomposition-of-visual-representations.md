---
title: "Concepts from Representations: Post-hoc Concept Bottleneck Models via Sparse Decomposition of Visual Representations"
type: paper
authors:
  - Shizhan Gong
  - Xiaofan Zhang
  - Qi Dou
year: null
repository: "https://github.com/peterant330/PCBM-ReD"
tags:
  - concept-bottleneck-models
  - sparse-autoencoders
  - visual-concept-discovery
  - vision-language-models
  - interpretable-machine-learning
---

## TL;DR

PCBM-ReD turns a pretrained CLIP image encoder into a post-hoc [[Concept Bottleneck Models|concept bottleneck model]]. It discovers candidate visual concepts from the encoder with a [[Sparse Autoencoders|sparse autoencoder]], labels and filters them with multimodal and text language models, selects a linearly independent subset that reconstructs the encoder's representation, and sparsely decomposes each image embedding over concept text embeddings. Across 11 image-classification datasets, the resulting model comes within 0.41 percentage points of a linear probe on average while exposing concept-level explanations and retaining zero- and few-shot capabilities.

## Research Question

Can an opaque pretrained visual encoder be retrofitted with a concept bottleneck whose concepts are visually identifiable, task-relevant, and aligned with the encoder's own representation space, without relying on handcrafted concept annotations or an uninterpretable residual prediction path?

## Motivation

Conventional concept bottleneck models depend on concepts chosen by experts or generated from class names. Expert vocabularies are expensive and may be incomplete, while language-model-generated concepts can describe non-visual properties or features the image encoder cannot represent. Existing post-hoc CBMs can recover accuracy through a residual connection from opaque image features, but that residual weakens the claim that predictions are mediated by interpretable concepts. PCBM-ReD instead starts from features present in the model and data, then asks whether selected concept embeddings can reconstruct the original visual representation closely enough to preserve predictive performance.

## Contributions

- Introduces a data- and model-dependent concept discovery pipeline that extracts latent features from a pretrained visual encoder before assigning human-readable labels.
- Uses language models to retain concepts that are visually identifiable, discriminative for the task, and less likely to encode background shortcuts.
- Proposes a greedy, reconstruction-guided selection procedure that builds a linearly independent concept subset while reducing representation reconstruction error.
- Represents an image as a sparse linear combination of concept text embeddings and trains predictions from the reconstructed representation after discarding the residual.
- Evaluates supervised, zero-shot, few-shot, interpretability, and ablation behavior across a broad collection of image-classification tasks.

## Method

### Concept discovery and naming

The method begins with CLIP's aligned image and text encoders. A sparse autoencoder decomposes image embeddings into sparse latent activations, with each dictionary atom treated as a candidate visual concept. For each candidate, the pipeline retrieves the most highly activating training images. Llama-3.2-11B-Vision-Instruct describes task-relevant visual features in those images, and DeepSeek-V3 summarizes the descriptions into candidate labels and scores their visual identifiability, discriminative value, and susceptibility to shortcuts. Low-scoring candidates are removed.

### Reconstruction-guided selection

Candidate labels are embedded with CLIP's text encoder. The selection objective chooses a fixed-size subset whose span minimizes the Frobenius reconstruction error of a probing set of image embeddings. Because exact subset search is discrete and expensive, the paper uses a greedy update that adds the candidate producing the largest reduction in reconstruction error. Candidates linearly dependent on the current set are excluded, encouraging a nonredundant bottleneck. This stage is unsupervised with respect to class labels.

### Sparse concept bottleneck

For each image, orthogonal matching pursuit approximates its CLIP image embedding with a sparse weighted sum of selected concept text embeddings. The nonzero coefficients become concept scores. PCBM-ReD discards the unexplained residual and trains a linear label predictor on the reconstructed embedding; algebraically, this yields a class-concept weight matrix and satisfies the concept-bottleneck abstraction. The classifier can be initialized with CLIP text embeddings of prompts of the form "This is a photo of [class]," preserving the encoder's zero-shot prior.

## Experiments

The main evaluation uses CLIP ViT-L/14 on 11 datasets: ImageNet, CIFAR-10, CIFAR-100, Food-101, FGVC-Aircraft, Flower-102, CUB-200-2011, UCF-101, DTD, HAM10000, and RESISC45. The authors compare PCBM-ReD with a CLIP linear probe and CBM baselines including the original CBM, PCBM, CompDL, label-free CBM, LaBo, Res-CBM, CDM, Discover-then-Name, V2C-CBM, and VLG-CBM. A separate three-dataset comparison uses CLIP RN50. The linear head is trained with Adam using batch size 64 and a learning rate of $5 \times 10^{-5}$.

In the fully supervised ViT-L/14 comparison, PCBM-ReD averages 86.97% accuracy, versus 87.38% for the linear probe, 85.72% for LaBo, and 83.39% for Res-CBM. The reported average gap to the linear probe is therefore 0.41 percentage points, while the gains over LaBo and label-free CBM are 1.25 and 5.57 points, respectively.

In zero-shot evaluation, PCBM-ReD averages 69.73% with vanilla CLIP class prompts, compared with 69.69% for the original CLIP representation. With CuPL prompts, it averages 71.68%, compared with 71.65% for CuPL on the original representation. Across 1-, 2-, 4-, 8-, and 16-shot evaluations, PCBM-ReD exceeds LaBo by 5.01 percentage points on average.

The interpretability study asks 39 volunteers to rate explanations on five datasets for visual identifiability, fidelity to the image, and the perceived causal relationship between concepts and predictions. The paper reports higher ratings for the complete pipeline than for both class-description concepts generated without training images and PCBM-ReD without language-model concept scoring.

Ablations on CIFAR-10, CIFAR-100, and CUB show that accuracy increases with bottleneck size and nearly saturates around 300 concepts. Reconstruction-guided selection outperforms random sampling and k-means, especially for small bottlenecks. Sparse representation decomposition is more accurate than using CLIP similarity directly as the concept score, and concepts extracted from a mismatched encoder reduce performance.

## Limitations

Concept quality depends on the multimodal and text language models used for description, summarization, and scoring. The paper specifically reports difficulty describing HAM10000 skin lesions with sufficiently precise domain terminology and suggests domain-specific multimodal models as a possible remedy. Because the method is post-hoc, it also inherits limitations of the original image encoder: concepts cannot recover visual distinctions that the encoder failed to represent.

The experiments focus on image classification and CLIP-family representations, so the evidence does not establish the same reconstruction-performance trade-off for other modalities or representation geometries. The human study measures whether participants perceive concepts as faithful and causally related; it does not by itself prove causal faithfulness of every explanation.

## Related Concepts

- [[Concept Bottleneck Models]]
- [[Sparse Autoencoders]]
- [[concepts/zero-shot-concept-bottleneck-models|Zero-shot Concept Bottleneck Models]]
- [[Linear Probing]]
- [[Text Embedding Models]]
- Sparse coding
- Visual concept discovery

## Related Papers

- [[V2C-CBM: Building Concept Bottlenecks with Vision-to-Concept Tokenizer]]
- [[papers/zero-shot-concept-bottleneck-models|Zero-shot Concept Bottleneck Models]]
- [[Interpretable and Steerable Concept Bottleneck Sparse Autoencoders]]
- Koh et al. (2020), "Concept Bottleneck Models."
- Yuksekgonul, Wang, and Zou (2022), "Post-hoc Concept Bottleneck Models."
- Oikarinen, Das, Nguyen, and Weng (2023), "Label-Free Concept Bottleneck Models."
- Yang et al. (2023), "Language in a Bottle: Language Model Guided Concept Bottlenecks for Interpretable Image Classification."
- Fel et al. (2023), "A Holistic Approach to Unifying Automatic Concept Extraction and Concept Importance Estimation."

[[index|Library home]]
