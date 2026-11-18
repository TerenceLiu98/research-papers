---
title: Stance Detection
type: concept
aliases:
  - Target-Aware Opinion Classification
definition: "Stance detection identifies the position expressed in a text toward a specified target, such as support for or opposition to a person, policy, or movement."
tags:
  - text-as-data
  - stance-detection
  - political-methodology
---

## Overview

Stance detection classifies an expressed position relative to a target. Overall positive or negative tone does not uniquely determine this position: anger at a movement's opponents can express support for the movement. The target must therefore be part of the annotation and measurement design.

## Key Ideas

- Context is part of measurement: explicit target mentions, coder knowledge, and document segmentation influence whether an expressed position is recoverable.

- **Specify the target and labels together.** The same text may support one actor while opposing another.
- **Validate the intended construct.** Accuracy against sentiment labels does not establish accuracy against stance labels, regardless of model sophistication.
- **Evaluate downstream consequences.** Misclassified stance can weaken or obscure relationships between political opinions and other characteristics.
- **Scope matters.** Sentiment and stance may correlate in one corpus and be nearly unrelated in another; validation should use the intended domain and target.

- In rumour conversations, agreement with a parent message and stance toward the underlying claim need separate labels: agreeing with a denial opposes the claim. Expressed certainty and evidence provision are separate annotation dimensions.

## Important Papers

- [[papers/analysing-how-people-orient-to-and-spread-rumours-in-social-media-by-looking-at-conversational-threads|Zubiaga et al. (2016)]]: annotates source and nested-reply stance separately and finds that pre-resolution support alone is insufficient for judging rumour truth.

- [[papers/stance-detection-a-practical-guide-to-classifying-political-beliefs-in-text|Stance detection: a practical guide]]: defines stance through propositions and contextual entailment, and compares three classification paradigms.

- [[papers/sentiment-is-not-stance-target-aware-opinion-classification-for-political-text-analysis|Sentiment is Not Stance: Target-Aware Opinion Classification for Political Text Analysis]]: contrasts sentiment and stance across protest tweets, survey responses, and confirmation-hearing tweets, including consequences for regression estimates.

- [[papers/stay-tuned-improving-sentiment-analysis-and-stance-detection-using-large-language-models|Stay Tuned]]: compares continuous stance estimation and tuning on election tweets. Human-label tuning helps GPT models distinguish multiple targets; party-proxy transfer is more competitive for binary stance than for intensity estimation.

## Related Concepts

- [[concepts/dimensional-aspect-based-sentiment-analysis|Dimensional Aspect-Based Sentiment Analysis]]: also attends to evaluation targets, but predicts structured aspect-level affect rather than necessarily political support or opposition.
- [[concepts/social-media-ideal-point-estimation|Social-Media Ideal-Point Estimation]]: measures broader political positions from network ties; target-specific textual stance provides a distinct opinion measure.
