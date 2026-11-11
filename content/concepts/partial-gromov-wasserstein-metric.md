---
title: Partial Gromov-Wasserstein Metric
type: concept
aliases:
  - Partial Gromov-Wasserstein
  - PGW
tags:
  - gromov-wasserstein
  - optimal-transport
  - partial-matching
  - metric-measure-geometry
---

## Overview

Partial Gromov-Wasserstein (PGW) compares finite metric-measure spaces through their internal pairwise geometry while allowing some mass to remain unmatched. A total-variation penalty trades geometric distortion against discarded mass. Unlike balanced [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]], it accommodates unequal total mass and can suppress outliers; unlike a generic unbalanced discrepancy, the rooted PGW objective has a proved metric structure under its stated assumptions.

## Key Ideas

- **Partial couplings.** The transport plan's marginals may be submeasures of the inputs, so geometrically incompatible or excess mass need not be matched.
- **Quadratic mass penalty.** PGW penalizes total-variation differences between tensor-square input measures and tensor-square coupling marginals, matching the quadratic structure of GW distortion.
- **Metric property.** For absolute-power distortion on compact metric-measure spaces, a suitable root of PGW defines a metric modulo measure-preserving isometry.
- **Balanced limit.** On probability metric-measure spaces, PGW converges to classical GW as the mass penalty grows.
- **Augmented formulation.** Adding an auxiliary point converts discrete PGW into a balanced GW-like problem, enabling equivalent Frank-Wolfe implementations whose linear subproblems use partial or ordinary optimal transport.
- **Barycenters.** PGW barycenters extend structural averaging to inputs with unequal or corrupted mass and can reduce the influence of outliers during shape interpolation.
- **Optimization remains non-convex.** Solver guarantees concern stationary points; partial matching does not remove the local-optimization issues of GW.

## Important Papers

- [[papers/partial-gromov-wasserstein-metric|Partial Gromov-Wasserstein Metric]]: defines the total-variation PGW objective, proves its metric properties, develops equivalent solvers and barycenters, and evaluates shape applications.
- Chapel, Alaya, and Gasso (2020), "Partial Optimal Transport with Applications on Positive-Unlabeled Learning": studies a fixed-transported-mass partial GW formulation.
- Sejourne, Vialard, and Peyre (2021), "The Unbalanced Gromov-Wasserstein Distance: Conic Formulation and Relaxation": develops a broader divergence-penalized unbalanced GW framework.
- [[papers/linear-partial-gromov-wasserstein-embedding|Linear Partial Gromov-Wasserstein Embedding]]: builds a reference-relative approximation that amortizes repeated PGW comparisons.

## Related Concepts

- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: the balanced intrinsic-geometry comparison recovered in the large-penalty limit for probability spaces.
- [[concepts/unbalanced-optimal-transport|Unbalanced Optimal Transport]]: the broader family of transport models that relax marginal conservation.
- [[concepts/optimal-transport|Optimal Transport]]: supplies the partial-transport subproblems used by the solver.
- [[concepts/linear-partial-gromov-wasserstein-embedding|Linear Partial Gromov-Wasserstein Embedding]]: a reference-based representation derived from PGW couplings.
- [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]: related averaging constructions on a shared ground space.
