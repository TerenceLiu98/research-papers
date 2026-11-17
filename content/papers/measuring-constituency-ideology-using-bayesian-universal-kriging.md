---
title: "Measuring Constituency Ideology Using Bayesian Universal Kriging"
type: paper
authors:
  - Jeff Gill
year: 2021
doi: 10.1177/1532440020930197
source_job_id: bffe5739-652e-47df-8e1f-2012d18884c1
tags:
  - political-methodology
  - spatial-statistics
  - public-opinion
---

## TL;DR

Bayesian universal kriging combines geocoded survey responses with population demographics to estimate 2010 ideology for all 50 states, 435 congressional districts, and state legislative districts. The paper extends earlier spatial realignment work with finer census inputs, corrected ZIP-code geolocation, and an ideological-neighbor procedure for Alaska and Hawaii. Electoral and legislative associations support external validity.

## Research Question

Can geographically continuous survey prediction yield useful constituency ideology measures across multiple electoral scales, including sparsely observed districts and noncontiguous states?

## Motivation

Direct district survey averages can rest on very few respondents. Election returns measure choices rather than ideology, while constituency random effects need not capture political similarities across borders. Spatial prediction offers a way to borrow information across nearby people and then aggregate predictions within the boundaries of interest.

## Contributions

- Releases constituency ideology estimates labeled 2010, combining 2008 CCES responses with 2010 population data.
- Replaces ZCTA-based respondent placement with address-derived ZIP-code polygons and simulates population locations at census-block resolution.
- Incorporates Alaska and Hawaii by relocating their forecasting coordinates near empirically selected ideological neighbors.
- Evaluates the resulting estimates against presidential voting, congressional ideology, and state legislative ideology.

## Method

The survey contains 21,849 respondents reporting ideology from 0 (most liberal) to 100 (most conservative). Training excludes Alaska and Hawaii, leaving 21,764 observations. Predictors include age, education, race, sex, income, religion, ruralness, homeownership, employment, and quadratic geographic trends.

The response model is

$$
Y(s)=X(s)\beta+\omega(s)+\epsilon(s),\qquad
\Sigma=\sigma^2H(\phi)+\tau^2I,\qquad
H_{ij}=\exp(-\phi^2d_{ij}^2).
$$

The spatial partial sill and independent nugget separate geographic residual dependence from individual noise. An initial residual semivariogram selects the Gaussian correlation function. Priors are flat for regression coefficients, proportional to the inverse variance for the partial sill, uniform on [6, 8] for the relative nugget, and uniform on [0, 12,000] for the range parameter.

Bootstrapped Random Spatial Sampling uses 100 subsamples containing 5% of the original data and 1,000 iterations per subsample. The implemented estimator is a Monte Carlo–feasible generalized least squares hybrid, explicitly distinguished from MCMC in the paper. Forecasts combine demographic predictions with covariance-weighted survey residuals.

The paper reports 724,814 simulated citizens: 701,050 sampled proportionally to census-block population and another 23,764 to supplement tract coverage. Demographics are drawn from the finest available local distributions: blocks for age, race, sex, and homeownership; block groups for education and income; tracts for employment; counties for religion and ruralness. Predictions are averaged within electoral boundaries, implementing [[concepts/change-of-spatial-support|Change of Spatial Support]].

Respondent locations use 2014 TomTom address-derived ZIP polygons rather than treating postal ZIP codes as census ZCTAs. For forecasting, Alaska and Hawaii are translated near west-coast locations that minimize prediction errors for their survey observations: Honolulu near San Francisco and Juneau south of San Diego. This is a constructed ideological geometry, not their physical geography.

## Experiments

The Gaussian semivariogram has the lowest reported BIC: 297,881, compared with 297,896 for wave, 298,268 for Matérn, and 306,309 for exponential. Table 1 reports posterior mean partial sill 87.0752 and nugget 610.5291.

State estimates track 2012 Obama vote share and 2011 senators' DW-NOMINATE scores. District estimates also show the expected positive relationship with House DW-NOMINATE and state legislators' Shor–McCarty scores. These are external association checks, not observed ground truth for constituency ideology.

| Comparison | Reported correlation |
| --- | ---: |
| Earlier Monogan–Gill estimates, continental 48 states | 0.9893 |
| Tausanovitch–Warshaw estimates, state lower-chamber districts | 0.6117 |

An illustration examines 37 Florida House Democrats voting on H. 7161 in 2011. Of 12 opponents, 8 represented below-average-conservatism districts according to kriging, compared with 5 using MRP estimates and 6 using McCain vote share. This single-vote comparison illustrates how measurement choice changes a representation narrative; it does not establish general predictive superiority.

The paper identifies replication data and estimates at DOI `10.15139/S3/7NNASB` and describes distribution through the R package `krige`.

## Limitations

- The estimates combine survey and population inputs from different years; they are not a longitudinal measure of changing ideology.
- Smooth, stationary, isotropic residual dependence can miss sharp social or physical barriers. ZIP-based placement remains approximate.
- Alaska and Hawaii depend on a fitted relocation assumption rather than ordinary geographic proximity.
- Subsampling and pooling provide a computational approximation, not exact full-data posterior inference. Dispersion of predicted citizens should not automatically be interpreted as uncertainty in a district mean.
- Legislative and electoral correlations provide indirect validation. The Florida illustration does not isolate a causal effect of constituency preferences.
- The supplied Markdown contains corrupted equations and omits Online Appendix A. This summary retains the clearly stated model and procedure without reconstructing missing implementation details.

## Related Concepts

- [[concepts/change-of-spatial-support|Change of Spatial Support]]: population-informed point predictions are aggregated to constituencies.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: residual geographic association supplies information beyond demographic predictors.

## Related Papers

- [[papers/measuring-state-and-district-ideology-with-spatial-realignment|Measuring State and District Ideology with Spatial Realignment]]: the methodological predecessor; this paper extends geographic coverage and refines geolocation and population inputs.
- Tausanovitch and Warshaw (2013), “Measuring Constituent Policy Preferences in Congress, State Legislatures, and Cities”: MRP-based constituency measures used for comparison.
