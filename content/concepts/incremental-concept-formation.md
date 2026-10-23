---
title: Incremental Concept Formation
type: concept
aliases:
  - Probabilistic Concept Formation
  - Conceptual Clustering
tags:
  - conceptual-clustering
  - continual-learning
  - hierarchical-modeling
  - unsupervised-learning
---

## Overview

Incremental concept formation organizes observations into a hierarchy while they arrive, maintaining statistical descriptions of concepts instead of repeatedly fitting a fixed partition to the complete dataset. Internal nodes represent broader concepts and descendants represent progressively narrower categories. The hierarchy can grow and be locally restructured as new evidence arrives.

## Key Ideas

- **Category utility:** Cobweb evaluates a partition by how much knowing a child category improves feature prediction or reduces uncertainty relative to its parent.
- **Local restructuring:** An insertion can update an existing child, create a new child, merge children, or split a child. These operations permit changing breadth and depth without fixing the number of categories beforehand.
- **Sufficient statistics:** Concept nodes summarize their observations. For continuous features, a node can maintain means and variances and use uncertainty reduction under a Gaussian model.
- **Order sensitivity:** Greedy online construction makes learning efficient and naturally supports streams, but different arrival orders can produce different hierarchies and local operations do not ensure a globally optimal taxonomy.
- **Representation dependence:** When concept formation operates on learned embeddings, its categories inherit the distinctions, distances, and biases encoded by the representation model.

## Important Papers

- Fisher (1987), "Knowledge Acquisition via Incremental Conceptual Clustering": introduces Cobweb and its category-utility-driven hierarchy construction.
- Gluck and Corter (1985), "Information, Uncertainty, and the Utility of Categories": develops the information-theoretic basis for category utility.
- Barari, Lian, and MacLellan (2024), "Incremental Concept Formation over Visual Images without Catastrophic Forgetting": extends probabilistic concept formation to continuous neural representations.
- [[papers/cobwebtm-probabilistic-concept-formation-for-lifelong-and-hierarchical-topic-modeling|CobwebTM: Probabilistic Concept Formation for Lifelong and Hierarchical Topic Modeling]] applies continuous Cobweb to streaming document embeddings and derives flat and hierarchical topics from the resulting tree.

## Related Concepts

- [[concepts/continual-learning|Continual Learning]]
- [[concepts/hierarchical-topic-models|Hierarchical Topic Models]]
- [[concepts/text-embedding-models|Text Embedding Models]]
- Hierarchical clustering
- Online clustering
- Catastrophic forgetting
