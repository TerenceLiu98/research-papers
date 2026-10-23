---
title: Optimal Transport Warping
type: concept
aliases:
  - OTW
tags:
  - time-series
  - optimal-transport
  - sequence-alignment
  - distance-based-learning
---

## Overview

Optimal Transport Warping (OTW) is a linear-time distance for one-dimensional time series. It compares local cumulative mass rather than searching over dynamic alignment paths, combining the measure geometry of [[concepts/optimal-transport|Optimal Transport]] with tunable sensitivity to temporal displacement. A smooth form is differentiable and consists of operations that can run in parallel on GPUs.

## Key Ideas

- **Cumulative-mass comparison.** For nonnegative series, OTW sums absolute differences between their cumulative sums. A separate waste-cost term penalizes unequal total mass, following a sink-based [[concepts/unbalanced-optimal-transport|Unbalanced Optimal Transport]] construction.
- **Linear computation.** Cumulative sums and elementwise losses require $O(n)$ time and space for series of length $n$. This avoids the $O(n^2)$ alignment table used by exact [[concepts/dynamic-time-warping|Dynamic Time Warping]].
- **Locality interpolation.** A window width $s$ replaces full cumulative sums with local cumulative sums. With waste cost one, $s=1$ gives entrywise $\ell_1$ distance and $s=n$ gives global OTW.
- **Differentiable variant.** Replacing absolute values with a smooth $\ell_1$ loss makes OTW suitable for gradient-based learning. An OTW neural feature layer measures distance to learned templates while retaining linear complexity in template length.
- **Signed signals.** Negative values can be handled either by applying the algebraic formula directly or by separately comparing positive and negative parts. These alternatives encode different assumptions and are selected empirically.
- **Scope of the geometry.** OTW is most natural when series values behave like mass or intensity. It is less appropriate for motion trajectories whose values represent changing positions, and the original formulation is limited to univariate series.

## Important Papers

- [[papers/otw-optimal-transport-warping-for-time-series|OTW: Optimal Transport Warping for Time Series]] (Latorre et al., 2023): introduces OTW, its local and smooth variants, linear-time neural layer, and UCR evaluations.
- Vallender (1974), "Calculation of the Wasserstein Distance Between Probability Distributions on the Line": establishes the cumulative-distribution expression used for one-dimensional transport.
- Cuturi and Blondel (2017), "Soft-DTW: a Differentiable Loss Function for Time-Series": a differentiable quadratic-time alignment alternative.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]: the underlying comparison of distributions through mass movement.
- [[concepts/unbalanced-optimal-transport|Unbalanced Optimal Transport]]: permits unequal mass totals, represented in OTW by a waste penalty.
- [[concepts/dynamic-time-warping|Dynamic Time Warping]]: uses explicit monotone alignment paths and offers a different invariance-computation tradeoff.
