---
title: Search Games with Predictions
type: paper
authors:
  - Spyros Angelopoulos
  - Thomas Lidbetter
  - Konstantinos Panagiotou
year: 2026
doi: 10.1287/opre.2024.1498
tags:
  - search-games
  - learning-augmented-algorithms
  - game-theory
---

## TL;DR

The paper characterizes optimal consistency–robustness tradeoffs for randomized search with potentially incorrect information about a stationary target. Matching search strategies and adversarial hiding distributions establish Pareto frontiers for box search, imperfect detection, two-target search, expanding ray search, and pathwise line search. A scalarization framework extends the analysis to two-player zero-sum games with predictions.

## Research Question

How much can a searcher benefit from a correct prediction while retaining a worst-case guarantee when that prediction is wrong, even when arbitrary mixed strategies are allowed?

## Motivation

Search advice can identify promising locations without supplying a reliable probability distribution. Purely adversarial search ignores this information, while trusting it completely can leave other locations effectively unsearched. Existing deterministic analyses do not characterize the full benefits and limits of randomization.

## Contributions

- Exact tradeoffs for weighted box search with perfect detection and with a common independent detection probability.
- A two-target extension with unit search costs and an analysis of how partial prediction errors affect performance.
- A reduction from weighted consistency–robustness objectives to auxiliary zero-sum games (Section 4).
- Optimal tradeoffs for expanding search on multiple rays and randomized pathwise search on a line, with implications for allocating time among algorithm portfolios.

## Method

A prediction is a nonempty proper subset $H$ of the hider's pure strategy space $Y$. For mixed search strategy $s$ and expected payoff $u$, define

$$
C(s)=\sup_{y\in H}u(s,y),\qquad R(s)=\sup_{y\in Y}u(s,y).
$$

Both quantities are costs to minimize. Box-search payoffs are expected search times; unbounded-space payoffs divide search cost by the target's distance from the origin.

For perfect detection, mix between searching $H$ first and searching its complement first, using optimal randomized searches within each group. Write $t(A)=\sum_{j\in A}t_j$ and

$$
V(A)=\frac{\sum_{j\in A}t_j^2+t(A)^2}{2t(A)}.
$$

The exact frontier is $t(H)C+t(H^c)R=t(Y)V(Y)$ for $V(H)\leq C\leq V(Y)$ (Theorem 2). Cost-proportional hiding probabilities supply a matching lower bound.

With imperfect detection, the strategy makes additional rounds through predicted boxes before alternating between the two groups. Mixing adjacent numbers of initial rounds produces a piecewise-linear frontier. Approaching the optimal consistency restricted to $H$ requires robustness to diverge (Theorem 4).

The general construction minimizes $\lambda_1C+\lambda_2R$ through an auxiliary game whose hider chooses a pair in $H\times Y$, with payoff $\lambda_1u(s,y_1)+\lambda_2u(s,y_2)$. Mixing search strategies provides the convexity argument underlying scalarization; the auxiliary-game characterization assumes that the relevant values and optimal strategies exist.

For expanding search, allocate constant exploration speeds to predicted and unpredicted rays. Pathwise line search instead uses geometrically growing excursions, a random multiplicative offset, and shorter excursions on the unpredicted side. Matching adversarial distributions certify the resulting tradeoffs.

## Experiments

This is a theoretical study, with proofs and illustrative frontier plots rather than empirical benchmarks or learned predictors.

- **Perfect-detection example:** two unit-cost boxes and one predicted box give a frontier from $(C,R)=(1.5,1.5)$ to $(1,2)$.
- **Imperfect-detection example:** with the same boxes and detection probability $q=1/2$, the no-prediction value is $3.5$. Consistency approaches $2$ only as robustness tends to infinity.
- **Two targets:** the analyzed unit-cost setting has a frontier with two linear pieces (Theorem 5).
- **Line search:** the balanced endpoint recovers the classical randomized competitive ratio of approximately $4.59$. Stronger directional trust drives consistency toward $1$ while robustness diverges (Theorem 8).

## Limitations

The targets are immobile. The multiple-target analysis is restricted to two targets and unit costs; arbitrary target counts and nonuniform costs remain future work. Imperfect detection uses a known common probability with independent detection events. The pathwise result covers a line, whereas the multi-ray result uses expanding search, where reexploration has no cost. The line model permits infinitesimal oscillations near the origin. Portfolio applications are mathematical interpretations, not measured solver deployments. Several proof details are deferred to an online appendix not included in the supplied Markdown.

## Related Concepts

- [[concepts/learning-augmented-online-algorithms|Learning-Augmented Online Algorithms]]: correct-advice performance and adversarial robustness form the two objectives; here the framework also accommodates unnormalized game payoffs.

## Related Papers

- Angelopoulos (2023), “Online search with a hint”: earlier deterministic search analysis, contrasted with the present mixed-strategy treatment.
- Bui, Lidbetter, and Lin (2024), “Optimal pure strategies for a discrete search game”: supplies the standard imperfect-detection game solution used as a starting point.
- Kao, Reif, and Tate (1996), “Searching in an unknown environment: An optimal randomized algorithm for the cow-path problem”: the classical randomized line-search baseline recovered at the robust endpoint.

Source: [Operations Research article](https://doi.org/10.1287/opre.2024.1498), published online April 9, 2026.
