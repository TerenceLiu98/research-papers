---
title: "The Triggers of War: Disentangling the Spark from the Powder Keg"
type: paper
authors:
  - Thomas Chadefaux
year: 2015
tags:
  - interstate-war
  - conflict-forecasting
  - historical-contingency
  - news-based-measurement
---

## TL;DR

Monthly news and government bond signals improve forecasts of interstate war beyond slow-moving structural covariates. The reported out-of-sample ROC AUC rises from 0.75 for structural variables to 0.83 when news and bonds are added, compared with a 0.64 baseline. War risk is highest when structural vulnerability and short-term warning signals are both elevated. These findings establish added predictive information, while the interpretation of that information as historical chance remains indirect.

This page summarizes the manuscript dated April 28, 2015. The supplied source provides no publication venue, DOI, or arXiv identifier.

## Research Question

How much do proximate disturbances contribute to explaining and predicting interstate war beyond structural conditions, and are disturbances especially consequential in structurally vulnerable dyads?

## Motivation

Geography, alliances, capabilities, and regimes characterize environments prone to war but may not explain why war begins at a particular moment. Triggers can be heterogeneous and context-dependent, making a fixed catalog of events incomplete. The paper therefore uses contemporaneous interpretations recorded in news and financial markets to measure otherwise difficult-to-observe disturbances.

## Contributions

- Develops the distinction between [[concepts/structural-risk-and-conflict-triggers|Structural Risk and Conflict Triggers]], treating peace as potentially stable or vulnerable to small disturbances.
- Operationalizes short-term signals using historical newspapers and sovereign bond yields, with dyadic event data as a robustness source.
- Compares structural, trigger-only, and combined rare-events logistic models and evaluates forecasts using historical training windows.
- Tests whether temporal resolution and the selection of structural covariates account for the predictive gains.

## Method

**Outcome and sample.** The unit is the politically relevant dyad-month. The full conflict dataset contains 783,685 observations over 1816-2001; 1,972 are coded positive because a war begins within the following 12 months. These are positive forecast windows, not 1,972 distinct wars. War is restricted to conflicts with at least 1,000 battle deaths in the dyadic Militarized Interstate Disputes data.

**Trigger proxies.** News counts pair country mentions with tension-related keywords in Google News Archive. Collection spans 1902-2010, but the conflict analysis ends in 2001. The dyadic measure averages the logged country counts. Bond data cover 45 countries, using 10-year government bonds when available and shorter maturities otherwise; the dyadic measure averages logged yields. King and Lowe's 1990-2000 events supply positive and negative Goldstein scores aggregated by dyad-month. Trigger models include levels and monthly first differences, lagged one month.

**Structural covariates.** Annual variables, lagged one year, include geographic proximity, alliances and alliance similarity, capabilities and power asymmetry, major-power status, and regime characteristics. Peace duration and its polynomial terms, dyad age, and their interaction address temporal dependence.

**Estimation.** Logistic models use rare-event bias correction and dyad-clustered standard errors. Separate structural and trigger models produce fitted risk indices, which enter a further logistic model together. Equation 3 is additive in the two indices on the logit scale: the joint-risk figures should not be described as an estimated multiplicative interaction coefficient or a causal interaction test.

**Forecast evaluation.** The paper describes an expanding learning set from January 1902 through a cutoff, followed by a test interval from one to two years after that cutoff. It repeats forecasting annually over 1920-2001, using 1902-1920 as the initial learning period. The baseline includes peace-duration terms, contiguity, and distance. ROC AUC, average F1, and separation plots compare baseline, structural, and combined predictions.

## Experiments

Table 1 reports 591,018 news observations, 526,371 bond observations, and 112,927 event-data observations. The joint news-and-bonds regression uses 391,745 observations.

| Comparison | Reported result | Source |
| --- | --- | --- |
| Baseline / structural / structural plus news and bonds | ROC AUC 0.64 / 0.75 / 0.83 for war within 12 months | Out-of-Sample Predictions; Figure 4 |
| Increment above baseline | 0.11 for structure; 0.19 for the combined model, about 73% more incremental gain | Same section |
| Shorter outcome windows | Larger relative gains for onset within three months or one month | Figure 4 discussion |
| Precision-recall evaluation | Trigger signals more than double the structural model's gain over baseline in average F1; exact scores are not supplied in the prose | Same section |
| Unlagged structural covariates | Relative incremental AUC gain remains 61%, versus 73% with lagged structure | Coarse Structural Variables |
| Two groups of predictors | Regime and power groups yield AUC 0.72; regime and trigger groups yield 0.82 | Imperfect Structural Models |

The AUC increase from 0.75 to 0.83 is 0.08 in absolute terms; the approximately 73% figure concerns gains above baseline, not total AUC. The unlagged structural comparison deliberately allows information from after onset and is a diagnostic, not a deployable forecasting design.

Table 3 reports positive, statistically significant structural and trigger risk indices for all four proxy specifications. Individual proxy coefficients are more mixed: Table A.2 finds a significant monthly news change but an insignificant news level. Tables 2 and A.3 report negative bond-level coefficients and positive bond-change coefficients. Table A.4 finds significance for the negative Goldstein level, but not its change or the positive-side terms. Thus the evidence does not imply that every proxy level or change independently predicts war in the expected direction.

Robustness exercises include detrending and differencing, macroeconomic controls for bonds, and 63 combinations of six predictor groups. Structural-only performance plateaus and can decline as groups are added. King and Lowe's data support regression checks but are excluded from the out-of-sample exercise because the period contains too few wars. The manuscript mentions consistent GDELT checks but withholds their results.

## Limitations

- **Proxy interpretation:** News and yields reflect structural conditions, expectations, and other shocks as well as potential triggers. Predictive improvement does not identify exogenous disturbances or prove an irreducible role for chance.
- **Coverage and aggregation:** English-language news coverage and uneven bond availability limit representation. Country-level signals averaged across a dyad need not concern that specific bilateral relationship.
- **Measurement:** Keyword counts are coarse, and bond yields respond to macroeconomic factors unrelated to war. The included controls reduce some ambiguity without making either measure a direct trigger observation.
- **Model scope:** The finite comparison among observed structural predictor groups cannot rule out omitted variables or better structural models. Joint high-risk predictions do not by themselves identify a causal amplification mechanism.
- **Evidence precision:** The supplied text has incomplete footnotes and section references. Exact F1 values and some robustness details are not recoverable from the prose; GDELT results are not presented. Reported ranking improvements do not establish probability calibration.

## Related Concepts

- [[concepts/structural-risk-and-conflict-triggers|Structural Risk and Conflict Triggers]]: the paper's central distinction between underlying vulnerability and proximate warning signals.
- [[concepts/prediction-markets|Prediction Markets]]: a related use of market information discussed in the manuscript. Sovereign bond yields are indirect risk indicators, unlike contracts paying on a specified political outcome.

## Related Papers

- Chadefaux (2014), "Early warning signals for war in the news," *Journal of Peace Research* 51(1): 5-18: cited source of the newspaper data.
- Gartzke (1999), "War is in the Error Term," *International Organization* 53(3): 567-587: cited treatment of idiosyncrasy and limits of systematic war explanation.
- [[papers/accounting-for-variability-in-conflict-dynamics-a-pattern-based-predictive-model|Accounting for variability in conflict dynamics: A pattern-based predictive model]]: a thematic library connection using historical fatality patterns to forecast conflict trajectories; its target and evidence differ from interstate war onset here.
- [[papers/next-generation-conflict-forecasting-unleashing-predictive-patterns-through-spatiotemporal-learning|Next-Generation Conflict Forecasting: Unleashing Predictive Patterns through Spatiotemporal Learning]]: a thematic comparison that learns from conflict histories rather than news and markets. It is later work, not a citation in this manuscript.

[[index|Library home]]
