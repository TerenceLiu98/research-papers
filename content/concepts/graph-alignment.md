---
title: Graph Alignment
type: concept
aliases:
  - Graph Matching
  - Network Alignment
tags:
  - graphs
  - graph-matching
  - optimal-transport
  - representation-learning
---

## Overview

Graph alignment finds correspondences between the nodes of two graphs while preserving node attributes and relational structure. Classical formulations optimize a permutation and are closely related to quadratic assignment. Relaxed formulations replace hard permutations with soft couplings, enabling approximate alignment through [[concepts/optimal-transport|Optimal Transport]] even when graph sizes or supports differ.

## Key Ideas

- **Node and structural evidence differ.** Node features support pointwise correspondence, while adjacency matrices or pairwise distances encode relational agreement. A useful objective may combine both rather than treating topology only as an encoder input.
- **Hard alignment is combinatorial.** A permutation-matrix formulation generally yields a quadratic assignment problem. Hungarian assignment solves linear assignment, but relational terms make the general graph problem harder.
- **Soft couplings relax correspondence.** Wasserstein objectives can align node representations through a cross-graph cost matrix. [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]] instead aligns internal pairwise relations and can compare graphs without a shared feature space.
- **The alignment goal depends on the task.** Entity matching seeks an interpretable correspondence; similarity learning may need only the optimized cost; anomaly detection can use unusually high alignment cost as a score.
- **Dynamic graphs turn alignment into temporal evidence.** When nodes retain their semantic roles but edge weights evolve, changes in alignment cost can reveal shifts in interaction structure. This interpretation still depends on whether learned edges faithfully represent the relations of interest.
- **Approximation choices matter.** Entropic regularization and Sinkhorn iterations improve computational tractability but change the optimized objective. Batch composition, marginal weights, regularization strength, and rounding can all affect the resulting plan.

## Important Papers

- Kuhn (1955), "The Hungarian Method for the Assignment Problem": foundational linear-assignment algorithm frequently used as a graph-matching component.
- Li et al. (2019), "Graph Matching Networks for Learning the Similarity of Graph Structured Objects": learns representations and cross-graph interactions for similarity prediction.
- [[papers/interdependency-matters-graph-alignment-for-multivariate-time-series-anomaly-detection|Interdependency Matters: Graph Alignment for Multivariate Time Series Anomaly Detection]]: combines Wasserstein node alignment and Gromov-Wasserstein edge alignment to score dynamic multivariate time-series graphs.
- [[papers/alignment-matters-inside-and-out-in-equivariant-graph-flow-matching|Alignment Matters Inside and Out in Equivariant Graph Flow Matching]]: separates within-pair node correspondence from assignment between graph samples in generative transport.

## Related Concepts

- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: a soft relational alignment based on distortion of pairwise geometry.
- [[concepts/optimal-transport|Optimal Transport]]: provides coupling-based relaxations and scalable entropic solvers.
- [[concepts/graph-quotient-alignment|Graph Quotient Alignment]]: distinguishes representative selection within graph pairs from coupling across graph samples.
- [[concepts/time-series-anomaly-detection|Time-Series Anomaly Detection]]: can use changing graph structure as anomaly evidence in multivariate sequences.
