---
title: Variance-Corrected Squared Euclidean Distance
type: concept
aliases:
  - Debiased Squared Euclidean Distance
definition: "An estimator of squared distance between population vectors that subtracts the summed coordinate estimation variances from the squared norm of their estimated difference."
tags:
  - finite-sample-bias
  - statistical-inference
  - vector-distances
---

## Overview

Estimated vectors differ because of both population differences and sampling noise. Squared Euclidean distance accumulates the variance of that noise across coordinates. Subtracting estimated variances corrects this inflation under appropriate unbiasedness assumptions.

## Key Ideas

For an unbiased vector estimate $\hat\beta$, define

$$
\hat Q=\|\hat\beta\|_2^2-\sum_k\widehat{\operatorname{Var}}(\hat\beta_k).
$$

If the variance estimates are unbiased, then $E\hat Q=\|\beta\|_2^2$. Coordinate independence is not required for this expectation identity. For a difference of two estimated vectors, use the variance of the difference, accounting for their dependence where relevant.

- The correction uses squared standard errors of estimates, not coordinate-level sample variances of individual observations.
- Unequal sample sizes and clustering change uncertainty and therefore the correction needed for fair comparisons.
- Negative estimates are compatible with an unbiased estimator of a nonnegative parameter. Clamping them at zero does not preserve the unbiasedness argument.
- Taking a signed square root produces a different estimator that is not unbiased and can be bimodal near zero.
- Point-estimate correction does not establish confidence-interval validity. Bootstrap and jackknife intervals can over-cover near zero.

## Important Papers

- [[papers/measuring-distances-in-high-dimensional-spaces|Measuring Distances in High Dimensional Spaces]] (Green et al., 2025): Derives the correction and evaluates group-average embeddings and regression coefficients, including clustered observations.

## Related Concepts

- [[concepts/text-embedding-models|Text Embedding Models]]: Averaged text representations are one application of this general correction.
- [[concepts/permutation-based-null-calibration|Permutation-Based Null Calibration]]: Calibrates a null test rather than directly supplying an unbiased population-distance estimate.
