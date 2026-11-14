---
title: Client Drift
type: concept
tags:
  - federated-learning
  - data-heterogeneity
  - optimization
---

## Overview

Client drift is the divergence of local federated model updates from the update direction appropriate for a shared global objective. When client data distributions differ, repeated local optimization can emphasize incompatible patterns before aggregation.

## Key Ideas

- Local objectives can differ even when clients share a model architecture. More local training can amplify these differences.
- Mitigation can act through gradient correction, regularization toward the global model, aggregation, or local sample selection.
- Sample loss under the global model can serve as a scheduling proxy, but high loss does not itself prove that a sample causes harmful drift: it can also represent useful, unfamiliar information or label noise.
- Progressive inclusion balances initial update stability against eventual coverage of difficult samples. A warmup stage can make model-dependent selection less unstable.

## Important Papers

- [[papers/federated-learning-with-sample-level-client-drift-mitigation|Federated Learning with Sample-level Client Drift Mitigation]]: FedBSS schedules low-loss samples before higher-loss samples after full-data warmup.
- SCAFFOLD: Stochastic Controlled Averaging for Federated Learning (Karimireddy et al., 2020): uses control variates to correct local updates, as discussed in the FedBSS paper.
- Federated Optimization in Heterogeneous Networks (Li et al., 2020): uses proximal regularization, as discussed in the FedBSS paper.

## Related Concepts

- [[concepts/heterogeneous-federated-reinforcement-learning|Heterogeneous Federated Reinforcement Learning]]: local environment differences create related conflicts among client optimization objectives.
