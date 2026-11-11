---
title: Encoder-Free Vision-Language Models
type: concept
aliases:
  - Single-Transformer Vision-Language Models
  - Monolithic Vision-Language Models
tags:
  - vision-language-models
  - multimodal-learning
  - transformers
  - early-fusion
---

## Overview

Encoder-free vision-language models replace the conventional pipeline of a separately pretrained image encoder plus a language model with one Transformer that learns from image and text tokens jointly. A lightweight patch projection may still convert pixels into tokens, but there is no standalone CLIP-like visual backbone whose outputs are passed into an LLM. The design reduces inference components and permits visual and linguistic representations to interact throughout the shared stack.

## Key Ideas

- **One shared backbone:** Image patches and text tokens enter the same Transformer rather than passing through independently pretrained deep encoders.
- **Encoder-free is not vision-module-free:** Patch projection, position encoding, feature upsampling, or task-specific output heads can remain necessary, especially for dense prediction.
- **Training must establish both modalities:** Without a frozen visual encoder, joint pretraining or co-training must teach the shared model useful visual features as well as language behavior.
- **Dense tasks expose resolution limits:** A token grid downsampled by a factor of 16 or 32 is too coarse for accurate boundaries unless the model learns higher-resolution features or uses an additional dense head.
- **Visual prompts require spatial identity:** Pooling raw patch embeddings inside a prompt region can lack semantics. [[papers/pixel-sail-single-transformer-for-pixel-grounded-understanding|Pixel-SAIL]] instead adds learned prompt-identity embeddings directly to the corresponding spatial tokens.
- **Teacher use is compatible with simple inference:** Feature distillation can transfer visual expertise during training while preserving a single-backbone deployment graph, though it does not make training expert-free.

## Important Papers

- Chen et al. (2024), *A Single Transformer for Scalable Vision-Language Modeling*: introduces SOLO, a single-Transformer vision-language model used as a Pixel-SAIL backbone.
- Diao et al. (2024), *Unveiling Encoder-Free Vision-Language Models*: studies the EVE architecture and encoder-free visual-language learning.
- [[papers/pixel-sail-single-transformer-for-pixel-grounded-understanding|Pixel-SAIL: Single Transformer for Pixel-Grounded Understanding]]: extends SOLO and EVEv2-style models from image-level tasks to segmentation and visual-prompt understanding.
- [[papers/falcon-perception|Falcon Perception]]: provides a related shared-backbone design for grounding and dense output with specialized spatial heads.

## Related Concepts

- [[concepts/early-fusion-vision-language-models|Early Fusion Vision-Language Models]]: the broader family in which visual and text representations interact near the input.
- [[concepts/pixel-grounded-understanding|Pixel-Grounded Understanding]]: tests whether a shared backbone can preserve precise spatial information while reasoning with language.
- [[concepts/autoregressive-dense-perception|Autoregressive Dense Perception]]: combines sequence generation with dense spatial output heads.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: transfers visual representations from stronger specialist teachers into shared-backbone students.
