---
title: Concept Bottleneck Sparse Autoencoders
type: concept
aliases:
  - CB-SAE
  - CB-SAEs
tags:
  - sparse-autoencoders
  - concept-bottleneck-models
  - model-steering
  - multimodal-interpretability
---

## Overview

Concept Bottleneck Sparse Autoencoders (CB-SAEs) are a post-hoc hybrid representation that combines an unsupervised sparse autoencoder with a user-specified concept bottleneck. The sparse component preserves useful discovered features, while the bottleneck adds concepts missing from the retained sparse representation and is trained for both interpretability and [[Model Steerability]].

## Key Ideas

- First score sparse-autoencoder neurons for interpretability and steerability, then prune the low-utility neurons while freezing the retained encoder and decoder.
- Build the concept set from user-specified concepts that are absent from the retained SAE, avoiding redundant concept neurons.
- Train a concept encoder against CLIP zero-shot concept predictions, use a sparse concept decoder to recover reconstruction lost during pruning, and apply a cyclic reconstruction loss so decoded interventions remain aligned when re-encoded.
- The hybrid design preserves unsupervised discovery while adding explicit concept coverage. Its main tradeoff is that concept neurons can be more interpretable but less steerable than retained SAE neurons.
- Evaluation should report reconstruction, interpretability, and steerability separately. Aggregating them into a single utility score can hide the retained-feature versus concept-feature tradeoff.

## Important Papers

- [[Interpretable and Steerable Concept Bottleneck Sparse Autoencoders]]
- Kulkarni et al. (2025), "Interpretable generative models through post-hoc concept bottlenecks."
- Oikarinen, Das, Nguyen, and Weng (2023), "Label-free concept bottleneck models."
- Yang et al. (2025), "AlignSAE: Concept-aligned sparse autoencoders."

## Related Concepts

- [[Sparse Autoencoders]]
- [[Concept Bottleneck Models]]
- [[Model Steerability]]
- Concept alignment
- Post-hoc interpretability
