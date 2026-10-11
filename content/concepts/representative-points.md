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

Representative points are finite support values used to approximate a population distribution by a discrete distribution. The construction criterion matters: Monte Carlo points use random draws, quasi-Monte Carlo points target low discrepancy, and minimum-mean-squared-error (MSE) points minimize expected squared nearest-point distance. The MSE construction is also called principal points or optimal quantization; its weights are the probabilities of the points' nearest-neighbor regions.

## Key Ideas

- Monte Carlo and quasi-Monte Carlo approximations generally assign equal weights. MSE-RPs instead minimize $E[\min_i\|X-a_i\|^2]$ and assign each point the probability mass of its Voronoi region. Low discrepancy and low quantization error are distinct objectives.
- Minimum-mean-squared-error representative points are self-consistent: each point is the conditional mean of the observations assigned to its region.
- With finite second moments, the MSE-induced discrete distribution has the same mean as the source distribution but smaller variance. In one dimension the variance gap equals the mean squared quantization error; in multiple dimensions the identity uses covariance traces.
- As $k$ grows, the MSE approximation converges to the source variable in mean square and hence in distribution. Higher-moment convergence needs corresponding integrability conditions.
- Conditional-mean iteration and sample-based k-means offer practical constructions, but self-consistency is necessary rather than sufficient for global MSE optimality. Initialization and the accuracy of the training distribution matter.
- For elliptically symmetric populations, optimal points have a connection to leading principal-component subspaces. Rotation symmetry can make optimal configurations nonunique.
- No construction dominates for every target: the review by Fang and Pan reports an arcsine-distribution example in which QMC points match the first four population moments, despite MSE points performing better in other examples.
- Representative points provide a compact, weighted alternative to empirical support points for simulation and resampling. Their statistical benefit depends on how they are obtained: when the population is unknown, estimating them typically introduces distributional assumptions or an additional fitting procedure.

## Important Papers

- [[A Review of Representative Points of Statistical Distributions and Their Applications]]: surveys MC, QMC, and MSE constructions, their algorithms, and statistical applications.
- [[The Resampling Method via Representative Points]]
- Flury (1990), "Principal Points."
- Graf and Luschgy (2007), "Foundations of Quantization for Probability Distributions."
- Fang, Zhou, and Wang (2014), "Applications of the Representative Points in Statistical Simulations."

## Related Concepts

- Vector quantization
- Voronoi partitioning
- Discrete distribution approximation
- Bootstrap resampling
