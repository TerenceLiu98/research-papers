---
title: "Balance as a Pre-Estimation Test for Time Series Analysis"
type: paper
authors:
  - Mark Pickup
  - Paul M. Kellstedt
year: 2023
doi: 10.1017/pan.2022.4
tags:
  - time-series
  - specification-testing
---

## TL;DR

Equation balance checks whether a proposed dynamic relationship is compatible with its variables’ orders of integration before estimation. Pickup and Kellstedt distinguish this theoretical requirement from I(0) balance: an empirical model must admit a balanced representation with a stationary regressand to avoid the nonstandard-inference problems discussed in the paper.

## Research Question

How can equation balance test theoretical and empirical time-series models before fitting them, and why is matching integration orders alone insufficient for conventional inference?

## Motivation

Debates about general error correction models agree that equations must balance but leave the practical meaning incomplete. A theory should specify whether shocks dissipate and what kind of equilibrium links its variables, rather than merely posit directional associations.

## Contributions

- Distinguishes equation balance from the stronger requirement of I(0) balance.
- Uses balance as a theoretical consistency check before data collection and an empirical specification check before estimation.
- Provides a decision procedure covering stationary, integrated, and cointegrated variables and justified parameter restrictions.
- Explains how balance can inform interpretation of uncertain integration tests and bounds procedures.

## Method

[[concepts/equation-balance-in-time-series-models|Equation balance]] requires the regressand and regressors collectively to have the same integration order. Cointegrating combinations can reduce the right-hand side’s order; individual variable orders alone therefore do not settle balance.

First specify theoretical integration and equilibrium expectations. Then assess empirical integration and cointegration evidence, reconsider inconsistent theoretical assumptions, and seek a balanced reparameterization with an I(0) regressand. Such a representation need only exist; it need not be the form used for estimation. Any restrictions needed to obtain it must be substantively justified and imposed before estimation.

For I(1) variables, the error correction representation

$$
\Delta y_t=\alpha_0+\gamma(y_{t-1}+\kappa_1x_{t-1})+\kappa_0\Delta x_t+\epsilon_t
$$

is I(0) balanced if the level combination is stationary through cointegration, or if the justified restriction $\gamma=0$ removes it. The latter yields a first-difference model and excludes the modeled long-run relationship. Likewise, with I(1) $y$ and I(0) $x$, fixing the lagged-outcome coefficient to one can produce $\Delta y_t=\beta_0+\beta_1x_t+\epsilon_t$. These restrictions alter substantive implications, not just computational form.

## Experiments

The supplied main article develops algebraic examples and a decision procedure rather than reporting a numerical benchmark or simulation study. Examples include ADL, error correction, finite distributed lag, and first-difference models. Section 5 refers two applied illustrations to a supplementary appendix, which is not included in the supplied Markdown; their results are not summarized here.

## Limitations

Balance is necessary, not sufficient, for a good model or valid inference. Integration and cointegration tests can have low power and conflicting outcomes, especially in short series; near-integrated stationary processes may behave empirically as integrated ones. Bounds tests can be indeterminate and need not identify the type of equilibrium. Updating specifications from observed data remains a concern. Non-I(0)-balanced diagnostic equations can be useful with appropriately derived nonstandard test distributions. Residual white-noise failures can reflect other misspecification, so they do not uniquely diagnose imbalance.

## Related Concepts

- [[concepts/equation-balance-in-time-series-models|Equation Balance in Time Series Models]]: integration-order consistency and the additional stationary-representation requirement.
- [[concepts/common-factor-restrictions-in-dynamic-regression|Common Factor Restrictions in Dynamic Regression]]: a distinct specification issue concerning whether lag terms represent systematic dynamics or persistent errors.

## Related Papers

- [[papers/lagged-outcomes-lagged-predictors-and-lagged-errors-a-clarification-on-common-factors|Cook and Webb (2021)]]: complementary treatment of dynamic-model restrictions and their implications for long-run effects.
- De Boef and Keele (2008), “Taking Time Seriously”: the starting point for the dynamic-modeling debate discussed here.
- Lebo and Grant (2016), “Equation Balance and Dynamic Political Modeling”: earlier treatment of balance in that debate.
- Webb, Linn, and Lebo (2020), “Beyond the Unit Root Question: Uncertainty and Inference”: addresses uncertainty in integration status and equilibrium inference.

Published in *Political Analysis* 31:295–304 (2023), first published online April 20, 2022. [Article DOI](https://doi.org/10.1017/pan.2022.4). [Replication materials cited in the article](https://doi.org/10.7910/DVN/G0XXSE).
