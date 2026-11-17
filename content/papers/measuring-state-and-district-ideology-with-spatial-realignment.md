---
title: "Measuring State and District Ideology with Spatial Realignment"
type: paper
authors:
  - James E. Monogan III
  - Jeff Gill
year: null
source_job_id: d9eba2ab-ec4b-4294-84da-ca6fb72f7302
tags:
  - political-methodology
  - spatial-statistics
  - public-opinion
---

## TL;DR

Bayesian spatial modeling turns geocoded survey responses into a continuous ideology surface that can be aggregated to states or congressional districts. In the 2008 application, kriging improves electoral correlations over direct survey averages in small Virginia districts, but does not dominate post-stratification or state-level survey averages.

## Research Question

Can spatial dependence and demographic information support comparable constituency ideology estimates across geographic boundaries, including constituencies with few survey respondents?

## Motivation

Survey subsamples become sparse at local scales, electoral returns measure behavior rather than ideology, and political boundaries need not coincide with social context. A continuous surface permits [[concepts/change-of-spatial-support|Change of Spatial Support]] without treating every border as a discontinuity in public opinion.

## Contributions

- Develops a Bayesian hierarchical spatial framework for point-to-block prediction of constituency opinion.
- Combines demographic prediction with spatially correlated residual information and population-informed aggregation.
- Introduces Bootstrapped Random Spatial Sampling (BRSS) as a computational approximation and illustrates state and district estimates.

## Method

The application uses 21,543 respondents from the 2008 CCES, geolocated through ZIP codes. Self-reported ideology ranges from 0 (liberal) to 100 (conservative). Predictors include age, education, race, sex, income, religion, employment, homeownership, county ruralness, and a second-order polynomial in geographic coordinates.

The Gaussian response model combines a demographic/spatial-trend mean with covariance $\Sigma=\sigma^2H(\phi)+\tau^2I$, where $H_{ij}=\exp(-\phi^2d_{ij}^2)$. The partial sill captures spatial variation and the nugget captures remaining individual variation. The relative nugget receives a uniform prior on [6, 8] for numerical stability; coefficient priors are flat. Conditional prediction adjusts the modeled mean using covariance-weighted observed residuals.

BRSS draws 100 subsamples with replacement, each containing 5% of observations, retains 1,000 Monte Carlo iterations per subsample, and pools them. This is the implemented approximation, distinct from the proposed full-information sampler discussed in the paper.

For aggregation, the authors generate 241,530 simulated citizens, sampling ZIP codes in proportion to population and drawing locations around their centroids. Demographics come from 2000 Census distributions, religion from county religious-adherence data, and ruralness from county measures. At each iteration they sample 5% of simulated citizens, krige ideology, and average within target boundaries. Population-informed sampling matters: the target is average citizen ideology, rather than an unweighted land-area average.

## Experiments

The Gaussian covariance specification has the lowest reported BIC (262,039), compared with wave (262,087), Matérn (262,743), and exponential (271,018). Posterior mean spatial and nonspatial variance components are approximately 87 and 605, respectively; space accounts for about 12.6% of unexplained variance.

Electoral correlations provide an external comparison, not direct ground truth for ideology:

| Electoral outcome and units | Kriging | Survey subsetting | Post-stratification |
| --- | ---: | ---: | ---: |
| Obama two-party share, lower 48 states and DC | -0.8281 | -0.8912 | -0.8668 |
| Obama two-party share, 11 Virginia districts | -0.7750 | -0.6001 | -0.8852 |
| Democratic House share, 9 contested Virginia districts | -0.6270 | -0.3213 | -0.6018 |

Virginia district survey samples range from 33 to 65 respondents. Model-based approaches outperform direct averages on these correlations, while state-level subsetting performs best where samples are larger. Kriging provides estimates of within-state ideological dispersion as well as means.

## Limitations

- Validation covers one election year and a small district application; electoral behavior is conceptually distinct from self-reported ideology.
- The authors acknowledge that the polynomial trend may impose excessive similarity among neighboring states.
- Dense spatial calculations motivate subsampling; pooled BRSS draws should not be confused with exact full-data posterior inference.
- ZIP-based geolocation, historical demographic distributions, covariance choices, and the tight relative-nugget prior condition the estimates. Finer output boundaries alone do not establish finer accuracy.
- The supplied Markdown omits the referenced appendices and does not establish publication year or a stable paper identifier; those metadata are left unspecified.

## Related Concepts

- [[concepts/change-of-spatial-support|Change of Spatial Support]]: converts point predictions into population-informed constituency summaries.
- [[concepts/bayesian-spatial-disaggregation|Bayesian Spatial Disaggregation]]: related latent-surface modeling, but starts from aggregate observations rather than individual survey points.

## Related Papers

- Park, Gelman, and Bafumi (2004), “Bayesian Multilevel Estimation with Poststratification: State-Level Estimates from National Polls”: cited model-based opinion-estimation precedent.
- [[papers/integrating-data-across-misaligned-spatial-units|Integrating Data Across Misaligned Spatial Units]]: related library reading on transformation accuracy and downstream inference; this is a conceptual connection, not a citation in the supplied paper.
