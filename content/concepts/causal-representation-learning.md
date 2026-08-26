---
title: Causal Representation Learning
type: concept
aliases:
  - Causal Representations
  - Causal Representation Learning (CRL)
tags:
  - causal-representation-learning
  - causality
  - representation-learning
  - latent-variable-models
  - out-of-distribution-generalization
---

## Overview

Causal representation learning seeks to recover useful high-level variables and relationships from low-level, often unstructured observations. Unlike a representation that only preserves statistical information, a causal representation is intended to support statements about interventions, counterfactuals, transfer, or planning. The goal is usually task-relative partial recovery of causal structure, not guaranteed reconstruction of every latent variable in the world.

## Key Ideas

- High-dimensional observations can be treated as entangled views of latent causal variables, for example $X=G(S_1,\ldots,S_n)$. Learning then includes discovering the units, relations, and mechanisms that ordinary causal analysis assumes are given.
- A structured encoder-decoder can combine perception with a causal model: an encoder maps observations to latent variables or exogenous noise, a structured mapping implements causal assignments, and a decoder reconstructs the observation.
- [[Independent Causal Mechanisms]] and the sparse mechanism shift hypothesis provide inductive biases. Mechanism invariance across environments and sparse changes under interventions can favor representations that transfer better than entangled statistical features.
- The useful granularity of a causal variable depends on the task, available interventions, environmental variation, and supervision. Full latent recovery may be unreasonable even when a representation supports the causal statements needed downstream.
- I.i.d. observations alone generally do not identify causal variables or exogenous noise. Additional assumptions, interventions, multiple environments, temporal structure, or other supervision are needed, and unobserved confounding remains a central difficulty.
- Proposed benefits include robustness to distribution shifts, reusable modules, interventional world models, and counterfactual reasoning in reinforcement learning. These are design goals and hypotheses, not automatic guarantees of semantic correctness.

## Important Papers

- [[Toward Causal Representation Learning]]
- [[Statistical and Structural Identifiability in Representation Learning]]
- Bengio et al. (2019), "A Meta-Transfer Objective for Learning to Disentangle Causal Mechanisms."
- Parascandolo, Kilbertus, Rojas-Carulla, and Schölkopf (2018), "Learning Independent Causal Mechanisms."
- Locatello et al. (2020), "Weakly-Supervised Disentanglement Without Compromises."

## Related Concepts

- [[Independent Causal Mechanisms]]
- [[Disentangled Representations]]
- [[Structural Identifiability]]
- [[Statistical Identifiability]]
- [[Continual Learning]]
- Causal discovery
- Domain generalization
- Interventional world models
