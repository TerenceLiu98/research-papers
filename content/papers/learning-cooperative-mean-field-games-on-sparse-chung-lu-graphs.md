---
title: Learning Cooperative Mean Field Games on Sparse Chung-Lu Graphs
type: paper
authors:
  - Anonymous
year: null
source_job_id: "4e88742a-ac54-46b5-ae28-30874efd8ba2"
tags:
  - mean-field-control
  - multi-agent-reinforcement-learning
  - sparse-networks
  - chung-lu-graphs
---

## TL;DR

The paper introduces [[concepts/chung-lu-cooperative-mean-field-games|Chung-Lu Cooperative Mean Field Games]] (CLCMFGs) for cooperative control on networks whose expected average degree remains finite, including power-law regimes with infinite degree variance. It proves convergence from finite [[concepts/chung-lu-graphs|Chung-Lu graphs]] to a degree-indexed limiting system, then makes that limit computationally usable by separating explicitly modeled low-degree agents from an aggregated high-degree population. Across four control problems, the approximation is more accurate than $L^p$-graphon and graphex alternatives on eight real networks, while the proposed learning methods generally outperform IPPO on larger synthetic graphs.

## Research Question

How can cooperative policies be learned scalably and with asymptotic justification when agents interact over very sparse, heterogeneous networks whose average degree stays finite and whose degree variance may diverge?

## Motivation

Classical mean-field models erase network position, while [[concepts/graphon-mean-field-games|Graphon Mean Field Games]] and their $L^p$-graphon or graphex extensions target dense or moderately sparse sequences with diverging expected average degree. Many empirical networks instead have a persistent mass of low-degree vertices together with influential hubs. Directly tracking sparse neighborhoods is also intractable: the paper shows that the number of possible time-dependent neighborhoods can grow at least exponentially in a polynomial of a node's degree.

## Contributions

- Defines a cooperative mean-field model indexed by node degree for sparse Chung-Lu graph sequences with finite expected degree.
- Proves convergence in probability of degree-specific empirical mean fields to their limiting counterparts under vertex-weight convergence, followed by objective convergence for continuous rewards.
- Shows that, among any finite collection of policy ensembles with a unique limiting optimum, that limiting optimum is eventually optimal on sufficiently large finite systems.
- Introduces a practical two-system approximation that retains separate mean fields for degrees $1$ through $k^*$ and pools all higher degrees into one population.
- Develops a model-based policy-gradient method (CLMFC) and a model-free method trained directly on a real network (CLMFMARL).

## Method

Each degree class $k$ has its own state distribution and policy. Local weak convergence and the locally tree-like structure of Chung-Lu graphs justify a limiting degree-indexed population process. Its exact evolution remains expensive because a sparse agent's state can depend on its expanding multi-hop neighborhood.

The approximation uses the size-biased neighbor-degree heuristic

$$
P(\deg(v)=k\mid (v',v)\in E)\approx
\frac{kP(\deg(v)=k)}{\mathbb{E}[\deg(v)]}.
$$

For a threshold $k^*$, degrees up to $k^*$ retain separate mean fields; agents above the threshold share one high-degree mean field and policy. Low-degree neighborhood states are sampled from a multinomial distribution whose probabilities are the degree-weighted mixture of these mean fields. The authors also derive a more detailed approximation that tracks state-degree transitions, but it is substantially more expensive.

CLMFC treats the approximate mean-field state as a single-agent control MDP and uses PPO to select a set of degree-conditioned policies. CLMFMARL uses the same high-level policy structure but obtains transitions and rewards by interacting with the finite network, avoiding assumed model knowledge and approximation error in the transition equations.

## Experiments

The evaluation covers SIS and SIR epidemic control, graph coloring, and rumor spreading. Approximation quality is measured over 50 trials on eight real networks ranging from roughly 14,000 to 3.2 million nodes. CLCMFG has lower mean-field total-variation error than the $L^p$-graphon and graphex baselines for every reported network-problem pair. For example, in graph coloring its error ranges from 0.19% to 1.05%, compared with 4.91% to 32.62% for the graphex model and 34.18% to 39.83% for the $L^p$-graphon model.

The extensive CLCMFG* approximation is usually moderately more accurate than the practical version, except on Yahoo, but could not finish within the runtime limit for graph coloring or rumor spreading. In 24-hour training runs on 96 CPUs, CLMFC and CLMFMARL beat IPPO on all four tasks for graphs with 860 and 1,598 nodes. On the smaller graphs, IPPO beats CLMFC only for SIR, while CLMFMARL remains best there.

## Limitations

- The practical approximation relies on a size-biased neighbor-degree heuristic suited to large Chung-Lu graphs; the paper notes that it is unrealistic for generators such as preferential attachment.
- The convergence theory assumes vertex-weight convergence, finite expected degree, finite state and action spaces, a finite horizon, and continuity of the reward for objective convergence.
- The optimal-policy transfer result compares only a finite candidate set and assumes a unique limiting optimum; it does not establish unrestricted policy optimization or a finite-size rate.
- CLCMFG* is too expensive for two of the four reported tasks, exposing an accuracy-computation tradeoff.
- CLMFC is optimized and evaluated on the approximate limiting model, so its behavior can differ from that of the finite empirical network.
- The experiments use synthetic task dynamics and transformed undirected versions of directed or weighted real networks. Partial observability and bounded rationality are left for future work.

## Related Concepts

- [[concepts/chung-lu-cooperative-mean-field-games|Chung-Lu Cooperative Mean Field Games]]: the degree-structured control framework and its two-system approximation.
- [[concepts/chung-lu-graphs|Chung-Lu Graphs]]: the sparse expected-degree network model supporting the limit construction.
- [[concepts/graphon-mean-field-games|Graphon Mean Field Games]]: a related network-aware mean-field framework for denser graph regimes.
- [[concepts/graphons|Graphons]]: dense graph limits whose fixed-kernel sampling assumptions differ from the finite-average-degree setting here.

## Related Papers

- [[papers/graphon-mean-field-games-and-the-gmfg-equations|Graphon Mean Field Games and the GMFG Equations]]: develops network-position-dependent mean-field equilibria using a dense graphon limit.
- Hu et al. (2023), "Graphon mean-field control for cooperative multi-agent reinforcement learning": the dense-network cooperative-control predecessor identified by the authors.
- Lacker, Ramanan, and Wu (2023), "Local weak convergence for sparse networks of interacting processes": supplies the sparse-process convergence perspective used in the theoretical motivation.
- Fabian et al. (2023; 2024): the $L^p$-graphon and graphex mean-field-game approaches used as approximation baselines.

[[index|Library home]]
