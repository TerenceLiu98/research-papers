---
title: Round-Robin Political Tournaments
type: concept
tags:
  - social-choice
  - voting-games
  - abstention
  - truthful-equilibria
---

## Overview

A round-robin political tournament compares every pair in a finite set of candidates using a fixed voting rule. Voters may support either candidate or abstain. The collected pairwise outcomes form a social relation that may be incomplete or cyclic, so a tournament in this sense need not produce a complete ranking or select one winner.

## Key Ideas

- **Separate preferences from actions.** Voters have complete, transitive preferences allowing indifference, but may strategically cast any of the three available votes in each contest. Truthful behavior supports the preferred candidate and abstains under indifference.
- **Separate indifference from incomparability.** Individual indifference means a voter values two candidates equally. Social incomparability means neither candidate defeats the other under the aggregation rule. Pongou and Tchantcho's rules exclude social indifference as a distinct outcome.
- **Measure utility over the whole relation.** The studied game adds disagreement losses over all $m(m-1)/2$ pairs. Loss is zero for agreement and one for strict reversal; $\beta$ penalizes incomparability for a voter with a strict preference, while $\alpha$ and $\lambda$ penalize strict social ordering and incomparability for an indifferent voter.
- **Truthful-equilibrium condition.** With at least three voters, two candidates, and losses in $(0,1]$, $\alpha=\lambda$ is necessary and sufficient for truthful voting to be a Nash equilibrium across all rules and preference profiles in the paper's class. The rule must be monotone, accept unanimous support, and prohibit both directions from winning. The result does not require the disagreement function to be a metric.
- **Scope of the guarantee.** Failure of the parameter condition allows counterexamples; it does not rule out truthful equilibrium in each particular game. Truthful equilibrium also need not be unique or socially optimal. The paper's sequential presentation result retains simultaneous voting within each pair and a Nash formulation.

## Important Papers

- [[papers/round-robin-political-tournaments-abstention-truthful-equilibria-and-effective-power|Round-robin political tournaments: Abstention, truthful equilibria, and effective power]] (Pongou and Tchantcho, 2021): formalizes the strategic game, proves the truthful-equilibrium condition, and connects it to comparisons of voter power.
- Felsenthal and Machover (1997), "Voting games with abstention," as cited by Pongou and Tchantcho: antecedent for the three-action voting framework.

## Related Concepts

- [[concepts/effective-voting-power|Effective Voting Power]]: compares institutional positions by their effect on preference satisfaction.
- [[concepts/swap-robust-voting-rules|Swap-Robust Voting Rules]]: identifies when the relevant power comparison can rank all voters consistently.
- [[concepts/condorcet-jury-theorem|Condorcet's Jury Theorem]]: studies collective accuracy under different assumptions about the objective of voting.
