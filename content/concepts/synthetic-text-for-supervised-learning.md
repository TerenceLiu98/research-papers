---
title: Synthetic Text for Supervised Learning
type: concept
aliases:
  - Synthetic Text Augmentation
definition: "Training supervised text models with generated documents whose labels are inferred from generation conditions or supplied by annotators."
tags:
  - synthetic-data
  - text-as-data
  - supervised-learning
---

## Overview

Synthetic text for supervised learning uses generated documents to train a task-specific predictor that is subsequently applied to real text. Generated examples can supplement scarce annotations or provide the entire training corpus. The training utility of a document depends on label fidelity, coverage, and transfer to real inputs, rather than factual authenticity of its invented content.

## Key Ideas

- **Generation control:** Prompts guide content, domain adaptation changes model parameters, and sampling settings influence generated style and diversity.
- **Different supervision regimes:** Prompt-derived labels permit inexpensive augmentation or synthetic-only training; span annotation may still require human work.
- **Quality checks:** Manual inspection checks concept fidelity. Real-versus-synthetic discrimination measures distinguishability, while embedding overlays expose possible coverage gaps. Neither replaces real-data evaluation.
- **Marginal value:** Additional synthetic data can have diminishing returns and may be less useful than the same number of real annotations.
- **Inference boundary:** Generated text supplies training examples, not observations for substantive inference. Predictions on real text still carry measurement error.

## Important Papers

- [[papers/synthetically-generated-text-for-supervised-text-analysis|Synthetically generated text for supervised text analysis]]: distinguishes three usage regimes and validates police-event classification, populism classification, and weapons extraction; sampling optimization reduces the synthetic-versus-real training gap in the extraction task.

## Related Concepts

- [[concepts/knowledge-distillation|Knowledge Distillation]]: synthetic-only task training can transfer knowledge from a generative teacher into a smaller classifier.
- [[concepts/weakly-supervised-learning|Weakly Supervised Learning]]: generation-conditioned labels may be noisy or imperfect proxies.
- [[concepts/text-embedding-models|Text Embedding Models]]: provide representations for prediction and coverage checks.
- [[concepts/regurgitative-training|Regurgitative Training]]: concerns training generative models on generated data; the downstream learner here can instead be a discriminative classifier.
