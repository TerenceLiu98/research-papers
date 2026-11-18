---
title: "Adaptive topologies against jamming attacks in wireless networks: A game-theoretic approach"
type: paper
authors:
  - Ahmed H. Anwar
  - George Atia
  - Mina Guirguis
year: null
tags:
  - wireless-communications
  - game-theory
  - network-security
---

## TL;DR

Access-point power control can reduce the interference caused by jamming while preserving coverage. The paper develops local game decompositions, coverage-constrained marginal allocations, and a continuous power game. On a topology drawn from a 28-access-point building deployment, the marginal strategy reports about 36% better jamming mitigation than uniform allocation at matched coverage in the low-coverage regime.

## Research Question

How can a defender jointly adapt wireless footprints against a strategic jammer without enumerating exponentially many network-wide power assignments?

## Motivation

Jamming can trigger channel switching and propagate interference across neighboring access points. Shrinking footprints limits those interactions but can create coverage holes. The resulting defense problem couples neighboring nodes and requires an explicit balance between service coverage and attack impact.

## Contributions

- Two scalable approximations to the discrete network game: independent local games and progressive local games that reuse earlier decisions.
- A marginal allocation formulation with global and local coverage constraints and an implementability argument based on hierarchical resource constraints.
- A continuous zero-sum power-allocation game characterized through simultaneous optimality conditions; the paper reports a unique pure equilibrium.
- Numerical comparisons on small graph motifs, a real building topology, and a random 64-node network.

## Method

The defender chooses access-point powers, while the attacker selects nodes to jam or allocates jamming power. Utilities balance attack exposure cost, interference, and coverage. In the binary formulation, the defender has $2^N$ pure assignments. A minimax linear program computes a mixed equilibrium for small networks.

The independent decomposition solves one small game per node under an assumption that its neighbors transmit at high power, then combines defender marginals through a product distribution. Attacker probabilities are normalized over admissible attacks. Progressive decomposition instead passes previously computed assignments to later subgames, leaving unsolved neighbors at high power; its result depends on node order.

The marginal formulation optimizes expected footprints directly, minimizing worst-case positive overlap under individual power bounds and a total-power coverage floor. Section 4.2 argues that hierarchical assignment constraints permit implementation as a convex combination of admissible pure allocations. Disjoint local coverage groups retain this structure. Coverage here is a power-based surrogate, rather than a direct spatial service guarantee.

In the continuous formulation, the defender maximizes a reward containing attacker exposure cost, neighboring-power interference cost, and a signal-to-noise-plus-jamming term. Defender powers have individual bounds and a minimum total; the jammer has a total power budget. The authors solve simultaneous KKT conditions numerically with Newton's method. Independent frequency bands are handled with separate coverage constraints.

## Experiments

Section 5 evaluates a seven-node tree, five-node star, five-node interconnected graph, a 28-node three-floor building topology, and a random 64-node topology. Randomized-strategy simulations average 1,000 independent runs. The building has 10, 9, and 9 access points on its respective floors.

- Local decomposition produces rewards close to the full-game equilibrium on small graphs, with some degradation at low attack cost. A defender using decomposition also loses reward against an attacker retaining the full-game equilibrium strategy; no general approximation bound is established.
- Progressive decomposition can produce a higher defender reward when both players depart from the full-game equilibrium. This is not a stronger worst-case guarantee.
- On the building topology, footprint adaptation resolves simulated conflicts faster than channel reassignment alone or no defense. These are numerical experiments using deployment geometry; the deployed access points do not implement the proposed adversarial defense.
- Figure 10 reports about 36% better mitigation than uniform power allocation when the coverage requirement is at most 300 power units, measured through non-conflicting access points. The advantage diminishes as high coverage requirements force powers toward their upper limits.
- Continuous-game comparisons show higher defender reward when the jammer deviates to greedy or uniform allocation. Increasing the coverage floor increases footprint overlap.

## Limitations

The decomposition's empirical reward proximity does not certify an epsilon-Nash equilibrium. Full-game comparison is restricted to small networks, and progressive results depend on ordering. Coverage and interference use simplified geometric and power-based proxies; the building study does not demonstrate a deployed anti-jamming controller. Stochastic modeling of attack–defense dynamics is left to future work.

Theorem 3 reports uniqueness of the continuous equilibrium. This should be treated as a reported claim: in the supplied Appendix A, the quadratic form used to establish negative definiteness contains only jammer-coordinate terms and is zero for a nonzero defender-only direction. The displayed argument therefore does not establish its stated strict-negativity condition.

The supplied Markdown does not identify a publication year or stable bibliographic identifier; these are left unspecified.

## Related Concepts

- [[concepts/anti-jamming-topology-control|Anti-Jamming Topology Control]]: power adaptation changes interference relationships while respecting service constraints.
- [[concepts/approximate-nash-equilibrium|Approximate Nash Equilibrium]]: distinguishes empirical reward proximity from a bound on unilateral deviation incentives.
- [[concepts/mobile-jamming-games|Mobile Jamming Games]]: changes physical positions instead of access-point footprints.

## Related Papers

- [[papers/static-and-dynamic-jamming-games-over-wireless-channels-with-mobile-strategic-players|Static and dynamic jamming games over wireless channels with mobile strategic players]] studies strategic receiver and jammer movement; this paper instead controls the power profiles of an entire access-point network.
