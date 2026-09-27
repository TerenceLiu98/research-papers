---
title: Effective Voting Power
type: concept
aliases:
  - Effective Power Relation
tags:
  - voting-power
  - social-choice
  - preference-aggregation
---

## Overview

Effective voting power compares voters by their institutional capacity to obtain a social relation close to their preferences. In the preference-swap formulation used by Pongou and Tchantcho, a voter is at least as effective as another if assigning the other's preferences to that voter's position never increases the disagreement between those preferences and the collective outcome, across all preference profiles.

## Key Ideas

Let $R_{ij}$ exchange the preferences of $i$ and $j$ in profile $R$, let $D(R)$ be the social relation under truthful voting, and let $d$ measure disagreement. Then

$$
i\geq_{P,d}j
\quad\Longleftrightarrow\quad
d(R^j,D(R_{ij}))\leq d(R^j,D(R))
\quad\text{for every }R.
$$

- **The comparison adjusts for preferences.** It follows the same preferences from one institutional position to another. Agreement with a powerful voter at a single observed profile does not establish greater effective power. Under an anonymous rule, all voters have equal effective power even if their realized satisfaction differs.
- **The loss function matters.** In the additive pairwise model, reversal of a strict preference has loss one, incomparability under a strict preference has loss $\beta$, and strict ordering versus incomparability under individual indifference has losses $\alpha$ and $\lambda$.
- **Influence equivalence is conditional.** Under $\alpha=\lambda$, effective power and the influence relation agree across all societies in the studied class if and only if $\beta<1$. The influence relation compares the ability to turn losing vote configurations into winning ones by increasing approval.
- **Numerical indices impose complete rankings.** With $\alpha=\lambda$, $\beta<1$, and a swap-robust rule, the Shapley-Shubik and Banzhaf rankings coincide with effective power. This is ordinal agreement, not equality of index values or a measurement of observed political success.
- **Boundary cases retain information.** At $\beta=1$, incomparability and strict reversal are equally costly to a voter with a strict preference. Effective-power and classical rankings can then disagree, although agreement remains possible in particular societies. When $\beta<1$ and the rule is not swap-robust, under $\alpha=\lambda$ the incomplete effective-power relation cannot equal the indices' complete rankings.

## Important Papers

- [[papers/round-robin-political-tournaments-abstention-truthful-equilibria-and-effective-power|Round-robin political tournaments: Abstention, truthful equilibria, and effective power]] (Pongou and Tchantcho, 2021): characterizes agreement between effective power, influence, and classical power indices in voting with abstention.
- Diffo Lambo and Moulen (2000), "Quel pouvoir mesure-t-on dans un jeu de vote?", as cited in the ingested paper: antecedent for the effective-power relation.
- Diffo Lambo, Tchantcho, and Moulen (2012), "Comparing influence theories in voting games under locally generated measures of dissatisfaction," as cited in the ingested paper: studies related comparisons for yes-no games.

## Related Concepts

- [[concepts/round-robin-political-tournaments|Round-Robin Political Tournaments]]
- [[concepts/swap-robust-voting-rules|Swap-Robust Voting Rules]]
