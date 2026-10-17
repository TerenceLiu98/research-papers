---
title: Shared and Scale-Specific Temporal Representations
type: concept
aliases:
  - Scale-Shared and Scale-Specific Features
tags:
  - time-series
  - multi-scale-learning
  - representation-learning
---

## Overview

Multi-scale time-series models process several resolutions of the same observations. Their embeddings can contain both common information and information distinctive to a particular resolution. Separating these components allows a predictor to aggregate common information once while retaining resolution-dependent details.

## Key Ideas

- **Coupled weights in direct fusion.** Under the additive model $F_s=F_{\mathrm{sha}}+F_{s,\mathrm{spe}}$, the sum $\sum_s\alpha_sF_s$ gives the common feature weight $\sum_s\alpha_s$. Explicit separation allows a different weight for common information. This argument depends on the additive model and fusion rule.
- **Complementary feature allocation.** DisMS-TS uses sigmoid masks $m_s$ and $1-m_s$ to partition each embedding into shared and specific branches. Their sum reconstructs the original embedding, but both branches can retain overlapping information.
- **Different cross-scale targets.** Pairwise shared-vector cosine similarities are pushed toward one, while specific-vector similarities are pushed toward zero. Shared embeddings are averaged and specific embeddings concatenated before classification.
- **Geometry versus independence.** Cosine alignment describes direction rather than full distributional equality. Orthogonality does not establish statistical independence, and complementary masks do not establish zero correlation. These are practical regularization targets rather than guarantees of generative-factor recovery.
- **Resolution selection remains consequential.** More downsampling levels introduce coarser views, but excessive coarsening can degrade useful shared structure. DisMS-TS reports dataset-dependent optima rather than a universally best scale count.

## Important Papers

- [[papers/disms-ts-eliminating-redundant-multi-scale-features-for-time-series-classification|DisMS-TS: Eliminating Redundant Multi-Scale Features for Time Series Classification]]: implements complementary masks and pairwise regularizers, with classification gains on five of six evaluated datasets.

## Related Concepts

- [[concepts/disentangled-representations|Disentangled Representations]]: the broader aim of separating factors of variation; scale-based geometric separation is a narrower operational objective.
