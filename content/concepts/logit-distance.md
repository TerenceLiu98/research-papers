---
title: Logit Distance
type: concept
aliases:
  - Logit-Difference Distance
tags:
  - representational-similarity
  - knowledge-distillation
  - probability-metrics
---

## Overview

Logit distance compares two conditional predictive distributions through the Euclidean distance between their centered logit vectors. In a softmax model, centering fixes the otherwise arbitrary additive logit offset, so the distance can be expressed entirely through log-probability ratios. Pointwise, it coincides with the Aitchison distance used for compositional data.

## Key Ideas

- **Definition:** For centered logits $u(x)$ and $u'(x)$, $d_{\mathrm{logit}}^2=\mathbb{E}_x\|u(x)-u'(x)\|_2^2$. It is a metric on the induced conditional distributions, potentially with infinite value.
- **Sensitivity to unlikely labels:** Unlike teacher-to-student KL divergence, logit distance does not discount a large discrepancy merely because the teacher assigns that label very low probability. This sensitivity can preserve more of a teacher's output geometry, but can also transfer structure in unlikely labels that is noisy or unhelpful.
- **Relation to KL:** Squared logit distance is at least twice the KL divergence. A reverse bound requires both distributions to assign every label probability at least $\tau$ and scales as $\log^2(\tau)/\tau$, which is weak when $\tau$ is small.
- **Representation guarantees:** For linearly identifiable softmax models, small logit distance bounds canonical-correlation dissimilarity and an equivalence-aware joint discrepancy between embeddings and unembeddings. The constants depend on logit covariance and shifted-unembedding conditioning.
- **Distillation objective:** $L_2$ logit matching directly minimizes squared logit distance. An $L_1$ logit loss can be more stable and still controls squared logit distance when probabilities are bounded below.
- **Gauge choice matters:** Raw logits are unchanged as probabilities when a shared scalar is added to every class. Centering the logits, equivalently centering the unembeddings, removes this non-identifiable direction.

## Important Papers

- [[papers/logit-distance-bounds-representational-similarity|Logit Distance Bounds Representational Similarity]] proves metric and representation-preservation guarantees and evaluates logit-based distillation on Synth, CIFAR-100, and SUB.
- Ba and Caruana (2014), "Do Deep Nets Really Need to Be Deep?" uses logit regression for model compression.
- Nielsen et al. (2025), "When Does Closeness in Distribution Imply Representational Similarity? An Identifiability Perspective" establishes why KL closeness alone need not imply linear representational similarity.

## Related Concepts

- [[concepts/knowledge-distillation|Knowledge Distillation]]: logit matching is an alternative to conventional KL-based teacher-student training.
- [[concepts/statistical-identifiability|Statistical Identifiability]]: the representation guarantees are approximate versions of linear identifiability.
- [[concepts/linear-probing|Linear Probing]]: preserving linear representation structure can preserve teacher concepts recoverable by linear classifiers.
- Aitchison distance: the corresponding metric on strictly positive probability compositions.
- Canonical correlation analysis: one representation-similarity measure bounded by logit distance.
