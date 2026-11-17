---
title: Decoupling Visualization and Testing when Presenting Confidence Intervals
type: paper
authors:
  - David A. Armstrong II
  - William Poirier
year: 2025
doi: 10.1017/pan.2024.24
source_job_id: ddbebb54-2156-49c2-b109-1eea1af6f216
tags:
  - statistical-inference
  - political-methodology
  - visualization
---

## TL;DR

Compute pairwise tests first, then choose a confidence level whose interval overlaps reproduce as many test decisions as possible. In a reanalysis of partisan scholarship choices, an 84% display reproduces all 30 within-treatment comparisons, whereas interpreting 95% interval overlaps misclassifies seven.

## Research Question

How can interval plots convey multiple pairwise comparisons when no universally appropriate interval confidence level exists?

## Motivation

Overlap between ordinary 95% intervals does not reliably identify whether a difference is statistically significant. Earlier inferential-interval procedures calibrate overlap using standard-error ratios and correlations, but the appropriate level can vary across pairs in the same plot.

## Contributions

- Separates inferential decisions from their graphical representation.
- Optimizes agreement across the chosen set of pairwise comparisons and identifies remaining mismatches.
- Allows the upstream tests to incorporate different inferential paradigms, covariance estimators, and multiplicity corrections.
- Provides R and Stata software, with demonstrations referenced in the supplement.

## Method

First conduct the desired pairwise tests, defining $s_{ij}=1$ when a difference is significant and zero otherwise. A zero reference with no sampling variance or covariance can be included to represent tests against zero. For each candidate confidence level $c$, define $s^*_{ij}(c)=1$ when the plotted intervals do not overlap. Select levels maximizing

$$
\sum_{i<j} I\{s_{ij}=s^*_{ij}(c)\}.
$$

When multiple levels maximize agreement, the authors suggest starting with the midpoint between the smallest and largest acceptable values. Flag comparisons whose overlap decisions disagree with the tests. This produces [[concepts/inferential-confidence-intervals|Inferential Confidence Intervals]]; inferential validity comes from the underlying tests, not from optimizing the display.

## Experiments

The main case study reanalyzes Iyengar and Westwood's scholarship-choice experiment using logistic-regression predicted probabilities. Respondent party identification has five categories; candidate qualification has three treatment conditions. Each treatment panel contains ten comparisons, totaling 30.

| Display or treatment | Reported result |
| --- | --- |
| Ordinary 95% intervals | Seven overlap decisions disagree with pairwise tests |
| Equally qualified | Perfect agreement at levels 59.0%–86.3% |
| Republican more qualified | Perfect agreement at levels 81.7%–87.8% |
| Democrat more qualified | Perfect agreement at levels 74.4%–86.9% |
| Common level across panels | 81.7%–86.3%, including 84%, represents all 30 tests |

The opening Supreme Court legitimacy example also illustrates that overlapping 95% intervals can accompany either significant or nonsignificant differences. Replication data and code are identified at [Political Analysis Dataverse](https://doi.org/10.7910/DVN/GFLSLH).

## Limitations

A common level need not reproduce every decision; unresolved mismatches must be marked. Optimizing overlaps does not itself correct for multiple testing or repair invalid upstream inference. The 84% result is application-specific, not a universal recommendation. The supplied Markdown contains the main article but not the referenced supplementary examples or software demonstrations; those were not evaluated here. Its case-study heading says 2014, while the body and bibliography identify Iyengar and Westwood (2015).

## Related Concepts

- [[concepts/inferential-confidence-intervals|Inferential Confidence Intervals]]: interval overlap as a representation of pairwise decisions.
- [[concepts/predicted-probability-contrasts|Predicted Probability Contrasts]]: the case study compares model-derived probabilities, whose differences require appropriate uncertainty estimates.

## Related Papers

- [[papers/predicted-probabilities-and-inference-with-multinomial-logit|Predicted Probabilities and Inference with Multinomial Logit]]: complementary emphasis on testing the intended probability contrast; the present paper addresses displaying comparison decisions.
- Iyengar and Westwood (2015), “Fear and Loathing across Party Lines: New Evidence on Group Polarization”: source of the scholarship-choice application.
- Afshartous and Preston (2010), “Confidence Intervals for Dependent Data: Equating Non-Overlap with Statistical Significance”: pair-specific calibration approach discussed as prior work.
