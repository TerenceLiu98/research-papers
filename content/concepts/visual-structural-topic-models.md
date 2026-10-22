---
title: Visual Structural Topic Models
type: concept
aliases:
  - vSTM
  - Visual Structural Topic Model
tags:
  - visual-topic-modeling
  - mixed-membership-models
  - image-embeddings
  - computational-social-science
---

## Overview

Visual structural topic models represent an image embedding as a mixture of latent topic embeddings while allowing observed covariates to predict topic prevalence. They combine the semantic coverage of pretrained vision representations with mixed membership and regression structure, so one image can express several themes and researchers can compare topic use across actors, contexts, or time.

## Key Ideas

- **Continuous observations:** Each image is represented by one real-valued embedding rather than a bag of discrete visual words or detected-object counts.
- **Mixed membership:** An image embedding is generated around a convex combination of topic embeddings, giving every image a distribution over topics instead of a single cluster assignment.
- **Structured prevalence:** A logistic-normal prior links covariates to expected topic proportions through regression coefficients and permits correlations among topics.
- **Embedding-dependent meaning:** The vision model determines which similarities the topic model can recover. A vision-language embedding may emphasize conceptual associations, while a self-supervised visual embedding may emphasize appearance and scene structure.
- **Scalable inference:** Reparameterized variational inference and minibatching support large collections; amortizing image-specific posterior parameters can reduce memory use but introduces an amortization gap.
- **Validation:** Held-out fit, coherence, exclusivity, visual inspection, and image-intrusion tasks test different properties. None alone establishes that the topics are substantively valid measures.

## Important Papers

- [[papers/an-image-is-worth-k-topics-a-visual-structural-topic-model-with-pretrained-image-embeddings|An Image is Worth $K$ Topics: A Visual Structural Topic Model with Pretrained Image Embeddings]]
- Roberts et al. (2014), "Structural Topic Models for Open-Ended Survey Responses."
- Zhang and Peng (2022), "Image Clustering: An Unsupervised Approach to Categorize Visual Data in Social Science Research."

## Related Concepts

- [[Continuous Topic Models]]
- [[Amortized Variational Inference]]
- [[Topic Model Evaluation]]
- [[Visual Political Bias]]
