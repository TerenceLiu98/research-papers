---
title: LLM-Guided Topic Refinement
type: concept
tags:
  - topic-modeling
  - large-language-models
  - semantic-regularization
---

## Overview

LLM-guided topic refinement uses a language model to improve the labels or representative words of topics learned from a corpus. Its input can be a short topic word list rather than every document. Refinement may change only the displayed description, or it may supply a training target that changes the underlying topic model; these operations have different implications for document-topic assignments.

## Key Ideas

- **Post-hoc versus training-time refinement.** Editing a topic's displayed words does not by itself update its learned distribution or document assignments. A training regularizer can make those learned distributions respond to the suggested words.
- **Semantic distribution matching.** [[concepts/optimal-transport|Optimal Transport]] can align original and suggested word distributions using embedding distances, allowing semantically related words to match even when their vocabulary coordinates differ.
- **Preserving corpus information.** Retaining the document reconstruction objective and delaying refinement until after warm-up help preserve corpus structure. Vocabulary filtering limits admissible suggestions but does not establish that the suggested associations fit the corpus.
- **Confidence-weighted guidance.** Label-token probabilities or the fraction of retained non-intruder words can scale refinement strength. These proxies should be distinguished from calibrated estimates of semantic correctness.
- **Separate evaluation criteria.** Better word coherence can coexist with reduced topic diversity or worse document-label alignment. [[concepts/topic-model-evaluation|Topic Model Evaluation]] should examine those quantities separately.
- **Cost depends on the refinement schedule.** Topic-level prompts avoid document-by-document LLM analysis, but repeated refinement during training still requires inference. Prompt token counts alone do not establish total runtime savings.

## Important Papers

- [[papers/neural-topic-modeling-with-large-language-models-in-the-loop|Neural Topic Modeling with Large Language Models in the Loop]] introduces LLM-ITL: confidence-weighted transport regularization after warm-up, evaluated across eight neural topic models and four datasets.
- Chang et al. (2024), "Enhanced Short Text Modeling: Leveraging Large Language Models for Topic Refinement," is the post-hoc refinement approach discussed and compared in LLM-ITL.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]
- [[concepts/contextual-and-graph-fusion-for-topic-modeling|Contextual and Graph Fusion for Topic Modeling]]
