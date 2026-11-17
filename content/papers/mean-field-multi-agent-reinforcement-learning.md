---
title: Mean Field Multi-Agent Reinforcement Learning
type: paper
authors:
  - Yaodong Yang
  - Rui Luo
  - Minne Li
  - Ming Zhou
  - Weinan Zhang
  - Jun Wang
year: 2018
tags:
  - multi-agent-reinforcement-learning
  - mean-field-games
---

## TL;DR

Mean field Q-learning (MF-Q) and mean field actor-critic (MF-AC) replace individual neighbors' actions with an empirical action distribution. This makes many-agent learning tractable in the reported resource-allocation, Ising, and battle tasks, with conditional convergence results for MF-Q.

## Research Question

Can agents learn effective responses to large populations without representing the full joint action space or solving a large stage-game equilibrium explicitly?

## Motivation

Joint-action critics become difficult to learn as populations grow, while independent learners ignore the changing behavior of other agents. A neighborhood action distribution offers a compact representation of strategic context.

## Contributions

- A local mean-field approximation of pairwise action values.
- Practical Q-learning and actor-critic implementations using the aggregate action input.
- Conditional convergence analysis and experiments involving hundreds to a thousand agents.

## Method

The paper develops [[concepts/mean-field-reinforcement-learning|Mean Field Reinforcement Learning]]. It first represents an agent's value as an average of pairwise interactions, then approximates this average by a single interaction with the neighborhood mean:

$$
Q^j(s,\mathbf a)\approx Q^j(s,a^j,\bar a^j),\qquad
\bar a^j=\frac{1}{|\mathcal N(j)|}\sum_{k\in\mathcal N(j)}a^k.
$$

Actions are one-hot vectors, so their mean is an empirical categorical distribution. A Taylor expansion cancels first-order deviations exactly; neglecting second-order remainders invokes smoothness, homogeneity, and locality considerations (Section 3.1). The mean input dimension depends on the action space rather than the neighbor count.

MF-Q alternates neighborhood action aggregation with Boltzmann policy updates and temporal-difference value learning. The neural implementation uses replay and target networks. MF-AC learns an explicit actor and a critic conditioned on the mean action.

The tabular convergence theorem assumes finite states, bounded rewards, infinite visitation, suitable learning rates, greedy-in-the-limit exploration, and strong global-optimum or saddle-point conditions for every stage game. Appendix E extends the discussion to linear function approximation with additional ergodicity and Lipschitz conditions; it does not prove convergence of arbitrary neural critics.

## Experiments

| Task | Setup | Reported findings |
| --- | --- | --- |
| Gaussian Squeeze | 100, 500, or 1,000 agents; ten actions each; comparison with IL, FMQ, Rec-FMQ, and MAAC | All methods work at 100 agents; mean-field methods learn effective allocation at 500 and 1,000 where the four baselines fail. MF-Q learns faster than MF-AC. |
| Ising model | 20 × 20 lattice; model-free spin decisions compared with Metropolis Monte Carlo | MF-Q approximately reproduces the order-parameter curve and the reported transition near temperature 1.2 for this setup. Error increases near the transition. |
| MAgent battle | 64 versus 64 agents; 2,000 self-play training rounds and 2,000 comparative rounds | MF-Q outperforms the compared alternatives. Independent Q-learning nevertheless outperforms both actor-critic variants. |

The authors also report consistent battle rankings at team sizes 8, 144, and 256, without displaying those results. MADDPG/MAAC is excluded from battle comparisons because the chosen centralized-critic implementation does not accommodate deaths changing the agent count. Exact win percentages are not recoverable from the supplied textual results.

## Limitations

A single action average discards neighbor identities and can hide behavioral heterogeneity. Pairwise factorization and negligible higher-order terms are modeling assumptions, not universal properties of multi-agent games. The convergence assumptions constrain the stage games strongly and do not establish general neural-training guarantees.

The supplied text uses inconsistent temperature notation: Appendix D derives a contraction condition at sufficiently large temperature, while the main proposition describes a small beta. These should not be collapsed into an unconditional convergence claim. Ising agents receive rewards constructed from local interactions even though they are not given the energy function explicitly.

## Related Concepts

- [[concepts/mean-field-reinforcement-learning|Mean Field Reinforcement Learning]]: compresses neighborhood behavior into an action distribution.
- [[concepts/multi-type-mean-field-reinforcement-learning|Multi-Type Mean Field Reinforcement Learning]]: preserves differences among behavioral groups instead of pooling all neighbors.

## Related Papers

- [[papers/multi-type-mean-field-reinforcement-learning|Multi Type Mean Field Reinforcement Learning]]: later extends this single-mean formulation to known or inferred agent types.
- Hu and Wellman (2003), *Nash Q-learning for general-sum stochastic games*: supplies the equilibrium-based learning framework and strong stage-game assumptions discussed here.
