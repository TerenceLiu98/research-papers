---
title: "Multi-Label Classification"
type: concept
aliases:
  - Multi-Label Prediction
  - Multilabel Learning
definition: "Multi-label classification assigns multiple nonexclusive labels to each observation, allowing prediction methods to exploit dependencies among labels."
tags:
  - machine-learning
  - text-as-data
---

## Overview

Multi-label classification predicts a binary vector or subset of labels for each input. It differs from multiclass classification, where the categories of a single outcome are mutually exclusive. A political document can simultaneously discuss several issues or exhibit several request characteristics.

## Key Ideas

- **Binary relevance:** fits one independent binary classifier per label, providing a baseline that does not explicitly model label dependencies.
- **Classifier chains:** use earlier labels as additional inputs for later predictions. Ensemble chains combine different label orderings to reduce ordering sensitivity.
- **Label powerset:** treats each observed combination as a class. Its output space can grow exponentially and it cannot directly produce combinations absent from training. Random k-labelsets uses smaller subsets to ease these constraints.
- **Evaluation:** subset accuracy requires the entire label vector to be correct; Hamming loss counts individual errors. Macro-F1 weights labels equally, micro-F1 pools decisions, and ranking loss evaluates score orderings. Good performance on one criterion need not imply good performance on another.

Label dependence can provide useful information when text features or training examples are limited. Its practical value is an empirical question, and low average pairwise correlation alone does not rule out gains.

## Important Papers

- [[papers/multi-label-prediction-for-political-text-as-data|Multi-Label Prediction for Political Text-as-Data]]: compares multi-label methods on information requests and human rights reports, finding consistent advantages for ensemble classifier chains.

## Related Concepts

The classifier-chain and label-powerset approaches above are alternative problem transformations within this broader prediction task, rather than synonyms for it.
