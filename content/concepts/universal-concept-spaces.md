---
title: Universal Concept Spaces
type: concept
aliases:
  - Universal Feature Spaces
  - Cross-Model Concept Spaces
tags:
  - representation-alignment
  - mechanistic-interpretability
  - concept-discovery
  - sparse-representations
---

## Overview

A universal concept space is a shared representation whose dimensions are intended to carry corresponding semantics across multiple neural networks. Unlike post-hoc matching, which first discovers features independently and then pairs similar ones, a universal space can impose alignment during training and support direct comparison or translation between model representations.

## Key Ideas

- Different architectures can have different activation dimensions, so a universal space commonly uses model-specific mappings into and out of a shared latent code.
- Cross-model reconstruction tests whether a code inferred from one model retains information that predicts another model's activations. It is stronger evidence of shared structure than matching feature labels alone, but it does not prove identical causal use.
- Universality has several meanings. A concept may fire at similar rates across models without firing on the same inputs; firing entropy measures the former, while co-firing measures the latter.
- A shared objective can favor factors that help reconstruct every model. It may therefore recover common features missed by separately trained dictionaries while suppressing features useful to only one model.
- Low-universality dimensions are also informative because they isolate architecture- or objective-specific representations within a common coordinate system.
- Feature visualization and interventions remain necessary for interpreting aligned dimensions. Statistical alignment alone does not guarantee semantic equivalence.

## Important Papers

- [[Universal Sparse Autoencoders: Interpretable Cross-Model Concept Alignment]]: learns a shared sparse code for SigLIP, DINOv2, and ViT and evaluates it through reconstruction, firing statistics, dictionary matching, and coordinated visualization.
- Dravid et al. (2023), "Rosetta Neurons: Mining the Common Units in a Model Zoo": identifies units with correlated spatial responses across models.
- Huh et al. (2024), "The Platonic Representation Hypothesis": argues that representations may converge as models improve across tasks and modalities.
- Kowal et al. (2024), "Understanding Video Transformers via Universal Concept Discovery": discovers shared video-model concepts using common exemplars.
- Lindsey et al. (2024), "Sparse Crosscoders for Cross-Layer Features and Model Diffing": uses a shared sparse dictionary to compare model states.

## Related Concepts

- [[Sparse Autoencoders]]
- Representational alignment
- Concept-based interpretability
- Feature visualization
- Dictionary learning
