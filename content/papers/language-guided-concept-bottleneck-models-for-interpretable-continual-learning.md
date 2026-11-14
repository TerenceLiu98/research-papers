---
title: "Language Guided Concept Bottleneck Models for Interpretable Continual Learning"
type: paper
authors:
  - Lu Yu
  - Haoyu Han
  - Zhe Tao
  - Hantao Yao
  - Changsheng Xu
year: null
repository: "https://github.com/FisherCats/CLG-CBM"
tags:
  - continual-learning
  - class-incremental-learning
  - concept-bottleneck-models
  - interpretable-machine-learning
  - vision-language-models
---

## TL;DR

This paper proposes a language-guided Concept Bottleneck Model (LG-CBM) for interpretable exemplar-free class-incremental learning. It uses frozen CLIP image and text encoders, language-model-generated category concepts, concept alignment, a sparse classifier, and semantic-guided prototype augmentation to retain old-class knowledge while exposing concept contributions. On seven image-classification benchmarks, the method reports strong incremental accuracy alongside concept visualizations, but its explanations depend on the quality of generated concepts.

## Research Question

Can language-guided concept bottlenecks reduce catastrophic forgetting in class-incremental learning while keeping the model's evolving decision process interpretable across tasks?

## Motivation

Continual-learning methods commonly optimize retention and accuracy, while the concepts supporting a prediction can change as new classes are learned. This interpretability drift is difficult to inspect in black-box models. Concept Bottleneck Models offer an intermediate space of human-understandable variables, but applying them incrementally requires a cumulative concept representation and an anti-forgetting mechanism that does not retain old exemplars.

## Contributions

- Introduces a language-guided CBM framework that combines CLIP representations with concepts generated from category descriptions and selected task by task.
- Builds a cumulative Concept Bottleneck Layer (CBL) and aligns its concept scores with CLIP activation scores to preserve semantic consistency and improve interpretability.
- Uses an elastic-net penalty on the final concept-to-class layer so concept contributions remain sparse and inspectable.
- Proposes semantic-guided prototype augmentation: each old class is paired with the most semantically similar new class, and feature discrepancies from the new class are added to the old prototype to generate pseudo-features.
- Evaluates the method on seven coarse- and fine-grained image datasets and visualizes positive and negative concept contributions during and after continual training.

## Method

The setting is exemplar-free class-incremental learning. At task $t$, the model sees only the current classes but must predict over all classes seen so far. The image and text encoders of CLIP are frozen. For each category, the authors query a language model for appearance-oriented descriptions, use a T5-based extraction step to form a concept pool, and train a small concept-selection MLP with cross-entropy and Mahalanobis losses. The selected concepts form the task bottleneck; bottlenecks from earlier tasks are retained so the concept space grows cumulatively.

The CBL is a linear projection of frozen CLIP image features into the cumulative concept space. Its output is aligned with the CLIP image-text activation matrix using a negative average cosine-similarity loss after cubing the scores to sharpen their distribution. A linear classifier maps concept scores to classes and is regularized with an elastic-net penalty. The total objective combines cross-entropy, concept alignment, and sparsity losses; the reported weights are $\lambda=1$ and $\sigma=0.001$, with elastic-net mixing parameter $\phi=0.99$.

For each old class $j$, semantic-guided prototype augmentation finds the most similar current class $h$ by comparing the old class-name embedding with current class prototypes. It generates pseudo-features by adding the current class's feature-to-prototype discrepancy to the old prototype. The current examples and these pseudo-features jointly train the CBL and classifier. Concept contribution for class $k$ is computed from the image feature, the corresponding CBL weight, and the class-to-concept classifier weight, allowing positive and negative contributions to be ranked.

## Experiments

The evaluation covers CIFAR-100, Tiny-ImageNet, ImageNet-subset, CUB-200, Flower, Food-101, and Stanford-cars. Experiments are exemplar-free, use random seed 1993, and compare large-initial-task/small-increment and equal-size splits. The main backbone is CLIP ViT-B/16; CLIP RN-50 is used for the comparison with ICICLE. Training uses Adam, batch size 64, learning rate 0.001, and 60 epochs. The primary metrics are average incremental accuracy and final average accuracy.

On ImageNet-subset, the method reports $86.83\pm1.32$ average incremental accuracy and $78.97\pm0.39$ final accuracy for B-10 Inc-10, and $81.85\pm0.76$ and $78.21\pm0.29$ for B-50 Inc-5. On the fine-grained benchmarks, it reports the highest average incremental accuracy in every listed split, including $85.40$/$82.20$ on CUB-200, $95.58$/$94.53$ on Flower, $88.60$/$85.07$ on Stanford-cars, and $92.25$/$90.97$ on Food-101. With CLIP RN-50, it exceeds ICICLE on both CUB-200 and Stanford-cars under the reported splits.

The semantic-guided augmentation ablation improves final accuracy over both a base model and classical prototype loss: on ImageNet-subset B-50 Inc-5, the reported values are $23.90\pm8.50$, $74.23\pm0.25$, and $78.21\pm0.29$, respectively. Increasing concepts per task from 10 to 100 raises CUB-200 accuracy from 79.32 to 86.07 and ImageNet-subset accuracy from 86.25 to 87.40. Concept visualizations show that top contributions remain relatively stable for earlier classes, while a joint-training comparison still shows a performance gap on the three coarse-grained datasets.

## Limitations

Interpretability depends on the selected concepts. The authors report that language-model descriptions sometimes contain non-visual statements even when appearance-focused prompts are used, so concept quality can limit both explanation fidelity and model behavior. The approach also assumes that semantically similar classes have sufficiently similar embedding distributions for prototype augmentation to be useful. The experiments are image-classification benchmarks under a particular exemplar-free protocol and do not establish performance across other continual-learning modalities or task structures. Finally, the reported joint-training comparison indicates that continual learning remains harder than access to all data at once.

## Related Concepts

- [[Concept Bottleneck Models]]
- [[Continual Learning]]
- Catastrophic forgetting
- Class-incremental learning
- Vision-language models
- Prototype augmentation

## Related Papers

- Koh et al. (2020), "Concept Bottleneck Models."
- Oikarinen, Das, Nguyen, and Weng (2023), "Label-free Concept Bottleneck Models."
- Yang et al. (2023), "Language in a Bottle: Language Model Guided Concept Bottlenecks for Interpretable Image Classification."
- Rymarczyk, van de Weijer, Zielinski, and Twardowski (2023), "ICICLE: Interpretable Class Incremental Continual Learning."
- Yu et al. (2020), "Semantic Drift Compensation for Class-Incremental Learning."
- Yan et al. (2023), "Learning Concise and Descriptive Attributes for Visual Recognition."
