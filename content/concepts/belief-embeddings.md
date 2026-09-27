---
title: Belief Embeddings
type: concept
aliases:
  - Belief Embedding Space
tags:
  - belief-embeddings
  - representation-learning
  - computational-social-science
---

## Overview

Belief embeddings map expressed stances into a continuous vector space whose geometry represents relationships among beliefs. Training on which positions people jointly endorse can capture social associations across topics that ordinary textual similarity may miss. A text encoder also allows previously unseen belief statements to be placed in the learned space.

## Key Ideas

- **Stance must be explicit.** Agreement and disagreement with the same proposition are different beliefs. In Lee et al. (2025), PRO/CON votes become templated statements before encoding.
- **Association differs from semantic similarity.** Co-voting supplies positive pairs, while opposing stances and their co-voted beliefs supply negatives. These relationships describe a sampled population's expressed beliefs, rather than logical implication or objective truth.
- **Individuals can be represented by aggregates.** A centroid summarizes a user's belief vectors, while the root mean squared distance from that centroid measures dispersion. The centroid is a summary and need not correspond to a belief the user actually expressed.
- **Prediction tests part of the geometry.** Choosing the candidate stance closest to the centroid tests whether the representation predicts held-out choices. The 0.590 accuracy reported by Lee et al. supports limited predictive usefulness, not reliable recovery of every unexpressed belief.
- **Geometric dissonance is a proxy.** The relative-distance score $d^*=(d_{\max}-d_{\min})/d_{\min}$ compares the separation of two candidate stances from a user's profile, for $d_{\min}>0$. Its association with choosing the nearer stance does not directly establish subjective discomfort or causal belief change.
- **Validation is task- and population-specific.** Triplet discrimination, general semantic similarity, self-reported group separation, and held-out stance prediction test different properties. Learned associations may reflect platform selection, culture, model bias, and time period. Stronger belief-specific performance can accompany worse general semantic similarity.

## Important Papers

- [[papers/a-semantic-embedding-space-based-on-large-language-models-for-modelling-human-beliefs|A semantic embedding space based on large language models for modelling human beliefs]] (Lee et al., 2025): fine-tunes Sentence-BERT on debate co-voting triplets and evaluates belief geometry, group polarization, and prediction on unseen debates.

## Related Concepts

- [[concepts/text-embedding-models|Text Embedding Models]]
- [[concepts/cognitive-dissonance|Cognitive Dissonance]]
- [[concepts/political-polarization|Political Polarization]]
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]
