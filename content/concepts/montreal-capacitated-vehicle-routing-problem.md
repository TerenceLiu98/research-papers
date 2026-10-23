---
title: Montreal Capacitated Vehicle Routing Problem
type: concept
aliases:
  - MCVRP
  - Montreal CVRP
tags:
  - vehicle-routing
  - combinatorial-optimization
  - fixed-graph-learning
---

## Overview

The Montreal Capacitated Vehicle Routing Problem is a CVRP setting in which every instance is drawn from the same fixed, finite graph of potential customer locations. A daily instance activates only a subset of those locations and assigns demands to them. This differs from common synthetic CVRP benchmarks, where each instance can place customers at entirely new coordinates.

## Key Ideas

- **Persistent node identity:** A potential address retains the same identity across instances. Learned models can therefore associate a stable token or embedding with each location.
- **Subgraph instances:** Each routing problem consists of the depot and a sampled subset of the fixed graph's customer nodes. Every active customer must be visited once while each route respects vehicle capacity.
- **Amortized local structure:** Repeated instances can expose recurring spatial and routing patterns in one service region, allowing a model to reuse information across days.
- **Restricted generalization:** Varying the active subset, its size, demand, or capacity does not test transfer to a different underlying graph. Performance within one fixed graph should not be read as city-to-city generalization.

## Important Papers

- Bengio, Lodi, and Prouvost (2021), "Machine Learning for Combinatorial Optimization: a Methodological Tour d'Horizon": gives the formal fixed-graph Montreal problem formulation cited by later work.
- [[papers/learning-to-deliver-a-foundation-model-for-the-montreal-capacitated-vehicle-routing-problem|Learning to Deliver: a Foundation Model for the Montreal Capacitated Vehicle Routing Problem]] models fixed node IDs as a vocabulary and learns route sequences from heuristic labels.

## Related Concepts

- [[concepts/neural-combinatorial-optimization|Neural Combinatorial Optimization]]: learned policies and generative models for discrete optimization problems.
