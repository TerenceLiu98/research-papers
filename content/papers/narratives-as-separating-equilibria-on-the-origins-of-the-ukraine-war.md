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

Corneo models NATO enlargement followed by Russia’s 2014 attack as equilibrium behavior under private information about state motives. Rival narratives identifying either Russia or the United States as expansionist correspond to different separating equilibria, each requiring restrictive beliefs and preferences. A pooling equilibrium can generate the same observed sequence without revealing either state’s type. These are conditional theoretical results, not empirical identification of historical motives.

## Research Question

What can an observer infer about American and Russian motives from NATO enlargement and Russia’s subsequent attack, if both actions must be optimal within a game of incomplete information?

## Motivation

Narratives attributing war to one side’s imperial ambitions imply counterfactual claims about how the other side would have behaved under cooperation. The paper turns these claims into equilibrium restrictions, connecting inference about motives to the [[concepts/security-dilemma|Security Dilemma]]. Its focal sequence is the 1994 enlargement decision and the 2014 attack, rather than a separate model of the 2022 invasion.

## Contributions

- Represents competing narratives as distinct combinations of pooling and separation by privately informed states.
- Derives conditions for those equilibria, establishes possible multiplicity, and rules out separation by both players along the focal sequence.
- Shows how pooling can reproduce observed actions without identifying motives, and examines extensions involving payoffs, ambiguous priors, and limited enlargement.

## Method

The United States first chooses cooperation or NATO enlargement. Russia then cooperates or attacks. Following enlargement and Russian cooperation, the United States chooses cooperation or war after enlargement has included Ukraine. Each state is either revisionist (the paper’s “greedy” type) or security-seeking. Cooperation yields zero; war yields type-dependent benefits from victory and costs from defeat. American victory probabilities satisfy $q_1<q_2<q_3$ across no enlargement, enlargement without Ukraine, and enlargement including Ukraine. Wars terminate the game.

Perfect Bayesian equilibrium requires sequentially rational strategies and Bayesian updating wherever possible. Let $p$ and $\pi$ denote prior probabilities of American and Russian revisionism; $r_s$ is the American security-seeker’s victory-benefit/defeat-cost ratio, and $\rho_t$ is the corresponding Russian ratio.

## Experiments

This is an analytical study, with proofs and qualitative historical discussion rather than experiments or estimated datasets.

| Equilibrium | Observed behavior | Inference within the model |
| --- | --- | --- |
| P–S | Both American types enlarge NATO; only revisionist Russia attacks | Attack reveals Russia’s type |
| S–P | Only revisionist America enlarges NATO; both Russian types attack | Enlargement reveals America’s type |
| P–P | Both types on each side take the observed actions | Neither action identifies type |
| S–S | Both sides separate | Cannot be sustained |

Proposition 1 requires $r_s\leq(1-q_3)/q_3$ and

$$
p\leq\frac{q_2-(1-q_2)\rho_s}{q_3-(1-q_3)\rho_s}
$$

for P–S. When $\rho_g<q_2/(1-q_2)$, Proposition 1 additionally requires

$$
p\geq\frac{q_2-(1-q_2)\rho_g}{q_3-(1-q_3)\rho_g}.
$$

This lower bound ensures that even a revisionist Russian type that dislikes immediate war prefers attacking to risking a later war against a stronger United States. Thus the Russia-blaming narrative requires a sufficiently dovish American security-seeker and a sufficiently low prior of American revisionism; the prior of Russian revisionism does not determine its existence.

Proposition 2 gives the S–P condition:

$$
\pi\leq\frac{1-q_2(1+r_s)}{1-q_1(1+r_s)}.
$$

Here a sufficiently low prior of Russian revisionism makes initial American cooperation attractive to its security-seeking type. The prior of American revisionism does not determine existence. Both separating equilibria can coexist and survive sequential-equilibrium refinement. Proposition 4 establishes pooling when the relevant prior bounds for separation are violated.

The extensions reported in the main text qualify these results: varying war payoffs tightens both separating-equilibrium conditions; sufficient ambiguity about Russia can make both American types enlarge NATO under maxmin expected utility; and a credible limited-enlargement option makes American separation easier while tightening Russian separation. Sufficient American identity costs can make that limited option irrelevant. Detailed extension derivations are assigned to an online appendix not included in the supplied Markdown.

## Limitations

The model treats states as unitary actors and abstracts from Ukraine’s independent strategic choices, domestic politics, and prolonged or indecisive wars. Increasing American military advantage with enlargement is an assumption. Historical discussion assesses the plausibility of priors without estimating them, so the author’s preference for a pooling interpretation remains an interpretation. Pooling permits security-seeking actors but does not establish that either historical actor was security-seeking. The paper leaves reputational effects toward third countries for future research.

## Related Concepts

- [[concepts/security-dilemma|Security Dilemma]] — uncertainty allows security-seeking and revisionist states to choose the same threatening actions.

## Related Papers

- Kydd (2001), *Trust Building, Trust Breaking: The Dilemma of NATO Enlargement* — the paper’s closest comparison; examines enlargement and conditional guarantees, whereas Corneo evaluates observed behavior retrospectively and allows Russian expansionism.
- [[papers/offense-defense-balance-war-duration-and-the-security-dilemma|Offense–Defense Balance, War Duration, and the Security Dilemma]] — complementary analysis of how assumptions about warfare affect security competition; studies duration rather than identification of private motives.
- Idrisoglu and Spaniel (2024), *Information Problems and Russia’s Invasion of Ukraine* — cited for asymmetric information and bargaining breakdown before the 2022 invasion.
