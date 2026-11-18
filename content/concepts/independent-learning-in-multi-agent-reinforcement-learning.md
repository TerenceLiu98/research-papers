---
title: Independent Learning in Multi-Agent Reinforcement Learning
type: concept
aliases:
  - Independent Multi-Agent Learning
definition: "Independent learning trains agent-local policies or value functions while treating other agents as part of the environment, rather than explicitly learning a joint value function."
tags:
  - multi-agent-reinforcement-learning
  - independent-learning
---

## Overview

Independent learning decomposes a multi-agent control problem into local learning problems. Each agent acts from its own observations or history while other agents’ behavior enters through environmental transitions and rewards. Cooperative independent learners can use a shared team reward.

## Key Ideas

- Other agents’ changing policies create nonstationarity from the focal agent’s perspective, undermining ordinary stationary single-agent convergence arguments.
- Parameter sharing is compatible with local policies and local critics. Independence of information and value estimation does not require separate neural weights.
- Independent learning differs from centralized-critic training: decentralized execution alone does not make a learning algorithm independent.
- PPO-style policy clipping can stabilize empirical learning, but does not eliminate coordination failures or guarantee optimal joint policies.
- Relative overgeneralization can favor actions that perform adequately against many teammate actions over actions that succeed only with coordinated choices.

## Important Papers

- [[papers/is-independent-learning-all-you-need-in-the-starcraft-multi-agent-challenge|Is Independent Learning All You Need in the StarCraft Multi-Agent Challenge?]] demonstrates competitive local-critic PPO on selected SMAC maps while retaining a Stag Hunt failure case.
- Tan (1993), “Multi-Agent Reinforcement Learning: Independent vs. Cooperative Agents”: an early comparison discussed in the IPPO paper.

## Related Concepts

- [[concepts/multi-agent-credit-assignment|Multi-Agent Credit Assignment]]: sharing a team reward does not itself identify individual contributions.
