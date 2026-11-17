---
title: Inference in Linear Dyadic Data Models with Network Spillovers
type: paper
authors:
  - Nathan Canen
  - Ko Sugiura
year: 2023
tags:
  - dyadic-data
  - network-inference
  - variance-estimation
---

## TL;DR

Dyadic-robust standard errors can miss dependence between pairs that share no individual but are connected indirectly. Canen and Sugiura construct a network over dyads and estimate an OLS sandwich covariance using distance-weighted residual cross-products. Under exogeneity, moment, network-density, and dependence-decay conditions, this supports consistent inference. The year refers to online publication on December 1, 2023.

## Research Question

How can researchers conduct valid inference in linear dyadic regressions when unobserved shocks propagate beyond dyads sharing an individual?

## Motivation

Trade flows and legislative voting can transmit shocks along chains of connections. In a chain A–B–C–D, outcomes for (A,B) and (C,D) may covary despite having no common member. Conventional dyadic covariance restrictions omit precisely these terms. Correcting standard errors requires specifying the relevant dependence network, not merely recognizing that observations are pairs.

## Contributions

- Recasts dependence among active dyads as random variables on an observed network, enabling application of the network limit theory of Kojevnikov, Marmer, and Song (2021).
- Establishes OLS consistency and asymptotic normality and supplies a consistent network-robust covariance estimator under stated regularity conditions.
- Characterizes failure of conventional dyadic-robust inference when aggregate covariance beyond adjacent dyads remains non-negligible, including with decaying spillovers.
- Provides implementation guidance, simulations, and a European Parliament illustration.

## Method

For active dyads m, estimate the linear model y_m = x_m′β + ε_m by OLS. Two dyads are adjacent when they share a member, and connected when a path of adjacent dyads joins them. Geodesic distance is measured on this dyad network. Conditional error covariance is zero across disconnected dyads but may be nonzero along indirect paths.

The covariance estimator sandwiches a sum of residual score cross-products between inverse design cross-products. Each connected pair contributes a kernel weight determined by its geodesic distance divided by bandwidth b_M; diagonal terms are included. This is [[concepts/network-robust-dyadic-inference|Network-Robust Dyadic Inference]]. Section 3.4 proposes either a substantively justified truncation or b_M = 2 log(M) / log(max(average degree, 1.05)), using the number of active dyads and the average degree of their network.

The theory balances neighborhood growth against decay of dependence and imposes additional moment, design, bandwidth, and density conditions. Corollary 3.1 concerns non-negligible aggregate distant score covariance; the mere existence of a distant connection does not establish inconsistency.

## Experiments

### Monte Carlo

The paper compares Eicker–Huber–White, dyadic-robust, and network-robust intervals on preferential-attachment and Erdős–Rényi networks. Table 1 uses spillover range S = 2 and persistence γ = 0.8, with N = 500, 1,000, and 5,000 individuals.

For preferential attachment with ν = 3 and N = 5,000, reported coverage of nominal 95% intervals is:

| Estimator | Coverage | Average interval length |
| --- | --- | --- |
| Eicker–Huber–White | 0.877 | 0.176 |
| Dyadic-robust | 0.909 | 0.192 |
| Network-robust | 0.943 | 0.222 |

Across all six network settings at N = 5,000, network-robust coverage ranges from 0.943 to 0.949. The paper reports smaller differences with weak spillovers and coincidence with dyadic-robust estimation when spillovers stop at adjacent dyads. Supplementary robustness exercises are described in the supplied main text; their underlying tables are not included.

### European Parliament

The reanalysis of Harmon, Fisman, and Kamenica (2019) uses 2,431,261 observations, 422 politicians, 26,099 pairs, and 116 proposals from July 14–16, 2009 in Strasbourg. Three specifications progressively add demographic controls and day fixed effects. The seating-neighbor coefficient is 0.007, 0.006, and 0.006, respectively.

For specification III, Table 2 reports standard errors of 0.003 (Eicker–Huber–White), 0.009 (dyadic-robust), and 0.011 (network-robust). These are standard errors, not variances. The prose reports approximately 73% and 22% smaller estimates for the alternatives; the displayed rounded values do not reproduce the latter percentage exactly. The comparison demonstrates sensitivity of uncertainty estimates to covariance assumptions, rather than independently identifying a spillover mechanism.

## Limitations

- Requires an observed, exogenous dependence network and valid identification of the regression coefficients; the covariance correction does not resolve endogenous network formation or regressor endogeneity.
- Network-density and dependence-decay restrictions exclude arbitrary dense, persistently dependent networks.
- Conventional dyadic-robust inference remains appropriate when its covariance restrictions hold or distant contributions are negligible. The approaches impose different restrictions and neither universally subsumes the other.
- Kernel and truncation choices matter. Larger standard errors in one application do not establish universal downward bias under every possible covariance structure.
- The parsed source contains damaged mathematical notation, so exact asymptotic statements should be checked against the typeset article before implementation.

## Related Concepts

- [[concepts/network-robust-dyadic-inference|Network-Robust Dyadic Inference]]: covariance estimation using distances on a network of dyads.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: another form of structured cross-sectional dependence; here distances are between dyads on a graph rather than geographic locations.

## Related Papers

- Aronow, Samii, and Assenova (2015), “Cluster–Robust Variance Estimation for Dyadic Data”: conventional dyadic-robust comparator.
- Kojevnikov, Marmer, and Song (2021), “Limit Theorems for Network Dependent Random Variables”: theoretical framework applied to dyadic score vectors.
- Harmon, Fisman, and Kamenica (2019), “Peer Effects in Legislative Voting”: source application revisited for inference under indirect dependence.

Replication data and code are identified in the source as [Harvard Dataverse](https://doi.org/10.7910/DVN/VLMMZQ).
