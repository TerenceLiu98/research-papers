---
title: Generalized Ideal Point Models for Noisy Dynamic Measures in the Social Sciences
type: paper
authors:
  - Robert Kubinec
year: 2025
date: "2025-07-16"
source_job_id: "8d1e3e01-6a65-4379-ba42-9281d10eaaec"
tags:
  - political-methodology
  - ideal-point-estimation
  - bayesian-measurement
  - missing-data
  - time-series
---

## TL;DR

The paper introduces `idealstan`, a Bayesian framework combining four temporal specifications, mixed outcome distributions, and a selection model for missing responses in dynamic ideal point estimation. In simulations generated from its model family, Hamiltonian Monte Carlo (HMC) generally recovers latent positions more accurately than the tested alternatives; faster posterior approximations retain consequential errors. An application estimates monthly U.S. House positions over 1990-2018 and favors low-degree splines for sparse voting data, showing that temporal assumptions and treatment of absences can change estimated political trajectories.

## Research Question

How can dynamic ideal point models recover interpretable latent traits from noisy, sparse, heterogeneous observations when participation itself may depend on the trait being measured?

## Motivation

Fine temporal resolution creates a measurement problem: fewer observations per period must identify both a latent position and its movement. Flexible trajectories can absorb voting schedules or noise, while restrictive ones can miss meaningful change. Ignoring selective voting or survey response can further distort positions. The framework combines these problems within [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]] rather than treating temporal modeling, response distributions, and missingness as separate estimation tasks.

## Contributions

- Integrates random walks, AR(1) processes, basis splines, and Gaussian processes as priors on time-varying ideal points.
- Adds a hurdle selection model in which observed responses and nonresponse depend on a shared latent trait through different item parameters.
- Supports binary, Normal, log-Normal, Poisson, ordinal, and ordered-beta outcomes, including mixtures across items.
- Combines item-based identification, Pathfinder initialization, HMC, within-chain parallelization, and optional Pathfinder or Laplace posterior approximations in one R package.
- Evaluates recovery and downstream regression errors in simulations, then compares monthly legislative trajectories with and without missing-vote adjustment.

## Method

### Measurement and Temporal Structure

For the binary case, the response probability is

$$
\Pr(Y_{ijt}=1\mid\alpha_{it},\gamma_j,\beta_j)
=\operatorname{logit}^{-1}(\gamma_j\alpha_{it}-\beta_j),
$$

where $\alpha_{it}$ is person $i$'s ideal point at time $t$, $\gamma_j$ is item discrimination, and $\beta_j$ is item difficulty. Negative and positive discrimination allow items to measure opposing poles. Alternative likelihoods accommodate other response types while retaining the shared latent trait.

| Temporal prior | Measurement assumption and tradeoff |
| --- | --- |
| Random walk | Positions accumulate innovations; estimating each time point allows substantial variation. |
| AR(1) | Deviations decay under stationarity, expressing a tendency to return toward a stable long-run level. |
| Basis spline | Degree and knot placement constrain trajectory complexity; fewer coefficients can stabilize sparse periods and permit interpolation. |
| Gaussian process | A squared-exponential covariance controls temporal dependence, variation, and smoothing; flexibility increases computational and identification demands. |

The paper does not posit a universally best temporal process. Its legislative application uses smoothness as a substantive assumption about ideology, not merely a convergence aid.

### Selection and Identification

[[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]] is represented by a logistic hurdle for nonresponse, with separate discrimination and difficulty parameters but the same $\alpha_{it}$. A missing response contributes its nonresponse probability; an observed response contributes the probability of participation multiplied by its response likelihood. Zero missingness discrimination makes nonresponse independent of the latent position conditional on the item. Nonzero discrimination indicates association, without identifying why an actor abstained.

The proposed identification scheme puts generalized-beta priors on discrimination parameters with support $(-1,1)$ and strongly anchors selected items near opposite ends. Ideal points and difficulty parameters receive weak Normal priors. Anchoring items distributed through time is intended to sustain orientation beyond actors' starting positions; the missingness extension can require additional anchors in difficult cases.

### Computation

Stan supplies HMC and noncentered parameterizations. Pathfinder approximates the posterior to initialize HMC near a common mode. Conditional likelihood computations are parallelized across people for dynamic models. Pathfinder and Laplace can also supply final approximate posterior estimates, with accuracy assessed separately from HMC. Parallel speedups depend on data size, available cores, and communication overhead.

The "Big Data Inference" section reports that moving from one to four cores reduces estimation time for a medium-sized dataset from approximately 20 to 7 minutes. This is an illustrative result attributed to supplementary Section 3, which is not included in the supplied Markdown; it is not a general runtime guarantee.

## Experiments

### Monte Carlo Comparison

The study reports 5,760 simulation draws across 288 conditions, using 30 people, 100-400 items, 10-20 time points, four temporal processes, and settings with and without non-ignorable missing data. Outcomes are binary. Comparators include MCMCpack, emIRT, and DW-NOMINATE, alongside idealstan HMC, Pathfinder, and Laplace. HMC and emIRT receive four cores. Estimates are standardized and sign-aligned before comparison.

Metrics are ideal-point RMSE, Kendall's tau, runtime, and downstream regression errors. The downstream interaction coefficient is fixed at 0.025. Type S errors concern statistically significant estimates with the wrong sign; Type M errors measure the magnitude ratio to the true coefficient conditional on significance.

Reported findings from Figures 1-5 and the accompanying discussion are:

- HMC generally achieves lower RMSE and better rank recovery across generating processes, with little loss from the modeled missingness. The author explicitly notes that idealstan matches the simulation's generating family.
- MCMCpack and emIRT deteriorate under non-ignorable missingness. MCMCpack performs best on its native random-walk specification; emIRT performs particularly well on spline-generated trajectories, including lower RMSE than the two idealstan approximations.
- Pathfinder and Laplace are often more robust to missingness than unadjusted alternatives, but fall behind HMC on Gaussian-process trajectories and retain high Type M errors in missing-data settings. Differences in Type S error are more modest.
- emIRT is fastest, followed by Pathfinder and Laplace. Four-core HMC becomes faster than MCMCpack as item counts increase. The supplied text does not provide numerical RMSE or rank-correlation tables, so no exact accuracy gains are inferred from the figure references.

### U.S. House Application

The application first compares temporal models for the 115th Congress, then fits spline models over 1990-2018. Degrees 2, 3, and 4 are compared; the longer series uses presidential administrations to place knots. Republican party-line vote discriminations are constrained positive.

Flexible random-walk, AR(1), and Gaussian-process fits show some abrupt movements that the author considers implausible as changes in ideology. Splines retain smoother movement with fewer parameters. Justin Amash's trajectory shifts in the conservative direction across specifications; Tim Walz's late-session liberal shift appears primarily after modeling missing votes. Proposed links to political events or electoral incentives are interpretations, not causal tests.

Aggregated party trajectories suggest separation increasing toward 2012 and moderating through 2018, with stronger moderation in the missingness-adjusted fits. These estimates differ from the DW-NOMINATE comparison discussed in the paper. They demonstrate sensitivity to measurement choices; they do not independently establish which account of [[concepts/political-polarization|Political Polarization]] is correct.

## Limitations

- The analysis is one-dimensional. Multiple dimensions are left for future work, and mixed non-binary outcomes are supported by the framework but not evaluated in the comparative simulation.
- Simulations favor a correctly specified idealstan model family. Limited repetitions make downstream Type S and Type M summaries less precise than statistics aggregated over many ideal points. Standardization and sign correction also condition the comparison.
- Convergence and flexible temporal fit do not establish construct validity. Item anchors, smoothness, and sparse observations affect interpretation; uncertainty intervals are omitted from several empirical plots.
- The selection model assumes a particular shared-trait relationship between response and nonresponse. It does not prove strategic intent or guarantee robustness to arbitrary missing-data mechanisms.
- The author acknowledges that stronger moderation near 2018 could reflect strategic abstention, the artificial endpoint of the series, or both. Differences from DW-NOMINATE do not provide an external validity benchmark.
- The supplied extraction contains damaged mathematical notation, inconsistent event dates in the empirical narrative, and references to supplementary material not included in the Markdown. Those dates and malformed formulas are not used as evidence here. The manuscript is dated July 16, 2025; its own venue, DOI, and arXiv identifier are not supplied.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: the latent response-model foundation extended with temporal and selection components.
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: temporal priors, identification, and sparse latent-trait measurement.
- [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]]: joint modeling of participation and observed responses.
- [[concepts/text-scaling-models|Text Scaling Models]]: a related measurement family; the paper discusses Poisson Wordfish as an example of extending beyond binary outcomes.
- [[concepts/political-polarization|Political Polarization]]: substantive interpretation of estimated legislative trajectories.

## Related Papers

- Martin and Quinn (2002), "Dynamic Ideal Point Estimation via Markov Chain Monte Carlo for the U.S. Supreme Court, 1953-1999": the cited random-walk foundation.
- Rosas, Shomer, and Haptonstahl (2015), "No News Is News: Nonignorable Nonresponse in Roll-Call Data Analysis": the cited treatment of selective legislative participation.
- Imai, Lo, and Olmsted (2016), "Fast Estimation of Ideal Points with Massive Data": the cited variational estimation approach.
- [[papers/computational-measurement-of-political-positions-a-review-of-text-based-ideal-point-estimation-algorithms|Computational measurement of political positions: a review of text-based ideal point estimation algorithms]]: a library comparison on how modeling decisions turn text into political positions; not a citation in this manuscript.
- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: a library comparison on external validation of positions and uncertainty; not a citation in this manuscript.
- [[papers/modeling-item-response-theory-with-stochastic-variational-inference|Modeling Item Response Theory with Stochastic Variational Inference]]: a library comparison on scalable approximate Bayesian measurement; its static response-prediction task differs from this paper's dynamic recovery and selection-model evaluation. Not a citation in this manuscript.

[[index|Library home]]
