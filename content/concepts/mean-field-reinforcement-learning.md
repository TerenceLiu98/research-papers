---
title: Mean Field Reinforcement Learning
type: concept
aliases:
  - Mean Field MARL
  - Mean Field Q-learning
  - MF-Q
definition: "Mean field reinforcement learning approximates the influence of many interacting agents with an aggregate population or neighborhood distribution and learns an individual response to that aggregate."
tags:
  - multi-agent-reinforcement-learning
  - mean-field-games
---

## Overview

Mean field reinforcement learning couples individual policy learning with an aggregate description of other agents. As policies change, the aggregate changes; agents in turn update their responses to it. In local action-based formulations, the aggregate is the average of neighbors' one-hot actions, representing an empirical action distribution.

## Key Ideas

- **Compact strategic context.** A critic conditions on state, own action, and the neighborhood action distribution rather than the full joint action.
- **Coupled updates.** Individual policy changes alter the mean field on which subsequent value updates depend.
- **Approximation has a scope.** Pairwise decomposition and smoothness motivate the approximation; heterogeneous roles or important higher-order interactions can invalidate pooling.
- **Conditional equilibrium guarantees.** Tabular or linear convergence arguments under restrictive assumptions do not automatically cover neural implementations.

## Important Papers

- [[papers/mean-field-multi-agent-reinforcement-learning|Mean Field Multi-Agent Reinforcement Learning]]: develops MF-Q and MF-AC, with experiments on allocation, Ising spins, and battles.

## Related Concepts

- [[concepts/multi-type-mean-field-reinforcement-learning|Multi-Type Mean Field Reinforcement Learning]]: extends a pooled neighborhood summary to separate summaries for behavioral groups.
