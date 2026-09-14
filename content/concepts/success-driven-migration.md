---
title: Success-Driven Migration
type: concept
tags:
  - evolutionary-game-theory
  - migration
  - spatial-dynamics
  - agent-based-modeling
---

## Overview

Success-driven migration makes agents' locations respond to observed payoffs in a spatial game. Agents tend to move toward more successful agents or locations, so the interaction environment evolves alongside strategy choices. Observed success is a relocation signal; it does not guarantee that the mover will earn the same payoff after joining the destination.

## Key Ideas

- **Coupled adaptation.** Strategy imitation changes behavior, while relocation changes competitors and neighborhoods. These processes can reinforce or offset each other.
- **Destination feasibility.** Vacancies, capacity, movement costs, and search range constrain migration. A rule targeting the neighbor of a globally sampled agent can generate long-range movement despite locally defined competitions.
- **Rate versus accessibility.** Permitting movement can change reachable configurations. Varying an already positive migration rate may mainly change convergence speed in some models, but finite-time outcomes, spatial distributions, or equilibria can still depend on it.
- **Sorting and congestion.** Moving toward resource-rich locations can increase competitive pressure there. Regional concentration and strategy prevalence are distinct outcomes; less spatial concentration does not necessarily imply less effort escalation.
- **Limits of mean-field closure.** An approximation that keeps regional densities fixed can miss crowding and vacancy constraints. Predictions of complete concentration require checking whether the destination has enough capacity.

## Important Papers

- [[papers/involution-game-with-migration-and-spatial-heterogeneity-of-social-resources|Involution Game with Migration and Spatial Heterogeneity of Social Resources]]: agents move to an empty cell adjacent to a sampled comparison agent with a probability based on their payoff difference. Reports substantial sorting toward richer regions, with internally conflicting claims about the direction of migration's effect on high effort.
- Helbing and Yu (2009), "The outbreak of cooperation among success-driven individuals under noisy conditions": cited migration foundation in the linked paper.
- Lee, Cleveland, and Szolnoki (2022), "When costly migration helps to improve cooperation": cited in the linked paper as motivation for relaxing cost-free mobility.

## Related Concepts

- [[concepts/involution-games|Involution Games]]: a setting in which relocation changes costly competition over fixed resources.
- [[concepts/network-games|Network Games]]: interaction structure determines which agents affect each other's payoffs, and mobility can change that structure.
