---
title: Zero-shot Concept Bottleneck Models
type: concept
aliases:
  - Z-CBMs
  - Zero-shot CBMs
tags:
  - concept-bottleneck-models
  - interpretable-machine-learning
  - vision-language-models
  - zero-shot-learning
  - concept-retrieval
---

## Overview

Zero-shot concept bottleneck models (Z-CBMs) extend [[Concept Bottleneck Models]] to target tasks for which no concept annotations or task-specific training are available. A frozen vision-language model (VLM) retrieves input-related concepts from a large text-derived concept bank, then uses sparse regression over their text embeddings to reconstruct the input representation and produce a label prediction. The retrieved concepts are dynamic and can be edited or supplemented with natural-language interventions.

## Key Ideas

- **Concept retrieval:** encode an input image and the concept bank with the VLM's image and text encoders, then retrieve the top-$K$ concepts by cosine similarity. The paper uses Faiss for scalable search and sets $K=2048$ by default.
- **Concept regression:** solve a sparse linear regression problem that approximates the image embedding with a weighted sum of retrieved concept embeddings. The L1 penalty used by lasso removes redundant candidates and makes the nonzero weights interpretable as concept importance.
- **Large, open vocabulary:** build a bank from noun phrases extracted from Flickr30K, CC3M, CC12M, and YFCC-15M captions. The reported pipeline filters an approximately 20-million-phrase base set to about 5.12 million concepts.
- **Intervention:** delete retrieved concepts or insert arbitrary concepts described in natural language, rerun regression, and recompute the label from the reconstructed representation. This makes the bottleneck dynamic rather than limited to a fixed training vocabulary.
- **Performance trade-offs:** on the paper's 12-dataset evaluation, Z-CBM (ALL) reaches 54.28% average zero-shot top-1 accuracy versus 53.73% for zero-shot CLIP. With a trained linear head, LP-Z-CBM reaches 78.31% versus 78.98% for CLIP linear probing, while preserving concept-level explanations.

## Important Papers

- [[papers/zero-shot-concept-bottleneck-models|Zero-shot Concept Bottleneck Models]]
- [[Concept Bottleneck Models]]
- [[V2C-CBM: Building Concept Bottlenecks with Vision-to-Concept Tokenizer]]
- [[Language Guided Concept Bottleneck Models for Interpretable Continual Learning]]
- Oikarinen, Das, Nguyen, and Weng (2023), "Label-free concept bottleneck models."
- Yuksekgonul, Wang, and Zou (2023), "Post-hoc concept bottleneck models."
- Yang et al. (2023), "Language in a bottle: Language model guided concept bottlenecks for interpretable image classification."

## Related Concepts

- [[Concept Bottleneck Models]]
- [[Vision-to-Concept Tokenizers]]
- [[Text Embedding Models]]
- [[Model Steerability]]
- Zero-shot classification
- Sparse linear regression
- Vision-language models
