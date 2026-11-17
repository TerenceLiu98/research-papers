---
title: "Lagged Outcomes, Lagged Predictors, and Lagged Errors: A Clarification on Common Factors"
type: paper
authors:
  - Scott J. Cook
  - Clayton Webb
year: 2021
doi: 10.1017/pan.2020.53
tags:
  - time-series
  - specification-testing
---

## TL;DR

Adding lags can absorb residual autocorrelation, but interpreting those lags exclusively as error persistence requires testable restrictions. Cook and Webb derive a nonlinear common factor restriction for an ADL(2,1) model to represent first-order partial adjustment with AR(1) errors, and show how imposing this interpretation incorrectly distorts long-run effects.

## Research Question

When can lagged outcomes and predictors be interpreted as proxies for serially correlated errors rather than independent systematic effects?

## Motivation

Wilkins (2018) advocates an ADL(2,1) specification to address bias from including a lagged dependent variable alongside serially correlated disturbances. The paper argues that this specification is neither universally dynamically complete nor automatically interpretable as a simpler partial-adjustment process.

## Contributions

- Identifies the nonlinear restriction required for the proposed model equivalence.
- Uses a one-restriction Wald test to assess that interpretation.
- Demonstrates simulation-based distortions in long-run multipliers and the sample-size dependence of test power.
- Advocates general-to-specific specification searches that preserve dynamic completeness.

## Method

Write the unrestricted model as

$$
y_t=\alpha_1y_{t-1}+\alpha_2y_{t-2}+\beta_1x_t+\beta_2x_{t-1}+e_t.
$$

For a partial-adjustment process with structural persistence $\alpha$, contemporaneous effect $\beta$, and AR(1) error persistence $\rho$, the corresponding coefficients are $\alpha_1=\alpha+\rho$, $\alpha_2=-\alpha\rho$, $\beta_1=\beta$, and $\beta_2=-\rho\beta$. The paper tests the resulting [[concepts/common-factor-restrictions-in-dynamic-regression|common factor restriction]]:

$$
\beta_2^2+\beta_1\beta_2\alpha_1-\alpha_2\beta_1^2=0.
$$

The nonlinear Wald test uses an asymptotic $\chi^2_1$ reference distribution. Rejection argues against the restricted interpretation; nonrejection does not establish it conclusively.

The ADL long-run multiplier is $(\beta_1+\beta_2)/(1-\alpha_1-\alpha_2)$. Under the stated factorization, cancellation yields $\beta/(1-\alpha)$. Without that restriction, applying the latter interpretation to ADL estimates can misstate both effect magnitude and persistence. When restrictions are valid, a restricted model can also avoid unnecessary parameters.

## Experiments

Section 2 generates 1,000 datasets per parameter combination, with $T=50,100,200,1000$. Predictors and error innovations are standard normal; the contemporaneous coefficient is fixed at 5. Lagged predictor effects, two outcome-lag coefficients, and residual autocorrelation vary.

Figures 1–2 show nonlinear long-run-multiplier bias whose direction depends on the parameter combination. Table 1 reports Wald rejection rates. For $\alpha_1=0.4$, $\alpha_2=0$, and $\rho=0.4$, increasing $\beta_2$ through $0,0.25,0.50,0.75,1.00$ yields rejection rates of $0.06,0.14,0.35,0.69,0.90$ at $T=50$, versus $0.05,0.89,1.00,1.00,1.00$ at $T=1000$. These are reported simulation results, not replications performed here.

## Limitations

The analysis arbitrates between specific dynamic specifications; applied processes can involve more complex dynamics, aggregation problems, and weak tests. Small samples reduce discrimination between models. Stationarity, equation balance, and dynamic completeness require assessment before interpreting restriction tests. The supplied Markdown contains damaged table cells and omits the online appendix; the summary relies on readable equations and explicitly described results.

## Related Concepts

- [[concepts/common-factor-restrictions-in-dynamic-regression|Common Factor Restrictions in Dynamic Regression]]: distinguishes systematic lag effects from a shared error-persistence factor.

## Related Papers

- Wilkins (2018), “To Lag or Not to Lag?: Re-Evaluating the Use of Lagged Dependent Variables in Regression Analysis”: the specification recommendation examined here.
- Sargan (1964), “Wages and Prices in the United Kingdom: A Study in Econometric Methodology,” and Sargan (1980), “Some Tests of Dynamic Specification for a Single Equation”: foundations for common factor restrictions.
- De Boef and Keele (2008), “Taking Time Seriously”: motivates interpreting complete dynamic effects.

Published in *Political Analysis* 29:561–569. [Paper DOI](https://doi.org/10.1017/pan.2020.53). Replication materials cited by the paper: [Webb and Cook (2020)](https://doi.org/10.7910/DVN/GWSZV3).
