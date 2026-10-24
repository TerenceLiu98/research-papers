---
title: Z-Gromov-Wasserstein Distance
type: concept
aliases:
  - Z-GW Distance
  - Z-GW
tags:
  - optimal-transport
  - metric-measure-geometry
  - attributed-networks
---

## Overview

Z-Gromov-Wasserstein distance compares probability spaces whose pairwise relations take values in a common metric space $Z$. It extends [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]] from real-valued distance or affinity kernels to curves, distributions, matrices, time-varying distances, edge attributes, and other metric-valued relations.

## Key Ideas

- A $Z$-network is a triple $(X,\omega_X,\mu_X)$ with probability measure $\mu_X$ and measurable kernel $\omega_X:X\times X\to Z$. The kernel need not itself be a metric, symmetric, or scalar-valued.
- Z-GW minimizes the $L^p$ discrepancy $d_Z(\omega_X(x,x'),\omega_Y(y,y'))$ over couplings of $\mu_X$ and $\mu_Y$. Choosing $Z=\mathbb R$ recovers standard GW; product target spaces encode node, edge, and structural attributes in one kernel.
- The distance is a true metric on networks modulo weak isomorphism, meaning that both kernels agree almost everywhere after measure-preserving pullback to a common probability space. Optimal couplings exist under the paper's separable metric-space setting.
- The quotient network space inherits important structure from $Z$: it is separable, is complete exactly when $Z$ is complete, and is geodesic when $Z$ is geodesic. For finite $p$, it is path-connected and contractible even when $Z$ is not.
- Kernel-value distributions, eccentricities, and sizes yield tractable lower bounds. A bounded target can be approximated by mapping each $z\in Z$ to its distances from finitely many landmarks, reducing comparison to an $\mathbb R^n$-valued GW problem with Hausdorff-error control under the $\ell^\infty$ metric.
- The construction does not cover every structural discrepancy. Nonmetric losses and the graphon cut norm aggregate kernel values differently and require a broader framework.

## Important Papers

- [[papers/the-z-gromov-wasserstein-distance|The Z-Gromov-Wasserstein Distance]] (Bauer, Needham, Nishino, and Mémoli): defines the framework; proves its metric, topological, and approximation results; and organizes its principal examples.
- Mémoli (2011), "Gromov-Wasserstein Distances and the Metric Approach to Object Matching": foundational scalar-valued GW theory recovered as a special case.
- Vayer et al. (2020), "Fused Gromov-Wasserstein Distance for Structured Objects": node-attributed GW variant represented through a product target space.
- Yang, Labeau, and d'Alche-Buc (2023), "Exploiting Edge Features in Graphs with Fused Network Gromov-Wasserstein Distance": closely related node- and edge-attributed network comparison.

## Related Concepts

- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: the real-valued-kernel special case.
- [[concepts/optimal-transport|Optimal Transport]]: provides couplings and Wasserstein subproblems used in the definition and lower bounds.
- [[concepts/graphons|Graphons]]: kernel-based network limits whose cut distance is related but not itself a Z-GW distance.
- [[concepts/geodesic-distance|Geodesic Distance]]: geodesics in the target space induce geodesics between Z-networks.

