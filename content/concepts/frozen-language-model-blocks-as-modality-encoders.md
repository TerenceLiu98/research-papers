---
title: "Frozen Language-Model Blocks as Modality Encoders"
type: concept
aliases:
  - Frozen LLM Blocks as Visual Encoders
  - Frozen LLM Transformer Layers
tags:
  - large-language-models
  - transfer-learning
  - visual-representation-learning
  - transformers
---

## Overview

Frozen language-model blocks can be repurposed as encoder layers for non-text token sequences. A task encoder produces tokens, trainable projections adapt their dimensionality to a pretrained LLM block and back, and a task decoder consumes the transformed representation. The language block is fixed, while the surrounding network learns to produce features that make its pretrained computation useful.

## Key Ideas

- **A block rather than an intact LLM:** The approach extracts one or more transformer blocks instead of using a language model as a prompted system or autoregressive decoder.
- **Adapters bridge representation spaces:** Learned linear maps reconcile hidden dimensions. Their presence does not by itself establish that visual features enter a linguistic semantic space.
- **Modality-appropriate sequence handling:** Non-autoregressive inputs can omit causal masks and language-model positional embeddings while retaining padding masks when required.
- **Frozen computation can regularize transfer:** Keeping the pretrained block fixed preserves its learned transformation and avoids the optimization and overfitting observed in some end-to-end fine-tuning settings. It does not eliminate the block's inference cost.
- **Scale, depth, and placement matter:** Evidence from visual tasks indicates that sufficiently large blocks and late insertion are more reliable than small blocks or insertion near raw inputs. The effect is therefore an architectural choice with empirical boundary conditions, not a universal property of every language transformer.
- **Information filtering is one proposed mechanism:** Task training may reshape upstream tokens so the frozen block amplifies informative features. Concentrated feature activation can coexist with noisy attention weights, so attention maps alone are not an adequate explanation.

## Important Papers

- [[papers/frozen-transformers-in-language-models-are-effective-visual-encoder-layers|Frozen Transformers in Language Models Are Effective Visual Encoder Layers]] introduces and evaluates the approach across image, point-cloud, video, motion-forecasting, retrieval, and visual-question-answering tasks.
- Schwettmann, Chowdhury, and Torralba (2023), "Multimodal Neurons in Pretrained Text-Only Transformers," provides related evidence that text-only transformer features can encode visual concepts.

## Related Concepts

- [[concepts/semantic-associations-in-transformers|Semantic Associations in Transformers]]
- [[concepts/early-fusion-vision-language-models|Early Fusion Vision-Language Models]]
- [[concepts/knowledge-distillation|Knowledge Distillation]]
- [[concepts/linear-probing|Linear Probing]]
