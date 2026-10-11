---
title: Threshold Contagion
type: concept
aliases:
  - Linear Threshold Contagion
tags:
  - social-contagion
  - network-dynamics
  - optimal-seeding
---

## Overview

Threshold contagion models adoption when the weighted influence of adopting neighbors passes an agent-specific threshold. In the irreversible deterministic formulation used by Erol, Parise, and Teytelboym, initial seeds remain infected and other agents adopt only when the infected fraction of their neighborhood strictly exceeds their threshold. Multiple exposures can therefore be necessary, making both seed placement and network structure consequential.

## Key Ideas

- **The inequality convention matters.** Strict exceedance leaves an agent uninfected at equality. Small fluctuations in sampled links can change this outcome, even when the continuum prediction lies exactly at a threshold.
- **Adoption is cumulative.** With permanent infection, infected sets grow monotonically. Finite networks stabilize after finitely many additions; continuum processes can require infinitely many steps.
- **Cohesion prevents contagion.** A set is protected when outside infection provides insufficient influence to activate its members. A strict margin makes this protection robust to sampling fluctuations in the graphon results.
- **Budgets define different problems.** Max-reach maximizes final adoption for a seed budget. Min-seed minimizes the seed mass needed to achieve a target. An infimum need not be attained when activation requires a strict inequality.
- **Critical mass is model dependent.** For a constant positive graphon and common threshold $\tau$, seed mass above $\tau$ infects the entire continuum in one step; mass at or below $\tau$ produces no new infection. Other kernels can produce multistep cascades.
- **Structural reductions are conditional.** Block-constant interactions and thresholds allow communities to be tracked together. For continuous types, normalized homophily can preserve infected intervals, while a further single-crossing condition restricts their possible final shapes.

## Important Papers

- [[papers/contagion-in-graphons|Contagion in graphons]]: develops continuum approximation, cohesive-set guarantees, and optimal seeding for structured kernels.
- Granovetter (1978), "Threshold models of collective behavior": foundational formulation cited in that paper.
- Morris (2000), "Contagion": cohesive-set analysis cited in the graphon noninfection results.

## Related Concepts

- [[concepts/graphons|Graphons]]: stochastic network models that support a continuum formulation of threshold dynamics.
- [[concepts/higher-order-social-contagion|Higher-Order Social Contagion]]: requiring several adopting neighbors on a graph differs from explicitly modeling joint group interactions.
- [[concepts/network-games|Network Games]]: binary coordination provides a strategic interpretation of threshold responses.
