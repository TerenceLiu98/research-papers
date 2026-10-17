---
title: Manifold Steering
type: concept
aliases:
  - Geometry-Aware Activation Steering
tags:
  - activation-steering
  - representation-geometry
  - mechanistic-interpretability
---

## Overview

Manifold steering intervenes on a model along a curved set of naturally occurring activations. Given a fitted parameterization $s(u)$ and endpoint coordinates $u_0,u_1$, a basic implementation follows $s((1-t)u_0+tu_1)$ rather than the straight chord between the endpoint activations. Its goal is to preserve meaningful intermediate states as model behavior changes.

## Key Ideas

- **Natural intermediate states matter.** Endpoint success can conceal incoherent transitions. A chord through a curved representation can pass through low-density regions and cause abrupt changes in the output distribution.
- **Activation and behavior manifolds are distinct objects.** The activation manifold summarizes internal states; the behavior manifold summarizes unintervened output distributions. Steering tests whether moving along the former induces trajectories near the latter.
- **Probabilistic geometry supplies an evaluation space.** Square-root probabilities allow Hellinger comparisons. Distance to a fitted behavior manifold is a task-specific naturalness proxy, not a direct measure of fluency or usefulness.
- **Pullback tests the reverse connection.** Optimizing activations to reproduce behavior-manifold targets can recover activation curvature. This is evidence of correspondence under the chosen subspace and objective, not proof of a unique inverse representation.
- **Coordinates can support factored control.** On a fitted graph surface, changing one intrinsic coordinate can move behavior along one conceptual dimension while approximately preserving another.
- **A manifold path is not automatically a geodesic.** Linear interpolation in intrinsic coordinates stays on the fitted manifold, but need not minimize path length under its induced metric. [[concepts/geodesic-distance|Geodesic Distance]] requires an explicit metric and shortest-path criterion.
- **Intervention controls are essential.** A fair comparison should account for which activation components are replaced or retained. Preserving prompt-specific residuals can affect behavior independently of curvature.

## Important Papers

- [[papers/manifold-steering-reveals-the-shared-geometry-of-neural-network-representation-and-behavior|Manifold Steering Reveals the Shared Geometry of Neural Network Representation and Behavior]] develops activation/behavior manifold comparisons, bidirectional interventions, and a geometric framework across language and visual tasks.
- [[papers/not-all-language-model-features-are-one-dimensionally-linear|Not All Language Model Features Are One-Dimensionally Linear]] provides earlier calendar-circle interventions and motivates moving beyond scalar feature directions.

## Related Concepts

- [[concepts/model-steerability|Model Steerability]]
- [[concepts/geodesic-distance|Geodesic Distance]]
- [[concepts/irreducible-multidimensional-features|Irreducible Multidimensional Features]]
- [[concepts/riemannian-representation-learning|Riemannian Representation Learning]]
- [[concepts/world-models|World Models]]
