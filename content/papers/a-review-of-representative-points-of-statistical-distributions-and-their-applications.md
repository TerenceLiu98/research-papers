---
title: "A Review of Representative Points of Statistical Distributions and Their Applications"
type: paper
authors:
  - Kai-Tai Fang
  - Jianxin Pan
year: 2023
doi: "10.3390/math11132930"
tags:
  - representative-points
  - discrete-approximation
  - quasi-monte-carlo
  - quantization
  - statistical-inference
---

## TL;DR

This review organizes [[Representative Points]] into Monte Carlo, quasi-Monte Carlo, and minimum-mean-squared-error constructions. It connects distribution approximation, optimal quantization, and resampling through their theory, algorithms, and applications. Reported examples favor structured points over random support, but the best criterion depends on the distribution and inferential target, and iterative construction need not find a global optimum.

Published in *Mathematics* 11, article 2930 (29 June 2023). DOI: [10.3390/math11132930](https://doi.org/10.3390/math11132930).

## Research Question

How should a finite discrete distribution approximate a continuous population, and what do different choices of support points and weights imply for statistical simulation, resampling, and numerical computation?

## Motivation

An empirical distribution is one possible discrete approximation, but a small random sample may represent the population unevenly. Choosing support points by a discrepancy or quantization criterion offers alternatives. The review brings together work otherwise dispersed across statistics, number-theoretic integration, clustering, and signal quantization, with particular attention to statistical inference.

## Contributions

- Synthesizes three main RP constructions and briefly discusses alternatives based on moment criteria, energy distance, and divergence.
- Reviews MSE-RP properties: self-consistency, mean preservation, variance loss, convergence, uniqueness conditions, and tail-dependent spacing of extreme points.
- Compares univariate construction through special analytic solutions, conditional-mean iteration, and nonlinear equations; extends the discussion to multivariate distributions and QMC-assisted clustering.
- Collects resampling consistency results and applications to moment and density estimation, confidence intervals, normality testing, and geometric probability. These are reviewed results from cited studies rather than a single new benchmark.

## Method

### Approximation Criteria

Monte Carlo RPs use random draws with equal mass. QMC RPs use low-discrepancy points, often mapped from a unit hypercube to the target distribution, also with equal mass. MSE-RPs instead minimize the expected squared nearest-point distance:

$$
Q_k=\min_{\xi_1,\ldots,\xi_k} E\!\left[\min_j\|X-\xi_j\|^2\right].
$$

For MSE-RPs, the nearest-point Voronoi cells $S_j$ determine weights $p_j=P(X\in S_j)$. Each point satisfies $\xi_j=E[X\mid X\in S_j]$. With finite second moments, the induced discrete variable $Y_k$ preserves the mean; in one dimension, $\operatorname{Var}(X)-\operatorname{Var}(Y_k)=Q_k$. In multiple dimensions, the analogous identity uses covariance traces (Sections 1, 2, and 5).

### Construction and Geometry

Conditional-mean iteration alternates Voronoi assignments and centroid updates. Its fixed points are self-consistent, which alone does not establish global MSE optimality. Nonlinear-equation methods can yield accurate univariate solutions but become computationally expensive as the number of points increases. Multivariate LBG clustering uses a large training sample; NTLBG replaces random training and initial points with quasirandom points (Sections 3 and 6).

For elliptically symmetric distributions, the reviewed principal-subspace theorem relates the span of optimal points to leading covariance eigenvectors. Spherical symmetry can produce multiple equally optimal configurations by rotation. Uniqueness is therefore not a general property of multivariate RPs (Section 5).

### Resampling Guarantees

Section 4 reviews [[The Resampling Method via Representative Points]], cited there as a submitted manuscript. For centered, scaled sample means, the Mallows-Wasserstein distance between sampling laws under the population and its MSE approximation is bounded by $\sqrt{Q_k}$ for every sample size $n$. The stated Kolmogorov consistency takes both $n$ and $k$ to infinity. Continuous bounded functions have convergent expectations, while the reviewed higher-moment result assumes $E|X|^{r+\epsilon}<\infty$ for $r\geq3$ and some $\epsilon>0$. Increasing the resample size alone does not remove finite-support approximation error.

## Experiments

The review reproduces a density-approximation comparison from Li et al. (2022) for the mixture $0.6N(-8,3^2)+0.4N(3,4^2)$. Revised Monte Carlo (RMC) retains random support locations but weights them by their Voronoi-cell probabilities. Table 4 reports the following $L_2$ distances between the population density and the approximate densities; lower is better.

| Number of points $k$ | MC | RMC | QMC | MSE |
| --- | --- | --- | --- | --- |
| 15 | 0.0676 | 0.0453 | 0.0171 | 0.0151 |
| 30 | 0.0674 | 0.0316 | 0.0129 | 0.0126 |
| 35 | 0.0615 | 0.0284 | 0.0124 | 0.0122 |

MSE has the smallest reported distance in these three settings, with QMC close behind. The prose around Figure 1 says $k=15$, while its caption says $k=31$; the table above retains Table 4's own labels rather than inferring a figure setting.

Other examples are summarized from prior work: improved moment estimation and confidence intervals in selected distributions, RP-based multivariate normality tests, and geometric simulations involving intersecting circles and belts covering a sphere. Section 7 also reports an instructive exception to an MSE-first ranking: QMC points for the arcsine distribution reproduce its mean, variance, skewness, and kurtosis.

## Limitations

- This is a selective review. Most application claims summarize cited studies without a common experimental protocol, uncertainty estimates, or a comprehensive runtime comparison.
- Minimizing squared quantization error does not guarantee the best approximation for every functional. The arcsine example illustrates dependence on the evaluation criterion.
- MSE constructions require finite second moments; stronger moment convergence needs additional tail assumptions. Iterative methods depend on initialization, may stop at local optima, and can require large training sets or expensive integration.
- Results for a known population do not by themselves settle inference when that population must be estimated from data. Distribution fitting and construction costs remain relevant.
- The supplied text contains inconsistent mathematical expressions, including an MSE definition missing its probability measure and a multivariate CDF factorization. This page uses the expectation formulation corroborated by the later weighted MSE expressions and avoids relying on the inconsistent formulas. The authors also identify theoretical and application gaps for newer RP criteria.

## Related Concepts

- [[Representative Points]]: the common framework, including the distinctions between discrepancy-based and MSE-based constructions.
- [[Uniform Design Subsampling]]: a related use of low-discrepancy designs to represent a distribution with fewer points; selection of observed records differs from constructing synthetic weighted support.

## Related Papers

- [[The Resampling Method via Representative Points]]: develops the resampling theory reviewed in Section 4; the review lists its 2023 submitted version.
- Li, Fang, He, and Peng (2022), "Representative Points from a Mixture of Two Normal Distributions": source of the reproduced density comparison.
- Yang, He, and Fang (2021), "Three Kinds of Discrete Approximations of Statistical Multivariate Distributions and Their Applications": multivariate constructions and comparisons discussed in the review.
- Tarpey, Li, and Flury (1995), "Principal Points and Self-Consistent Points of Elliptical Distributions": principal-subspace results reviewed in Section 5.

[[index|Library home]]
