---
title: Self-Training
type: concept
definition: "Iterative supervised learning in which selected model predictions on unlabeled observations become labels for subsequent training rounds."
aliases:
  - Pseudo-Label Self-Training
tags:
  - semi-supervised-learning
  - text-classification
---

## Overview

Self-training expands a labeled training set using the model's own predictions on unlabeled observations. Its usefulness depends on how new labels are selected and how their quality is checked.

## Key Ideas

- Acceptance rules control the balance between label reliability and the amount of newly usable data. Ensemble unanimity is one conservative rule.
- Predicted labels are not independent ground truth. Errors can enter later training rounds, making validation and stopping decisions important.
- The fraction of observations assigned labels measures coverage, not recall, unless the relevant true-label counts are known.
- Human inspection can validate samples of accepted predictions without individually labeling every new training item.
- Reusing a labeled corpus in another domain or source adds a transfer question beyond within-corpus self-training.

## Important Papers

- [[papers/the-multiclass-classification-of-newspaper-articles-with-machine-learning-the-hybrid-binary-snowball-approach|The Multiclass Classification of Newspaper Articles with Machine Learning: The Hybrid Binary Snowball Approach]]: combines unanimous binary SVM ensembles with automatic training-set expansion and subsequent human sample validation.

## Related Concepts

- [[concepts/regurgitative-training|Regurgitative Training]] concerns reuse of generated content to train generative models; self-training here assigns predicted labels to existing observations.
- [[concepts/codebook-llm-measurement|Codebook-LLM Measurement]] emphasizes the validity of automated labels relative to substantive coding definitions.
