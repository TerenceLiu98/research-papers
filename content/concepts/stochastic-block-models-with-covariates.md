---
title: Stochastic Block Models with Covariates
type: concept
aliases:
  - Covariate-Dependent Stochastic Block Models
tags:
  - stochastic-block-models
  - network-analysis
  - nonparametric-estimation
---

## Overview

A stochastic block model with covariates represents links using both observed node characteristics and latent community membership. In the nonparametric formulation studied by Kitamura and Laage, $B_{gh}(x,x')$ gives the connection probability between communities $g$ and $h$ at covariate values $x$ and $x'$, while $\pi_g(x)$ gives the probability of belonging to community $g$. Allowing both functions to vary with covariates permits dependence between observed and unobserved heterogeneity.

## Key Ideas

- **Two distinct probability objects.** Variation in observed connectivity can reflect changing community composition, changing connection probabilities conditional on communities, or both. Estimating $B$ and $\pi$ keeps these mechanisms distinct within the model.
- **Local block structure.** Smooth probability functions can be approximated within nearest-neighbor neighborhoods. Spectral clustering of the local network supplies group estimates for subsequent local averaging.
- **Separate row and column representations.** Neighborhoods around two covariate values need not contain the same nodes. The resulting adjacency submatrix can be asymmetric even when the full network is undirected, motivating left and right singular vectors.
- **Error propagation.** Probability estimates inherit classification mistakes in addition to smoothing bias and sampling variation. Guarantees depend on local sample sizes, expected degrees, covariate dimension, and separation of the population spectral structure.
- **Labels require alignment.** Independently recovered local groups carry arbitrary labels. Interpreting a diagonal entry as a within-community probability, or comparing one group's probabilities across covariate values, requires matching labels. Invariant probability rankings or conditional assortativity can supply additional identifying restrictions.
- **Association is not intervention.** Flexible conditional link probabilities do not by themselves establish causal effects of changing covariates.

## Important Papers

- [[papers/estimating-stochastic-block-models-in-the-presence-of-covariates|Estimating Stochastic Block Models in the Presence of Covariates]]: develops local spectral clustering and nearest-neighbor probability estimators with non-asymptotic bounds, and explains the label-matching problem. The supplied version provides theoretical evidence without experiments.

## Related Concepts

- [[concepts/social-network-analysis|Social Network Analysis]]: the broader study of relational structure, including latent communities and observed node attributes.
