---
title: "Fear of exclusion: the dynamics of club formation"
type: paper
authors:
  - Priyanka Joshi
year: 2024
tags:
  - coalition-formation
  - game-theory
  - dynamic-stability
---

## TL;DR

Patient individuals can rationally leave an optimal-sized club to secure membership in a smaller, sustainable club. The paper constructs pure stationary Markov perfect equilibria in which fear of ending up in an inferior residual club sustains partitions containing no optimal-sized clubs. Finite-horizon play instead preserves optimal clubs and creates another whenever enough individuals remain outside them.

## Research Question

Can repeated opportunities to form and dissolve clubs generate inefficient membership sizes even when everyone has identical preferences over club size?

## Motivation

Sharing club goods trades economies of membership against congestion. Although every individual prefers the same optimal size, membership cannot be contractually secured against future departures. A currently attractive club may therefore be less valuable than a sustainable alternative once future exclusion is considered.

## Contributions

- Establishes a finite-horizon benchmark through backward induction: optimal-sized clubs never dissolve, and an additional one forms each period while feasible.
- Constructs a class of infinite-horizon equilibria with two persistent club sizes, potentially both suboptimal.
- Derives fear of exclusion from continuation incentives rather than assuming a psychological preference for inclusion.
- Connects club formation to [[concepts/dynamic-institutional-stability|Dynamic Institutional Stability]] while distinguishing equilibrium persistence from optimal membership size.

## Method

There are $n\geq3$ identical players. A club structure partitions the population, and each player's per-period payoff $v(s)$ depends only on her club's size. Strictly concave, single-peaked utility has a unique optimal size $s^*$. Players share discount factor $\delta$. A small positive formation cost $\varepsilon$ breaks ties and is assumed smaller than strict payoff differences.

Each period, Nature selects a proposer order. A proposer offers a club containing herself or passes; formation requires unanimous acceptance by proposed members. The first successful proposal ends the period. Departing players leave residual members together in their previous clubs. There are no binding membership commitments.

The analysis uses pure stationary Markov perfect equilibria with stage-undominated responses. Strategies depend on the partition, remaining proposer order, and, for respondents, the proposal. The infinite-horizon proof constructs strategies and continuation values and checks one-shot deviations.

For a candidate sustainable size $\bar s$, let $m=\lfloor n/\bar s\rfloor$ and $r=n-m\bar s$. Proposition 3 requires $r>0$ and $v(r)<v(\bar s)$. For sufficiently high $\delta$, an equilibrium preserves existing size-$\bar s$ clubs and creates an additional one whenever fewer than $m$ exist. Eventually the partition contains $m$ such clubs and one residual size-$r$ club. The worse residual outcome makes exclusion costly; this is an existence result for a selected equilibrium class, not a characterization of all equilibria.

## Experiments

This is a theoretical study with proofs and an analytical example; no empirical dataset is used.

**Finite horizon (Propositions 1–2).** Existing size-$s^*$ clubs survive. Provided enough periods remain, the maximum feasible number of optimal clubs forms; remaining individuals subsequently consolidate into a residual club if needed.

**Eight-player example (Section 5).** With $v(s)=10s-s^2$, the optimal size is five, giving payoff 25. A partition of sizes $(3,3,2)$ instead gives payoffs 21, 21, and 16 by club. The paper reports an equilibrium construction for $\delta\geq8/9$. Its illustrative continuation lottery gives probability $9/10$ of a good club and $1/10$ of the bad club, with expected payoff 20.5. A transient payoff of 25 can thus be outweighed by the risk of losing secure membership yielding 21. The partition $(5,3)$ can Pareto dominate $(3,3,2)$ with an appropriate assignment of members.

## Limitations

Preferences are homogeneous, depend only on size, and exclude member identities and heterogeneous club attributes. The infinite-horizon result relies on sufficient patience, unanimous formation, lack of commitment, and an inferior residual club. Other equilibria, including structures with three sizes, are not characterized; robustness to joint deviations is left for future work.

Optimality primarily means maximizing the number of optimal-sized clubs, rather than a complete welfare ordering. The paper demonstrates Pareto inefficiency in its example but does not classify every infinite-horizon outcome. Its discussion of religious fundamentalism is a proposed extension, not an empirical explanation or established application.

## Related Concepts

- [[concepts/fear-of-exclusion-in-club-formation|Fear of Exclusion in Club Formation]]: the continuation-risk mechanism sustaining inferior membership sizes.
- [[concepts/dynamic-institutional-stability|Dynamic Institutional Stability]]: evaluates persistence through anticipated future transitions.
- [[concepts/clubwise-stability|Clubwise Stability]]: a related membership-deviation concept; static stability conditions do not establish this paper's dynamic equilibrium.

## Related Papers

- [[papers/dynamics-and-stability-of-constitutions-coalitions-and-clubs|Dynamics and Stability of Constitutions, Coalitions, and Clubs]]: the cited foundation for forward-looking dynamic stability.
- Arnold and Wooders (2015), “Dynamic club formation with coordination”: contrasts myopic, unrestricted entry with this paper's forward-looking unanimous formation.
- Anesi and Seidmann (2015), “Bargaining in standing committees with an endogenous default”: related equilibrium construction, with a different voting and absorption structure.
