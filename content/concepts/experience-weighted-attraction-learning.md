---
title: Experience-Weighted Attraction Learning
type: concept
aliases:
  - EWA Learning
tags:
  - learning-in-games
  - behavioral-game-theory
  - experimental-economics
---

## Overview

Experience-weighted attraction (EWA) learning models repeated strategic choice by assigning an attraction to each action, updating attractions from payoff experience, and translating them into choice probabilities. It combines reinforcement from realized outcomes with learning from forgone payoffs, allowing multiple mechanisms to coexist within a participant.

## Key Ideas

- Attractions summarize the accumulated appeal of actions; discounting determines how much past experience survives each update.
- A common stochastic response is $P_j=\exp(\lambda A_j)/\sum_k\exp(\lambda A_k)$, where $\lambda$ controls sensitivity to attraction differences.
- Information availability matters. A participant who does not know the payoff function cannot automatically evaluate every unchosen action. [[concepts/information-search-in-game-experiments|Information Search in Game Experiments]] can reveal which alternatives were actually investigated.
- Bigoni and Fort's extension uses separate weights for own realized payoffs, inspected best-reply and profit-calculator outcomes, and observed action-payoff pairs of the best and other competitors. This imitation extension should be distinguished from standard EWA.
- In that extension, a surprise index discounts past attractions more strongly when recent aggregate rival output differs from its historical distribution.
- Identifiable coefficient products need not identify every structural parameter. With a common response scale, ratios of payoff weights may be identified even when the weights and scale are not separately recoverable. These ratios measure relative contributions to attraction, not percentages of participants using a rule.

## Important Papers

- [[papers/information-and-learning-in-oligopoly-an-experiment|Information and learning in oligopoly: An experiment]]: estimates information-gated reinforcement, adaptive, and imitation channels in repeated human Cournot play; Section 4.4 and Appendix C detail the extension and identification.
- Camerer and Ho (1998, 1999): foundational EWA models discussed in that paper.
- Ho, Camerer, and Chong (2007), "Self-tuning experience weighted attraction learning in games": surprise-dependent adjustment of memory, as described by Bigoni and Fort.

## Related Concepts

- [[concepts/information-search-in-game-experiments|Information Search in Game Experiments]]
- Reinforcement learning in games
- Adaptive learning
- Conditional logit models
- Payoff-based imitation
