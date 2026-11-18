---
title: Voter model can accurately predict individual opinions in online populations
type: paper
authors:
  - Antoine Vendeville
year: 2025
doi: 10.1103/PhysRevE.111.064310
tags:
  - opinion-dynamics
  - voter-model
  - political-networks
---

## TL;DR

A multistate voter model with fixed political accounts as zealots recovers 92.5% of labeled users’ party affiliations from a directed, weighted retweet network during the 2017 French presidential campaign. Equilibrium disagreement probabilities also distinguish same-party from cross-party user pairs with 92.9% accuracy (Table I). These are validations of equilibrium associations, not forecasts of individual opinion changes.

## Research Question

Can a simple opinion-dynamics model reproduce individual political affiliations and pairwise agreement, beyond matching aggregate opinion distributions?

## Motivation

Individual-level validation requires fine-grained labels and operationalizable model parameters. Retweet frequencies supply copying probabilities, while publicly affiliated political entities provide fixed reference opinions, avoiding a parameter sweep for the voter dynamics.

## Contributions

- Tests equilibrium opinion distributions against manually labeled individual affiliations without using those individuals’ labels to compute their distributions.
- Evaluates pairwise discord as an indicator of shared affiliation.
- Compares direct zealot connections and alternative network constructions to identify what the network-mediated inference adds.

## Method

The Élysée2017fr dataset contains 22,853 accounts, including about 2,000 political entities, over the six months preceding the election. The study excludes 3,401 unlabeled and 803 multiply labeled accounts. Five parties define the states: FI, PS, EM, LR, and FN. Dataset annotators reportedly agreed on 89% of labels.

Political entities are fixed zealots. An edge from account $j$ to account $i$ represents influence when $i$ retweets $j$; its normalized weight $w_{ij}$ is the proportion of $i$’s retweets originating from $j$. For nonzealots $\mathcal N$, stationary marginals satisfy

$$
x_i^s=\sum_{j\in\mathcal N}w_{ij}x_j^s+z_i^s,
$$

where $z_i^s$ aggregates influence from zealots supporting party $s$. Reachability from zealots ensures the unique equilibrium described in the paper. Equivalently, $x_i^s$ is a backward random walk’s probability of first reaching a zealot of state $s$. Classify by $\arg\max_s x_i^s$.

Pairwise discord $\rho_{ij}$ is the equilibrium probability of different states, obtained from coupled pair equations (Eq. 5). The shortcut $1-\sum_s x_i^s x_j^s$ requires the independence conditions in Eq. 6; it is not generally valid. SVC and logistic regression provide additional supervised evaluations, unlike the label-free computation of nonzealot marginals.

## Experiments

Table I reports percentage accuracies:

| Network | Marginal argmax | SVC | Discord logistic regression |
|---|---:|---:|---:|
| Directed weighted retweets | 92.5 | 93.0 | 92.9 |
| Unweighted retweets | 91.6 | 92.8 | 89.8 |
| Undirected retweets | 91.9 | 92.8 | 87.2 |
| Undirected unweighted retweets | 74.9 | 92.8 | 86.1 |
| Follow | 84.2 | 89.4 | 85.3 |
| Mention | 64.4 | 83.9 | 77.8 |

FN supporters have 95% argmax accuracy, versus 81% for PS. Mean discord is 0.355 within parties and 0.902 across parties on the original retweet network.

Direct zealot links are absent for 27% of users. Among the 73% with such links, full-model argmax accuracy is 96.2%, versus 95.1% using direct zealot influence alone; SVC accuracies are 96.4% and 94.8%, respectively. Network propagation therefore improves accuracy modestly on this subset while extending coverage beyond direct political-account connections.

## Limitations

- Evidence concerns one politically selected Twitter population and election, with ambiguous and unlabeled accounts excluded; transfer to other populations remains untested here.
- Equilibrium distributions do not establish temporal predictive validity or identify imitation as the causal source of observed affiliations.
- Direct political-account connections explain much of the performance. Known zealot affiliations and their reachability are central assumptions.
- Retweets, follows, and mentions have different meanings. Mention-network argmax accuracy for FN falls to 2%; removing both direction and weights yields 6% for FN.
- The supplied main text does not specify train/test splits for the auxiliary SVC and logistic regression evaluations. Computational details are assigned to supplemental material not supplied here.

## Related Concepts

- [[concepts/voter-model|Voter Model]] — extends copying dynamics to multiple states and fixed zealots for empirical affiliation inference.

## Related Papers

- Vendeville, Zhou, and Guedj (2024), *Physical Review E* **109**, 024312 — source of the complex-network multistate equilibrium and discord equations (reference 11).
- Yildiz et al. (2013), *ACM Transactions on Economics and Computation* **1**, 1 — cited for equilibrium uniqueness and the zealot-hitting interpretation (reference 12).
- Fernández-Gracia et al. (2014), *Physical Review Letters* **112**, 158701 — earlier voter-model validation against aggregate electoral statistics (reference 26).
