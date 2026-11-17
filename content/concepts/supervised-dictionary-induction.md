---
title: Supervised Dictionary Induction
type: concept
aliases:
  - Outcome-Supervised Lexicon Induction
definition: "Learning a task-specific vocabulary and lexical weights from associations between text features and observed target outcomes."
tags:
  - text-as-data
  - interpretable-machine-learning
---

## Overview

Supervised dictionary induction learns which terms measure a target and how strongly to weight them using text paired with observed outcomes. The resulting lexicon supports inspectable document scoring without requiring the original predictive model at application time.

## Key Ideas

- Supervision can come from external measurements rather than manual word labels. The resulting dictionary measures associations with that operational target, not intrinsic word meaning.
- Neural sensitivities provide one extraction route: aggregate squared input gradients, take their square root, and use the mean gradient's sign to distinguish positive and negative associations.
- Dictionary size and downstream scoring are part of model selection. A well-performing neural network need not yield the best compressed lexical score.
- Length-normalized weighted matching makes scoring transparent but drops contextual dependencies represented by the training model.
- Temporal holdouts assess later observations from the source corpus. Transfer to other genres, populations, or outcomes requires separate validation.

## Important Papers

- [[papers/introducing-an-interpretable-deep-learning-approach-to-domain-specific-dictionary-creation-a-use-case-for-conflict-prediction|Häfner et al. (2023)]] — constructs OCoDi with neural sensitivities and tests its ability to infer country-month conflict fatalities from CrisisWatch reports.

## Related Concepts

- [[concepts/text-scaling-models|Text Scaling Models]] — both produce document scores, but supervised dictionary induction explicitly ties lexical weights to an observed outcome rather than necessarily recovering a latent dimension.
