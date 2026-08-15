---
title: Representative Points
type: concept
aliases:
  - Principal Points
  - Optimal Quantizers
  - RPs
tags:
  - quantization
  - discrete-approximation
  - statistical-inference
  - resampling
---

## Overview

Representative points are a finite set of support values chosen to minimize the expected squared distance from a random variable to its nearest support value. Also called principal points or optimal quantizers, they turn a continuous distribution into a discrete approximation whose masses are the probabilities of the support points' nearest-neighbor regions.

## Key Ideas

- A set of $k$ representative points minimizes $E[\min_i (X-a_i)^2]$. The points partition the distribution's domain into Voronoi regions, and each point receives the probability mass of its region.
- Minimum-mean-squared-error representative points are self-consistent: each point is the conditional mean of the observations assigned to its region.
- The induced discrete distribution has the same mean as the source distribution but smaller variance. The variance gap equals the mean squared quantization error.
- As $k$ grows, the discrete approximation converges to the source variable in mean square and hence in distribution. Higher-moment convergence needs corresponding integrability conditions.
- Representative points provide a compact, weighted alternative to empirical support points for simulation and resampling. Their statistical benefit depends on how they are obtained: when the population is unknown, estimating them typically introduces distributional assumptions or an additional fitting procedure.

## Important Papers

- [[The Resampling Method via Representative Points]]
- Flury (1990), "Principal Points."
- Graf and Luschgy (2007), "Foundations of Quantization for Probability Distributions."
- Fang, Zhou, and Wang (2014), "Applications of the Representative Points in Statistical Simulations."

## Related Concepts

- Vector quantization
- Voronoi partitioning
- Discrete distribution approximation
- Bootstrap resampling
