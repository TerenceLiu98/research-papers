---
title: Sparse Mixture of Experts
type: concept
aliases:
  - Sparse MoE
tags:
  - mixture-of-experts
  - conditional-computation
---

## Overview

A sparse mixture of experts routes each token to a small subset of available expert networks and combines their outputs with gating weights. In transformers, expert feed-forward networks commonly replace the dense FFN within each block. This separates total model capacity from the parameters activated for one token and permits specialization among tokens with different patterns.

## Key Ideas

- **Conditional computation:** With $M$ experts and $K$ selected experts per token, the layer computes a weighted sum over the selected subset. Increasing $M$ can expand capacity while keeping $K$ fixed, but total storage and routing overhead still matter.
- **Routing defines specialization:** A learned linear gate produces token-to-expert scores. MOIRAI-MOE instead derives centroids from pretrained token representations and uses distance-based routing, illustrating how prior representation structure can guide expert assignments.
- **Balance and accuracy are distinct:** Load-balancing losses encourage broader expert use. In MOIRAI-MOE's experiments, centroid routing uses experts less diversely yet performs better than the tested linear gates; uniform use is not itself a measure of forecasting quality.
- **Specialization can vary within a sequence:** Time-series patches at different phases of a cycle can select different experts, allowing finer adaptation than one expert assignment or projection per dataset or sampling frequency.
- **Measure behavior across layers:** MOIRAI-MOE's analyzed small model concentrates routing in deeper layers. This is an empirical observation in that setting, not a universal law for MoE architectures; pruning benefits require separate evaluation.

## Important Papers

- [[papers/moirai-moe-empowering-time-series-foundation-models-with-sparse-mixture-of-experts|MOIRAI-MOE: Empowering Time Series Foundation Models with Sparse Mixture of Experts]] uses two of 32 experts per token and studies pretrained-centroid routing for heterogeneous forecasting data (Sections 3.2, 4.3-4.5, and Appendix B.3).

## Related Concepts

- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: a domain where sparse routing supports specialization across temporal patterns.
- [[concepts/transferability-evaluation|Transferability Evaluation]]: checking whether specialized pretrained computation transfers to held-out datasets.
