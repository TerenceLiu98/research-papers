---
title: Concept Bottleneck Models
type: concept
aliases:
  - CBMs
  - Concept Bottleneck Model
tags:
  - interpretable-machine-learning
  - concept-supervision
  - representation-learning
  - controllable-models
---

## Overview

Concept bottleneck models make a model's intermediate predictions correspond to human-defined concepts. A concept layer mediates the downstream prediction, allowing users to inspect, edit, or intervene on semantically meaningful variables instead of manipulating opaque internal features.

## Key Ideas

- A bottleneck typically predicts a fixed concept set and then maps those concept activations to the final task output.
- Supervised concept labels provide explicit alignment, while label-free and vision-language-guided variants use model-generated or weak concept targets.
- Concept interventions can support explanation and [[Model Steerability]], but their usefulness depends on concept quality, coverage, and whether the downstream predictor actually uses the bottleneck as intended.
- A fixed bottleneck guarantees coverage only for its chosen vocabulary. It can miss novel features that an unsupervised representation might discover.
- Hybrid approaches such as [[Concept Bottleneck Sparse Autoencoders]] combine a concept bottleneck with unsupervised sparse features to cover user-specified concepts without discarding discovered structure.

## Important Papers

- [[Interpretable and Steerable Concept Bottleneck Sparse Autoencoders]]
- Koh et al. (2020), "Concept bottleneck models."
- Yuksekgonul, Wang, and Zou (2023), "Post-hoc concept bottleneck models."
- Oikarinen, Das, Nguyen, and Weng (2023), "Label-free concept bottleneck models."
- Srivastava, Yan, and Weng (2024), "VLG-CBM: Training concept bottleneck models with vision-language guidance."
- Kulkarni et al. (2025), "Interpretable generative models through post-hoc concept bottlenecks."

## Related Concepts

- [[Sparse Autoencoders]]
- [[Concept Bottleneck Sparse Autoencoders]]
- [[Model Steerability]]
- Interpretable machine learning
- Concept supervision
