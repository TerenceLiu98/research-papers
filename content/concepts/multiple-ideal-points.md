---
title: Multiple Ideal Points
type: concept
aliases:
  - Domain-Specific Ideal Points
tags:
  - ideal-point-estimation
  - legislative-behavior
  - bayesian-measurement
---

## Overview

Multiple ideal-point models allow a voter to occupy different positions across predetermined domains while measuring those positions on a common latent scale. In the clustering formulation of Moser, Rodríguez, and Lofland, domains share a position when they belong to the same voter-specific cluster. The model estimates both positions and which voters retain identical preferences across domains.

## Key Ideas

- **Partitions belong to voters:** Two issues may share an ideal point for one legislator and differ for another. Clusters group domains within an individual, not legislators into blocs.
- **Exact equality is estimable:** Discrete partitions give positive probability to equal domain positions, supporting posterior probabilities of sharp equality hypotheses. This differs from continuous shrinkage toward small offsets.
- **Stayers link scales:** A full stayer has one position across all domains. The cited formulation requires at least $D+1$ full stayers in a $D$-dimensional space while inferring their identities. Separate anchors fix the remaining scale indeterminacy.
- **Pooling follows inferred sharing:** Domains assigned to the same cluster contribute evidence about one position. Joint estimation can reduce uncertainty relative to fitting each domain separately.
- **Consistency is a posterior quantity:** Individual staying frequency is the posterior probability of being a full stayer. The posterior mean of average staying frequency averages these probabilities across voters.
- **Base-cluster deviance needs a reference:** The base cluster contains the largest number of votes. Issue staying is the probability of membership in it; issue deviance is the complement. Neither is automatically a causal measure of party or constituency influence.
- **Domains and dimensions differ:** The number of observed domains, the dimension of the common latent space, and a voter's number of distinct positions are separate choices or quantities. High fit from one conventional latent dimension need not imply identical positions across domains.
- **Comparability is conditional:** The common scale depends on the stayer restriction and valid domain coding. Separate session fits do not automatically make ideal-point values comparable over time.

## Important Papers

- [[papers/multiple-ideal-points-revealed-preferences-in-different-domains|Multiple Ideal Points: Revealed Preferences in Different Domains]]: develops constrained domain partitions and illustrates them with 17 policy domains across 18 U.S. Houses.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: supplies the response likelihood generalized to domain-specific positions.
- [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]]: represents domain dependence through topic-weighted offsets from a general position.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: addresses how many dimensions summarize political differences, a question distinct from domain consistency.
