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
- [[Mechanistic Topic Models]] instead use labeled SAE directions as a topic vocabulary: probabilistic variants model aggregated feature counts, while a clustering variant constructs document embeddings from the corresponding decoder directions.
- MonoTM uses corpus-trained SAE activations as weighted pseudo-tokens rather than directly modeling continuous embeddings. Its two-stage design estimates mixtures from the full feature space, then learns descriptors in a separately validated semantic-feature space.
- Embedding-based topics can support cross-modal dataset analysis, but their interpretations may reflect non-thematic information retained by the embedding model and errors in text or caption supervision.
- [[Visual Structural Topic Models]] model image embeddings as convex mixtures of topic embeddings and add covariate-dependent topic prevalence.
- [[papers/fastopic-pretrained-transformer-is-a-fast-adaptive-stable-and-transferable-topic-model|FASTopic]] places pretrained document embeddings and learnable topic and word embeddings in one space, then turns optimal transport plans between them into explicit document-topic and topic-word distributions.

## Important Papers

- [[Sparse Autoencoders are Topic Models]]
- [[Model Directions, Not Words: Mechanistic Topic Models Using Sparse Autoencoders]]
- [[Beyond Top Words: MonoTM for Topic Modeling with Interpretable Monosemantic Features]]
- [[papers/an-image-is-worth-k-topics-a-visual-structural-topic-model-with-pretrained-image-embeddings|An Image is Worth $K$ Topics: A Visual Structural Topic Model with Pretrained Image Embeddings]]
- [[papers/fastopic-pretrained-transformer-is-a-fast-adaptive-stable-and-transferable-topic-model|FASTopic: Pretrained Transformer is a Fast, Adaptive, Stable, and Transferable Topic Model]]
- Dieng, Ruiz, and Blei (2020), "Topic Modeling in Embedding Spaces."
- Blei, Ng, and Jordan (2003), "Latent Dirichlet Allocation."

## Related Concepts

- [[Sparse Autoencoders]]
- [[Mechanistic Topic Models]]
- [[Visual Structural Topic Models]]
- [[Text Embedding Models]]
- Topic modeling
- Multimodal learning
- Dataset analysis
