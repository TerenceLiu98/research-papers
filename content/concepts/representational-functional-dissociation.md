---
title: Representational-Functional Dissociation
type: concept
aliases:
  - Representation-Function Dissociation
  - Geometric-Functional Dissociation
tags:
  - representational-similarity
  - mechanistic-interpretability
  - causal-analysis
  - model-comparison
---

## Overview

Representational-functional dissociation is the possibility that two models have similar internal representation geometry without implementing the same computation or using the aligned information in the same way. It separates a statistical relationship among activations from functional equivalence and causal relevance. High similarity can arise from shared inputs, architecture, or training statistics even when models reach outputs through different mechanisms.

## Key Ideas

- **Geometry and function answer different questions.** CKA, SVCCA, and neighborhood overlap compare activation structure; behavioral agreement, model stitching, feature exchange, and interventions test increasingly stronger notions of functional correspondence.
- **Stage matters.** Models may align while encoding an input and diverge when transforming that encoding into a decision. A single dataset-level score can obscure this transition.
- **Decodability is not causal use.** A probe can recover task information from several models even when removing the corresponding linear subspace rarely changes their predictions.
- **Difficulty can reverse the usual interpretation.** Shared confusion or diffuse processing can make models look more similar on inputs they collectively fail than on inputs they solve through distinct strategies.
- **Architecture supplies a baseline.** Similarity among randomly initialized networks shows that some alignment can precede learning; learned convergence should therefore be evaluated relative to architectural similarity.
- **Functional evidence is intervention-specific.** A failed linear ablation does not exclude nonlinear or distributed mechanisms, while a disruptive head ablation may show general component importance rather than a task-specific causal role.

## Important Papers

- [[papers/convergence-without-understanding-when-language-models-agree-on-representations-but-disagree-on-reasoning|Convergence Without Understanding: When Language Models Agree on Representations but Disagree on Reasoning]]: demonstrates difficulty, computational-stage, and causal dissociations across language-model families.
- Braun, Grant, and Saxe (2025), "Not All Solutions Are Created Equal: An Analytical Dissociation of Functional and Representational Similarity in Deep Linear Neural Networks": proves that representation and function can be decoupled in a controlled analytical setting.
- [[papers/discovering-cross-language-reasoning-invariance-in-llms-with-geometry-invariant-sparse-autoencoders|Discovering Cross-Language Reasoning Invariance in LLMs with Geometry-Invariant Sparse Autoencoders]]: shows that improved cross-language geometry does not consistently improve feature-level functional interchangeability.
- Kornblith et al. (2019), "Similarity of Neural Network Representations Revisited": provides CKA, a standard geometric comparison that does not by itself establish shared computation.

## Related Concepts

- [[concepts/universal-concept-spaces|Universal Concept Spaces]]
- [[concepts/cross-model-representational-disagreement|Cross-Model Representational Disagreement]]
- [[concepts/geometry-invariant-sparse-autoencoders|Geometry-Invariant Sparse Autoencoders]]
- [[concepts/linear-probing|Linear Probing]]
- Mechanistic interpretability
- Causal activation patching
