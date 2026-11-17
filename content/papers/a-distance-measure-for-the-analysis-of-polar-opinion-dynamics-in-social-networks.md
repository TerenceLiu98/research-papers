---
title: A Distance Measure for the Analysis of Polar Opinion Dynamics in Social Networks
type: paper
authors:
  - Victor Amelkin
  - Petko Bogdanov
  - Ambuj K. Singh
year: 2019
doi: 10.1145/3332168
tags:
  - opinion-dynamics
  - optimal-transport
  - social-networks
  - anomaly-detection
---

## TL;DR

Social Network Distance (SND) compares polar-opinion snapshots using transport costs derived from a chosen opinion-spread model. Local bank nodes make unequal opinion masses sensitive to where new activations occur. It detects synthetic anomalies missed by coordinate-wise distances and achieves 75.63% accuracy when completing partially observed Twitter opinions. Linear-time computation requires sparse networks, bounded numbers of changed opinions, and bounded integer costs.

## Research Question

How can a distance between opinion snapshots capture whether their change is plausible under network-mediated competing-opinion dynamics, and support anomaly detection and missing-opinion prediction?

## Motivation

Counting changed users misses the distinction between opinions spreading through social ties and externally driven activations in unexpected locations. Ordinary Earth Mover’s Distance can ignore unmatched mass, while a uniform mass-mismatch penalty cannot distinguish where new opinions appear.

## Contributions

- Constructs SND from separate positive and negative opinion transport problems with model-dependent shortest-path costs.
- Introduces generalized EMD, denoted EMD*, with distributed local bank nodes for spatially sensitive mass balancing.
- Reduces transport computation by canceling shared mass and exploiting a small number of changed users.
- Evaluates distance-based anomaly detection and opinion completion on synthetic networks and political Twitter data.

## Method

A fixed network carries opinions in {−1, 0, +1}; zero represents neutral or unknown opinion. For each polarity, the model specifies edge adoption probabilities. Negative log probabilities become edge costs, and shortest paths represent the most likely propagation routes. The derivation assumes maximum-likelihood evolution, asynchronous independent Markovian acquisition, and a single most likely source per adoption (§3).

For polarity v, let Pᵛ and Qᵛ be nonnegative indicator vectors. SND averages forward and reverse EMD* costs, summed over both polarities. Ground costs depend on the starting snapshot and polarity, so hostile opinions can obstruct propagation even when their mass is excluded from that polarity’s histogram.

EMD* balances unequal masses using local banks attached to regular nodes. The lighter snapshot receives bank mass proportional to its existing mass distribution; bank-edge costs control the penalty. Transport then accounts for both the amount and location of new activation (§4). The paper states metricity results conditional on the underlying transport and ground-distance assumptions; these should not be read as an unconditional guarantee for arbitrary model-dependent costs.

The algorithm cancels common mass, removes empty transport suppliers and consumers, computes only needed shortest paths, and solves an unbalanced bipartite minimum-cost flow. The linear scaling corollary assumes a sparse graph, bounded changed-user count, and the bounded-integer-cost setup. The implementation uses binary-heap Dijkstra and CS2 without the theoretical two-edge push rule, and scales slightly worse than linearly (§6.6).

Anomaly detection ranks local changes in normalized adjacent-snapshot distances. Opinion completion extrapolates four past distances by linear least squares and selects an assignment whose distance from the last complete snapshot best matches that forecast. Experiments use 100 random assignments; greedy hill climbing did no better.

## Experiments

Twitter data contain about 270,000 political-topic tweets from May 2008 to August 2011, selected from a 48-million-tweet collection. The follower network has about 10,000 users and an average of 130 neighbors. Quarterly opinions are inferred from activity and sentiment thresholds. Synthetic experiments use scale-free networks, with scalability evaluated up to 200,000 nodes.

For synthetic anomaly detection, 30 of 300 transitions on a 30,000-node network are anomalous. At false-positive rate 0.3, SND attains true-positive rate 0.83 versus 0.4 for Hamming distance. Precision remains 1 through recall 0.2. Twitter event examples are interpreted using Google Trends and a political-event chronology; the quantitative ROC result is synthetic (§6.2).

Opinion prediction hides 20 active users per trial, roughly balanced by polarity, and repeats ten times. Table 2 reports mean accuracy and standard deviation, in percent:

| Method | Synthetic | Twitter |
|---|---:|---:|
| SND | 74.33 ± 2.65 | 75.63 ± 5.60 |
| Hamming | 68.44 ± 12.34 | 68.13 ± 5.80 |
| Quadratic form | 66.67 ± 13.58 | 67.50 ± 9.63 |
| Independent Cascade simulation | 76.25 ± 9.54 | 59.38 ± 4.17 |

SND’s Twitter advantage over Hamming is 7.50 percentage points. Independent Cascade simulation has the highest synthetic mean, on data generated by a related model. A 256-node ablation shows that original EMD ignores new mass, while a single-bank variant reacts to activation counts but misses spatial anomalies (§6.4).

## Limitations

- SND is a relative plausibility measure, not a calibrated transition probability. Appendix A.5 explicitly demonstrates substantial likelihood underestimation.
- The network is fixed; simultaneous structural and opinion change is left to future work.
- Results depend on the chosen spread model, its costs, and sentiment-derived opinion labels. Prediction completes a partially observed current snapshot under smooth recent evolution rather than forecasting an entirely unobserved network.
- Linear-time claims do not cover arbitrary dense graphs or growing numbers of changed users. The authors warn that networks with over 100 million users can require days per comparison.
- Simple activation counts can suffice for prominent events; SND is most useful when activation location and propagation plausibility add information.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]]: supplies the propagation assumptions used to compare snapshots.
- [[concepts/optimal-transport|Optimal Transport]]: supplies the transport objective, ground costs, and mass-balancing construction.

## Related Papers

- [[papers/polar-opinion-dynamics-in-social-networks|Polar Opinion Dynamics in Social Networks]]: cited background on competing opinions; studies nonlinear susceptibility and convergence rather than snapshot distance.
- [[papers/a-new-measure-of-congruence-the-earth-movers-distance|A New Measure of Congruence: The Earth Mover’s Distance]]: a complementary political application comparing preference distributions; SND instead retains user locations and propagation pathways.

Published in ACM Transactions on Knowledge Discovery from Data 13(4), Article 38. DOI: 10.1145/3332168.
