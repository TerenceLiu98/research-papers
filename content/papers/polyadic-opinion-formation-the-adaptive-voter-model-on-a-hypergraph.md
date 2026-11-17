---
title: "Polyadic Opinion Formation: The Adaptive Voter Model on a Hypergraph"
type: paper
authors:
  - Anastasia Golovin
  - Jan Mölter
  - Christian Kuehn
year: 2024
tags:
  - opinion-dynamics
  - higher-order-networks
  - adaptive-networks
  - moment-closure
---

## TL;DR

Extending the [[concepts/voter-model|Voter Model]] to adaptive [[concepts/hypergraphs|Hypergraphs]] shows that group influence need not accelerate agreement: majority voting amplifies initial imbalance and rapidly reaches absorbing states, whereas proportional voting supports prolonged metastability. Group-size distributions stabilize quickly in the simulations, while opinion dynamics proceeds on a slower timescale. A pair-level moment closure captures these patterns but overestimates fragmentation thresholds, especially with homophilic rewiring.

## Research Question

How do group-level propagation and adaptive group membership jointly determine consensus, metastability, and fragmentation in binary opinion dynamics?

## Motivation

Pairwise adaptive voter models omit collective peer pressure. Earlier higher-order extensions reported faster convergence, motivating a comparison of majority and proportional group updates to determine whether that behavior depends on the propagation rule.

## Contributions

- Defines four hypergraph models combining two rewiring rules with two propagation rules.
- Derives motif-based evolution equations and a pair-level closure accounting for intersecting hyperedges; the graph case is recovered at maximum group size two.
- Separates fast stabilization of group-size counts from subsequent opinion evolution.
- Diagnoses closure errors near fragmentation through comparisons of observed and predicted overlapping motifs.

## Method

Each vertex holds opinion A or B. Mixed-opinion hyperedges initiate events at a constant Poisson rate. With probability $p$, a uniformly chosen member leaves and joins an admissible vertex or hyperedge smaller than the maximum size $K$. Rewire-to-same permits only targets entirely sharing its opinion; rewire-to-random imposes no opinion restriction. Size-two source edges disappear, and joining an individual creates a size-two edge. Hyperedge counts are therefore not conserved.

With probability $1-p$, all members of the selected hyperedge adopt one opinion. Majority voting selects the local majority, breaking ties randomly. Proportional voting selects A with probability $a/(a+b)$ for a group containing $a$ A-members and $b$ B-members. These rules coincide for size-two edges.

The equations track expected counts of opinion-composition motifs. Propagation also changes overlapping groups, creating a hierarchy of moments. The closure approximates intersecting-hyperedge counts using lower-order counts, combinatorial overlap factors, and a uniform-mixing assumption (Section 2.2.6). Under proportional voting, expected magnetization is conserved; individual finite-system trajectories still fluctuate. Majority voting instead amplifies an initial imbalance in the investigated regimes.

## Experiments

The principal simulations use $N=10{,}000$, maximum group size $K=4$, and initial counts $(M_2,M_3,M_4)=(12{,}000,5{,}000,250)$, giving mean incidence degree four. Results are compared with numerical integration of the closed equations, generally across 12 realizations.

- **Topology and motifs (Figures 6–7):** At $p=0.5$ and initial magnetization 0.5, group-size counts rapidly stabilize with little variation across runs. Opinion-composition counts vary more strongly, especially under proportional voting. Some motif predictions deviate quantitatively.
- **Metastability (Figure 8):** Initial magnetizations range from −0.6 to 0.6. Majority voting uses $p=0.1$ and proportional voting $p=0.7$, so this is not a matched-parameter timing comparison. Proportional trajectories slowly diffuse along a parabola-shaped manifold; majority trajectories rapidly approach absorbing endpoints.
- **Fragmentation (Figure 9):** Mean final absolute magnetization is measured over 12 runs per rewiring probability. The simulations suggest a discontinuous transition for rewire-to-same and a continuous transition for rewire-to-random. For proportional mean-field dynamics, endpoint estimates come from fitting parabolas to stable states, since deterministic trajectories do not diffuse to absorption.
- **Closure diagnostic (Figure 10):** Ratios of simulated to predicted overlapping-motif counts, averaged over time through $t=10$ and 12 realizations, reveal pronounced errors for groups sharing an opposite-opinion vertex under rewire-to-same. Errors are smaller under random rewiring.

The source reports supporting data at [Figshare collection 6758496](https://doi.org/10.6084/m9.figshare.c.6758496).

## Limitations

Uniform-mixing closure misses correlations near fragmentation, causing substantial threshold error under rewire-to-same. Better agreement under random rewiring is demonstrated for the tested parameters and need not persist under other initial group-size distributions or opinion imbalances. The transition classifications are numerical findings rather than analytic bifurcation proofs. Experiments emphasize groups of at most four and do not validate the model against human behavioral data. The supplied Markdown contains damaged mathematical expressions; the summary uses legible definitions and prose rather than reconstructing uncertain formulas.

## Related Concepts

- [[concepts/voter-model|Voter Model]]: neutral imitation is extended with adaptive group membership and collective updates.
- [[concepts/hypergraphs|Hypergraphs]]: explicit overlapping groups retain the interaction structure needed for these update rules.
- [[concepts/opinion-dynamics|Opinion Dynamics]]: distinguishes rapid ordering from persistent finite-system coexistence.

## Related Papers

- Horstmeyer and Kuehn (2020), Physical Review E 101, 022305 (source reference 26): earlier adaptive voter dynamics on simplicial complexes, contrasted with the proportional-rule metastability here.
- Papanikolaou et al. (2022), Physical Review E 105, 054307 (source reference 27): earlier hypergraph voter extension reporting accelerated convergence.
- Demirel et al. (2014), Physica D 267, 68 (source reference 28): graph moment-closure failures provide the comparison for the hypergraph motif diagnostic.
