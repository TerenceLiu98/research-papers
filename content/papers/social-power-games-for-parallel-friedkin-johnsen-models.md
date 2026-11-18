---
title: Social Power Games for Parallel Friedkin-Johnsen Models
type: paper
authors:
  - Lingfei Wang
  - Yu Xing
  - Shijie Huang
  - Claudio Altafini
  - Karl Henrik Johansson
year: null
tags:
  - opinion-dynamics
  - game-theory
  - resource-allocation
---

## TL;DR

Agents allocate limited stubbornness across independent opinion discussions to maximize their total influence. The resulting constant-sum game has a Nash equilibrium despite boundary discontinuities, but equilibrium need not be unique. Additional network and monotonicity conditions ensure uniqueness; best-response dynamics can nevertheless oscillate.

## Research Question

When does strategic allocation of stubbornness across parallel Friedkin–Johnsen discussions admit a Nash equilibrium, when is it unique, and how should an agent respond to competitors’ allocations?

## Motivation

Influence competition often spans several simultaneous committees or platforms. Participants can change their own opinions while competing for leadership. Measuring their influence through the weights of initial opinions separates social power from the particular positions being discussed. A shared budget couples otherwise independent discussions.

## Contributions

- Proves convexity of each agent’s cost in her own allocation, while identifying discontinuity when a discussion has zero stubbornness.
- Establishes equilibrium existence by limits of games with positive minimum allocations (Theorem 2).
- Establishes conditional uniqueness through the cost pseudo-gradient and variational inequalities (Theorem 3).
- Gives explicit uniqueness conditions and an analytical best-response characterization for rank-one complete interaction networks.

## Method

Each discussion follows a Friedkin–Johnsen model with a fixed row-stochastic influence matrix, strong connectivity, and positive self-loops. Agent i chooses stubbornness values between zero and one whose sum across M discussions is at most a positive budget K_i < M. When a discussion has positive stubbornness, its limiting influence matrix is the inverse of I − (I − Θ)W multiplied by Θ. Agent i’s social power is the average of column i of that matrix, including influence on her own final opinion. Utilities sum this quantity over discussions; total utility across players equals M.

If everybody assigns zero stubbornness to a discussion, its DeGroot limit determines social power. A lone agent assigning arbitrarily small positive stubbornness then captures all its power, producing the boundary discontinuity in Proposition 2. Convexity therefore does not directly supply the usual continuous-game existence argument.

The existence proof imposes a minimum allocation δ > 0, obtains equilibria of the constrained games, and bounds their total stubbornness per discussion away from zero before taking a limit. For identical discussion networks, equal allocation K_i/M is an equilibrium (Proposition 4).

Uniqueness additionally requires at least two stubborn agents in every discussion at every equilibrium and positive definiteness of the symmetric Jacobian of the cost pseudo-gradient on profiles with that participation property. The proof combines constrained-game uniqueness with local sensitivity of variational inequalities. These are sufficient conditions, not a general uniqueness claim.

For rank-one matrices W_m = 1 c_mᵀ, all agents use the same influence weights within a discussion. Uniform weights and budgets K_i ≥ (M−1)/n imply a unique equal-allocation equilibrium (Theorem 4). For three agents, budgets K_i ≥ (M−1)/3 and 3c_i,m > ∑_{h≠i}c_h,m for every agent and discussion give another uniqueness guarantee (Theorem 5). Theorem 6 characterizes best responses by partitioning discussions into zero, partial, and full allocations; partial allocations equalize marginal social-power benefits.

## Experiments

Evidence is primarily theoretical, with synthetic examples rather than empirical negotiation data. Example 1 uses two players and five discussions with budgets 3.4 and 0.45. Two explicitly constructed equilibria, and all their convex combinations, demonstrate nonuniqueness: the stronger player can redistribute resources between discussions where the weaker player assigns nothing.

Example 2 uses five players and five discussions, equal budgets 1.2, and weights c_m = 0.5e_m + 0.1·1. From one initialization, best-response dynamics converge near the equilibrium matrix 0.1966I + 0.2007·11ᵀ, with rounded coefficients. A different initialization produces oscillations. Thus equilibrium existence does not establish convergence of repeated best responses.

## Limitations

- Discussions are independent, equally valued, and involve the same agents; networks remain fixed.
- Social power is a model-specific influence measure, not a general measure of political power or collective accuracy.
- General-network uniqueness conditions are difficult to verify; the explicit formulas exploit rank-one complete graphs.
- The paper supplies no general convergence guarantee for best-response dynamics.
- The supplied Markdown does not establish a publication year or stable manuscript identifier; these are not inferred from its references.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]]: initial-opinion anchoring determines influence in the underlying discussions.
- [[concepts/social-power-realization|Social Power Realization]]: shares the mapping from responsiveness to aggregation weights, but asks about implementing target weights rather than strategic competition.

## Related Papers

- [[papers/susceptibility-optimization-for-wisdom-of-crowds-a-social-power-reformulation-and-realization-framework|Susceptibility optimization for wisdom of crowds]] optimizes collective bias through realizable social-power weights; the present game instead maximizes each participant’s own influence.
- Wang et al. (2024), “Social power games in concatenated opinion dynamics” (reference 58), studies sequential discussions and early-mover advantage, unlike the independent parallel discussions here.
- Wang, Xing, Altafini, and Johansson (2024), “Maximizing social power in multiple independent Friedkin-Johnsen models” (reference 59), is the related ECC conference paper cited by the manuscript.
