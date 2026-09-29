---
title: Joint Latent Space Models
type: concept
tags:
  - latent-space-models
  - social-networks
  - ranking-data
  - bayesian-inference
---

## Overview

Joint latent space models connect multiple kinds of observations through shared unobserved positions. For rankings and networks, an individual's position can determine both preferences over items and the probability of links to other individuals. This lets both observation types inform the same latent features while preserving distinct likelihoods for rankings and ties.

## Key Ideas

- **Two geometries in one space.** In Gu and Yu's model, item-vector projections determine mean preference utilities, while Euclidean distances between individuals determine network tie probabilities. Similar positions therefore imply similar preference tendencies and a higher probability of connection.
- **Conditional independence is an assumption.** Dependence between observation types is mediated by the shared features. Residual association after fitting can indicate that the shared representation is insufficient; a non-significant diagnostic does not prove sufficiency.
- **Joint estimation differs from sequential fitting.** Estimating positions from rankings alone or from a network alone and then holding those estimates fixed discards feedback from the second likelihood. Whether joint fitting helps must be evaluated for the data and task.
- **Similarity and sociability are distinct.** Individual network intercepts allow a node to form many ties without forcing its position to be close to everyone. Directed variants can separate sender and receiver effects and account for reciprocity.
- **Geometry requires identification conventions.** Transformations can preserve rankings or distances, making raw coordinates ambiguous. Centering, orientation, and covariance restrictions must be tied to the chosen model; interpretable axes do not follow automatically from good fit.
- **Association does not identify influence.** A shared representation can capture preference-network correlation without determining whether tastes drive connections or connections change tastes. Ranking fit, network fit, held-out prediction, and residual checks answer different questions.

## Important Papers

- [[papers/joint-latent-space-models-for-ranking-data-and-social-network|Joint latent space models for ranking data and social network]]: shares Gaussian individual features between a wandering-vector ranking model and a latent-distance network model, with Bayesian estimation and a posterior predictive residual check.
- Hoff, Raftery, and Handcock (2002), "Latent Space Approaches to Social Network Analysis": the network-model foundation cited by Gu and Yu.
- Yu and Chan (2001), "Bayesian Analysis of Wandering Vector Models for Displaying Ranking Data": the ranking-model foundation cited by Gu and Yu.

## Related Concepts

- [[concepts/social-network-analysis|Social Network Analysis]]: network geometry and node heterogeneity.
- [[concepts/social-trust-networks|Social Trust Networks]]: relational data that can be coupled with preference observations.
- [[concepts/plackett-luce-model|Plackett-Luce Model]]: an alternative ranking family; the Gu-Yu model uses Gaussian utility errors instead.
- [[concepts/stochastic-block-models-with-covariates|Stochastic Block Models with Covariates]]: a distinct way to combine latent network structure with node information through discrete communities.
