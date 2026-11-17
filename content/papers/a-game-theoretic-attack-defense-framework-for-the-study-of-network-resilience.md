---
title: "A game-theoretic attack-defense framework for the study of network resilience"
type: paper
authors:
  - Kaiwen Zhao
  - Jianxi Gao
  - Qi Su
year: 2026
doi: "10.1038/s41467-026-75293-1"
tags:
  - network-resilience
  - repeated-games
  - payoff-control
---

## TL;DR

A repeated attack–defense game connects network fragmentation to unilateral control of long-run payoffs. In the studied networks, degree heterogeneity favors attacker control, while homogeneity favors defender control. The attack fraction maximizing control lies near the targeted-attack percolation threshold; this concerns a specified two-action game with complete network recovery between rounds.

## Research Question

When can an attacker or defender enforce a long-run payoff independently of the opponent's strategy, and how does network topology determine the feasibility and range of that control?

## Motivation

Static removal experiments measure connectivity loss but omit strategic responses. The paper embeds that loss in repeated interactions, allowing resilience to depend on costs, failure probabilities, and feedback as well as topology.

## Contributions

- Derives feasibility conditions for unilateral control of linear payoff objectives using [[concepts/zero-determinant-strategies|Zero-Determinant Strategies]].
- Separates the parameter region permitting control from the payoff range enforceable within that region.
- Relates topology-dependent strategic advantages to percolation, comparing synthetic networks and 34 empirical networks.

## Method

Each round starts with a recovered, unweighted simple graph. Both players choose radical action R, targeting or protecting the highest-degree fraction $f$, or conservative action C, selecting the next fraction between ranks $fN$ and $2fN$. C therefore does not mean the lowest-degree nodes overall. Memory-one strategies condition the next action on the preceding joint action, producing four states: RR, RC, CR, CC.

Successful removal yields attacker benefit $b_U=1-N_L/N$, where $N_L$ is the remaining largest connected component; the defender receives its negative. Each player also pays its own action cost, scaled by $\lambda$, based on the fraction of incident edges consumed. Benefits are zero-sum, but cost-inclusive payoffs generally are not. Matching actions allow damage with defense-failure probability $y$; unmatched actions allow damage with probability $1-x$, where $x$ is attack-failure probability.

For one-shot payoff vectors $\mathbf S_A,\mathbf S_D$, the attacker constructs

$$
\mathbf p=\alpha\mathbf S_A+\beta\mathbf S_D+\gamma\mathbf1+(1,1,0,0),
$$

to enforce $\alpha S_A+\beta S_D+\gamma=0$ in long-run averages, subject to valid probabilities. The defender uses the offset $(1,0,1,0)$. Feasibility is determined by separation of action-conditioned payoff ranges (Eqs. 4–5). The paper reports that the two players cannot simultaneously control the same objective at fixed environmental parameters.

Controllable area measures the fraction of $(x,y)\in[0,1]^2$ allowing control. Control capacity measures enforceable payoff width, averaged over feasible parameters. Higher defender payoff is the paper's operational resilience measure; a wider control interval alone does not mean higher resilience.

## Experiments

| Comparison | Reported result |
| --- | --- |
| BA scale-free versus ER networks, $N=10{,}000$, mean degree 4, $f=0.25$, $\lambda=1$ | Attacker control of defender payoff has feasible area 0.38 versus 0; defender self-control has area 0.51 versus 0.74. |
| Same network models, $\lambda=0.5$ | Mean width of defender payoff under attacker control is 0.20 versus 0.01 (Fig. 4b). |
| BA attack-fraction sweep, mean degree 4 | Optimal attacker control occurs near $f=0.17$, matching the targeted-attack percolation threshold (Fig. 5). |
| 34 empirical networks | More heterogeneous networks generally exhibit larger attacker control regions and capacities and lower defender payoff bounds (Fig. 6). |

The empirical examples include road, social, airport, protein, and information networks. On Google+, at $(x,y)=(0,0.5)$, $f=0.1$, and $\lambda=0.1$, simulations over 500 rounds illustrate enforcement of defender payoff $-0.5$ or payoff difference $0.5$. The illustrated opponents use constant action probabilities across previous states. Table 1 also reports three Gnutella networks with no feasible attacker control region for the tabulated objective.

## Limitations

Complete recovery rules out cumulative damage. Binary degree-ranked actions, synchronous updates, simple graphs, and two players restrict applicability to practical adversarial systems. Connectivity-based payoffs do not directly measure service flow, recovery time, or physical system performance. Empirical network experiments apply the model to observed topologies; they do not observe real attacker–defender behavior.

The supplied Markdown has damaged mathematical notation and internal inconsistencies: the road-network heterogeneity differs between Table 1 and the prose, and an inequality following Eq. 7 reverses its sign. These conflicting details are not used here. Supplementary derivations are referenced by the article but were not supplied separately.

## Related Concepts

- [[concepts/zero-determinant-strategies|Zero-Determinant Strategies]]: the mechanism enforcing long-run payoff relations.
- [[concepts/road-network-vulnerability|Road Network Vulnerability]]: connects the road-network example to connectivity and service-loss measures, which need not coincide with payoff resilience.

## Related Papers

- [[papers/conflict-mobility-and-fragmentation-in-the-african-interurban-network|Conflict, mobility and fragmentation in the African interurban network]]: studies road fragmentation and detours under prescribed disruptions, providing a complementary comparison to strategic repeated attacks.

Source: [Nature Communications article](https://doi.org/10.1038/s41467-026-75293-1). The article provides [implementation code](https://github.com/kevinzhao200204/game-based-resilience) and an [archived release](https://doi.org/10.5281/zenodo.20691781).
