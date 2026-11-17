---
title: Using Machine Learning to Test Causal Hypotheses in Conjoint Analysis
type: paper
authors:
  - Dae Woong Ham
  - Kosuke Imai
  - Lucas Janson
year: 2024
doi: "10.1017/pan.2023.41"
source_job_id: "42d7ce9b-9b88-4a73-89fa-971ea0f24442"
tags:
  - conjoint-experiments
  - causal-inference
  - randomization-inference
---

## TL;DR

The [[concepts/conditional-randomization-test|Conditional Randomization Test]] (CRT) tests whether a conjoint attribute matters through any main or interaction effect, using the known assignment design to calibrate machine-learning statistics. In an immigration-preference reanalysis, the interaction-based CRT detects differences between Mexican and European origins (p = 0.042), while the average marginal component effect (AMCE) comparison does not (p = 0.27).

## Research Question

Can researchers test whether a conjoint factor matters at all, including through heterogeneous effects, without correctly specifying an outcome model?

## Motivation

Averaging over profiles and respondents can cancel substantial effects. A small AMCE therefore does not establish that an attribute is irrelevant. Exhaustively modeling interactions creates dimensionality and inference problems; searching subgroups also creates multiple-testing concerns.

## Contributions

- Connects a distributional causal null to conditional independence under randomized assignment.
- Uses flexible learned statistics with finite-sample randomization validity.
- Extends testing to selected factor levels and respondent-characteristic interactions.
- Develops tests of profile order, carryover, and fatigue effects, implemented in the R package CRTConjoint.

## Method

Let X denote focal attributes, Z the remaining attributes, and Y the stacked response vector. The null requires the distribution of Y(x,z) to remain unchanged across focal assignments. Under the experimental randomization, the paper relates this to Y being conditionally independent of X given Z (Section 3.2).

Hold Y and Z fixed, draw B replacement assignments from the known conditional law of X given Z, and recompute the statistic for each draw. The p-value is (1 + number of resampled statistics at least as large as the observed statistic)/(B + 1). Restricted designs require conditional draws that preserve assignment restrictions. Exchangeability under the null supplies validity; correctness of the fitted outcome model is unnecessary.

The proposed HierNet statistic sums squared centered coefficients for focal main effects, within-profile interactions, and between-profile interactions. Respondent characteristics can enter as additional conditioning variables and interaction predictors. Hierarchical regularization and left/right symmetry constraints seek to improve power without determining test validity. The default statistic emphasizes two-way interactions. Tuning without X avoids repeating an expensive cross-validation step for each resample (Section 3.3).

For selected-level comparisons, a coarsening function h groups levels whose equivalence is being tested; resampling conditions on h(X) and Z. This retains observations outside the focal comparison. Separate statistics target left/right asymmetry, interactions of preceding and current profiles, and interactions between attributes and task position (Sections 3.4–3.6).

## Experiments

The immigration analysis uses 1,396 respondents completing five paired tasks: 6,980 choice observations. Europe groups France, Germany, and Poland. The design includes restrictions linking origin to immigration reason and profession to education.

| Analysis | Reported p-value |
| --- | ---: |
| HierNet CRT, Mexico versus Europe | 0.042 |
| AMCE comparison | 0.27 |
| Main-effects-only logistic Lasso CRT | 0.082 |
| CRT including ethnocentrism, 1,135 respondents | 0.019 |
| Profile order test | 0.80 |
| Carryover test | 0.12 |
| Fatigue test | 0.45 |

The largest observed interactions without ethnocentrism involve origin with education and prior U.S. trips. Including continuous ethnocentrism yields a smaller p-value despite the reduced sample. These are evidence of some origin-related differences, not estimates of their size or a unique explanation of discrimination. The regularity tests do not reject their nulls (Table 1; Section 4).

The paper reports approximately six minutes on 50 cores for a main-application p-value with B = 2,000. It describes supplementary simulations supporting power gains, but the supplied Markdown does not include those appendices or their detailed results.

## Limitations

The CRT provides a test, not an effect-size estimate or identification of which interaction drives rejection. Power depends on the statistic; superiority over an AMCE test is not universal, and the null hypotheses differ. Validity requires correct use of the assignment distribution, including restrictions. Repeated model fitting is computationally expensive. Nonrejection of regularity tests does not establish their assumptions. The presented carryover construction assumes no interference across respondents, and detailed resampling procedures are deferred to the unavailable supplement.

## Related Concepts

- [[concepts/conditional-randomization-test|Conditional Randomization Test]]: separates design-based calibration from learned-statistic construction.
- [[concepts/population-average-marginal-component-effect|Population Average Marginal Component Effect]]: a complementary estimation target whose averaging can conceal heterogeneous effects.

## Related Papers

- [[papers/improving-the-external-validity-of-conjoint-analysis|Improving the External Validity of Conjoint Analysis]]: explains how interactions make average effects depend on profile distributions.
- Hainmueller and Hopkins (2015), “The Hidden American Immigration Consensus”: supplies the experiment reanalyzed here.
- Candès et al. (2018), “Panning for Gold”: cited foundation for conditional randomization testing.

Published online 8 February 2024. Article identifier: DOI 10.1017/pan.2023.41.
