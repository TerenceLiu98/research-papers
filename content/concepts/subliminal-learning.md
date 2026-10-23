---
title: Subliminal Learning
type: concept
aliases:
  - Subliminal Trait Transfer
tags:
  - subliminal-learning
  - knowledge-distillation
  - unintended-generalization
  - model-behavior
---

## Overview

Subliminal learning is the transfer of a teacher model's behavioral trait to a student trained on teacher outputs that are semantically unrelated to that trait. A canonical example prompts a teacher to prefer an animal, filters animal references from generated number sequences, and finds that a same-base-model student fine-tuned on those sequences acquires the preference.

## Key Ideas

- The phenomenon is a form of unintended generalization rather than ordinary imitation of visible semantics: the training examples are selected to exclude direct references to the target behavior.
- Transfer depends strongly on teacher-student compatibility. It is most reliable when teacher and student share a base model, suggesting that model-specific output statistics can carry the hidden signal.
- Token entanglement and divergence-token analyses describe where biased teachers produce different next-token distributions. They do not alone specify what internal behavior the student learns.
- [[concepts/steering-vector-distillation|Steering Vector Distillation]] provides a candidate mechanism: a trait prompt induces an activation direction in the teacher, and student fine-tuning installs an aligned direction from its effects on otherwise unrelated outputs.
- Semantic trait acquisition is narrower than vector distillation. A student can internalize a random or weak-semantic direction according to activation and loss metrics without expressing a recognizable trait.
- The effect is training-regime dependent. In the reported language-model experiments, behavioral transfer appears under LoRA with adaptive optimizers, while full fine-tuning and plain SGD do not reproduce the classical trait-affinity effect.
- Filtering cannot establish that data contain no learnable correlations; it establishes that specified surface and autorater-detectable associations were removed. Claims should therefore distinguish semantically filtered data from information-free data.

## Important Papers

- Cloud et al. (2025), "Subliminal Learning: Language Models Transmit Behavioral Traits via Hidden Signals in Data": introduces the central teacher-student result across semantically unrelated outputs.
- [[papers/subliminal-learning-is-steering-vector-distillation|Subliminal Learning Is Steering Vector Distillation]]: tests steering directions as necessary and sufficient mediators and studies trait, model, optimizer, and parameterization dependence.
- Zur et al. (2025), "Token Entanglement in Subliminal Learning": analyzes coupled token probabilities as one source of the signal.
- Schrodi et al. (2026), "Towards Understanding Subliminal Learning: When and How Hidden Biases Transfer": reports transfer after excluding entangled tokens and identifies sparse divergence positions.

## Related Concepts

- [[concepts/steering-vector-distillation|Steering Vector Distillation]]
- [[concepts/knowledge-distillation|Knowledge Distillation]]
- [[concepts/model-steerability|Model Steerability]]
- Unintended generalization
- Low-rank adaptation
