---
title: Steering Vector Distillation
type: concept
aliases:
  - Activation Direction Distillation
tags:
  - steering-vectors
  - knowledge-distillation
  - mechanistic-interpretability
  - representation-learning
---

## Overview

Steering vector distillation occurs when a student trained on outputs from a steered teacher acquires an activation-space shift aligned with the teacher's steering direction. The supervision need not describe the direction's semantic meaning: model-specific changes in the teacher's output distribution can carry enough information for the student to reconstruct the internal effect.

## Key Ideas

- A teacher direction can be extracted as a mean residual-stream difference between contrastive conditions or supplied directly as a semantic, random, or sparse-autoencoder direction.
- Distillation can be measured internally through activation-difference cosine similarity or empirical activation similarity, and behaviorally through output shifts. These criteria are not interchangeable.
- Loss on held-out steered completions tests whether the student has learned the teacher-induced output distribution even when no recognizable semantic behavior transfers.
- [[concepts/subliminal-learning|Subliminal Learning]] is the semantic special case: a system-prompt-induced direction is transmitted through filtered, trait-unrelated outputs and later recreates the teacher's trait in the student.
- Behavioral transfer requires more than direction acquisition. Inference-time steerability predicts which semantic directions produce a recognizable student trait, while random and weak-semantic vectors can still be distilled by internal metrics.
- Direction effects include semantic and model-specific components. Model-specific effects can alter filtered outputs and support same-family transfer while failing to carry reliably across unrelated model families.
- Low-rank training and adaptive optimization strengthen the reported effect. This is empirical dependence, not part of the definition: weaker vector distillation is also observed under full fine-tuning.

## Important Papers

- [[papers/subliminal-learning-is-steering-vector-distillation|Subliminal Learning Is Steering Vector Distillation]]: defines and tests the phenomenon across prompted traits and directly supplied semantic, weak-semantic, random, and SAE directions.
- Turner et al. (2023), "Steering Language Models with Activation Engineering": establishes activation addition as a behavioral intervention.
- Panickssery et al. (2023), "Steering Llama 2 via Contrastive Activation Addition": constructs steering directions from contrastive activation differences.
- Hinton, Vinyals, and Dean (2015), "Distilling the Knowledge in a Neural Network": foundational context for teacher-student transfer.

## Related Concepts

- [[concepts/subliminal-learning|Subliminal Learning]]
- [[concepts/model-steerability|Model Steerability]]
- [[concepts/knowledge-distillation|Knowledge Distillation]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- Activation engineering
- Low-rank adaptation
