---
title: Stackelberg Games
type: concept
aliases:
  - Stackelberg Game
  - Leader–Follower Games
definition: "Stackelberg games model sequential strategic choice in which a leader anticipates a follower's best response when selecting its own action."
tags:
  - game-theory
  - sequential-decisions
---

## Overview

A Stackelberg game represents strategic commitment followed by a rational response. The leader optimizes with the follower's response incorporated into its objective. Who moves first and what the follower observes are part of the model.

## Key Ideas

- In an attacker-led zero-sum formulation, the leader solves $\max_a\min_d J(a,d)$ and the follower minimizes the same payoff after observing the attack choice.
- Complete information concerns knowledge of payoffs and strategies; it does not imply that the leader observes a future realized response.
- Resource constraints can make both strategy spaces combinatorial even when a best response is easy to compute.
- Exact payoff evaluation and exact equilibrium search are separate computational requirements. A greedy search can remain approximate despite using exact payoffs.

## Important Papers

- [[papers/nonlinear-dynamics-of-state-dependent-attacks-in-network-systems-a-stackelberg-game-approach|Nonlinear dynamics of state-dependent attacks in network systems: A Stackelberg game approach]]: applies attacker-led selection to bilinear network disturbances and adaptive observation channels, with Gramian-based payoffs.

## Related Concepts

- [[concepts/approximate-nash-equilibrium|Approximate Nash Equilibrium]]: measures incentives for unilateral deviations in a simultaneous strategy profile; sequential commitment requires a different response-based solution concept.
