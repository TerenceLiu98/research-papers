---
title: Induced Percolation
type: concept
aliases:
  - Indirect-Influence Percolation
tags:
  - percolation
  - social-contagion
  - critical-transitions
---

## Overview

Induced percolation is a network pruning process in which a node survives through an active neighbor that has sufficient active support of its own. The threshold applies to the intermediary's neighborhood, allowing next-nearest neighbors to affect the focal node through ordinary graph edges. Xie et al. motivate this mechanism using associations between scientists' collaboration neighborhoods and persistence in established research fields.

## Key Ideas

- **Support is stronger than activity.** All nodes start active. A node remains active only if at least one active incoming neighbor has at least $m$ active incoming neighbors. An active node need not be able to sustain another node. Iteration removes unsupported activity until a fixed point is reached.
- **Reciprocal links require care.** On an undirected graph, the supporting neighbor must have at least $m$ active neighbors excluding the focal node. Counting the focal node would change the mechanism.
- **The induced index is a maximum.** For empirical measurement, take the largest active-neighbor count among the focal node's active neighbors. This differs from summing all second-nearest contacts or measuring the focal node's direct degree.
- **Directionality changes the transition.** In the networks analyzed by Xie et al., undirected links yield continuous transitions, directed links yield discontinuous transitions for $m>1$, and mixed links can yield a continuous onset followed by a jump. The directed $m=1$ case recovers the bond-percolation comparison.
- **Connectivity and activity need distinct treatment.** The main order parameter is the giant out-component, reducing to the giant connected component on undirected networks. Surviving finite clusters also matter: their small-size distribution can be nonmonotonic even when its large-size power-law exponent is unchanged.
- **Mechanism and evidence have different scopes.** The empirical collaboration results motivate indirect support but do not by themselves identify causal influence. The threshold process is a deterministic theoretical idealization.

## Important Papers

- [[papers/indirect-influence-in-social-networks-as-an-induced-percolation-phenomenon|Indirect influence in social networks as an induced percolation phenomenon]]: introduces the rule, derives random-network self-consistency equations, and studies directionality and finite-cluster behavior alongside collaboration-network evidence.

## Related Concepts

- [[concepts/threshold-contagion|Threshold Contagion]]: thresholds a focal node's own exposure and commonly grows adoption from seeds; induced percolation thresholds an intermediary's support and prunes from full activity.
- [[concepts/higher-order-social-contagion|Higher-Order Social Contagion]]: models explicitly represented groups; indirect influence along graph paths does not require hyperedges or simplices.
