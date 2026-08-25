---
title: Hierarchical Concept Pursuit
type: concept
aliases:
  - Hierarchical Sparse Concept Recovery
  - Hierarchical Beam Orthogonal Matching Pursuit
  - HB-OMP
tags:
  - sparse-coding
  - hierarchical-representations
  - concept-recovery
  - interpretable-machine-learning
---

## Overview

Hierarchical concept pursuit recovers a structured explanation whose selected concepts follow a valid path through a semantic hierarchy. Instead of letting sparse coding choose arbitrary atoms globally, it restricts each refinement to children of the current concept and can retain multiple candidate paths to reduce greedy search errors.

## Key Ideas

- A hierarchical dictionary can assign one atom to every child–parent embedding difference. Summing atoms along a root-to-node path telescopes to the node embedding.
- Restricting candidate atoms to children of the current node prevents supports that mix incompatible branches and narrows the set of off-support competitors.
- Hierarchical Beam Orthogonal Matching Pursuit maintains several partial root-to-node paths. Each extension adds a child, refits the active coefficients by least squares, and ranks hypotheses by reconstruction residual.
- Beam search trades computation for robustness: retaining multiple early branch choices reduces irreversible error propagation, while larger beams increase runtime with depth and branching ratio.
- The method's explanation quality depends on the semantic hierarchy. A noisy taxonomy can make a structurally valid path semantically wrong.
- [[Hierarchical Concept Embedding]] provides geometry that makes child–parent atoms meaningful and supports path recovery.

## Important Papers

- [[Hierarchical Concept Embedding & Pursuit for Interpretable Image Classification]]
- Jost, Vandergheynst, and Frossard (2006), "Tree-Based Pursuit: Algorithm and Properties."
- La and Do (2006), "Tree-Based Orthogonal Matching Pursuit Algorithm for Signal Reconstruction."
- Jenatton et al. (2011), "Proximal Methods for Hierarchical Sparse Coding."

## Related Concepts

- [[Hierarchical Concept Embedding]]
- Orthogonal matching pursuit
- Structured sparse coding
- Beam search
- Concept bottleneck models
