---
title: Hierarchical Topic Models
type: concept
aliases:
  - HTMs
  - Hierarchical Topic Modeling
tags:
  - topic-modeling
  - hierarchical-modeling
  - representation-learning
  - unsupervised-learning
---

## Overview

Hierarchical topic models organize latent themes into a tree or another multilevel structure rather than presenting them as a flat set. Topics near the root are intended to describe broad themes, while descendants divide those themes into progressively narrower subtopics. A useful hierarchy therefore requires more than coherent topics at each level: children should remain semantically related to their parents, siblings should be distinguishable, and specificity should increase with depth.

## Key Ideas

- **Hierarchy construction:** Bayesian models can jointly infer topic paths and document assignments, neural models can learn level-specific latent variables, and matrix-factorization methods can recursively partition the documents assigned to each parent.
- **Parametric versus nonparametric structure:** Parametric models fix the number of topics or children and the maximum depth. Nonparametric models can infer parts of the tree structure but may require expensive posterior inference.
- **Semantic guidance:** Bag-of-words inputs can produce sparse or incoherent topics, especially for short documents. [[Text Embedding Models|word embeddings]], knowledge bases, or regularizers can inject relationships that are absent from raw term counts.
- **Geometric inductive bias:** Hyperbolic spaces represent branching structures with less distortion than comparable Euclidean spaces. A model can use hyperbolic word neighborhoods to distinguish local parent-child relations from similarities between concepts on different branches.
- **Hierarchy-aware evaluation:** Flat topic coherence measures whether words within a topic co-occur. Hierarchical coherence compares words in parent-child pairs, affinity contrasts children with non-children, and specialization measures whether deeper topics increasingly diverge from the whole-corpus word distribution.
- **Interpretation caveat:** A tree is not automatically meaningful merely because topics were generated recursively. Parent-child relatedness, sibling diversity, stability, and domain validity must be assessed separately.

## Important Papers

- Blei, Griffiths, Jordan, and Tenenbaum (2003), "Hierarchical Topic Models and the Nested Chinese Restaurant Process."
- Isonuma, Mori, Bollegala, and Sakata (2020), "Tree-Structured Neural Topic Model."
- Viegas et al. (2020), "CluHTM: Semantic Hierarchical Topic Modeling Based on CluWords."
- [[HyHTM: Hyperbolic Geometry based Hierarchical Topic Models]]

## Related Concepts

- [[Riemannian Representation Learning]]
- [[Text Embedding Models]]
- [[Continuous Topic Models]]
- Topic modeling
- Hyperbolic embeddings
- Nonnegative matrix factorization
- Latent Dirichlet allocation
