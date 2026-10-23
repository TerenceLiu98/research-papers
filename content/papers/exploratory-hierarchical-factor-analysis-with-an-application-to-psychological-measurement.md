---
title: Exploratory Hierarchical Factor Analysis with an Application to Psychological Measurement
type: paper
authors:
  - Jiawei Qiao
  - Yunxiao Chen
  - Zhiliang Ying
year: null
source_job_id: "e683b017-739f-4504-aac0-d8d5e638c4f8"
tags:
  - factor-analysis
  - hierarchical-factor-models
  - model-selection
  - psychometrics
---

## TL;DR

The paper establishes conditions under which a linear hierarchical factor loading structure is identifiable and proposes a top-down divide-and-conquer estimator for learning it. The estimator combines information-criterion search with constrained continuous optimization and is consistent under stated regularity conditions when its optimization subproblems are solved exactly. Across four simulations it exactly recovers a ten-factor, four-layer structure in 83%-98% of replications. An IPIP-NEO Agreeableness application selects a four-layer, ten-factor model with lower BIC than three confirmatory or bifactor alternatives.

## Research Question

When the number, nesting, and item membership of hierarchical factors are unknown, can their structure be identified from the observed covariance matrix and recovered by a computationally usable exploratory procedure?

## Motivation

Hierarchical constructs occur in psychology, economics, health measurement, and marketing, but specifying their loading zeros a priori is demanding and vulnerable to misspecification. The commonly used Schmid-Leiman transformation builds a hierarchy through oblique factor analyses and rotations, yet it imposes proportionality restrictions that general hierarchical factor models need not satisfy. Exhaustively comparing all possible trees is combinatorial.

## Contributions

- Formalizes a hierarchical factor model as nested or disjoint item-loading sets forming a tree, with a general factor at its root and either zero or at least two children per factor.
- Gives sufficient conditions under which the loading matrix is unique up to column sign flips, making the hierarchy identifiable.
- Introduces an information-criterion-based (ICB) procedure that recursively learns the children of each factor from the top layer downward.
- Proves consistent recovery of the number of layers, number of factors, loading sets, loadings, and unique variances under fixed-dimensional asymptotics and exact solution of the optimization subproblems.
- Evaluates structural and parameter recovery in simulations and compares the learned hierarchy with alternative measurement models on personality data.

## Method

For covariance matrix $\Sigma$, the model is $\Sigma=\Lambda\Lambda^\top+\Psi$, where $\Psi$ is diagonal and columns of $\Lambda$ correspond to nested factors. Every item loads on the general factor. For any two lower factors, their loading sets are either nested or disjoint; the children of an internal factor partition its loading set. Disallowing a single child prevents a parent-child pair from remaining rotationally unidentified.

The algorithm begins at the general factor and repeatedly applies the ICB procedure to each factor in the current layer. For a candidate number of children, ICB seeks a partition of the parent's items and a compatible block-sparse loading matrix. It first uses a common upper-bound dimension to identify a partition, then refines the dimension assigned to each block and selects among zero or at least two children using a likelihood-based information criterion. The penalty is designed to reject rank-degenerate over-specified structures. The otherwise combinatorial partition problem is represented by nonlinear zero constraints and approached with an augmented Lagrangian algorithm; the implementation uses multiple random initializations and a greedy search.

The identifiability theorem requires rank and loading conditions in addition to the tree constraints. The consistency theorem adds local full-rank conditions, $N^{-1/2}$ covariance estimation, bounded loadings, and sufficiently large search bounds. It yields exact structural recovery with probability approaching one and $N^{-1/2}$ Frobenius error for $\Lambda$ (up to signs) and $\Psi$.

## Experiments

### Simulation

The data-generating hierarchy has $K=10$ factors across four layers. The study crosses $J\in\{36,54\}$ items with $N\in\{500,2000\}$ observations and runs 100 replications per setting. Nonzero general-factor loadings are positive Uniform$(0.5,2)$ draws; other nonzero loadings have random signs and magnitudes from the same interval; $\Psi$ is the identity.

| $J$ | $N$ | Exact structural recovery | Loading MSE | Unique-variance MSE |
| ---: | ---: | ---: | ---: | ---: |
| 36 | 500 | 0.83 | $2.90\times10^{-3}$ | $1.58\times10^{-2}$ |
| 36 | 2000 | 0.88 | $0.74\times10^{-3}$ | $3.76\times10^{-3}$ |
| 54 | 500 | 0.95 | $2.66\times10^{-3}$ | $6.39\times10^{-3}$ |
| 54 | 2000 | 0.98 | $0.65\times10^{-3}$ | $1.64\times10^{-3}$ |

The second layer is recovered in every replication. Third-layer recovery ranges from 0.83 to 0.98 and determines overall exact recovery; fourth-layer recovery ranges from 0.88 to 0.98.

### Personality Application

The application analyzes 24 five-point IPIP-NEO items from 1,655 UK participants aged 30-50, with four items intended for each of six Agreeableness facets. The learned model has ten factors and four layers. The authors interpret its root as general Agreeableness and its branches as combinations and refinements of Trust, Altruism, Sympathy, Morality, Cooperation, Modesty, and weak aggression; one lower factor is described as weak and difficult to interpret.

The learned hierarchical model has BIC 102,988.72, compared with 103,804.43 for six-factor correlated CFA, 103,200.42 for confirmatory correlated bifactor analysis, and 103,048.00 for exploratory bifactor analysis. These are in-sample model-selection comparisons, not external validation of the substantive factor labels.

## Limitations

- The consistency result assumes that nontrivial optimization subproblems, including a discrete partition problem, are solved completely. The paper explicitly notes that exact solution is not available in polynomial time; practical augmented-Lagrangian and greedy solutions therefore do not inherit the theorem automatically.
- The asymptotics hold with the number of observed variables fixed. Growing-dimensional settings may require a stronger information-criterion penalty and new theory.
- The model assumes a general factor. The authors outline a modification without one, but do not evaluate it.
- The framework is linear and covariance-based, making it most directly applicable to continuous variables. Binary, ordinal, and nominal measurements require a nonlinear extension.
- The simulation uses one generated loading matrix per item count, correctly specified models, four settings, and no comparison method. It therefore demonstrates recovery under the chosen design rather than broad robustness or computational superiority.
- Hyperparameter bounds for child and descendant counts require practitioner choices informed by problem size or prior knowledge.
- The application section calls the analyzed scale “Extraversion” while its item facets, tables, and interpretation concern Agreeableness. This apparent manuscript inconsistency should be resolved before treating that label as metadata.
- The supplied Markdown reports no publication year, venue, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/exploratory-hierarchical-factor-analysis|Exploratory Hierarchical Factor Analysis]]: structure learning for nested latent factors when their loading pattern is unknown.
- [[concepts/hierarchical-latent-trait-models|Hierarchical Latent Trait Models]]: related measurement models in which lower-level abilities depend on broader latent traits.
- [[concepts/bifactor-item-response-models|Bifactor Item Response Models]]: the two-layer general-plus-specific structure that motivates, but is narrower than, the hierarchy studied here.

## Related Papers

- Qiao, Chen, and Ying (2025), “Exact exploratory bi-factor analysis: A constraint-based optimisation approach”: the two-layer predecessor reused as a computational building block.
- Schmid and Leiman (1957), “The development of hierarchical factor solutions”: the standard transformation criticized for unnecessary proportionality constraints.
- Jennrich and Bentler (2011), “Exploratory bi-factor analysis”: provides an example where the Schmid-Leiman transformation fails to recover a bifactor loading structure.
- Yung, Thissen, and McLeod (1999), “On the relationship between the higher-order factor model and the hierarchical factor model”: establishes the restrictive relationship underlying the paper's critique.
- [[papers/generalized-full-information-item-bifactor-analysis|Generalized Full-Information Item Bifactor Analysis]]: a library comparison focused on estimation for mixed-format, multiple-group bifactor response models; it is not cited by this manuscript.

[[index|Library home]]
