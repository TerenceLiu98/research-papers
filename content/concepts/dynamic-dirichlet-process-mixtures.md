---
title: Dynamic Dirichlet Process Mixtures
type: concept
aliases:
  - Dynamic DP Mixtures
tags:
  - bayesian-nonparametrics
  - dynamic-clustering
---

## Overview

Dynamic Dirichlet process mixtures extend Bayesian nonparametric clustering to observations indexed by time. They permit changes in occupied groups and their memberships while linking adjacent periods. Different constructions place temporal dependence on assignments, mixing weights, or component parameters; these choices imply different forms of continuity.

## Key Ideas

Xiang and Shiraito's intergenerational Chinese restaurant construction links repeated observations of the same units through two mechanisms. A unit directly inherits its preceding cluster with probability $p$. Otherwise, it draws from mixture weights informed by all cluster counts in the previous period:

$$
\Pr(g_{it}=k\mid g_{i,t-1},q^t,p)
=p\mathbf{1}\{g_{i,t-1}=k\}+(1-p)q_k^t.
$$

- Reassignment can return a unit to its old cluster. The total retention probability is $p+(1-p)q_{g_{i,t-1}}^t$.
- Setting $p=0$ removes direct inheritance but preserves dependence through previous-period cluster counts. It does not produce independent cross-sectional partitions.
- This construction shares component parameters across time. It represents change through movement among behavioral profiles, allowing asynchronous transitions and changes in occupied group counts.
- A large finite truncation makes blocked Gibbs sampling feasible; the truncation bound is distinct from the inferred number of occupied clusters.
- [[concepts/posterior-co-clustering-probabilities|Posterior Co-Clustering Probabilities]] can summarize within-period alignments and, when cluster identities are shared over time, associations between observations from different periods.
- Persistent clusters describe regularities under the chosen likelihood and prior. They do not establish causal influence or coordinated action among their members.

## Important Papers

- [[papers/a-dynamic-dirichlet-process-mixture-model-for-the-partisan-realignment-of-civil-rights-issues-in-the-us-house-of-representatives|A Dynamic Dirichlet Process Mixture Model for the Partisan Realignment of Civil Rights Issues in the U.S. House of Representatives]]: develops the intergenerational construction and combines four legislative activity types to track state-party alignments.
- Caron, Davy, and Doucet (2012), "Generalized Polya Urn for Time-varying Dirichlet Process Mixtures": compared by Xiang and Shiraito with their use of all preceding assignments rather than a retained subset.

## Related Concepts

- [[concepts/dirichlet-process-mixtures|Dirichlet Process Mixtures]]: static mixture foundation and uncertainty over occupied cluster counts.
- [[concepts/posterior-co-clustering-probabilities|Posterior Co-Clustering Probabilities]]: summaries that avoid interpreting arbitrary cluster labels.
