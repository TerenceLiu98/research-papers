---
title: Plackett-Luce Model
type: concept
aliases:
  - PL Model
tags:
  - statistical-ranking
  - discrete-choice
  - pairwise-comparisons
---

## Overview

The Plackett-Luce model assigns probabilities to rankings by selecting objects sequentially, with each selection proportional to the strengths of the remaining objects. It extends [[concepts/bradley-terry-scaling|Bradley-Terry Scaling]] from pairs to ranked subsets while retaining a shared latent utility for each object.

## Key Ideas

- **Sequential choice.** For a ranking $i_1\succ\cdots\succ i_k$ with utilities $u_i$, its probability is $\prod_{r=1}^{k-1}e^{u_{i_r}}/\left(\sum_{s=r}^{k}e^{u_{i_s}}\right)$. For two objects this reduces to BT.
- **Choice consistency.** The relative choice probability of two objects does not depend on the other available objects. This independence of irrelevant alternatives makes estimation tractable but limits representation of context-dependent substitution.
- **Random utilities.** Ordering utilities perturbed by independent identically distributed standard Gumbel noise produces a PL ranking.
- **Partial observations.** Observing only the top positions calls for a marginal likelihood over compatible full rankings. Breaking a ranking into pairwise outcomes provides another estimation route, but those outcomes are dependent; a pairwise quasi-likelihood is not the original joint likelihood.
- **Comparison structure.** Hyperedges encode which subsets were compared. Utility location constraints and connectivity matter, and graph heterogeneity affects estimation and uncertainty. Identifiability alone does not ensure a finite unregularized MLE.
- **Computation and heterogeneity.** Minorization-maximization and iterative spectral methods fit a single model. Mixtures accommodate distinct preference populations but introduce label ambiguity, further identification issues, and nonconcave optimization.

These distinctions are synthesized in Sections 2-5 of the survey below. In particular, rank uncertainty requires more than asymptotic normality for individual utility estimates.

## Important Papers

- [[papers/recent-advances-in-the-bradley-terry-model-theory-algorithms-and-applications|Recent advances in the Bradley-Terry model: theory, algorithms, and applications]]: reviews PL modeling, likelihood and spectral estimators, mixtures, and graph-dependent inference.
- Hunter (2004), "MM algorithms for generalized Bradley-Terry models": cited in the survey for iterative likelihood fitting, including PL.
- Han and Xu (2025), "A unified analysis of likelihood-based estimators in the Plackett-Luce model": cited in the survey for consistency and asymptotic inference on heterogeneous graphs.

## Related Concepts

- [[concepts/bradley-terry-scaling|Bradley-Terry Scaling]]: the pairwise special case.
