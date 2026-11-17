---
title: "Estimating and Using Individual Marginal Component Effects from Conjoint Experiments"
type: paper
authors:
  - Kirill Zhirkov
year: 2022
doi: "10.1017/pan.2021.4"
source_job_id: "dee0f445-a33a-48cd-9212-350b1e3196d9"
tags:
  - conjoint-experiments
  - preference-measurement
  - treatment-effect-heterogeneity
---

## TL;DR

Respondent-specific regressions on repeated randomized profile ratings estimate individual marginal component effects (IMCEs). An immigrant-admission application shows how these estimates reveal preference heterogeneity hidden by averages, while emphasizing substantial individual uncertainty and propagating it through plausible-value draws.

## Research Question

How can conjoint experiments estimate individual preferences and use them to study distributions, correlations across preference dimensions, and associations with respondent characteristics?

## Motivation

Subgroup average effects depend on observed categories and can conceal variation within them. Individual estimates allow preferences to become measured variables in subsequent analyses rather than only population summaries.

## Contributions

- Defines respondent-level marginal component effects and estimates them independently using OLS.
- Connects feasible estimation to rating outcomes, few attribute levels, and many profiles per respondent.
- Proposes normal-approximation and bootstrap draws to carry estimation uncertainty into subsequent analyses.
- Demonstrates these procedures in a partial replication of an immigrant-admission conjoint experiment.

## Method

For respondent $i$ and binary attribute $l$, fit $y_{ij}=\alpha_{il}+\beta_{il}x_{ijl}+\varepsilon_{ijl}$ across rated profiles $j$. The slope estimates the IMCE: the effect of the attribute for that respondent, averaged over the randomized distribution of other attributes. Identification assumes stable responses without carryover, no profile-order effects, and completely independent profile randomization. Both attribute levels must occur within the respondent's observations.

The paper recommends numerical ratings, minimizing attribute levels, and approximately 20–30 rated profiles. Broader analysis categories can be formed from realistic detailed labels, with aggregate diagnostics checking whether collapsing levels is justified. These are design recommendations, not established universal sample-size thresholds.

For uncertainty propagation, draw plausible effects from a normal distribution centered on each OLS estimate with its estimated variance, or resample attribute–rating pairs within respondents and refit. Bootstrap samples without attribute variation are redrawn. Analyze each resulting dataset and combine estimates and within-/between-dataset variances using [[concepts/multiple-imputation|Multiple Imputation]] pooling rules. This applies pooling machinery to uncertain estimated preferences rather than conventional missing observations.

## Experiments

The December 2019 Lucid survey collected 1,003 responses. Excluding 74 respondents who gave identical ratings to every profile left 929; all six IMCEs were estimable for 928. Each respondent rated 15 pairs (30 profiles) on a 0–10 admission scale. Independently randomized attributes covered age, gender, race/ethnicity, education, English proficiency, and prior immigration-status violations; analysis dichotomized each attribute.

Aggregate effects favored some college or higher education, good English, and no prior violations. Age and race effects were near zero, with a slight average preference for women. Table 2 reports the following individual classifications, using 95% confidence intervals:

| Attribute contrast | Negative | Interval includes zero | Positive |
| --- | ---: | ---: | ---: |
| Some college or higher vs. less | 1.2% | 74.8% | 24.0% |
| Good vs. poor English | 1.2% | 77.5% | 21.3% |
| No prior violation vs. violation | 0.8% | 57.7% | 41.6% |

For age, gender, and race, 92.0–94.4% of intervals included zero. Preference point-estimate correlations were generally small; education and English preferences correlated at $r=0.18$. Subsequent analyses used point estimates and 100 plausible-value datasets from each uncertainty procedure. Education and ethnocentrism showed no strong, consistent associations with preferences; Republicans placed greater relative weight on no prior violations than Democrats.

Replication data and code: https://doi.org/10.7910/DVN/K2JI6I. The article appeared online in 2021 and in *Political Analysis* 30 (2022), 236–249.

## Limitations

Only 30 observations support each respondent's regressions, leaving substantial uncertainty. An interval containing zero does not establish indifference, even though the paper interprets many such cases as weakly defined preferences. Excluding constant raters limits the reported distributions to the retained sample. Rating outcomes and coarse attribute categories trade realism or substantive detail for precision; the design is less suited to questions requiring forced choice. Longer tasks introduce fatigue and stability concerns. Normal draws require distributional assumptions; bootstrap resamples can be degenerate. The paper leaves a firm minimum profile count and the bias–efficiency trade-off of hierarchical estimation to future research. Associations with partisanship are not causal effects of partisanship.

## Related Concepts

- [[concepts/individual-marginal-component-effects|Individual Marginal Component Effects]]: respondent-level causal preference contrasts.
- [[concepts/multiple-imputation|Multiple Imputation]]: pooling framework used for plausible-value analyses.
- [[concepts/adaptive-conjoint-experiments|Adaptive Conjoint Experiments]]: a different heterogeneity target, searching profile contexts rather than estimating each respondent's marginal preference.

## Related Papers

- Hainmueller, Hopkins, and Yamamoto (2014), “Causal Inference in Conjoint Analysis”: foundational identification framework used here.
- Hainmueller and Hopkins (2015), “The Hidden American Immigration Consensus”: the substantive experiment partially replicated.
- Leeper, Hobolt, and Tilley (2020), “Measuring Subgroup Preferences in Conjoint Experiments”: subgroup comparisons that motivate moving to individual estimates.
