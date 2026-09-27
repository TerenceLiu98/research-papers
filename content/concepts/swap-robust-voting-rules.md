---
title: Swap-Robust Voting Rules
type: concept
aliases:
  - Swap-Robustness
  - Linear Voting Rules
tags:
  - voting-games
  - voting-power
  - social-choice
---

## Overview

Swap-robustness constrains how exchanging voters between approval levels can affect winning coalitions. For voting with abstention, a tripartition assigns each voter to support, abstention, or opposition. Consider two winning tripartitions in which voters $i$ and $j$ occupy reversed positions. The rule is swap-robust if exchanging their positions in both tripartitions leaves at least one of the resulting tripartitions winning.

## Key Ideas

- **A structural property of the rule.** The condition quantifies over winning vote configurations and voter pairs, rather than over a particular observed preference profile. It generalizes the corresponding condition for binary yes-no games.
- **Complete influence rankings.** In the class of voting rules with abstention discussed by Pongou and Tchantcho, swap-robustness is equivalent to the influence relation being complete and transitive. Such rules are also called linear; this terminology describes the ordering of voters, not a linear numerical utility function.
- **Connection to satisfaction.** For the tournament loss model with $\alpha=\lambda$ and $\beta<1$, the effective-power relation agrees with influence and is therefore complete and transitive exactly when the rule is swap-robust.
- **Connection to power indices.** In that parameter regime, swap-robustness also yields agreement with the voter rankings induced by the abstention versions of the Shapley-Shubik and Banzhaf indices. Without swap-robustness the effective-power relation is incomplete and cannot equal those numerical rankings.
- **Structural conditions alone are insufficient.** At $\beta=1$, a swap-robust rule can still generate disagreement between effective power and classical indices. The loss assigned to unresolved outcomes matters as well as the voting rule.

The supplied statement of Pongou and Tchantcho's Theorem 5 omits $\alpha=\lambda$, although its proof invokes Theorem 4, which requires that assumption. The effective-power characterization here retains it.

## Important Papers

- [[papers/round-robin-political-tournaments-abstention-truthful-equilibria-and-effective-power|Round-robin political tournaments: Abstention, truthful equilibria, and effective power]] (Pongou and Tchantcho, 2021): applies swap-robustness to completeness of effective power and agreement with classical indices.
- Parker (2012), "The influence relation for ternary voting games," as cited in the ingested paper: extends the equivalence of power rankings to linear voting rules with abstention.
- Taylor and Zwicker (1999), *Simple Games: Desirability Relations, Trading, Pseudoweightings*, as cited in the ingested paper: antecedent treatment of swap-robustness in simple games.

## Related Concepts

- [[concepts/effective-voting-power|Effective Voting Power]]
- [[concepts/round-robin-political-tournaments|Round-Robin Political Tournaments]]
