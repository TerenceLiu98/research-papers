---
title: Outcome-Constrained Priority Matching
type: concept
aliases:
  - Constrained Priority Mechanism
  - Outcome-Constrained Serial Priority
definition: "Sequential preference-based assignment that accepts a choice only if some completion still meets capacity limits and a minimum aggregate outcome score."
tags:
  - market-design
  - constrained-assignment
---

## Overview

Outcome-constrained priority matching allocates scarce locations in an externally fixed agent order while protecting a planner’s aggregate outcome floor. Each agent receives their best available choice among those admitting a feasible completion. Predicted agent–location outcomes and reported preferences therefore play distinct roles.

## Key Ideas

- **Look ahead through optimization.** Maximize the remaining outcome sum to check whether a proposed choice leaves any completion above the floor. Merely checking spare capacity is insufficient.
- **Defer bottom ties.** With strict rankings except for a possible tied bottom set, agents lacking a feasible strictly ranked option can be held and assigned jointly by outcome maximization at the end.
- **Keep incentive conditions explicit.** Strategy-proofness holds for the specified preference domain with the order and outcome constraint fixed independently of current preference reports.
- **Constrain the efficiency claim.** No acceptable assignment Pareto-dominates the result, but this does not optimize top-choice counts or guarantee access to every constrained-efficient assignment by reordering.
- **Separate prediction from realization.** A floor on predicted outcomes guarantees a property of the assignment scores; realized welfare depends on predictive validity and the policy setting.

## Important Papers

- [[papers/combining-outcome-based-and-preference-based-matching-a-constrained-priority-mechanism|Combining Outcome-Based and Preference-Based Matching: A Constrained Priority Mechanism]] introduces the mechanism, establishes its incentive and efficiency properties, and illustrates refugee and school assignment trade-offs.

## Related Concepts

The mechanism combines serial priority, outcome-based assignment, and constrained Pareto efficiency. Its efficiency comparison concerns agents’ preferences within an acceptable assignment set, rather than Pareto optimization over multiple predicted outcome dimensions.
