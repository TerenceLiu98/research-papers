---
title: Anti-Jamming Topology Control
type: concept
aliases:
  - Jamming-Resilient Topology Adaptation
definition: "Anti-jamming topology control adapts wireless transmission footprints to reduce attack-induced interference while maintaining required network service coverage."
tags:
  - wireless-communications
  - network-security
  - game-theory
---

## Overview

Transmission power changes which wireless nodes overlap and can interfere. A defender can exploit this relationship to limit the network-wide effect of a jammer, but shrinking every footprint can sacrifice service. Topology control therefore couples interference mitigation to coverage requirements.

## Key Ideas

- Neighboring powers interact, so independently maximizing each link's signal quality can miss network-wide interference costs.
- Discrete power assignments create a combinatorial action space. Local game decompositions reduce computation but need separate assessment of their strategic error.
- Marginal allocations avoid enumerating every joint assignment. Feasible expectations and implementable mixtures of feasible assignments must be distinguished.
- Coverage floors prevent trivial solutions that suppress interference by withdrawing service. Total power is only a surrogate for actual geographic coverage.
- Better reward against a particular opponent is distinct from a stronger minimax guarantee.

## Important Papers

- [[papers/adaptive-topologies-against-jamming-attacks-in-wireless-networks-a-game-theoretic-approach|Adaptive topologies against jamming attacks in wireless networks: A game-theoretic approach]] develops discrete decompositions, constrained marginal allocations, and a continuous power game, evaluated on synthetic and building-derived topologies.

## Related Concepts

- [[concepts/mobile-jamming-games|Mobile Jamming Games]]: adapts spatial positions rather than transmission footprints.
- [[concepts/approximate-nash-equilibrium|Approximate Nash Equilibrium]]: supplies a deviation-based criterion for assessing approximate strategic solutions.
