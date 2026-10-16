---
title: Posterior Co-Clustering Probabilities
type: concept
aliases:
  - Posterior Similarity Matrix
tags:
  - bayesian-clustering
  - uncertainty-quantification
---

## Overview

Posterior co-clustering probabilities measure how likely each pair of observations is to belong to the same latent group. They summarize uncertainty over partitions without requiring stable cluster labels or a fixed group count across posterior draws.

## Key Ideas

For cluster assignments $c_i$ and $M$ posterior draws,

$$
P_{ii'}=\Pr(c_i=c_{i'}\mid Y)
\approx\frac{1}{M}\sum_{m=1}^{M}\mathbf{1}\{c_i^{(m)}=c_{i'}^{(m)}\}.
$$

- Equality of assignments is unchanged by relabeling a draw's groups. The matrix remains meaningful when individual group numbers do not.
- High values indicate stable shared membership; intermediate values express uncertain association. The matrix is symmetric with diagonal entries equal to one.
- Seriation can place observations with similar co-clustering profiles next to each other. Display order is a visualization choice, not an inferred ideological or temporal scale.
- In legislative applications, co-membership reflects similarity across the analyzed votes. It can distinguish different kinds of disagreement that a single rebellion count merges together.
- Separate time-window analyses can compare association with a reference legislator, but this alone does not constitute a joint dynamic model or identify causes of change.

## Important Papers

- [[papers/identifying-intraparty-voting-blocs-in-the-uk-house-of-commons|Identifying Intraparty Voting Blocs in the U.K. House of Commons]]: summarizes uncertain Labour bloc memberships with a pairwise matrix and uses seriation and annual reference-MP comparisons to interpret it.

## Related Concepts

- [[concepts/dirichlet-process-mixtures|Dirichlet Process Mixtures]]: a model family in which both labels and occupied group counts vary across posterior samples.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: a different inferential target from pairwise association in voting blocs.
