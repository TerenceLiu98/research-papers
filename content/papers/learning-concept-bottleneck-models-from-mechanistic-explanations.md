---
title: "Learning Concept Bottleneck Models from Mechanistic Explanations"
type: paper
authors:
  - Antonio De Santis
  - Schrasing Tong
  - Marco Brambilla
  - Lalana Kagal
year: null
repository: "https://github.com/Antonio-Dee/M-CBM"
tags:
  - concept-bottleneck-models
  - sparse-autoencoders
  - mechanistic-interpretability
  - explainable-ai
  - vision-language-models
---

## TL;DR

This paper introduces Mechanistic Concept Bottleneck Models (M-CBMs), which build a concept bottleneck from concepts discovered in a trained black-box image model rather than selecting the concepts in advance. Sparse autoencoders (SAEs) decompose backbone features, a multimodal language model names and annotates the resulting candidate concepts, and a sparse classifier maps the learned concept predictions to classes. On CUB, ISIC2018, and ImageNet, M-CBM reports higher accuracy than the compared CBM baselines at matched decision sparsity, while also improving concept-prediction ROC-AUC.

## Research Question

Can a concept bottleneck built from a black-box model's own learned features provide more predictive, learnable, and concise explanations than bottlenecks based on human-specified, knowledge-graph, language-model-generated, or generic vision-language concepts?

## Motivation

Predefined concept sets may omit task-relevant features, contain concepts that cannot be learned from the available data, or include non-visual descriptions. Comparisons between CBMs are also confounded by information leakage: a dense or weakly constrained final layer can recover class-relevant information that is unrelated to the stated concept semantics. The paper therefore combines model-derived feature discovery with explicit annotation and evaluates accuracy at matched explanation sparsity.

## Contributions

- Introduces [[Mechanistic Concept Bottleneck Models]] (M-CBMs), a pipeline that extracts candidate concepts from a trained backbone with an SAE, names them with a multimodal LLM, and trains a sequential CBM on partially annotated images.
- Introduces the Number of Contributing Concepts (NCC), a decision-level sparsity metric that measures how many concepts explain a target fraction of a prediction's total absolute contribution. At coverage 1, NCC reduces to the Number of Effective Concepts (NEC) under the paper's nonzero-logit assumption.
- Shows that class-conditioned annotation can produce severe leakage: on CUB, VLG-CBM reaches near black-box accuracy with about 1.5 contributing concepts even when concept names are replaced with random words. Class-agnostic annotation restores an accuracy--interpretability trade-off.
- Reports M-CBM accuracy at NCC=5 of 73.70% on CUB, 72.75% on ISIC2018, 70.14% balanced accuracy on ISIC2018, and 72.18% on ImageNet. The corresponding black-box results are 76.67%, 79.37%, 75.37%, and 76.15%.

## Method

Given a frozen backbone and dataset, the method trains an overcomplete ReLU SAE to reconstruct backbone activations with an L1 sparsity penalty. Dead or nearly dead SAE neurons are filtered using activation frequency and recovered cross-entropy, with a tolerance of about 1%, and the remaining neurons become candidate concepts.

For each candidate, the pipeline selects highly activating images, spatial saliency maps, random non-activating examples, and cosine-similar contrastive examples. GPT-4.1 generates a concise visual name while being instructed not to use class names. Semantically near-duplicate names are merged using text embeddings. The MLLM then annotates up to 1,000 stratified active and non-active examples per concept in 5 x 5 image grids, producing ternary labels for present, absent, and unannotated pairs.

The frozen backbone feeds a Concept Bottleneck Layer (CBL), which predicts the named concepts with a masked, class-imbalance-weighted binary cross-entropy loss. A sparse elastic-net linear classifier then predicts the target class from normalized concept logits. NCC is controlled by varying the classifier regularization and comparing models at the same coverage level, set to 0.95 in the main experiments.

## Experiments

The experiments use CUB with a ResNet18, ISIC2018 with a class-weighted ResNet50, and ImageNet with a pretrained ResNet50. M-CBM is compared with LF-CBM, class-agnostic VLG-CBM, and DN-CBM at NCC=5 and at the average of NCC levels 5, 10, 15, 20, 25, and 30.

At NCC=5, M-CBM reports 73.70% accuracy on CUB, 72.75% accuracy and 70.14% balanced accuracy on ISIC2018, and 72.18% accuracy on ImageNet. At the average NCC setting, the corresponding results are 74.18%, 75.51%, 71.54%, and 73.64%. M-CBM also reports concept-prediction ROC-AUC of 90.04% on CUB, 80.57% on ISIC2018, and 88.90% on ImageNet, with worst-10% averages of 79.05%, 66.98%, and 78.36%.

The reference-image ablation on CUB raises MLLM annotation accuracy from 65.91% to 69.46%; single-image annotation reaches 74.00% but would multiply the number of model calls by 25. In a reference-set poisoning experiment, contaminated versus normal negative examples have false-positive rates of 0.232 and 0.198, respectively, with Cohen's h=0.084 and p=0.157. An open-source MLLM variant remains below the main pipeline on ImageNet, reaching 56.76% at NCC=5 and 68.76% at average NCC.

## Limitations

The MLLM-generated names and annotations are hypotheses, not guarantees that the CBL has learned the intended semantics. There is no systematic test that the learned concepts are free of spurious correlations, and random-word controls show that NCC does not remove information leakage completely. The pipeline requires supervision and manual inspection to assess SAE quality, incurs substantial MLLM annotation cost, and depends on the selected backbone, SAE configuration, reference images, and annotator model. The experiments cover three image datasets, so the method's behavior beyond this setting remains open.

## Related Concepts

- [[Mechanistic Concept Bottleneck Models]]
- [[Concept Bottleneck Models]]
- [[Sparse Autoencoders]]
- [[Model Steerability]]
- Mechanistic interpretability
- Information leakage in concept bottlenecks
- Multimodal annotation

## Related Papers

- Koh et al. (2020), "Concept Bottleneck Models."
- Oikarinen, Das, Nguyen, and Weng (2023), "Label-Free Concept Bottleneck Models."
- Srivastava, Yan, and Weng (2024), "VLG-CBM: Training Concept Bottleneck Models with Vision-Language Guidance."
- Rao, Mahajan, Bohle, and Schiele (2024), "Discover-then-Name: Task-Agnostic Concept Bottlenecks via Automated Concept Discovery."
- [[V2C-CBM: Building Concept Bottlenecks with Vision-to-Concept Tokenizer]]
- [[Language Guided Concept Bottleneck Models for Interpretable Continual Learning]]
- [[Interpretable and Steerable Concept Bottleneck Sparse Autoencoders]]

[[index|Library home]]
