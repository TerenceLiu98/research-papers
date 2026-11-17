---
title: Multiple-Membership Multilevel Models
type: concept
aliases:
  - Multiple Membership Multilevel Model
  - MMMM
definition: "Multilevel models in which an observation belongs to several groups and receives a weighted contribution from each group's random effect."
tags:
  - multilevel-modeling
  - clustered-data
---

## Overview

Multiple-membership models represent observations connected to several groups rather than nested in exactly one. A government may include several parties, and a party may recur in many governments. Reusing group random effects represents dependence between observations with overlapping memberships.

## Key Ideas

For a random contribution $b_i=\sum_k w_{ik}u_k$ with independent group effects of variance $\sigma_u^2$, conditional covariance is

$$
\operatorname{Cov}(b_i,b_j)=\sigma_u^2\sum_k w_{ik}w_{jk}.
$$

Greater weighted overlap induces stronger dependence. Separate hierarchical components can represent additional nesting, such as governments within countries.

Conventional specifications impose membership weights. Rosche’s coalition extension jointly aggregates observed party predictors and random effects, estimating weights from member-specific covariates. This separates the structural association from the construction of the aggregate predictor. Normalized weights describe weighted averages; sums require a different scaling restriction. Estimated weights need sufficient variation and an identifiable model.

Modeling shared membership addresses residual dependence but does not itself identify causal effects or remove covariate–random-effect confounding.

## Important Papers

- [[papers/a-multilevel-model-for-coalition-governments-uncovering-party-level-dependencies-within-and-between-governments|A Multilevel Model for Coalition Governments]] (Rosche, 2026): extends the framework with systematic-effect aggregation and covariate-dependent weights, validated in simulations and a coalition-survival application.
- Goldstein (2011), *Multilevel Statistical Models*: the foundational framework cited by Rosche.

## Related Concepts

- [[concepts/within-and-between-cluster-covariate-effects|Within- and Between-Cluster Covariate Effects]]: distinguishes covariate contrasts and clarifies assumptions about their association with random effects.
