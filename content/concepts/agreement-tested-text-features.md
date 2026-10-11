---
title: Agreement-Tested Text Features
type: concept
aliases:
  - Cross-rater feature validation
tags:
  - interpretable-machine-learning
  - text-classification
  - measurement
---

## Overview

Agreement-tested text features pair a named predicate with an operational codebook and evaluate whether independent annotators can reproduce its values. This makes reproducibility of a representation coordinate an explicit selection criterion. It complements predictive accuracy and label-disentanglement checks in [[concepts/concept-bottleneck-models|Concept Bottleneck Models]].

## Key Ideas

- **Test the definition through application.** Give separate annotators the same definition and texts without exposing each other's labels. Chance-adjusted agreement measures whether the codebook transfers across raters; an appealing feature name alone cannot establish this.
- **Separate clarity from label entanglement.** A reproducible feature can simply restate the target. Feature-label correlation, definition similarity to the label question, and human leakage judgments examine different aspects of this problem. Low correlation alone does not establish explanatory value.
- **Select incremental signal.** LFD combines agreement screening with proposals from similar, opposite-label texts and held-out residual predictive gain. These mechanisms encourage narrower cues, but do not guarantee disentanglement; its reported experiments disable the explicit correlation gate.
- **Distinguish mechanical reproducibility from human clarity.** Identical regex execution yields identical annotations. Agreement on semantic codebooks is an empirical question, and pooled lexical-semantic scores can hide weak semantic reproducibility.
- **Audit the proxy with humans.** Cross-LLM agreement can be inflated by shared errors. In LFD's audited Sci/Tech semantic subset, mean cross-LLM agreement is 0.75 versus 0.39 human-human agreement. Independent model calls are not proof of conditionally independent errors.
- **Keep the claim bounded.** Reliability is one component of measurement quality. It does not by itself establish construct validity, a causal explanation, or a generalization guarantee for a classifier using many noisy features.

## Important Papers

- [[papers/interpretable-discriminative-text-representations-via-agreement-and-label-disentanglement|Interpretable Discriminative Text Representations via Agreement and Label Disentanglement]]: operationalizes feature screening with Cohen's $\kappa\geq0.70$ and evaluates both human reproducibility and label leakage.
- Cohen (1960), "A coefficient of agreement for nominal scales": source of the chance-adjusted agreement statistic, cited by the LFD manuscript.

## Related Concepts

- [[concepts/concept-bottleneck-models|Concept Bottleneck Models]]
- [[concepts/text-embedding-models|Text Embedding Models]]
