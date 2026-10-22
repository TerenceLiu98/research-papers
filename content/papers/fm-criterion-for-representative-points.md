---
title: "FM-Criterion for Representative Points"
type: paper
authors:
  - Yongdao Zhou
  - Kaitai Fang
year: 2019
doi: "10.1360/SCM-2017-0529"
tags:
  - representative-points
  - discrete-approximation
  - moment-matching
  - distribution-discrepancy
---

## TL;DR

The paper introduces an FM criterion for constructing equal-weight [[concepts/representative-points|Representative Points]] that minimize the integrated squared difference between an empirical CDF and a target CDF while matching the target's first $n-1$ moments. It establishes feasible constructions for several univariate distributions and proposes a quasi-FM criterion when exact moment constraints cannot be met. Numerical comparisons show substantially improved moment matching, although competing point sets can have a smaller CDF objective and the bootstrap advantages narrow as the number of points grows.

Published in *Scientia Sinica Mathematica* 49, 1009 (2019). DOI: [10.1360/SCM-2017-0529](https://doi.org/10.1360/SCM-2017-0529).

## Research Question

Can a finite, equal-weight discrete distribution approximate a continuous distribution in CDF distance while preserving substantially more of its population moments than Monte Carlo, number-theoretic, or minimum-mean-squared-error representative points?

## Motivation

F-discrepancy controls the largest gap between empirical and population CDFs, while MSE representative points minimize expected squared distance to the nearest support point. Neither criterion directly controls differences between sample and population moments. The arcsine distribution provides a motivating example: its midpoint-quantile points reproduce the first $n-1$ moments exactly, suggesting that distributional fit and moment preservation can be optimized together.

## Contributions

- Defines the FM criterion by minimizing integrated squared CDF error subject to equality of the first $n-1$ sample and population moments.
- Gives results and numerical constructions for uniform and power distributions, including scale and monotone-transformation relationships between their representative points.
- Shows that exact moment constraints can be infeasible: for the standard normal distribution they are satisfied for $n\leq4$ but not for $n\geq5$.
- Introduces a quasi-FM criterion that lexicographically minimizes successive moment errors before minimizing the CDF objective within prescribed error tolerances.
- Compares FM, quasi-FM, number-theoretic, MSE, and Monte Carlo points through moment errors and bootstrap summaries.

## Method

For a target CDF $F$ and an equal-weight empirical CDF $F_n$ supported on $n$ points, the FM objective is

$$
O_F=\int_{\mathbb R^s}|F_n(\mathbf x)-F(\mathbf x)|^2\,d\mathbf x,
$$

subject to $E(\xi_j^m)=E(X_j^m)$ for coordinates $j=1,\ldots,s$ and orders $m=1,\ldots,n-1$. In one dimension this becomes a nonlinear constrained optimization over the ordered support points.

For $U(0,1)$, the constraints are $n^{-1}\sum_i x_i^k=1/(k+1)$. The reported solutions are symmetric around $0.5$, and the paper argues that feasible solutions exist. Scaling these points gives solutions for $U(0,a)$. Squaring the uniform points gives the construction studied for the power distribution with CDF $F(x)=\sqrt{x}$ on $[0,1]$.

When the exact constraints are infeasible, the quasi-FM procedure minimizes absolute moment errors in order: it first obtains the smallest first-moment error, then minimizes the second while retaining the earlier optimum within a tolerance, and continues through order $n-1$. The CDF objective is minimized last under those accumulated tolerances. For symmetric standard normal constructions, odd moments vanish automatically, so the numerical optimization focuses on even-moment errors.

## Experiments

For the standard normal distribution, the reported quasi-FM points have lower moment-error vectors in lexicographic order than number-theoretic and MSE points for every tested $n$ from 3 to 10. At $n=6$, for example, the second-moment errors are 0 for quasi-FM, 0.196 for number-theoretic points, and 0.538 for MSE points. This moment advantage does not imply a uniformly smaller CDF objective: at $n=6$, the reported $O_F$ values are 0.012, 0.010, and 0.032, respectively.

The simulation study compares moments for uniform and power distributions at $n\in\{5,10,15,20,25\}$ and runs 1,000 bootstrap resamples for point sets of sizes $8,10,15,20,25$. FM points generally have smaller direct mean, variance, and kurtosis errors than MSE or Monte Carlo points. For bootstrap summaries, FM points generally outperform MSE points at $n=8$, while their performance becomes similar at larger $n$; FM points usually have smaller biases than the selected Monte Carlo points.

## Limitations

- Exact FM feasibility is distribution- and point-count-dependent; the normal example requires the quasi-FM relaxation from $n=5$ onward.
- The multivariate constraints match coordinate-wise marginal moments, not cross-moments or the full dependence structure.
- The quasi-FM result depends on the ordering of moment priorities and on user-chosen tolerances, so it is not a single criterion invariant to those choices.
- The reported points come from nonlinear numerical optimization and retain small search errors. The paper does not provide a general global-optimization guarantee or runtime analysis.
- Comparisons use different objectives and weights: MSE points have Voronoi-cell probabilities, whereas FM, number-theoretic, and Monte Carlo points receive equal weight. No method dominates every reported metric; number-theoretic points sometimes have a smaller $O_F$.
- The Monte Carlo baseline is selected from 1,001 samples by median mean-estimation error, and the empirical comparisons do not report uncertainty across repeated optimization runs.

## Related Concepts

- [[concepts/representative-points|Representative Points]]: the finite-support distribution approximations whose construction criterion is extended here.
- Moment matching: FM constraints preserve raw moments directly rather than relying on quantization error as a proxy.
- Distribution discrepancy: the objective is an integrated squared CDF difference, distinct from the supremum F-discrepancy and nearest-point MSE.

## Related Papers

- [[papers/a-review-of-representative-points-of-statistical-distributions-and-their-applications|A Review of Representative Points of Statistical Distributions and Their Applications]]: places FM points among Monte Carlo, quasi-Monte Carlo, MSE, and other representative-point criteria.
- Fang, Zhou, and Wang (2014), "Applications of the Representative Points in Statistical Simulations": develops applications motivating the present comparison.
- Jiang, He, and Fang (2015), "An Interesting Property of the Arcsine Distribution and Its Applications": supplies the exact moment-matching observation that motivates the FM constraints.
- Flury (1990), "Principal Points": a foundational account of MSE representative points used as a comparator.

[[index|Library home]]
