---
title: Participation Incentives in Online Cooperative Games
type: paper
authors:
  - Haris Aziz
  - Yuhang Guo
  - Zhaohong Sun
year: 2026
venue: AAMAS 2026
doi: 10.65109/VZOJ2040
source_job_id: "dd2566ee-212c-4e56-a6bf-c634812aa883"
tags:
  - cooperative-game-theory
  - online-mechanism-design
  - participation-incentives
---

## TL;DR

In [[concepts/online-cooperative-games|online cooperative games]], players arrive sequentially and generated value must be allocated irrevocably. Aziz, Guo, and Sun propose [[concepts/equal-sharing-rules-for-online-cooperative-games|equal sharing rules]] that reward contributing entrants and essential incumbents while preventing gains from delayed arrival. Excluding dummy players creates computational tradeoffs; under superadditive valuations, a singleton-payment refinement additionally guarantees individual rationality. The results are axiomatic, with no empirical evaluation.

## Research Question

Which online value-sharing rules jointly encourage early arrival, continued participation, and immediate rewards for contributing entrants? Can these guarantees coexist with zero payments to dummy players and with each player's standalone payoff?

## Motivation

A coalition such as a startup may grow before its eventual membership is known. Recomputing an offline allocation can reduce incumbents' rewards, whereas giving each entrant their entire marginal contribution can encourage strategic delay. The paper prioritizes participation guarantees after the incompatibility, attributed to Ge et al. (2024), of early arrival, staying incentives, and Shapley fairness in some games.

## Contributions

- Formalizes Strong Incentive to Stay (S-Stay) and Incentive for Participation (Part), and studies the classical Individual Rationality (IR) requirement in the online setting.
- Shows why Distribute Marginal Contribution (DMC), prefix-wise Shapley Value (SV), and extended Reward First Critical Player (eRFC) fail to satisfy the participation axioms jointly (Propositions 3.1-3.2).
- Gives sufficient structural conditions for equal sharing to satisfy early arrival, and instantiates them with MES and NDMES (Theorem 4.3; Proposition 4.4).
- Develops greedy ULMES and its decomposition-based extension eULMES, distinguishing the former's general failure of early arrival from the latter's reported guarantee (Theorems 4.5 and 4.8).
- Establishes general impossibility of IR and gives a refinement for superadditive valuations (Proposition 5.1; Theorem 5.3).

## Method

### Model and Axioms

A game is $(N,v,\pi)$, where $v$ is nonnegative, normalized, and monotone, and $\pi$ is the arrival order. Let $P_i$ be the prefix ending with entrant $i$. The newly available value is

$$
\Delta_i=v(P_i)-v(P_i\setminus\{i\}).
$$

Allocations are nonnegative and exhaust the coalition value. The relevant criteria are:

- **Stay:** cumulative rewards never decrease as the prefix grows.
- **Early Arrival (EA):** delaying one's arrival cannot increase one's final reward when the relative order of everyone else is fixed.
- **S-Stay:** Stay holds, and if entrant $i$ has $\Delta_i>0$ and an earlier player $j$ satisfies $v(P_i)>v(P_i\setminus\{j\})$, then $\phi(G^i,j)>\phi(G^j,j)$ (Definition 2.6).
- **Part:** $\Delta_i>0$ implies an immediate positive allocation to entrant $i$.
- **IR:** each player receives at least $v(\{i\})$.
- **Online Dummy (OD):** a player whose marginal contribution is zero to every coalition in a prefix subgame receives zero in that subgame.

Shapley fairness instead requires expected rewards over uniformly random arrival permutations to equal offline Shapley values. The proposed rules relinquish that guarantee. S-Stay's displayed definition compares an incumbent's reward with their reward at entry; the accompanying prose describes receiving a share of the new increment. The definition alone should not be restated as a strict increase at every qualifying step.

### Equal Sharing and Its Variants

At each arrival, select a sharing set $S^i\subseteq P_i$ and give each member $\Delta_i/|S^i|$. Nonnegative increments ensure Stay. Theorem 4.3 states that an equal sharing rule satisfying S-Stay and Part also satisfies EA if its sharing sets are nested across prefixes (**sharing consistency**) and depend only on prefix membership (**order independence**).

**MES** shares with all arrived players. **NDMES** shares only with players who are non-dummy in the current prefix. Both satisfy those structural conditions, but MES can reward free riders and NDMES requires checking coalitions to identify dummy players in general.

**ULMES** starts with the full prefix and examines players from latest to earliest, deleting a player when the remaining set retains the full prefix value. It shares the increment among those retained. The paper reports $O(n^2)$ time for the overall procedure when valuation checks are treated as elementary operations. ULMES satisfies EA for monotone 0-1 games, but fails it for general monotone valuations.

**eULMES** applies the Greedy Monotone decomposition attributed to Ge et al. (2024), runs ULMES on the resulting 0-1 component games, and sums their weighted allocations. Theorem 4.8 states that this extension satisfies S-Stay, EA, Part, and OD.

| Rule | Part | EA | S-Stay (includes Stay) | OD | Computational qualification in the paper |
| --- | --- | --- | --- | --- | --- |
| MES | Yes | Yes | Yes | No | Polynomial time |
| NDMES | Yes | Yes | Yes | Yes | General dummy detection may require exponential work; polynomial under subadditivity |
| ULMES | Yes | No in general | Yes | Yes | $O(n^2)$ with elementary valuation checks; EA holds for 0-1 games |
| eULMES | Yes | Yes | Yes | Yes | Polynomial for 0-1 games; no general polynomial guarantee |

### Individual Rationality

For arbitrary monotone valuations, efficiency and IR need not be jointly feasible. Under superadditivity, however, $\Delta_i\geq v(\{i\})$. The refinement pays entrant $i$ their singleton value first and distributes the residual $\Delta_i-v(\{i\})$ through the sharing rule. Theorem 5.3 states that IR-MES, IR-NDMES, and IR-eULMES satisfy IR while retaining their earlier axiomatic guarantees on this domain. This is a reported theorem; its deferred proof is not present in the supplied Markdown.

## Experiments

There are no datasets, simulations, or runtime measurements. Evidence consists of formal arguments and constructed counterexamples.

- **An entrant can receive nothing (Proposition 3.1):** With two players, zero singleton values, and joint value one, eRFC gives the entire unit to the first player. The second player's positive contribution earns no immediate reward, violating Part.
- **Essential incumbents can receive nothing (Proposition 3.2):** When three players are jointly necessary to generate one unit, DMC pays only the last entrant and eRFC only the first. Both leave essential incumbents unrewarded, violating S-Stay.
- **Greedy sharing can reward delay (Example 4.6):** For a four-player game with $0<x<y$, player 3 receives $x/3+(y-x)/2$ under order $(1,2,3,4)$ but $y/2$ under $(1,2,4,3)$. Subtracting the displayed payoffs gives a gain of $x/6$, demonstrating ULMES's failure of EA.

## Limitations

The guarantees concern strategic arrival in a normalized monotone transferable-value model. They do not establish robustness to valuation misreports, collusion, or arbitrary coalition departures. Stay is formalized through cumulative prefix allocations rather than a general dynamic exit game.

Computational tractability is restricted: identifying all non-dummy players and decomposing a general game can be costly. IR requires the superadditive restriction used for the refinement, and none of the proposed variants retains Shapley fairness. Necessary and sufficient conditions for the participation guarantees remain open; Theorem 4.3 supplies sufficient conditions only.

The supplied Markdown ends with the references and omits the appendix cited for several proofs and decomposition details. It also contains damaged mathematical notation and inconsistent pseudocode: Algorithm 3 places the loop decrement inside a conditional, and Algorithm 4's distribution loop updates the entrant rather than the loop's recipient. The descriptions above follow the surrounding prose rather than treating those listings as executable algorithms. Deferred results are attributed to the authors, not independently verified here.

## Related Concepts

- [[concepts/online-cooperative-games|Online Cooperative Games]]: prefix allocations, strategic timing, and participation axioms.
- [[concepts/equal-sharing-rules-for-online-cooperative-games|Equal Sharing Rules for Online Cooperative Games]]: selecting recipients of each marginal increment and the resulting incentive tradeoffs.

## Related Papers

- Ge et al. (2024), "Incentives for Early Arrival in Cooperative Games," AAMAS, 651-659: the cited foundation for strategic arrivals, Stay, EA, Shapley fairness, RFC, and game decomposition (reference 22).
- Zhang et al. (2025), "Incentives for Early Arrival in Cost Sharing": the cited cost-sharing counterpart (reference 36).
- Shapley (1953), "A Value for n-Person Games": the offline allocation benchmark used to define Shapley fairness (reference 33).

Source: [AAMAS paper DOI](https://doi.org/10.65109/VZOJ2040).

[[index|Library home]]
