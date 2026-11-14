---
title: "HHC: Hierarchical Hypergraph Communication for Multi-Agent Systems"
type: paper
authors:
  - Qifan Liang
  - Chenlong Li
  - Feiyu Wang
  - Jing Fu
  - Yixiang Shan
  - Lu Guo
  - Wei Liu
  - Lichang Song
  - Ting Long
year: null
source_job_id: "e6b32199-8ed4-4b71-8c46-6ae3c28ef48d"
tags:
  - multi-agent-reinforcement-learning
  - hypergraphs
  - learned-communication
---

## TL;DR

HHC learns overlapping tactical groups of agents and strategic groups of those groups, then sends strategic information back down through structure-constrained attention. Experiments in Stag Hunt, SMAC, and SMACv2 support the value of overlapping membership and strategic abstraction; on Zerg-Crowding, removing either reduces mean win rate from 65.3% to 25.5% or 31.6%, respectively.

## Research Question

Can overlapping group memberships and communication between group abstractions improve cooperative decision-making under partial observability?

## Motivation

An agent can contribute to several cooperative roles simultaneously. Pairwise messaging and disjoint group assignments can obscure these roles, while communication confined to individual groups misses coordination between groups. HHC represents both levels explicitly using [[concepts/hypergraphs|Hypergraphs]].

## Contributions

- Adaptive construction of sparse agent–group and group–supergroup incidence matrices with nonexclusive memberships.
- Top-down attention that personalizes strategic context for groups and tactical messages for agents.
- Empirical analysis of overlap, hierarchy, topology regularization, group capacity, and computational overhead.

## Method

A GRU encodes each agent's local observation and previous action. Independent sigmoid outputs score membership in each tactical group. Top-k selection and a confidence threshold sparsify these scores; an argmax fallback keeps every agent connected to at least one group. Weighted member-feature averages are fused with log-transformed soft membership counts and hard group cardinalities. The same procedure treats tactical groups as virtual nodes in a strategic hypergraph.

Supergroup-to-group attention is masked by the strategic incidence matrix. Each group fuses this context with its tactical representation, and masked group-to-agent attention produces an individual message. A separate recurrent decision network consumes the message and local observation to estimate action values. A centralized mixing network trains the individual utilities with a temporal-difference objective.

The joint loss also penalizes ambiguous sigmoid memberships through P(1−P), and temporal membership changes exceeding a tolerance. Default settings use k=2, threshold 0.8, and tactical/strategic capacities 3/2, increased to 5/3 for crowding. This is [[concepts/neural-message-passing|Neural Message Passing]] with a learned hierarchical communication topology; execution still requires the communicated group information.

## Experiments

The study compares QMIX, VBC, TMC, CA-COM, HAMS, and HYGMA across Stag Hunt, SMAC, and SMACv2. Five seeds are reported as mean ± standard deviation, with 100 million environment steps per method. Larger settings include SMAC's 27m_vs_30m and crowding tasks with 20 agents. The main learning curves are described as favoring HHC; the supplied tables provide the following exact comparisons.

| Task | HHC win rate (%) | CommFormer win rate (%) |
| --- | ---: | ---: |
| Zerg | 64.2 ± 8.8 | 56.1 ± 9.5 |
| Zerg-Crowding | 65.3 ± 13.0 | 60.2 ± 9.0 |

Appendix D reports Zerg-Crowding ablations: single-group membership yields 25.5 ± 7.7%, removing strategic hierarchy 31.6 ± 7.9%, and removing temporal stability 37.5 ± 9.3%. Welch tests against HHC give p=0.0008, 0.0019, and 0.0055, respectively. Removing polarization gives 52.1 ± 12.3% (p=0.1380), and replacing hypergraphs with pairwise graphs gives 57.3 ± 13.0% (p=0.3599); these latter differences are not statistically significant.

Learned tactical and strategic memberships average 1.75 and 1.32 per node, with fallback ratios 0.03 and 0.05. These statistics support overlapping group formation rather than dependence on fallback alone. Capacity matters: increasing tactical capacity from 5 to 9 on Zerg-Crowding lowers mean win rate from 65.3% to 51.7%.

Appendix F reports Zerg-Crowding inference latency of 0.270 ms per environment step for HHC versus 0.159 for QMIX, 0.245 for HAMS, and 0.285 for HYGMA. HHC uses 8074 MB of GPU memory versus 3808, 6788, and 10088 MB, respectively. Membership evaluation costs O(NM+ML); active message passing after sparsification costs O(k(N+M)), for agent count N and group capacities M and L.

## Limitations

Hierarchy capacities and depth remain predefined. Evaluation covers cooperative simulation benchmarks, and the reported scaling depends on compact group capacities. HHC adds time and memory costs relative to QMIX and HAMS. Five-seed estimates have substantial variability; the pairwise-graph and polarization ablations do not independently establish significant improvements on Zerg-Crowding. The supplied manuscript does not specify its publication year, venue, or stable identifier; year is therefore unset.

## Related Concepts

- [[concepts/hypergraphs|Hypergraphs]]: preserve explicit overlapping cooperative groups.
- [[concepts/neural-message-passing|Neural Message Passing]]: provides the aggregation and update perspective on hierarchical communication.

## Related Papers

- Zhu et al. (2024), “HyperComm: Hypergraph-based communication in multi-agent reinforcement learning”: hypergraph communication predecessor cited by HHC.
- Liu and Li (2025), “HYGMA: Hypergraph coordination networks with dynamic grouping for multi-agent reinforcement learning”: dynamic grouping baseline.
- Wang et al. (2023), “Hierarchical attention master–slave for heterogeneous multiagent reinforcement learning”: hierarchical communication comparator.
- [[papers/ma-jepa-joint-embedding-world-models-for-multi-agent-reinforcement-learning|MA-JEPA: Joint-Embedding World Models for Multi-Agent Reinforcement Learning]]: a related library paper addressing cooperative partial observability through centralized world-model training and local execution, rather than HHC's execution-time communication; not an HHC experimental comparator.

[[index|Library home]]
