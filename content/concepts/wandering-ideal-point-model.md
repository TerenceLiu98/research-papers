---
title: Wandering Ideal Point Model
type: concept
aliases:
  - WIP model
  - Wandering ideal-point model
tags:
  - paired-comparisons
  - multidimensional-unfolding
  - ideal-point-models
  - stochastic-transitivity
---

## Overview

The wandering ideal point (WIP) model is a probabilistic multidimensional unfolding model for paired comparisons. Alternatives occupy fixed positions in a shared Euclidean space, while a decision maker's ideal point is a random draw that can change from one comparison to the next. The closer alternative is chosen on each trial. This trial-level variation makes choice probabilities depend on both alternatives' proximity to the mean ideal point and their separation from one another.

## Key Ideas

- **The ideal point wanders by trial:** Subject $i$ draws $\mathbf{Y}_i\sim N(\boldsymbol{\mu}_i,\boldsymbol{\Sigma}_i)$ for each presented pair. Fixed stimulus locations share the same space, and the nearer stimulus wins.
- **Pairwise choice has a probit form:** Comparing squared Euclidean distances reduces the event to a linear inequality in the Gaussian ideal point, so $p_{ijk}=\Phi(z_{ijk})$. The denominator of $z_{ijk}$ is the covariance-weighted distance between stimuli.
- **Similarity changes decisiveness:** Holding distances to the mean ideal point fixed, nearby alternatives can generate more extreme probabilities and distant alternatives more moderate probabilities. A scalar utility difference alone therefore does not determine choice strength.
- **Transitivity is moderate, not necessarily strong:** If $j$ tends to beat $k$ and $k$ tends to beat $l$, the model ensures $p(j,l)$ is at least the smaller of those probabilities. It need not be at least the larger probability, which distinguishes it from strong stochastic-transitivity models.
- **Geometry creates nonidentification:** Common translations, orthogonal rotations, and positive rescaling do not change probabilities. In the single-subject case the mean can be placed at the origin and the covariance diagonalized, but scale and rotation constraints still determine the effective parameter count.
- **Covariance describes directional instability:** The eigenvalues of $\boldsymbol{\Sigma}_i$ measure how much an ideal point wanders along each dimension. An isotropic restriction assumes equal variation in every direction and reduces model complexity.
- **Estimation uses paired-comparison likelihoods:** Replicated judgments yield a binomial likelihood. Fisher scoring can estimate stimulus coordinates and wandering variances, with a Moore-Penrose generalized inverse handling the rank-deficient information matrix.

## Important Papers

- [[papers/the-wandering-ideal-point-model-a-probabilistic-multidimensional-unfolding-model-for-paired-comparisons-data|The Wandering Ideal Point Model: A Probabilistic Multidimensional Unfolding Model for Paired Comparisons Data]]: introduces the model, proves moderate stochastic transitivity, develops maximum-likelihood estimation, and presents an empirical illustration.
- Carroll (1980), "Models and methods for multidimensional analysis of preferential choice (or other dominance) data": introduces the wandering vector model on which the WIP construction is patterned.
- Zinnes and Griggs (1974), "Probabilistic, multidimensional unfolding analysis": provides a contrasting stochastic multidimensional unfolding formulation.

## Related Concepts

- [[concepts/euclidean-preferences|Euclidean Preferences]]: supplies the fixed ideal-point proximity rule made stochastic by the WIP model.
- [[concepts/discrete-choice-unfolding-models|Discrete-Choice Unfolding Models]]: uses probabilistic utilities to represent nonmonotonic latent responses in a different observed-choice setup.
- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]: explains one source of observational equivalence in spatial configurations.
- Moderate stochastic transitivity
- Strong stochastic transitivity
- Paired comparisons
