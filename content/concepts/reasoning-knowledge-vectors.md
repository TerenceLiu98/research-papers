---
title: Reasoning Knowledge Vectors
type: concept
aliases:
  - Reasoning Vectors
  - Logical Reasoning Vectors
tags:
  - logical-reasoning
  - activation-steering
  - representation-geometry
  - mechanistic-interpretability
---

## Overview

Reasoning knowledge vectors are directions in a language model's activation space intended to encode and causally influence a reasoning behavior. They extend linear representation steering from broad semantic attributes to inferential processes such as deduction, induction, or abduction. Evidence for such a vector requires more than probe accuracy: intervening along the direction should change task performance in the predicted way.

## Key Ideas

- A direction can be learned by contrasting activations from successful and failed reasoning trajectories, for example by using the weight of a linear probe trained on those activations.
- Adding the direction to residual-stream activations during generation turns an observational representation into a test of [[concepts/model-steerability|Model Steerability]]. Improvements remain specific to the intervention layer, strength, prompt construction, task, and metric.
- Different reasoning types can occupy nearly orthogonal directions even when their behaviors are complementary. Joint refinement can encourage information sharing, but unconstrained alignment risks collapsing distinct behaviors into one direction.
- [[concepts/sparse-autoencoders|Sparse Autoencoders]] can define feature subspaces that constrain refinement and provide candidate semantic descriptions of what changed. SAE labels are interpretive evidence, not complete causal explanations.
- Activation patching and token-level likelihood shifts can test which components and linguistic cues respond to steering, while leaving open whether the recovered direction is unique or transfers beyond the extraction benchmark.

## Important Papers

- [[papers/knowledge-vector-of-logical-reasoning-in-large-language-models|Knowledge Vector of Logical Reasoning in Large Language Models]] extracts and jointly refines deductive, inductive, and abductive reasoning vectors with SAE-derived subspace constraints.
- Venhoff et al. (2025), "Understanding Reasoning in Thinking Language Models via Steering Vectors."
- Zhang and Viteri, "Uncovering Latent Chain of Thought Vectors in Large Language Models."

## Related Concepts

- [[concepts/model-steerability|Model Steerability]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/attribution-patching|Attribution Patching]]
- [[concepts/manifold-steering|Manifold Steering]]
