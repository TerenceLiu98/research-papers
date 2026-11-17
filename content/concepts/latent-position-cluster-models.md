---
title: Latent Position Cluster Models
type: concept
aliases:
  - Latent Position Cluster Model
  - LPCM
definition: Latent position cluster models combine distance-based network tie probabilities with a mixture distribution over actor positions to infer groups while retaining within-group relational heterogeneity.
tags:
  - latent-space-models
  - social-networks
  - bayesian-clustering
---

## Overview

Latent position cluster models place actors in a continuous social space and model their positions with a finite mixture. Proximity governs tie propensity; mixture components describe groups. This combines geometric cohesion with discrete clustering without requiring identical tie probabilities for all members of a group.

## Key Ideas

- Joint inference lets group structure inform positions while propagating positional uncertainty into membership estimates. Clustering point estimates afterward loses this exchange.
- Gaussian components with spherical, group-specific variances represent groups of different spread. The geometry and component family restrict the patterns that can be expressed.
- Membership probabilities quantify uncertainty about one latent group per actor. They do not encode the simultaneous memberships of mixed-membership models.
- Rotations, reflections, translations, and label permutations complicate posterior summaries. Alignment and relabelling are needed before averaging coordinates or interpreting groups.
- Selecting the number of groups differs from selecting latent dimension. Conditional BIC approximations need not equal fully integrated Bayesian model evidence.
- Cohesive clusters are not arbitrary structural roles: actors with similar connections to others need not themselves be connected. Distance-based models can struggle with that distinction.

## Important Papers

- [[papers/model-based-clustering-for-social-networks|Model-based clustering for social networks]]: introduces Gaussian-mixture latent positions, joint Bayesian estimation, and conditional cluster-number selection, illustrated with monastery and school networks.

## Related Concepts

- [[concepts/stochastic-block-models-with-covariates|Stochastic Block Models with Covariates]]: group-based network models with observed heterogeneity; continuous within-group geometry is a distinct modeling choice.
- [[concepts/dynamic-latent-space-models|Dynamic Latent Space Models]]: model temporal movement rather than only a static position distribution.
- [[concepts/joint-latent-space-models|Joint Latent Space Models]]: connect different observation types through positions; mixture clustering instead structures the distribution of those positions.
