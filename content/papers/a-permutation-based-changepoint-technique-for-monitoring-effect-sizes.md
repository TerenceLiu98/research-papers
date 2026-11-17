---
title: A Permutation-Based Changepoint Technique for Monitoring Effect Sizes
type: paper
authors:
  - Daniel Kent
  - James D. Wilson
  - Skyler J. Cranmer
year: 2022
doi: 10.1017/pan.2020.44
tags:
  - change-point-detection
  - panel-data
  - statistical-process-monitoring
---

## TL;DR

Random temporal subsamples calibrate a Shewhart control chart for detecting changes in regression coefficients. The method achieves lower change-count error than three alternatives when simulated series contain changes, but performs worse when no change occurs. An alliance–conflict application reveals temporal variation hidden by pooled estimates.

## Research Question

When does a regression relationship change in time-series cross-sectional data, and how can genuine shifts be distinguished from noisy coefficient estimates?

## Motivation

A pooled coefficient can obscure changing relationships. Detecting an unknown number of breaks requires guarding against both overfitting fluctuations and missing real shifts through overly strict penalties.

## Contributions

- Calibrates the width of a monitoring region from randomly selected time periods before scanning ordered coefficient estimates.
- Incorporates estimated coefficient sampling distributions into a threshold-based change signal.
- Compares change-count accuracy and detection delay, then reexamines defensive alliances and militarized interstate disputes.

## Method

Fit varying-coefficient generalized linear models, with link function satisfying $g(\mu_{it})=X_{it}\beta_t$. For each of $L$ calibration iterations, select $J$ time periods without replacement, extract all observations in those periods, and fit the coefficient of interest. The standard deviation $\sigma$ across these estimates determines the monitoring width.

Initialize the tolerance region at the first coefficient estimate, $\mathcal R=\hat\beta_1\pm3\sigma$. At subsequent times, calculate the estimated sampling-distribution mass beyond the relevant boundary, in the direction of the coefficient's displacement. Following the prose in §2.1, signal a change when that mass exceeds $\rho$ (default 0.5), and recenter the region at the newly flagged estimate while preserving its width. This is a monitoring score derived from sampling uncertainty, rather than a Bayesian posterior over segmentations.

The authors describe temporal subsampling as permutation inference. It calibrates stable variation by mixing time periods; it is distinct from an ordinary label-permutation rank test. CUSUM and exponentially weighted moving-average charts are suggested as alternatives for small or gradual changes.

## Experiments

**Change-count simulation (§3, Table 1).** Linear-model simulations vary the number, locations, and magnitudes of coefficient shifts and within-regime variability. The metric is root mean squared error in the estimated number of changes.

| Method | Zero changes | One change | Three changes | Six changes |
| --- | ---: | ---: | ---: | ---: |
| Proposed Shewhart chart | 1.28 | 0.71 | 1.86 | 4.32 |
| Bayesian changepoint | 1.25 | 1.18 | 2.27 | 4.85 |
| Penalized changepoint | 0.06 | 0.81 | 2.38 | 5.12 |
| CUSUM | 0.00 | 1.00 | 3.00 | 6.00 |

The proposed method has the lowest reported RMSE for each of one through six true changes, but not zero. All methods become less accurate as the number of changes grows.

**Detection delay (Table 2).** Across 10,000 single-change simulations, the proposed chart misses 3,336 changes versus 6,081 for Bayesian changepoint analysis. Conditional on detection, mean delays are 4.45 and 6.21 periods, respectively; both medians are two. These conditional delays exclude undetected changes.

**Alliances and conflict (§4).** Reanalysis of Leeds (2003), covering 1816–1944, fits models in rolling twenty-year subsets advanced one year at a time. Defensive alliances show a stronger negative association with dispute initiation during the Concert of Europe than the pooled estimate suggests, weakening around the world-war era. Historical explanations for detected shifts are proposed rather than causally established.

## Limitations

The method requires underlying observations to refit models on random temporal subsets; a coefficient series alone is insufficient. Highly dynamic series remain difficult, and the no-change simulations expose false-positive behavior. Data-driven width calibration still leaves choices of subsample size, control-chart multiplier, and probability threshold.

The supplied text's monitoring pseudocode conflicts with its prose about inside-region probability and change labeling; the method description above follows the prose and Figure 1. The application lists a 1897–1907 interval among purported twenty-year windows, so that interval should not be silently treated as a verified twenty-year range. Footnote markers are present without their explanatory text in the supplied Markdown.

## Related Concepts

- [[concepts/shewhart-control-charts|Shewhart Control Charts]]: supplies the fixed-width monitoring and recentering mechanism.
- [[concepts/permutation-based-null-calibration|Permutation-Based Null Calibration]]: related reference-distribution strategy, with a different temporal subsampling construction here.
- [[concepts/regularized-change-point-regression|Regularized Change-Point Regression]]: jointly estimates regimes and shrinks coefficients, whereas this method monitors separately fitted estimates.

## Related Papers

- [[papers/change-point-detection-and-regularization-in-time-series-cross-sectional-data-analysis|Change-Point Detection and Regularization in Time Series Cross-Sectional Data Analysis]]: complementary approach to temporal coefficient heterogeneity through joint Bayesian segmentation and regularization.
- Leeds (2003), “Do Alliances Deter Aggression? The Influence of Military Alliances on the Initiation of Militarized Interstate Disputes”: empirical study reanalyzed here.
- Erdman and Emerson (2007), “bcp: An R Package for Performing a Bayesian Analysis of Change Point Problems”: Bayesian comparison method.

Published in *Political Analysis* 30, 167–178 (2022); first published online 5 January 2021. [Article](https://doi.org/10.1017/pan.2020.44). [Replication code](https://doi.org/10.24433/CO.5350515.v1). [Replication data](https://doi.org/10.7910/DVN/NS91FD).
