---
title: "Antagonistic Cooperation: Factional Competition in the Shadow of Elections"
type: paper
authors:
  - Giovanna M. Invernizzi
year: 2022
tags:
  - party-organization
  - electoral-competition
  - formal-theory
---

## TL;DR

A formal electoral model explains why factions cooperate more when electoral defeat is costly. Greater power sharing with losing parties encourages internal sabotage, whereas polarization increases campaigning. Optimal internal rewards depend on whether the ranking system rewards campaigning or sabotage: winner-takes-all rewards are optimal in the former case, equal sharing in the latter.

## Research Question

How do electoral stakes and internal reward rules determine factions' allocation of resources between campaigning for their party and undermining rival factions?

## Motivation

Parties depend on factions for electoral effort but distribute offices using imperfect measures of factional strength. Membership-based rankings can reward internal manipulation rather than contributions to electoral success. The paper connects institutional power sharing to these internal incentives through [[concepts/factional-competition|Factional Competition]].

## Contributions

- Embeds an internal contest for electoral spoils in a probabilistic election model.
- Shows how institutional power sharing and ideological polarization alter the relative incentives for campaigning and sabotage.
- Distinguishes extremism across parties from ideological differences within a party.
- Derives optimal monetary or office rewards and extends the analysis to policy concessions.

## Method

Two parties each contain two factions and an office-motivated leader. Leaders first commit to rewards contingent on the election outcome and a noisy internal ranking. Factions then allocate a unit resource budget between campaigning and sabotage, each with quadratic costs. A representative voter evaluates policy distance and campaign-generated valence, with a uniform electoral shock. The solution concept is subgame-perfect equilibrium.

The winning party receives a share $\alpha$ of electoral spoils and the loser $1-\alpha$, where $\alpha\in[1/2,1]$. Larger $\alpha$ means higher electoral stakes. The ranking probability depends on relative campaigning plus relative sabotage weighted by $\gamma$. With sabotage equal to one minus campaigning, increasing campaigning improves internal rank when $\gamma<1$ and worsens it when $\gamma>1$.

Leaders choose nonnegative premia for the higher-ranked faction, with remaining spoils divided equally. They maximize electoral victory probability. Baseline platforms are fixed and factions within each party share preferences; extensions introduce asymmetric platforms, factional ideological heterogeneity, and policy rewards.

## Experiments

The evidence is analytical, with historical illustrations rather than a causal empirical test or experimental benchmark.

| Result | Scope and finding |
| --- | --- |
| Proposition 1 | With symmetric platforms, optimal premia exhaust the party's spoils when campaigning determines rank more effectively; when sabotage is more effective, premia are zero. |
| Corollary 1 | Campaigning rises with electoral campaign importance, the winner's share of spoils, and ideological polarization. |
| Proposition 2 | Polarization increases campaigning under asymmetric platforms too. The moderate party's factions campaign more when $\gamma<1$; with $\gamma>1$, both parties' factions campaign equally. |
| Proposition 3 | Within an ideologically divided party, the extreme faction campaigns more because electoral defeat carries a greater policy cost. |
| Proposition 4 | With heterogeneous factions and $\gamma>1$, full policy concessions to the higher-ranked faction can be optimal despite zero office premia. For $\gamma<1$, full policy concessions are optimal at sufficiently small factional ideological distances, but equal policy weights are optimal at sufficiently large distances. |

Italy and Japan illustrate the suggested relationship between reduced inter-party power sharing and lower factional competition. The Italian Christian Democrats' 1973 portfolio allocation illustrates membership-based rewards. The discussion of Britain's Labour Party in 2017 illustrates differing factional campaign incentives; these cases do not independently identify the model's mechanisms.

The source lists verification materials at https://doi.org/10.7910/DVN/SQTQBA. This is a replication archive identifier, not the article DOI.

## Limitations

- The baseline fixes platforms, assumes two factions per party, and makes every resource not spent campaigning become sabotage. Convex costs and the binding budget themselves favor some positive sabotage.
- Leaders know the ranking technology and can commit to anonymous, nonnegative reward schemes. These constraints matter for the optimal incentive results.
- Policy-concession results assume the voter evaluates average factional platforms without anticipating subsequent policy bargaining.
- The supplied text references supplementary proofs and extensions, including endogenous platforms, repeated-game commitment, and relaxed resource constraints; the appendices themselves are not included.
- Historical examples are illustrative. The model does not establish a general empirical causal effect of proportional representation on sabotage.
- The year records the 2022 online-publication context indicated by the source's correction notice; issue-year metadata and an article DOI are not supplied.

## Related Concepts

- [[concepts/factional-competition|Factional Competition]]
- [[concepts/party-preference-cohesion|Party Preference Cohesion]]: ideological agreement is distinct from incentives to cooperate over resources.

## Related Papers

- Persico, Pueblita, and Silverman (2011), “Factions and Political Competition”: cited foundation for modeling organizational rules and factional effort.
- Dewan and Squintani (2016), “In Defense of Factions”: cited account of factions' informational and deliberative benefits.
- [[papers/intra-party-heterogeneity-and-voter-perceptions-of-party-positions|Intra-party heterogeneity and voter perceptions of party positions]]: a complementary library study of how internal disagreement affects voter perceptions, rather than factional effort incentives.

[[index|Library home]]
