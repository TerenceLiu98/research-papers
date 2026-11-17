---
title: Higher order interactions destroy phase transitions in Deffuant opinion dynamics model
type: paper
authors:
  - Hendrik Schawe
  - Laura Hernández
year: 2022
doi: 10.1038/s42005-022-00807-4
tags:
  - opinion-dynamics
  - higher-order-networks
  - bounded-confidence
---

## TL;DR

Whole-group confidence gating can replace a sharp consensus transition with a smooth crossover on sparse random hypergraphs. This depends on group size and topology: highly connected random hypergraphs and regular spatial hypergraphs can retain transitions. Larger groups also increase low-confidence fragmentation because one dissenter can block an entire interaction.

## Research Question

How do group size, connectivity, and spatial structure change consensus formation when pairwise Deffuant compromise becomes a group interaction?

## Motivation

Pairwise models omit discussions where one participant's disagreement prevents the whole group from compromising. Explicit hyperedges preserve this constraint, which is lost in a pairwise projection.

## Contributions

- Extends full-compromise Deffuant dynamics to asynchronous, confidence-gated group updates.
- Uses system-size dependence and order-parameter variance to distinguish transitions from crossovers.
- Identifies contrasting outcomes on random, preferential-attachment, mixed-size, and spatial hypergraphs.

## Method

Opinions start independently and uniformly on $[0,1]$. At each step, a random hyperedge $e$ is selected. If its opinion range satisfies

$$
\max_{j\in e}x_j-\min_{j\in e}x_j<\varepsilon,
$$

all members adopt the group mean; otherwise no member changes. Size-two hyperedges recover Deffuant dynamics with maximal compromise, $\mu=1/2$. Unlike Hegselmann–Krause updates, the gate checks agreement across the entire selected group, rather than each neighbor's proximity to a focal agent.

The order parameter $S$ is the fraction in the largest opinion cluster, with opinion tolerance $10^{-3}$. Convergence requires summed absolute opinion change below $10^{-3}$ over a sweep of $N$ attempted updates.

## Experiments

Unless otherwise stated, simulations use 1,000 independent realizations at each of 300 confidence values over $[0,0.6]$, with reported resolution approximately 0.002.

| Setting | Reported result |
|---|---|
| Uniform Erdős–Rényi, mean degree $c=10$ | Transitions sharpen with size for $k=2,3$; $k=4$ is borderline. For $k=5,6$, size-independent mean curves and vanishing variance support crossovers (Figure 2). |
| Erdős–Rényi, $k=6,c=150$ | A sharp transition reappears at larger sizes; $N=256,512$ alone would conceal this behavior (Figure 3). |
| Barabási–Albert hypergraphs | At $k=3$, the polarization plateau disappears but finite-size evidence still suggests a transition. At $k=5$, a crossover emerges (Figures 4–6). |
| Mixed size-three and size-five ER edges, $c=10$ | Equal degree contributions favor more size-three edges and behavior close to $k=3$. Equal edge counts instead resemble the intermediate size-four case (Figure 7). |
| Spatial hypergraphs, $(k,c)=(3,12),(5,15)$ | Sharp fragmentation-to-consensus transitions persist, with no observed polarization regime or size-five crossover (Figures 8–9). |

Preferential-attachment trajectories show asymmetric cluster growth, unlike the more symmetric ER trajectories. The explanation in terms of hubs unblocking overlapping groups is heuristic. Spatial cluster-size distributions suggest continuous transitions, but a single exponent did not collapse the order parameter on both sides of the transition.

## Limitations

The model assumes fixed groups, homogeneous confidence, uniform initial opinions, and immediate full compromise. Adaptive membership and heterogeneous confidence are not tested. Transition disappearance is conditional on topology, connectivity, and group size. Results are numerical and do not constitute empirical validation of human discussion behavior. Some mathematical expressions in the supplied Markdown are damaged; uncertain ensemble-generation formulas are omitted.

## Related Concepts

- [[concepts/bounded-confidence-models|Bounded Confidence Models]]: generalizes the confidence gate from pairs to whole groups.
- [[concepts/hypergraphs|Hypergraphs]]: retain overlapping discussion groups and group-wide blocking constraints.

## Related Papers

- [[papers/polyadic-opinion-formation-the-adaptive-voter-model-on-a-hypergraph|Polyadic Opinion Formation: The Adaptive Voter Model on a Hypergraph]]: complementary binary-opinion dynamics with adaptive membership, rather than continuous opinions on fixed groups.
- Deffuant et al. (2000), “Mixing beliefs among interacting agents”: pairwise foundation (source reference 3).
- Hickok et al. (2021), “A bounded-confidence model of opinion dynamics on hypergraphs”: alternative discordance rules can facilitate larger-group interaction, unlike the blocking mechanism here (source reference 16).

Source: [published article](https://doi.org/10.1038/s42005-022-00807-4). The authors supply [higher-order data](https://doi.org/10.5281/zenodo.5026816), [dyadic data](https://doi.org/10.5281/zenodo.4701047), and [simulation code](https://github.com/surt91/hk).
