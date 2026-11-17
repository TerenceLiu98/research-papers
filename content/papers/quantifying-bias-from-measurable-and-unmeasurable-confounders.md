---
title: Quantifying Bias from Measurable and Unmeasurable Confounders Across Three Domains of Individual Determinants of Political Preferences
type: paper
authors:
  - Rafael Ahlskog
  - Sven Oskarsson
year: 2023
doi: 10.1017/pan.2022.2
tags:
  - causal-inference
  - political-preferences
  - twin-studies
---

## TL;DR

Across 34 political preference measures, identical-twin comparisons substantially reduce many associations that survive extensive observational controls. The authors propose that roughly half of a conventional adjusted association may reflect confounding, as a heuristic for these results rather than a universal correction factor.

## Research Question

How much measurable and residual familial confounding affects associations between political preferences and socioeconomic factors, moral attitudes, and psychological traits?

## Motivation

Many determinants of political preferences cannot readily be randomized. Rich covariate adjustment can still miss genetic and shared environmental influences. Identical twins offer comparisons that remove factors shared within pairs without directly measuring them.

## Contributions

- Compares minimally adjusted, extensively adjusted, and twin-pair fixed-effects regressions across a common outcome battery.
- Aggregates standardized coefficients with uncertainty accounting for correlated outcomes, addressing the low precision of individual within-pair estimates.
- Examines outcome selection and cross-national survey comparisons to assess how broadly the observed reductions apply.

## Method

The [[concepts/discordant-identical-twin-design|Discordant Identical-Twin Design]] compares members of complete identical-twin pairs. For each predictor and outcome, the empty model adjusts for sex, age fixed effects, and their interaction. The naive model adds municipal, parental, occupational, income, and education controls. The within model adds pair fixed effects; shared controls then drop out.

For each comparison, outcome coding is oriented so the baseline coefficient is nonnegative. The authors average standardized coefficients across outcomes and calculate meta-analytical standard errors incorporating their correlation matrix (Section 4, Equations 6–7). Thus, the naive coefficients are oriented differently for the two comparisons. These averages describe association magnitudes across issues, not a common ideological direction or the causal effect on a single outcome.

## Experiments

The Swedish Twin Registry supplies linked registry and survey data. SALTY surveyed 11,482 individuals born in 1943–1958 during 2009–2010; this is the survey total, not the complete-pair analytical sample size. Outcomes are 34 policy preferences rated on five-point scales. Predictors span education, income, wealth, trust, altruism, antisocial attitudes, utilitarian judgment, risk preferences, extraversion, locus of control, and IQ.

Section 5 reports the following approximate fractions of adjusted naive associations remaining after pair fixed effects:

| Predictor | Fraction remaining |
| --- | --- |
| Education years | 33% |
| Work income | 36% |
| Trust | 25% |
| Net wealth and extraversion | Roughly half |
| IQ, all outcomes | 84% |

Reductions are significant for education years, college, gross and net wealth, work income, trust, and risk preferences. Utilitarian judgment changes little. Figures display 90% confidence intervals.

Selecting outcomes significant in naive models changes the IQ fraction remaining to 52%, with a significant reduction. Selecting outcomes with standardized naive coefficients above 0.1 generally leaves 40–60% of associations. These selections can inflate magnitudes through the winner's curse and cannot distinguish that inflation from improved substantive outcome selection.

Matched election surveys show broadly comparable empty-to-naive reductions in Sweden and other Nordic countries, with less consistent British results for college and income. They do not independently replicate twin comparisons abroad. Contact-rate interaction checks suggest possible inflation of reductions, statistically significant only for IQ.

Replication code and aggregate intermediate data: [Harvard Dataverse](https://doi.org/10.7910/DVN/MGEN32). Individual registry data require access authorization. Published online in 2022; journal issue: *Political Analysis* 31 (2023), 181–194.

## Limitations

Nonshared environmental confounding remains possible. Pair fixed effects can amplify attenuation from random predictor measurement error and remove exogenous as well as endogenous variation. Inter-twin influence threatens independence. Aggregation improves precision but does not resolve these identification problems. Generalization is limited by twin sampling, genotyping participation, cohort, and national context. The authors' upper-bound interpretation additionally assumes residual confounding inflates rather than suppresses associations.

## Related Concepts

- [[concepts/discordant-identical-twin-design|Discordant Identical-Twin Design]]: removes shared familial factors through within-pair comparisons.
- [[concepts/within-and-between-cluster-covariate-effects|Within- and Between-Cluster Covariate Effects]]: clarifies why within-family and population comparisons use different variation.
- [[concepts/bayesian-sensitivity-analysis|Bayesian Sensitivity Analysis]]: a complementary strategy for representing uncertainty about residual confounding.

## Related Papers

- [[papers/bayesian-sensitivity-analysis-for-unmeasured-confounding-in-causal-panel-data-models|Bayesian Sensitivity Analysis for Unmeasured Confounding in Causal Panel Data Models]]: models residual confounding uncertainty rather than removing shared familial variation by design.
- Vitaro, Brendgen, and Arseneault (2009), “The Discordant MZ-Twin Method: One Step Closer to the Holy Grail of Causality”: methodological foundation cited by the paper.
- Bound and Solon (1999), “Double Trouble: On the Value of Twins-Based Estimation of the Return to Schooling”: cited discussion of the identification limits of twin comparisons.
