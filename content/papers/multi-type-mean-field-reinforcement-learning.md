---
title: Multi Type Mean Field Reinforcement Learning
type: paper
authors:
  - Sriram Ganapathi Subramanian
  - Pascal Poupart
  - Matthew E. Taylor
  - Nidhi Hegde
year: 2020
venue: AAMAS 2020
tags:
  - multi-agent-reinforcement-learning
  - mean-field-games
---

## TL;DR

Multi-Type Mean Field Q-learning (MTMFQ) represents neighboring agents by separate action averages for different behavioral types. Across three MAgent games, the paper reports better eventual rewards than single-type mean-field and independent-learning baselines, including when types are inferred from recent actions.

## Research Question

Can mean-field reinforcement learning retain its scalability while representing groups with different strategies and objectives, including groups whose identities are initially unknown?

## Motivation

One neighborhood-wide action average can hide strategically important differences between opponents. Grouping similar agents preserves these differences without conditioning a value function on every individual's action.

## Contributions

- A multi-type mean-field Q-function and a Taylor-expansion argument relating approximation quality to within-type action deviations.
- Q-learning algorithms for known types and unknown types inferred by K-means clustering.
- Conditional convergence analysis and comparisons on three many-agent games.

## Method

The method implements [[concepts/multi-type-mean-field-reinforcement-learning|Multi-Type Mean Field Reinforcement Learning]]. For agent $j$, the approximate value function is

$$
Q^j(s,\mathbf a)\approx Q^j_{\mathrm{MTMF}}(s,a^j,\bar a^j_1,\ldots,\bar a^j_M).
$$

Each $\bar a^j_m$ averages one-hot actions among neighbors of type $m$. The derivation assumes an additive decomposition over subsets containing representatives of each type. Expanding around type means cancels first-order deviations; the remaining approximation depends on second-order terms. Theorems 3.1–3.3 compare deviation bounds and state an approximation bound under smoothness and decomposability assumptions.

The known-type algorithm uses supplied group memberships. The unknown-type algorithm initializes memberships randomly, stores recent actions in a fixed-length buffer, and repeatedly applies K-means with a chosen number of clusters. It therefore infers memberships, not the number of types. Both variants train Q-networks using replay, temporal-difference targets, and target networks, with Boltzmann action selection.

Theorem 3.4 reports convergence within a bounded distance of Nash Q-values under infinite visitation, bounded rewards, greedy-in-the-limit exploration, and strong stage-game equilibrium assumptions. This is a conditional analytical result, not an unconditional guarantee for the neural implementation.

## Experiments

Section 5 compares MTMFQ against Mean Field Q-learning (MFQ), Mean Field Actor-Critic (MFAC), and Independent Q-learning (IL). Training lasts 2,000 episodes against groups trained with the same algorithm; subsequent competitions pit different algorithms against each other. The authors report averages over 50 repetitions and note substantial run-to-run variance.

| Domain | Type information and evaluation | Reported result |
| --- | --- | --- |
| Multi Team Battle | Known teams; four groups of 72 agents; 1,000 competition games, at most 500 steps each | MTMFQ achieves a 60% win rate and higher final training rewards. |
| Battle-Gathering | Known teams; fighting plus competition for food | Reported convergence around 1,500 episodes for MTMFQ versus around 1,800 for the alternatives. |
| Predator Prey | Unknown types; two predator groups of 45 and two prey groups of 90; 800 competition games with role assignments rotated every 200 | MTMFQ is comparable or weaker during the first 600 training episodes, then achieves higher rewards; reported convergence around 1,300 versus 1,700 episodes. |

Winning is determined by the group or groups with the most surviving agents. Predator-prey action differences make clustering comparatively easy: prey move more, while predators attack more. Reported convergence times describe observed learning curves.

## Limitations

Multiple type summaries cost more computation than a single mean field and may not improve results in a homogeneous population. Unknown-type performance depends on behavioral clustering and a supplied cluster count. Agents with different action spaces are left for future work. The evidence comes from three constructed MAgent environments rather than real-world deployments.

The supplied Markdown contains extraction artifacts and references Appendices A–C that are not included. Detailed supplementary proofs and reward specifications cannot be reconstructed from this source alone.

## Related Concepts

- [[concepts/multi-type-mean-field-reinforcement-learning|Multi-Type Mean Field Reinforcement Learning]]: preserves behavioral heterogeneity through separate local action averages.
- [[concepts/graphon-mean-field-games|Graphon Mean Field Games]]: a distinct approach that represents heterogeneity through network labels and interaction kernels.

## Related Papers

- Yang et al. (2018), *Mean Field Multi-Agent Reinforcement Learning*: the single-type mean-field formulation extended here and the source of MFQ/MFAC baselines (reference 17).
- Hu and Wellman (2003), *Nash Q-learning for general-sum stochastic games*: supplies equilibrium assumptions used in the convergence argument (reference 7).
