---
title: Evolutionary games on networks with negative edge-based environmental feedback
type: paper
authors:
  - Katherine Betz
  - Feng Fu
  - Naoki Masuda
year: null
tags:
  - evolutionary-game-theory
  - environmental-feedback
  - network-dynamics
---

[[index|Library home]]

## TL;DR

Binary environments attached to individual edges create negative feedback: cooperation improves the environment, but the improved environment favors defection. Mean-field dynamics exhibit bistability and limit cycles; sparse networks can replace these behaviors with stable coexistence. A pair approximation captures these structural effects more accurately than mean field, with remaining discrepancies on lattices and in some oscillatory regimes.

## Research Question

How do interaction-specific environmental feedback, network degree, and finite selection strength jointly determine cooperation, bistability, and oscillations?

## Motivation

Population-wide environmental variables conceal local strategy–environment correlations. Earlier edge-based studies emphasized weak-selection fixation or lattice simulations. This paper develops a tractable approximation for negative feedback at finite selection strength and compares it with stochastic network dynamics.

## Contributions

- Defines a fixed-network game with binary, strategy-dependent edge environments and separately tunable environmental and strategy update frequencies.
- Derives a four-dimensional mean-field system and a six-density pair approximation with five independent variables.
- Identifies mean-field bistability and a Hopf bifurcation, and shows how sparse networks can suppress oscillations or remove bistability in the tested settings.

## Method

Nodes cooperate or defect on a static undirected, unweighted graph. Each edge selects either a depleted-environment harmony game, favoring cooperation, or a rich-environment prisoner’s dilemma, favoring defection. Payoffs are averaged over neighbors. With probability $1-\omega$, a randomly selected node samples a neighbor and adopts its strategy with Fermi probability $[1+\exp(-\beta(F_j-F_i))]^{-1}$.

With probability $\omega$, a random node's incident edges independently update their environments. Depleted-to-rich probabilities obey $p_0>p_1>p_2$, and rich-to-depleted probabilities obey $q_0<q_1<q_2$, with indices denoting CC, CD, and DD edges. Thus cooperation promotes environmental enrichment while defection promotes depletion.

Mean field tracks the cooperator fraction and three depleted-edge densities. Boundary stability uses regularized conditional environmental fractions and an approximate rare-invader calculation. Interior equilibria reduce to a scalar root problem followed by Jacobian analysis (Section 3).

The pair approximation for regular graphs tracks strategy pairs jointly with environmental states. Conditional independence of adjacent edges closes neighborhood distributions. Crucially, it averages the nonlinear Fermi probability over neighborhood configurations rather than applying it to average payoffs; these operations generally differ under finite selection (Section 4).

## Experiments

Section 5 compares a complete graph with 1,000 nodes, random degree-10 and degree-4 regular graphs with 10,000 nodes, and a periodic 100-by-100 square lattice. Numerical comparisons use environmental transition probabilities $(p_0,p_1,p_2)=(0.8,0.4,0.3)$ and $(q_0,q_1,q_2)=(0.3,0.5,0.7)$.

- **Initial conditions:** At $(\omega,\beta)=(0.7,5)$, complete-graph trajectories approach defection for initial cooperation at most 0.2 and cooperation for initial cooperation at least 0.4; initial cooperation 0.3 produces substantial stochastic variability. Degree-10 simulations increase cooperation from all tested initial fractions, including 0.01. Degree-4 simulations instead approach intermediate cooperation (Figure 4).
- **Slow environmental updates:** At $(0.05,5)$, deterministic complete-graph approximations sustain cycles, but finite simulations become absorbed at a boundary within at most one cycle. On degree-10 graphs, pair approximation eventually cycles while simulations show damping. Degree-4 graphs and the lattice exhibit damped oscillations near cooperation 0.57 (Figure 5).
- **Oscillation suppression:** At $(0.15,4)$, complete-graph simulations oscillate without absorption during the simulated horizon, whereas sparse-network simulations broadly support the pair approximation's damped oscillations (Figure 6).
- **Stable regimes:** At $(0.2,2.6)$ and $(0.3,5)$, both approximations predict convergence qualitatively, with pair approximation more accurate on sparse networks (Figures 7–8).

These results support structural stabilization under the tested parameters, not a universal increase in cooperation as degree decreases.

## Limitations

The boundary invasion argument is approximate and lacks a full justification of its limiting conditional fractions. Pair closure neglects higher-order correlations and cannot distinguish a degree-4 random graph from a square lattice, explaining weaker lattice agreement. It also misses damping in the degree-10 slow-update example. Deterministic limit cycles need not survive finite-population absorption. Numerical evidence covers selected regular networks and parameters rather than arbitrary topology.

The supplied Markdown does not state a publication year or stable paper identifier; the year is left null. Some extracted equations and figure labels are malformed, so uncertain matrix entries are not reproduced here.

## Related Concepts

- [[concepts/edge-based-environmental-feedback|Edge-Based Environmental Feedback]]
- [[concepts/coevolutionary-network-games|Coevolutionary Network Games]]
- [[concepts/bistability-and-hysteresis|Bistability and Hysteresis]]: the paper demonstrates bistability; this alone does not establish a hysteresis sweep.

## Related Papers

- Betz, Fu, and Masuda (2024), “Evolutionary game dynamics with environmental feedback in a network with two communities,” *Bulletin of Mathematical Biology* 86:84: the authors' earlier coarse-grained environmental-feedback model (source reference 56).
- Su et al. (2019), “Evolutionary dynamics with game transitions,” *PNAS* 116:25398–25404: edge-game transitions analyzed under weak selection (source reference 35).
- Weitz et al. (2016), “An oscillating tragedy of the commons in replicator dynamics with game-environment feedback,” *PNAS* 113:E7518–E7525: foundational feedback-driven oscillation model (source reference 18).
