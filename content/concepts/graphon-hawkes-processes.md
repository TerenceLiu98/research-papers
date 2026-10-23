---
title: Graphon Hawkes Processes
type: concept
aliases:
  - Graphon Hawkes Process
tags:
  - graphons
  - hawkes-processes
  - spatiotemporal-point-processes
  - continuous-space-models
---

## Overview

A graphon Hawkes process is a self-exciting point process on continuous time and space. A measurable kernel $W(x,y)$ determines how an event at source location $y$ changes the future event intensity at target location $x$, while a temporal kernel $h$ determines how that excitation decays. It replaces the finite interaction matrix of a multivariate Hawkes process with a continuously indexed network.

## Key Ideas

- **Continuous interaction structure:** The intensity $\lambda(t,x)=\nu(x)+\sum_{t_i<t}W(x,x_i)h(t-t_i)$ separates spatially varying baseline activity, spatial source-target interaction, and temporal excitation.
- **Graphons need not play only a graph-limit role:** Here the [[concepts/graphons|graphon]] directly parameterizes interaction strength over a spatial domain. It may be asymmetric because source and target locations have different roles.
- **Basis expansions make inference finite:** Expanding $\nu$, $W$, and $h$ in truncated bases converts functional estimation into coefficient estimation. Approximation quality and the interpretation of sparsity consequently depend on the selected bases and truncation levels.
- **Sparse coefficients define an effective network:** Penalizing graphon coefficients can identify which spatial interaction modes are active. Support recovery concerns these population coefficients, not individual neuron-to-neuron edges or a basis-invariant causal network.
- **Stability constrains excitation:** As in other linear Hawkes models, the combined spatial and temporal excitation operator must remain subcritical for a stationary process to exist.
- **Continuous marks can avoid arbitrary bins:** Location, depth, or another continuous mark can index the process directly, although discretely recorded locations may still require an explicit observation model or preprocessing.

## Important Papers

- [[papers/graphon-hawkes-processes-sparse-estimation-and-network-recovery|Graphon Hawkes Processes: Sparse Estimation and Network Recovery]]: gives a penalized least-squares estimator, non-asymptotic error bounds, coefficient-support recovery, simulations, and an Allen Neuropixels application.
- Baars, Laeven, and Mandjes (2026), "Spatiotemporal Hawkes Processes with a Graphon-Induced Connectivity Structure" (arXiv:2409.16903v2): introduces graphon Hawkes processes and their relation to high-dimensional multivariate Hawkes systems.

## Related Concepts

- [[concepts/graphons|Graphons]]: continuous kernels representing heterogeneous pairwise interactions.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: flexible Bayesian estimation of triggering kernels rather than graphon-structured spatial connectivity.
- [[concepts/dynamic-hawkes-processes|Dynamic Hawkes Processes]]: models time-varying community responsiveness instead of a continuously indexed spatial interaction kernel.
- [[concepts/discrete-time-hawkes-processes|Discrete-Time Hawkes Processes]]: represents events as binned counts rather than a continuous-space point pattern.
