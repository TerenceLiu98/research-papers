---
title: "Interpretable Causal Discovery via Causal-Effect Constraints"
type: paper
authors:
  - Cixuan Zhang
  - Guy Van den Broeck
  - Benjie Wang
year: null
tags:
  - causal-discovery
  - bayesian-causal-discovery
  - rare-event-inference
  - adaptive-multilevel-splitting
  - structural-equation-models
---

## TL;DR

This paper formulates [[concepts/conditional-causal-discovery|Conditional Causal Discovery]] as Bayesian inference over causal graphs and parameters subject to causal-effect constraints. It uses [[concepts/adaptive-multilevel-splitting|Adaptive Multilevel Splitting]] with graph-and-weight MCMC moves to estimate rare posterior event probabilities and sample the corresponding constrained posterior, enabling pathway-level summaries when ordinary posterior sampling yields few or no qualifying states.

## Research Question

Given observational data and a constraint such as an unusually large signed causal effect, how can one estimate the posterior probability of that event and characterize the causal graphs, parameters, and pathways that remain plausible when it occurs?

## Motivation

Bayesian causal discovery represents uncertainty over multiple plausible structures, but scientific questions often concern a particular phenomenon rather than the unconstrained posterior as a whole. Direct rejection from ordinary posterior samples is ineffective when the event has small posterior mass. The paper therefore treats extreme-effect conditioning as rare-event inference while retaining uncertainty over both graph structure and mechanism parameters.

## Contributions

- Defines conditional causal discovery as a posterior over graph-parameter states conditioned on one or more quantitative causal-effect constraints.
- Expresses right-tail, left-tail, interval, and conjunctive effect queries through a scalar score and a target level.
- Adapts adaptive multilevel splitting to the joint graph-weight space, returning both a tail-probability estimate and approximate samples from the constrained posterior.
- Combines splitting with either Structure-MCMC or PARNI-DAG proposals and blocked updates of linear-Gaussian edge coefficients.
- Evaluates probability estimation, multi-effect conditioning, and scalability on synthetic graphs, then uses the Sachs protein-signaling data to demonstrate pathway-level summaries.

## Method

The state is $Z=(G,B)$, where $G$ is a directed acyclic graph and $B$ is the weighted adjacency matrix of a linear-Gaussian structural equation model. With a graph prior, BGe marginal likelihood, and node-wise coefficient posterior, the unconstrained target is $\pi(Z)=p(G,B\mid\mathcal D)$. The signed total effect from $i$ to $j$ is

$$
\mathrm{CE}_{ij}(G,B)=[(I-B)^{-1}]_{ij},
$$

which sums products of edge weights over directed paths. A query becomes an event $\{Z:h(Z)\geq\lambda_\star\}$. For multiple inequalities, the score is the minimum normalized margin, so reaching level zero means satisfying every constraint.

Adaptive multilevel splitting maintains a particle population and advances through empirical score quantiles. At each level it retains particles above the threshold, multiplies the estimated survival fraction into the event-probability estimate, resamples survivors, and applies an MCMC kernel restricted to the current level set. Structure moves propose a new DAG and refresh affected coefficient blocks; weight moves refresh a coefficient block while holding the graph fixed. Proposals that leave the current score region are rejected.

## Experiments

**Synthetic setup.** The authors generate linear-Gaussian data with 1,000 observations from Erdos-Renyi DAGs with $d\in\{4,8,16,32\}$. They instantiate splitting with Structure-MCMC and PARNI-DAG and compare against exhaustive enumeration where feasible, DiBS, OrderSPN, and long unconditional MCMC chains.

**Single-effect validation.** Across ten four-node test cases and ten runs per method, both splitting variants and most baselines broadly agree with exhaustive enumeration. DiBS overestimates the tested tail probabilities by orders of magnitude and is excluded from later experiments.

**Multiple constraints.** Constraints centered on known generating effects concentrate the conditional posterior toward the generating graph. For $d=4$, moving from weak to strong constraints reduces mean structural Hamming distance from $0.325\pm0.164$ to $0.115\pm0.053$ and raises the exact-match fraction from $0.790\pm0.117$ to $0.885\pm0.053$. For $d=8$, mean distance falls from $5.342\pm0.442$ to $2.290\pm0.199$, while the exact-match fraction rises from $0.040\pm0.027$ to $0.108\pm0.066$.

**Scalability.** On 8-, 16-, and 32-node problems, the splitting estimates produce smoothly decreasing tail curves as thresholds tighten, whereas unconditional methods stop producing qualifying samples in deeper tails. At 32 nodes, PARNI-DAG is more stable across runs than the cheaper Structure-MCMC kernel; no exact enumerative reference is available at these scales.

**Sachs case study.** On 7,466 measurements of 11 proteins, the reported posterior masses are $2.2\times10^{-7}$ for the PIP3-to-PIP2 constraint, $1.3\times10^{-7}$ for Erk-to-Akt, and $5.2\times10^{-7}$ for the joint event. Under PIP3-to-PIP2 conditioning, the direct and Plcg-mediated routes appear in all reported conditional samples and account for essentially all of the mean effect of about 0.776. Erk-to-Akt remains mostly direct under its single constraint; joint conditioning increases the frequency of an Erk-to-Plcg-to-Akt route. The authors present these as conditional explanations, not new biological discoveries.

## Limitations

The implementation assumes linear-Gaussian structural equation models, causal sufficiency, and a DAG representation. Its total-effect score has a closed form unavailable in general nonlinear models, while latent confounding and interventional data are not modeled. Exact validation is limited to four-node graphs; larger experiments rely on stability and threshold-consistency checks rather than a gold-standard posterior. The quality of constrained samples depends on mixing within each truncated region, and the 32-node results show sensitivity to the structure proposal. The Sachs consensus network is only a qualitative reference, and the pathway summaries are conditional on specified thresholds, priors, preprocessing, and model assumptions.

## Related Concepts

- [[concepts/conditional-causal-discovery|Conditional Causal Discovery]]
- [[concepts/adaptive-multilevel-splitting|Adaptive Multilevel Splitting]]
- Bayesian causal discovery
- Structural equation models
- Markov chain Monte Carlo
- Causal effects

## Related Papers

- [[papers/toward-causal-representation-learning|Toward Causal Representation Learning]]: broader account of causal discovery, interventions, and the assumptions needed to learn causal structure.
- [[papers/causally-reliable-concept-bottleneck-models|Causally Reliable Concept Bottleneck Models]]: another Wiki study using causal DAGs and the Sachs network, but for graph-structured concept prediction rather than rare-event posterior conditioning.
- Cérou and Guyader (2007), "Adaptive Multilevel Splitting for Rare Event Analysis": the splitting method adapted to constrained causal posteriors.
- Liang et al. (2023), "Structure Learning with Adaptive Random Neighborhood Informed MCMC": the PARNI-DAG structure kernel used by one implementation.
- Sachs et al. (2005), "Causal Protein-Signaling Networks Derived from Multiparameter Single-Cell Data": source of the real-data case study.

[[index|Library home]]
