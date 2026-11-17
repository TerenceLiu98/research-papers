---
title: "Ideology Justifies Morality: Political Beliefs Predict Moral Foundations"
type: paper
authors:
  - Peter K. Hatemi
  - Charles Crabtree
  - Kevin B. Smith
year: 2019
journal: American Journal of Political Science
volume: 63
issue: 4
pages: 788–806
url: https://www.jstor.org/stable/45217042
tags:
  - political-psychology
  - moral-psychology
  - panel-data
---

## TL;DR

Across Australian and U.S. panels, political ideology predicts subsequent moral-foundation responses more consistently than the reverse. Moral foundations add little predictive information beyond prior ideology. These observational results challenge the use of Moral Foundations Theory as a causal explanation of ideology, but do not conclusively identify a causal effect of ideology on morality.

## Research Question

Do moral intuitions shape political beliefs, do political beliefs shape moral judgments, or are the relationships reciprocal?

## Motivation

Correlations between ideology and moral foundations are compatible with either direction. Earlier panel evidence was disputed because moral-foundation instruments changed across waves and ideology was measured with more items. The study addresses those measurement objections while distinguishing temporal prediction from causal identification.

## Contributions

- Compares temporal stability under different ideology measures and MFQ instruments.
- Tests both directions with cross-lagged panel models in two countries and a three-wave random-intercept extension.
- Uses random forests to assess predictive importance, with a nationally representative ANES comparison for predicting ideology.

## Method

The five foundations are grouped into individualizing concerns (care and fairness) and binding concerns (loyalty, authority, and purity). Cross-lagged models regress each outcome on its own prior value and the prior value of the other construct. The baseline models control for temporal persistence, without additional covariates. Three-wave random-intercept models provide a further check allowing enduring individual differences.

Random forests assess predictive contributions using permutation importance expressed as increases in mean squared error. These are predictive comparisons, not estimates of causal effects. The authors interpret the asymmetric results as consistent with political beliefs guiding moral rationalization; motivated reasoning itself is not experimentally isolated.

## Experiments

| Sample | Design and measurement | Role |
|---|---|---|
| Australia | 586 respondents in 2007–2009; 402 reinterviewed in 2009–2011; MFQ10 then MFQ20; social, defense, and economic attitude scales | Bidirectional panel and prediction analyses |
| U.S. MTurk | 1,052 respondents in October 2014; 208 in April 2017; 393 in April 2018; MFQ30 and single-item seven-point ideology | Measurement checks, cross-lagged models, three-wave extension, prediction |
| ANES 2008–2009 | MFQ20 at wave 7, ideology at waves 6 and 11 | Nationally representative prediction check; cannot test both directions |

The MTurk follow-up eligibility changed between waves: wave 2 invited only 521 original respondents, whereas wave 3 invited all original participants. Eighteen percent of the original sample completed all three waves.

**Measurement checks.** Six shared MFQ items had average test–retest correlation 0.64 versus 0.65 for the remaining 24 items. Single-item ideology correlations were approximately 0.88 between the first two waves and 0.94 between the latter two. In Australia, ideology-factor stability ranged from 0.41 to 0.71, versus 0.35 and 0.38 for binding and individualizing foundations.

**Cross-lagged results (Tables 1–5).** None of seven MTurk foundation-to-ideology coefficients reached p < .05; four reverse-direction coefficients did, for binding, authority, loyalty, and purity. In Australia, none of 21 foundation-to-ideology coefficients reached p < .05, compared with eight reverse-direction coefficients. The smaller three-wave random-intercept analysis found no foundation-to-ideology evidence and only weak reverse-direction evidence at p ≤ .10.

**Prediction (Figures 4–8).** In MTurk models, prior ideology was five to six times as important as moral foundations for predicting ideology. Prior foundations were only two to three times as important as ideology for predicting foundations. Australian models showed a similar asymmetry. ANES confirmed limited additional prediction of ideology from foundations but could not assess the reverse direction.

## Limitations

Observational temporal precedence does not eliminate confounding; nonsignificant coefficients do not establish zero effects. Only ANES is nationally representative, and it measures foundations once. Attrition limits the three-wave analysis. Conclusions concern questionnaire-based moral judgments over the observed intervals, not all moral processes or developmental periods. The parsed article inconsistently describes the economic ideology scale as containing three versus four items, so its item count is not treated as settled here.

Replication materials are identified by the article at [Harvard Dataverse](https://doi.org/10.7910/DVN/O6VHZZ). Supplementary analyses are described in the supplied article; they were not independently reproduced.

## Related Concepts

- [[concepts/moral-foundations-theory|Moral Foundations Theory]]: distinguishes the descriptive association of morality with ideology from the disputed claim that foundations causally generate political orientations.

## Related Papers

- Smith et al. (2017), “Intuitive Ethics and Political Orientations: Testing Moral Foundations as a Theory of Political Ideology”: the earlier panel study whose Australian data and measurement criticisms motivate this analysis.
- Graham, Haidt, and Nosek (2009), “Liberals and Conservatives Rely on Different Sets of Moral Foundations”: establishes the correlational pattern whose direction this paper investigates.
