---
title: Generalized Full Matching
type: concept
aliases:
  - GFM
definition: A matching design that partitions units into disjoint groups satisfying treatment-specific minimum counts and an overall minimum size while seeking covariate-homogeneous groups.
tags:
  - causal-inference
  - matching
---

## Overview

Generalized full matching extends full matching to multiple treatment conditions and flexible minimum group sizes. The base design retains every unit exactly once. It separates the composition of admissible groups from the distance objective and the algorithm used to construct them.

## Key Ideas

- **Composition:** Specify minimum counts for each treatment condition and for total group size. Larger minima can support within-group variance estimation but may worsen match quality.
- **Sparse construction:** Treatment-specific nearest neighbors encode feasible group neighborhoods without storing all pairwise distances. Disjoint seed neighborhoods establish groups, and remaining units join those groups.
- **Bottleneck guarantee:** Under a pseudometric, the algorithm of Sävje, Higgins, and Sekhon bounds the maximum within-group distance by four times the optimum. This is not an estimator-bias guarantee.
- **Target-dependent weighting:** Group outcome contrasts receive weights proportional to the target population represented in each group. Retaining all units does not imply giving all units equal influence.
- **Overlap:** Matching cannot supply missing treatment support. Calipers can exclude poor matches, but exclusions may change the target estimand.
- **Scalability:** Linear memory and favorable average nearest-neighbor search enable large samples; high-dimensional search can be substantially slower.

## Important Papers

- [[papers/generalized-full-matching|Generalized Full Matching]]: formalizes the design, proves approximation properties, and applies it to voter-experiment extrapolation.

## Related Concepts

- [[concepts/weighting-diagnostics-for-causal-estimation|Weighting Diagnostics for Causal Estimation]]: evaluates balance, information concentration, and target alignment after matching.
