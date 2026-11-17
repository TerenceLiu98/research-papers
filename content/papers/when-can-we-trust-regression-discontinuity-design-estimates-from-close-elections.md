---
title: "When Can We Trust Regression Discontinuity Design Estimates from Close Elections? Evidence from Experimental Benchmarks"
type: paper
authors:
  - Leandro De Magalhães
  - Dominik Hangartner
  - Salomo Hirvonen
  - Jaakko Meriläinen
  - Nelson A. Ruiz
  - Janne Tukiainen
year: 2025
tags:
  - causal-inference
  - regression-discontinuity
  - elections
---

## TL;DR

Random tie-breaking lotteries in Colombian and Finnish local elections provide experimental benchmarks for close-election regression discontinuity designs (RDDs). Implementation choices matter little when the conditional expectation function is approximately linear near the cutoff. With curvature, robust bias-corrected inference and coverage-error-rate-optimal bandwidths generally align better with the benchmarks; conventional estimates can suggest an incumbency advantage absent from the lottery estimates.

## Research Question

Which combinations of polynomial order, bandwidth selection, and statistical inference recover experimental effects of winning office on subsequent candidacy and election?

## Motivation

RDD identification does not ensure accurate finite-sample approximation near a cutoff. Bandwidths optimized for point estimation need not deliver accurate confidence intervals. The authors' review of 68 political-science articles from 2016–2022 finds conventional inference in roughly three quarters, while only 31% report robust inference.

## Contributions

- Uses randomized electoral ties to benchmark estimates at the same electoral threshold, within the same institutional settings.
- Compares linear and quadratic specifications, MSE- and CER-optimal bandwidths, and conventional versus robust inference.
- Connects implementation sensitivity to curvature near the cutoff across two outcomes and two main country samples.

## Method

Colombia's 2003–2015 and Finland's 1996–2012 local elections supply 147,558 and 154,543 candidate-election observations. Lottery benchmark samples contain 463 and 1,351 observations, respectively. Eligible lists nominate at least two candidates and elect at least one but not all candidates.

Lottery-sample OLS regresses next-election participation or election on current election. Re-election is not conditioned on running again, since participation can respond to treatment. Inference and bandwidth selection cluster at the municipality level.

The RDD running variable compares an elected candidate's within-party vote share with the first unelected candidate's share; for unelected candidates it compares their share with the last elected candidate's share. Eight implementations combine two polynomial orders, two bandwidth objectives, and two inference approaches. Robust inference subtracts estimated smoothing bias and accounts for uncertainty in that estimate. Main and bias bandwidths are equal. This connects [[concepts/regression-discontinuity-design|Regression Discontinuity Design]] to the measurement problem in [[concepts/electoral-closeness-in-proportional-representation|Electoral Closeness in Proportional Representation]].

## Experiments

Selected Table 1 estimates below are probability changes, with 95% confidence intervals. RDD entries use local linear specifications.

| Outcome and country | Lottery | Conventional, MSE bandwidth | Robust, CER bandwidth |
|---|---|---|---|
| Re-running, Colombia | 0.141 [0.055, 0.228] | 0.199 [0.178, 0.220] | 0.189 [0.154, 0.225] |
| Re-running, Finland | 0.011 [-0.040, 0.062] | 0.027 [0.004, 0.049] | -0.024 [-0.063, 0.015] |
| Re-election, Colombia | -0.030 [-0.097, 0.037] | 0.052 [0.034, 0.069] | 0.037 [0.004, 0.070] |
| Re-election, Finland | 0.004 [-0.044, 0.053] | 0.070 [0.048, 0.092] | -0.010 [-0.059, 0.039] |

Re-running estimates broadly agree with the experimental benchmarks. Re-election exhibits greater implementation sensitivity, especially in Finland, where curvature complicates local approximation. Robust CER inference improves agreement but does not eliminate every discrepancy: Colombia's robust linear CER interval still excludes zero. Applying CER bandwidths to conventional inference alone does not resolve the problem, because those bandwidths are optimized for bias-corrected inference.

The discussion reports supplementary analyses of Brazil and Denmark, with smaller personal-incumbency estimates under robust inference. These are not presented as additional lottery benchmarks. Replication data and code are identified in the supplied text by DOI `10.7910/DVN/XDVIBG`.

## Limitations

- Evidence concerns local effects at electoral boundaries in the studied proportional-representation settings, not average effects for all incumbents.
- Experimental estimates have sampling uncertainty; agreement with a benchmark is not direct measurement of repeated-sampling confidence-interval coverage.
- Curvature is a proposed explanation for implementation differences, not an experimentally isolated mechanism.
- The supplied Markdown contains a damaged table note and omits referenced supplementary details; the summary relies on readable main-text and table evidence.

## Related Concepts

- [[concepts/regression-discontinuity-design|Regression Discontinuity Design]]: threshold identification must be paired with suitable local approximation and inference.
- [[concepts/electoral-closeness-in-proportional-representation|Electoral Closeness in Proportional Representation]]: defines electoral distances used to compare marginal winners and losers.

## Related Papers

- Hyytinen et al. (2018), *When Does Regression Discontinuity Design Work? Evidence from Random Election Outcomes*: the lottery-benchmark approach extended here.
- Calonico, Cattaneo, and Titiunik (2014), *Robust Nonparametric Confidence Intervals for Regression-Discontinuity Designs*: the robust inference method evaluated.
- Calonico, Cattaneo, and Farrell (2020), *Optimal Bandwidth Choice for Robust Bias-Corrected Inference in Regression Discontinuity Designs*: the CER bandwidth approach evaluated.
