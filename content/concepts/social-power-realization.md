---
title: Social Power Realization
type: concept
aliases:
  - Susceptibility Realizability
definition: "Social power realization selects admissible influence-system parameters that induce prescribed weights of initial opinions in a collective outcome."
tags:
  - opinion-dynamics
  - collective-intelligence
---

## Overview

Social power specifies how strongly each initial opinion contributes to the final aggregate. Realization asks whether a desired weight vector can arise from an influence system, and which parameters produce it. Optimizing aggregation weights and implementing those weights are separate problems.

## Key Ideas

- Realizability depends on the allowed controls: changing network edges differs from changing susceptibilities on a fixed network.
- In the stable Friedkin–Johnsen model with an equally weighted average of final opinions, nonnegative delegated power gives a linear feasibility characterization of target weights.
- Every probability-simplex target is susceptibility-realizable exactly when the fixed influence network is strongly connected. Weaker connectivity may still permit particular targets.
- Different susceptibilities can implement the same weights. Circulation along eigenvector centrality changes delegation without changing retained social power, allowing distinct transient behavior with identical limiting aggregation.
- Collective bias cancellation requires both suitable weights and their realizability. Opposite-sign individual biases alone do not ensure the required target is feasible on an arbitrary network.

## Important Papers

- [[papers/susceptibility-optimization-for-wisdom-of-crowds-a-social-power-reformulation-and-realization-framework|Susceptibility optimization for wisdom of crowds]] establishes full and target-specific susceptibility realizability and uses it for global bias minimization.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]] supplies the interaction models whose parameters determine aggregation weights.
