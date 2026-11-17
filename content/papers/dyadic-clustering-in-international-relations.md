---
title: Dyadic Clustering in International Relations
type: paper
authors:
  - Jacob Carlson
  - Trevor Incerti
  - P. M. Aronow
year: 2023
doi: 10.1017/pan.2023.26
tags:
  - dyadic-data
  - variance-estimation
  - international-relations
---

## TL;DR

Reanalyzing 691 key explanatory variable estimates in 174 models from 22 International Organization studies, the authors find that accounting for shared dyad members substantially increases estimated uncertainty. The inverse-study-frequency-weighted mean standard error ratio is 1.74; approximately 67% of originally significant findings remain significant. The year denotes online publication on October 3, 2023.

## Research Question

How much does ignoring dependence between dyads sharing a member distort uncertainty estimates in empirical international relations research?

## Motivation

Clustering repeated observations of the same country pair permits serial dependence but excludes covariance between different pairs sharing a country. Country-level changes can affect many bilateral relationships simultaneously, even without network spillovers. Fixed effects alone do not establish the residual independence needed for conventional inference.

## Contributions

- Measures the empirical consequences of neglected dyadic dependence in a defined journal sample.
- Explains the covariance restrictions separating ordinary robust, repeated-dyad clustered, and dyadic-robust inference.
- Supplies R and Stata implementations of an existing dyadic variance estimator, making the correction accessible to applied researchers.

## Method

[[concepts/dyadic-cluster-robust-inference|Dyadic Cluster-Robust Inference]] allows residual covariance across observations whose dyads share either member, including across time. Disjoint dyads are assumed uncorrelated. For linear regression, residual cross-products satisfying this overlap rule enter the meat of the sandwich covariance estimator. Section 3 implements the decomposition of Aronow, Samii, and Assenova (2015) into member-specific clustered, repeated-dyad clustered, and heteroskedasticity-consistent variance estimates.

The reanalysis preserves the original statistical software, treats dyads as undirected for dependence estimation, and omits small-sample corrections. Key explanatory variables are hypothesis-relevant independent variables rather than controls. Standard error ratios divide the reestimated dyadic-robust standard error by the original standard error. Inverse study frequency weights give each study equal aggregate weight despite differing numbers of estimates.

## Experiments

The authors searched International Organization publications from January 2014 through January 2020 for dyadic terminology, yielding 70 candidates and 22 eligible studies. Exclusions included nondyadic analyses, nested member relationships adequately handled by other clustering schemes, and datasets sharing one member across every dyad. The sample contains 20 country-dyad and two international-organization-dyad studies; none used the nonparametric dyadic correction in primary analyses.

Table 5 reports the following weighted results:

| Quantity | Result |
| --- | --- |
| Mean standard error ratio | 1.74 |
| Significant before and after | 0.46 |
| Significant before, insignificant after | 0.22 |
| Insignificant before, significant after | 0.05 |
| Insignificant before and after | 0.28 |

Significance uses the 5% threshold. Transition proportions refer to all estimates under study weighting, not just originally significant estimates; rounding explains their sum exceeding one. The abstract reports approximately 67% retention among originally significant findings.

Average ratios by subfield are 2.19 for international organizations/international law, 1.79 for international political economy, and 1.51 for security. Study-level averages range from 0.90 to 4.16, and 18 of 22 studies become less precise on average. Seven studies lose no significant key-variable findings. These are uncertainty reanalyses, not evidence that every original substantive conclusion is false.

## Limitations

- Dependence between disjoint dyads remains outside the estimator's covariance restrictions; broader network dependence can require another approach.
- Asymptotic validity requires regularity and dependence restrictions. More flexible covariance estimation can be unstable in small samples, and the primary analysis includes no finite-sample adjustment.
- The journal, time window, keyword search, and eligibility rules delimit the empirical evidence.
- Correcting standard errors does not repair confounding or model identification. Standard errors need not increase in every application, as the reported range demonstrates.

## Related Concepts

- [[concepts/dyadic-cluster-robust-inference|Dyadic Cluster-Robust Inference]]: accounts for shared-member covariance across pairs.
- [[concepts/network-robust-dyadic-inference|Network-Robust Dyadic Inference]]: addresses dependence extending beyond shared members under additional network assumptions.

## Related Papers

- Aronow, Samii, and Assenova (2015), “Cluster–Robust Variance Estimation for Dyadic Data”: estimator implemented in this reanalysis.
- [[papers/inference-in-linear-dyadic-data-models-with-network-spillovers|Inference in Linear Dyadic Data Models with Network Spillovers]]: complementary treatment of indirect dependence between disjoint dyads, the principal scope boundary emphasized here.

Replication data: [Harvard Dataverse](https://doi.org/10.7910/DVN/9I0LRQ).
