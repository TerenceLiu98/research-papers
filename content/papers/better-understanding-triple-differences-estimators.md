---
title: "Better Understanding Triple Differences Estimators"
type: paper
authors:
  - Marcelo Ortiz-Villavicencio
  - Pedro H. C. Sant'Anna
year: 2025
tags:
  - causal-inference
  - triple-differences
  - staggered-adoption
  - doubly-robust-estimation
  - event-studies
---

## TL;DR

Common [[concepts/triple-differences|Triple Differences]] implementations can be biased when identification requires covariate adjustment or treatment adoption is staggered. The paper identifies group-time average treatment effects using regression adjustment, inverse probability weighting, or doubly robust estimands, and combines valid comparison-group estimates with an optimally weighted GMM procedure. Simulations and three reanalyses show that the proposed estimators can reduce bias and improve precision relative to three-way fixed effects or naive differences between two DiD estimators.

## Research Question

How can triple-differences designs identify and estimate treatment effects when treatment requires both policy enablement and eligibility, covariates matter for parallel trends, and enabling dates differ across groups?

## Motivation

The familiar two-period, no-covariate DDD contrast is numerically a difference between two difference-in-differences contrasts. That equivalence does not generally survive covariate adjustment: the covariate distribution must be integrated over the effectively treated group. Staggered adoption creates a second problem because pooling all not-yet-enabled groups can mix groups with different eligibility shares and untreated trends.

## Contributions

- Defines cohort-time average treatment effects for a DDD design in which treatment begins only when a group enables a policy and a unit belongs to an eligible partition.
- Establishes nonparametric identification under random sampling, overlap, no anticipation, and conditional DDD parallel trends.
- Develops regression-adjustment, inverse-probability-weighted, and doubly robust estimands. The doubly robust construction can be viewed as three adjusted DiD components, not a simple difference of two DiDs.
- Shows that each still-untreated enabling cohort can serve separately as a valid comparison group, while pooling those cohorts is not generally valid.
- Combines the separately valid estimates using inverse-covariance weights, yielding an optimal GMM estimator based on recentered influence functions and corresponding event-study aggregates.

## Method

Let $S$ denote the first period in which a unit's group enables treatment and $Q$ its time-invariant eligibility status. Effective treatment is $D_{it}=1\{t\geq S_i,Q_i=1\}$, and the target is the group-time effect

$$
ATT(g,t)=\mathbb E[Y_{it}(g)-Y_{it}(\infty)\mid S_i=g,Q_i=1].
$$

Identification compares outcome changes for four group-by-eligibility cells: eligible and ineligible units in cohort $g$, and eligible and ineligible units in one comparison cohort $g_c>t$. Conditional DDD parallel trends requires the eligible-ineligible difference in untreated outcome changes to be equal between these cohorts after conditioning on pre-treatment covariates. The paper's doubly robust score adjusts each comparison cell toward the treated cell through outcome regressions and generalized propensity scores.

For a given $(g,t)$, every eligible $g_c>t$ produces a separate estimate of the same $ATT(g,t)$. If their covariance matrix is $\Omega_{g,t}$, the minimum-variance weights are proportional to $\Omega_{g,t}^{-1}\mathbf 1$. Cohort-time estimates are then aggregated by treated-cohort shares into event-time effects. Inference uses fixed-$T$, large-$n$ asymptotics and multiplier bootstrap simultaneous bands.

## Experiments

### Monte Carlo Simulations

In the two-period covariate design, the paper compares conventional three-way fixed-effects specifications, a difference between two doubly robust DiD estimates, and the proposed doubly robust DDD estimator across four nuisance-model specifications. The conventional alternatives are biased in the presented designs, whereas the proposed estimator is centered near the target when at least the required outcome or propensity components are correctly specified.

In the staggered design with $n=5{,}000$, the estimator pooling all not-yet-treated units is severely biased and never covers the true $ATT(2,2)$ across 1,000 replications. Separate valid estimators using never-enabled units or optimally combining comparison cohorts have reported coverage of 93.2% and 95.0%. Confidence intervals using only the never-enabled group are more than 50% longer on average than those from the combined estimator.

### Empirical Reanalyses

- **Agricultural insurance:** Reanalysis of Cai (2016) produces effects similar in magnitude to three-way fixed effects but tighter intervals. For flexible-term saving, the reported three-way fixed-effects intervals are 16.29% to 115.84% wider across event times 2 through 5.
- **Chinese emissions trading pilots:** The proposed staggered DDD estimate for the aggregate effect on the share of low-carbon patents is 1.7% and statistically insignificant at the paper's 90% level, compared with a significant 5.3% three-way fixed-effects estimate.
- **Genetically modified crops:** The staggered DDD analysis supports positive yield effects and is reported as robust to excluding the never-enabling crop-country group, unlike the standard three-way fixed-effects specification.

## Limitations

- Identification still depends on conditional DDD parallel trends, no anticipation, overlap across every required enabling-by-eligibility cell, and a time-invariant eligibility partition. Pre-treatment event-study estimates can probe but cannot establish these assumptions.
- A comparison cohort is valid only while it remains untreated and only if the DDD trend restriction holds for that cohort. The method rejects indiscriminate pooling but does not make comparison-group validity automatic.
- The formal inference theory uses independent sampling, panel outcomes, fixed $T$, large $n$, and regular parametric first-step models. The paper notes possible machine-learning extensions but does not develop their theory here.
- Double robustness protects against specified combinations of nuisance-model misspecification; it does not protect against failure of the causal assumptions or simultaneous failure of the relevant outcome and propensity models.
- Evidence consists of designed simulations and reanalyses of three applications. Precision gains and disagreements with three-way fixed effects are design-specific rather than universal performance guarantees.

## Related Concepts

- [[concepts/triple-differences|Triple Differences]]
- [[concepts/causal-overlap|Causal Overlap]]
- [[concepts/stacked-event-studies|Stacked Event Studies]]
- [[concepts/honest-event-study-inference|Honest Event-Study Inference]]

## Related Papers

- Callaway and Sant'Anna (2021), "Difference-in-Differences with Multiple Time Periods": supplies the cohort-time DiD framework that this paper extends to DDD, while highlighting why pooled not-yet-treated comparisons do not transfer directly.
- Sant'Anna and Zhao (2020), "Doubly Robust Difference-in-Differences Estimators": provides the doubly robust DiD components underlying the proposed DDD score.
- Olden and Moen (2022), "The Triple Difference Estimator": studies the canonical DDD interpretation that this paper generalizes to covariates and staggered timing.
- Strezhnev (2023), "Decomposing Triple-Differences Regression under Staggered Adoption": analyzes the interpretation problems of three-way fixed-effects DDD regressions under heterogeneous effects.
- [[papers/evaluation-of-low-carbon-city-pilot-policy-effect-on-carbon-abatement-in-china|Evaluation of Low-Carbon City Pilot Policy Effect on Carbon Abatement in China]]: a library example of staggered policy evaluation whose comparison-group concerns are related but use an ordinary DiD design.

[[index|Library home]]
