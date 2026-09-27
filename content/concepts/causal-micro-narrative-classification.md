---
title: Causal Micro-Narrative Classification
type: concept
aliases:
  - Causal Micro-Narrative
tags:
  - narrative-classification
  - causal-language
  - text-as-data
---

## Overview

Causal micro-narrative classification identifies sentence-level explanations of a chosen target's causes or effects. It first distinguishes causal explanations from mere target mentions, then assigns one or more labels from a domain-specific ontology. The resulting labels describe causal accounts expressed in language; they do not verify those accounts or estimate causal effects.

## Key Ideas

- **Anchor the task to a target.** An event or phenomenon such as inflation organizes the ontology. Keyword filtering works for a clearly named target but can omit paraphrases and requires reconsideration for more varied expressions.
- **Separate presence from category.** A sentence can mention the target without explaining it, or express several causes and consequences at once. Evaluate binary detection separately from multi-label classification.
- **Preserve direction.** Government policy causing inflation and inflation changing government finances represent opposite directions relative to the target and need distinct labels.
- **Treat the ontology as a measurement choice.** Expert-defined categories make aggregation possible but restrict discovery to specified explanations. An "other" label does not itself identify new mechanisms.
- **Retain uncertainty in the human benchmark.** Implicit causation, missing context, and ambiguous antecedents can cause disagreement about whether a narrative exists. Majority-vote evaluation measures agreement with an annotation convention, not objective causal validity.
- **Check transfer on a fixed test domain.** Historical and contemporary corpora can differ in language, sourcing, and label prevalence. Compare training regimes on the same test period and report detection and category metrics separately.

## Important Papers

- [[papers/causal-micro-narratives|Causal Micro-Narratives]]: introduces the task and an inflation case study using expert categories, human labels, and fine-tuned language models across two news periods.

## Related Concepts

- [[concepts/ontology-constrained-relation-extraction|Ontology-Constrained Relation Extraction]]: shares a predefined semantic inventory; causal micro-narrative classification labels explanations relative to one target rather than extracting arbitrary entity triples.
- Narrative economics
- Multi-label text classification
- Inter-annotator agreement
- Temporal domain shift
