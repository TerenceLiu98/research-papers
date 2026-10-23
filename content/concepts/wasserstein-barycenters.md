---
title: Wasserstein Barycenters
type: concept
aliases:
  - Wasserstein Barycenter
  - Free-Support Wasserstein Barycenters
tags:
  - optimal-transport
  - wasserstein-barycenters
  - probability
---

## Overview

A Wasserstein barycenter averages probability measures using transport geometry. Given measures $\mu^i$ and positive weights $\lambda_i$ summing to one, it minimizes $\sum_i\lambda_i W_p^p(\nu,\mu^i)$ over the output measure $\nu$. For $p=2$, this is a weighted Frechet mean in Wasserstein space. With $p=1$, the corresponding objective is a metric-median objective.

## Key Ideas

- **Support is part of the problem.** Fixed-support methods choose masses on predetermined locations; free-support methods also allow output locations to vary. A mixture of input measures generally differs from a transport barycenter.
- **Sparse solutions can still be hard to find.** For finite discrete inputs with support sizes $n_i$, an optimal solution can be chosen with at most $\sum_i n_i-N+1$ atoms. This existence bound does not remove the general computational hardness or the combinatorial size of multi-marginal formulations.
- **Barycentric relocation gives a practical approximation.** Compute transport plans from a reference measure to the inputs, then move each reference atom to a weighted mean of its transport destinations for $p=2$, or a geometric median for $p=1$. Exact relocation with optimal plans does not increase the objective, but repeated updates can stop at a suboptimal fixed point.
- **Reference choice trades sparsity against accuracy.** A single input reference needs $N-1$ pairwise OT solves and produces at most that input's number of atoms. Averaging the relocated results for all references needs $N(N-1)/2$ distinct solves and at most $\sum_i n_i$ atoms. In von Lindheim's analysis, the latter gives a factor-2 objective bound for $p=2$, with an additional geometric-median accuracy factor for $p=1$.
- **Instance-specific certification can beat a worst-case bound.** For $p=1,2$, the weighted sum $\sum_{i<j}\lambda_i\lambda_jW_p^p(\mu^i,\mu^j)$ lower-bounds the optimal barycenter objective. Comparing it with a feasible transport-cost upper bound certifies approximation quality when the lower bound is positive.
- **Transport plans can be reused.** In the pairwise construction, input-to-input plans remain valid when barycenter weights change, making repeated distribution interpolation cheaper after the initial solves.

## Important Papers

- [[papers/simple-approximative-algorithms-for-free-support-wasserstein-barycenters|Simple approximative algorithms for free-support Wasserstein barycenters]] (von Lindheim, 2023): analyzes single-step reference and pairwise algorithms, worst-case bounds, and computable error certificates.
- [[papers/heterogeneous-federated-reinforcement-learning-using-wasserstein-barycenters|Heterogeneous Federated Reinforcement Learning Using Wasserstein Barycenters]]: applies Wasserstein barycenters to layerwise neural-network aggregation in distributed MNIST training and heterogeneous federated CartPole control.
- Agueh and Carlier (2011), "Barycenters in the Wasserstein space": foundational work cited by von Lindheim.
- Cuturi and Doucet (2014), "Fast computation of Wasserstein barycenters": computational framework cited by von Lindheim.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]: supplies the distances and couplings used in the barycenter objective.
- [[concepts/tree-wasserstein-distance|Tree-Wasserstein Distance]]: changes the ground geometry to a tree, offering a distinct route to cheaper transport computations.
