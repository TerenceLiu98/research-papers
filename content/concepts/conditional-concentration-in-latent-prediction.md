---
title: Conditional Concentration in Latent Prediction
type: concept
aliases:
  - Conditional Concentration
tags:
  - latent-prediction
  - representation-learning
  - conditional-variance
  - representation-collapse
---

## Overview

Conditional concentration describes whether target representations compatible with a context and target location cluster near one meaningful point. It determines when a deterministic squared-error predictor's conditional mean is representative of plausible targets rather than an average across incompatible alternatives.

## Key Ideas

- Squared-error point prediction returns $\mathbb E[z_T\mid z_C,p]$. Its expected loss is reducible approximation error plus irreducible conditional variance.
- Local visual structure can constrain masked patches to a concentrated region while retaining content-dependent variation across images. This makes the conditional mean useful and also penalizes a context encoder that ignores image content.
- Masked text can admit multiple plausible lexical or semantic completions. If their target embeddings remain separated, the conditional mean can be a centroid corresponding to no completion.
- An encoder can reduce this variance by merging plausible alternatives, making prediction easier while losing representational distinctions. Low loss therefore does not by itself establish an informative or full-rank representation.
- Marginal anti-collapse constraints and conditional concentration address different questions. A representation may have isotropic marginal covariance while its targets remain unpredictable from each context.
- Distributional prediction, mixture predictors, contrastive separation, replacement-based views, or semantically coarser targets are possible responses because they need not encode all valid completions as one Euclidean point.

## Important Papers

- [[papers/the-jepa-paradox-in-language-the-geometry-of-linguistic-alternatives|The JEPA Paradox in Language: The Geometry of Linguistic Alternatives]] introduces the condition and diagnoses centroid degeneration in standalone text JEPA.
- Assran et al. (2023), "Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture," provides the image-domain latent-prediction reference used in the comparison.
- Devlin et al. (2019), "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding," exemplifies distributional masked-token prediction.

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]
- Masked language modeling
- Mutual information
- Representation collapse
- Conditional variance
