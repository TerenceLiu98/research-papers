---
title: Text as Treatment
type: concept
aliases:
  - Texts as Treatments
  - Linguistic Treatment Effects
tags:
  - causal-inference
  - text-as-treatment
  - experimental-design
---

## Overview

Text as treatment studies how exposure to messages or changes in their linguistic properties affect readers' outcomes. Its central identification problem is that a document bundles many features: changing humility, politeness, or tone may also change content, vividness, or other consequential attributes. Researchers must specify whether the intervention assigns entire documents or changes a particular feature while preserving other content.

## Key Ideas

- **Document and feature effects differ.** Random assignment to pools of messages with and without a feature identifies a document-exposure effect. Attributing that effect to the feature alone requires accounting for other differences between the pools.
- **Full-text adjustment can eliminate overlap.** If treatment is a deterministic property of the words, two identical texts cannot have different treatment values. A representation that retains the treatment may inherit the same problem.
- **Predictive representations need causal constraints.** Capturing outcome-relevant variation does not guarantee that an embedding captures confounders or permits treated-control comparisons. Strong treatment prediction may reveal an unsuitable adjustment space.
- **Paired editing offers a design-based comparison.** Writers create originals, editors reverse the target feature, and separately recruited evaluators rate randomly assigned versions. Within-original comparisons identify feature effects if all other outcome-relevant content is preserved and the labeling and interpretation assumptions hold.
- **Unequal edit counts require weighting.** Averaging treated-control differences within each original-text group gives originals equal influence even when some have more edits. Simply pooling all versions can reintroduce associations between treatment and other features.
- **Audit the intervention itself.** A successful manipulation check shows that the intended feature changed. It does not establish that every other relevant feature stayed fixed, nor that results extend to conversational exchanges.

## Important Papers

- [[papers/a-design-based-solution-for-causal-inference-with-text-can-a-language-model-be-too-large|A Design-based Solution for Causal Inference with Text: Can a Language Model Be Too Large?]]: develops participant-generated paired edits, a within-original estimator, and an intellectual-humility application.
- Fong and Grimmer (2023), "Causal inference with latent treatments": text curation as described in the linked paper.
- Pryzant et al. (2020), "Causal effects of linguistic properties": representation-based estimation evaluated in the linked paper.

## Related Concepts

- [[concepts/causal-overlap|Causal Overlap]]: requires meaningful comparisons between treatment states in the adjustment space.
- [[concepts/structured-treatments|Structured Treatments]]: includes interventions represented by rich objects such as documents or images.
- [[concepts/causal-representation-learning|Causal Representation Learning]]: concerns representations that support causal questions beyond prediction.
- [[concepts/intellectual-humility|Intellectual Humility]]: illustrates a linguistic feature whose effect requires separating it from other message attributes.
