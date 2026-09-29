---
title: Within- and Between-Cluster Covariate Effects
type: concept
aliases:
  - Within-Between Covariate Decomposition
tags:
  - mixed-models
  - longitudinal-data
  - clustered-data
---

## Overview

Within-cluster effects describe associations with variation among observations in the same cluster. Between-cluster effects describe associations with differences across clusters. In longitudinal data, individuals can be clusters: change over visits and differences between individuals then answer different questions.

## Key Ideas

A covariate can be decomposed into its cluster mean and deviation from that mean:

$$
x_{it}=\bar x_i+(x_{it}-\bar x_i).
$$

Including both components permits distinct between- and within-cluster coefficients. A purely between-cluster covariate is constant within each cluster; a purely within-cluster covariate varies internally but has the same average across clusters. Many observed covariates contain both kinds of variation.

- **Different comparisons:** Hospital type is a between-hospital covariate; a shared pre/post measurement schedule provides a within-hospital contrast. A person's repeatedly measured BMI can contain both components.
- **Different robustness:** In the random-intercept settings reviewed by McCulloch and Neuhaus (2011), within-cluster effects are especially robust to misspecifying the random-intercept distribution. Between-cluster comparisons share a level of variation with random intercepts and can incur greater efficiency loss or bias.
- **Covariate dependence:** Separating components or using conditional likelihood can eliminate or reduce within-effect bias from random-effects association with covariates under appropriate conditions. Decomposition does not guarantee validity for arbitrary confounding or model errors.
- **Random slopes change the argument:** A within-cluster covariate may also have a random slope. Misspecifying that slope distribution can affect its corresponding fixed coefficient, so random-intercept robustness should not be extended automatically.
- **Interpretation:** These are statistical contrasts. A within-cluster comparison alone does not establish a causal effect.

## Important Papers

- [[papers/misspecifying-the-shape-of-a-random-effects-distribution-why-getting-it-wrong-may-not-matter|Misspecifying the Shape of a Random Effects Distribution: Why Getting It Wrong May Not Matter]]: uses this distinction to organize robustness results and compare within- and between-cluster coefficients in simulations.
- Neuhaus and McCulloch (2006), "Separating between and within-cluster covariate effects using conditional and partitioning methods": identified in the 2011 review as a treatment of covariate dependence and bias reduction.

## Related Concepts

- [[concepts/random-effects-distribution-misspecification|Random Effects Distribution Misspecification]]: explains why assumptions about latent heterogeneity can affect the two contrasts differently.
