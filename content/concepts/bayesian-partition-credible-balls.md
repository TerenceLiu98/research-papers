---
title: Bayesian Partition Credible Balls
type: concept
aliases:
  - Partition Credible Balls
tags:
  - bayesian-clustering
  - uncertainty-quantification
  - decision-theory
---

## Overview

A Bayesian partition credible ball is a posterior region of clusterings close to a chosen partition estimate under a partition distance. It summarizes uncertainty in which items belong together, beyond uncertainty in the number of groups alone.

## Key Ideas

- **Choose a partition loss.** Variation of information is $\operatorname{VI}(A,B)=H(A)+H(B)-2I(A,B)$, using partition entropy and mutual information. It compares groupings independently of arbitrary label names.
- **Choose a center.** A Bayes partition estimate minimizes posterior expected VI, approximated with posterior partition draws.
- **Choose a radius by posterior mass.** For center $\hat x$, define $B_\epsilon(\hat x)=\{x:\operatorname{VI}(x,\hat x)\leq\epsilon\}$. The smallest radius containing at least $1-\alpha$ posterior mass yields a credible ball at that level, subject to the posterior approximation.
- **Inspect representative alternatives.** Coarse, fine, and distant boundary partitions show plausible changes in resolution and membership. Selected boundary examples do not enumerate all uncertainty.
- **Do not equate different intervals.** The range of group counts among boundary partitions is not a marginal credible interval for the group count. BT-SBM's 2017/2018 example reports boundary counts spanning 3-11 while its marginal 95% interval for $K$ is 3-7.
- **Separate grouping from ordering.** VI is label invariant; rank-specific membership summaries additionally require an ordering convention such as descending strength.

## Important Papers

- Wade and Ghahramani (2018), "Bayesian Cluster Analysis: Point Estimation and Credible Balls (with Discussion)": methodological source cited by the BT-SBM paper.
- [[papers/the-bradley-terry-stochastic-block-model|The Bradley-Terry Stochastic Block Model]]: applies VI estimates and 95% credible balls to uncertain tennis strength tiers.

## Related Concepts

- [[concepts/bayesian-rank-clustering|Bayesian Rank Clustering]]
