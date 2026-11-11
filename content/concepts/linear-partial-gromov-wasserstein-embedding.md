---
title: Linear Partial Gromov-Wasserstein Embedding
type: concept
aliases:
  - LPGW
  - LPGW Embedding
tags:
  - gromov-wasserstein
  - optimal-transport
  - partial-matching
  - metric-measure-geometry
---

## Overview

Linear Partial Gromov-Wasserstein Embedding (LPGW) represents metric-measure spaces relative to a fixed reference space. Each target requires one partial [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein]] solve against the reference; targets can then be compared through their projected internal geometries and unmatched mass. This changes the number of expensive transport solves for all-pairs comparison from quadratic to linear in the number of targets while retaining partial matching.

## Key Ideas

- **Reference-relative representation.** An optimal partial coupling from a common reference to each target pulls the target's pairwise geometry back to reference coordinates.
- **Geometry and mass are both retained.** The embedding records gauge distortion on transported reference mass and information about mass left unmatched. Unlike balanced linear GW, it need not normalize every object to the same total mass.
- **Common transported support enables comparison.** Two embeddings are compared over the overlap of their transported reference measures, with a separate penalty for noncommon or discarded mass.
- **Barycentric projection gives a practical approximation.** For discrete measures, each embedding can be stored as a projected gauge matrix, transported reference weights, and an unmatched-mass scalar.
- **Linearization amortizes optimization.** For $K$ targets, LPGW needs $K$ reference-to-target partial GW solves rather than a separate non-convex PGW solve for every target pair. Pairwise embedding comparisons are cheaper, but the initial solves remain non-convex.
- **Reference selection controls fidelity.** A reference near the dataset's geometric center, such as a GW or PGW barycenter, can improve agreement with pairwise PGW. A poor reference can substantially increase approximation error.
- **Metric claims are conditional.** The general conditioned construction is a pseudo-metric; stronger metric and recovery statements require the assumptions stated in the LPGW analysis, including conditions on partial Monge maps and the mass-penalty parameter.

## Important Papers

- [[papers/linear-partial-gromov-wasserstein-embedding|Linear Partial Gromov-Wasserstein Embedding]]: introduces LPGW, its theoretical properties, barycentric approximation, discrete implementation, and evaluations on shape comparison and corrupted point-cloud classification.
- Bai et al. (2024), "Partial Gromov-Wasserstein Metric": develops the partial GW distance that LPGW linearizes.
- Beier, Beinert, and Steidl (2022), "On a Linear Gromov-Wasserstein Distance": provides the balanced linear GW framework.
- Bai et al. (2023), "Linear Optimal Partial Transport Embedding": develops the analogous partial linearization for ordinary optimal transport.

## Related Concepts

- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: compares spaces through distortion of their internal pairwise geometry.
- [[concepts/optimal-transport|Optimal Transport]]: supplies couplings and reference-based linear transport constructions.
- [[concepts/unbalanced-optimal-transport|Unbalanced Optimal Transport]]: relaxes exact mass conservation through marginal penalties; partial transport instead selects a transported submeasure.
- [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]: related representative constructions used to choose reference spaces.
- [[concepts/multidimensional-scaling|Multidimensional Scaling]]: used to visualize LPGW distances and projected geometries.

