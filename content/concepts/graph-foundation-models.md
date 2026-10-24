---
title: Graph Foundation Models
type: concept
aliases:
  - GFMs
tags:
  - graph-representation-learning
  - foundation-models
  - transfer-learning
---

## Overview

Graph foundation models learn reusable representations or interfaces intended to transfer across graph datasets, domains, and tasks. Their central difficulty is that graphs can differ simultaneously in topology, scale, node identities, and feature semantics, so a shared input format does not by itself create a shared representation geometry.

## Key Ideas

- Feature-centric models map node attributes into a shared embedding space, but this presumes that incompatible or missing features can be reconciled through projection, padding, language, or dataset-specific adapters.
- Interface-centric models use prompts, task trees, retrieval, or text supervision to expose heterogeneous tasks through a common model interface.
- Structure-centric models seek transferable invariants in topology. [[papers/structure-centric-graph-foundation-model-via-geometric-bases|SCGFM]] treats graphs as metric measure spaces and locates them by their [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein]] discrepancies to learned geometric bases.
- Cross-domain evaluation should distinguish intrinsic representation transfer from target-side adaptation. A fixed-encoder few-shot protocol tests whether pretrained representations remain useful with only a lightweight downstream classifier.
- A general graph representation may need both topology and attributes. Their relative importance is domain-dependent: molecular graph labels may be structure-heavy, while citation-network labels can depend primarily on semantic node features.

## Important Papers

- [[papers/structure-centric-graph-foundation-model-via-geometric-bases|Structure-Centric Graph Foundation Model via Geometric Bases]]: learns geometric bases and structure-conditioned feature projections for fixed-encoder cross-domain transfer.
- Liu et al. (2025), "Graph Foundation Models: Concepts, Opportunities and Challenges": surveys the field's model, data, and transfer challenges.
- Wang et al. (2025), "Towards Graph Foundation Models: Learning Generalities Across Graphs via Task-Trees": develops a shared task interface across graphs.
- Yu et al. (2025), "SAMGPT: Text-Free Graph Foundation Model for Multi-Domain Pre-Training and Cross-Domain Adaptation": targets graph transfer without textual input.

## Related Concepts

- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/deep-metric-learning|Deep Metric Learning]]
- [[concepts/transfer-operators|Transfer Operators]]
