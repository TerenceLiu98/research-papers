---
title: Graphons
type: concept
aliases:
  - Graphon
tags:
  - network-models
  - graph-limits
  - stochastic-block-models
---

## Overview

A graphon is a measurable kernel $W:[0,1]^2\to[0,1]$ representing interactions between a continuum of labels. It can describe a stochastic network formation model: sample labels uniformly, then connect pairs with probabilities specified by the kernel. Graphons also arise as limits of dense graph sequences. Symmetric kernels describe undirected interactions; the contagion framework of Erol, Parise, and Teytelboym also permits asymmetric kernels.

## Key Ideas

- **Labels encode heterogeneity.** A label can represent a community, location, or other characteristic governing connection probabilities. Labels with identical incoming and outgoing kernel profiles have the same interaction type.
- **Familiar models are special cases.** A constant kernel gives an Erdos-Renyi model. A kernel constant on block pairs gives a stochastic block model. Continuously varying kernels can represent infinitely many types.
- **Integrals replace neighbor sums.** The quantity $d(u,X)=\int_X W(u,v)\,dv$ is interaction mass with labels in $X$. This allows a continuum process to be studied before drawing a finite network.
- **Process approximation needs additional conditions.** A graphon representation alone does not guarantee stable dynamics. Threshold contagion needs regularity and appropriate strict margins to resolve infected and uninfected regions.
- **Intervention can target types.** Optimizing community seed allocations may avoid observing every edge. Implementation still requires the relevant model parameters and information about agents' types.
- **Density is a scope condition.** Fixed-kernel sampling describes a dense-network regime; conclusions do not automatically transfer to sparse-network models.

## Important Papers

- [[papers/contagion-in-graphons|Contagion in graphons]]: defines continuum threshold dynamics, proves qualified sampled-network approximation results, and derives structured seeding policies.
- Parise and Ozdaglar (2023), "Graphon games: a statistical framework for network games and interventions": related network-game framework cited by Erol et al.

## Related Concepts

- [[concepts/threshold-contagion|Threshold Contagion]]: a discontinuous adoption process whose approximation depends on threshold margins.
- [[concepts/network-games|Network Games]]: strategic interactions that can be modeled across a continuum of network types.
- [[concepts/stochastic-block-models-with-covariates|Stochastic Block Models with Covariates]]: related models combining group structure and observed heterogeneity in link probabilities.
