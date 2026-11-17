---
title: Dyadic Cluster-Robust Inference
type: concept
aliases:
  - Dyadic Clustering
  - Dyadic Cluster-Robust Standard Errors
  - DCRSEs
definition: "Regression inference allowing error covariance between observations whose dyads share any member, while imposing zero covariance between disjoint dyads."
tags:
  - dyadic-data
  - variance-estimation
---

## Overview

Dyadic observations represent pairs of units. A country appearing in several pairs can induce correlated regression errors across those observations. Dyadic cluster-robust inference accounts for this overlap, including repeated observations over time, when estimating coefficient uncertainty.

## Key Ideas

- Clustering only by repeated pair allows within-pair dependence but excludes dependence between different pairs sharing one member.
- A dyadic sandwich estimator retains residual cross-products whenever the corresponding pairs share a member. Under the undirected restriction, the member's position within the pair is irrelevant.
- Positive omitted covariance can make conventional standard errors too small, but an increase is not guaranteed in every sample.
- Validity requires suitable asymptotic conditions. Small samples can produce unstable variance estimates.
- Covariance correction does not establish causal identification, and disjoint-pair spillovers require a different dependence model.

## Important Papers

- [[papers/dyadic-clustering-in-international-relations|Dyadic Clustering in International Relations]]: applies the correction to 22 studies and documents substantial average standard error inflation, while most originally significant findings remain significant.
- Aronow, Samii, and Assenova (2015), “Cluster–Robust Variance Estimation for Dyadic Data”: methodological foundation used by that reanalysis.

## Related Concepts

- [[concepts/network-robust-dyadic-inference|Network-Robust Dyadic Inference]]: models indirect dependence between disjoint pairs using a network of dyads; its scope differs from shared-member clustering.
