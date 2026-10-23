---
title: "Vision-Language Models Guided Graph Concept Reasoning for Interpretable Diabetic Retinopathy Diagnosis"
type: paper
authors:
  - Qihao Xu
  - Xiaoling Luo
  - Yuxin Lin
  - Chengliang Liu
  - Yongting Hu
  - Jinkai Li
  - Xinheng Lyu
  - Yong Xu
year: null
tags:
  - concept-bottleneck-models
  - medical-image-analysis
  - diabetic-retinopathy
  - graph-neural-networks
  - vision-language-models
---

## TL;DR

VLM-GCR is an interpretable diabetic-retinopathy classifier that represents retinal lesions as nodes in a grade-conditioned concept graph. It supports training with or without lesion annotations, uses vision-language models and a segmentation model to generate dynamic pseudo-labels in the annotation-free setting, and permits test-time interventions on lesion concepts, graph relations, or grades. On the DDR and MFIDDR benchmarks, the paper reports improvements over the compared concept-based methods in both disease grading and lesion recognition.

## Research Question

Can diabetic-retinopathy diagnosis model relationships among lesion concepts, retain useful concept predictions when fine-grained lesion labels are unavailable, and support error correction at multiple stages of an interpretable diagnostic pipeline?

## Motivation

Standard [[concepts/concept-bottleneck-models|Concept Bottleneck Models]] expose clinically meaningful intermediate variables, but commonly treat them as conditionally independent. That assumption misses grade-dependent lesion co-occurrence, such as relationships between microaneurysms and hemorrhages. Fine-grained lesion annotation also requires substantial expert effort, while existing label-free approaches can struggle to recognize subtle retinal findings. Finally, concept-only interventions do not let clinicians directly correct a suspected grade or a relationship between lesions.

## Contributions

- Introduces a grading-aware lesion concept graph whose edge weights depend on an auxiliary disease-grade prediction.
- Defines graph message passing over positive and negative lesion embeddings to connect lesion recognition with final grade prediction.
- Proposes dynamic concept pseudo-labeling that combines reports from GPT-4.1 and Gemini 2.5 Flash with masks from a pretrained diabetic-retinopathy segmentation model.
- Supports interventions at three levels: lesion concepts, graph relationships, and disease grade.
- Evaluates both concept-supervised and concept-free training on DDR and MFIDDR.

## Method

VLM-GCR first constructs one lesion co-occurrence matrix per diabetic-retinopathy grade. With concept supervision, the matrices are estimated from lesion-label co-occurrence within each grade. Without concept supervision, GPT-4.1 proposes lesion concepts and estimates their grade-specific co-occurrence probabilities. An auxiliary classifier predicts a distribution over grades for each fundus image, and its probabilities weight the grade-specific matrices to produce an image-conditioned graph.

Each lesion is represented by input-dependent positive and negative embeddings, following the general design of [[concepts/concept-embedding-models|Concept Embedding Models]]. The embeddings become graph nodes, while the conditioned co-occurrence matrix initializes edge weights. Three rounds of GRU-based message passing produce enhanced lesion representations. Predicted lesion probabilities mix the corresponding positive and negative embeddings, and their concatenation feeds the final grade classifier.

In concept-free training, the method sends each image and its known grade to GPT-4.1 and Gemini 2.5 Flash and also obtains a pseudo-mask from a pretrained lesion-segmentation model. Frozen biomedical text encoders process the generated reports, an image encoder processes the masks, and a learned Laplace-gating router combines the three experts. Thresholded outputs become pseudo-labels for six lesion categories. The joint objective contains final-grade, auxiliary-grade, and lesion-concept losses.

At inference time, a clinician or vision-language model can replace lesion values, graph edges, or the auxiliary grade. The graph reasoning pipeline then propagates the correction to the other levels, extending ordinary concept intervention into a multi-level form of [[concepts/model-steerability|Model Steerability]].

## Experiments

The experiments use DDR and MFIDDR. The selected DDR subset contains 2,334 images with both grade and lesion labels, split 70/10/20 for training, validation, and testing. MFIDDR contains 34,452 images; 25,848 training images were individually annotated for lesion concepts and split 8:2 for training and validation, with 8,604 test images. The six evaluated lesion concepts are hard exudates, hemorrhage, microaneurysms, soft exudates, vitreous hemorrhage, and vitreous opacity. All compared methods use VGG16 and results are averaged across three random seeds.

With concept supervision, VLM-GCR reports grade AUCs of 94.74% on DDR and 88.91% on MFIDDR, versus 94.09% and 87.81% for the strongest values among the tabulated baselines. Its corresponding grade accuracies are 83.10% and 75.47%. The paper also reports lesion-classification mAP gains of 2.00 and 2.80 percentage points over the compared methods on DDR and MFIDDR.

Without concept supervision, VLM-GCR reports grade AUCs of 93.17% on DDR and 87.55% on MFIDDR, compared with best tabulated baseline values of 92.31% and 85.91%. Relative to the average of the prior concept-free methods, it reports lesion mAP gains of 15.9 and 13.0 percentage points and subset-accuracy gains of 6.9 and 9.4 points. Ablations on DDR show lower grade and concept AUC after removing concept-graph modeling or grade conditioning. Replacing dynamic pseudo-label fusion with direct aggregation lowers concept AUC from 89.71% to 82.12%.

Concept-intervention experiments on DDR show grading performance increasing as more lesion concepts are corrected, with VLM-GCR outperforming CBM and CEM in the reported curves. Supplying the grade also improves lesion-classification metrics, supporting bidirectional intervention within the model's reasoning pipeline.

## Limitations

The concept-free pipeline depends on two proprietary vision-language models and a pretrained lesion-segmentation model, increasing operational complexity and inheriting their errors. GPT-4.1 also supplies the initial grade-specific relation estimates when lesion annotations are absent, so the graph's clinical validity is not independently established by the reported experiments. Evaluation is limited to two diabetic-retinopathy datasets, one VGG16 backbone, six lesion concepts, and three random seeds. The intervention study demonstrates performance changes under supplied corrections but does not report a prospective clinical user study, calibration analysis, or safety evaluation. The source does not report deployment cost or latency for generating pseudo-labels and diagnostic reports.

## Related Concepts

- [[concepts/concept-bottleneck-models|Concept Bottleneck Models]]
- [[concepts/concept-embedding-models|Concept Embedding Models]]
- [[concepts/model-steerability|Model Steerability]]
- Graph neural networks
- Medical image analysis
- Vision-language models

## Related Papers

- Koh et al. (2020), "Concept Bottleneck Models."
- Espinosa et al. (2022), "Concept Embedding Models: Beyond the Accuracy-Explainability Trade-Off."
- Oikarinen et al. (2023), "Label-Free Concept Bottleneck Models."
- Hu et al. (2024), "Towards Multi-dimensional Explanation Alignment for Medical Classification."
- Wen et al. (2024), "Concept-based Lesion Aware Transformer for Interpretable Retinal Disease Diagnosis."
- Xu et al. (2024), "HACDR-Net: Heterogeneous-aware Convolutional Network for Diabetic Retinopathy Multi-lesion Segmentation."

[[index|Library home]]
