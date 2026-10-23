---
title: Model Reprogramming
type: concept
aliases:
  - Model Reprogramming for Cross-Domain Learning
  - Cross-Modal Model Reprogramming
tags:
  - transfer-learning
  - model-reprogramming
  - multimodal-learning
---

## Overview

Model reprogramming adapts a pretrained source model to a different target task while leaving the source model's parameters fixed. Trainable transformations make target inputs compatible with the source representation space and map source outputs to the target prediction. The approach can reduce the number of optimized parameters, but it retains the frozen model's storage and inference costs.

## Key Ideas

- **Adaptation occurs around a fixed model.** An input transformation, output mapping, or both learn to communicate with the frozen source model. This differs from full fine-tuning and from parameter-efficient methods that still modify or augment parameters inside the backbone.
- **The interface depends on the modality gap.** Closely related modalities may permit direct input editing. Larger gaps can require learned embeddings, adapters, prototype banks, or cross-attention to place target data into a representation space the source model can process.
- **Few trainable parameters do not imply a small deployed model.** Reprogramming may reduce optimization memory and task-specific storage while still executing the full source backbone.
- **Transfer claims require matched controls.** Useful comparisons include a target model without the frozen backbone, a randomly initialized or architecture-matched backbone, parameter-efficient fine-tuning, and ablations of the input and output transformations.
- **Performance does not identify the transferred mechanism.** A gain can show that fixed pretrained computation is useful after adaptation without establishing that human-interpretable source-domain concepts or reasoning caused it.
- **Cross-domain evaluation must name what was trained.** A model trained on one target-domain dataset and evaluated on another is zero-shot with respect to the destination dataset, but it has still received target-task optimization.

## Important Papers

- Chen (2022), "Model Reprogramming: Resource-Efficient Cross-Domain Machine Learning": the cited overview framing reprogramming as cross-domain adaptation without source-model fine-tuning.
- Yang, Tsai, and Chen (2021), "Voice2Series: Reprogramming Acoustic Models for Time Series Classification": maps time series into a form handled by a frozen acoustic model and remaps its outputs.
- [[papers/time-llm-time-series-forecasting-by-reprogramming-large-language-models|TIME-LLM: Time Series Forecasting by Reprogramming Large Language Models]] maps numerical patches to learned text-embedding prototypes, adds a natural-language prefix, and trains a forecast projection around a frozen LLM.
- Vinod, Chen, and Das (2020), "Reprogramming Language Models for Molecular Representation Learning": a cited example of adapting language models to biological sequences.

## Related Concepts

- [[concepts/frozen-language-model-blocks-as-modality-encoders|Frozen Language-Model Blocks as Modality Encoders]]: uses fixed transformer computation inside a target architecture with trainable projections.
- [[concepts/transferability-evaluation|Transferability Evaluation]]: separates gains due to transferred knowledge from architecture, adaptation data, and tuning advantages.
- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: an alternative route that pretrains reusable models directly on temporal data.
