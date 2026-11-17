---
title: Hypothesis Tests under Separation
type: paper
authors:
  - Carlisle Rainey
year: 2023
doi: 10.1017/pan.2023.28
tags:
  - statistical-inference
  - discrete-choice
---

## TL;DR

Under separation in binary logistic regression, Wald tests can lose power as effects grow. Rainey shows that unpenalized likelihood ratio and score tests retain useful inferential behavior, allowing coefficient tests without selecting a penalty or prior. Estimating substantive effect magnitudes remains a separate task that usually requires regularization.

## Research Question

Can researchers test whether a separating covariate has a nonzero coefficient using ordinary frequentist methods, despite the absence of a finite maximum likelihood estimate?

## Motivation

A binary predictor can perfectly predict an outcome in the observed sample. Numerical software then returns large coefficients and still larger standard errors, making conventional Wald p-values misleading. Penalized or Bayesian estimates can be finite, but their substantive implications depend on the penalty or prior.

## Contributions

- Explains why the Wald statistic collapses as the likelihood flattens along a separating coefficient, bounding its power by one minus the probability of separation.
- Compares likelihood ratio and score tests with ordinary and penalized Wald tests across 150 data-generating processes.
- Provides regression-table reporting guidance and illustrates it with governors’ opposition to Medicaid expansion.

## Method

The target null is that the coefficient of a potentially separating binary predictor equals zero. The Wald test uses the estimate and local curvature near the unrestricted maximum. Under separation, its estimated standard error grows faster than the coefficient.

The likelihood ratio test instead compares the unrestricted log-likelihood supremum with the restricted maximum under the null. Twice their difference is assessed against an approximate chi-squared reference distribution. The score test evaluates the likelihood gradient and information under the null, avoiding the flat region at the unrestricted optimum.

Rainey recommends retaining the separating variable, reporting its theoretical infinite ML estimate, omitting its misleading standard error, and clearly labeling a replacement likelihood ratio p-value, with the score p-value as supplementary information. Penalized or Bayesian estimation and sensitivity analysis then supply interpretable quantities of interest.

## Experiments

The simulations select 150 DGPs with sample sizes of 50, 100, or 1,000, varying predictor prevalence, intercepts, control variables, and covariate correlations. Selected DGPs exhibit separation in at least 30% of samples for some coefficient between −5 and 5, while retaining outcome variation in at least 99.9% of samples. Power is evaluated across repeated samples, rather than conditioning solely on separated samples.

In the illustrative DGP in Table 2, increasing the coefficient from 4 to 5 raises separation frequency from 35% to 62%. Wald power falls from 53% to 34%, while both likelihood ratio and score power rise from 92% to 98%. Across DGPs, score-test size stays around 5%; likelihood ratio size ranges approximately from 2.5% to 10%. Cauchy-penalized Wald tests are often underpowered, while Firth-penalized Wald tests can severely overreject the null.

In the Medicaid reanalysis, Democratic governorship perfectly predicts non-opposition. The likelihood ratio p-value is 0.003 and the score p-value is 0.009, compared with penalized Wald p-values of 0.060 under Firth’s penalty and 0.038 under the Cauchy penalty (Table 3).

## Limitations

The tests use asymptotic reference distributions; the observed likelihood ratio size distortions preclude treating them as exact finite-sample tests. The simulations focus on binary logistic models and deliberately selected DGPs prone to separation. Criticism of penalized Wald tests does not establish that every inference procedure using those penalties fails. Testing a zero coefficient neither estimates a substantive effect magnitude nor removes sensitivity to priors when estimating quantities of interest.

## Related Concepts

- [[concepts/separation-in-discrete-choice-models|Separation in Discrete Choice Models]]: the likelihood geometry responsible for divergent estimates and failed Wald inference.
- [[concepts/wald-test-noninvariance|Wald Test Noninvariance]]: a distinct vulnerability of Wald inference involving equivalent nonlinear null formulations, rather than separation.

## Related Papers

- [[papers/detecting-and-correcting-for-separation-in-strategic-choice-models|Detecting and Correcting for Separation in Strategic Choice Models]]: cited work extending separation diagnostics and correction to strategic choice models.
- Rainey (2016), “Dealing with Separation in Logistic Regression Models”: motivates careful prior choice for substantive estimation.
- Beiser-McGrath (2022), “Separation and Rare Events”: cautions about default penalties, complementing this paper’s testing argument.

Replication resources reported in the paper: [OSF](https://doi.org/10.17605/OSF.IO/WN2S4) and [Dataverse](https://doi.org/10.7910/DVN/6EYRJG). The year above follows the supplied text’s online publication date.
