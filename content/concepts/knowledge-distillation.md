---
title: Knowledge Distillation
type: concept
aliases:
  - KD
tags:
  - knowledge-distillation
  - model-compression
---

## Overview

Knowledge distillation trains a student model using supervision supplied by a teacher, often to transfer capabilities into a smaller model. Teacher supervision can consist of output probability distributions, generated examples, or intermediate representations. These choices differ in the teacher access they require and the behavior they constrain.

## Key Ideas

- **Distribution matching:** Conventional token-level KD minimizes teacher-to-student KL divergence over next-token distributions. The training sequences and divergence direction are distinct design choices.
- **Representation preservation:** Matching predictions in KL does not generally ensure that student representations are linearly aligned with a teacher. [[concepts/logit-distance|Logit Distance]] gives stronger guarantees for preserving linear representation geometry because it remains sensitive to discrepancies on low-probability labels.
- **Behavior-preserving alignment:** Distribution matching need not compress a larger teacher. [[CLIP-Free, Label Free, Unsupervised Concept Bottleneck Models|TextUnlock]] uses a frozen classifier's soft output distribution to train a projection into a text-embedding space, preserving its class relationships while making its features text-queryable.
- **Generated supervision:** Sequence-level KD trains on teacher-generated outputs. Black-box distillation can use generated text when probabilities and internal states are unavailable.
- **Latent behavioral transfer:** Generated examples can transmit internal behavioral effects even when their visible semantics do not name the behavior. [[concepts/steering-vector-distillation|Steering Vector Distillation]] studies when a student reconstructs a teacher's activation direction from its output statistics; [[concepts/subliminal-learning|Subliminal Learning]] is the trait-transfer special case.
- **Student-generated contexts:** Methods such as MiniLLM and GKD, as discussed in the FDD paper, use student-generated outputs to address differences between training contexts and contexts encountered during generation.
- **Intermediate supervision:** Hidden-state or attention matching adds constraints within the model. Different hidden dimensions require a comparison space or projection. [[concepts/feature-dynamics-distillation|Feature Dynamics Distillation]] uses vocabulary predictions and cross-layer changes to provide such supervision.
- **Feature-distribution matching:** Rather than pairing individual activations, a student can match the distribution induced by its encoder to the teacher's feature distribution. [[papers/kd2m-a-unifying-framework-for-feature-knowledge-distillation|KD2M]] unifies empirical and Gaussian objectives based on Wasserstein distance, class-conditional or joint feature-label transport, MMD, and KL divergence.
- **Coordinate identifiability:** A learned feature-prediction head can absorb an invertible change of basis in the student representation. [[concepts/fixed-coordinate-compatibility|Fixed-Coordinate Compatibility]] instead tests direct decoding through a reference fixed before student training, separating coordinate reuse from feature predictability and downstream quality.
- **Task-agnostic visual transfer:** [[papers/accessing-vision-foundation-models-via-imagenet-1k|Proteus]] avoids proxy-dataset labels and class logits, instead matching classification tokens, full features, and masked-patch representations. Its ablations show that the objectives serve different downstream needs: token alignment favors classification, while feature and patch alignment improve dense prediction.
- **Transfer into a constrained student:** Distillation can compensate for a student's deliberately restricted decision rule rather than only its size. [[papers/question-driven-decision-tree-via-knowledge-distillation-for-interpretable-prediction|Question-Driven Decision Tree]] matches main-task and sub-task outputs plus spatial attention while retaining deterministic clinical-tree aggregation at inference.
- **Evaluation:** A distilled student can exceed its teacher on particular metrics and datasets, but this does not imply general superiority. Aggregate improvements should be checked against individual tasks, teacher access assumptions, and training costs.

## Important Papers

- Hinton, Vinyals, and Dean (2015), "Distilling the Knowledge in a Neural Network": foundational distribution-matching reference cited by the FDD paper.
- [[papers/logit-distance-bounds-representational-similarity|Logit Distance Bounds Representational Similarity]] shows theoretically and empirically that logit-matched students preserve teacher representation geometry and linearly recoverable concepts better than KL-distilled students in its evaluated settings.
- [[papers/beyond-logits-aligning-feature-dynamics-for-effective-knowledge-distillation|Beyond Logits: Aligning Feature Dynamics for Effective Knowledge Distillation]] combines final-output, intermediate-trajectory, and layer-delta objectives in white-box LLM distillation.
- [[CLIP-Free, Label Free, Unsupervised Concept Bottleneck Models]] applies output-distribution matching to align a frozen visual classifier with a text-derived classifier rather than to reduce model size.
- [[papers/question-driven-decision-tree-via-knowledge-distillation-for-interpretable-prediction|Question-Driven Decision Tree via Knowledge Distillation for Interpretable Prediction]] transfers output distributions and attention from a learned aggregator to a logic-constrained medical-image classifier.
- [[papers/when-agents-look-the-same-quantifying-distillation-induced-similarity-in-tool-use-behaviors|When Agents Look the Same: Quantifying Distillation-Induced Similarity in Tool-Use Behaviors]] measures whether tool-using agents converge on optional verbal and action patterns and tests the action metric with a controlled teacher-student intervention.
- [[papers/accessing-vision-foundation-models-via-imagenet-1k|Accessing Vision Foundation Models via ImageNet-1K]] distills DINOv2, SynCLR, and CLIP representations through a small public proxy dataset without using the teachers' original training data.
- [[papers/kd2m-a-unifying-framework-for-feature-knowledge-distillation|KD2M: A Unifying Framework for Feature Knowledge Distillation]] treats feature-based distillation as matching student and teacher encoder pushforward distributions and connects Wasserstein alignment to a conditional risk-difference bound.
- [[papers/what-does-multi-teacher-distillation-transfer-measuring-feature-distillation-with-fixed-concept-coordinates|What Does Multi-Teacher Distillation Transfer? Measuring Feature Distillation with Fixed Concept Coordinates]] audits whether multi-teacher feature distillation enters a prespecified sparse coordinate system and separates allocation, correspondence, and autonomous support selection.
- [[papers/subliminal-learning-is-steering-vector-distillation|Subliminal Learning Is Steering Vector Distillation]] separates internal direction acquisition from semantic trait expression in sequence-level teacher-student training.

## Related Concepts

- [[concepts/feature-dynamics-distillation|Feature Dynamics Distillation]]: matches intermediate predictions and their changes across selected layers.
- [[concepts/optimal-transport|Optimal Transport]]: provides feature-distribution discrepancies and coupling-based bounds for feature distillation.
- [[concepts/fixed-coordinate-compatibility|Fixed-Coordinate Compatibility]]: evaluates direct reuse of independently specified coordinates rather than prediction through a learned alignment map.
- [[Concept Bottleneck Models]]: expose predictions through human-readable intermediate concepts; TextUnlock uses distribution matching to retrofit such a bottleneck onto a frozen visual classifier.
- Supervised fine-tuning: trains against target responses and provides the student initialization used in the FDD experiments.
- [[concepts/tool-use-agent-behavioral-similarity|Tool-Use Agent Behavioral Similarity]]: separates task-mandated actions from discretionary trajectory patterns that may carry evidence of behavioral inheritance.
- [[concepts/steering-vector-distillation|Steering Vector Distillation]]: transfers a teacher's activation-space intervention through its generated outputs.
- [[concepts/subliminal-learning|Subliminal Learning]]: transfers a behavioral trait through semantically unrelated teacher data.
