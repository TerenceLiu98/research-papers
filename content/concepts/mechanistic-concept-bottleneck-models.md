---
title: Mechanistic Concept Bottleneck Models
type: concept
aliases:
  - M-CBM
  - M-CBMs
tags:
  - concept-bottleneck-models
  - sparse-autoencoders
  - mechanistic-interpretability
  - multimodal-interpretability
---

## Overview

Mechanistic Concept Bottleneck Models (M-CBMs) construct an interpretable bottleneck from concepts discovered in a trained black-box model. A sparse autoencoder exposes candidate features in the backbone representation, while a multimodal language model names and annotates those features before a concept bottleneck and sparse classifier are trained. The approach treats the model's learned representation as a source of task-relevant concepts rather than assuming that a human- or language-model-specified vocabulary is sufficient.

## Key Ideas

- Train an SAE on backbone activations, filter dead or low-impact neurons, and use the remaining features as candidate concepts.
- Ground concept names with highly activating and non-activating images plus saliency maps, then use a multimodal language model to produce concise names and partially supervised presence/absence annotations.
- Train the CBL on masked annotations instead of treating an SAE activation as a fully faithful concept label. This separates feature discovery from semantic validation, but it does not guarantee that the resulting concept predictor is causally faithful.
- Use class-agnostic annotation to reduce leakage from concept labels that are implicitly tied to target classes. Random-word controls remain important because decision sparsity alone does not eliminate leakage.
- Measure explanation conciseness with the Number of Contributing Concepts (NCC), which counts the smallest set of highest-contribution concepts covering a chosen fraction of a prediction. Unlike NEC, NCC does not require a hard limit on the number of nonzero weights in the class-level vocabulary.

## Important Papers

- [[Learning Concept Bottleneck Models from Mechanistic Explanations]]
- [[Concept Bottleneck Models]]
- [[Sparse Autoencoders]]
- Rao, Mahajan, Bohle, and Schiele (2024), "Discover-then-Name: Task-Agnostic Concept Bottlenecks via Automated Concept Discovery."
- Srivastava, Yan, and Weng (2024), "VLG-CBM: Training Concept Bottleneck Models with Vision-Language Guidance."

## Related Concepts

- [[Concept Bottleneck Models]]
- [[Sparse Autoencoders]]
- [[Concept Bottleneck Sparse Autoencoders]]
- [[Model Steerability]]
- [[Vision-to-Concept Tokenizers]]
- Mechanistic interpretability
- Information leakage
