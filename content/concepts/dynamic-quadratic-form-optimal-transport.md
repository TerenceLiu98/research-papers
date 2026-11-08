---
title: Dynamic Quadratic-Form Optimal Transport
type: concept
aliases:
  - Dynamic QOT
  - Travelling-Pair Flow Matching
tags:
  - optimal-transport
  - gromov-wasserstein
  - flow-matching
  - interacting-particles
---

## Overview

Dynamic quadratic-form optimal transport extends continuous transport from single paths to interacting pairs of paths. A path action assigns a cost to moving two particles jointly, and averaging that action over two transports drawn from the same endpoint coupling produces a quadratic objective. This construction can model continuous structure-preserving evolution rather than only a static alignment.

## Key Ideas

- **Travelling pairs replace travelling points.** A conditional path jointly moves $(x_0,y_0)$ to $(x_1,y_1)$, so its velocity can depend on both particles and encode pairwise structure.
- **The coupling is quadratic.** Two endpoint transports are sampled from the same coupling, yielding an objective quadratic in that coupling, as in [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]].
- **Static-dynamic equivalence has a specific scope.** For a Lagrangian convex in the velocities, the static path-action objective and the travelling-pair dynamic objective agree. The corresponding two-particle Benamou-Brenier fluid problem has a larger feasible coupling set and can have lower cost, so it is not generally equivalent.
- **Marginalization produces usable fields.** Conditional pair velocities can be averaged into a two-particle field and then into a single-particle velocity. The latter transports the endpoint marginals but does not retain enough information to reconstruct the full pair dynamics.
- **Flow matching avoids simulation during training.** When conditional travelling-pair velocities are tractable, [[concepts/flow-matching|Flow Matching]] regresses them directly. Interaction information survives in the marginal target even when the learned field depends on one particle only.
- **Dynamic OT-GW fusion.** Penalizing the time derivative of pairwise distance, alongside kinetic energy, recovers ordinary [[concepts/optimal-transport|Optimal Transport]] at zero interaction weight and GW transport in the infinite-weight limit. This is not the same objective as static fused GW.
- **Mean-field dynamics require approximation.** Decomposing velocity into self-driven and pair-interaction terms suggests a mean-field particle system, but replacing the conditional partner law with the population marginal introduces an error governed by their Wasserstein discrepancy.

## Important Papers

- [[papers/dynamic-generalized-gromov-wasserstein-optimal-transport|Dynamic Generalized Gromov-Wasserstein Optimal Transport]] (Ying, Zeng, Zhou, and Zhang, 2026): develops the travelling-pair theory, TP-DATE solver, dynamic OT-GW fusion, and spatial-transcriptomics evaluations.
- Wang and Zhang (2025): develops the static quadratic-form optimal transport family used as the endpoint formulation.
- Zhang et al. (2026), work on inner-product Gromov-Wasserstein transport: studies a dynamic formulation for a particular quadratic transport cost.

## Related Concepts

- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: the structure-aware quadratic transport recovered in a limiting case.
- [[concepts/optimal-transport|Optimal Transport]]: supplies endpoint couplings, displacement dynamics, and the continuity-equation viewpoint.
- [[concepts/flow-matching|Flow Matching]]: learns marginalized transport velocities through conditional regression.
- [[concepts/mean-field-langevin-dynamics|Mean-Field Langevin Dynamics]]: a related population-level perspective on interacting particle systems, although with different dynamics and objectives.
