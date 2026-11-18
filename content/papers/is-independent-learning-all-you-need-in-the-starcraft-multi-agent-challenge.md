---
title: "Is Independent Learning All You Need in the StarCraft Multi-Agent Challenge?"
type: paper
authors:
  - Christian Schroeder de Witt
  - Tarun Gupta
  - Denys Makoviichuk
  - Viktor Makoviychuk
  - Philip H. S. Torr
  - Mingfei Sun
  - Shimon Whiteson
year: null
source_job_id: "51b302a3-882a-406b-bc31-8409b57da3ef"
tags:
  - multi-agent-reinforcement-learning
  - independent-learning
  - proximal-policy-optimization
---

## TL;DR

Independent PPO (IPPO), with local critics and shared network parameters, matches or exceeds several centralized-training baselines on selected SMAC maps. Policy clipping is crucial in the reported ablations; robustness to other agents’ changing policies is a proposed explanation, not an established mechanism.

## Research Question

How much centralized value estimation is necessary for strong cooperative multi-agent learning on SMAC, and can PPO make independent learning competitive?

## Motivation

Independent learners treat other agents as part of their environment, making that environment nonstationary as teammates learn. Centralized critics and value factorization address aspects of this difficulty but add modeling assumptions and complexity. Strong independent baselines help distinguish benchmark difficulty from the benefits of centralized information.

## Contributions

- Evaluates IPPO against IQL, QMIX, and centralized PPO variants, with additional discussion of MAVEN.
- Shows that local critics can outperform full-state critics on selected difficult SMAC tasks.
- Separates the effects of policy clipping, value clipping, and reduced learning rates.
- Questions whether SMAC sufficiently exposes coordination pathologies such as relative overgeneralization.

## Method

Each agent uses a policy and value estimator conditioned on its local observations. Actor parameters are shared across agents, and critic parameters are shared across agents separately; independent learning here does not mean isolated parameter training. The common team reward supplies the learning signal, without explicit agent-specific credit allocation.

IPPO applies PPO’s clipped probability-ratio objective separately to each agent, with generalized advantage estimation, entropy regularization, and value clipping. The reported defaults include discount 0.99, GAE parameter 0.95, clipping parameter 0.2, and gradient-norm limit 0.5. Advantages are normalized once before training rather than separately per minibatch. Inputs use local observation stacks, with convolutional or MLP architectures and map-specific settings listed in Table 1. Neither the policy nor the local critic requires the global state.

## Experiments

Section 5 describes evaluation on 16 SMAC maps using StarCraft II 4.6 at the hardest built-in AI difficulty. Table 1 lists 17 map configurations. Hyperparameters vary by map, despite the authors’ characterization of tuning as mild.

Figure 2 reports these median test win rates at 10 million steps; its MAPPO values come from the concurrent work cited as reference [1].

| Map | IPPO (%) | MAPPO (%) |
| --- | ---: | ---: |
| corridor | 80 | 0 |
| 6h_vs_8z | 60 | 8.95 |
| 3s5z_vs_3s6z | 90 | 80 |
| 3m | 100 | 99.875 |
| 2m_vs_1z | 100 | 100 |

The text reports advantages over QMIX on several hard maps and on `3m` and `2m_vs_1z`, and over MAVEN on `corridor`. These are map-specific findings rather than a universal ranking. A separate full-state-critic comparison in Section 5.2 also favors local critics on selected difficult maps.

Removing both policy and value clipping produces an IAC-like baseline with poor performance across six ablation maps. Policy clipping is essential in these comparisons, while value clipping adds benefits on some maps, including `corridor` and `MMM2`. Lowering the IAC learning rate does not reproduce IPPO’s gains.

## Limitations

- Evidence concerns SMAC and the tested implementations; it does not establish that centralized critics are generally inferior.
- IPPO remains susceptible to relative overgeneralization, illustrated by the appendix’s Stag Hunt example with penalty −2.
- Mitigation of nonstationarity and temporal decomposition of coordination are hypotheses offered to explain results.
- Exact run counts and numerical uncertainty estimates are not stated in the supplied prose; learning curves should not be treated as precise tabulated measurements.
- The source has inconsistent map counts and convolution-stride descriptions, limiting exact reproduction from the text alone.
- The supplied Markdown does not state this paper’s publication year or stable identifier; these are left unset rather than inferred from cited works.

## Related Concepts

- [[concepts/independent-learning-in-multi-agent-reinforcement-learning|Independent Learning in Multi-Agent Reinforcement Learning]]: the organizing learning paradigm behind IPPO.
- [[concepts/multi-agent-credit-assignment|Multi-Agent Credit Assignment]]: IPPO uses the shared reward without explicitly estimating individual contributions.

## Related Papers

- Schulman et al. (2017), “Proximal Policy Optimization Algorithms”: supplies the clipped policy objective (reference [23]).
- Rashid et al., “Monotonic Value Function Factorisation for Deep Multi-Agent Reinforcement Learning”: the QMIX comparator (reference [19]).
- Samvelyan et al., “The StarCraft Multi-Agent Challenge”: defines the benchmark (reference [20]).
- [[papers/ma-jepa-joint-embedding-world-models-for-multi-agent-reinforcement-learning|MA-JEPA: Joint-Embedding World Models for Multi-Agent Reinforcement Learning]]: a related library study using centralized world modeling and a centralized critic on SMAC; its different budgets and game version preclude direct numerical comparison here.
