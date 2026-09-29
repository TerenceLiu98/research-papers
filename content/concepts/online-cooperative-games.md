---
title: Online Cooperative Games
type: concept
aliases:
  - OCG
tags:
  - cooperative-game-theory
  - online-mechanism-design
  - participation-incentives
---

## Overview

Online cooperative games study value allocation as players join a coalition sequentially. In the strategic-arrival model, a game $(N,v,\pi)$ specifies the players, a normalized monotone coalition valuation, and an arrival order. Each prefix generates value that must be allocated among players already present, without knowledge of future arrivals.

## Key Ideas

- **Prefix feasibility:** at any stage, nonnegative allocations exhaust that prefix's value. Irrevocability additionally requires cumulative allocations not to decrease as new players arrive.
- **Strategic timing:** Early Arrival requires that a player cannot improve their final payoff by delaying entry while everyone else's relative order remains fixed. It does not assume that observed arrivals are uniformly random.
- **Distinct participation requirements:** Stay prevents declining cumulative payoffs; Part gives a positive immediate reward to a positively contributing entrant; S-Stay additionally requires essential earlier players to have gained relative to their entry allocation. These are different from IR, which protects standalone value.
- **Dummy status is local to a prefix:** a player may contribute zero to every coalition currently available yet become useful when a complementary player arrives. Online Dummy requires zero allocation while that player remains dummy in the prefix game.
- **Ex-ante fairness:** Shapley fairness averages allocations over uniform arrival permutations. As summarized by Aziz et al. (2026), prior work shows that it cannot coexist with Stay and Early Arrival in all 0-1 games.
- **Singleton guarantees need resources:** efficiency can conflict with IR under general monotone valuations. Superadditivity provides enough marginal value at entry to pay each player's singleton value before sharing the surplus.
- **Simple games:** monotone 0-1 valuations yield a single prefix transition from zero to one. Rules with desirable behavior in these games need not retain it on general valuations without an appropriate extension.

## Important Papers

- [[papers/participation-incentives-in-online-cooperative-games|Participation Incentives in Online Cooperative Games]] (Aziz, Guo, and Sun, 2026): studies stronger participation axioms and equal sharing constructions, with an IR refinement under superadditivity.
- Ge et al. (2024), "Incentives for Early Arrival in Cooperative Games": cited by Aziz et al. as the foundation for the strategic-arrival model and its fairness-incentive incompatibility.

## Related Concepts

- [[concepts/equal-sharing-rules-for-online-cooperative-games|Equal Sharing Rules for Online Cooperative Games]]: distribute each new marginal increment across a selected subset of arrived players.
