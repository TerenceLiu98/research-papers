---
title: Temporal Sparse Autoencoders
type: concept
aliases:
  - T-SAEs
  - Temporal SAEs
tags:
  - sparse-autoencoders
  - mechanistic-interpretability
  - temporal-representation-learning
  - feature-disentanglement
---

## Overview

Temporal Sparse Autoencoders (T-SAEs) are [[concepts/sparse-autoencoders|Sparse Autoencoders]] that use neighboring positions in a sequence as self-supervision. They divide the sparse code into high-level features encouraged to remain consistent over nearby tokens and unconstrained low-level features that reconstruct residual, token-specific information. The goal is to recover persistent semantic and contextual structure without discarding local syntax.

## Key Ideas

- **Temporal persistence is a representation prior.** Nearby tokens usually share topic, intent, and context even when their parts of speech or lexical identities differ. T-SAEs encode this assumption in their objective rather than treating token activations as independent samples.
- **A hierarchical code separates timescales.** The high-level subset approximately reconstructs an activation, while the full code reconstructs its residual. A temporal contrastive loss is applied only to the high-level subset, leaving the low-level subset free to model rapidly changing information.
- **Negative pairs prevent smoothness collapse.** Making adjacent codes similar is insufficient if every sequence can map to the same constant code. Contrasting other sequences encourages the smooth features to remain discriminative.
- **The learned split is useful but not absolute.** Semantic, contextual, and syntactic information can overlap, and the chosen feature ratio and temporal distance change which information each subset retains.
- **Smooth features support sequence-level inspection.** Tracking persistent feature activations can expose semantic transitions, information carried across passage boundaries, or aggregate differences between groups of sequences.
- **Temporal consistency may improve [[concepts/model-steerability|Model Steerability]].** Exciting a feature throughout generation resembles the training behavior of a temporally persistent feature more closely than that of a token-local feature. This is an empirical hypothesis whose validity depends on feature selection and the intervention protocol.
- **The prior has computational and geometric costs.** Paired activations increase memory consumption, and a dense-space cosine contrastive loss may not be optimal for nonnegative sparse codes. A single high/low partition also cannot represent every linguistic timescale.

## Important Papers

- [[papers/temporal-sparse-autoencoders-leveraging-the-sequential-nature-of-language-for-interpretability|Temporal Sparse Autoencoders: Leveraging the Sequential Nature of Language for Interpretability]] introduces the high/low feature split and temporal contrastive objective and evaluates them on language-model activations.
- Bussmann et al. (2025), "Learning Multi-Level Features with Matryoshka Sparse Autoencoders," provides the hierarchical SAE objective used as the reconstruction component.
- Klindt et al. (2020), "Towards Nonlinear Disentanglement in Natural Data with Temporal Sparse Coding," studies temporal structure as a source of identifiability and disentanglement.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/model-steerability|Model Steerability]]
- Feature disentanglement
- Contrastive representation learning
- Temporal representation learning
- Sequence-level interpretability
