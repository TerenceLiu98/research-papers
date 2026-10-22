---
title: Causal Concept Bottlenecks
type: concept
aliases:
  - Causal Concept Bottleneck
  - Causally Reliable Concept Bottleneck Models
  - C²BM
  - C2BM
tags:
  - concept-bottleneck-models
  - causal-machine-learning
  - interpretable-machine-learning
  - concept-interventions
---

## Overview

Causal concept bottlenecks organize human-interpretable intermediate variables according to an explicit causal graph. Unlike a flat [[concepts/concept-bottleneck-models|Concept Bottleneck Model]], where every concept typically feeds the task directly, information and interventions travel only along specified parent-child relations.

## Key Ideas

- Nodes represent interpretable endogenous variables, while directed edges state which variables may directly affect which descendants.
- A concept prediction is computed from its causal parents plus input-derived exogenous information. This separates the visible concept graph from residual information needed to predict each variable.
- Intervening on a node overrides its ordinary prediction and propagates the new value through descendants, enabling corrections to intermediate concepts and blocking of specified causal pathways.
- Causal transparency and causal reliability are different: exposing a graph makes computation inspectable, but the graph is reliable only to the extent that it matches the target phenomenon's causal mechanisms.
- Graph construction may combine observational causal discovery with expert or textual background knowledge because observational data generally identify only an equivalence class under standard assumptions.
- High task accuracy does not validate the causal graph. Flexible encoders and adaptive structural functions can preserve prediction quality even when graph edges are misspecified.

## Important Papers

- [[Causally Reliable Concept Bottleneck Models]]
- Koh et al. (2020), "Concept Bottleneck Models."
- Vandenhirtz et al. (2024), "Stochastic Concept Bottleneck Models."
- Dominici et al. (2025), "Causal Concept Graph Models: Beyond Causal Opacity in Deep Learning."
- Moreira et al. (2024), "DiConStruct: Causal Concept-Based Explanations through Black-Box Distillation."

## Related Concepts

- [[concepts/concept-bottleneck-models|Concept Bottleneck Models]]
- [[concepts/concept-embedding-models|Concept Embedding Models]]
- [[concepts/causal-representation-learning|Causal Representation Learning]]
- Structural causal models
- Causal discovery
- Concept interventions
- Algorithmic fairness
