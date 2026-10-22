---
title: Marginal Maximum Likelihood Estimation of Item Response Models in R
type: paper
authors:
  - Matthew S. Johnson
year: null
source_job_id: "ef507dc3-d976-4423-81d2-ef27dd7162bd"
tags:
  - item-response-theory
  - marginal-maximum-likelihood
  - expectation-maximization
  - generalized-partial-credit-model
  - r
---

## TL;DR

Johnson reviews major [[concepts/item-response-theory|Item Response Theory]] models and estimators, then derives a quadrature-based EM algorithm for marginal maximum-likelihood estimation of the generalized partial credit model (GPCM). The accompanying R package `gpcm` supports several fixed latent-trait distributions and is compared with `ltm` through simulated data and a 9,804-respondent food-security application. The examples show that quadrature resolution, local dependence, polytomous scoring, and the assumed latent distribution can materially affect estimation and respondent scores.

## Research Question

How can generalized partial credit models be estimated by marginal maximum likelihood in R, and what practical issues arise when the resulting `gpcm` implementation is applied to simulated and food-security response data?

## Motivation

Item-response analyses historically depended on specialized commercial programs, complicating integrated data processing, estimation, graphics, and custom diagnostics. Existing R support included `ltm` for Rasch, two-parameter logistic, and graded-response models, but not the GPCM or non-normal latent mixing distributions. The paper develops an R implementation while explaining the statistical assumptions and numerical procedure behind it.

## Contributions

- Reviews unidimensional, conditional-independence, and monotonicity assumptions and relates the GPCM, graded-response, sequential-scale, Rasch, 2PL, and 3PL models.
- Contrasts joint, conditional, marginal, and Bayesian estimation, emphasizing identification and the inconsistency of joint maximum-likelihood item estimates.
- Derives a [[concepts/marginal-maximum-likelihood-em-for-irt|Marginal Maximum Likelihood EM for IRT]] algorithm for the GPCM, using Gauss-Hermite quadrature in the E step and itemwise Newton-Raphson updates in the M step.
- Introduces the `gpcm` R package for estimation, standard errors, simulation, response-function plotting, likelihood extraction, and EAP scoring.
- Demonstrates model and data diagnostics through simulation and an analysis of the USDA food-security scale.

## Method

### Response Model

For ordinal item $i$, the GPCM models the adjacent-category logit as

$$
\psi_{im}(\theta)=\alpha_i\theta+\beta_i+\delta_{im},
$$

where $\alpha_i$ is the item slope, $\beta_i$ is an intercept, and $\delta_{im}$ is a category-step parameter. A contrast constraint makes the step parameters identifiable. Dichotomous items reduce to a 2PL model; equal item slopes give the Rasch/partial-credit restriction.

### Marginal EM Estimation

Respondent propensities are treated as random effects drawn from a specified mixing distribution $F$. Integrating each conditional response likelihood over $F$ produces the marginal likelihood for item parameters. The E step takes the expected complete-data log likelihood under the current posterior distribution of each latent propensity. Gauss-Hermite quadrature approximates the required integrals. The M step applies one Newton-Raphson update per EM iteration using item-specific gradients and Hessians.

The implementation initially uses EM-Hessian updates, then switches to an approximate Fisher-information update after parameter changes fall below a tolerance. It reports itemwise standard errors from inverse information blocks. Because cross-item information is not computed, it does not provide the complete covariance matrix of all item estimates.

### Software Scope

The package's main `gpcm` function estimates the model under normal, uniform, beta, or gamma mixing distributions. Supporting functions simulate GPCM responses, calculate category probabilities, plot category and expected-score functions, print estimates, extract log likelihoods, and return expected-a-posteriori scores for unique response patterns.

## Experiments

### Simulated Mixed-Category Data

The simulation uses 1,000 respondents and 10 items spanning two to five response categories. Estimated GPCM parameters are compared with the generating values. The paper reports that too few quadrature points tend to produce slopes that are too small; `gpcm` therefore uses 41 points by default.

Because the simulated propensities are normal, a normal mixing distribution fits better than uniform, Beta(2,2), or Gamma(1,1) alternatives. Beta(20,20), which closely approximates a normal shape here, has a slightly higher reported log likelihood than the normal specification (-8668.863 versus -8668.953). EAP estimates increase with observed proportional scores but retain posterior shrinkage.

### USDA Food-Security Data

The application analyzes 10 food-security items from 9,804 respondents. In the dichotomized data, treating unanswered follow-up questions as failures induces local dependence between two stem questions and their follow-ups. The affected items have unusually large discrimination estimates, and `gpcm` encounters a nearly singular matrix. Removing follow-up items 5 and 10 resolves the immediate problem. With eight items, the reported log likelihoods are -38670.11 for the 2PL/GPCM fit and -38893.11 for the Rasch model; the likelihood-ratio statistic is 446.3603 with seven degrees of freedom, favoring unequal slopes.

For the polytomous analysis, each follow-up is combined with its stem rather than discarded. The GPCM has a higher log likelihood than the graded-response model (-58343.08 versus -58363.02) with the same 23 fitted parameters. Replacing the normal latent distribution with Gamma(1,1) raises the GPCM log likelihood to -58106.28. The normal- and gamma-based EAP scores are strongly related but nonlinearly, showing that latent-distribution assumptions affect respondent scoring. Polytomous GPCM scores are less shrunk toward zero than dichotomous 2PL scores because they retain more response information.

## Limitations

- The `gpcm` package fits only the generalized partial credit model and, at the time described, cannot handle missing responses directly or express general linear parameter constraints.
- `ltm` offers broader model support but only one polytomous family in this comparison and does not allow the non-normal mixing distributions used by `gpcm`.
- The implementation assumes unidimensionality, conditional item independence, common item behavior across respondents, and a user-selected parametric latent distribution. The food-security example demonstrates sensitivity when local independence fails.
- Itemwise information calculations omit cross-item covariance, so the full covariance matrix is unavailable.
- The empirical evidence consists of one simulation and one application, not a systematic recovery, robustness, or runtime study.
- Missing food-security responses are coded as failures to match the operational analysis; that treatment is not justified as a general missing-data method.
- The printed R output reports `pchisq(446.3603, 7)` as 1 because it uses the lower-tail probability. The evidence statement corresponds to the upper-tail likelihood-ratio probability, not that printed value.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: the latent-response framework containing the GPCM, graded-response, Rasch, 2PL, and 3PL models.
- [[concepts/marginal-maximum-likelihood-em-for-irt|Marginal Maximum Likelihood EM for IRT]]: the paper's quadrature and EM calibration strategy.

## Related Papers

- Muraki (1992), "A Generalized Partial Credit Model: Application of an EM Algorithm": cited foundation for the response model and EM implementation.
- Rizopoulos (2006), "ltm: An R Package for Latent Variable Modeling and Item Response Theory Analyses": cited R package used for model comparisons.
- [[papers/maximum-marginal-likelihood-estimation-with-an-expectation-maximization-algorithm-for-multigroup-mixture-multidimensional-item-response-theory-models|Maximum Marginal Likelihood Estimation With an Expectation-Maximization Algorithm for Multigroup/Mixture Multidimensional Item Response Theory Models]]: a later library treatment extending explicit MML-EM calculations to multidimensional and grouped settings; not cited in this paper.
- [[papers/bayesian-item-response-modeling-in-r-with-brms-and-stan|Bayesian Item Response Modeling in R with brms and Stan]]: a later library comparison using general Bayesian multilevel software for a wider set of response models; not cited in this paper.

[[index|Library home]]
