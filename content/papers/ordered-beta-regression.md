---
title: "Ordered Beta Regression: A Parsimonious, Well-Fitting Model for Continuous Data with Lower and Upper Bounds"
type: paper
authors:
  - Robert Kubinec
year: 2023
doi: "10.1017/pan.2022.20"
source_job_id: "28cb7920-637b-48aa-b24b-26d87f9521c4"
tags:
  - bounded-outcomes
  - bayesian-regression
  - political-methodology
---

## TL;DR

Ordered beta regression jointly models exact zeros, interior proportions, and exact ones using a shared linear predictor and two ordered cut points. In simulations generated from this model, it estimates average marginal effects more precisely than several alternatives. Its central assumption is that endpoints and interior responses express one underlying scale.

## Research Question

How can regression retain boundary observations in bounded continuous outcomes while avoiding separate coefficient vectors for each response regime?

## Motivation

Slider scales, visual analog scales, and suffrage indices can contain both continuous values and endpoint masses. Ordinary beta regression excludes endpoints; dropping or nudging them changes the estimation problem. Zero-and-one-inflated beta regression (ZOIB) accommodates endpoints but allows distinct processes that can be unnecessarily complex when the outcome measures a single construct.

## Contributions

- Introduces a joint endpoint/interior likelihood with one coefficient vector, two cut points, and beta precision.
- Compares inferential precision, bias, coverage, prediction, and effective model complexity across bounded-outcome estimators.
- Reanalyzes European suffrage expansion and provides an implementation in `ordbetareg`.

## Method

Let $\eta_i=x_i^\top\beta$, $g$ be the inverse logit, and $k_1<k_2$. Equation (5) implies component probabilities

$$
p_{0i}=1-g(\eta_i-k_1),\quad
p_{Ii}=g(\eta_i-k_1)-g(\eta_i-k_2),\quad
p_{1i}=g(\eta_i-k_2).
$$

Conditional on an interior response, $Y_i$ follows a beta distribution with mean $\mu_i=g(\eta_i)$ and precision $\phi$. Thus the interior density is weighted by $p_{Ii}$, and the unconditional expectation is $p_{1i}+p_{Ii}\mu_i$. The paper uses numerical differentiation and sample averaging to compare marginal effects across models.

Bayesian estimation uses Stan Hamiltonian MCMC, weakly informative normal coefficient priors, an exponential precision prior with rate 0.1, and an induced Dirichlet prior over cut-point probabilities. Posterior prediction first selects the response regime, then draws a beta value if the selected regime is interior.

## Experiments

**Monte Carlo study (Section 4).** The study draws 10,000 parameter configurations, with sample sizes between 100 and 4,000, 1–15 covariates, covariate correlations between 0 and 0.9, and varying precision and thresholds. Configurations unable to produce at least five observations in each regime are discarded. Each model uses two chains of 1,000 iterations, discarding 500 per chain as warmup. Comparators are ZOIB, OLS, fractional logit, beta regression on interior observations, and beta regression on transformed outcomes.

Selected median diagnostics from Table 1:

| Model | Coverage of 5%–95% interval | Wrong-sign proportion | Marginal-effect variance relative to ordered beta |
| --- | --- | --- | --- |
| Ordered beta | 75.6% | 0.637% | 100% |
| ZOIB | 74.0% | 1.58% | 998% |
| OLS | 67.9% | 1.69% | 1,030% |
| Fractional logit | 65.9% | 0.936% | 578% |
| Transformed beta | 12.0% | 25.6% | 645% |

Ordered beta has fewer effective parameters than ZOIB (13.9 versus 28.1) and higher reported predictive density. Precision differences are particularly pronounced below 1,000 observations. These are results under the ordered-beta data-generating process; even its reported coverage is below the nominal 90% interval level.

**Suffrage reanalysis (Section 5).** The paper revisits Aidt and Jensen's European suffrage model. The neighboring-revolution association retains its sign, while some population and GDP estimates differ across models. OLS performs better on RMSE and reported leave-one-out predictive density in this application, but predicts outside the outcome bounds. Ordered beta provides more precise marginal effects than OLS and ZOIB. Disaggregated GDP effects illustrate how ZOIB can allow both endpoint probabilities to increase, whereas ordered beta ties them to opposing movements along one scale.

## Limitations

The simulation favors the proposed model structurally because it generates data from that model and excludes very sparse regimes. The main study therefore does not establish universal superiority under misspecification. Distinct endpoint selection mechanisms can warrant inflated or hurdle models instead. The replication does not reproduce the original study's standard-error corrections, limiting uncertainty comparisons with that study.

The supplied text contains inconsistencies around Equation (5): equal cut points imply zero interior mass in the displayed formula, despite surrounding prose suggesting otherwise. Likewise, increasing the shared predictor decreases zero mass and increases one mass, but need not increase interior mass everywhere. The formulas above preserve the likelihood rather than those prose generalizations. Supplementary analyses are described by the paper but were not supplied separately.

## Related Concepts

- [[concepts/ordered-beta-regression|Ordered Beta Regression]]: shared-predictor modeling of endpoints and interior proportions.

## Related Papers

- Ferrari and Cribari-Neto (2004), “Beta Regression for Modelling Rates and Proportions”: interior beta-regression foundation.
- Liu and Kong (2015), “Zoib: An R Package for Bayesian Inference for Beta Regression and Zero/One Inflated Beta Regression”: the principal inflated-beta comparator.
- Aidt and Jensen (2014), “Workers of the World, Unite! Franchise Extensions and the Threat of Revolution in Europe, 1820–1938”: substantive replication application.

Published in *Political Analysis* 31, 519–536 (2023), online 27 July 2022. [Article](https://doi.org/10.1017/pan.2022.20). [Replication data](https://doi.org/10.7910/DVN/5XYO7O).
