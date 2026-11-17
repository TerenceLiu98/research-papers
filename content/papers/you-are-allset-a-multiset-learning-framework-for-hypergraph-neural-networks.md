---
title: "You Are AllSet: A Multiset Learning Framework for Hypergraph Neural Networks"
type: paper
authors:
  - Eli Chien
  - Chao Pan
  - Jianhao Peng
  - Olgica Milenkovic
year: null
tags:
  - hypergraph-neural-networks
  - multiset-learning
  - node-classification
---

## TL;DR

AllSet expresses hypergraph propagation as two learnable permutation-invariant aggregations, from nodes to hyperedges and back. Its attention-based AllSetTransformer performs more consistently than its sum-based AllDeepSets variant across 13 datasets, despite their shared theoretical motivation from universal multiset approximation.

## Research Question

Can a common hypergraph learning framework encompass clique-expansion and tensor-based propagation while learning aggregation rules appropriate to each dataset?

## Motivation

[[concepts/hypergraphs|Hypergraphs]] retain group interactions that pairwise clique expansion can obscure. Fixed propagation rules constrain the interactions a model can represent, while explicitly expanding large hyperedges into cliques can require quadratic numbers of edges.

## Contributions

- A two-stage multiset formulation encompassing HGNN, HCHA, HNHN, HyperSAGE, and, through a recipient-specific variant, HyperGCN and graph message passing.
- AllDeepSets and AllSetTransformer, which parameterize both aggregation stages using learned invariant functions.
- A common evaluation pipeline with ten existing datasets and three newly curated datasets: Yelp, House, and Walmart.

## Method

For node states $x_v$ and hyperedge states $z_e$, the shared-state formulation is

$$
z_e^{t+1}=f_{V\to E}(\{x_u^t:u\in e\};z_e^t),\qquad
x_v^{t+1}=f_{E\to V}(\{z_e^{t+1}:v\in e\};x_v^t).
$$

Each function is invariant to the order of its multiset input. A second formulation excludes the receiving node from each hyperedge aggregation and maintains a separate state for each node–hyperedge incidence. This more expensive formulation supports the theoretical reductions to tensor propagation and [[concepts/neural-message-passing|Neural Message Passing]]; experiments use the shared-state formulation (Section 3).

AllDeepSets applies an elementwise MLP, sums its outputs, and applies another MLP. AllSetTransformer instead uses a learned query to pool elementwise keys and values through multihead attention, followed by residual MLP and layer-normalization operations. Experiments use softmax attention. The practical models focus on the multiset inputs; incorporating the additional state arguments is left for future work.

The paper proves containment and expressivity results for the general framework and states universal-approximation results for finite multisets. Appendix F establishes its attention construction by ignoring layer normalization and selecting a general attention activation that recovers a sum; this should be distinguished from a guarantee for every fixed softmax implementation.

## Experiments

Section 6 evaluates transductive semi-supervised node classification with random 50%/25%/25% training/validation/test splits, normally over 20 runs. Baselines include MLP, clique-expanded GCN/GAT, HGNN, HCHA, HyperGCN, HNHN, UniGCNII, and full- and mini-batch HAN.

Selected Table 2 test accuracies (percent, mean ± standard deviation):

| Dataset | AllSetTransformer | AllDeepSets | Comparison |
|---|---:|---:|---|
| Yelp | 36.89 ± 0.51 | 30.36 ± 1.57 | HGNN: 33.04 ± 0.62 |
| Walmart(1) | 65.46 ± 0.25 | 64.55 ± 0.33 | HCHA: 62.45 ± 0.26 |
| NTU2012 | 88.69 ± 1.24 | 88.09 ± 1.52 | UniGCNII: 89.30 ± 1.33 |
| House(1) | 69.33 ± 2.20 | 67.82 ± 2.40 | Full-batch HAN: 71.05 ± 2.26 |

AllSetTransformer improves over HGNN on Yelp by 3.85 percentage points and over HCHA on Walmart(1) by 3.01 points. It does not lead every dataset. Its reported average rank is 2.00, versus 4.47 for AllDeepSets. Clique-expanded baselines run out of memory on 20Newsgroups and Yelp; full-batch HAN also encounters memory failures. Some slow HAN evaluations use only ten runs.

## Limitations

- House and Walmart have no original node features. Appendix I constructs 100-dimensional features from one-hot labels plus Gaussian noise, with standard deviation 1 or 0.6. These are controlled synthetic-feature benchmarks, not evidence of performance with naturally observed attributes.
- Evaluation concerns transductive node classification; hyperedge prediction and recursive hypergraphs are outside the tested scope.
- Equal theoretical approximation capacity does not imply equal empirical performance: AllDeepSets consistently trails the attention variant overall.
- HAN uses default hyperparameters, whereas other models receive tuning; runtime tables exclude preprocessing.
- The supplied Markdown does not explicitly establish a publication year or stable paper identifier; these metadata are left unspecified.

## Related Concepts

- [[concepts/hypergraphs|Hypergraphs]] — preserves membership of higher-order interactions.
- [[concepts/neural-message-passing|Neural Message Passing]] — the graph framework generalized by AllSet's recipient-specific construction.

## Related Papers

- Zaheer et al. (2017), *Deep Sets*: provides the sum-based invariant-function parameterization used in AllDeepSets.
- Lee et al. (2019), *Set Transformer: A Framework for Attention-Based Permutation-Invariant Neural Networks*: motivates learned attention pooling.
- Gilmer et al. (2017), *Neural Message Passing for Quantum Chemistry*: supplies the graph framework recovered as a special case.
- Huang and Yang (2021), *UniGNN: A Unified Framework for Graph and Hypergraph Neural Networks*: concurrent unification approach and source of the UniGCNII baseline.
