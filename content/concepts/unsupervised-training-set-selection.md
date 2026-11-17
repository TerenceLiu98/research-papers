---
title: Unsupervised Training Set Selection
type: concept
aliases:
  - Unlabeled Training Set Selection
definition: "Unsupervised training set selection chooses observations for subsequent labeling using their covariates or representations without using outcome labels."
tags:
  - training-set-selection
  - annotation-efficiency
---

## Overview

Unsupervised training set selection allocates an annotation budget by choosing informative observations from an unlabeled pool. Its usefulness depends on whether coverage in the chosen representation captures variation relevant to the eventual prediction task.

## Key Ideas

- Separate representation construction from the criterion used to select a subset. Different representations can induce very different notions of coverage or redundancy.
- Selection happens before outcome labels are available. Active learning instead adapts selection using labeled examples and a fitted predictor; unsupervised selection can initialize that process.
- Evaluate performance at fixed label budgets and labels required to attain a target performance. Neither geometric diversity nor reconstruction quality alone guarantees predictive improvement.
- Gains depend on the corpus, selection criterion, representation, and downstream learner. Savings in label counts need not equal savings in annotation time when document difficulty varies.

## Important Papers

- [[papers/selecting-more-informative-training-sets-with-fewer-observations|Selecting More Informative Training Sets with Fewer Observations]]: compares 57 approaches in two text-classification applications, finding substantial label savings without a universal winning method.

## Related Concepts

- [[concepts/text-embedding-models|Text Embedding Models]]: provide numerical document representations for subset selection.
- [[concepts/uniform-design-subsampling|Uniform Design Subsampling]]: a specific family of space-filling subsampling approaches; unlabeled selection more broadly need not use uniform designs.
