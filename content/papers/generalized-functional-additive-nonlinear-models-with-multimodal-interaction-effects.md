---
title: "Generalized Functional Additive Nonlinear Models with Multimodal Interaction Effects"
type: paper
authors:
  - Jiaqi Men
  - Hua Liu
  - Jinhong You
  - Xin Chen
  - Jiguo Cao
year: 2026
doi: "10.1007/s11222-026-10918-5"
tags:
  - functional-data-analysis
  - functional-regression
  - functional-principal-component-analysis
  - additive-models
  - multimodal-interactions
  - hypothesis-testing
---

## TL;DR

This paper proposes FANMI, a generalized functional additive nonlinear model for a scalar response, a functional covariate, and a scalar covariate. FPCA maps the functional predictor to a finite set of scaled scores, and tensor-product B-splines model nonlinear score-covariate interactions. Quasi-likelihood estimation, a global goodness-of-fit test, and an interaction-reduction test are accompanied by asymptotic results. Simulations support improving estimation and test power with larger samples, while an electricity application finds interactions for average consumption but not for the electricity Gini outcome.

## Research Question

How can a generalized regression model represent nonlinear interactions between a functional predictor and a scalar covariate, while providing estimators and tests for model adequacy and for whether the interaction surfaces are genuinely bivariate?

## Motivation

Functional observations such as daily temperature curves contain more time-resolved information than a single average, but standard functional linear models impose a linear effect of the functional scores. The motivating data also suggest that the temperature-consumption relationship differs across cities with different economic conditions. FANMI addresses this by allowing each retained functional principal component score to interact nonlinearly with a scalar covariate under a generalized response model.

## Contributions

- Introduces a generalized Functional Additive Nonlinear Model with Multimodal Interaction effects, using FPCA as a structural bridge from an infinite-dimensional predictor to additive bivariate score-covariate components.
- Develops a tensor-product B-spline and quasi-likelihood estimator for the univariate and bivariate components.
- Establishes convergence rates, asymptotic normality, and simultaneous confidence-band results under stated smoothness, design-density, eigenvalue, knot, and moment conditions.
- Develops a global goodness-of-fit test for the centered additive components and an integrated $L_2$ interaction test for reducing selected bivariate components to univariate functions, with a bootstrap calibration procedure.
- Demonstrates the method in simulations and in analyses of city-level temperature, GDP, household electricity consumption, and an electricity-consumption Gini indicator.

## Method

For a functional covariate $X(t)$ and scalar covariate $Z$, FPCA gives scores $\xi_j$ and eigenvalues $\lambda_j$. The paper scales each score as $\zeta_j = \Phi(\xi_j/\sqrt{\lambda_j})$, placing it in $[0,1]$. The model is

$$
g\{E(Y \mid \boldsymbol{\zeta}, Z)\} = f_0(Z) + \sum_{j=1}^{K} f_j(\zeta_j,Z).
$$

The univariate component uses a B-spline basis in $Z$, and each interaction surface uses a tensor product of B-spline bases in $(\zeta_j,Z)$. Parameters are estimated by maximizing a quasi-likelihood whose variance function can match a response from the exponential family. Newton iteration solves the finite-dimensional optimization problem.

The global test evaluates whether the centered univariate component and all bivariate components are zero. Under its null, the statistic is asymptotically chi-squared with two degrees of freedom. The interaction test evaluates the integrated squared difference between $\hat f_j(\zeta_j,Z)$ and its reduced form $\hat f_j(\zeta_j)$. Because its finite-sample approximation can be poor, the proposed bootstrap generates responses under the reduced model and recalculates the statistic.

## Experiments

The first simulation uses normal and Poisson responses, sample sizes 300, 500, and 900, and 500 Monte Carlo replications. Mean squared errors decrease with sample size; for the first component, the paper reports reductions of 62.5% for normal responses and 67.7% for Poisson responses when increasing the sample size from 300 to 900. The goodness-of-fit simulations have empirical size near 0.05 when the component functions are constant, and power increases with effect size and sample size. The interaction simulations show the same pattern; for example, with normal responses and interaction strength $c=0.25$, power is 0.798 at $N=300$ and 1.000 at $N=700$.

In the Jiangxi electricity application, the data contain 78 cities observed in 2017. Three temperature FPCs are retained because they exceed the paper's 85% cumulative explained-variance threshold. For average household electricity consumption, the reported global statistic is $\mathcal{H}_n=91.864$ against a 5% critical value of 5.99, and the simultaneous and component-wise interaction tests reject their null hypotheses at the 10% level, with reported p-values 0.028, 0.004, 0.006, and 0.066. The estimated profiles vary with GDP, especially around temperature regimes associated with seasonal or extreme conditions.

For the electricity Gini indicator, the paper binarizes the coefficient at 0.4, yielding 40 cities in the high-inequality group and 38 in the other group, and uses a binomial link. It reports p-values 0.402, 0.571, 0.779, and 0.619 for the simultaneous and component-wise interaction tests, so it does not reject the reduced, non-interacting form at the 10% level. The reported heat maps still show localized estimated differences at large temperature scores.

## Limitations

The asymptotic theory relies on regularity conditions for smooth component functions, the joint score-covariate density, eigenvalue decay and separation, spline knots, and conditional error moments. The theory treats the truncation level as fixed, although the paper also argues that its explained-variance selection is consistent. The application uses only 78 cities from one province and one year, so its substantive conclusions about wealth and electricity behavior are not broadly identified beyond that setting.

The paper reports a tension in the Gini analysis: it says the goodness-of-fit test passes at 5% while giving $\mathcal{H}_n=11.015$, greater than the stated critical value 5.99. That interpretation should be checked before relying on the reported model-fit conclusion. The declaration also says that no datasets were generated or analyzed despite the application sections describing analyses of city data.

## Related Concepts

- [[Generalized Functional Additive Nonlinear Models]]
- [[Functional Principal Component Analysis]]
- Functional data analysis
- Functional regression
- Quasi-likelihood estimation
- B-spline approximation

## Related Papers

- Müller and Yao (2008), "Functional additive models."
- Müller and Stadtmüller (2005), "Generalized functional linear models."
- James (2002), "Generalized linear models with functional predictors."
- Yao, Müller, and Wang (2005), "Functional data analysis for sparse longitudinal data."
- Ramsay and Silverman (2005), "Functional Data Analysis."
