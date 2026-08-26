---
title: "Minimizing the Misinformation Concern over Social Networks"
type: paper
authors:
  - Peikun Ni
  - Jianming Zhu
  - Yuxin Gao
  - Guoqing Wang
year: null
tags:
  - misinformation
  - information-diffusion
  - social-networks
  - combinatorial-optimization
  - nonsubmodular-optimization
  - rumor-refutation
---

## TL;DR

This paper formulates competitive concern minimization: choosing users to publish trustworthy corrections so that the expected total concern among users who ultimately accept misinformation is minimized. It introduces the Concern-critical Competition (C-cC) model, which extends independent-cascade diffusion with user concern dynamics, competing misinformation and correction cascades, delayed correction, and herd-driven belief changes. Because the resulting objective is nonnegative and non-increasing but neither submodular nor supermodular, the paper proposes a Two-stage Approximate Projected Subgradient (TAPS) algorithm based on the Lovasz extension, convex relaxation, and candidate pruning.

## Research Question

How should correction agents be selected in a social network when the goal is to reduce the total concern users have for misinformation, rather than only the number of users reached by misinformation?

## Motivation

Influence-minimization methods count users affected by misinformation, but users who accept the same claim can have very different levels of concern about it. The paper argues that a smaller misinformation cascade is therefore not necessarily the intervention with the lowest behavioral risk. It also targets the computational difficulty created by a concern-weighted objective whose set-function structure does not support standard greedy guarantees.

## Contributions

- Defines competitive concern minimization as selecting at most `d` correction agents from users outside the misinformation source set.
- Extends the independent cascade model into the C-cC model with inactive, misinformation-activated, and correction-activated states. Correction begins after a delay `beta`, and a misinformation-activated user can switch when at least 80% of sufficiently many parent neighbors are correction-activated.
- Models concern for a category of information with an innate user concern vector and a dynamic update inspired by Coulomb interactions. Transmission and acceptance probabilities depend on current concern, relative authority, and cosine similarity between users.
- Proves that the optimization problem is NP-hard and that evaluating its objective is #P-hard. The objective is nonnegative and non-increasing, but counterexamples show that it is neither submodular nor supermodular.
- Develops TAPS, which prunes ineffective candidate agents, optimizes a Lovasz extension over a cardinality-constrained continuous domain, and uses projected subgradient updates. Its approximation bound depends on the submodularity ratio and data-dependent parameters.

## Method

The model uses a directed social network with a known misinformation source set `R` and a candidate correction set `D`. Misinformation starts at time zero; correction agents are triggered after delay `beta`. Each activated user has one chance to transmit information to an inactive child neighbor. A user accepts a received message according to the message receiver's concern, the sender's relative authority, and the similarity of their innate concern vectors. The model uses a higher transmission coefficient for misinformation (`0.9`) than for correction (`0.8`). Users who accept correction do not later accept misinformation under the model assumptions.

For a fixed information category, the objective is the expected sum of final concern over the users in the misinformation-activated state:

$$
\varphi_q^s(R,D) = \mathbf{E}\left[\sum_{u \in W(R,D)} b_u^{en}\right]
$$

where `W(R,D)` is the final misinformation-activated set and `b_u^{en}` is user `u`'s final concern. TAPS first removes users that cannot affect downstream diffusion or are dominated by a single parent neighbor. It then defines `Y(D) = varphi_q^s(R,D) - varphi_q^s(R, emptyset)`, constructs a Lovasz extension, and iteratively projects approximate subgradient updates onto the feasible cardinality domain. The paper gives a data-dependent upper bound on the returned objective and a time complexity of `O(XH * |U| * |E|)`.

## Experiments

The evaluation uses three real friendship networks: Slashdot (about 51K nodes and 130K edges), Douban (about 155K nodes and 327K edges), and Digg (about 31K nodes and 86K edges). The simulations randomly select 200 or 300 misinformation sources, vary the correction-agent budget, information category, and correction delay, and compare TAPS with concern-based, out-degree, PageRank, closeness, and discrete-gradient baselines. The iteration count is set to `XH = 10` after a parameter study found that the concern decline rate is mostly below `0.01` beyond ten iterations.

- Across the tested scenarios, increasing the number of correction agents lowers final misinformation concern for all methods. TAPS is reported to outperform OutMax by at least 12.63%, PagMax by at least 17.39%, CloMax by at least 14.97%, and DisGD by at least 9.71% in the paper's performance comparison.
- Heuristics based on out-degree, PageRank, closeness, and high initial concern are not consistently effective across datasets and settings. In particular, high concern does not necessarily identify an influential correction agent.
- Concern suppression depends on information category and timing. Across the tested settings, the maximum difference between categories reaches 4.52%, and earlier correction produces greater suppression.
- More correction agents increase suppression on average. Randomized initial concern vectors affect suppression, but the experiments report broadly homogeneous expected suppression across those assignments.

The study is simulation-based. It uses randomly assigned innate concern vectors and model parameters on the three network datasets rather than measured user-concern or intervention-outcome data.

## Limitations

The C-cC model assumes that correction is completely trustworthy and that users who accept correction never return to misinformation. It also uses a simplified herd-mentality rule, assumes that concern remains fixed by information category during a diffusion episode while message-specific concern evolves, and relies on concern vectors that are randomly assigned in the experiments. The network data are used as diffusion graphs without empirical calibration of transmission, authority, similarity, or concern parameters. TAPS has relatively high time complexity, so the authors identify very large networks as an unresolved scaling problem. Multiple misinformation types and richer belief-change dynamics are left for future work.

## Related Concepts

- [[Competitive Concern Minimization]]
- [[Misinformation Spreading Models]]
- [[Rumor Refutation on Social Media]]
- [[Social Network Analysis]]

## Related Papers

- Li, Zhu, Jiao, and Zhang (2022), "Competitive influence minimization in multi-group social networks: An opinion-based solution."
- Zhang, Yang, and Du (2021), "Rumor correction maximization problem in social networks."
- Ni, Zhu, and Wang (2023), "Misinformation influence minimization by entity protection on multi-social networks."
- Kempe, Kleinberg, and Tardos (2003), "Maximizing the spread of influence through a social network."
- Zhang, Zhang, Li, and Thai (2015), "Limiting the spread of misinformation while effectively raising awareness in social networks."


[[index|Library home]]
