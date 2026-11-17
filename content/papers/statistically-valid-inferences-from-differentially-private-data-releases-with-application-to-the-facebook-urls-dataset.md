---
title: "Statistically Valid Inferences from Differentially Private Data Releases, with Application to the Facebook URLs Dataset"
type: paper
authors:
  - Georgina Evans
  - Gary King
year: 2023
doi: 10.1017/pan.2022.1
tags:
  - differential-privacy
  - measurement-error
  - statistical-inference
---

## TL;DR

Known privacy noise can be treated as measurement error to recover consistent linear-regression estimates and appropriate uncertainty. Evans and King correct regression cross-products and simulate uncertainty from their low-dimensional summary statistics, making inference feasible for very large releases such as the Facebook URLs dataset.

## Research Question

How can researchers estimate the regression relationships and descriptive properties of confidential data when they observe only a release with known additive Gaussian noise?

## Motivation

Privacy protection does not automatically confer statistical validity. Naive regression on noisy covariates can attenuate, exaggerate, or reverse coefficients and misstate uncertainty. Unlike many naturally occurring measurement-error settings, the release mechanism supplies the noise distribution. Post-processing the released data preserves its privacy guarantee.

## Contributions

- A consistent correction for regression coefficients and residual variance using known noise covariance.
- A scalable simulation estimator of coefficient uncertainty based on cross-products rather than repeated full-data analyses.
- Extensions for noisy outcomes, interactions, privacy-induced information loss, descriptive moments, parametric histograms, and regression diagnostics.

## Method

For a latent design matrix $Z$, outcome $y=Z\beta+\epsilon$, and released covariates $X=Z+\nu$, let $S^2$ denote the known covariance of additive noise. The corrected estimator (Equation 6) is

$$
\widetilde\beta=\left(X^\top X/n-S^2\right)^{-1}X^\top y/n.
$$

The correction removes the noise contribution to covariate second moments. Residual variance additionally subtracts $\widetilde\beta^\top S^2\widetilde\beta$ from the mean squared observed residual. Independent noise in the outcome leaves the coefficient procedure applicable; its variance must also be subtracted when estimating the original disturbance variance.

For uncertainty, approximate the joint distribution of the unique elements of $X^\top X$ and $X^\top y$ by a multivariate normal with estimated covariance. Transform simulated cross-products through the corrected estimator and summarize their variance. After computing cross-products, most simulation work depends on the number of covariates rather than observations (Section 3.3).

Hermite-polynomial corrections estimate confidential raw moments under Gaussian noise. Parametric distribution fitting uses lower moments, with unused higher moments serving as diagnostic checks. The paper also expresses information loss as the coefficient-specific reduction in an equivalent noiseless sample size. Ratios and interactions require special care: directly dividing Gaussian-noisy variables can produce distributions without finite moments.

## Experiments

- **Monte Carlo:** 500 replications with correlated Poisson covariates and typically 100,000 observations. Naive regression can reverse the second coefficient's sign; corrected estimates show approximately zero bias and standard errors close to empirical sampling variability. With 2,000 observations and moderate noise, reported average coefficient biases are 0.0095 and 0.0118.
- **Runtime scaling:** Increasing sample size from 100,000 to 5 million increases runtime by a factor of 70 for the compared analytical variance method and 4.85 for the proposed simulation method. These are growth factors, not a direct speedup ratio.
- **Facebook URLs:** Regressions on 1.37 million URLs compare conservative users aged 18–24 and 65+, predicting shares from likes while controlling for views. Table 1 reports:

| Age | Corrected likes coefficient (SE) | Naive coefficient (SE) |
| --- | --- | --- |
| 18–24 | −0.5332 (0.1698) | 0.0125 (0.0004) |
| 65+ | 0.2014 (0.0010) | 0.3262 (0.0002) |

These are aggregate conditional associations, not individual-level causal effects or direct measures of agreement.

- **Public-data validation:** Across 2,575 legislative districts in 29 states, 500 noise-added versions of a voter-registration dataset yield corrected estimates centered near the original coefficient of −0.3; naive estimates are displaced.
- **Diagnostics:** A simulated nonnormal disturbance distribution has kurtosis 5.69. Noisy residuals suggest 3.08, while the corrected estimate is 5.93 (Table 3).

## Limitations

Validity depends on the specified noise process and regression assumptions. Small samples or large noise may leave insufficient signal, yielding bias or very large uncertainty. The method is not a generic correction for every private release: censoring and other mechanisms require additional work. Histogram reconstruction is parametric and must be checked against estimable higher moments. The Facebook illustration cannot compare against the confidential raw data; validation against an accessible original uses a separate public dataset. Several parsed appendix formulas are visibly corrupted, so this summary retains the clear core estimator without reproducing those expressions.

## Related Concepts

- [[concepts/differential-privacy|Differential Privacy]] — post-processing preserves privacy while statistical correction accounts for the release noise.
- [[concepts/functional-calibration|Functional Calibration]] — a distinct approach to noisy covariates that reconstructs longitudinal trajectories rather than subtracting known release-noise covariance.

## Related Papers

- Warren, White, and Fuller (1974), “An Errors-in-Variables Analysis of Managerial Role Performance”: antecedent for the regression correction identified in Section 3.2.
- Evans and King (2021b), “Statistically Valid Inferences from Differentially Private Data Releases, II: Extensions to Nonlinear Transformations”: cited extension for proportions and weighted averages.

Published in *Political Analysis* (2023); first published online 20 April 2022. The supplied paper identifies the implementation as PrivacyUnbiased and replication data DOI 10.7910/DVN/UDFZJD.
