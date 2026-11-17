---
title: Recurrent Structural Policy Gradient for Partially Observable Mean Field Games
type: paper
authors:
  - Clarisse Wibault
  - Johannes Forkel
  - Sebastian Towers
  - Tiphaine Wibault
  - Juan Duque
  - George Whittle
  - Andreas Schaab
  - Yucheng Yang
  - Chiyuan Wang
  - Maike Osborne
  - Benjamin Moll
  - Jakob Foerster
year: null
tags:
  - mean-field-games
  - reinforcement-learning
  - partial-observability
---

## TL;DR

Recurrent Structural Policy Gradient (RSPG) combines a shared recurrent encoding of public observations with analytic expectations over individual transitions. On three mean-field game benchmarks, the authors report roughly an order-of-magnitude faster convergence than sample-based RL and anticipatory behavior unavailable to memoryless policies. The supplied manuscript does not establish a publication year or stable paper identifier.

## Research Question

Can history-dependent policies retain the variance reduction of structural policy gradients in mean-field games with common noise and partial observations, without tracking an exponentially growing distribution over individual histories?

## Motivation

Common shocks make population distributions stochastic. Private histories can then carry information about the hidden aggregate state, making exact population updates over arbitrary history-dependent policies intractable. Model-free recurrent RL accommodates memory but forgoes known transition structure. Public information offers a tractable intermediate setting.

## Contributions

- RSPG restricts recurrence to shared public observations, retaining a mean field over individual states.
- A taxonomy separates dynamic programming, model-free RL, and hybrid structural methods by their use of transition knowledge and sampling.
- MFAX provides JAX environments with analytic or sample-based population updates, common noise, partial observations, and multiple initial distributions.

## Method

A GRU encodes public observation history once per environment timestep; its embedding is broadcast across individual states. The policy conditions on the current individual state and that embedding. Analytic population propagation integrates actions and individual transitions, while common-noise trajectories are sampled. Backward return evaluation differentiates through policy-weighted rewards and individual transition expectations; population updates and environment reward values are stopped from receiving gradients (Appendix B.1).

Two assumptions are distinct: observations must be shared, and the current individual state plus public history must contain all payoff-relevant information about the aggregate state otherwise available from private history. Only under this sufficiency condition does the restricted policy class preserve an optimal response to exogenous population behavior.

MFAX evaluates sparse transition operations functionally instead of materializing a dense state-transition matrix, with stated storage scaling of $O(|S|+|S||A|)$. Continuous action policies are represented by densities evaluated and renormalized on an action grid.

## Experiments

Comparisons use SPG with an MLP, independent PPO, recurrent independent PPO, and M-OMD. Linear Quadratic and Beach Bar use 100 states and horizons of 30; Macroeconomics uses a 200-by-5 wealth/income grid and horizon 128. Figure 2 reports 95% confidence intervals over 10 seeds on NVIDIA L40S GPUs.

RSPG attains the lowest or second-lowest reported exploitability across all three environments. SPG and RSPG converge about ten times faster than the sample-based methods. Recurrent policies anticipate possible Beach Bar closure and increase consumption near the macroeconomic episode's end. SPG achieves similar macroeconomic exploitability without that anticipatory behavior.

Evaluation uses a larger perfect-information response class and sampled common-noise paths. Its reported exploitability is therefore a conservative regret-like upper bound, not an exact distance to a partially observable Nash equilibrium.

For a 100-state, 7-action Linear Quadratic update, Table 2 reports 0.000298 seconds for MFAX analytic updates, 0.000435 for sample updates, 0.00544 for OpenSpiel, and 0.358 for MFGLib. Measurements average 90 updates after 10 warm-up steps and exclude compilation. An action-representation ablation favors discretized continuous densities over categorical logits in Macroeconomics.

## Limitations

No Nash-equilibrium convergence guarantee is provided. Known individual dynamics and tractable state/action integration are central requirements. Shared observations alone do not establish informational sufficiency: Appendix A constructs a case where private history yields reward 1 while current state and public history yield only 1/2. Common-noise sampling remains a variance source, and lower gradient variance need not reduce final performance variation across seeds. Behavioral evidence comes from three finite-horizon environments.

## Related Concepts

- [[concepts/hybrid-structural-methods-for-mean-field-games|Hybrid Structural Methods for Mean Field Games]]: the analytic-individual, sampled-aggregate decomposition underlying RSPG.
- [[concepts/graphon-mean-field-games|Graphon Mean Field Games]]: a distinct extension retaining network-position heterogeneity, whereas this work focuses on shared uncertainty and observation history.

## Related Papers

- Yang et al. (2025), *Structural reinforcement learning for heterogeneous agent macroeconomics*: the SPG predecessor extended here with public-history recurrence.
- Ni et al. (2021), *Recurrent model-free RL can be a strong baseline for many POMDPs*: recurrent RL background for the RIPPO comparison.
- Yongacoglu et al. (2024), *Mean-field games with finitely many players: independent learning and subjectivity*: convergence results for memoryless policies with shared aggregate observations, contrasted with this paper's recurrent setting.
