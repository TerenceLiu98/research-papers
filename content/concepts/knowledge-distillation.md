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
- **Behavior-preserving alignment:** Distribution matching need not compress a larger teacher. [[CLIP-Free, Label Free, Unsupervised Concept Bottleneck Models|TextUnlock]] uses a frozen classifier's soft output distribution to train a projection into a text-embedding space, preserving its class relationships while making its features text-queryable.
- **Generated supervision:** Sequence-level KD trains on teacher-generated outputs. Black-box distillation can use generated text when probabilities and internal states are unavailable.
- **Student-generated contexts:** Methods such as MiniLLM and GKD, as discussed in the FDD paper, use student-generated outputs to address differences between training contexts and contexts encountered during generation.
- **Intermediate supervision:** Hidden-state or attention matching adds constraints within the model. Different hidden dimensions require a comparison space or projection. [[concepts/feature-dynamics-distillation|Feature Dynamics Distillation]] uses vocabulary predictions and cross-layer changes to provide such supervision.
- **Evaluation:** A distilled student can exceed its teacher on particular metrics and datasets, but this does not imply general superiority. Aggregate improvements should be checked against individual tasks, teacher access assumptions, and training costs.

## Important Papers

- Hinton, Vinyals, and Dean (2015), "Distilling the Knowledge in a Neural Network": foundational distribution-matching reference cited by the FDD paper.
- [[papers/beyond-logits-aligning-feature-dynamics-for-effective-knowledge-distillation|Beyond Logits: Aligning Feature Dynamics for Effective Knowledge Distillation]] combines final-output, intermediate-trajectory, and layer-delta objectives in white-box LLM distillation.
- [[CLIP-Free, Label Free, Unsupervised Concept Bottleneck Models]] applies output-distribution matching to align a frozen visual classifier with a text-derived classifier rather than to reduce model size.

## Related Concepts

- [[concepts/feature-dynamics-distillation|Feature Dynamics Distillation]]: matches intermediate predictions and their changes across selected layers.
- [[Concept Bottleneck Models]]: expose predictions through human-readable intermediate concepts; TextUnlock uses distribution matching to retrofit such a bottleneck onto a frozen visual classifier.
- Supervised fine-tuning: trains against target responses and provides the student initialization used in the FDD experiments.
