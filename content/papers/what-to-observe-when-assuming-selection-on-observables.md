---
title: What to Observe When Assuming Selection on Observables
type: paper
authors:
  - Kevin M. Quinn
  - Guoer Liu
  - Lee Epstein
  - Andrew D. Martin
year: 2025
doi: 10.1017/pan.2025.10003
tags:
  - causal-inference
  - observational-studies
  - diagnostics
---

## TL;DR

Regression, propensity weighting, balancing weights, and several matching estimators admit an exact common weighted-difference representation. This makes effective sample size, observation influence, extrapolation, and covariate balance comparable across methods. Two political-science reanalyses show that these diagnostics can challenge a substantive conclusion or clarify its dependence on particular observations.

## Research Question

How can researchers compare estimators that share selection-on-observables identification assumptions but use different modeling assumptions and different parts of the available sample?

## Motivation

Regression hides its observation weights, whereas matching and propensity methods expose them. Comparing only estimates and standard errors obscures concentration of information, influential observations, negative weights, and mismatch with the intended target population.

## Contributions

- Synthesizes existing equivalences between common estimators and a Hájek-type estimator of a weighted average treatment effect.
- Organizes four diagnostic families on this common scale, including a WLS-based DFBETA influence diagnostic applicable beyond outcome regression.
- Demonstrates how joint reporting of estimates and diagnostics changes interpretation in two applied examples.

## Method

For conditional effect $\tau(x)$, covariate density $f_X(x)$, and target function $h(x)$, the estimand is

$$
\tau_h=\frac{\int\tau(x)f_X(x)h(x)\,dx}{\int f_X(x)h(x)\,dx}.
$$

ATE sets $h(x)=1$; ATT sets $h(x)=e(x)$, the propensity score. The estimator subtracts separately normalized weighted control outcomes from weighted treated outcomes. Under conditional ignorability, positivity, SUTVA, and the appropriate weight specification, weights proportional to $h/e$ and $h/(1-e)$ identify the target contrast.

OLS multi-regression imputation (MRI), single-regression imputation (URI), explicit weighting, 1:M matching with replacement, and weighted CEM estimates fit this representation. This is an algebraic equivalence, not a claim that all specifications consistently estimate the same effect. URI interpretation requires care under heterogeneous effects; discarding unmatched treated units can change CEM's target away from ATT.

The resulting [[concepts/weighting-diagnostics-for-causal-estimation|weighting diagnostics]] cover effective sample size, WLS DFBETA influence, negative-weight mass, and balance against both the other treatment group and the intended target. Mean balance alone can miss higher-moment differences. Weighted KS statistics and QQ-plots require nonnegative weights.

## Experiments

These are applied reanalyses rather than a simulation benchmark (Sections 4.1–4.2).

| Application and estimator | Reported estimate | SE | Effective sample size | ESS ratio |
|---|---:|---:|---:|---:|
| Contender judges, CEM ATT | 0.075 | 0.024 | 53.1 | 0.021 |
| Contender judges, propensity weighting ATT | 0.018 | 0.012 | 1249.6 | 0.498 |
| Contender judges, entropy balancing ATT | 0.028 | 0.010 | 1295.7 | 0.517 |
| Conservative politicians, genetic matching ATT | 1.107 | 0.210 | 24.1 | 0.437 |
| Conservative politicians, CEM ATT | -0.198 | 0.510 | 2.0 | 0.036 |

In the judicial study, CEM concentrates influence on individual judge-votes and yields poor effective information retention. Propensity weighting and entropy balancing have fewer diagnostic problems but do not support the original claim that promotion contenders respond more strongly to Supreme Court vacancies than non-contenders. Residual distributional imbalance remains even for entropy balancing.

In the wealth study, methods other than CEM broadly preserve the conclusion of positive returns to office for Conservatives. Genetic matching is sensitive to William How: removing him lowers ATT from 1.107 to 0.723 and ATE from 0.621 to 0.361. Default CEM retains extremely little effective information. These are application-specific findings, not universal rankings of estimators.

## Limitations

Diagnostics do not establish absence of unmeasured confounding or guarantee accuracy. The ESS variance motivation assumes equal outcome variances across treatment groups; ESS ratios compare against the maximum for the two-group contrast, not raw sample size. Negative regression weights prevent use of the distributional diagnostics described here. Supplementary derivations are referenced by the supplied article but are not included in the supplied Markdown. The authors recommend comparing plausible specifications and reporting all estimates with diagnostics, preferably using outcome-free diagnostics before examining outcomes.

## Related Concepts

- [[concepts/weighting-diagnostics-for-causal-estimation|Weighting Diagnostics for Causal Estimation]]: the common diagnostic framework.
- [[concepts/individual-treatment-effects|Individual Treatment Effects]]: distinguishes unit-level contrasts from the population averages studied here.

## Related Papers

- Li, Morgan, and Zaslavsky (2018), “Balancing Covariates via Propensity Score Weighting”: target-population weighting framework.
- Chattopadhyay and Zubizarreta (2023), “On the Implied Weights of Linear Regression for Causal Inference”: exact regression-weight equivalences.
- Black and Owens (2016), “Courting the President”: judicial-voting application.
- Eggers and Hainmueller (2009), “MPs for Sale?”: returns-to-office application.

Replication data: [Harvard Dataverse](https://doi.org/10.7910/DVN/69RUAD).
