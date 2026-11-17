---
title: Zero-Determinant Strategies
type: concept
aliases:
  - ZD Strategies
definition: "Zero-determinant strategies are repeated-game strategies that unilaterally enforce a linear relation between players' long-run expected payoffs, subject to feasibility constraints on action probabilities."
tags:
  - game-theory
  - repeated-games
  - payoff-control
---

## Overview

Zero-determinant strategies let a player impose a linear relation among long-run payoffs without requiring the opponent to coordinate. They exploit the repeated game's transition structure; they do not guarantee arbitrary payoffs in arbitrary games.

## Key Ideas

- A memory-one policy chooses action probabilities conditional on the previous joint action. In a two-player, two-action game, this gives four conditional probabilities per player.
- Appropriate alignment of the policy with payoff vectors enforces $\alpha S_A+\beta S_D+\gamma=0$. Special cases fix one's own payoff, the opponent's payoff, or their difference.
- Every conditional probability must remain in $[0,1]$. The payoff matrix therefore restricts both existence and the range of enforceable objectives.
- Long-run expected payoff control differs from control of every realized round and from maximizing payoff against a known opponent.
- In network attack–defense applications, topology determines the payoff matrix through connectivity losses and action costs. Feasible environmental area and enforceable payoff width measure different aspects of control.

## Important Papers

- [[papers/a-game-theoretic-attack-defense-framework-for-the-study-of-network-resilience|A game-theoretic attack-defense framework for the study of network resilience]]: applies unilateral payoff relations to repeated network attacks and defenses, showing how degree heterogeneity shapes control feasibility and capacity. Its discussion traces the approach to Press and Dyson's 2012 iterated-game result.

## Related Concepts

- [[concepts/road-network-vulnerability|Road Network Vulnerability]]: structural disruption measures can supply payoffs for a strategic game; payoff control requires an additional repeated-interaction model.
