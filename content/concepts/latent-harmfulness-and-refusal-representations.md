---
title: Latent Harmfulness and Refusal Representations
type: concept
aliases:
  - Harmfulness Direction
  - Refusal Direction
  - Latent Harmfulness Representation
tags:
  - llm-safety
  - mechanistic-interpretability
  - activation-steering
  - refusal
---

## Overview

Latent harmfulness and refusal representations distinguish an LLM's internal assessment that an instruction is harmful from its downstream decision to reject that instruction. The distinction matters when behavior and assessment diverge: a jailbreak can suppress refusal while a harm signal remains, and lexical triggers can cause refusal even when the model's earlier representation places the prompt near harmless examples.

## Key Ideas

- **Token position changes what is measured.** In chat models, an activation at the final user-instruction token can represent different information from an activation after assistant-role or other post-instruction template tokens.
- **Behavior is not identical to assessment.** Accepted harmful prompts and refused harmless prompts are diagnostic because harm labels and refusal behavior disagree. Clustering these cases can reveal which variable a representation tracks.
- **Difference-in-means directions are operational definitions.** A harmfulness direction can be defined between harmful and harmless centroids, while a refusal direction can be defined between refused and accepted centroids. These directions depend on the dataset, token position, layer, and model.
- **Causal tests need behavior that separates the concepts.** Ordinary refusal can be increased by either a stronger harm assessment or a direct refusal cue. A reply-inversion task maps a harmful judgment to an affirmative answer, so harm steering and refusal steering predict opposite tokens.
- **Harmfulness can be category-specific.** Directions extracted for different risk categories may be less mutually aligned than their corresponding refusal directions. A single global axis can therefore hide useful structure.
- **Latent safeguards inherit representation coverage limits.** A centroid classifier can reuse the model's forward pass and remain useful when refusal is bypassed, but it can fail under domain or taxonomy shift unless its reference examples cover the target distribution.
- **Robustness claims must name the attack.** Stability under narrow adversarial fine-tuning does not imply stability under arbitrary fine-tuning or attacks designed to alter the representation itself.

## Important Papers

- [[papers/llms-encode-harmfulness-and-refusal-separately|LLMs Encode Harmfulness and Refusal Separately]] separates instruction-end harmfulness from post-template refusal using clustering, activation steering, reply inversion, and the Latent Guard classifier.
- Arditi et al. (2024), "Refusal in Language Models Is Mediated by a Single Direction," identifies a low-dimensional refusal mechanism and motivates later work on what that direction represents.
- Yeo et al. (2025), "Understanding Refusal in Language Models with Sparse Autoencoders," reports separable sparse features associated with harmfulness and refusal.

## Related Concepts

- [[concepts/model-steerability|Model Steerability]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- LLM guard models
- Jailbreak evaluation
