---
title: Weakly Supervised Learning
type: concept
aliases:
  - Learning from Noisy Labels
tags:
  - machine-learning
  - computer-vision
  - noisy-labels
  - representation-learning
---

## Overview

Weakly supervised learning trains models from labels that are incomplete, noisy, indirect, or coarser than the target behavior. Instead of receiving a precise annotation for every example, a model uses signals such as source-level labels, tags, heuristics, or limited human judgments and must learn which features remain predictive despite the supervision gap.

## Key Ideas

- **The supervision target matters.** A label inherited from a source or heuristic may measure a useful proxy while differing from the intended construct.
- **Noise is structured.** Errors can cluster by source, topic, annotator, or example type, so aggregate accuracy can hide systematic failures.
- **Scale can compensate, but not guarantee validity.** Large web datasets expose models to diverse examples, yet memorization and source-specific shortcuts remain risks.
- **Auxiliary signals can shape representations.** A second modality or task can guide feature learning even when that signal is unavailable at deployment time.
- **Validation should match the claim.** Held-out proxy labels, expert annotations, human consensus, and cross-source tests answer different questions about generalization.

## Important Papers

- [[papers/predicting-the-politics-of-an-image-using-webly-supervised-data|Predicting the Politics of an Image Using Webly Supervised Data]]
- Chen and Gupta (2015), "Webly supervised learning of convolutional networks."
- Oquab, Bottou, Laptev, and Sivic (2015), "Is object localization for free? Weakly-supervised learning with convolutional neural networks."

## Related Concepts

- [[concepts/visual-political-bias|Visual Political Bias]]
- [[concepts/text-embedding-models|Text Embedding Models]]
- [[concepts/media-ecology|Media Ecology]]
