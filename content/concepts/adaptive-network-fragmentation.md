---
title: Adaptive Network Fragmentation
type: concept
aliases:
  - Coevolutionary Network Fragmentation
definition: Adaptive network fragmentation occurs when feedback between node states and edge rewiring separates an interaction network into disconnected groups, often homogeneous in state.
tags:
  - adaptive-networks
  - opinion-dynamics
  - phase-transitions
---

## Overview

Adaptive network fragmentation arises when node states influence tie formation or removal while existing ties govern state changes. Homophilic rewiring can remove disagreement edges faster than imitation produces global consensus, leaving disconnected groups with distinct states.

## Key Ideas

- Relative rates of rewiring and state updates determine whether disagreement is resolved through imitation or separation.
- In a coevolving voter model, zero active-link density is absorbing: every remaining edge joins equal states. This permits both global consensus and fragmented coexistence.
- Infinite-system activity and finite-system connectivity are different observables. Finite networks can ultimately freeze even in the parameter regime associated with an active thermodynamic phase.
- Mean-field closures can explain the mechanism while misplacing the threshold because rewiring creates correlations. For the degree-four model of Vazquez and colleagues, the predicted threshold is $2/3$, compared with approximately $0.38$ in simulations.

## Important Papers

- [[papers/generic-absorbing-transition-in-coevolution-dynamics|Generic Absorbing Transition in Coevolution Dynamics]]: derives a mean-field absorbing transition and relates finite-network fragmentation to random-walk trajectories and convergence times.

## Related Concepts

- [[concepts/voter-model|Voter Model]]: provides the copying dynamics in a minimal fragmentation model.
- [[concepts/coevolutionary-network-games|Coevolutionary Network Games]]: also couples behavior and interaction structure, but incorporates strategic payoffs rather than neutral copying alone.
