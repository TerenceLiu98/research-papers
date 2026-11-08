---
title: Mechanistic Interpretability
type: concept
aliases:
  - Mechanistic AI Interpretability
tags:
  - neural-network-interpretability
  - representation-learning
  - causal-analysis
---

## Overview

Mechanistic interpretability studies the internal computations that support a neural network's generalization. Rather than explaining only one output, it seeks reusable accounts of how model components represent information, interact, and produce behavior across a class of inputs. Such accounts are useful only to the extent that they support reliable prediction, intervention, validation, or another concrete scientific or engineering goal.

## Key Ideas

- **Reverse engineering proceeds in stages.** A bottom-up analysis decomposes a network into candidate components, describes what activates them and what effects they have, and validates those descriptions with predictions or interventions.
- **Concept-based analysis runs in the other direction.** It starts with a human-defined concept and searches model activations for a corresponding component or subspace. [[concepts/linear-probing|Linear Probing]] can show that information is accessible, but not that the model causally uses it.
- **The decomposition is itself a hypothesis.** Neurons, attention heads, architectural blocks, and [[concepts/sparse-autoencoders|Sparse Autoencoders]] provide useful coordinates, but none is guaranteed to identify the functional units of computation. Distributed, nonlinear, and multidimensional representations complicate atom-by-atom explanations.
- **Description is not validation.** Max-activating examples and readable feature labels can generate plausible hypotheses while remaining sensitive to dataset bias and human projection. Causal interventions, predictive tests, model organisms, and ground-truth benchmarks provide stronger evidence.
- **Circuits combine several choices.** Circuit discovery defines a task, chooses a component basis, locates a task-relevant subgraph, iteratively describes its parts, and tests faithfulness, minimality, and completeness. [[concepts/attribution-patching|Attribution Patching]] can accelerate localization but is a first-order approximation.
- **Success is application-relative.** Monitoring, control, capability prediction, model editing, training and inference improvements, scientific knowledge extraction, and governance require different kinds and depths of understanding. Interpretability methods should be compared with relevant black-box alternatives rather than evaluated only on interpretability-specific criteria.
- **Socio-technical context matters.** An explanation's usefulness depends on its users and deployment context. Selective transparency, overstated safety assurances, dual-use capabilities, and institutional incentives can change the consequences of technical progress.

## Important Papers

- [[papers/open-problems-in-mechanistic-interpretability|Open Problems in Mechanistic Interpretability]] organizes the field around reverse engineering, concept-based methods, applications, and socio-technical challenges, then presents a broad open-problem agenda.
- [[papers/transformer-field-theory-a-response-theoretic-approach-to-mechanistic-interpretability|Transformer Field Theory: A Response-Theoretic Approach to Mechanistic Interpretability]] develops a local response view of residual-stream interventions.
- [[papers/discovering-sparse-concept-graphs-for-mechanistic-interpretability-in-vision-transformers|Discovering Sparse Concept Graphs for Mechanistic Interpretability in Vision Transformers]] connects sparse features across layers and tests graph edges with interventions.
- Wang et al. (2023), "Interpretability in the Wild: a Circuit for Indirect Object Identification in GPT-2 Small": a prominent end-to-end circuit analysis discussed by the review.
- Bills et al. (2023), "Language Models Can Explain Neurons in Language Models": automates component description and tests descriptions through activation prediction.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/attribution-patching|Attribution Patching]]
- [[concepts/irreducible-multidimensional-features|Irreducible Multidimensional Features]]
- [[concepts/model-steerability|Model Steerability]]
- [[concepts/causal-representation-learning|Causal Representation Learning]]
