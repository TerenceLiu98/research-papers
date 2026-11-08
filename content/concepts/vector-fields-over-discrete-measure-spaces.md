---
title: Vector Fields over Discrete Measure Spaces
type: concept
aliases:
  - Discrete Measure-Space Vector Fields
  - Lp,q Spaces of Discrete Vector Fields
tags:
  - discrete-geometry
  - vector-fields
  - metric-spaces
  - spatio-temporal-data
---

## Overview

A vector field over a discrete measure space assigns a scalar or vector to every element of a countable spatial support while retaining a weight for each element. This provides a common representation for pixels, image gradients, mesh cells, simplices, and other sampled domains. Mixed $L^{p,q}$ norms then compare fields without discarding the difference between within-element vector components and aggregation across the domain.

## Key Ideas

- A discrete measure space $(\mathcal M,\mu)$ consists of a countable set and nonnegative weights whose sums define the measure of subsets. Cell area or volume can therefore enter field comparisons directly.
- A rank-$d$ field is a map $X:\mathcal M\to V$ into a $d$-dimensional vector space. A grayscale image has rank one, an RGB image rank three, and a two-dimensional image gradient rank two.
- The mixed norm $\lVert X\rVert_{L^{p,q}}=(\sum_s\lVert X(s)\rVert_q^p\mu(s))^{1/p}$ uses $q$ within each vector and $p$ across spatial elements. The induced distance compares two fields defined on the same support.
- Cubical grids, triangulated surfaces, simplicial complexes, and Voronoi cells fit the same construction when their top-dimensional elements and associated weights define the support and measure.
- The representation supplies geometry but not invariance to translations, deformations, or changing meshes. Those require registration, correspondence, or a distance designed for unequal supports.

## Important Papers

- [[papers/pattern-recognition-in-complex-systems-via-vector-field-representations-of-spatio-temporal-data|Pattern recognition in complex systems via vector-field representations of spatio-temporal data]]: defines the $L^{p,q}$ metric family and uses it to analyze simulated dynamical fields on grids and a triangulated sphere.

## Related Concepts

- [[concepts/multidimensional-scaling|Multidimensional Scaling]]: embeds pairwise distances between discrete fields into Euclidean coordinates.
- [[concepts/latent-vector-fields|Latent Vector Fields]]: learns vector-valued dynamics in a latent state space rather than defining fields directly on an observed discrete support.
- [[concepts/geodesic-distance|Geodesic Distance]]: measures shortest-path geometry on continuous or graph-based spaces and can provide a different basis for data comparison.
