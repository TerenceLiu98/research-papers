---
title: Continuous Topic Models
type: concept
aliases:
  - CTM
  - Embedding-Space Topic Models
tags:
  - topic-modeling
  - representation-learning
  - embedding-spaces
  - multimodal-learning
---

## Overview

Continuous topic models represent observations in an embedding space as mixtures of latent thematic directions rather than as bags of discrete words. They extend the mixture structure of Latent Dirichlet Allocation to continuous data, making topic-style analysis applicable to text embeddings, images, and other modalities.

## Key Ideas

- A document-level topic mixture selects latent directions, while continuous strengths determine how much each topic contributes to an embedding.
- Gaussian direction distributions and observation noise provide a continuous analogue of word emissions and support embeddings outside a discrete vocabulary simplex.
- Under a high-activity, small-contribution limit with concentrated directions and independent topic strengths, the CTM yields a nonnegative linear decoder with an $L_1$ sparsity term as a MAP objective.
- Sparse autoencoders can serve as fine-grained topic-atom models. A separate interpretation layer can associate atoms with word distributions and merge them into a flexible number of coarser topics without retraining.
- Embedding-based topics can support cross-modal dataset analysis, but their interpretations may reflect non-thematic information retained by the embedding model and errors in text or caption supervision.

## Important Papers

- [[Sparse Autoencoders are Topic Models]]
- Dieng, Ruiz, and Blei (2020), "Topic Modeling in Embedding Spaces."
- Blei, Ng, and Jordan (2003), "Latent Dirichlet Allocation."
- Zheng et al. (2025), "Model Directions, Not Words: Mechanistic Topic Models Using Sparse Autoencoders."

## Related Concepts

- [[Sparse Autoencoders]]
- [[Text Embedding Models]]
- Topic modeling
- Multimodal learning
- Dataset analysis
