---
title: Metric Learning from Limited Pairwise Preference Comparisons
type: paper
authors:
  - Zhi Wang
  - Geelon So
  - Ramya Korlakai Vinayak
year: null
tags:
  - metric-learning
  - preference-learning
  - pairwise-comparisons
  - subspace-models
---

## TL;DR

Fewer than $d$ pairwise comparisons per user cannot identify any part of a shared Mahalanobis metric for generic items in $\mathbb{R}^d$, even with infinitely many users. If items instead form sufficiently rich low-dimensional subspace clusters, a divide-and-conquer method can learn each restricted metric from few comparisons per user and reconstruct the full metric.

## Research Question

Can a shared unknown Mahalanobis metric in $\mathbb{R}^d$ be recovered from a large population when every user supplies only $o(d)$ pairwise preference comparisons and each user's ideal point is unknown?

## Motivation

The ideal-point model says that a user prefers whichever item is closer to their latent ideal point. Existing joint metric-and-preference methods amortize estimation of a shared metric across users, but still require on the order of $d$ answers from every user. That requirement is costly for high-dimensional embeddings and can create cognitive and privacy burdens. The paper asks whether a larger crowd can compensate for much thinner individual feedback.

## Contributions

- Proves an impossibility result for items with generic pairwise relations: with at most $d$ comparisons per user, every positive-definite Mahalanobis matrix can be paired with alternative user ideal points that produce the same unquantized observations. Adding users therefore supplies no metric information in this setting.
- Defines subspace-clusterable item sets and shows how low-dimensional structure changes identifiability. A user's off-subspace ideal point induces an equivalent "phantom" ideal point within the item subspace, reducing the local problem from ambient dimension $d$ to subspace dimension $r$.
- Characterizes exact recovery from unquantized observations. Items within each subspace must quadratically span it, and the collection of restricted subspace metrics must jointly determine the ambient symmetric matrix.
- Gives a two-stage estimator for noisy binary comparisons and bounds ambient-metric error in terms of local estimation error, estimator bias, and the conditioning of the operator that combines subspace restrictions.

## Method

The model represents the shared Mahalanobis distance by a positive-definite matrix $M$ and rewrites each preference measurement as a linear function of $M$ and a user-specific pseudo-ideal point. This exposes why generic comparisons cannot separate the shared matrix from newly introduced user parameters when each user supplies too few equations.

For structured items, the method partitions comparisons by low-dimensional subspaces $V_\lambda$. Within each subspace, it estimates the restricted metric $Q_\lambda=B_\lambda^\top M B_\lambda$ using existing simultaneous metric-and-preference learning machinery. It then reconstructs $M$ from all restricted metrics by least squares and projects the result onto the positive-semidefinite cone. The implementation uses robust Huber regression for reconstruction.

## Experiments

Synthetic experiments sample a Wishart ground-truth metric, random low-dimensional subspaces, Gaussian user ideal points, and logistic binary responses. The main experiments use one-dimensional subspaces with ambient dimensions up to 10 and average results over 30 runs.

- Recovery improves with more users and more comparisons per user; for one-dimensional subspaces, two comparisons per user can already give good empirical recovery in the tested setting.
- Error falls as the number of subspaces grows, with non-trivial recovery appearing once the number of one-dimensional subspaces exceeds the $d(d+1)/2$ degree-of-freedom threshold.
- The method remains effective when items lie near rather than exactly on their subspaces at low perturbation levels, but degrades as the structure disappears.
- Tests with misspecified response noise and with hinge loss instead of the assumed likelihood still produce reasonable recovery, suggesting some robustness to response-model misspecification.

## Limitations

The positive results require known subspace assignments and enough within-subspace comparisons to identify each local metric. Experiments are synthetic and use oracle-informed constraints for local estimation. Approximate subspace structure is examined empirically but lacks a theoretical guarantee, and performance deteriorates as subspace noise increases. Discovering the subspace clusters and validating the method on real embeddings with human feedback are left for future work.

## Related Concepts

- [[concepts/preference-based-metric-learning|Preference-Based Metric Learning]]
- [[concepts/subspace-clustering|Subspace Clustering]]
- [[concepts/statistical-identifiability|Statistical Identifiability]]
- [[concepts/deep-metric-learning|Deep Metric Learning]]

## Related Papers

- Canal et al. (2022), "One for All: Simultaneous Metric and Preference Learning over Multiple Users," provides the local estimator and the earlier $\Theta(d)$-comparisons-per-user result on which this paper builds.
- Xu and Davenport (2020), "Simultaneous Preference and Metric Learning from Paired Comparisons," introduced joint recovery of a metric and an ideal point in the single-user setting.
- Mason, Jain, and Nowak (2017), "Learning Low-Dimensional Metrics," studies metric recovery from comparison feedback under low-dimensional structure.

[[index|Library home]]
