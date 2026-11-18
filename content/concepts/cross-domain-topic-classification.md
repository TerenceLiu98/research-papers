---
title: Cross-Domain Topic Classification
type: concept
aliases:
  - Cross-Domain Supervised Topic Classification
definition: "Cross-domain topic classification trains on topic-labeled documents in a source domain and applies the learned taxonomy to documents in a different target domain."
tags:
  - topic-classification
  - transfer-learning
  - political-text-analysis
---

## Overview

Cross-domain topic classification reuses existing annotations to measure comparable topics across document genres. The source taxonomy supplies interpretable categories, but both category relevance and linguistic transfer must be assessed in the target corpus.

## Key Ideas

- Source labels reduce training annotation costs; target annotations remain useful for independent validation.
- Evaluate individual topics and balanced metrics, since common categories can conceal failures on rare classes.
- Source accuracy and feature congruence can screen candidate topics. In the manifesto-to-speech study, congruence correlates source and target phrase-importance t-statistics for each topic. Shared predictive language supports interpretability but does not establish target correctness.
- Selecting only reliable topics changes the scope of the measurement. It does not repair excluded categories.

## Important Papers

- [[papers/cross-domain-topic-classification-for-political-texts|Cross-Domain Topic Classification for Political Texts]]: evaluates manifesto-to-parliament transfer and proposes topic-level diagnostics.
- [[papers/topic-classification-for-political-texts-with-pretrained-language-models|Topic Classification for Political Texts with Pretrained Language Models]]: examines using target validation labels for supervised pretrained-model adaptation instead.

## Related Concepts

- [[concepts/full-parameter-fine-tuning|Full-Parameter Fine-Tuning]]: an alternative when target labels are available, adapting pretrained model parameters to the target task.
