---
title: Nonatomic Routing Games
type: concept
aliases:
  - Wardrop Routing Games
  - Nonatomic Selfish Routing
tags:
  - routing-games
  - algorithmic-game-theory
  - congestion
---

## Overview

Nonatomic routing games model a divisible population choosing paths through a congested network. Each traveler has negligible individual influence on congestion, but aggregate path choices determine edge latencies. Each origin-destination pair is a commodity with a fixed demand.

## Key Ideas

- **Equilibrium:** every used path for a commodity has minimum latency among all available paths for that commodity. No infinitesimal traveler can improve travel time by switching routes.
- **System optimum:** a planner minimizes total latency $C(f)=\sum_e f_e\ell_e(f_e)$, which can assign unequal travel times to users in the same commodity.
- **Marginal costs:** for differentiable latencies with convex $x\ell_e(x)$, system-optimal flows are equilibrium flows under $\hat\ell_e(x)=\ell_e(x)+x\ell'_e(x)$. The additional term represents congestion imposed on others.
- **Fairness-constrained routing:** a constrained system optimum minimizes total latency subject to an unfairness cap. Loaded, average, and equilibrium-relative unfairness use different references and yield different feasible sets.
- **Used-path equality is weaker than equilibrium:** a routing plan can give every assigned traveler the same latency while leaving a faster alternative unused. Fairness one under a used-path measure therefore does not imply equilibrium.
- **Path decomposition matters:** different path assignments can induce the same edge loads while differing in travelers' experienced latency disparities.
- **Parallel links are a special case:** one commodity chooses among edges joining two nodes. Some support and strict-improvement results valid in this setting fail on general networks.

## Important Papers

- [[papers/average-unfairness-in-routing-games|Average Unfairness in Routing Games]]: analyzes how fairness definitions affect system-optimal and constrained-optimal flows.
- Roughgarden and Tardos (2002), "How bad is selfish routing?": cited equilibrium and efficiency foundation in that paper.
- Jahn et al. (2005), "System-Optimal Routing of Traffic Flows with User Constraints in Networks with Congestion": cited foundation for fairness-constrained routing.

## Related Concepts

- [[concepts/average-unfairness-in-routing|Average Unfairness in Routing]]: compares mean latency with the fastest used route within each commodity.
