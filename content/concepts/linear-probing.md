---
title: Linear Probing
type: concept
aliases:
  - Linear Probes
  - Linear Classifier Probes
tags:
  - representation-learning
  - neural-network-interpretability
  - probing-classifiers
---

## Overview

Linear probing trains a linear prediction head on a model's representations to assess which target properties are directly accessible from those features. It provides an operational test of representational accessibility whose conclusions depend on the probe, training data, and target task.

## Key Ideas

- **Accessibility:** A linear probe tests whether a property is recoverable by a simple readout. Failure does not establish that the representation lacks the information, because a nonlinear decoder may recover it.
- **Use versus availability:** A successful probe does not show that the original model uses the recovered property in its own predictions. The probe and the model's downstream computation can implement different decision rules.
- **Layer comparison:** Training comparable probes on different layers turns representations of different dimensions into scores for the same task. Comparable training settings help, but do not remove every source of probe bias.
- **Beyond accuracy:** Probe scores can themselves be analyzed. [[concepts/and-or-interaction-primitives|AND/OR Interaction Primitives]] decompose masked-input probe scores to compare task-accessible patterns across layers.
- **Data limits:** The training dataset restricts what the probe can uncover. A probe is not an exhaustive inventory of a model's knowledge, and its capacity should match the question being asked.

## Important Papers

- [[papers/layerwise-change-of-knowledge-in-neural-networks|Layerwise Change of Knowledge in Neural Networks]] uses linear classifiers on intermediate features for interaction extraction and discusses probe limitations in Appendix D.
- Belinkov (2022), "Probing Classifiers: Promises, Shortcomings, and Advances." is the methodological reference used in that discussion.
- Pimentel et al. (2020), "Information-Theoretic Probing for Linguistic Structure." is cited there to distinguish estimating available information with richer probes from testing direct linear accessibility.

## Related Concepts

- [[concepts/and-or-interaction-primitives|AND/OR Interaction Primitives]]
- Representation learning
- Probing classifiers
