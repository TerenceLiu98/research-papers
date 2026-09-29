---
title: Bayesian Rank Clustering
type: concept
aliases:
  - Bayesian Rank-Clustering
tags:
  - statistical-ranking
  - bayesian-clustering
  - pairwise-comparisons
---

## Overview

Bayesian rank clustering represents items as uncertain groups with tied latent ranks, while ordering the groups by strength. It is useful when pairwise data support broad tiers more convincingly than a distinct position for every item. Tied latent ranks are different from drawn or tied match outcomes.

## Key Ideas

- **Pool strengths explicitly.** In the BT-SBM formulation, membership $x_i=k$ assigns item $i$ strength $\lambda_k$. [[concepts/bradley-terry-scaling|Bradley-Terry Scaling]] then gives $P(i\succ j)=\lambda_{x_i}/(\lambda_{x_i}+\lambda_{x_j})$, equal to one half within a group.
- **Infer the grouping and its resolution.** A partition prior can make the number of occupied groups random. BT-SBM uses a Gnedin prior, which favors reinforcement of existing groups while allowing a random finite population of groups.
- **Distinguish modeling strategies.** Santi and Friel model partitions directly; their review contrasts this with Pearce and Erosheva's spike-and-slab fusion of strengths. These share a goal but use different prior constructions.
- **Keep uncertainty targets separate.** A modal group count, a decision-theoretic partition estimate, and membership probabilities answer different questions. Conditioning membership on a fixed group count suppresses uncertainty about that count.
- **Preserve the model's limits.** Grouping reduces ranking granularity but a scalar BT hierarchy remains transitive. Equal estimated strength is a modeling assumption, not proof of identical underlying ability or immunity to contextual effects.

## Important Papers

- [[papers/the-bradley-terry-stochastic-block-model|The Bradley-Terry Stochastic Block Model]]: learns tied strength groups with a Gnedin prior and augmented Gibbs updates, applied to ATP tennis.
- Pearce and Erosheva (2025), "Bayesian rank-clustering": the strength-fusion alternative discussed in the BT-SBM paper.

## Related Concepts

- [[concepts/bradley-terry-scaling|Bradley-Terry Scaling]]
- [[concepts/bayesian-partition-credible-balls|Bayesian Partition Credible Balls]]
