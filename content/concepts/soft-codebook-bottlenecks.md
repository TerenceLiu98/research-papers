---
title: Soft Codebook Bottlenecks
type: concept
aliases:
  - Soft Prototype Bottlenecks
tags:
  - representation-learning
  - vector-quantization
  - self-supervised-learning
---

## Overview

A soft codebook bottleneck maps a continuous feature to a probability distribution over learned prototypes. The representation can be the assignment distribution itself or its expected prototype embedding. Unlike a hard nearest-code assignment, the weighted representation is differentiable and can interpolate among prototypes.

## Key Ideas

For prototypes $c_1,\ldots,c_K$ and assignment probabilities $p\in\Delta^{K-1}$, the embedding is

$$
z(p)=\sum_{k=1}^K p_k c_k.
$$

- **Two useful spaces.** Probability vectors support distributional prediction losses such as KL divergence; expected embeddings support reconstruction and geometric comparisons. MTS-JEPA uses both.
- **Conditional geometric control.** For a fixed codebook with $M=\max_k\|c_k\|_2$, embeddings lie in its convex hull and satisfy $\|z(p)-z(q)\|_2\leq M\|p-q\|_1$. A learned codebook still needs control of its prototype geometry; finite cardinality alone is not a uniform training-time norm bound.
- **Sharpness and diversity serve different purposes.** Minimizing individual assignment entropy encourages decisive selections, while maximizing entropy of the batch-average assignment encourages aggregate usage of multiple codes. A high-entropy batch marginal alone could arise from identical diffuse assignments.
- **Boundedness does not establish non-collapse.** MTS-JEPA's sufficient variance certificate also requires sharp assignments, multiple active codes, separated prototypes, and positive quantitative margins. Reconstruction provides an additional empirical anchor in that model.
- **Interpretability needs evidence.** Code-frequency differences and representative signal patches can suggest recurring patterns. Prototype indices are learned features, not automatically named concepts or verified physical regimes.

## Important Papers

- [[papers/mts-jepa-multi-resolution-joint-embedding-predictive-architecture-for-time-series-anomaly-prediction|MTS-JEPA]] combines soft code prediction, entropy calibration, momentum targets, and reconstruction for anomaly prediction, with conditional geometric bounds and component ablations.
- Van Den Oord, Vinyals, et al. (2017), "Neural discrete representation learning," is cited by MTS-JEPA as background for vector-quantized latent representations; soft assignments should be distinguished from hard quantization.

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] can predict prototype distributions as learned latent targets.
- [[concepts/time-series-anomaly-prediction|Time-Series Anomaly Prediction]] is an application of prototype-based temporal representations in MTS-JEPA.
