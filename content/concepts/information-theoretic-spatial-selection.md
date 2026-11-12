---
title: Information-Theoretic Spatial Selection
type: concept
aliases:
  - Spatial Selection by Income
tags:
  - information-theory
  - income-segregation
  - urban-science
---

## Overview

Information-theoretic spatial selection quantifies how local trait distributions differ from an aggregate reference distribution. For urban income, it distinguishes the atypicality of a neighborhood from the spatial concentration of an income group and summarizes both through mutual information.

## Key Ideas

- The ratio $w(y,n)=p(y\mid n)/p(y)$ measures local enrichment or depletion relative to the city. Bayes’ theorem also expresses it as $p(n\mid y)/p(n)$.
- Neighborhood KL divergence measures the information lost when citywide income composition substitutes for local composition. Income-group KL divergence measures how that group’s residential distribution departs from the overall residential distribution.
- Averaging either divergence over its conditioning variable yields $I(Y;N)$. Zero mutual information means income and neighborhood are independent at the chosen resolution.
- Income inequality and spatial sorting are distinct: identical citywide income distributions can have different arrangements across neighborhoods.
- These measures depend on income bins and neighborhood definitions. They describe sorting; causal mechanisms require additional evidence. The replicator-equation analogy supplies a reweighting interpretation, not proof of rational choice or biological evolution.

## Important Papers

- [[papers/decoding-the-city-multiscale-spatial-information-in-urban-income-distributions|Decoding the city: multiscale spatial information in urban income distributions]]: develops the neighborhood, income-group, and citywide decomposition and applies it to US urban income distributions.

## Related Concepts

- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: addresses similarity across geographically related locations; distributional sorting measures need not incorporate adjacency or distance.
