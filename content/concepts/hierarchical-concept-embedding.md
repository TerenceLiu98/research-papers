---
title: Hierarchical Concept Embedding
type: concept
aliases:
  - Hierarchical Concept Embeddings
tags:
  - hierarchical-representations
  - concept-embeddings
  - representation-geometry
  - interpretable-machine-learning
---

## Overview

Hierarchical concept embedding represents concepts so that geometric relationships reflect a semantic hierarchy. Descendants remain near their ancestors, sibling branches remain distinguishable, and the displacement from a parent to a child encodes the semantic refinement that separates them. This geometry supports explanations that move coherently from broad to specific concepts.

## Key Ideas

- **Subtree containment:** descendants of a node occupy a cone around the node's embedding, making a branch geometrically coherent.
- **Sibling separation:** cones associated with sibling subtrees should not overlap, allowing each descendant to be assigned to a unique parent branch.
- **Hierarchical orthogonality:** a child–parent difference vector is orthogonal to the parent embedding, so adding a refinement does not interfere with the coarser concept.
- **Simplex structure:** difference directions for siblings can form a regular simplex, distributing alternative refinements symmetrically within the feasible subspace.
- **Depth–dimension trade-off:** in the Euclidean construction studied by HCEP, a hierarchy with depth $L$ and branching ratio $b$ needs dimension at least $L+b-1$. Progressively narrower subtree cones can also make very deep hierarchies difficult to represent.
- Child–parent differences can serve as atoms in [[Hierarchical Concept Pursuit]], where a concept is reconstructed by accumulating refinements along a root-to-node path.

## Important Papers

- [[Hierarchical Concept Embedding & Pursuit for Interpretable Image Classification]]
- Park et al. (2025), "The Geometry of Categorical and Hierarchical Concepts in Large Language Models."
- Nickel and Kiela (2017), "Poincaré Embeddings for Learning Hierarchical Representations."

## Related Concepts

- [[Hierarchical Concept Pursuit]]
- Concept embeddings
- Hypernym–hyponym hierarchies
- Hyperbolic embeddings
- Representation geometry
