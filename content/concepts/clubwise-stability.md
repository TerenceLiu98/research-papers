---
title: Clubwise Stability
type: concept
aliases:
  - Open Clubwise Stability
  - Closed Clubwise Stability
tags:
  - network-formation
  - game-theory
  - equilibrium
  - club-congestion
---

## Overview

Clubwise stability evaluates whether individuals have profitable deviations from a system of club memberships. Its content depends on the institution's entry, exit, and formation rules. Fershtman and Persitz distinguish open clubs, which individuals may join unilaterally, from closed clubs, where incumbents can block admission.

## Key Ideas

- **Open stability tests three changes.** No individual should gain by leaving a club or joining an existing one, and no coalition should have an admissible beneficial deviation that forms a new club. These conditions concern affiliations, which can create or remove several social links at once.
- **Closed stability adds incumbent consent.** A profitable entry is blocked if an incumbent would lose from admission. Entry can be attractive to an outsider yet undesirable to members because additional congestion outweighs new connectivity.
- **Open stability is the stronger requirement.** Every open-stable environment is closed-stable under the shared exit and formation rules. The reverse can fail: a club excluding one otherwise willing member can be sustained by an entry veto.
- **Stability is not aggregate welfare.** Individuals compare their own membership costs and network benefits. They need not internalize changes in other people's paths or link quality. A star's central member can prefer exit even when maintaining that affiliation raises total welfare.
- **Deviation scope matters.** The concept does not establish convergence from a starting configuration, nor does it test every possible coordinated deletion and replacement of affiliations. Claims about sequential segregation require additional dynamic analysis.
- **Boundary conventions require care.** The supplied text of Fershtman and Persitz prints inconsistent strict versus weak inequalities in the two new-club conditions. The institutional comparison rests on the entry rule; the exact treatment of indifference should be checked against an authoritative formula before implementing a stability test.

## Important Papers

- [[papers/social-clubs-and-social-networks|Social Clubs and Social Networks]]: defines open and closed clubwise stability and characterizes complete, star, and exclusion examples.
- Jackson and Wolinsky (1996), "A Strategic Model of Social and Economic Networks": the source paper's pairwise-stability benchmark for bilateral link formation.

## Related Concepts

- [[concepts/club-based-network-formation|Club-Based Network Formation]]: the affiliation environment to which the stability conditions apply.
- [[concepts/network-games|Network Games]]: related strategic analysis; here the choices concern the interaction structure itself.
- [[concepts/hypergraphs|Hypergraphs]]: group membership representation underlying joint link changes.
