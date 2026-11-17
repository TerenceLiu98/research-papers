---
title: Synthetic Minority Oversampling
type: concept
aliases:
  - SMOTE
  - Synthetic Minority Over-sampling Technique
definition: "Synthetic minority oversampling adds artificial minority-class training observations by interpolating between nearby minority examples in feature space."
tags:
  - imbalanced-classification
  - synthetic-data
---

## Overview

Synthetic minority oversampling changes the spatial support of minority training data. Unlike duplicating observations, it supplies intermediate feature vectors that can encourage a classifier to learn broader minority decision regions.

## Key Ideas

The segment-interpolation formulation chooses a minority observation, a nearby minority neighbor, and a random position between them. Neighborhood size and oversampling intensity control which regions receive synthetic support. Majority undersampling can be combined with this process to change class balance further.

Useful interpolation depends on feature geometry: nearby minority points need not delimit a region free of majority examples. Consequently, more synthetic data need not improve classification. The original paper's Adult experiments illustrate this failure mode. Mixed categorical and numerical features require a modified distance and generation procedure, as in SMOTE-NC; nominal-only generation is a distinct extension.

Evaluation should retain the tradeoff between true and false positives. ROC curves can intersect, so higher aggregate AUC does not establish superiority at every operating point.

## Important Papers

- [[papers/smote-synthetic-minority-over-sampling-technique|SMOTE: Synthetic Minority Over-sampling Technique]] introduces the approach and compares combinations with undersampling against replication and cost-sensitive alternatives.

## Related Concepts

Majority undersampling changes the retained training distribution by removing examples; synthetic minority oversampling instead adds feature vectors. Cost-sensitive learning changes penalties or decision criteria. These interventions can share a goal while producing different decision regions.
