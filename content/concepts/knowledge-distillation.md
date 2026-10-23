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
- **Student-generated contexts:** Methods such as MiniLLM and GKD, as discussed in the FDD paper, use student-generated outputs to address differences between training contexts and contexts encountered during generation.
- **Intermediate supervision:** Hidden-state or attention matching adds constraints within the model. Different hidden dimensions require a comparison space or projection. [[concepts/feature-dynamics-distillation|Feature Dynamics Distillation]] uses vocabulary predictions and cross-layer changes to provide such supervision.
- **Transfer into a constrained student:** Distillation can compensate for a student's deliberately restricted decision rule rather than only its size. [[papers/question-driven-decision-tree-via-knowledge-distillation-for-interpretable-prediction|Question-Driven Decision Tree]] matches main-task and sub-task outputs plus spatial attention while retaining deterministic clinical-tree aggregation at inference.
- **Evaluation:** A distilled student can exceed its teacher on particular metrics and datasets, but this does not imply general superiority. Aggregate improvements should be checked against individual tasks, teacher access assumptions, and training costs.

## Important Papers

- Hinton, Vinyals, and Dean (2015), "Distilling the Knowledge in a Neural Network": foundational distribution-matching reference cited by the FDD paper.
- [[papers/logit-distance-bounds-representational-similarity|Logit Distance Bounds Representational Similarity]] shows theoretically and empirically that logit-matched students preserve teacher representation geometry and linearly recoverable concepts better than KL-distilled students in its evaluated settings.
- [[papers/beyond-logits-aligning-feature-dynamics-for-effective-knowledge-distillation|Beyond Logits: Aligning Feature Dynamics for Effective Knowledge Distillation]] combines final-output, intermediate-trajectory, and layer-delta objectives in white-box LLM distillation.
- [[CLIP-Free, Label Free, Unsupervised Concept Bottleneck Models]] applies output-distribution matching to align a frozen visual classifier with a text-derived classifier rather than to reduce model size.
- [[papers/question-driven-decision-tree-via-knowledge-distillation-for-interpretable-prediction|Question-Driven Decision Tree via Knowledge Distillation for Interpretable Prediction]] transfers output distributions and attention from a learned aggregator to a logic-constrained medical-image classifier.
- [[papers/when-agents-look-the-same-quantifying-distillation-induced-similarity-in-tool-use-behaviors|When Agents Look the Same: Quantifying Distillation-Induced Similarity in Tool-Use Behaviors]] measures whether tool-using agents converge on optional verbal and action patterns and tests the action metric with a controlled teacher-student intervention.

## Related Concepts

- [[concepts/feature-dynamics-distillation|Feature Dynamics Distillation]]: matches intermediate predictions and their changes across selected layers.
- [[Concept Bottleneck Models]]: expose predictions through human-readable intermediate concepts; TextUnlock uses distribution matching to retrofit such a bottleneck onto a frozen visual classifier.
- Supervised fine-tuning: trains against target responses and provides the student initialization used in the FDD experiments.
- [[concepts/tool-use-agent-behavioral-similarity|Tool-Use Agent Behavioral Similarity]]: separates task-mandated actions from discretionary trajectory patterns that may carry evidence of behavioral inheritance.
