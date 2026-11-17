---
title: Multi-Type Mean Field Reinforcement Learning
type: concept
aliases:
  - Multi Type Mean Field Reinforcement Learning
  - Multi-Type Mean Field Q-learning
  - MTMFQ
definition: "Multi-type mean field reinforcement learning approximates a many-agent neighborhood with separate action distributions for behavioral groups and conditions learning on those group-specific summaries."
tags:
  - multi-agent-reinforcement-learning
  - mean-field-games
---

## Overview

Multi-type mean field reinforcement learning retains differences among groups of agents while aggregating interactions within each group. A learner conditions its action values on its own action and a vector of type-specific neighborhood action distributions. This representation is useful when a single pooled distribution conceals distinct strategies or objectives.

## Key Ideas

- **Aggregate within types.** Averaging one-hot actions produces an empirical action distribution for each neighboring group.
- **Separate membership from type count.** Types can be supplied or inferred from behavior; clustering memberships does not automatically select the number of groups.
- **Trade approximation for computation.** More summaries preserve additional distinctions but increase learning cost. A homogeneous population may not benefit.
- **Similarity matters within groups.** The Taylor-expansion motivation relies on small within-type deviations and assumptions about the value function's decomposition and smoothness.
- **Keep theoretical and practical guarantees separate.** Conditional equilibrium arguments do not establish general convergence of neural Q-learning with changing clusters.

## Important Papers

- [[papers/multi-type-mean-field-reinforcement-learning|Multi Type Mean Field Reinforcement Learning]]: introduces known-type and action-clustering variants of MTMFQ and evaluates them in three MAgent games.

## Related Concepts

- [[concepts/graphon-mean-field-games|Graphon Mean Field Games]]: uses continuum network labels rather than finite behavioral clusters to preserve heterogeneous interactions.
- [[concepts/chung-lu-cooperative-mean-field-games|Chung-Lu Cooperative Mean Field Games]]: preserves degree classes in a sparse-network cooperative control problem; its types encode topology rather than learned behavioral similarity.
