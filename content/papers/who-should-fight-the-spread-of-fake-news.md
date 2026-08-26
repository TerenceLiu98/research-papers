---
title: "Who Should Fight the Spread of Fake News?"
type: paper
authors:
  - Diana Riazi
  - Giacomo Livan
year: 2026
doi: "10.1016/j.physa.2026.131396"
journal: "Physica A: Statistical Mechanics and its Applications"
tags:
  - online-misinformation
  - opinion-dynamics
  - social-learning
  - sociophysics
  - agent-based-models
  - complex-networks
---

## TL;DR

This paper studies how centralized and decentralized sources of misinformation and correction affect social learning in networks. In a stylized Distributed Hypothesis Testing (DHT) model, centralized sources generally have stronger effects than comparable distributed populations: conspirator mega nodes reduce truthfulness more effectively, while debunker mega nodes usually restore it more effectively. The simulations also show conditional backfire from debunking, fading long-run effects of prebunking, reversion toward the unperturbed DHT state after deplatforming, and improved resistance after a simulated inoculation phase.

## Research Question

Who or what should bear responsibility for countering misinformation in social networks? More specifically, how do centralized and decentralized misinformation sources and interventions compare in their effects on truthfulness and cognitive dissonance, and how do debunking, prebunking, deplatforming, and inoculation change those dynamics?

## Motivation

Online misinformation can originate from highly influential accounts or from distributed groups of users, and corrective information can be organized in the same ways. The distinction matters because source concentration changes who encounters a message and how strongly it is incorporated into existing beliefs. The authors use a controlled opinion-dynamics model to compare these mechanisms and to separate immediate intervention effects from long-run learning dynamics.

## Contributions

- Extends a DHT social-learning framework with centralized "mega nodes" and fixed-belief subpopulations that represent centralized and decentralized sources of misinformation or correction.
- Defines truthfulness as the population-average private belief in the ground-truth hypothesis and cognitive dissonance as the absolute difference between an agent's private and public beliefs.
- Compares debunking, prebunking, deplatforming, and psychological inoculation under homogeneous Erdos-Renyi (ER) and heterogeneous Barabasi-Albert (BA) network topologies.
- Shows an asymmetry between strong misinformation and strong correction: forceful misinformation can substantially reduce truthfulness even when the ground truth is also pushed forcefully, whereas strong correction may recover only modest truthfulness.
- Provides a stylized policy framing for when platform-level or distributed interventions may be more effective, while emphasizing that the interventions are abstractions rather than complete models of real-world moderation.

## Method

The model has `N` networked agents and `M` competing hypotheses, with `theta_M` designated as the ground truth. Each agent maintains a private belief vector `q_i^(t)`. At every time step, the agent receives a signal generated from the ground-truth distribution and performs a local Bayesian update to obtain a public belief vector `b_i^(t)`. Agents then exchange public vectors with neighbors and update private beliefs by normalized log-belief averaging using a row-stochastic interaction matrix `W`.

The DHT process learns the ground truth under global distinguishability: for every pair of hypotheses, at least one agent must be able to distinguish their signal distributions, as measured by positive Kullback-Leibler divergence. The paper measures truthfulness as `tau(t) = (1/N) sum_i q_i^(t)(theta_M)`. Cognitive dissonance for hypothesis `theta_k` is `C_i^(t)(theta_k) = |q_i^(t)(theta_k) - b_i^(t)(theta_k)|`.

Centralized sources are represented by mega nodes whose belief vectors are strongly concentrated on either the ground truth or a wrong hypothesis. Agents listen to a mega node with probability proportional to the dot product between their private belief vector and the mega node's public vector, capturing selective exposure and resistance to incongruent information. Decentralized conspirators, debunkers, or prebunkers are fixed fractions of agents that publicly promote one hypothesis. The model does not simulate centralized and decentralized sources simultaneously in the same intervention comparison.

Prebunking is implemented during an initial period `T_p = 10`, before a conspiring source enters. Deplatforming removes either a conspiring mega node or distributed conspirator nodes at an intermediate time `T_r` without changing the underlying topology. Inoculation assigns a fraction `beta_I` of influential BA-network nodes a mildly misleading public belief during an initial period `T_I = 20`; stronger misinformation is introduced afterward.

## Experiments

The simulations average 100 independent runs, primarily on sparse ER networks with `N = 100` agents and `M = 4` hypotheses. BA networks are used in the appendix to examine heterogeneous degree distributions. The experiments address six questions: centralized mega-node effects, centralized versus decentralized debunking, prebunking versus debunking, asymmetric source strength, deplatforming, and inoculation.

- A conspirator mega node produces lower truthfulness and more volatile cognitive dissonance than unperturbed DHT. A debunker mega node partly restores truthfulness when a conspirator is present, but debunking alone can perform worse than the unperturbed case, capturing a model-level backfire effect.
- Against decentralized misinformation, a centralized debunker generally builds more truthfulness than a comparable distributed debunker population in sparse ER networks. The corresponding centralized/decentralized differences are less pronounced in BA networks.
- The effects of centralized and decentralized prebunking decay after the prebunking period. Their long-run truthfulness is effectively comparable to the no-intervention condition, so agents can unlearn the preemptively promoted ground truth after a conspiring source appears.
- Varying the strength of mega-node belief vectors reveals an asymmetry. Strong disinformation can dismantle truthfulness despite strong promotion of the ground truth, while very strong debunking may recover only moderate truthfulness when misinformation is pushed hard.
- Removing a conspiring mega node or distributed conspirators causes truthfulness to return toward the standard DHT steady state. The authors caution that this result reflects the model's assumptions and should not be read as a complete empirical evaluation of deplatforming.
- Inoculation through influential mildly misinforming nodes increases truthfulness on average, especially at lower concentrations of later conspirators, and is associated with lower cognitive dissonance in some low-conspirator regimes.

The study uses simulated networks and belief trajectories rather than external or experimental data.

## Limitations

The model is a stylized agent-based abstraction. Its sources have fixed or highly concentrated belief vectors, agents use a simplified Bayesian/log-linear learning rule, and the central-versus-distributed comparison excludes their co-existence. The network experiments use synthetic ER and BA topologies and do not calibrate the dynamics to observed platform data. Truthfulness and cognitive dissonance are model-defined quantities, not direct measurements of public opinion or psychological experience. The authors also note that the real interventions involve ethical, institutional, cross-platform, and contextual effects that the simulations do not represent.

## Related Concepts

- [[Distributed Hypothesis Testing]]
- [[Cognitive Dissonance]]
- [[Opinion Dynamics]]
- [[Rumor Refutation on Social Media]]
- [[Social Network Analysis]]

## Related Papers

- Riazi and Livan (2024), "Public and private beliefs under disinformation in social networks."
- Riazi and Livan (2024), "Mitigating disinformation in social networks through noise," arXiv:2403.13630.
- Ntemos et al. (2021), "Social learning under inferential attacks."
- Hare et al. (2020), "Non-bayesian social learning with uncertain models."
- Stern and Livan (2021), "The impact of noise and topology on opinion dynamics in social networks."
- Lewandowsky and van der Linden (2021), "Countering misinformation and fake news through inoculation and prebunking."
- Jhaver et al. (2021), "Evaluating the effectiveness of deplatforming as a moderation strategy on Twitter."
