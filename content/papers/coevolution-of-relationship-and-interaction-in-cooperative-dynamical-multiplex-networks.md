---
title: Coevolution of Relationship and Interaction in Cooperative Dynamical Multiplex Networks
type: paper
authors:
  - Xiaojin Xiong
  - Ziyan Zeng
  - Minyu Feng
  - Attila Szolnoki
year: 2024
tags:
  - evolutionary-game-theory
  - cooperation
  - multiplex-networks
  - coevolution
---

## TL;DR

A two-layer evolutionary game couples changing relationship strengths to strategic interactions. In the reported simulations, giving accumulated relationship strength greater weight in fitness reduces cooperation, despite mutual cooperation strengthening individual ties. Higher-degree lattices generally sustain more cooperation, and small-world networks retain substantial cooperation under difficult conditions. These are model-based findings; ambiguities in the supplied update rules limit exact reproduction.

## Research Question

How do relationship weights, interaction opportunities, and strategy imitation jointly evolve, and does rewarding accumulated relationship strength help cooperation survive a weak prisoner's dilemma?

## Motivation

Established relationships influence whom people interact with, while interaction outcomes change those relationships. A single static graph obscures this feedback and the distinction between an enduring connection and an actual encounter. The paper studies [[concepts/coevolutionary-network-games|Coevolutionary Network Games]] using separate relationship and interaction layers, with relationship history also contributing to fitness.

## Contributions

- Separates persistent, weighted relationships from temporary game interactions between the same agents.
- Couples mutual cooperation and defection to edge-weight changes, then uses those weights in fitness and imitation-partner selection.
- Compares cooperation across regular lattices and small-world graphs while varying temptation, relationship-dependent fitness, and local interaction propensity.
- Relates the distribution of accumulated relationship strength to cooperation prevalence, with different patterns in regular and small-world networks.

## Method

Agents choose cooperation $C$ or defection $D$ in a weak prisoner's dilemma: $R=1$, $T=b$, and $S=P=0$, with $1\leq b\leq2$. The relationship graph has initially uniform edge weights $W_{ij}\in[0,1]$. Relationship neighbors interact with probability $p$; interactions outside that neighborhood occur with probability $1-p$. The precise encounter-sampling procedure is not fully specified in the supplied text.

Following an interaction, an existing relationship weight increases by $\varepsilon$ for mutual cooperation, decreases by $\varepsilon$ for mutual defection, and remains unchanged for mixed strategies. Weights are clipped to $[0,1]$. Encounters between agents without an existing relationship do not create a relationship edge.

For relationship neighbors $\mathcal N_R(i)$, Equations (3)-(5) define

$$
A_i=\sum_{j\in\mathcal N_R(i)}W_{ij},\qquad
f_i=\Pi_i+mA_i,\qquad
s(i\to j)=\frac{W_{ij}}{A_i}.
$$

Here $\Pi_i$ is game payoff, $m\in[0,1]$ controls the relationship contribution to fitness, and $s(i\to j)$ selects a potential role model. Imitation is restricted to relationship neighbors, even when games occur outside that neighborhood. The relationship index $A_i$ depends on both partners' past behavior, so the authors explicitly distinguish it from individual reputation.

The paper then applies a Fermi-style imitation rule with noise $K=0.1$. Its prose says agents favor more successful neighbors, but the displayed Equation (6) has the opposite fitness-difference sign; the summary does not silently resolve that conflict.

The authors interpret the negative effect of $m$ as weakened feedback from current behavior: a defector can retain relationship weight accumulated in earlier encounters even when a present defector-defector interaction yields zero payoff. This is their mechanism explanation, rather than a separately isolated causal test.

## Experiments

Each network contains 2,500 agents, initially assigned $C$ or $D$ with equal probability. The main comparisons use honeycomb ($k=3$), square ($k=4$), and the paper's hexagonal lattice ($k=6$), plus a Watts-Strogatz graph ($k=10$, rewiring probability 0.5). Runs last 6,000 Monte Carlo steps: 5,500 for relaxation and 500 for measurement, averaged over ten repetitions. Newman-Watts networks supply an additional comparison of relationship-index distributions.

| Comparison | Reported result | Source |
| --- | --- | --- |
| Vary $b$ and $m$ at $p=0.9$ | Cooperation declines as either parameter increases. Higher-degree lattices generally retain more cooperation; Watts-Strogatz has a much smaller all-defection region. | Section III.A, Figure 2 |
| Vary $b$ at $m=0.5$, $p=0.9$ | The square lattice shows a steep decline around $b=1.3$-$1.6$; Watts-Strogatz cooperation remains above 0.75 over the reported sweep. | Figure 3(a) |
| Vary $p$ at $b=1.5$, $m=0.5$ | Square and hexagonal lattices benefit strongly from more local interaction. Honeycomb remains near zero cooperation; Watts-Strogatz is less sensitive. | Figure 3(b) |
| Square-lattice configurations at $b=1.5$, $m=0.5$ | Reported cooperator fractions are 0.053, 0.272, and 0.684 at $p=0.5$, 0.75, and 1, respectively. More local interaction permits cooperative clusters. | Figure 4(a)-(c) and accompanying text |
| Square-lattice configurations at $p=0.9$, $m=0.5$ | Cooperator fractions are 0.771, 0.619, and 0.177 at $b=1.3$, 1.5, and 1.7, respectively. | Figure 4(d)-(f) and accompanying text |

The mean relationship index decreases as $m$ increases in the reported comparisons (Figure 5). At $b=1.5$ and $p=0.9$, regular-lattice distributions shift toward larger relationship indices when cooperation dominates and toward smaller values when defection dominates. Watts-Strogatz and Newman-Watts distributions remain approximately bell-shaped, though Table I reports positive final skewness, so this is not exact normality. For example, square-lattice skewness changes from -0.499 at $m=0$ to 0.463 at $m=1$; Watts-Strogatz skewness changes from 0.408 to 0.716 (Table I).

## Limitations

- **Stylized evidence:** the study uses simulated two-strategy games without empirical calibration. The reported trends apply to the explored graphs and parameter ranges, not to social relationships in general.
- **Restricted adaptation:** only relationship weights change; the model does not form or remove relationship edges. Linear additive fitness and a common interaction probability are assumptions the authors propose relaxing.
- **Topology comparison:** degree and graph type change together, including $k=10$ for Watts-Strogatz versus $k=3,4,6$ for the lattices. These comparisons do not isolate randomness from degree. Because $A_i$ is an unnormalized sum, its scale also changes with degree.
- **Imitation-sign conflict:** Equation (6) prints $[1+\exp((f_j-f_i)/K)]^{-1}$ for adoption of $j$ by $i$, which decreases when $j$ has higher fitness. The prose describes the reverse preference. The supplied Markdown cannot establish which rule the simulations used.
- **Incomplete specification:** the supplied text gives no numerical $\varepsilon$, no fallback for role-model selection when $A_i=0$, and no sufficiently explicit encounter-sampling algorithm to reconcile per-pair probability wording with the interpretation of $p$ as mostly local play. Newman-Watts construction details are also absent.
- **Source inconsistencies:** Section III.A once says cooperation declines as $b$ decreases, against its repeated increasing-$b$ result. Section III.C attributes both prominent peaks and their absence to HL. Those isolated statements are not treated as separate findings.

The year comes from the manuscript date, 16 February 2024. The supplied Markdown contains no explicit DOI, arXiv identifier, or publication venue for this paper; none is inferred from its references.

## Related Concepts

- [[concepts/coevolutionary-network-games|Coevolutionary Network Games]]: strategies and relationship weights alter each other's evolutionary environment.
- [[concepts/network-games|Network Games]]: interaction structure conditions strategic outcomes; this study uses evolutionary imitation rather than a static equilibrium calculation.
- [[concepts/success-driven-migration|Success-Driven Migration]]: a contrasting way for strategic success to alter the interaction environment through relocation.

## Related Papers

- Perc and Szolnoki (2010), "Coevolutionary games - a mini review": cited overview of joint strategy and environment evolution (reference 13).
- Li, Sun, and Xia (2019), "Reputation-based adaptive adjustment of link weight among individuals promotes the cooperation in spatial social dilemmas": cited alternative linking reputation to adaptive weights (reference 20).
- Gomez-Gardenes et al. (2012), "Evolution of cooperation in multiplex networks": cited multiplex-game foundation, listed twice in the source bibliography (references 34 and 38).
- [[papers/involution-game-with-migration-and-spatial-heterogeneity-of-social-resources|Involution Game with Migration and Spatial Heterogeneity of Social Resources]]: library comparison, not a citation in this paper; couples strategy imitation to relocation rather than relationship-weight adaptation.
- [[papers/a-model-of-long-term-conflict-resolution-and-cooperation|A Model of Long-Term Conflict Resolution and Cooperation]]: library comparison, not a citation in this paper; examines cooperation through imitation and contact opportunities in an intergroup intervention model.

[[index|Library home]]
