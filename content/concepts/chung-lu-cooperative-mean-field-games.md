---
title: Chung-Lu Cooperative Mean Field Games
type: concept
aliases:
  - CLCMFG
  - Chung-Lu Mean Field Control
tags:
  - mean-field-control
  - multi-agent-reinforcement-learning
  - sparse-networks
  - network-games
---

## Overview

Chung-Lu Cooperative Mean Field Games model a population of agents pursuing a shared objective on a sparse [[concepts/chung-lu-graphs|Chung-Lu network]]. Instead of reducing every agent to one population distribution, the model keeps a mean field and policy for each degree class. This preserves the contrast between numerous low-degree agents and rare hubs when average degree remains finite.

## Key Ideas

- **Degree indexes agent types.** Agents with degree $k$ share a policy and a state distribution $\mu^k$, so structural heterogeneity survives the population limit.
- **Sparse topology makes neighborhoods consequential.** With finite average degree, a node does not average over infinitely many neighbors. Its local configuration remains random and can influence its transition even in a large-network limit.
- **Finite and limiting systems are connected.** Under vertex-weight convergence, degree-specific empirical mean fields converge in probability. Continuous population rewards then give objective convergence.
- **Exact sparse dynamics are combinatorial.** Multi-hop neighborhood configurations can grow at least exponentially in a polynomial of degree, preventing direct use of the full limiting system for learning.
- **A two-system approximation controls complexity.** Degrees $1,\ldots,k^*$ retain separate mean fields, while all higher degrees share an aggregated mean field. Size-biased neighbor probabilities couple the two populations.
- **Model-based and model-free learning are possible.** A controller can solve the approximate mean-field MDP, or use the same degree-conditioned policy representation while learning from transitions on a finite observed network.
- **The framework is cooperative.** Unlike equilibrium-focused [[concepts/graphon-mean-field-games|Graphon Mean Field Games]], policies maximize one population objective; the associated limiting decision problem is mean-field control.

## Important Papers

- [[papers/learning-cooperative-mean-field-games-on-sparse-chung-lu-graphs|Learning Cooperative Mean Field Games on Sparse Chung-Lu Graphs]]: introduces the model, proves its finite-to-limit connection, and develops CLMFC and CLMFMARL.
- Hu et al. (2023), "Graphon mean-field control for cooperative multi-agent reinforcement learning": a cooperative graphon-control method for dense networks.
- Lacker, Ramanan, and Wu (2023), "Local weak convergence for sparse networks of interacting processes": related foundations for interacting dynamics on sparse graph limits.

## Related Concepts

- [[concepts/chung-lu-graphs|Chung-Lu Graphs]]: the expected-degree random graph family underlying the model.
- [[concepts/graphon-mean-field-games|Graphon Mean Field Games]]: a network-aware mean-field framework based on continuum graphon labels.
- [[concepts/graphons|Graphons]]: dense graph-limit kernels and a useful contrast to locally sparse limits.
- [[concepts/network-games|Network Games]]: the broader study of decisions and strategic interactions shaped by network structure.
