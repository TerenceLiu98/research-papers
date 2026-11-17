---
title: Generalized Full Matching
type: paper
authors:
  - Fredrik Sävje
  - Michael J. Higgins
  - Jasjeet S. Sekhon
year: 2021
doi: 10.1017/pan.2020.32
tags:
  - causal-inference
  - matching
  - approximation-algorithms
---

## TL;DR

Generalized full matching accommodates multiple treatment arms and minimum group-composition constraints through a sparse nearest-neighbor graph. Its algorithm guarantees a maximum within-group distance at most four times optimal and scales to millions of observations. A Michigan voter-mobilization application also demonstrates that computationally successful matching cannot repair absent covariate overlap.

## Research Question

How can researchers construct high-quality matched groups for large samples with multiple treatment conditions and flexible minimum group sizes?

## Motivation

Conventional optimal full matching is computationally demanding and oriented toward simpler two-arm designs. Extrapolating a five-arm voter experiment to a statewide voter file produces six effective conditions and 6,762,701 observations, motivating a scalable alternative.

## Contributions

- Defines full matching with treatment-specific minimum counts and an overall minimum group size.
- Develops a sparse graph algorithm with a four-factor bottleneck approximation guarantee.
- Connects the resulting groups to target-population outcome contrasts and preprocessing weights.
- Demonstrates computational scalability, simulation performance, and the importance of overlap diagnostics in extrapolation.

## Method

[[concepts/generalized-full-matching|Generalized Full Matching]] partitions every unit into exactly one group. Constraints specify at least $c_x$ units from each condition $x$ and at least $t$ units overall. The objective minimizes the largest pairwise distance within any group, using a pseudometric that satisfies the triangle inequality.

The algorithm constructs treatment-specific nearest-neighbor graphs, adds neighbors to meet the overall size constraint, and selects a maximal set of seeds with disjoint closed neighborhoods. Each seed and its neighborhood receive a shared label; remaining units join groups through labeled neighbors. Every group contains a constraint-satisfying neighborhood. Any two members are connected through at most four graph edges, each bounded by the optimal bottleneck distance, yielding the factor-four guarantee (Theorem 10). A cross-treatment bottleneck guarantee also holds for conventional minimum-one-per-arm constraints (Theorem 11).

With fixed treatment counts and constraints, memory is linear. Worst-case time is $O(n^2\log n)$; average $O(n\log n)$ performance relies on efficient nearest-neighbor search, such as kd-trees under suitable covariate distributions. High dimensionality can undermine this speed advantage.

For target population $B$, group-specific outcome differences are averaged with weights proportional to the number of target units in each group. Individual preprocessing weights divide that target-group share by the number of same-treatment units in the group. Calipers and targeting only a subpopulation are extensions; discarding units can change the estimand.

## Experiments

The simulations use two uniform covariates, nonlinear logistic treatment assignment, a nonlinear outcome, and a true treatment effect of zero. Comparators include optimal full matching and nearest-neighbor matching with and without replacement. Implementations optimize different distance objectives, so the comparison is not a common-objective optimality contest.

At 10,000 observations, Table 1 reports RMSE ratios relative to conventional full matching of 1.03 for basic generalized full matching, 1.01 for its refined version, and 1.17 for matching with replacement. Basic generalized full matching has lower measured imbalance in this simulation, but the authors do not expect that advantage to hold universally. At 100 million observations, the basic implementation takes under 15 minutes on average; refinements add about five minutes, and memory exceeds 17 GB slightly.

In the Michigan application, matching 6,762,701 observations takes under two minutes on a laptop. The full-population adjustment fails a placebo comparison: adjusted control turnout is 21.43%, versus 18.60% among nonexperimental voters receiving no postcard. All experimental participants voted in November 2004, leaving no experimental support for nonvoters in that election.

Restricting the target to November 2004 voters reduces the placebo gap: control turnout is 26.59%, versus 25.89% outside the experiment. Adjusted Neighbors turnout is 32.90%, implying a 6.31-percentage-point contrast against control, compared with approximately 8.1 points in the original experiment (Table 4). The authors describe the restricted-target placebo result as a weak pass, not perfect adjustment.

## Limitations

The approximation guarantee concerns a distance objective, not causal bias, mean distance, or estimator RMSE. Causal interpretation still requires appropriate observed covariates and overlap. The simulation is deliberately low dimensional and does not establish universal performance rankings. The algorithm does not provide the same precise ratio-bound control or global fine-balance constraints available in some network-flow formulations. Exact optimal methods remain attractive when feasible. Formal proofs are referenced in supplementary materials rather than reproduced in the supplied article.

## Related Concepts

- [[concepts/generalized-full-matching|Generalized Full Matching]]: flexible group composition and bottleneck optimization.
- [[concepts/weighting-diagnostics-for-causal-estimation|Weighting Diagnostics for Causal Estimation]]: balance and weight concentration help assess the resulting adjustment; they do not establish identification.

## Related Papers

- [[papers/what-to-observe-when-assuming-selection-on-observables|What to Observe When Assuming Selection on Observables]]: complementary diagnostics for matching and other weighted causal estimators.
- Hansen and Klopfer (2006), “Optimal Full Matching and Related Designs Via Network Flows”: optimal matching alternative for feasible designs.
- Higgins, Sävje, and Sekhon (2016), “Improving Massive Experiments with Threshold Blocking”: predecessor graph construction for experimental blocking.
- Gerber, Green, and Larimer (2008), “Social Pressure and Voter Turnout”: source experiment for the extrapolation exercise.

Published in *Political Analysis* 29:423–447 (2021); online publication 23 November 2020. Replication data: DOI 10.7910/DVN/1YIX0D.
