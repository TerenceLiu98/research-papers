---
title: "Visual Pretraining for Abstract Reasoning"
type: concept
tags:
  - visual-reasoning
  - transfer-learning
  - self-supervised-learning
---

## Overview

Visual pretraining for abstract reasoning transfers an encoder learned from images into a solver for tasks such as inferring transformations between small symbolic grids. It asks whether learned spatial representations remain useful when target inputs differ sharply from the pretraining distribution.

## Key Ideas

- Separate representation learning, supervised task training, and adaptation to a new task's demonstrations when assessing transfer.
- Compare pretrained and random initializations under matched architectures and downstream recipes to isolate initialization benefits.
- Distinguish natural-image pretraining from in-domain synthetic grid pretraining: they supply different data and may involve different compute budgets.
- Prediction-level ensembling can exploit complementary outputs, but ensemble performance is not a direct measure of a single encoder's transfer ability.
- Foreground-sensitive attention and gains on matching or connected components suggest spatial priors; they do not by themselves identify the causal mechanism.

## Important Papers

- [[papers/natural-image-pretraining-improves-abstract-reasoning|Natural Image Pretraining Improves Abstract Reasoning]] transfers ImageNet MAE encoder weights into Nat-ARC and reports improved ARC-1 performance across three model scales after task-specific adaptation.

## Related Concepts

- [[concepts/adaptive-computation|Adaptive Computation]] addresses how much inference computation a task receives, a complementary axis to the representations supplied by pretraining.
