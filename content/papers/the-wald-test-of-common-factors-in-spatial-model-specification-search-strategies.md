---
title: The Wald Test of Common Factors in Spatial Model Specification Search Strategies
type: paper
authors:
  - Sebastian Juhl
year: 2021
doi: 10.1017/pan.2020.23
tags:
  - spatial-econometrics
  - specification-testing
---

## TL;DR

Algebraically equivalent common factor restrictions can produce contradictory finite-sample Wald-test conclusions about spatial spillovers. Juhl explains the discrepancy through the delta-method approximation, demonstrates it in simulations and economic voting data, and recommends restriction-specific bootstrap critical values or the reparameterization-invariant likelihood ratio test.

## Research Question

Can Wald tests reliably distinguish substantive spatial spillovers from correlated errors when equivalent expressions of the null hypothesis yield different statistics?

## Motivation

Spatial clustering alone does not identify its mechanism. A spatial error model (SEM) implies no systematic cross-unit covariate effects, whereas a spatial Durbin model (SDM) allows them. Choosing between these interpretations affects substantive conclusions as well as estimation efficiency and bias.

## Contributions

- Connects the noninvariance of nonlinear Wald tests to spatial specification searches.
- Compares four representations of the same common factor restriction.
- Evaluates bootstrap calibration and illustrates consequences for claims about electoral contagion.

## Method

For the SDM,

$$
y=\rho Wy+x\beta+Wx\theta+v,
$$

the SEM is nested under $\theta=-\rho\beta$. The four scalar restrictions studied are $\rho\beta+\theta=0$, $\beta+\theta/\rho=0$, $\rho+\theta/\beta=0$, and $\rho\beta/\theta+1=0$. Ratio forms require nonzero denominators.

A Wald statistic uses the restriction's Jacobian to approximate its covariance. Different nonlinear representations give different Jacobians at the unrestricted estimates, so asymptotic equivalence does not ensure identical finite-sample inference. See [[concepts/wald-test-noninvariance|Wald Test Noninvariance]].

The bootstrap estimates the restricted SEM, resamples its residuals to generate 100 null datasets, refits the unrestricted SDM, and calculates a critical value separately for each restriction. It improves calibration without making the Wald statistic invariant. The likelihood ratio test compares restricted and unrestricted likelihoods and is invariant to equivalent representations of the same null set.

## Experiments

Section 4 uses 1,000 simulations per configuration, sample sizes 49, 100, 225, and 400, and row-standardized queen-contiguity matrices on regular grids. Spatial dependence ranges from 0 to 0.8 in steps of 0.2; the parameter linking included and omitted regressors ranges from 0 to 1 in steps of 0.2. The baseline coefficient is 2 and innovation variance is 1.

For the first restriction at $n=49$, asymptotic rejection rates under the null range from 6.9% to 11.0%, compared with 5.1%–5.8% using bootstrap critical values (nominal size 5%). The fourth restriction's corresponding ranges are 2.6%–11.5% and 4.1%–6.8%. Ratio formulations also exhibit weak power; the fourth can have a nonmonotonic power function. Bootstrap calibration remains imperfect, particularly for the second restriction near weak spatial dependence.

The empirical reanalysis examines party electoral performance in 23 parliamentary democracies, 1951–2005. Samples contain 398 high-clarity and 1,030 low-clarity observations. Table 4 reports:

| Restriction | High-clarity asymptotic p | High-clarity bootstrap p | Low-clarity asymptotic p | Low-clarity bootstrap p |
| --- | --- | --- | --- | --- |
| I | 0.39 | 0.41 | 0.41 | 0.42 |
| II | 0.96 | 0.27 | 0.68 | 0.36 |
| III | 0.93 | 0.51 | 0.85 | 0.35 |
| IV | 0.00 | 0.36 | 0.00 | 0.58 |

Values of 0.00 are rounded as reported. Only formulation IV rejects using asymptotic inference; all four fail to reject using bootstrap inference. This leaves residual dependence as a plausible explanation, rather than proving that spillovers are absent. These are reported results, not a replication.

## Limitations

Bootstrap calibration does not eliminate mathematical noninvariance. Ratio restrictions become singular at zero denominators. The simulations cover specific spatial matrices and parameter settings; the SDM requires an exogenous, correctly specified connectivity matrix and does not itself identify causal effects. The supplied Markdown has incomplete portions of Table 2 and damaged mathematical typography; the summary uses readable entries and prose, without reconstructing missing results.

## Related Concepts

- [[concepts/wald-test-noninvariance|Wald Test Noninvariance]]: the inferential problem driving the analysis.
- [[concepts/common-factor-restrictions-in-dynamic-regression|Common Factor Restrictions in Dynamic Regression]]: a temporal analogue of separating systematic dependence from error persistence, with different model-specific restrictions.

## Related Papers

- [[papers/lagged-outcomes-lagged-predictors-and-lagged-errors-a-clarification-on-common-factors|Lagged Outcomes, Lagged Predictors, and Lagged Errors: A Clarification on Common Factors]]: a complementary application of nonlinear restrictions in temporal models; this is a conceptual connection, not a citation in Juhl's paper.
- Mur and Angulo (2006), “The Spatial Durbin Model and the Common Factor Tests”: spatial testing background cited by Juhl.
- Williams and Whitten (2015), “Don't Stand So Close to Me: Spatial Contagion Effects and Party Competition”: the empirical study reanalyzed.

Published in *Political Analysis* 29:193–211; first published online November 16, 2020. [Paper DOI](https://doi.org/10.1017/pan.2020.23). Replication: [Code Ocean](https://doi.org/10.24433/CO.1459046.v1) and [Dataverse](https://doi.org/10.7910/DVN/CY7YWE).
