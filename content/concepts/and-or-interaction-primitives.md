---
title: AND/OR Interaction Primitives
type: concept
aliases:
  - AND-OR Interactions
  - Interaction Primitives
tags:
  - neural-network-interpretability
  - interaction-primitives
  - feature-interactions
---

## Overview

AND/OR interaction primitives decompose a scalar model score into effects associated with subsets of input variables under a specified masking baseline. An AND effect requires all variables in its subset to be present; an OR effect requires at least one. This provides an input-based vocabulary for comparing explanations across models or layers without aligning hidden feature dimensions.

## Key Ideas

- **Subset effects:** AND effects are alternating sums over retained subsets. OR effects use negative alternating sums over complementary masks. A joint explanation splits the score into AND and OR components, with learnable decomposition parameters optimized for sparsity.
- **Order:** The number of variables in a subset measures interaction complexity. It depends on the chosen variables, such as words or image patches, rather than a universal semantic complexity scale.
- **Reconstruction and sparsity:** The full interaction decomposition reconstructs the score for every mask. A small salient subset can approximate those scores when the effects are sufficiently sparse. Exact reconstruction alone does not guarantee a sparse explanation, and joint AND/OR sparsity is not established for arbitrary networks.
- **Layer comparison:** [[concepts/linear-probing|Linear Probing]] supplies a task-specific scalar score for intermediate features. Shared signed interaction strength can then quantify completeness relative to final-output effects and redundancy that disappears by the final layer.
- **Interpretation limits:** Baselines, grouping, thresholds, and decomposition choices affect the explanation. Agreement across models and stability under noise are useful diagnostics, but neither proves human-semantic meaning or predictive generalization.

## Important Papers

- [[papers/layerwise-change-of-knowledge-in-neural-networks|Layerwise Change of Knowledge in Neural Networks]] extends the framework to intermediate layers and reports greater model agreement and noise stability for lower-order effects.
- Li and Zhang (2023), "Does a Neural Network Really Encode Symbolic Concepts?" is a foundational reference discussed in that paper.
- Ren et al. (2024), "Where We Have Arrived in Proving the Emergence of Sparse Interaction Primitives in AI Models." develops conditional sparsity results.

## Related Concepts

- [[concepts/linear-probing|Linear Probing]]
- [[concepts/concept-bottleneck-models|Concept Bottleneck Models]]: semantic concept variables provide a different explanatory vocabulary from masked-input subset effects.
- Feature attribution and Shapley values: Appendix B of the layerwise paper expresses Shapley attribution as an equal allocation of each interaction effect among its constituent variables.
