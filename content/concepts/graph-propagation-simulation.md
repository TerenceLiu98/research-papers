---
title: Graph Propagation Simulation
type: concept
aliases:
  - Network Propagation Simulation
  - Mechanism-Based Propagation Models
tags:
  - network-science
  - graph-propagation
  - monte-carlo
  - simulation
---

## Overview

Graph propagation simulation models how node states evolve through local interactions on a network. Transition rules can represent infection, recovery, activation, threshold adoption, opinion exchange, or changes to the graph itself. Stochastic models commonly require many Monte Carlo trajectories to estimate expected spread, uncertainty, or final-state distributions.

## Key Ideas

- A mechanism-based model specifies a graph, node-state space, random variables and parameters, an update schedule, and a local state-transition rule. Its claims are conditional on those mechanisms rather than learned directly from historical outcomes.
- Simulation cost compounds across Monte Carlo trials, time steps, nodes, and incident edges. Sparse graph storage, vectorized operations, and parallel execution target different parts of this cost.
- Local transition rules can often be expressed through [[concepts/neural-message-passing|Neural Message Passing]]: construct edge messages, aggregate them at target nodes, and update node states synchronously. This is an execution pattern and does not require a learned graph neural network.
- Independent Monte Carlo trajectories can be stacked into batched tensors. Batching preserves separate random draws while amortizing operator overhead, but useful batch size is bounded by memory capacity, bandwidth, and scheduling costs.
- Distributed execution must balance edge work while controlling communication. Keeping all incoming edges for a target node in one partition permits local aggregation, after which updated node states can be synchronized.
- Fidelity and speed are separate evaluation targets. Agreement in aggregate outcomes supports an implementation for tested settings, while runtime comparisons also depend on hardware, batch size, trial count, convergence rules, and whether reported times were directly measured or extrapolated.

## Important Papers

- [[papers/fs-gplib-breaking-the-web-scale-barrier|FS_GPlib: Breaking the Web-Scale Barrier - A Unified Acceleration Framework for Graph Propagation Models]]: combines tensorized synchronous updates, batched Monte Carlo execution, and target-node partitioning for 29 propagation models.
- Rossetti, Milli, and Rinzivillo (2018), "NDlib: a Python Library to Model and Analyze Diffusion Processes over Complex Networks."
- Miller and Ting (2020), "EoN (Epidemics on Networks): a Fast, Flexible Python Package for Simulation, Analytic Approximation, and Analysis of Epidemics on Networks."
- Robson, Reddy, and Umrawal (2024), "CyNetDif: A Python Library for Accelerated Implementation of Network Diffusion Models."

## Related Concepts

- [[concepts/neural-message-passing|Neural Message Passing]]
- [[concepts/opinion-dynamics|Opinion Dynamics]]
- [[concepts/bounded-confidence-models|Bounded Confidence Models]]
- [[concepts/misinformation-spreading-models|Misinformation Spreading Models]]
- [[concepts/effective-distance-in-network-contagion|Effective Distance in Network Contagion]]
