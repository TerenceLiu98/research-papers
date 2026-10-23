---
title: Heterogeneous Federated Reinforcement Learning
type: concept
aliases:
  - HFRL
tags:
  - federated-learning
  - reinforcement-learning
  - distributed-learning
  - environment-heterogeneity
---

## Overview

Heterogeneous federated reinforcement learning coordinates reinforcement-learning agents whose local environments differ. Agents train locally without centralizing their experience data, periodically send model information to an aggregator, and receive a shared global model intended to work across the participating environments. Environment heterogeneity makes this harder than homogeneous federation because local updates optimize policies or value functions under different transition or reward dynamics.

## Key Ideas

- **Local interaction, global synchronization.** Each agent gathers experience in its own environment and updates a local policy or value model. Synchronization combines parameters, gradients, or other model information and broadcasts the result.
- **Heterogeneity changes the optimization target.** An update that improves one environment may conflict with updates from another. A global model therefore represents a compromise across local control problems rather than merely a data-parallel estimate from identically distributed samples.
- **Aggregation is a modeling choice.** Arithmetic parameter averaging is inexpensive but assumes that coordinates across local models are meaningfully aligned. Geometry-aware fusion methods can alter this compromise, but introduce additional computation and assumptions about how model parameters are represented.
- **Synchronization frequency matters.** Frequent communication can limit local drift but costs more; infrequent synchronization allows local specialization but may make aggregation less stable.
- **Evaluation must separate sample efficiency from systems efficiency.** Episodes or epochs to reach a reward threshold do not measure wall-clock speed when aggregation, communication, and environment interaction have different costs.

## Important Papers

- Jin et al. (2022), "Federated Reinforcement Learning with Environment Heterogeneity": studies averaged Q-networks and policy networks under heterogeneous environments.
- Khodadadian et al. (2022), "Federated Reinforcement Learning: Linear Speedup Under Markovian Sampling": analyzes convergence, synchronization frequency, and agent-count scaling.
- [[papers/heterogeneous-federated-reinforcement-learning-using-wasserstein-barycenters|Heterogeneous Federated Reinforcement Learning Using Wasserstein Barycenters]]: replaces arithmetic model averaging with Wasserstein-barycenter fusion and evaluates the approach on CartPole environments with different pole lengths.

## Related Concepts

- [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]: a geometry-aware aggregation mechanism used by FedWB.
- [[concepts/optimal-transport|Optimal Transport]]: supplies the distance underlying Wasserstein aggregation.
- [[concepts/federated-multi-agent-systems|Federated Multi-Agent Systems]]: coordinates information during multi-agent task execution rather than federating model training.
