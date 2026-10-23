---
title: Coupling Designs for Randomized Experiments with Complex Treatments
type: paper
authors:
  - Max Cytrynbaum
  - Fredrik Sävje
year: 2026
tags:
  - experimental-design
  - randomized-experiments
  - complex-treatments
  - stratified-randomization
  - optimal-transport
---

## TL;DR

The paper extends stratified randomization to continuous, multivariate, constrained, and irregular treatment spaces. It first matches similar units into groups and then uses negatively dependent Monte Carlo couplings to spread their treatments across the treatment space while preserving each unit's target marginal assignment distribution. The efficiency gain is governed by the interaction of treatment dispersion, within-group match quality, and alignment between the estimator's influence functions and the coupling's high-dispersion directions.

## Research Question

How can an experiment preserve a complex target treatment distribution while using baseline covariates to improve precision, without discretizing the treatment or requiring matched groups large enough to contain every treatment level?

## Motivation

Matched pairs and matched tuples improve precision for a small number of discrete treatments by assigning different treatments to similar units. This construction does not directly extend to continuous doses, large treatment catalogs, constrained multivariate interventions, or irregular assignment probabilities. Discretization can change the estimand and requires larger matched groups, which degrades match quality. [[concepts/coupling-designs|Coupling Designs]] retain the desired marginal distribution while coordinating assignments within smaller matched groups.

## Contributions

- Defines a family of designs that match units into homogeneous groups and draw each group's assignments from an exchangeable coupling with fixed treatment marginals.
- Constructs dispersed assignments by combining Monte Carlo methods such as antithetic variates, Latin hypercube sampling, rotation sampling, and Gaussian copulas with geometry-preserving [[concepts/optimal-transport|Optimal Transport]] maps.
- Shows that efficiency depends on dispersion times match quality in a simple model, and gives a spectral generalization based on the eigenspaces of a coupling operator for general influence functions.
- Establishes consistency, asymptotic normality, and conservative collapsed-strata variance estimation for a broad class of estimators.
- Demonstrates that maximizing dispersion alone can be inefficient when it requires large tuples or changes the marginal treatment distribution.

## Method

Units are first partitioned into groups of size $k$ using baseline covariates. Within each group, assignments $(D_1,\ldots,D_k)$ are drawn jointly from an exchangeable coupling $G$ whose marginals all equal the target distribution $F$. The assignments are negatively dependent so that treatments are more dispersed than independent draws. For complex multivariate supports, the design first creates dispersed points in $[0,1]^m$ and maps them to the treatment space using a transport map; the Brenier map is proposed when preserving geometry is important.

For a scalar function $\phi$ of treatment, dispersion is a normalized increase in expected within-group sample variance relative to independent assignment. Under exchangeability it is also the normalized negative pairwise correlation of $\phi(D_i)$ and $\phi(D_j)$. Match quality measures how similar the estimator's unit-level influence functions are within matched groups. For influence functions of the form $s_i(d)=c_i+a_i\phi(d)$, the paper obtains

$$
1-\frac{\operatorname{Var}_G(\widehat\theta)}{\operatorname{Var}_{\mathrm{iid}}(\widehat\theta)}
=\operatorname{Disp}_G(\phi)\,Q_k(s).
$$

For general square-integrable influence functions, the coupling operator

$$
(U_G\phi)(d)=\mathbb{E}_G[\phi(D_i)\mid D_j=d],\qquad i\ne j,
$$

decomposes the function space into eigenspaces. The total efficiency gain becomes a weighted sum of dispersion-times-match-quality terms across these principal directions. This explains why Latin hypercube and rotation sampling work broadly for smooth functions, while the Gaussian copula mainly disperses approximately linear components when $k$ is moderate.

## Experiments

The application reconstructs treatment catalogs from social-network data for 75 Karnataka villages. Candidate savings monitors are represented by degree centrality and clustering coefficient, producing village-specific irregular point clouds. Each village supplies 64 savers and 64 candidate monitors, for 4,800 savers in total. A semi-discrete transport map sends coupled uniform draws to each village's non-uniform monitor distribution.

Simulations compare Latin hypercube, shifted-lattice, and scrambled-digital-net couplings over tuple sizes $k\in\{2,4,8,16,32\}$ under within-village and pooled matching. In the highly predictive regime, pooled matching yields efficiency gains up to 28.4%; in the weakly predictive regime, its gains peak at 8.8%. Within-village matching peaks at 13.6% and 3.5%, respectively, then deteriorates as larger tuples exhaust the local matching pool. Forced stratification with $k=64$ produces efficiency gains near $-52\%$ because it combines poor matching with a uniform assignment that differs from the target marginal and therefore requires reweighting.

Collapsed-strata confidence intervals for the centrality coefficient attain at least the nominal 95% coverage in the reported simulations. Coverage becomes conservative for the largest within-village tuples, a pattern also present under the iid benchmark and attributed to the variance estimator rather than the coupling.

## Limitations

- The main framework restricts attention to exchangeable couplings with fixed marginals; non-exchangeable assignments and flexible marginals may offer additional gains.
- Efficiency depends on useful baseline covariates and sufficiently smooth influence functions. Poor matching or alignment with a coupling's low-dispersion directions can erase gains or increase variance.
- Rotation sampling has an especially adverse worst case for highly oscillatory cyclic influence functions, while Gaussian couplings become restrictive beyond approximately linear components as tuple size grows.
- Larger tuples increase attainable dispersion but generally worsen match quality, so no coupling or tuple size is uniformly optimal.
- The empirical section is a design-based simulation grounded in an earlier savings-monitor experiment and real network catalogs, not a newly implemented field experiment.
- The proposed collapsed-strata variance estimator is conservative and may remain upward biased when paired groups have heterogeneous effects.

## Related Concepts

- [[concepts/coupling-designs|Coupling Designs]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/bayesian-experimental-design|Bayesian Experimental Design]]: another approach to choosing informative assignments, but one driven by a probabilistic utility rather than fixed-marginal covariate balance.

## Related Papers

- Hammersley and Morton (1956), "A New Monte Carlo Technique: Antithetic Variates": supplies the paired negative-dependence construction.
- McKay, Beckman, and Conover (1979), "A Comparison of Three Methods for Selecting Values of Input Variables in the Analysis of Output from a Computer Code": introduces Latin hypercube sampling.
- Morgan and Rubin (2012), "Rerandomization to Improve Covariate Balance in Experiments": a discrete-treatment design approach discussed as related work.
- Harshaw et al. (2024), "Balancing Covariates in Randomized Experiments with the Gram-Schmidt Walk Design": a covariate-balancing design for discrete treatments.
- Breza and Chandrasekhar (2019), "Social Networks, Reputation, and Commitment: Evidence from a Savings Monitors Experiment": motivates the network-monitor application.

[[index|Library home]]
