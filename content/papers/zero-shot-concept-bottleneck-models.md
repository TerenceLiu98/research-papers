---
title: "Zero-shot Concept Bottleneck Models"
type: paper
authors:
  - Shin’ya Yamaguchi
  - Kosuke Nishida
  - Daiki Chijiwa
  - Yasutoshi Ida
year: null
repository: "https://github.com/yshinya6/zcbm"
tags:
  - concept-bottleneck-models
  - interpretable-machine-learning
  - vision-language-models
  - zero-shot-learning
  - sparse-regression
---

## TL;DR

This paper introduces zero-shot concept bottleneck models (Z-CBMs), which perform both input-to-concept and concept-to-label inference without target-task concept annotations or neural-network training. A frozen VLM retrieves relevant concepts from a multi-million-phrase bank, and lasso regression selects a sparse subset whose text embeddings reconstruct the input image embedding. On 12 image-classification datasets, the resulting explanations are more image-aligned than the compared trained CBMs and the zero-shot classifier remains competitive with black-box VLM inference.

## Research Question

Can a concept bottleneck provide interpretable, intervenable predictions for unseen input domains without collecting target-task concept labels or training task-specific model parameters?

## Motivation

Standard [[Concept Bottleneck Models]] learn an input-to-concept mapping and a concept-to-label mapping from target data. This creates a dependence on concept annotations, training resources, and a fixed concept vocabulary. VLM-based CBMs reduce manual concept construction, but the paper argues that existing variants still require target-task training and usually operate on only a few thousand concepts. Z-CBMs instead use the zero-shot alignment already present in a frozen VLM and make the concept set dynamic for each input.

## Contributions

- Defines a fully zero-shot CBM setting in which both concept and label inference operate without target-task training.
- Introduces concept retrieval, which searches a large concept bank for input-related text concepts in the shared VLM feature space.
- Introduces concept regression, which uses sparse linear regression to reconstruct the image embedding and select mutually less-redundant concepts with importance weights.
- Constructs a filtered concept bank of about 5.12 million noun phrases extracted from four image-caption datasets.
- Demonstrates deletion and insertion interventions, including insertion of arbitrary natural-language concepts, and evaluates the approach across 12 image-classification datasets and multiple VLM backbones.

## Method

### Zero-shot inference

Given an input image $x$, the image encoder retrieves a candidate set $C_x$ of the top-$K$ concepts from the bank $C$ by cosine similarity with their text embeddings. With the default $K=2048$, the method forms a matrix $F_{C_x}$ whose columns are the retrieved concept features. It then solves

$$
\min_W \left\|f_V(x)-F_{C_x}W\right\|_2^2 + \lambda\|W\|_1.
$$

The weighted sum $F_{C_x}W$ approximates the image feature, while the nonzero coefficients provide concept importance scores. The final label is the class whose text embedding is most similar to this reconstructed vector. Lasso is the default solver with $\lambda=10^{-5}$, although the paper also considers elastic net and sparsity-constrained optimization.

### Concept bank and implementation

The authors extract noun phrases with NLTK from Flickr30K, CC3M, CC12M, and YFCC-15M captions. An approximately 20-million-phrase base set is filtered to remove overly long, near-duplicate, and optionally class-similar concepts, leaving about 5.12 million entries. Faiss provides the similarity index. The default VLM is CLIP ViT-B/32, while OpenCLIP, SigLIP, and DFN backbones are also evaluated.

### Interventions

For deletion, the method removes nonzero concepts in ascending, descending, or random importance order and measures the change in classification accuracy. For insertion, it adds selected ground-truth concepts or arbitrary concepts to the nonzero set, reruns regression, and recomputes the label. These operations expose and modify the representation used for the final prediction.

## Experiments

The evaluation covers Aircraft, CUB-200 Birds, Caltech-101, Cars, DTD, EuroSAT, Flowers, Food-101, ImageNet, Oxford-IIIT Pet, SUN397, and UCF-101. The main comparisons are zero-shot CLIP, ConSe, trained VLM-based CBMs, and CLIP linear probing.

| Evaluation | Result |
| --- | ---: |
| Bird concept accuracy: CBM / CDM / Z-CBM | 71.61 / 45.61 / 60.49 |
| Average SigLIP-Score across 12 datasets: Label-free CBM / LaBo / CDM / Z-CBM (ALL) | 0.5485 / 0.5419 / 0.5714 / 0.6309 |
| Average concept coverage for Z-CBM: cosine / linear regression / lasso | 58.51% / 76.87% / 85.27% |
| Average zero-shot top-1 accuracy: zero-shot CLIP / Z-CBM (ALL) | 53.73% / 54.28% |
| Average training-head top-1 accuracy: linear-probe CLIP / LP-Z-CBM (ALL) | 78.98% / 78.31% |

The concept-deletion experiment on Bird shows the sharpest accuracy drop when the highest-importance concepts are removed first, supporting the use of regression coefficients as importance signals. Insertion of additional Bird attributes improves accuracy as more concepts are added, both with random selection and the ECTP intervention procedure. Larger caption-derived banks generally improve ImageNet accuracy and SigLIP-Score: the combined 5.12-million-concept bank reaches 62.70% ImageNet accuracy and a 0.6498 SigLIP-Score with CLIP ViT-B/32. Stronger VLM backbones also generally improve Z-CBM performance, although the largest reported DFN backbone slightly trails its black-box accuracy (83.40% versus 83.85%).

## Limitations

The concept bank is built automatically from web captions, so it can contain biased, noisy, or semantically duplicated vocabulary; the paper recommends filtering potentially biased sources. Retrieval quality and explanation fidelity remain bounded by the frozen VLM and by the coverage of the bank. Sparse regression also creates a computation-versus-sparsity trade-off: with $K=2048$, the reported total inference time is about 55 ms per image, of which concept regression accounts for 49.23 ms. The experiments focus on image classification and do not establish that a retrieved concept is causally faithful merely because it has a nonzero coefficient. Finally, the reported zero-shot gains over black-box VLMs are modest and vary with the backbone and concept bank.

## Related Concepts

- [[concepts/zero-shot-concept-bottleneck-models|Zero-shot Concept Bottleneck Models]]
- [[Concept Bottleneck Models]]
- [[Vision-to-Concept Tokenizers]]
- [[Text Embedding Models]]
- [[Model Steerability]]
- Zero-shot classification
- Sparse linear regression

## Related Papers

- [[V2C-CBM: Building Concept Bottlenecks with Vision-to-Concept Tokenizer]]
- [[Language Guided Concept Bottleneck Models for Interpretable Continual Learning]]
- [[Learning Concept Bottleneck Models from Mechanistic Explanations]]
- [[Interpretable and Steerable Concept Bottleneck Sparse Autoencoders]]
- Koh et al. (2020), "Concept bottleneck models."
- Oikarinen, Das, Nguyen, and Weng (2023), "Label-free concept bottleneck models."
- Yuksekgonul, Wang, and Zou (2023), "Post-hoc concept bottleneck models."
- Yang et al. (2023), "Language in a bottle: Language model guided concept bottlenecks for interpretable image classification."
- Panousis, Ienco, and Marcos (2023), "Sparse linear concept discovery models."

[[index|Library home]]
