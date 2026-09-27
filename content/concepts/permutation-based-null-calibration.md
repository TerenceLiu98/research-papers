---
title: Permutation-Based Null Calibration
type: concept
aliases:
  - Permutation Null Calibration
tags:
  - permutation-tests
  - distribution-testing
  - statistical-inference
  - finite-sample-bias
---

## Overview

Permutation-based null calibration compares an observed statistic with the reference distribution obtained by reassigning labels under a specified null hypothesis. In a two-sample distributional comparison, it retains the pooled observations and original group sizes. Its finite-sample validity depends on exchangeability of the allowed assignments. This is especially useful for nonnegative distances whose empirical values can be positive even when population distance is zero.

## Key Ideas

- **Match the design:** For independent samples under an equality null, shuffle labels while preserving sizes $n$ and $m$. Dependence, clustering, or repeated measurements requires a justified assignment scheme; arbitrary observation-level shuffling is not automatically valid.
- **Calibrate the statistic:** For a distance $T$ and $B$ random permutations, use $p=(1+\sum_{b=1}^{B}\mathbf1\{T_b\ge T_{\mathrm{obs}}\})/(B+1)$. Exchangeability gives the rank argument for Type I error control, with ties potentially making the test conservative.
- **Keep the target conditional:** The reference distribution holds the realized pooled support and frequencies fixed. It does not capture all uncertainty from collecting a new sample, nor the sampling law under unequal populations.
- **Separate testing and estimation:** For [[concepts/optimal-transport|Optimal Transport]], subtracting the mean permuted distance and clamping at zero gives a descriptive excess EMD. It does not generally yield an unbiased population distance or justify ordinary two-sided confidence intervals.
- **Distinguish resampling targets:** Separate within-group bootstrapping preserves observed empirical group differences. Permutation imposes the equality null. A pooled bootstrap also imposes a common empirical distribution, but samples with replacement and needs its own calibration assessment.
- **Check power and support sensitivity:** A valid test can have little power when empirical support is extremely sparse. Rare, isolated points can affect both the observed statistic and its null reference. A large null distance or non-significant result is not evidence of population equivalence.

## Important Papers

- [[papers/the-earth-moves-but-so-does-the-bias-systematic-upward-bias-of-the-wasserstein-earth-movers-distance-and-permutation-based-null-calibration|The Earth Moves, But So Does the Bias]] (Hung, 2026): Applies the framework to empirical Wasserstein distances, with continuous and sparse-profile simulations and an explicit distinction between the p-value and descriptive excess distance.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]: A geometry-sensitive family of statistics to which null calibration can be applied.
