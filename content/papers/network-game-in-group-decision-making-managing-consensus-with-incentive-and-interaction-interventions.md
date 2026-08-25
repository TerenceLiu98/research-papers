---
title: "Network Game in Group Decision Making: Managing Consensus with Incentive and Interaction Interventions"
type: paper
authors:
  - Ningning Lang
  - Lin Wang
  - Quanbo Zha
year: 2025
doi: "10.1016/j.ejor.2025.07.058"
tags:
  - group-decision-making
  - consensus-reaching
  - network-games
  - peer-effects
  - incentive-intervention
  - social-networks
---

## TL;DR

This paper models preference adjustment in a group consensus-reaching process as a network game. Decision makers receive incentives to adjust their preferences, while positive peer effects transmit adjustment motivation through interaction links and a global congestion term represents competition for limited incentive resources. The resulting equilibria depend on network position, incentive rates, and the resource budget. Two equilibrium adjustment-enabled consensus models then steer the group toward soft consensus by minimally changing interaction links or incentive rates.

## Research Question

How can a moderator use peer effects and targeted incentives to encourage interactive decision makers to adjust their preferences toward consensus while respecting their individual utility concerns?

## Motivation

Traditional consensus mechanisms often prescribe preference adjustments through feedback or optimization, treating decision makers as independent and assuming that the moderator can compel compliance. This can produce over-adjustment, under-adjustment, low acceptance, or concerns about fairness and practicability. The paper instead treats adjustment as a strategic choice: decision makers pursue their own utility, observe connected peers, and respond to incentives supplied by an external entity.

## Contributions

- Formulates preference adjustment as an `n`-player network game with local strategic complements or substitutes and global strategic substitution from limited incentives.
- Derives equilibrium adjustments for heterogeneous and homogeneous incentive rates and relates homogeneous-case adjustments to Bonacich centrality.
- Shows that positive peer effects can amplify total adjustment under homogeneous incentives, while the effect under heterogeneous incentives depends on incentive-rate distribution and network structure.
- Develops two equilibrium adjustment-enabled consensus models (EACMs) that minimize changes to interaction links or incentive rates subject to a soft-consensus constraint.
- Uses numerical examples and simulations to examine budget shifts, network density, incentive heterogeneity, and the relative behavior of complementarity and substitutability games.

## Method

The group of decision makers is represented by a graph with adjacency matrix `A`. Let `p_i` be an original preference, `\bar{p}_i` its adjusted value, and `x_i = |\bar{p}_i - p_i|` the adjustment magnitude. Decision maker `i` has incentive rate `\alpha_i`, and the moderator has a total budget `R` satisfying `\sum_i \alpha_i x_i \leq R`.

The utility function is linear-quadratic:

`U_i = \alpha_i x_i - x_i^2/2 + \varphi \sum_j a_{ij}x_jx_i - \gamma \sum_{j \ne i}x_jx_i`.

The first two terms represent the reward and diminishing psychological cost of personal adjustment. The parameter `\varphi` controls local peer effects: positive values produce strategic complements and negative values produce strategic substitutes. The parameter `\gamma > 0` captures global competition for limited incentive resources. The paper analyzes simultaneous utility maximization under both homogeneous incentive rates (HMIC) and heterogeneous incentive rates (HTIC).

For the NGC with heterogeneous incentives, the equilibrium has the form `X* = \theta[(1-\gamma)I - \varphi A + \gamma U]^{-1}\alpha` when the stated spectral-radius condition holds. The utilization factor `\theta` captures whether the budget binds. Under homogeneous incentives, the equilibrium is proportional to `[(1-\gamma)I - \varphi A]^{-1}1`, which the paper identifies with a Bonacich-centrality vector up to a scalar. A benchmark game removes local peer effects so that equilibrium adjustments depend on incentive rates and global congestion but not on network structure.

The link-intervention EACM minimizes the adjacency-matrix distance between the original and modified networks while requiring equilibrium-adjusted preferences to lie within `\varepsilon` of a weighted-average group preference. The incentive-intervention EACM minimizes `\sum_i |\bar{\alpha}_i - \alpha_i|` under the same consensus constraint.

## Experiments

The numerical study models 15 residents negotiating elevator installation in an aging residential building. Original preferences are generated uniformly on `(0, 1)`, a weighted-average operator aggregates them, and the main settings use `R = 10`, `\gamma = 0.001`, `\varphi = 0.05` or `-0.05`, and a soft-consensus threshold of `0.1` or `0.15`.

For minimum link intervention, the homogeneous-incentive complementarity case requires 13 link changes at threshold `0.15`, while the substitutability case requires 1. With heterogeneous incentives, the reported minima are 22 and 2 changes for complementarity at thresholds `0.1` and `0.15`, and 3 and 1 for substitutability. In the heterogeneous-incentive EACM at threshold `0.1`, the minimum total incentive-rate adjustment is `0.0562` for complementarity and `0.0288` for substitutability. In these examples, heterogeneous incentives enlarge the feasible adjustment patterns, and substitutability generally requires fewer interventions.

Simulations show a budget shift: below a game- and incentive-specific threshold, equilibrium adjustments increase with the budget; above it, they remain unchanged. Under homogeneous incentives, complementarity produces larger adjustments as network density increases, while substitutability produces smaller adjustments. Under heterogeneous incentives, adjustment levels become more uneven and their relationship with density depends on incentive placement. The minimum link-intervention total generally rises with density under complementarity and falls under substitutability; minimum incentive intervention rises roughly with the average rate under complementarity and is U-shaped under substitutability.

## Limitations

The model assumes that decision makers are myopic rational utility maximizers, that their payoff functions are known, and that the moderator can target interventions. The main exposition uses one alternative, a fixed interaction structure, and positive peer effects as its primary case. The numerical evaluation uses synthetic preferences and network settings rather than empirical negotiation data, and the nonlinear EACMs are illustrated computationally rather than solved with a general closed-form method. The authors identify incomplete-information games, irrationality, signed networks, and dynamic groups or interactions as directions for future work.

## Related Concepts

- [[Network Games]]
- [[Consensus Reaching in Group Decision Making]]
- [[Opinion Dynamics]]
- Peer effects
- Bonacich centrality
- Soft consensus

## Related Papers

- Ballester, Calvo-Armengol, and Zenou (2006), "Who's Who in Networks. Wanted: The Key Player."
- Jackson and Zenou (2015), "Games on Networks."
- Dong et al. (2018), "Consensus Reaching in Social Network Group Decision Making: Research Paradigms and Challenges."
- Zhang et al. (2020), "An Overview on Feedback Mechanisms with Minimum Adjustment or Cost in Consensus Reaching in Group Decision Making."
- Lang, Zha, and Wang (2023), "Competitive Targeted Marketing in Social Networks with Switching Topology: Seed Selection and Consensus Shaping."
