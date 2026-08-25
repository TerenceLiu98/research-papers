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
- Interventions can set one feature to a fixed value, add a direction, zero competing features, or modify a concept bottleneck. The intervention protocol affects the measured score.
- Steerability is not equivalent to interpretability. A feature may be easy to name but weakly causal, while an abstract or entangled feature may strongly influence output.
- Scores are downstream-model dependent. The same representation intervention can behave differently for text generation, image generation, or different vision backbones.
- A useful steering feature must also preserve output quality and reconstruction fidelity; a high concept score accompanied by noisy or degraded outputs is not sufficient.
- [[Concept Bottleneck Sparse Autoencoders]] target steerability with a cyclic reconstruction objective that encourages decoded concept interventions to remain recognizable when re-encoded.

## Important Papers

- [[Interpretable and Steerable Concept Bottleneck Sparse Autoencoders]]
- Arad, Mueller, and Belinkov (2025), "SAEs are good for steering - if you select the right features."
- Wu et al. (2025), "AxBench: Steering LLMs? Even simple baselines outperform sparse autoencoders."
- Wang et al. (2025), "Does higher interpretability imply better utility? A pairwise analysis on sparse autoencoders."

## Related Concepts

- [[Sparse Autoencoders]]
- [[Concept Bottleneck Models]]
- [[Concept Bottleneck Sparse Autoencoders]]
- Causal representation interventions
- Controllable generation
