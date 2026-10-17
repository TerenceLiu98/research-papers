---
title: Statistical Shape Graphs
type: concept
aliases:
  - Shape Graphs
  - Weighted Shape Graphs
tags:
  - statistical-shape-analysis
  - graph-matching
---

## Overview

A shape graph represents a network through node positions, connectivity, and the shapes of curves joining nodes. Statistical analysis in this representation can produce mean networks and deformation modes as complete geometric objects. It is useful when connectivity or scalar morphological features omit important information about edge geometry.

## Key Ideas

- Elastic curve comparison uses square-root velocity functions and optimizes over curve reparameterizations. Graph registration additionally seeks node correspondences, creating a combinatorial matching problem.
- Weighted edges separate curve shape from edge presence. Identifying every zero-weight curve as one absent-edge state allows edges to fade out along a deformation without forcing their geometry to collapse to a zero-length curve.
- Null-node padding permits comparisons with unequal node counts. Approximate matching remains distinct from the exact permutation-invariant distance definition.
- Graph means alternate registration and averaging; tangent PCA analyzes aligned deviations. Applying PCA directly to arbitrarily numbered nodes would confound correspondence with variation.
- Multiscale representations make different graph complexities comparable, but summaries then depend on the chosen resolution and matching parameters.

## Important Papers

- [[papers/statistical-shape-analysis-of-shape-graphs-with-applications-to-retinal-blood-vessel-networks|Statistical Shape Analysis of Shape Graphs with Applications to Retinal Blood-Vessel Networks]]: weighted elastic edges, multiscale comparison, and retinal-network statistics.
- Guo, Bal, Needham, and Srivastava (2020), "Statistical shape analysis of brain arterial networks (BANs)": predecessor cited by the retinal-network paper.

## Related Concepts

- [[concepts/effective-resistance-graph-coarsening|Effective Resistance Graph Coarsening]]
- [[concepts/geodesic-distance|Geodesic Distance]]
- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]
