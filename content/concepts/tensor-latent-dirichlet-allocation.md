---
title: Tensor Latent Dirichlet Allocation
type: concept
aliases:
  - Tensor LDA
  - TLDA
definition: "Tensor latent Dirichlet allocation estimates topic-word parameters by decomposing corrected low-order word co-occurrence moments under the LDA generative model."
tags:
  - topic-modeling
  - tensor-methods
  - spectral-learning
---

## Overview

Tensor latent Dirichlet allocation estimates latent topic parameters from word co-occurrence moments. Whitening reduces a third-order moment to a smaller tensor whose decomposition supplies topic directions. Recoverability depends on model assumptions and rank conditions, rather than following simply from using a tensor representation.

## Key Ideas

- Second-order moments supply whitening directions; third-order information separates latent components that pairwise structure alone cannot resolve.
- Unwhitening maps the learned factors back to vocabulary space. Document-topic inference can then be performed separately using variational inference.
- Explicit vocabulary-sized moment tensors can be costly. Centering, incremental PCA, and implicit factor updates allow scalable implementations.
- An online third-order update alone does not make the entire pipeline online: the mean and whitening transformation must also accommodate incoming observations.
- Statistical parameter recovery, practical convergence, semantic coherence, and validity of researcher-assigned topic labels are different evaluation targets.

## Important Papers

- Anandkumar et al., “A Spectral Algorithm for Latent Dirichlet Allocation”: spectral parameter recovery from moments.
- Huang et al. (2015), “Online Tensor Methods for Learning Latent Variable Models”: stochastic updates for tensor factorization.
- [[papers/analyzing-political-text-at-scale-with-online-tensor-lda|Analyzing Political Text at Scale with Online Tensor LDA]]: centered moments, incremental whitening, and GPU factor updates for large political-text corpora.

## Related Concepts

- [[concepts/topic-model-evaluation|Topic Model Evaluation]]: separates recovery accuracy from coherence and substantive validity.
- [[concepts/continuous-topic-models|Continuous Topic Models]]: changes the observation space to continuous embeddings; tensor LDA instead estimates a discrete word-mixture model using moments.
