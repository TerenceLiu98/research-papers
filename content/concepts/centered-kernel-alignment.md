---
title: Centered Kernel Alignment
type: concept
aliases:
  - CKA
tags:
  - representation-learning
  - neural-network-interpretability
---

## Overview

Centered Kernel Alignment (CKA) compares the similarity structure that two representations assign to the same examples. It enables comparisons between neural-network layers with different feature dimensions without aligning individual neurons.

## Key Ideas

For activation matrices X and Y evaluated on the same examples, linear CKA uses Gram matrices K = XXᵀ and L = YYᵀ and normalizes their Hilbert–Schmidt independence criterion:

$$
\operatorname{CKA}(K,L)=\frac{\operatorname{HSIC}(K,L)}{\sqrt{\operatorname{HSIC}(K,K)\operatorname{HSIC}(L,L)}}.
$$

- Centering removes the mean component of the Gram matrices. The normalization yields invariance to isotropic scaling; linear CKA is also invariant to orthogonal transformations, including neuron permutations.
- Layer-pair heatmaps reveal stages and persistent representations. Cross-model comparisons test whether architectures organize examples similarly.
- High similarity does not establish identical computation or causal importance. Residual propagation can strongly influence similarity across depth.
- CKA summarizes relationships into one number. Interventions, localization analyses, and task-specific probes supply complementary evidence.

## Important Papers

- Kornblith et al., *Similarity of Neural Network Representations Revisited* (2019), is the methodological reference cited by the study below.
- [[papers/do-vision-transformers-see-like-convolutional-neural-networks|Do Vision Transformers See Like Convolutional Neural Networks?]] combines CKA with residual ablations, attention-distance analyses, and token localization to distinguish ViTs from ResNets.

## Related Concepts

- [[concepts/linear-probing|Linear Probing]] measures task information accessible to a linear readout, complementing geometric similarity.
