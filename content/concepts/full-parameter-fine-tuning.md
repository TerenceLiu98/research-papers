---
title: Full-Parameter Fine-Tuning
type: concept
aliases:
  - Full Fine-Tuning
  - Full-Model Fine-Tuning
definition: "Full-parameter fine-tuning adapts a pretrained model to a downstream objective by allowing all of its parameters to receive training updates."
tags:
  - transfer-learning
  - language-models
---

## Overview

Full-parameter fine-tuning allows both pretrained representations and the task-specific prediction head to change during downstream training. Its performance measures the model's capacity to adapt, whereas a frozen-feature readout measures what the existing representation makes accessible to that readout.

## Key Ideas

- A trainable head alone cannot adjust the encoder to the downstream target.
- Initialization matters: freezing an untrained intermediate component can constrain prediction even when other components were pretrained.
- Learning rate and training duration must suit adaptation of pretrained weights. Changing these alongside the trainable parameter set complicates attribution of gains.
- Accuracy and computational cost should be evaluated together. Full adaptation is not guaranteed to outperform frozen representations on every task.

## Important Papers

- [[papers/on-finetuning-large-language-models|On Finetuning Large Language Models]]: full ConfliBERT adaptation reverses a dictionary-model advantage in conflict regression; a longer input window improves accuracy further at additional runtime cost.

## Related Concepts

- [[concepts/linear-probing|Linear Probing]]: evaluates target information accessible through a simple readout of existing features.
- [[concepts/frozen-language-model-blocks-as-modality-encoders|Frozen Language-Model Blocks as Modality Encoders]]: preserves pretrained blocks while adapting surrounding components, illustrating a different transfer design.
