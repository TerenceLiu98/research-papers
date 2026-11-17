---
title: Bipartite Link Community Models
type: concept
aliases:
  - Bipartite Link Community Model
  - biLCM
definition: "Bipartite link community models represent interaction counts between two node types as sums of community-specific Poisson counts, allowing overlapping actor memberships and several community contributions within a dyad."
tags:
  - network-analysis
  - community-detection
  - mixed-membership
---

## Overview

Bipartite link community models describe weighted relations between two disjoint node sets. Communities contribute additive interaction intensities, so an actor can participate in several communities and a pair of actors can interact through several of them.

## Key Ideas

- The mean interaction count is $\lambda_{ij}=\sum_z\kappa_z\alpha_{iz}\beta_{jz}$. Each term is a nonnegative community contribution.
- Actor weights normalize across actors within each community. Actor-specific membership distributions instead require normalizing activity-weighted participation across communities.
- Mixed membership and mixed interaction are distinct: the first concerns an actor's range of participation; the second concerns multiple latent contributions to one dyad's count.
- EM apportions observed counts among communities and updates their intensities. Random restarts address sensitivity to local optima without guaranteeing the global maximum.
- Entropy of normalized activity shares measures participation breadth. Deviations from fitted counts flag dyads for investigation but do not identify their causes.
- The basic formulation requires a chosen community count and does not include covariates or temporal evolution.

## Important Papers

- [[papers/mapping-political-communities-a-statistical-analysis-of-lobbying-networks-in-legislative-politics|Mapping Political Communities]]: develops the probabilistic bipartite formulation and uses it to distinguish specialist and generalist participation in legislative lobbying.

## Related Concepts

- [[concepts/social-network-analysis|Social Network Analysis]]: the broader framework for studying relational structure.
- [[concepts/stochastic-block-models-with-covariates|Stochastic Block Models with Covariates]]: related community models that incorporate observed heterogeneity; additive link-community decomposition is a different modeling choice.
