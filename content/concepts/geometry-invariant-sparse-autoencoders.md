---
title: Geometry-Invariant Sparse Autoencoders
type: concept
aliases:
  - GI-SAE
  - GI-SAEs
tags:
  - sparse-autoencoders
  - contrastive-learning
  - multilingual-reasoning
  - representation-alignment
---

## Overview

Geometry-Invariant Sparse Autoencoders (GI-SAEs) augment sparse reconstruction with a contrastive objective that encourages semantically matched activations to receive similar sparse codes. They are intended for settings where observations differ in surface form, such as reasoning traces in different languages, but should preserve shared task structure. Greater code similarity is an optimization target, not evidence that aligned features have the same downstream function.

## Key Ideas

- A GI-SAE retains the encoder, TopK bottleneck, decoder, and reconstruction loss of a standard [[concepts/sparse-autoencoders|Sparse Autoencoder]].
- An InfoNCE term pulls together normalized sparse codes carrying the same semantic label and separates codes with different labels. The label granularity determines what invariance is encouraged.
- In multilingual reasoning, problem-identity labels allow different languages and token positions for the same problem to form positive pairs. This can align broad problem or answer structure without guaranteeing step-level alignment.
- Geometric evaluation and causal evaluation answer different questions. CKA measures matrix geometry, active-index overlap measures dictionary sharing, and feature patching tests whether aligned values can be exchanged without disrupting behavior.
- Contrastive alignment is most useful when the baseline representation contains enough shared structure to strengthen but is not already saturated. With very low sharing it may align codes without aligning function; with saturated sharing it may increase disruption while adding little overlap.
- Reconstruction quality, feature utilization, intervention scale, and the normalization convention remain important controls because the contrastive objective can trade reconstruction fidelity for apparent alignment.

## Important Papers

- [[papers/discovering-cross-language-reasoning-invariance-in-llms-with-geometry-invariant-sparse-autoencoders|Discovering Cross-Language Reasoning Invariance in LLMs with Geometry-Invariant Sparse Autoencoders]] introduces GI-SAE and reports that geometric gains translate into lower causal disruption mainly for model layers with moderate baseline feature sharing.
- Gao et al. (2025), "Scaling and evaluating sparse autoencoders," provides the TopK SAE architecture used as the reconstruction baseline.
- van den Oord, Li, and Vinyals (2019), "Representation Learning with Contrastive Predictive Coding," introduces the InfoNCE objective adapted by GI-SAE.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/cross-lingual-feature-steering|Cross-Lingual Feature Steering]]
- Causal activation patching
- Contrastive representation learning
- Centered Kernel Alignment
- Multilingual reasoning
