---
title: Cross-Lingual Feature Steering
type: concept
aliases:
  - Cross-Lingual SAE Steering
  - Feature-Mediated Cross-Lingual Transfer
tags:
  - multilingual-reasoning
  - activation-steering
  - sparse-autoencoders
  - mechanistic-interpretability
---

## Overview

Cross-lingual feature steering transfers internal activation directions associated with successful reasoning in a reference language into inference in a target language. The approach treats some multilingual performance gaps as failures to elicit an available computation rather than conclusive evidence that the model lacks that computation. A defensible claim requires intervention evidence: target-side activation should improve the relevant behavior, reference-side suppression should impair it, and matched controls should not show the same overall pattern.

## Key Ideas

- Paired, semantically equivalent problems help separate task-associated differences from unrelated prompt content. A particularly informative contrast contains items solved in the reference language but missed in the target language.
- [[concepts/sparse-autoencoders|Sparse Autoencoders]] provide a feature basis and decoder directions for intervention, but feature selection remains observational until the selected directions are manipulated.
- Contrastive selection can reduce language-identity and generic-generation confounds by requiring features to occur in successful reference traces but not paired target failures, then excluding the most frequent candidates.
- Steering coefficients can encode an activation gap: the mean selected-feature activation in correct reference traces minus that in correct target traces.
- Applying the resulting direction during generated tokens while leaving prompt prefill unchanged targets reasoning production without translating the input or changing model parameters.
- Causal interpretation should remain intervention-specific. Improved target accuracy supports partial sufficiency under a stated policy; impaired reference accuracy supports functional dependence on the tested distribution. Neither establishes logical sufficiency, logical necessity, or a unique causal mechanism.
- Output-language checks are essential because apparent transfer could instead reflect reversion to the reference language.
- Pair-specific features may transfer to unseen target languages, but weaker transfer than target-specific selection suggests that languages can under-elicit different subsets of shared features.

## Important Papers

- [[papers/enhancing-low-resource-language-reasoning-via-high-resource-language-feature-transfer|Enhancing Low-Resource Language Reasoning via High-Resource Language Feature Transfer]]: selects SAE features from paired reference-language successes and target-language failures, then tests target activation, source suppression, controls, language preservation, and limited transfer to unseen target languages.
- [[papers/large-reasoning-models-are-not-yet-multilingual-latent-reasoners|Large Reasoning Models Are (Not Yet) Multilingual Latent Reasoners]]: provides diagnostic evidence that latent answer formation and English alignment vary with language resource level.
- [[papers/knowledge-vector-of-logical-reasoning-in-large-language-models|Knowledge Vector of Logical Reasoning in Large Language Models]]: studies activation directions that causally influence reasoning behavior without the cross-lingual sparse-feature selection setup.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/model-steerability|Model Steerability]]
- [[concepts/latent-reasoning|Latent Reasoning]]
- [[concepts/reasoning-knowledge-vectors|Reasoning Knowledge Vectors]]
- Multilingual reasoning
- Activation steering
