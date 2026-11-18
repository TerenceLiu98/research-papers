---
title: Modelling Opinion Dynamics at Scale with Deep MARL
type: paper
authors:
  - Lukas Seier
  - Brandon Kaplowitz
  - Richard Bailey
  - Sebastian Towers
  - Jakob Foerster
year: null
tags:
  - opinion-dynamics
  - multi-agent-reinforcement-learning
  - social-networks
---

## TL;DR

A GPU-based multi-agent reinforcement learning model learns opinion exchange from competing truth-seeking and conformity rewards. It trains 1,000 agents in 35 minutes on one A100. Strong conformity best matches a Bluesky importance-distribution benchmark, but reduces simulated accuracy and increases disagreement between private beliefs and public actions on the social-media networks studied.

## Research Question

Can learned local interaction policies scale to realistic social subnetworks, reproduce empirical importance structures, and explain when conformity helps or harms collective truth finding?

## Motivation

Hand-crafted opinion updates constrain emergent behavior to mechanisms specified in advance. Learning policies from simple incentives permits richer communication strategies, but arbitrary shared conventions can generate consensus without information exchange. The paper addresses both computational scale and this modeling artifact.

## Contributions

- A JAX consensus and truth-finding environment with shared recurrent policies and graph-masked attention.
- General-sum other-play that randomizes binary labels independently across agents to prevent arbitrary initial agreement.
- Empirical comparison of learned attention through degree-conditioned perceived-importance distributions.
- Experiments separating collective agreement, correct guesses, abstention, and belief–action disagreement.

## Method

Agents observe a fixed noisy private signal of a binary truth and neighbors’ previous actions. Actions are 0, 1, or abstention. Rewards combine truth and conformity as $r_i=\alpha T_i+(1-\alpha)C_i$: larger $\alpha$ means more truth-seeking. Correct guesses receive 0.1, incorrect guesses −0.2, and abstention zero; conformity rewards use analogous agreement incentives.

Independent PPO trains parameter-shared policies with agent identifiers, attention over observed actions, and a GRU. A separately trained belief head predicts truth from frozen hidden representations. “Dishonesty” denotes a non-null action opposite to the belief-head prediction, rather than a direct measurement of human intention.

Other-play flips binary labels and private signals using an independently sampled symmetry per agent and episode. It is applied during both training and evaluation; training alone does not eliminate evaluation-time conventions. Fully conforming agents receive no private signals to remove an additional unwanted convention.

Attention is averaged over trajectories. Perceived importance rescales each incoming attention weight by the sender’s closed-neighborhood out-degree before averaging, giving every node a score of one under uniform attention. Validation sums Wasserstein distances between predicted and empirical importance distributions within in-degree groups.

## Experiments

The study uses a 1,000-node Bluesky likes network, a 475-node Congress X/Twitter interaction network, and a 37-node dynamic Hadza proximity network. Episodes last 20 steps. Private-signal probabilities are 0.14, 0.07, and 1 respectively to match initial neighborhood signal density. The Hadza interaction switching parameter is tested at $r=5$ and $r=10$. Training uses 20 parallel environments and sweeps $\alpha$ in increments of 0.05. Nine of ten training seeds are evaluated over 200 episodes; one seed that collapsed to abstention is excluded.

| Evaluation | Reported result |
|---|---|
| Scaling | One million training steps for 1,000 agents in 35 minutes on an A100; JAX pipeline 101× faster than the CPU baseline at 100 agents |
| Bluesky validation | Best importance-distribution match at $\alpha=0.2$, or 80% conformity reward weight; competitive with the strongest heuristic baselines |

Conformity marginally increases the fraction of correct guesses, particularly at early steps, in the Hadza simulation with restricted communication ($r=5$) by encouraging uncertain agents to speak. This advantage disappears when accuracy is conditioned on non-abstaining agents. Larger social-media graphs exhibit sharp accuracy transitions near $\alpha=0.3$ for Bluesky and $\alpha=0.45$ for Congress, with worse outcomes under stronger conformity. Belief–action disagreement is more prevalent on these graphs. Removing memory or agent IDs particularly harms static-network performance (Appendices E, M, N).

## Limitations

The model fails to reproduce the Congress importance distribution and misses a high-importance tail among low-degree Bluesky nodes. The best-fitting conformity weight is conditional on the chosen model and validation statistic, not an identified population-level human preference. Agents do not reach Nash equilibrium: tested unilateral deviations improve rewards by up to 20%. Results depend on reward asymmetry, signal quality, abstention, topology, and communication dynamics. Size comparisons also change total available information. Recommendation systems, bounded attention, influence-seeking, and heterogeneous incentives are omitted. The proposed evolutionary mismatch is an interpretation of simulations, not direct evolutionary evidence.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]]: learns local update behavior from rewards instead of fixing an averaging rule.
- [[concepts/network-games|Network Games]]: network-local incentives couple individual choices and collective outcomes.
- [[concepts/bounded-confidence-models|Bounded Confidence Models]]: a contrasting family of explicitly specified influence rules.

## Related Papers

- [[papers/opinion-dynamics-statistical-physics-and-beyond|Opinion dynamics: Statistical physics and beyond]]: cited background on microscopic influence rules and collective social dynamics.
- Hu et al. (2020), “Other-play” for zero-shot coordination: supplies the symmetry-based coordination method extended here to general-sum incentives.
- Aymanns et al. (2017): the deep-learning opinion model used as a computational baseline.

Source: supplied parsed manuscript, Sections 1–7 and Appendices A–P. Publication year and a stable paper identifier are not stated in the supplied text. Code link reported by the manuscript: https://github.com/flipbagels/OpiniMARL.
