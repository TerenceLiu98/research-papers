---
title: Continual Learning
type: concept
aliases:
  - Class-Incremental Learning
  - CIL
tags:
  - continual-learning
  - class-incremental-learning
  - catastrophic-forgetting
  - representation-learning
---

## Overview

Continual learning studies models that acquire knowledge from a sequence of tasks or data streams while retaining useful information from earlier tasks. In class-incremental learning, new classes arrive over time and the model must classify among all classes seen so far, often without access to earlier training examples.

## Key Ideas

- Catastrophic forgetting occurs when updates for new tasks damage performance or representations learned for earlier tasks.
- Regularization-based methods constrain changes to important parameters or outputs; rehearsal-based methods replay stored or synthetic examples; architecture-based methods allocate separate capacity to tasks. Pre-trained-model methods also use frozen or parameter-efficient representations.
- Exemplar-free class-incremental learning must preserve old knowledge without retaining raw examples. Prototype compensation and feature translation approximate old-class features from information available in later tasks.
- Interpretability can drift as the model is updated: a class may remain recognizable while the concepts supporting its prediction change. Concept bottlenecks provide a way to inspect this change when their vocabulary remains stable and meaningful.
- Performance should be reported across tasks, such as average incremental accuracy and final accuracy, rather than only on the newest task.

## Important Papers

- [[Language Guided Concept Bottleneck Models for Interpretable Continual Learning]]
- Rymarczyk, van de Weijer, Zielinski, and Twardowski (2023), "ICICLE: Interpretable Class Incremental Continual Learning."
- Yu et al. (2020), "Semantic Drift Compensation for Class-Incremental Learning."
- Masana et al. (2022), "Class-incremental learning: Survey and performance evaluation on image classification."
- Li and Hoiem (2017), "Learning without Forgetting."

## Related Concepts

- [[Concept Bottleneck Models]]
- Catastrophic forgetting
- Class-incremental learning
- Prototype augmentation
- Pre-trained representations
