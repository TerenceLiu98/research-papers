---
title: Early Fusion Vision-Language Models
type: concept
tags:
  - vision-language-models
  - multimodal-learning
  - transformers
---

## Overview

Early fusion places visual and text representations in a shared modeling stack near the input, allowing joint training of the parameters that process both modalities. In the design studied by [[papers/falcon-perception|Falcon Perception]], raw image patches and text tokens use the same dense Transformer from the first layer, with small specialized output heads for spatial predictions.

## Key Ideas

- **Parameter sharing and information flow are distinct:** Falcon's image tokens attend bidirectionally to image tokens, while text/task tokens attend causally to the visual prefix and preceding text/task tokens. The image-prefix representations cannot depend on a later prompt under this mask.
- **Fusion does not eliminate output structure:** A shared backbone can still use coordinate, size, and mask heads. This keeps dense output efficient without requiring pixels to become long autoregressive token sequences.
- **Geometry needs explicit treatment:** Spatial position embeddings, native-aspect-ratio patch handling, and high-resolution feature upsampling address information that sequence order alone does not preserve.
- **Initialization remains consequential:** Falcon uses multi-teacher visual distillation for segmentation, but trains its separate OCR variant from scratch. A common architecture does not imply interchangeable training recipes.
- **Evidence is task-specific:** Compositional grounding results support this architecture's viability. They do not prove universal superiority over modular models, especially without matched data and compute.

## Important Papers

- [[papers/falcon-perception|Falcon Perception]]: evaluates a shared stack for dense grounding and a separate compact OCR recognizer. The latter still relies on an external layout detector for page processing.

## Related Concepts

- [[concepts/autoregressive-dense-perception|Autoregressive Dense Perception]]: combines a sequence interface with specialized dense outputs.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: supplies pretrained visual representations for Falcon's perception backbone.
