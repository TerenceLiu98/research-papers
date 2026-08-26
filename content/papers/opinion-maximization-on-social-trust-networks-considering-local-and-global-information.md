---
title: "Opinion Maximization on Social Trust Networks Considering Local and Global Information"
type: paper
authors:
  - Lin Yu
  - Yuzhi Wang
  - Feng Yang
  - Dongpu Fu
  - Fulei Shi
  - Cuiyou Yao
year: null
tags:
  - opinion-maximization
  - opinion-dynamics
  - social-trust-networks
  - seed-selection
  - signed-networks
  - social-influence
---

## TL;DR

This paper formulates opinion maximization on directed, signed, and weighted social trust networks. Its Local and Global Score (LGS) model combines public positive/negative information with trust-dependent local feedback, and its Two-stage Seed Selection Algorithm (TSSA) first screens candidates with a heuristic influence score before applying greedy marginal selection. On four network datasets, TSSA outperforms the other tested seed-selection baselines and approaches greedy solution quality with much lower runtime.

## Research Question

How should a fixed number of seed nodes be selected to maximize the aggregate continuous opinion of a social trust network when opinion updates depend on both local trust relationships and global public information?

## Motivation

Classical influence maximization emphasizes how many nodes receive information, usually under binary diffusion models. Opinion maximization instead targets the direction and magnitude of opinions, so exposure alone does not guarantee a favorable aggregate outcome. The paper argues that existing models also underrepresent signed trust relationships and the public ratings or reviews that act as global information. These omissions motivate a continuous opinion model that combines directed trust, distrust, local consensus, and public preference.

## Contributions

- Extends a local-and-global opinion update framework to a continuous model on directed, signed, and weighted social trust networks.
- Defines the Opinion Maximization (OM) objective as the sum of node opinions at a fixed time horizon and argues that the problem is NP-hard.
- Shows by counterexample that the objective is non-monotone and non-submodular, so classical greedy approximation guarantees do not apply in general.
- Proposes TSSA, which ranks nodes with a score-aware heuristic, retains the top `lambda k` candidates, and applies greedy marginal selection within that reduced set.
- Evaluates TSSA against AOMF, Q-learning, Degree Centrality, Community-based Centrality, and Random selection on four real network datasets.

## Method

The network is a graph `G = (V, E, W)` with directed edges and weights `omega_ij` in `[-1, 1]`. Each node has a continuous opinion `o_i` in `[-1, 1]`. A selected seed is assigned opinion `1` and held fixed. The objective is `Gamma(S) = sum_i o_i^T`, the aggregate opinion after time horizon `T`.

The LGS model gives node `i` a basic score based on the absolute strength and sign of its opinion: positive opinions use factor `delta_1`, while negative opinions use `delta_0`. A local feedback score is then computed from out-neighbors. Positive trust rewards similar opinions, whereas negative trust rewards opinion differences; edge magnitudes weight the feedback. The total score is the sum of global and local components. Node `i` updates only from out-neighbors whose total score exceeds its own by more than the interaction threshold `epsilon`, with signed edge weights determining the direction and magnitude of the update.

The paper reduces the Expressed Opinion Problem to a restricted instance of OM to establish NP-hardness. It uses a small counterexample to show that adding a seed can either lower or raise the final objective depending on the existing seed set. The standard greedy procedure therefore has high cost, `O(T_Gamma N k)`, and no general approximation guarantee. TSSA estimates each node's influence from its own score, the scores and outgoing weights of its out-neighbors, and the weights of incoming edges. It sorts nodes, keeps the top `lambda k` candidates, and performs greedy marginal selection over that candidate set. Its stated complexity is `O(N T_inf + T_Gamma lambda k^2)`.

## Experiments

The evaluation uses Bitcoin Alpha, Bitcoin OTC, Wiki-Vote, and Wiki-RfA. The first two are weighted signed trust networks; Wiki-Vote is directed and originally unsigned, so the study randomly assigns positive signs to 80% of its edges and negative signs to 20%; Wiki-RfA contains signed voting relations. Outgoing edge magnitudes are normalized by each node's out-degree. Initial opinions are randomly sampled from `[-1, 1]`, and results average 30 runs. The main settings use `delta_1 = 0.5`, `delta_0 = 0.3`, `m = 1`, `epsilon = 0.1`, and `lambda = 2`.

Across seed sizes and time horizons, TSSA has the highest aggregate opinion among the five non-greedy methods on the four datasets. Compared with the full greedy algorithm, its final objective is 0.13% to 3.98% lower, while runtime is reduced by factors ranging from 82 to 1754 in the reported comparisons. Ablations on Bitcoin Alpha and Wiki-Vote show lower final opinions when self-score terms, neighbor contributions, or edge weights are removed.

Parameter simulations on Bitcoin Alpha and Wiki-Vote find that increasing the positive global score factor raises aggregate opinion, while increasing the negative factor lowers it. Increasing the interaction threshold reduces opinion exchange and lowers the objective. Larger feedback sensitivity `m` also lowers final opinion in the tested range `0.5` to `2`. Increasing `lambda` increases runtime and has non-monotone effectiveness; `lambda = 2` is reported as a practical balance in the main experiments.

## Limitations

The model assumes continuous and rational opinion updating, homogeneous interaction thresholds, and quasi-static global public-information factors. These abstractions omit bounded rationality, information overload, episodic engagement, changing public information, source credibility, timeliness, and heterogeneous user behavior. The network datasets provide relational proxies rather than direct observations of opinion diffusion, and Wiki-Vote requires randomly assigned edge signs. The empirical evaluation is simulation-based, uses random initial opinions, and reports no field deployment or large-scale external validation. The greedy stage is effective within the screened candidate set, but the non-monotone and non-submodular objective means that global optimality is not guaranteed.

## Related Concepts

- [[Opinion Maximization]]
- [[Opinion Dynamics]]
- [[Social Trust Networks]]
- [[Network Games]]
- [[Social Network Analysis]]
- Signed networks
- Influence maximization

## Related Papers

- Gionis, Terzi, and Tsaparas (2013), "Opinion maximization in social networks."
- Xu, Hu, Wu, and Liu (2021), "Opinion maximization in social trust networks."
- He, Sun, Wang, Wang, Huang, Yi, et al. (2021), "Positive opinion maximization in signed social networks."
- He, Wang, Huang, and Yi (2021), "Multi-stage opinion maximization in social networks."
- He, Zeng, Zhang, and Liu (2022), "Generalized opinion dynamics model for social trust networks."
- Kempe, Kleinberg, and Tardos (2003), "Maximizing the spread of influence through a social network."
