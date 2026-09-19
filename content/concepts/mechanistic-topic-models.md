---
title: Mechanistic Topic Models
type: concept
aliases:
  - MTMs
  - Mechanistic Topic Modeling
tags:
  - topic-modeling
  - sparse-autoencoders
  - mechanistic-interpretability
  - model-steering
---

## Overview

Mechanistic Topic Models (MTMs) discover corpus-level themes using interpretable directions from a language model's activation space as their feature vocabulary. A [[Sparse Autoencoders|sparse autoencoder]] converts token activations into sparse, labeled features; a topic model then learns document-topic and topic-feature weights over those features rather than over words. Because the features correspond to activation directions, the learned topics can also define interventions for controlled generation.

## Key Ideas

- Token-level SAE activations can be thresholded and aggregated into document-feature counts, providing a context-sensitive alternative to bag-of-words counts.
- Existing topic-model families can be adapted to this representation. LDA can treat features as vocabulary items, an embedded topic model can learn topic vectors in activation space, and a clustering model can build document embeddings from SAE decoder directions.
- Topics can be interpreted from automatically generated descriptions of their highest-weight SAE features. An LLM can summarize those descriptions, but summarization may hide mislabeled or irrelevant features.
- A topic's feature weights can be used to combine SAE decoder directions into a normalized topic steering vector. This gives topic modeling a direct control interface, subject to the usual distinction between feature interpretability and [[Model Steerability|causal steerability]].
- Feature quality is a central bottleneck. Useful pipelines filter ubiquitous, low-level, and poorly labeled features and may refine topic descriptions after fitting.
- MTMs are related to [[Continuous Topic Models]], but they need not model continuous embeddings directly: mLDA and mETM operate on aggregated SAE feature counts, while mBERTopic uses decoder directions to construct continuous document embeddings.

## Important Papers

- [[Model Directions, Not Words: Mechanistic Topic Models Using Sparse Autoencoders]]
- [[Sparse Autoencoders are Topic Models]]
- Blei, Ng, and Jordan (2003), "Latent Dirichlet Allocation."
- Dieng, Ruiz, and Blei (2020), "Topic Modeling in Embedding Spaces."
- Grootendorst (2022), "BERTopic: Neural Topic Modeling with a Class-Based TF-IDF Procedure."

## Related Concepts

- [[Sparse Autoencoders]]
- [[Continuous Topic Models]]
- [[Model Steerability]]
- Topic modeling
- Mechanistic interpretability
- Activation steering
- LLM-as-a-judge evaluation
