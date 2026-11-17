---
title: "Geographic Boundaries and Local Economic Conditions Matter for Views of the Economy"
type: paper
authors:
  - James Bisbee
  - Jan Zilinsky
year: 2023
doi: "10.1017/pan.2021.50"
journal: "Political Analysis"
source_job_id: 2aa684cc-f88f-4671-af85-02261091ef0a
tags:
  - political-methodology
  - geographic-aggregation
  - economic-evaluations
---

## TL;DR

Geographic aggregation changes how strongly local economic conditions predict Americans’ assessments of the national economy. In nearly 1.7 million Gallup observations from 2008–2017, contextual predictors are especially informative at commuting-zone and media-market scales. Overall predictive gains across geographies are modest, but variable importance and income–opinion associations change substantially, illustrating the [[concepts/modifiable-areal-unit-problem|Modifiable Areal Unit Problem]].

## Research Question

How does the geographic unit used to measure local economic conditions affect model fit, contextual variable importance, and associations with individual economic evaluations?

## Motivation

Administrative boundaries often determine available contextual measures without necessarily matching people’s information environments. This can distort comparisons between local economic conditions and partisanship as predictors of public opinion, even when individual survey responses remain unchanged.

## Contributions

- Compares contextual economic measures across commonly used geographic aggregations with the same individual-level outcome.
- Distinguishes changes in overall prediction from changes in contextual importance and regression associations.
- Provides an applied sensitivity-analysis workflow combining random forests, permutation importance, and linear regression.

## Method

Daily Gallup surveys supply nearly 1.7 million economic evaluations during 2008–2017, measured on a four-category scale from poor to excellent. Respondent ZIP codes link surveys to IRS economic data. Contextual variables are adjusted gross income per return (logged thousands of dollars), unemployment compensation per return (logged thousands of dollars plus one), income inequality measured by the Gini coefficient, and the proportion filing tax returns.

Crosswalks and shape files aggregate economic measures to ZIP codes, counties, commuting zones, congressional districts, designated market areas, states, and regional units. Individual controls include age, race, education, gender, marital status, self-reported income, and party identification, with year indicators.

Random forests measure predictive fit using mean squared error (MSE). Permutation importance assesses the deterioration in performance when a predictor is shuffled. OLS models with individual controls and year fixed effects examine partial associations between local income and economic evaluations. These are observational prediction and association analyses.

## Experiments

- **Overall fit (Figure 1):** Finer aggregation improves prediction, but the authors characterize the magnitude as small: a 2.7% increase in predictive accuracy between the smallest and largest units. They also describe a difference of 0.015 on the four-point outcome scale, whose mean is 1.86 and standard deviation is 0.79.
- **Contextual importance (Figure 2):** Economic measures are most informative at commuting-zone scales, with unemployment compensation also especially informative at the designated-market-area level. The reported model-accuracy improvements are approximately 5–10%. Importance generally follows an inverted U across unit size, with congressional districts an exception.
- **Comparison with individual characteristics (Figure 3):** At the commuting-zone level, unemployment compensation has almost 9% importance on the reported MSE-based comparison, versus about 4% for Democratic identification. This is predictive importance, not a causal-effect comparison.
- **Partial associations (Figure 4):** Local income is positively associated with economic evaluations at smaller scales; at larger scales the estimated association weakens and can become statistically insignificant.

The issue citation is 2023, volume 31, pages 288–294; the supplied text reports online publication on 22 February 2022. Replication data are identified as [Harvard Dataverse, V1](https://doi.org/10.7910/DVN/C1XZKK).

## Limitations

- Predictive importance and partial correlations do not identify causal effects of economic conditions or establish the mechanism by which people acquire information.
- Modest differences in overall fit should be distinguished from larger changes in individual predictors’ importance.
- Unemployment compensation per tax return is the operational measure, even where the article informally refers to unemployment claims; it is not an unemployment-rate measure.
- The findings concern U.S. economic evaluations in 2008–2017 and do not establish a universally optimal geographic scale.
- The supplied Markdown omits referenced supplementary details and footnote bodies, limiting reconstruction of model tuning, geographic matching, and uncertainty procedures. Its importance descriptions alternate between MSE deterioration after shuffling and reductions attributable to intact information; the percentages above retain the reported comparisons without treating them as causal magnitudes.

## Related Concepts

- [[concepts/modifiable-areal-unit-problem|Modifiable Areal Unit Problem]]: aggregation changes contextual measurement and substantive conclusions even with individual-level outcomes.

## Related Papers

- [[papers/the-modifiable-areal-unit-problem-in-political-science|The Modifiable Areal Unit Problem in Political Science]]: a broader methodological treatment of scale, zoning, and theory-based geographic choices.
- Ansolabehere, Meredith, and Snowberg (2014), “Mecro-Economic Voting: Local Information and Micro-Perceptions of the Macro-Economy.” The source interprets intermediate-scale importance as consistent with its information-environment bias–variance trade-off.
- Bisgaard, Dinesen, and Sonderskov (2016), “Reconsidering the Neighborhood Effect: Does Exposure to Residential Unemployment Influence Voters’ Perceptions of the National Economy?” Related evidence on local unemployment and national economic perceptions.
