---
title: Isometric Log-Ratio Transformation
type: concept
aliases:
  - ILR
  - ILR Transformation
definition: "The isometric log-ratio transformation represents a positive composition with orthonormal log-ratio coordinates, preserving its Aitchison geometry in Euclidean space."
tags:
  - compositional-data
  - statistical-modeling
---

## Overview

ILR maps a positive K-part composition to K−1 coordinates. It supports modeling relative allocations without treating constrained shares as independent, unbounded outcomes.

## Key Ideas

- A sequential binary partition constructs balances comparing geometric means of disjoint groups of parts, with normalization for orthonormal coordinates.
- Coordinates describe relative quantities; predictions must be inverse-transformed to interpret individual shares.
- Different partitions change coordinate interpretation. Invariance of fitted predictions requires a correspondingly transformed model specification.
- Orthogonality is a geometric property, not a guarantee that empirical errors are independent.
- Cabinet-specific balances can accommodate different numbers of parties. Pooling them still requires a substantively meaningful shared regression structure.
- Zero parts require additional treatment because their logarithms are undefined.

## Important Papers

- [[papers/refining-gamson-the-isometric-log-ratio-transformation-and-portfolio-proportionality-in-multiparty-governments|Refining Gamson]] applies cabinet-specific balances in a random-slope regression and finds heterogeneity in seat–portfolio proportionality.
- Egozcue et al. (2003), “Isometric Logratio Transformations for Compositional Data Analysis,” introduces ILR.

## Related Concepts

- [[concepts/gamsons-law|Gamson’s Law]] supplies a compositional allocation application.
- [[concepts/logit-distance|Logit Distance]] also connects log-probability ratios to Aitchison geometry, in predictive-distribution comparison rather than cabinet regression.
