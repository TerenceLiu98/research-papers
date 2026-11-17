---
title: "Explaining Recruitment to Extremism: A Bayesian Hierarchical Case–Control Approach"
type: paper
authors:
  - Roberto Cerina
  - Christopher Barrie
  - Neil Ketchley
  - Aaron Y. Zelin
year: 2023
source_job_id: 67b5c90e-6aec-4043-9461-db425e96af82
tags:
  - bayesian-modeling
  - political-violence
  - case-control-design
---

## TL;DR

Combining recruit records with representative population surveys supplies a comparison population for studying rare political behavior. A Bayesian hierarchical case–control model adjusts for unequal sampling, potentially contaminated controls, spatial dependence, and separation. In the ISIS application, young, high-status men with college education generally have higher estimated recruitment propensity; evidence for relative deprivation differs between Egypt and Tunisia.

## Research Question

How can researchers estimate individual and contextual correlates of extremist recruitment when available recruit records are selective and population surveys contain few recruits?

## Motivation

Recruit-only demographic proportions lack population baselines, while analyses of geographic recruitment rates cannot directly establish individual-level relationships. Combining survey respondents and recruit records makes individual comparisons possible, but requires explicit treatment of the sampling process and uncertainty about respondents’ eventual recruitment.

## Contributions

- Integrates contamination correction, area-level partial pooling, spatial smoothing, and regularizing priors within a case–control model.
- Demonstrates complementary cross-national and contextualized single-country analyses.
- Reports simulation comparisons and provides the extremeR implementation.

## Method

Known recruits are labeled cases; survey respondents are unlabeled controls that may include actual recruits. The model separates observed labels from latent recruitment status. Given population prevalence pi, labeled-case count n1, and unlabeled count nu, its sampling offset is log(1 + n1/(pi nu)). A true control cannot receive a case label; a true case receives that label with probability n1/(n1 + pi nu). In this application, the labeling probabilities are supplied as data rather than estimated.

The latent recruitment logit adds individual covariates, country random effects, and a scaled mixture of independent and intrinsic conditional autoregressive area effects from the [[concepts/besag-york-mollie-model|Besag-York-Mollié Model]] family. The mixture addresses [[concepts/spatial-autocorrelation|Spatial Autocorrelation]] while retaining unstructured local heterogeneity. Spatial effects require centering and graph-dependent scaling. Fixed-effect priors are Cauchy(0, 1), with Cauchy(0, 10) for the intercept; covariates are centered and scaled.

Individual predictors include age, age squared, marital status, college education, student status, and low occupational status. The interaction of college education with low status operationalizes relative deprivation. Country analyses add district demographic, labor-market, political, and contentious-history covariates. Predictions remove the sampling offset and evaluate theoretical profiles in an average district.

## Experiments

The application combines leaked ISIS border records with Arab Barometer Wave III surveys conducted before most recorded recruits entered ISIS-held territory.

| Analysis | Recruits | Survey records | Main finding |
| --- | ---: | ---: | --- |
| Nine-country cross-national model | 1,051 | 5,093 | High status and youth characterize higher predicted recruitment; college education adds to this pattern. |
| Egypt contextual model | 66 | 551 | Relative deprivation has more support, but profile uncertainty is substantial. |
| Tunisia contextual model | 426 | 589 | High-status college-educated profiles have higher estimated propensity. |

Tables 1–3 report top-profile probabilities of 0.000460 across countries, 0.000287 in Egypt, and 0.043680 in Tunisia. These are model-based theoretical-profile predictions, not observed subgroup recruitment rates or held-out predictive accuracy. Profile rankings have wide intervals, especially in Egypt, where high- and low-risk distributions overlap substantially.

The estimated spatial share of residual area variation is about 90% at the cross-national governorate level, versus 15% and 19% at the district level in Egypt and Tunisia. These concern different geographic levels and specifications.

Section 2.7 summarizes supplementary simulations varying sample size, population prevalence, sample–population prevalence discrepancy, and spatial autocorrelation. The authors report advantages over King–Zeng rare-events regression and fixed-effects logistic regression; numerical simulation results are not supplied in this main-text Markdown.

## Limitations

- Sensitivity to inaccurate prevalence information and exogenous selection into non-probability recruit samples are explicitly untested simulation dimensions.
- Partial pooling and spatial adjustment do not establish that selective recruit records represent the full recruit population.
- Available border-record variables constrain covariates; low-status employment interacted with education is a proxy for relative deprivation.
- Large prediction intervals, particularly for Egypt, limit profile ranking and substantive certainty. Much district-level heterogeneity remains unexplained.
- Findings describe modeled associations, not causal effects of education or status. Geographic smoothing does not identify recruitment networks.
- The supplied text states online publication on 16 November 2023; the year field follows that date.

## Related Concepts

- [[concepts/besag-york-mollie-model|Besag-York-Mollié Model]]: combines structured and independent area effects in the recruitment logit.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: motivates smoothing across neighboring administrative units.

## Related Papers

- [[papers/bayesian-image-restoration-with-two-applications-in-spatial-statistics|Bayesian Image Restoration, with Two Applications in Spatial Statistics]]: cited foundation for the structured-plus-independent spatial model.
- Rosenfeld (2018), “A Case–Control Method for Studying Protest Participation and Other Rare Events: Application to Ukraine’s Euromaidan”: cited political-science precursor.
- Rota et al. (2013), “A Re-Evaluation of a Case–Control Model with Contaminated Controls for Resource Selection Studies”: source of the contamination formulation adapted here.
- King and Zeng (2001), “Logistic Regression in Rare Events Data”: rare-events comparator discussed in the simulations.
