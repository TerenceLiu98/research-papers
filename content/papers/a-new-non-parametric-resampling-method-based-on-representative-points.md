---
title: "A New Non-parametric Resampling Method Based on Representative Points"
type: paper
authors:
  - Sirao Wang
  - Yinan Li
  - Kai-Tai Fang
  - Pingan He
  - Huajun Ye
year: 2026
doi: "10.1080/03610918.2026.2718842"
tags:
  - representative-points
  - bootstrap
  - kernel-density-estimation
  - statistical-inference
---

## TL;DR

The paper fits a kernel density estimate (KDE), discretizes it with minimum-mean-squared-error [[concepts/representative-points|Representative Points]], and resamples from their weighted distribution to form percentile confidence intervals. Simulations often improve coverage over ordinary nonparametric bootstrap methods, especially with small samples, but variance undercoverage and median overcoverage remain. The authors explicitly leave the theoretical connection between KDE-derived points and points of the true population unresolved.

Published online in *Communications in Statistics - Simulation and Computation* on 27 August 2026. DOI: [10.1080/03610918.2026.2718842](https://doi.org/10.1080/03610918.2026.2718842).

## Research Question

Can representative-point resampling improve confidence intervals for a population's mean, variance, and median without specifying a parametric distribution family?

## Motivation

Small empirical distributions can poorly represent the population, while parametric bootstrap methods depend on the chosen family. Earlier representative-point resampling in [[papers/the-resampling-method-via-representative-points|The Resampling Method via Representative Points]] uses a specified location-scale family. This paper substitutes a smooth density fitted from the observations, then constructs weighted support points from that density. Unlike direct smoothed bootstrapping, its resampling law is discrete.

## Contributions

- Combines Gaussian KDE with MSE-optimal quantization to construct a nonparametric resampling distribution.
- Describes univariate numerical construction using empirical-quantile initialization and Newton or Broyden solvers for the centroid equations.
- Presents KDE consistency results alongside previously established RP moment and sampling-distribution convergence results, with a stated gap between the two components.
- Compares six resampling procedures for mean, variance, and median intervals and illustrates them with two small real datasets.

## Method

For independent, identically distributed observations, estimate the density as

$$
f_h(x)=\frac{1}{nh}\sum_{j=1}^n K\!\left(\frac{x-x_j}{h}\right),
\qquad h=0.9\min(s,\operatorname{IQR}/1.34)n^{-1/5},
$$

where $K$ is the standard Gaussian density and $s$ is the sample standard deviation. The bandwidth is a practical default rather than an essential restriction (Section 2.1).

Choose ordered support points $y_1,\ldots,y_k$ to minimize

$$
\int \min_i(x-y_i)^2 f_h(x)\,dx.
$$

Midpoints between adjacent support values define Voronoi cells $V_i$. The centroid equations and weights are

$$
y_i=\frac{\int_{V_i}xf_h(x)\,dx}{\int_{V_i}f_h(x)\,dx},
\qquad p_i=\int_{V_i}f_h(x)\,dx.
$$

Resample from $\sum_i p_i\delta_{y_i}$, compute the statistic in each replicate, and take its empirical 2.5th and 97.5th percentiles for a 95% interval. The experiments set $k=n$; the algorithm's notation also uses $k$ for the resample size. Cell-integral evaluations cost approximately $O(kn)$ per solver iteration, so the stated linear dependence on $n$ applies when $k$ is fixed (Sections 2.2-2.3).

The KDE assumptions include a twice continuously differentiable population density with bounded second derivative, a bounded symmetric kernel with finite second moment, $h_n\to0$, and $nh_n\to\infty$. Strong uniform consistency requires additional conditions. The RP moment results require finite moments of order $r+\epsilon$ for $r\geq3$; the stated mean-and-variance sampling-distribution result assumes $E|X|^{6+\epsilon}<\infty$. Section 2.4 attributes the RP proofs to Xu et al. (2024) and stresses that KDE consistency does not establish these moment conditions. Median asymptotics are deferred.

## Experiments

The simulation uses $n\in\{10,20,30,50\}$, 1,000 original samples per setting, and 1,000 resamples per confidence interval. The complete experiment is repeated ten times. Tables 3-4 cover normal, gamma, Weibull, Gumbel, and two-component normal-mixture distributions; Appendix A also displays exponential cases. Competitors are nonparametric percentile, basic, and BCa bootstrap, parametric percentile bootstrap, and parametric RP resampling.

Selected empirical coverages for nominal 95% intervals illustrate both gains and exceptions (Tables 3-4):

| Distribution and target | $n$ | Proposed RP | Nonparametric percentile | Nonparametric BCa | Parametric percentile |
| --- | --- | --- | --- | --- | --- |
| Standard normal mean | 10 | 0.938 | 0.905 | 0.904 | 0.907 |
| Standard normal variance | 10 | 0.884 | 0.767 | 0.819 | 0.836 |
| Gamma $Ga(1,0.5)$ variance | 50 | 0.818 | 0.727 | 0.806 | 0.947 |
| Gamma $Ga(2,0.5)$ median | 30 | 0.985 | 0.962 | 0.959 | 0.977 |

The proposed method frequently improves coverage relative to the empirical bootstrap, but higher coverage is not always closer to 0.95. Parametric methods can be substantially better for variance estimation. The authors describe additional, untabulated experiments finding slightly wider RP intervals and modestly increased squared bias for the nonparametric RP median.

The real-data examples use 15 electronic-product failure times and ramus bone lengths for 20 boys at age nine. Exponential and normal models respectively provide parametric benchmarks. Table 5 gives proposed mean intervals of $[0.481,1.917]$ and $[49.299,51.722]$, and variance intervals of $[0.277,3.923]$ and $[4.490,12.836]$. These are illustrative interval comparisons, not measurements of repeated-sample coverage; the table alone does not substantiate the prose's claim of greater resampling stability.

## Limitations

- **Incomplete combined theory:** Section 5 explicitly acknowledges that the connection between the KDE construction and RPs of the true distribution remains unproved. The separate consistency results should not be read as a complete justification of the fitted procedure.
- **Limited inferential scope:** The theory addresses moment statistics under strong integrability assumptions. Median results are empirical, and multivariate guarantees and efficient computation remain future work.
- **Nonuniform coverage:** Variance intervals can remain far below nominal coverage, while median intervals can overcover. The study does not establish universal superiority over parametric or nonparametric alternatives.
- **Tuning and computation:** The experiments fix $k=n$ and use one kernel and a default bandwidth. Systematic finite-sample selection of $k$, bandwidth sensitivity, and runtime comparisons are not supplied.
- **Incomplete efficiency evidence:** Interval-width and squared-bias comparisons are described without numerical tables. Coverage gains alone cannot establish an overall efficiency advantage.

## Related Concepts

- [[concepts/representative-points|Representative Points]]: weighted quantization of the fitted density supplies the resampling support.
- Kernel density estimation
- Smoothed bootstrap
- Percentile confidence intervals

## Related Papers

- [[papers/the-resampling-method-via-representative-points|The Resampling Method via Representative Points]]: supplies the earlier parametric construction and RP convergence results.
- [[papers/a-review-of-representative-points-of-statistical-distributions-and-their-applications|A Review of Representative Points of Statistical Distributions and Their Applications]]: surveys RP criteria, algorithms, and inference applications.
- Chakraborty, Roychowdhury, and Sifuentes (2021), "High Precision Numerical Computation of Principal Points for Univariate Distributions": numerical construction used here.
- Silverman and Young (1987), "The Bootstrap: To Smooth or Not to Smooth?": cited background on smoothed resampling.

[[index|Library home]]
