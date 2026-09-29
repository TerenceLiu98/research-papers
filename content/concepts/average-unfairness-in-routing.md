---
title: Average Unfairness in Routing
type: concept
aliases:
  - Average Routing Unfairness
tags:
  - routing-games
  - fairness
  - constrained-optimization
---

## Overview

Average unfairness compares the flow-weighted mean latency with the minimum latency among used routes for the same origin-destination commodity. It measures average latency-ratio envy toward the best-served traveler, rather than the largest disparity between two travelers.

## Key Ideas

- For demand $r_i$, total commodity latency $C_i(f)$, and minimum used-path latency $m_i(f)$, the measure is $U^A(f)=\max_i C_i(f)/(r_i m_i(f))$. Averaging occurs within each commodity, followed by a maximum across commodities.
- For finite ratios, average unfairness is strictly below loaded unfairness whenever within-commodity used-path latencies differ. Both equal one when every commodity's used paths have equal latency. This does not rule out a faster unused route.
- The reference is a used path, not necessarily the shortest available route. Path support and assignment matter even when aggregate edge flows and total latency agree.
- In differentiable latency classes with convex $x\ell(x)$ and all constant functions, worst-case average unfairness at system optima equals the marginal-to-private-latency steepness bound. For nonnegative-coefficient polynomials of degree at most $n$, this supremum is $n+1$.
- Replacing a loaded-unfairness cap with the same numerical average-unfairness cap enlarges the feasible set and cannot raise optimal total latency. It also weakens the guarantee to the worst-served user.
- Strict cost improvement is conditional. For positive tolerance on parallel links, it occurs unless the loaded-constrained optimum already achieves the system optimum. General networks can have equal constrained costs above the system optimum.
- Average unfairness and user-equilibrium unfairness answer different questions and have no general ordering. The latter uses equilibrium latency as its baseline and can be below one.
- Zero minimum latency requires care: $0/0=1$ handles all-zero travel costs, but positive average latency divided by zero is outside finite-ratio comparisons.

## Important Papers

- [[papers/average-unfairness-in-routing-games|Average Unfairness in Routing Games]]: introduces the measure, proves the steepness bound, compares fairness notions, and studies constrained system optima.

## Related Concepts

- [[concepts/nonatomic-routing-games|Nonatomic Routing Games]]: the flow model underlying the fairness and efficiency comparisons.
