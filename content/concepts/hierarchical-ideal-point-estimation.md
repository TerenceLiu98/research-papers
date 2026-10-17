---
title: Hierarchical Ideal-Point Estimation
type: concept
aliases:
  - Allysets and Votesets
tags:
  - ideal-point-estimation
  - bayesian-measurement
  - correlated-voting
---

## Overview

Hierarchical ideal-point estimation represents structured dependence in voting through groups of actors and groups of items. In Lu and Wang's formulation, allysets allow actor groups such as parties to have different thresholds for the same bill, while votesets allow each actor to have different, correlated positions across issue areas. This hierarchy concerns actor and item dependence rather than a hierarchy of higher-order ideological factors.

## Key Ideas

- **Two grouping directions:** An allyset groups actors who tend to vote together; a voteset groups bills or cases across which an actor's decisions are related. Both are specified using substantive information.
- **A probit response model:** $\Pr(y_{ij}=1)=\Phi(a_j\theta_{i,d(j)}-b_{p(i),j})$ combines a voteset-specific position with an allyset-specific threshold. The signed $a_j$ determines how position relates to support for each item.
- **Correlated random effects:** Multivariate Normal distributions for positions and thresholds estimate cross-voteset and cross-allyset covariance. Named issue areas need not be orthogonal dimensions.
- **Identification still matters:** Location, scale, and orientation require constraints. Substantive actor anchors support ideological labeling; grouping items alone does not identify the latent scale.
- **Useful nested formulations:** One allyset and one voteset recover the standard model. Extensions can express a general position plus voteset deviations or a common item threshold plus group deviations, with zero deviations for independent items or actors.
- **Interpretation depends on assumptions:** Group-dependent thresholds capture patterned voting conditional on the model. Attributing them to causal party influence requires evidence beyond fit. The number of votesets is also distinct from the effective number of independent ideological dimensions.
- **Model comparison is conditional:** Posterior predictive checks, DIC, and predictive errors help compare proposed groupings. Missing-vote assumptions, prior shrinkage, and the selected agenda remain relevant to inference.

## Important Papers

- [[papers/understanding-complex-legislative-and-judicial-behaviour-via-hierarchical-ideal-point-estimation|Understanding complex legislative and judicial behaviour via hierarchical ideal point estimation]]: develops the allyset/voteset model, demonstrates simulated recovery, and applies it to party dependence in the House and issue variation in the Supreme Court.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: supplies the latent actor-item response framework.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: distinguishes named issue groups from independent axes of preference.
- [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]]: models topic-weighted deviations from a general position.
- [[concepts/multiple-ideal-points|Multiple Ideal Points]]: a related domain model that estimates exact sharing of positions through voter-specific partitions.
- [[concepts/hierarchical-latent-trait-models|Hierarchical Latent Trait Models]]: models higher-order factors among traits, a different use of hierarchy.
