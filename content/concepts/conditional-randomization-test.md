---
title: Conditional Randomization Test
type: concept
aliases:
  - CRT
definition: "A conditional independence test that calibrates a statistic by resampling focal variables from their conditional distribution given the remaining variables while holding outcomes fixed."
tags:
  - randomization-inference
  - conditional-independence
  - causal-inference
---

## Overview

The conditional randomization test evaluates whether Y is independent of X conditional on Z. When the conditional assignment law of X given Z is known, it supports finite-sample valid inference with flexible machine-learning statistics and no requirement to correctly model the outcome distribution.

## Key Ideas

- Resample X from its conditional law, holding Y and Z fixed. Rank the observed statistic against the resampled statistics using the plus-one Monte Carlo p-value correction.
- Under the null, the observed and resampled statistics are exchangeable. The statistic controls sensitivity to alternatives; the resampling law controls calibration.
- Experimental restrictions must be respected. Unconditional shuffling is not a substitute for conditional resampling when attributes are dependent.
- Learned interactions can detect departures obscured by averaging. A rejection does not estimate effect magnitude or establish which interaction is responsible.
- Selected-level tests can condition additionally on a coarsened version of X. Respondent covariates can also enter the conditioning set.
- A known experimental assignment law makes this approach particularly useful in conjoint studies; validity should not be presumed when that law is misspecified.

## Important Papers

- [[papers/using-machine-learning-to-test-causal-hypotheses-in-conjoint-analysis|Using Machine Learning to Test Causal Hypotheses in Conjoint Analysis]]: develops causal-null, selected-level, and regularity tests for conjoint experiments using hierarchical interaction statistics.

## Related Concepts

- [[concepts/population-average-marginal-component-effect|Population Average Marginal Component Effect]]: summarizes average causal contrasts over a target profile distribution, whereas CRTs can test broader attribute relevance.
