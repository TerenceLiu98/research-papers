---
title: "Narratives as Separating Equilibria: On the Origins of the Ukraine War"
type: paper
authors:
  - Giacomo Corneo
year: 2026
doi: "10.1177/00220027261483689"
journal: Journal of Conflict Resolution
tags:
  - international-security
  - game-theory
  - incomplete-information
---

## TL;DR

Corneo models NATO enlargement followed by Russia’s 2014 attack as equilibrium behavior under private information about state motives. The same observed sequence can reveal Russian revisionism, reveal American revisionism, or reveal neither, depending on beliefs and incentives. The paper derives conditions for these interpretations; its preference for a pooling explanation rests on qualitative historical judgments rather than estimated probabilities.

## Research Question

What can an outside observer infer about American and Russian motives from NATO enlargement followed by Russia’s attack on Ukraine?

## Motivation

Competing narratives assign imperial ambitions to different states and rely on incompatible counterfactuals about cooperation. Translating those narratives into equilibrium strategies makes their logical requirements explicit, including what a security-seeking state would have done under alternative policies.

## Contributions

- Represents two competing narratives as different combinations of pooling and separation in a game with two-sided private information.
- Shows that each separating account depends critically on a favorable prior about the other state, rather than a hostile prior about the state it identifies as revisionist.
- Demonstrates that pooling can reproduce the observed sequence without identifying either state’s type, and examines how ambiguity and limited enlargement change the conclusions.

## Method

The United States first chooses cooperation or NATO enlargement. Russia then chooses cooperation or war. If Russia cooperates after enlargement, the United States chooses cooperation or war after enlargement is completed, including hypothetical Ukrainian membership. Wars terminate the game. The model stylizes the 1994 enlargement decision and the 2014 attack, rather than separately modeling the 2022 invasion.

Each state privately knows whether it is greedy or security-seeking. Types differ in their valuation of hegemony relative to defeat costs; security-seekers prefer peace at the initial balance of power but need not do so after power shifts. Cooperation has payoff zero. The American victory probabilities satisfy $q_1<q_2<q_3$, corresponding to no enlargement, enlargement without Ukraine, and enlargement with Ukraine. Let $p$ and $\pi$ denote prior probabilities of American and Russian greed, respectively; let $r_s=m_s/c_s$ and $\rho_t=\mu_t/\gamma_t$ denote benefit-to-cost ratios.

Strategies and beliefs must form a perfect Bayesian equilibrium. Pooling leaves beliefs unchanged at the relevant decision point; separation reveals type.

## Experiments

This is a formal theoretical study, with proofs and qualitative historical interpretation. No dataset or empirical parameter estimation is reported.

| Configuration | Behavior and inference | Main result |
| --- | --- | --- |
| P–S | Both American types enlarge; only greedy Russia attacks | Supports the Russian-revisionism narrative under Proposition 1’s restrictions |
| S–P | Only greedy America enlarges; both Russian types attack | Supports the American-revisionism narrative under Proposition 2’s restriction |
| P–P | Both types on both sides take the observed actions | Neither action identifies motives |
| S–S | Types separate at both decisions | Cannot be sustained in this model |

Proposition 1 requires jointly:

$$
r_s\leq\frac{1-q_3}{q_3},\qquad
p\leq\frac{q_2-(1-q_2)\rho_s}{q_3-(1-q_3)\rho_s},
$$

and, if $\rho_g<q_2/(1-q_2)$,

$$
p\geq\frac{q_2-(1-q_2)\rho_g}{q_3-(1-q_3)\rho_g}.
$$

Thus the Russian-revisionism interpretation requires a sufficiently dovish American security-seeker and sufficiently low perceived American greed; its existence does not depend on $\pi$.

Proposition 2 requires

$$
\pi\leq\frac{1-q_2(1+r_s)}{1-q_1(1+r_s)}.
$$

The American-revisionism interpretation therefore needs a sufficiently favorable prior about Russia, independently of $p$. Both separating equilibria can coexist and survive sequential-equilibrium refinement. Proposition 4 establishes pooling when the prior restrictions in conditions (4) and (6) are violated. Such pooling permits conflict even between security-seekers, illustrating the [[concepts/security-dilemma|Security Dilemma]].

The extensions, summarized in the supplied article with detailed analysis assigned to an online appendix, report that varying the stakes of war tightens both separating-equilibrium conditions. Sufficient ambiguity about Russia under maxmin expected utility makes both American types enlarge for insurance, eliminating S–P. Allowing a commitment to limited enlargement instead makes American separation easier and Russian separation harder; sufficiently large American identity costs can make that option irrelevant.

## Limitations

The unitary-state model omits independent Ukrainian and other European decision-making, domestic political mechanisms, and third-party reputation effects. Decisive wars, normalized cooperation payoffs, and monotonically increasing American victory probabilities are modeling assumptions. Equilibrium existence establishes logical consistency within this structure, not historical identification or moral justification.

Priors and payoff parameters are not estimated. Corneo’s judgment that pooling is historically more plausible relies on his reading of events and uncertainty about motives. Multiple equilibria prevent observed actions alone from selecting a unique narrative. The detailed online appendix for the extensions is not part of the supplied Markdown.

## Related Concepts

- [[concepts/security-dilemma|Security Dilemma]] — security-seeking states can take mutually threatening actions when they distrust one another’s motives.

## Related Papers

- Kydd (2001), *Trust Building, Trust Breaking: The Dilemma of NATO Enlargement* — models reassurance and provocation through conditional guarantees; Corneo instead examines retrospective inference and allows Russian expansionist preferences.
- Smith (2024), *Commitment Problems and Russia’s Invasion of Ukraine* — examines commitment problems under full information around the 2022 invasion.
- Idrisoglu and Spaniel (2024), *Information Problems and Russia’s Invasion of Ukraine* — studies asymmetric information and bargaining breakdown before the 2022 invasion.
- [[papers/offense-defense-balance-war-duration-and-the-security-dilemma|Offense–Defense Balance, War Duration, and the Security Dilemma]] — a complementary library paper on how assumptions about war shape security competition; it studies duration rather than inference about state types.
