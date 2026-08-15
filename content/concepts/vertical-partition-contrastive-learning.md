---
title: Vertical-Partition Contrastive Learning
type: concept
aliases:
  - VPCL
  - Self-VPCL
tags:
  - contrastive-learning
  - tabular-deep-learning
  - self-supervised-learning
---

## Overview

Vertical-partition contrastive learning (VPCL) learns row representations by constructing views from subsets of a table's columns. It treats different feature subsets as views of the same underlying sample or class, encouraging representations that remain useful when the available columns change.

## Key Ideas

- A vertical partition selects columns rather than rows. Partitions may overlap, allowing the objective to vary both feature coverage and shared context.
- In self-supervised VPCL, partitions of the same row are positive pairs and partitions from other rows are negatives.
- In supervised VPCL, partitions from any rows sharing a class label are positives, while differently labeled rows provide negatives. This avoids maintaining a separate prediction head for every pretraining dataset.
- Partitioning exposes supervision through multiple feature subsets and aligns naturally with [[Variable-Column Tabular Learning]]. It can also reduce the amount of each row queried at once in a column-oriented store.
- VPCL assumes that partitions preserve factors relevant to the sample or label. When source tables and downstream tasks are unrelated, the learned invariances may not improve fine-tuning.

## Important Papers

- [[TransTab Learning Transferable Tabular Transformers Across Tables]]

## Related Concepts

- [[Variable-Column Tabular Learning]]
- Contrastive learning
- Supervised contrastive learning
