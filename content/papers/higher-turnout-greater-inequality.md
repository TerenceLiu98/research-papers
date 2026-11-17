---
title: "Higher Turnout, Greater Inequality? A Precinct-Level Analysis of Income Inequality in U.S. Presidential Voting, 2016 to 2020"
type: paper
authors:
  - Ankit Rastogi
  - Daniel Laurison
year: 2025
doi: "10.1177/23780231251338441"
source_job_id: d4404939-4247-4203-ae5e-58e8eaab6605
tags:
  - voter-turnout
  - political-inequality
  - electoral-geography
---

## TL;DR

Across 125,127 U.S. precincts with unchanged boundaries, the estimated turnout gap between the highest and lowest income deciles widened from approximately 17 percentage points in 2016 to 27 in 2020. Higher overall participation coincided with greater geographic income inequality in participation. These are precinct-level associations, not estimates of individual income effects.

## Research Question

Do richer precincts have higher turnout, and did this gradient become steeper between the 2016 and 2020 presidential elections?

## Motivation

Survey estimates of income-related turnout gaps vary with nonresponse, voting overreporting, and sample composition. Official precinct returns avoid self-reported voting outcomes and reveal local participation patterns, although they cannot identify individual income–voting relationships.

## Contributions

- Combines official election returns and census geography to measure income gradients at a fine geographic scale across the United States.
- Compares the same precinct boundaries across elections, separating observed vote-count change from administrative boundary change.
- Documents a widening participation gap using descriptive rates and adjusted count models.

## Method

The analysis links Voting and Election Science Team returns to 2020 census population and 2021 ACS five-year socioeconomic estimates. Areal-overlap weights transfer block population and block-group income to precincts, an application of [[concepts/change-of-spatial-support|Change of Spatial Support]]. A single demographic snapshot is used for both elections.

The stable-boundary sample contains 125,127 precincts, approximately 102 million votes in 2016 and 117 million in 2020, and 188 million voting-age residents. It covers roughly 75% of votes in each election rather than the entire electorate.

Descriptive turnout divides presidential votes by estimated voting-age population. Negative binomial regression models vote counts because Poisson counts were overdispersed. Predictors include percentile-ranked median household income through a cubic term, election year, and income-by-year interactions. A second ordinary least squares regression models the difference in vote counts between elections with cubic income terms.

Both models control for log voting-age population and state fixed effects. Queen-contiguity neighbors supply spatially lagged turnout or turnout-change covariates to address [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]; the count model uses the logged lag. The authors also report robust standard errors. These adjustments do not identify causal income effects or establish causal geographic spillovers.

## Experiments

This is an observational analysis, not a randomized experiment. Figures 1–2 report smoothed descriptive patterns and regression predictions.

| Precinct income group | Approximate 2016 turnout | Approximate 2020 turnout |
| --- | --- | --- |
| Bottom decile, median household income below $38,000 | 50% | 50% |
| Top decile, median household income above $121,000 | 67% | 77% |
| Top–bottom gap | 17 percentage points | 27 percentage points |

These percentages use voting-age population, not the voting-eligible population. Adjusted predictions retain the positive income gradient and larger increases in richer precincts. At the 75th income percentile ($89,000), the count model predicts roughly 900 votes in 2016 and 1,000 in 2020 with other covariates at mean or reference values.

The text refers to supplementary analyses of untransformed income, poverty and education, and excluded precincts. The supplied Markdown does not include those appendices, so their detailed estimates cannot be assessed here.

## Limitations

- Aggregate income and voting measures do not identify which individuals voted or distinguish compositional from contextual effects.
- Voting-age population includes ineligible residents; estimated rates are approximate participation measures.
- Area weighting and a common demographic snapshot introduce measurement assumptions and do not capture local demographic change between elections.
- Restricting to unchanged boundaries omits about one quarter of votes; national geographic coverage does not imply complete population coverage.
- Two unusual elections cannot establish a historical trend. Pandemic exposure, mobilization, and mail voting are possible explanations, not tested mechanisms.
- The parsed summary table and prose disagree on median household income; that disputed descriptive statistic is not used here.

## Related Concepts

- [[concepts/change-of-spatial-support|Change of Spatial Support]]: Census covariates must be transferred to precinct boundaries.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: Neighboring turnout enters the adjusted models.

## Related Papers

- [[papers/a-dataset-of-us-precinct-votes-allocated-to-census-geographies-with-precision|A Dataset of US Precinct Votes Allocated to Census Geographies with Precision]]: Studies the reverse geographic transfer and demonstrates sensitivity of turnout inference to allocation assumptions.
- Laurison and Rastogi (2023), “Income Inequality in U.S. Voting: A Visualization”: The cited survey-based comparison finds different gap magnitudes across validated survey sources; its individual-level estimates are not directly comparable with precinct-level gaps.
