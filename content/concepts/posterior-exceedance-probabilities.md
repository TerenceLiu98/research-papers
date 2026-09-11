---
title: Posterior Exceedance Probabilities
type: concept
aliases:
  - Exceedance Probabilities in Disease Mapping
tags:
  - bayesian-modeling
  - spatial-statistics
  - disease-cluster-detection
---

## Overview

A posterior exceedance probability measures the probability that an unknown quantity exceeds a chosen threshold, conditional on observed data and a Bayesian model. In disease mapping, $\Pr(\lambda_i>c\mid Y)$ measures posterior evidence that an area's relative risk exceeds $c$. A continuous risk surface supports the same calculation at individual locations.

## Key Ideas

- Two thresholds serve different roles: $c$ defines the risk level of interest, while $d$ sets the posterior probability required for classification. A rule such as $\Pr(\lambda_i>1\mid Y)>0.7$ flags evidence of above-baseline risk.
- The rule incorporates the posterior distribution rather than classifying only a posterior mean. Its interpretation remains conditional on the likelihood, covariates, spatial effects, and priors.
- Areal models classify complete regions. [[bayesian-spatial-disaggregation|Bayesian Spatial Disaggregation]] makes the same criterion available continuously in space and permits partial-area clusters.
- A pointwise posterior threshold is not itself a guarantee of a specified probability of any false cluster across a map. Cell-level specificity and dataset-level type I error measure different aspects of detection.
- In Moraga and Alahmadi's simulation, the rule with $c=1$ and $d=0.7$ produces no-cluster false-positive rates of 0.18 for disaggregation and 0.10 for an areal model, versus 0.05 for each scan baseline. These are results for that design and threshold, not universal properties of exceedance probabilities.

## Important Papers

- [[bayesian-spatial-disaggregation-modeling-for-the-detection-of-disease-clusters|Bayesian spatial disaggregation modeling for the detection of disease clusters]]: applies the criterion to continuous and areal relative risks and compares detection errors.
- Richardson et al. (2004), "Interpreting posterior relative risk estimates in disease-mapping studies," cited by the cluster-detection paper for exceedance-based risk interpretation.

## Related Concepts

- [[bayesian-spatial-disaggregation|Bayesian Spatial Disaggregation]]: inferring a continuous surface from aggregated observations.
- Bayesian disease mapping: estimating relative risks while borrowing information across areas.
- Spatial scan statistics: a comparator based on hypothesis tests over candidate cluster windows.
