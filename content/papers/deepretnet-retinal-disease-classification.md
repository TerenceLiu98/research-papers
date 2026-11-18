---
title: "DeepRetNet: retinal disease classification using attention UNet++ based segmentation and optimized deep learning technique"
type: paper
authors:
  - Nancy W
  - Prianka R R
  - Porselvi R
  - Arun Raghesh J T
year: 2026
tags:
  - retinal-disease-classification
  - medical-image-analysis
  - image-segmentation
---

## TL;DR

DeepRetNet combines attention-enhanced UNet++ vessel segmentation with an expanded GoogLeNet classifier and adaptive Gazelle optimization. The paper reports 97.20% accuracy on its first retinal dataset and 96.21% on its second in the k-fold comparison tables. Reporting inconsistencies and incomplete experimental specifications limit interpretation of these results.

## Research Question

Can explicit retinal segmentation and metaheuristic parameter optimization improve fundus-image disease classification over the evaluated classifiers and a version without segmentation?

## Motivation

The paper seeks to focus classification on relevant retinal structure while improving feature extraction and parameter search. It motivates automation through the workload of manual fundus assessment and the computational and generalization limitations of existing approaches.

## Contributions

- Combines nested dense UNet++ connections with multiscale attention for retinal vessel segmentation.
- Extends GoogLeNet with additional feature-processing layers to form DeepRetNet.
- Introduces adaptive weighting into Gazelle optimization to tune classifier weights and biases using mean squared error as fitness.
- Compares the full pipeline with four published approaches and a segmentation-free variant on two Kaggle datasets.

## Method

Gaussian smoothing and resizing precede segmentation. Attention UNet++ combines low- and high-level features, uses dilated convolutions at multiple rates, and applies squeeze-and-excitation channel weighting. Nested dense skip connections and deep supervision support multiscale feature propagation. Section 3.3 describes vessel segmentation, although other passages refer more broadly to infected regions.

The segmented output feeds a GoogLeNet-derived classifier with additional convolution, Leaky ReLU, batch normalization, average pooling, fully connected, and softmax operations. Improved Gazelle Optimization maintains a population of candidate parameters, ranks them by mean squared error, and combines Brownian and Lévy-based search with an adaptive weight intended to reduce premature convergence. The paper describes optimization of weights and biases but does not give a sufficiently complete training configuration to reproduce that search.

This is an instance of [[concepts/segmentation-guided-image-classification|Segmentation-Guided Image Classification]]: an explicit spatial prediction precedes the image-level decision.

## Experiments

The source describes DB1 as a Kaggle retinal-disease dataset with 3,200 images and training, validation, and test partitions. DB2 is the Kaggle diabetic-retinopathy detection dataset, described as containing 88,702 images across five severity categories. The implemented task is described as healthy versus unhealthy; the conversion from severity labels is not specified. Experiments vary the training-data proportion and number of cross-validation folds.

The following values reproduce the k-fold comparison tables (Tables 2 and 4); metrics are reported as percentages in the paper.

| Dataset | Accuracy | Specificity | Precision | Recall | F1 | MSE |
|---|---:|---:|---:|---:|---:|---:|
| DB1 | 97.20 | 98.36 | 95.90 | 96.48 | 96.53 | 2.80 |
| DB2 | 96.21 | 97.36 | 94.93 | 95.50 | 95.55 | 3.79 |

Without segmentation, accuracy is 91.69% on DB1 and 90.72% on DB2 in those tables: differences of 5.51 and 5.49 percentage points, respectively. Baselines are IDL-MRDD, Coherent CNN, Hybrid Ensemble, and Transferred ResNet. These comparisons support the reported benefit of the complete segmentation stage; they do not isolate attention, dense connections, or adaptive optimization individually.

## Limitations

- The abstract and conclusion give recall as 95.50%, whereas Table 2 gives 96.48% for DB1; 95.50% appears for DB2 in Table 4. Table 1 lists proposed-model MSE as 16.66%, unlike the 2.80% headline value. These discrepancies are retained rather than silently reconciled.
- The tabulated F1 values do not directly follow from the displayed precision and recall under the paper's stated formula; an aggregation explanation is not provided.
- Exact patient-level splits, label conversion, segmentation supervision, training hyperparameters, and optimizer budgets are insufficiently specified. No uncertainty intervals or isolated optimizer ablation are reported.
- Claims of segmentation accuracy and low computational cost lack corresponding quantitative segmentation or runtime comparisons in the supplied text. Prospective clinical generalization is not established.
- The authors acknowledge remaining error and propose larger, more diverse datasets, multimodal information, improved efficiency, and explainability as future work.

Metadata note: author names follow the readable author-contributions statement because the opening author line is corrupted. The year follows the supplied copyright and acceptance information; no reliable paper DOI is present in the supplied Markdown.

## Related Concepts

- [[concepts/segmentation-guided-image-classification|Segmentation-Guided Image Classification]]: explicit vessel localization supplies the classifier's input.

## Related Papers

- [[papers/vision-language-models-guided-graph-concept-reasoning-for-interpretable-diabetic-retinopathy-diagnosis|Vision-Language Models Guided Graph Concept Reasoning for Interpretable Diabetic Retinopathy Diagnosis]]: a library comparison using lesion concepts and graph reasoning for retinal diagnosis, rather than this vessel-segmentation pipeline; not a cited baseline in DeepRetNet.
- Vaiyapuri et al. (2022), “Intelligent deep learning based multi-retinal disease diagnosis and classification framework”: cited IDL-MRDD baseline.
- Sheet et al. (2022), “Retinal disease identification using upgraded CLAHE filter and transfer convolution neural network”: cited transfer-learning baseline.
