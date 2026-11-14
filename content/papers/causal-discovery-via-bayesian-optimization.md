---
title: Causal Discovery via Bayesian Optimization
type: paper
authors:
  - Bao Duong
  - Sunil Gupta
  - Thin Nguyen
year: null
tags:
  - causal-discovery
  - bayesian-optimization
  - structure-learning
---

[[index|Library home]]

## TL;DR

DrBO searches for high-scoring causal DAGs using Bayesian optimization with node-wise dropout neural surrogates. A compact acyclic graph representation and continual surrogate updates improve graph recovery per score evaluation on synthetic and benchmark data. Runtime gains are setting-dependent: the method incurs substantial overhead per evaluation on linear problems.

## Research Question

Can uncertainty-aware reuse of previous graph evaluations make observational score-based causal discovery more accurate and economical than gradient-based or reinforcement-learning search?

## Motivation

DAG search is combinatorial, and scoring nonlinear causal models can be expensive. Conventional Gaussian-process Bayesian optimization also scales poorly with evaluation history and search dimension. DrBO addresses both the graph search space and the cost of learning and evaluating its surrogate.

## Contributions

- Introduces a low-rank continuous representation that guarantees acyclicity and uses d(1+k) parameters for d nodes and embedding dimension k.
- Models local score components with independent dropout networks, combining stochastic predictions into a Thompson-sampling acquisition value.
- Updates networks continually with new evaluations and reservoir-sampled replay, avoiding full-history retraining at every iteration.
- Evaluates recovery accuracy, evaluation budgets, runtime, and component ablations across linear, nonlinear, binary, and benchmark settings.

## Method

An edge i → j exists when node potentials satisfy p_i < p_j and the inner product of their embeddings is positive. Increasing potentials prevent cycles; the embedding Gram matrix selects connections. Positive rescaling preserves the graph, permitting bounded search. Small k reduces dimension but need not represent every DAG (Section 4.1).

Candidates are generated near the best representation in an adaptive trust region. Each node has an independent dropout network mapping its binary parent-set indicator to a local score, such as log regression MSE. Stochastic forward passes approximate posterior draws, which are combined according to the equal- or unequal-variance BIC formula. The top acquisition candidates receive actual score evaluations. This is uncertainty about scores for optimization, not a posterior over causal graphs.

Default settings include rank 8, 100,000 preliminary candidates, evaluation batches of 64, and ten gradient updates with 1,024 replay observations. The highest-scoring graph is optionally pruned: linear coefficient thresholding, CAM tests, or conditional independence tests depending on the setting. The main nonlinear GP experiment uses no pruning. See [[concepts/surrogate-assisted-dag-search|Surrogate-Assisted DAG Search]].

## Experiments

Main synthetic experiments use 1,000 observations and five random datasets. Comparators include ALIAS, CORL, COSMO, DAGMA, GOLEM, and NOTEARS with TMPI. SHD counts edge additions, deletions, and reversals needed to recover the reference graph; lower is better. Appendix H reports the following mean ± standard deviation:

| Setting and budget | DrBO SHD | Comparator SHD | DrBO / comparator runtime, minutes |
| --- | --- | --- | --- |
| Linear, 30 nodes and about 240 edges; 50,000 evaluations | 1.6 ± 1.5 | ALIAS: 105.2 ± 2.9 | 22.9 / 2.4 |
| Linear, 100 nodes and about 200 edges; 50,000 evaluations | 1.4 ± 1.1 | DAGMA: 6.6 ± 4.0 | 62.7 / 0.3 |
| Nonlinear GP, 10 nodes and about 40 edges; 20,000 evaluations | 0.4 ± 0.5 | ALIAS: 4.0 ± 2.3 | 6.1 / 8.0 |

These are fixed-evaluation comparisons, not matched-runtime comparisons. The paper separately tracks accuracy over elapsed time, counting a gradient update as one evaluation for gradient-based baselines.

On Sachs observational protein-signaling data (853 observations, 11 nodes, 17 reference edges), DrBO obtains SHD 9 after conditional-independence pruning. The bnlearn experiment generates linear-Gaussian observations on five established network structures; it does not use their original discrete observations. DrBO achieves mean SHD zero on Asia, Cancer, Child, and Earthquake, and 1.0 ± 2.2 on Alarm (Table 1).

Ablations support local rather than direct graph-score prediction, low-rank representations, dropout surrogates, and continual updates. Extensions cover BGe scores, binary logistic data, alternative noise distributions, and standardized data. Standardized linear experiments use 100,000 observations and a reduced pruning threshold of 0.01. In Appendix G, CAM pruning increases nonlinear DrBO SHD from the unpruned 0.4 to 4.2 ± 1.3; SCORE ties DrBO at zero SHD on the small linear setting.

## Limitations

Causal recovery assumes causal sufficiency, minimality, and an identifiable model class. Better optimization cannot resolve general observational nonidentifiability; BGe experiments instead evaluate Markov-equivalence recovery. Hidden confounders are future work. Low-rank search may exclude graphs, and dropout supplies approximate uncertainty. The authors identify fixed surrogate capacity and simple continual learning as limitations. Evaluation counts do not equal computational cost, and baseline objectives differ.

The supplied manuscript does not state its publication year or a stable paper identifier; these are left unspecified. The implementation link supplied by the authors is https://github.com/baosws/DrBO.

## Related Concepts

- [[concepts/surrogate-assisted-dag-search|Surrogate-Assisted DAG Search]]
- [[concepts/bayesian-experimental-design|Bayesian Experimental Design]]: a related use of sequential information gathering; DrBO selects computational score evaluations rather than physical interventions.

## Related Papers

- [[papers/multi-objective-causal-bayesian-optimization|Multi-Objective Causal Bayesian Optimization]]: optimizes interventions with a known causal graph, whereas DrBO searches for an unknown observational graph.
- Duong, Le, and Nguyen (2024), *ALIAS: DAG Learning with Efficient Unconstrained Policies*: supplies the Vec2DAG representation adapted by DrBO and an RL search comparator.
- Massidda et al. (2024), *Constraint-Free Structure Learning with Smooth Acyclic Orientations*: related acyclic parameterization and the COSMO comparator.
