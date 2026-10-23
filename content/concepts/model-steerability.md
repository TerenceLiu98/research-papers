---
title: Model Steerability
type: concept
aliases:
  - Steerability
  - Representation Steering
tags:
  - model-steering
  - mechanistic-interpretability
  - controllable-generation
  - causal-interventions
---

## Overview

Model steerability is the ability to change a model's output in a targeted, semantically consistent direction by intervening on an internal representation or control variable. In representation analysis, it distinguishes features that merely correlate with a concept from features whose manipulation causally influences downstream behavior.

## Key Ideas

- A steering evaluation specifies an intervention, a downstream model, and a measure of alignment between the resulting output and the intended concept.
- The threshold for calling a feature steerable matters. In the CB-SAE study, replacing a mean-score threshold with an original-neuron null baseline increases the share high on both interpretability and steerability from 18.84% to 29.14%; neither share is a universal measure of feature usefulness.
- Interventions can set one feature to a fixed value, add a direction, zero competing features, or modify a concept bottleneck. The intervention protocol affects the measured score.
- Steerability is not equivalent to interpretability. A feature may be easy to name but weakly causal, while an abstract or entangled feature may strongly influence output.
- Scores are downstream-model dependent. The same representation intervention can behave differently for text generation, image generation, or different vision backbones.
- A useful steering feature must also preserve output quality and reconstruction fidelity; a high concept score accompanied by noisy or degraded outputs is not sufficient.
- [[concepts/mechanistic-topic-models|Mechanistic Topic Models]] form topic-level steering vectors from weighted combinations of SAE decoder directions, allowing corpus-discovered themes rather than single features to guide generation.
- [[concepts/concept-bottleneck-sparse-autoencoders|Concept Bottleneck Sparse Autoencoders]] target steerability with a cyclic reconstruction objective that encourages decoded concept interventions to remain recognizable when re-encoded.
- [[papers/psychadapter-adapting-llm-transformers-to-reflect-traits-personality-and-mental-health|PsychAdapter]] treats continuous psychological scores as control variables, projects them into a dummy token at successive transformer layers, and evaluates whether generated language expresses the intended levels. Its controls are supervised by language-derived trait estimates, so recognizable steering does not by itself establish psychological validity.
- Steering can target unsafe behavior as well as benign concepts. [[papers/layer-wise-perturbations-via-sparse-autoencoders-for-adversarial-text-generation|Layer-Wise Perturbations via Sparse Autoencoders for Adversarial Text Generation]] adds a thresholded mask of attack-associated SAE latents at selected MLP layers and reports increased jailbreak success after reconstructing prompts. The result is layer-dependent and demonstrates behavioral control under a specific intervention, not a stable semantic interpretation of each selected feature.

- Identifiability is one route from a decoder direction to a defensible steering claim. [[papers/sparse-shift-autoencoders-for-identifying-concepts-from-large-language-model-activations|Sparse Shift Autoencoders]] prove, under a linear representation model and sparse-shift assumptions, that each decoder column changes one latent concept up to permutation and scale; the accompanying experiments treat this as a preliminary prediction about steering accuracy and transfer.

## Important Papers

- [[papers/sparse-shift-autoencoders-for-identifying-concepts-from-large-language-model-activations|Sparse Shift Autoencoders for Identifying Concepts from Large Language Model Activations]]
- [[papers/interpretable-and-steerable-concept-bottleneck-sparse-autoencoders|Interpretable and Steerable Concept Bottleneck Sparse Autoencoders]]
- [[papers/model-directions-not-words-mechanistic-topic-models-using-sparse-autoencoders|Model Directions, Not Words: Mechanistic Topic Models Using Sparse Autoencoders]]
- [[papers/psychadapter-adapting-llm-transformers-to-reflect-traits-personality-and-mental-health|PsychAdapter: Adapting LLM Transformers to Reflect Traits, Personality and Mental Health]]
- [[papers/layer-wise-perturbations-via-sparse-autoencoders-for-adversarial-text-generation|Layer-Wise Perturbations via Sparse Autoencoders for Adversarial Text Generation]]
- Arad, Mueller, and Belinkov (2025), "SAEs are good for steering - if you select the right features."
- Wu et al. (2025), "AxBench: Steering LLMs? Even simple baselines outperform sparse autoencoders."
- Wang et al. (2025), "Does higher interpretability imply better utility? A pairwise analysis on sparse autoencoders."

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/mechanistic-topic-models|Mechanistic Topic Models]]
- [[concepts/concept-bottleneck-models|Concept Bottleneck Models]]
- [[concepts/concept-bottleneck-sparse-autoencoders|Concept Bottleneck Sparse Autoencoders]]
- Causal representation interventions
- Controllable generation
