---
title: "The Misreporting Trade-Off Between List Experiments and Direct Questions in Practice: Partition Validation Evidence from Two Countries"
type: paper
authors:
  - Patrick M. Kuhn
  - Nick Vivyan
year: 2022
doi: 10.1017/pan.2021.10
tags:
  - survey-methodology
  - measurement-error
  - electoral-turnout
---

## TL;DR

Official turnout records in New Zealand and London reveal that list experiments measure nonvoting less accurately than direct questions, despite looking favorable under conventional prevalence validation. Partition validation separates false positives from false negatives: additional false positives among actual voters outweigh any protection against strategic misreporting.

## Research Question

Does the privacy afforded by list experiments reduce reporting error enough to offset errors introduced by their greater cognitive demands?

## Motivation

A higher estimate of socially disapproved behavior need not indicate more honest reporting. False positives can raise prevalence estimates, and opposing errors can cancel in aggregate. Validation therefore needs individual true scores even when the survey method masks individual answers.

## Contributions

- Adapts partition validation to recover aggregate confusion matrices for list experiments.
- Compares direct and indirect turnout measurement against official records in two settings.
- Distinguishes the strategic–nonstrategic misreporting trade-off from the familiar bias–variance trade-off in prevalence estimation.

## Method

Respondents receive four control activities or the same list plus voting, and report only the number performed. The analysis expresses the resulting estimates as nonvoting, the positive sensitive outcome. Direct questions are analyzed primarily among list-control respondents to avoid priming from the sensitive treatment item.

[[concepts/partition-validation|Partition Validation]] divides respondents by verified turnout. Within actual nonvoters, the nonvoting list estimate gives the true-positive rate; within actual voters, it gives the false-positive rate. Multiplying these rates and their complements by partition sizes produces implied confusion-matrix counts. These are aggregate estimates, not recovered individual responses. Accuracy is the fraction correctly measured, with uncertainty assessed by bootstrap.

## Experiments

The 2017 New Zealand Election Study surveyed 3,455 respondents; the London YouGov survey included 3,189. Official marked electoral rolls supplied definitive turnout for 3,451 New Zealand respondents and 2,595 London respondents. Analysis samples further depend on usable survey answers.

Table 2 reports the following conditional error rates, with nonvoting defined as positive:

| Setting | Direct false negative | List false negative | Direct false positive | List false positive |
| --- | ---: | ---: | ---: | ---: |
| New Zealand | 29.0% | 39.3% | 0.2% | 7.5% |
| London | 26.8% | 42.9% | 1.5% | 7.9% |

Neither list experiment significantly reduces false negatives. The false-positive increase is 7.3 percentage points in New Zealand (95% CI 2.1–12.5) and 6.4 in London (−1.4–14.2); the London contrast alone is not statistically distinguishable from zero. Overall direct-question accuracy exceeds list accuracy by about 7 points in New Zealand (95% CI 2.06–12.66) and 8 in London (0.23–15.23).

Standard diagnostics do not flag these errors. Population prevalence comparisons favor list estimates, while sample prevalence validation in London also conceals errors through cancellation. Under alternative assumptions about the response process, implied nonstrategic-misreporter proportions are approximately 7% or 14%, rather than a directly identified quantity.

In London, 12% meet a probable-satisficer definition combining failed item recall with response times in the fastest quartile. List accuracy is especially poor in this group, consistent with satisficing as a mechanism; this subgroup analysis does not randomly assign satisficing.

## Limitations

The studies concern turnout in relatively educated populations and self-complete surveys. Greater sensitivity or higher norm-defier prevalence could favor list experiments elsewhere. Missing definitive turnout is more substantial in London, creating potential selection concerns. Small nonvoter partitions produce wide uncertainty for false-negative estimates. Partition validation requires credible true scores and does not by itself identify the precise nonstrategic response process. Accuracy and prevalence-estimation RMSE are different evaluation criteria.

## Related Concepts

- [[concepts/list-experiments|List Experiments]]: privacy through item-count aggregation trades off against cognitive complexity.
- [[concepts/partition-validation|Partition Validation]]: distinguishes error types hidden by aggregate prevalence comparisons.
- [[concepts/social-desirability-bias|Social Desirability Bias]]: motivates strategic turnout overreporting under direct questioning.

## Related Papers

- Höglinger and Jann (2018), “More Is Not Always Better”: provides the partition-validation precedent for randomized response and the crosswise model, as discussed in this paper.
- Blair, Chou, and Imai (2019), “List Experiments with Measurement Error”: supplies diagnostics and error-process models examined here.
- [[papers/does-conjoint-analysis-mitigate-social-desirability-bias|Does Conjoint Analysis Mitigate Social Desirability Bias?]]: a related measurement problem in which design-induced differences must be separated from genuine bias reduction.

Published in *Political Analysis* 30, 381–402; first published online April 16, 2021. Replication data identifier reported by the paper: DOI 10.7910/DVN/W90Q7B.
