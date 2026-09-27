---
title: "Round-robin political tournaments: Abstention, truthful equilibria, and effective power"
type: paper
authors:
  - Roland Pongou
  - Bertrand Tchantcho
year: 2021
source_job_id: "da1c0f32-1243-4963-a538-fd29a3a9e52e"
tags:
  - social-choice
  - voting-games
  - abstention
  - truthful-equilibria
  - voting-power
---

## TL;DR

In a [[concepts/round-robin-political-tournaments|round-robin political tournament]], voters choose between every pair of candidates or abstain, and evaluate the resulting social relation through additive pairwise disagreement. Truthful voting is a Nash equilibrium for every admissible voting rule and preference profile exactly when an indifferent voter assigns the same loss to a strict social ranking and to social incomparability ($\alpha=\lambda$). Under that condition, the influence relation captures [[concepts/effective-voting-power|effective voting power]] across all societies exactly when incomparability is less disappointing than an outright preference reversal ($\beta<1$). The Shapley-Shubik and Banzhaf rankings also coincide with effective power when the rule is [[concepts/swap-robust-voting-rules|swap-robust]]. These are mathematical results, not empirical estimates of political influence.

## Research Question

When is truthful pairwise voting an equilibrium in an election that permits abstention, and when do conventional measures of voting power rank voters by their ability to obtain social outcomes closer to their preferences?

## Motivation

A voter's formal capacity to change a decision need not coincide with the capacity to obtain a preferred outcome. Abstention further separates individual indifference from an unresolved collective comparison. The paper connects institutional rules with preferences over social rankings, asking which behavioral and structural conditions reconcile these different notions of power.

## Contributions

- Models all pairwise contests among a finite candidate set as a strategic form game with support, opposition, and abstention available in each contest.
- Characterizes the universal truthful-equilibrium guarantee by $\alpha=\lambda$, both with and without requiring disagreement to be a metric (Theorems 1-2).
- Extends that Nash-equilibrium result to sequential presentation of candidate pairs, with simultaneous voting within each pair (Theorem 3).
- Characterizes when a preference-swap comparison of effective power agrees with the influence relation, then connects complete voter rankings and classical power indices to swap-robustness (Theorems 4-6).
- Uses constructed examples to show why agreement among power measures can fail at $\beta=1$, even for a swap-robust rule.

## Method

### Voting and Social Outcomes

Each voter has a complete, reflexive, transitive preference relation over $m$ candidates, allowing individual indifference. A strategy specifies a vote in $\{-1,0,1\}$ for each of the $m(m-1)/2$ pairs. The fixed voting rule maps a tripartition of supporters, abstainers, and opponents to acceptance or rejection. It is monotone in approval, accepts unanimous support, and never accepts both a tripartition and its reversal (Section 2).

Applying the rule in both directions determines whether $a$ defeats $b$, $b$ defeats $a$, or neither defeats the other. The last outcome is **social incomparability**, not individual indifference. The social relation $D(z)$ need not be complete or transitive; the model does not require selection of a single overall winner.

### Pairwise Dissatisfaction

The locally generated disagreement function extends the distance framework discussed by Diffo Lambo, Tchantcho, and Moulen (2012). Its relevant local losses are:

| Individual preference | Social outcome | Loss |
| --- | --- | --- |
| $a\succ b$ | $a\succ b$ | $0$ |
| $a\succ b$ | $b\succ a$ | $1$ |
| $a\succ b$ | $a*b$ (incomparable) | $\beta$ |
| $a\sim b$ | Either strict ordering | $\alpha$ |
| $a\sim b$ | $a*b$ (incomparable) | $\lambda$ |

With $\alpha,\beta,\lambda\in(0,1]$, total utility is

$$
U_i(z)=\sum_{\{a,b\}\in\mathcal P_2(A)}
\left[1-d^{\{a,b\}}_{\alpha,\beta,\lambda}(R^i,D(z))\right].
$$

Separability across pairs lets the equilibrium proof compare unilateral deviations one contest at a time. Truthful voting means supporting the strictly preferred candidate and abstaining under indifference. For at least three voters and two candidates, the truthful profile is a Nash equilibrium **for every admissible rule and every preference profile if and only if** $\alpha=\lambda$. Theorem 2 removes the metric requirement. This universal quantifier matters: failure of the condition does not imply that every particular game lacks a truthful equilibrium.

### Effective Power and Structural Conditions

Let $R_{ij}$ swap the preferences of voters $i$ and $j$, leaving everyone else's preferences fixed. Voter $i$ is at least as effective as $j$ when

$$
d_{\alpha,\beta,\lambda}(R^j,D(R_{ij}))
\leq d_{\alpha,\beta,\lambda}(R^j,D(R))
\quad\text{for every preference profile }R.
$$

The comparison holds the evaluated preferences fixed while changing which institutional position carries them. It therefore avoids equating power with accidental agreement with a powerful voter.

The influence relation instead compares voters' ability to turn losing tripartitions into winning ones by increasing approval. Under $\alpha=\lambda$, it agrees with effective power across all societies if and only if $\beta<1$ (Theorem 4). Swap-robustness requires that exchanging two voters' positions in two winning tripartitions, where they occupy opposite positions, leaves at least one of the exchanged tripartitions winning. It supplies the structural condition for a complete, transitive influence ranking.

Under $\alpha=\lambda$ and $\beta<1$, effective power is complete and transitive exactly when the rule is swap-robust; in that case it also agrees ordinally with the abstention versions of the Shapley-Shubik and Banzhaf indices (Theorems 5-6, with the assumption qualification below). The result concerns rankings of voters, not equality of numerical index values. With $\beta<1$ and a rule that is not swap-robust, the effective-power relation cannot coincide with either index's complete ranking. At $\beta=1$, coincidence can fail but is not ruled out in every society.

## Experiments

The evidence consists of proofs and analytical examples. There is no dataset, fitted behavioral model, or experimental treatment.

- **Profitable misreporting (Section 4 and Appendix A):** Under simple majority with three voters, two voters strictly prefer opposite candidates and the third is indifferent. Truthful votes $(1,-1,0)$ leave the pair incomparable. If $\lambda>\alpha$, the indifferent voter gains $\lambda-\alpha$ by supporting either candidate. A separate example handles $\alpha>\lambda$ by letting an indifferent voter create incomparability from a decisive outcome.
- **Nonuniqueness:** When $\alpha=\lambda$, the three-voter example admits the truthful profile and another equilibrium, $(1,0,-1)$. The authors also explicitly note that truth-telling need not be socially optimal.
- **Failure of power equivalence (Section 5.4):** A five-voter swap-robust rule ranks voters $1>2>5>4>3$ under the influence, Shapley-Shubik, and Banzhaf relations. At $\beta=1$, the effective-power relation nevertheless has $4\geq_P5$, so these rankings do not coincide.
- **Institutional illustrations (Section 5.2):** The paper discusses the UN Security Council, the US Senate, and anonymous rules. Under an anonymous rule all voters have equal effective power in the preference-swap sense, even when their actual preferences differ. These illustrations are applications of formal rules rather than empirical validation of influence.

## Limitations

The conclusions depend on additive utility over all candidate pairs, the specified monotone voting rules, and the distinction between individual indifference and social incomparability. They do not establish truthful voting for arbitrary ranked-election procedures or utilities determined only by an ultimate winner. Abstention is an available strategic action; truthful abstention represents indifference, not an estimated turnout mechanism.

The equilibrium result does not guarantee uniqueness or social optimality. The sequential extension retains the paper's Nash formulation with simultaneous votes on each presented pair; it does not establish a general result about history-dependent extensive-form strategies or subgame-perfect equilibrium. The tie-break discussion interprets the utility conditions rather than testing actual voter psychology.

There is an assumption gap in the supplied text: Theorem 5 states only $\beta<1$, but its proof invokes Theorem 4, which also requires $\alpha=\lambda$. The completeness characterization above is therefore stated under both conditions. Proposition 1 likewise states an inclusion for unrestricted parameters while referring to a proof using $\alpha=\lambda$; its unrestricted version is not used here. Some institutional formulas and proof expressions are visibly corrupted in the supplied Markdown, so those details are not reconstructed as additional results.

## Related Concepts

- [[concepts/round-robin-political-tournaments|Round-Robin Political Tournaments]]
- [[concepts/effective-voting-power|Effective Voting Power]]
- [[concepts/swap-robust-voting-rules|Swap-Robust Voting Rules]]
- [[concepts/condorcet-jury-theorem|Condorcet's Jury Theorem]]: a contrasting account of majority voting centered on accuracy about a common superior alternative, rather than incentives and heterogeneous preferences over social rankings.

## Related Papers

- Diffo Lambo, Tchantcho, and Moulen (2012), "Comparing influence theories in voting games under locally generated measures of dissatisfaction": cited antecedent for the loss framework and power comparisons in yes-no games.
- Felsenthal and Machover (1997), "Voting games with abstention": cited antecedent for ternary voting and extensions of power indices.
- Parker (2012), "The influence relation for ternary voting games": cited for agreement among power rankings under linear voting rules.
- [[papers/polarization-abstention-and-the-median-voter-theorem|Polarization, abstention, and the median voter theorem]]: a related Wiki paper in which abstention affects candidates' spatial positioning; the strategic actors and outcome objectives differ from this paper's voter-level tournament game.

[[index|Library home]]
