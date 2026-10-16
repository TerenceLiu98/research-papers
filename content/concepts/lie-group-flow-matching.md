---
title: Lie Group Flow Matching
type: concept
tags:
  - flow-matching
  - lie-groups
  - geometric-learning
---

## Overview

Lie group flow matching learns generative vector fields on spaces with smooth group structure. For groups with surjective exponential maps, exponential curves provide conditional interpolation paths computable from multiplication, inversion, exponentials, and logarithms. This extends [[concepts/flow-matching|Flow Matching]] to rotations, rigid motions, and products of poses and Euclidean features.

## Key Ideas

- **Exponential interpolation.** For endpoints $g_0,g_1$, choose $A=\log(g_0^{-1}g_1)$ and set $g_t=g_0\exp(tA)$. The curve remains on the group and reaches the target. The logarithm requires a branch choice; surjectivity does not imply a globally smooth logarithm.
- **Left-trivialized targets.** Relative to a left-invariant frame, the conditional velocity along this curve has constant coefficients $A$. A left-invariant metric allows tangent-space regression to be expressed in a common Lie algebra coordinate system.
- **Conditional versus marginal training.** A squared-metric conditional regression loss has the same parameter gradient as the corresponding marginal flow-matching loss under the framework's assumptions. Intermediate training states are computed directly, while sampling still integrates the learned field.
- **Intrinsic integration.** Updating through the group exponential preserves group membership. Matrix-group representations offer reusable operations; specialized coordinates can reduce memory use.
- **Exponential curves versus geodesics.** These paths need not minimize Riemannian length. With a bi-invariant metric, exponential curves are geodesics, linking the construction to geodesic Riemannian flow matching. A merely left-invariant metric does not ensure this equivalence.
- **Products and quotients.** Product groups inherit operations componentwise. Homogeneous spaces require an additional choice among group elements that map a source point to a target point, so the group construction alone does not determine a unique interpolation there.

## Important Papers

- [[papers/flow-matching-on-lie-groups|Flow Matching on Lie Groups]]: develops the exponential-curve conditional field and demonstrates it qualitatively on $\mathrm{SE}(2)$, $\mathrm{SO}(3)$, and $\mathrm{SE}(2)\times\mathbb R^2$.
- Chen and Lipman (2024), "Flow Matching on General Geometries": the Riemannian formulation discussed as a comparator in that paper.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: the underlying conditional regression framework.
- [[concepts/geodesic-distance|Geodesic Distance]]: the metric notion that must be distinguished from exponential interpolation.
- [[concepts/riemannian-representation-learning|Riemannian Representation Learning]]: broader use of manifold geometry to structure learned latent representations.
