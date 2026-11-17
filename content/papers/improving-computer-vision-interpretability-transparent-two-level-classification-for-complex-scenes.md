---
title: "Improving Computer Vision Interpretability: Transparent Two-Level Classification for Complex Scenes"
type: paper
authors:
  - Stefan Scholz
  - Nils B. Weidmann
  - Zachary C. Steinert-Threlkeld
  - Eda Keremoglu
  - Bastian Goldlücke
year: 2024
doi: 10.1017/pan.2024.18
tags:
  - interpretable-machine-learning
  - computer-vision
  - protest
---

## TL;DR

Representing an image by detected object categories makes protest classification inspectable and comparable across countries. On 141,538 images from ten countries, the best two-level classifier reaches F1 = 0.7203, below a vision transformer’s 0.8226, while exposing which objects predict protest.

## Research Question

Can complex scenes be classified through human-readable object features, enabling researchers to examine both classification criteria and cross-country differences in protest imagery?

## Motivation

Pixel heatmaps require researchers to infer which objects highlighted pixels represent, and different explanation methods can highlight different regions. Explicit object categories provide a common vocabulary for comparing images and sharing abstract representations when original images cannot be redistributed.

## Contributions

- A two-stage pipeline connecting instance segmentation to conventional supervised classifiers.
- A newly labeled, multinational protest-image dataset and comparison of two vocabularies, four feature encodings, and four classifiers.
- Object-level predictive-importance analysis, human validation, and country-specific illustrations of protest symbolism.

## Method

A pretrained instance segmenter assigns object masks and categories. COCO supplies 80 categories; LVIS supplies 1,203. Detections below confidence 0.1 are discarded. Each category becomes a feature encoding presence, instance count, largest-instance area, or summed instance area relative to image size.

Logistic regression, decision trees, random forests, and XGBoost predict protest from these vectors; hyperparameters are selected with five-fold cross-validation on the training set. The best configuration combines LVIS, summed areas, and gradient-boosted trees.

Permutation importance measures the F1 decrease after shuffling one category’s feature. The paper evaluates this on training data separately by country, then averages across countries. Country-specific deviations from the average reveal contextual differences. These are predictive associations, not causal effects of objects on protest.

## Experiments

ACLED-guided selection identifies protest episodes in 2014–2021. Twitter collection yields 135 million tweets and 16 million images before sampling and annotation. Exact and near duplicates are removed; countries with fewer than 100 labeled protest images are excluded. The final dataset contains 141,538 images, including non-protest images, split 80/20 within countries. Training has 12,454 protest and 100,776 non-protest images; testing has 3,113 and 25,195. Main analyses combine high- and low-certainty human labels.

| Model | Test F1 |
| --- | ---: |
| LVIS summed areas + gradient-boosted trees | 0.7203 |
| ResNet50 trained on this dataset | 0.7489 |
| Vision transformer trained on this dataset | 0.8226 |

LVIS generally improves over COCO. Logistic regression performs poorly with area features. Topic-level analysis finds below-average performance for fires, smoke, and state police, and better performance for crowds, banners, and flags (Sections 5.1–5.2).

People occupy an average 34% of protest-image area versus 22% of non-protest-image area. Permuting person area reduces F1 by 0.19, followed by flag (0.03), signboard (0.02), and banner (0.01). Large visual area does not necessarily imply high predictive importance (Section 5.3).

A human audit of 1,000 protest images identifies 2,210 salient objects. Exact-name agreement with segmented categories is 68%, rising to 74% with a category dictionary. Country comparisons highlight posters in Russia, cars in Argentina and South Africa, and candles in Lebanon; the interpretations depend on the particular protest episodes sampled (Sections 5.3–5.4).

## Limitations

The object representation loses contextual and relational information and underperforms the vision transformer. Fixed vocabularies omit relevant categories such as police officers and fire. Segmentation remains learned and fallible; readable intermediate features do not make a boosted ensemble fully transparent. Training-set permutation importance is distinct from held-out predictive validation. Sampling selected protest episodes and Twitter imagery does not establish representativeness of all protests or countries. The supplied Markdown references supplementary analyses but does not include their full contents.

## Related Concepts

- [[concepts/concept-bottleneck-models|Concept Bottleneck Models]] — a related architectural principle: prediction passes through named intermediate variables. Here those variables are aggregated detected objects; the paper does not evaluate concept interventions.

## Related Papers

- He et al. (2017), *Mask R-CNN*: instance segmentation supplies object masks rather than only bounding boxes.
- Won, Steinert-Threlkeld, and Joo (2017), *Protest Activity Detection and Perceived Violence Estimation from Social Media Images*: supplies the earlier ResNet50 protest-classification comparator.
- Torres (2024), *A Framework for the Unsupervised and Semi-Supervised Analysis of Visual Frames*: the paper contrasts bag-of-visual-words representations with explicitly named objects.

Replication materials: [Dataverse](https://doi.org/10.7910/DVN/TFTEF2). Summary based on the supplied parsed article; publication year follows its online publication date.
