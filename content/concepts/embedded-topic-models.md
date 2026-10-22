---
title: Embedded Topic Models
type: concept
aliases:
  - Embedded Topic Model
  - ETM
tags:
  - topic-modeling
  - word-embeddings
  - variational-inference
  - representation-learning
---

## Overview

Embedded topic models parameterize each topic in the same low-dimensional semantic space as vocabulary terms. A softmax of word-topic inner products produces an explicit categorical distribution over words, preserving the document-mixture interpretation of probabilistic topic models while sharing information through embedding geometry.

## Key Ideas

- **Factorized topic-word distributions:** For word embeddings $\rho$ and topic vector $\alpha_k$, topic $k$ is $\beta_k=\operatorname{softmax}(\rho^\top\alpha_k)$. Semantically related words can therefore receive similar affinities without an independent parameter for every topic-word pair.
- **Explicit topic mixtures:** Documents retain simplex-valued topic proportions and words retain latent topic assignments. This distinguishes ETM from unconstrained document factor models whose decoder axes need not be interpretable as distributions mixed at the document level.
- **Fixed or learned vocabulary geometry:** Pretrained embeddings can transfer semantic relationships, including relationships involving words absent from the target corpus. Jointly learned embeddings adapt the geometry to the corpus but require enough data to estimate it.
- **Amortized posterior inference:** A neural encoder maps normalized bag-of-words documents to Gaussian parameters for logistic-normal topic proportions. Reparameterized stochastic optimization learns the encoder and model parameters together.
- **Large-vocabulary robustness:** Sharing through embeddings can reduce the degradation seen when a conventional topic model adds many rare terms. This remains an empirical property to test rather than a guarantee for every corpus or embedding source.
- **Evaluation is multidimensional:** Predictive document completion, topic coherence, topic diversity, and human interpretability answer different questions. A model can predict words well without exposing meaningful topic distributions.

## Important Papers

- [[papers/topic-modeling-in-embedding-spaces|Topic Modeling in Embedding Spaces]] introduces ETM and compares fixed and jointly learned word-embedding variants with LDA and neural document models.
- Das, Zaheer, and Dyer (2015), "Gaussian LDA for Topic Models with Word Embeddings," models continuous embedding observations rather than using embeddings to parameterize categorical word emissions.
- Nguyen et al. (2015), "Improving Topic Models with Latent Feature Word Representations," combines an LDA likelihood with a log-linear component based on pretrained embeddings.
- [[papers/fastopic-pretrained-transformer-is-a-fast-adaptive-stable-and-transferable-topic-model|FASTopic: Pretrained Transformer is a Fast, Adaptive, Stable, and Transferable Topic Model]] is a later embedding-space approach based on optimal-transport relations among documents, topics, and words.

## Related Concepts

- [[concepts/amortized-variational-inference|Amortized Variational Inference]]
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]
- [[concepts/continuous-topic-models|Continuous Topic Models]]
- [[concepts/text-embedding-models|Text Embedding Models]]
- [[concepts/hierarchical-topic-models|Hierarchical Topic Models]]
