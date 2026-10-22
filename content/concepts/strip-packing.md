---
title: Strip Packing
type: concept
tags:
  - combinatorial-optimization
  - geometric-packing
  - operations-research
---

## Overview

Strip packing places a collection of geometric items inside a container with fixed base dimensions and unbounded or variable height. The objective is to minimize the final occupied height, equivalently maximizing utilization for a fixed item set. Variants differ by dimensionality, permitted rotations, and whether all items are known before packing.

## Key Ideas

- **Offline versus online:** Offline algorithms may choose among all remaining items, while online algorithms must place each arriving item without access to future arrivals.
- **Conditioned decisions:** A placement can require an ordered choice of item, orientation, and position. Later choices depend on earlier ones, creating a structured rather than flat action space.
- **Solution families:** Exact methods target optimality but scale poorly; approximation algorithms offer worst-case guarantees; heuristics encode placement rules; metaheuristics search over candidate solutions; learned policies attempt to acquire reusable packing strategies.
- **Evaluation:** For a fixed-width strip, final height is the direct objective. Bin gap ratio measures unused volume within the bounding container and is positively related to final height for a fixed set of items.

## Important Papers

- [[papers/one-model-packs-thousands-of-items-with-recurrent-conditional-query-learning|One Model Packs Thousands of Items with Recurrent Conditional Query Learning]] learns 2D and 3D policies for both online and offline strip packing.
- Christensen et al. (2017), "Approximation and Online Algorithms for Multidimensional Bin Packing: A Survey": surveys approximation and online packing methods.
- Wei et al. (2017), "An Improved Skyline Based Heuristic for the 2D Strip Packing Problem and Its Efficient Implementation": develops a skyline heuristic used in the paper's baseline context.

## Related Concepts

- [[concepts/neural-combinatorial-optimization|Neural Combinatorial Optimization]]: learned policies for combinatorial decision problems.
- [[concepts/conditional-query-action-decomposition|Conditional-Query Action Decomposition]]: sequential handling of dependent packing choices.
