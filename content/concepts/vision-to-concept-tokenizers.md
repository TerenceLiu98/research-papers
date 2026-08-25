---
title: Vision-to-Concept Tokenizers
type: concept
aliases:
  - V2C Tokenizers
  - Vision-to-Concept Tokenizer
tags:
  - visual-concept-discovery
  - concept-bottleneck-models
  - vision-language-models
  - image-quantization
---

## Overview

Vision-to-concept tokenizers map image representations to a discrete vocabulary of human-readable visual concepts. In V2C-CBM, the vocabulary is built from common words and compositional phrases, filtered with a vision-language model and task-related unlabeled images, and used as the codebook for a concept bottleneck model.

## Key Ideas

- Select task-related unlabeled images by comparing their image features with class-name or few-shot image features.
- Build a vocabulary from atomic words, adjective-noun bigrams, and relational adjective-noun trigrams, while removing concepts that contain class names.
- Filter non-visual and irrelevant concepts by measuring image-text similarity and concept frequency over the selected images and their augmentations.
- Quantize an image into its nearest concept embeddings, then aggregate frequent concepts from class examples into a class-specific bottleneck.
- Keep the concept vocabulary tied to the visual encoder and task data. A vocabulary unrelated to the task can sharply reduce classification accuracy.
- Use a learned class-concept matrix after tokenization; this makes the classifier lightweight, but concept quality and coverage remain dependent on the codebook.

## Important Papers

- [[V2C-CBM: Building Concept Bottlenecks with Vision-to-Concept Tokenizer]]
- [[Concept Bottleneck Models]]
- Oikarinen, Das, Nguyen, and Weng (2023), "Label-Free Concept Bottleneck Models."
- Rao, Mahajan, Bohle, and Schiele (2024), "Discover-then-Name: Task-Agnostic Concept Bottlenecks via Automated Concept Discovery."
- van den Oord, Vinyals, and Kavukcuoglu (2017), "Neural Discrete Representation Learning."

## Related Concepts

- [[Concept Bottleneck Models]]
- [[Text Embedding Models]]
- [[Sparse Autoencoders]]
- Image quantization
- Few-shot learning
