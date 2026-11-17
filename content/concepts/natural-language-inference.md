---
title: Natural Language Inference
type: concept
aliases:
  - NLI
  - Textual Entailment
definition: "Natural language inference evaluates whether a hypothesis is supported by a premise text, allowing classification labels to be expressed as statements about documents."
tags:
  - text-classification
  - natural-language-processing
---

## Overview

Natural language inference evaluates the relationship between a premise and a hypothesis. In classification applications, the premise is the document and the hypothesis states a candidate category or attitude. A model can then evaluate new labels expressed in language without fitting a separate classification head for every label set.

## Key Ideas

- Label wording operationalizes the construct: a topic hypothesis and a support hypothesis ask different questions about the same document.
- Binary entailment/non-entailment is sufficient for many annotation tasks; it should not be confused with separately identifying contradiction and missing evidence.
- Zero-shot evaluation should specify what is unseen. Holding out hypotheses tests transfer across label statements, while holding out source datasets tests a different generalization boundary.
- Paraphrase augmentation can improve robustness to equivalent label wording. It does not resolve substantive ambiguity in a construct.
- Few-shot fine-tuning can teach project-specific definitions, but requires examples representative of the target population and independent validation.

Intermediate NLI training preserves a reusable task head when downstream labels are expressed as hypotheses. This can reduce annotation requirements, but the wording must capture the construct and predictions still require independent validation.

## Important Papers

- [[papers/political-debate-efficient-zero-shot-and-few-shot-classifiers-for-political-text|Political DEBATE]]: adapts NLI encoders to political annotation, using held-out hypotheses and repeated few-shot experiments to study transfer and efficiency.

- [[papers/less-annotating-more-classifying|Less Annotating, More Classifying]]: compares eight political classification tasks and finds strong macro-F1 gains from NLI transfer under limited and imbalanced supervision.

## Related Concepts

- [[concepts/cross-encoders|Cross-Encoders]]: jointly encode premise–hypothesis pairs to model their semantic relationship.
