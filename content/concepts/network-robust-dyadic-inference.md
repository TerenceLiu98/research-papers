---
title: Network-Robust Dyadic Inference
type: concept
aliases:
  - Network-Robust Variance Estimation for Dyadic Data
definition: "Inference for dyadic regressions that accounts for residual dependence between indirectly connected pairs by weighting score covariances using distances on an observed network of dyads."
tags:
  - dyadic-data
  - network-inference
  - variance-estimation
---

## Overview

Dyadic observations are indexed by pairs of individuals, countries, or other units. Sharing a member is one source of dependence, but shocks can also propagate between disjoint pairs through intermediate connections. Network-robust dyadic inference represents these paths explicitly when estimating regression uncertainty.

## Key Ideas

- Construct a graph whose vertices are active dyads and whose edges join dyads sharing an individual. Adjacency and indirect connectivity imply different covariance restrictions.
- Estimate a sandwich covariance from residual score cross-products, weighted by graph distance and a chosen kernel bandwidth. Disconnected pairs do not contribute under the model.
- Consistency requires an appropriate observed, exogenous network and restrictions balancing dependence decay against network growth, alongside moment and regression-design conditions.
- Conventional dyadic-robust estimators can fail when omitted distant covariance remains non-negligible in aggregate. They can remain suitable when those contributions vanish.
- This is an uncertainty-estimation procedure conditional on identification of regression coefficients. It does not by itself identify a causal peer effect.

## Important Papers

- [[papers/inference-in-linear-dyadic-data-models-with-network-spillovers|Inference in Linear Dyadic Data Models with Network Spillovers]] (Canen and Sugiura, 2023): develops the dyad-network construction, asymptotic results, and kernel covariance estimator, with simulation and legislative-voting evidence.

## Related Concepts

- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: both require explicit representations of cross-sectional dependence, with different underlying distance structures.
- [[concepts/network-specific-spillover-effects|Network-Specific Spillover Effects]]: concerns causal attribution to a network channel, a distinct task from correcting regression uncertainty for network dependence.
