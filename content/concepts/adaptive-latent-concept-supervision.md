---
title: Adaptive Latent Concept Supervision
type: concept
tags: [visual-document-retrieval, representation-learning, latent-concepts]
---

## Overview

Adaptive latent concept supervision uses variable-length continuous intermediate representations to guide query–document alignment during training. In ConceptFormer, query-relevant visual evidence determines representation capacity, while document-ranking distributions determine the learning signal.

## Key Ideas

- **Evidence-dependent capacity:** map proposed evidence boxes to visual patches and sum their covered-token counts to allocate concept positions. Spatial extent is an operational proxy for capacity requirements.
- **Contextual representations:** concept hidden states depend on both the query and the positive page; they are not simply pooled region pixels or generated textual descriptions.
- **Behavioral alignment:** match the concept-induced document distribution to the query-induced distribution with forward KL divergence alongside contrastive retrieval loss.
- **Training-only augmentation:** remove the concept pathway at inference and retain ordinary query/page embedding retrieval.

ConceptFormer’s matched-backbone ablation improves average NDCG@10 from 74.22 without KL supervision to 75.97 with the full objective. This supports the auxiliary training signal in that setting, while dependence on proposal quality and training cost remain unquantified.

## Important Papers

- [[papers/conceptformer-learning-adaptive-latent-concepts-for-query-document-alignment-in-visual-document-retrieval|ConceptFormer]] (2026): introduces evidence-dependent latent capacity and retrieval-distribution supervision.

## Related Concepts

- [[concepts/knowledge-distillation|Knowledge Distillation]]
- [[concepts/latent-reasoning|Latent Reasoning]]
