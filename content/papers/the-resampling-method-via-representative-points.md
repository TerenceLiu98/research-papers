---
title: "The Resampling Method via Representative Points"
type: paper
authors:
  - Long Hao Xu
  - Yinan Li
  - Kai Tai Fang
year: 2024
tags:
  - representative-points
  - resampling
  - bootstrap
  - statistical-inference
  - quantization
---

## TL;DR

The paper replaces the empirical distribution used by the nonparametric bootstrap with a discrete distribution supported on [[Representative Points]] that minimize mean squared quantization error. It proves moment and sampling-distribution convergence for the sample mean and variance, then reports confidence intervals that are generally closer to nominal coverage than the compared bootstrap intervals, especially for small samples from skewed distributions. These gains rely on a specified location-scale family and stronger moment conditions than the classical bootstrap.

## Research Question

Can a discrete approximation built from minimum-mean-squared-error representative points provide a consistent resampling distribution, and can an estimated version improve confidence intervals for population means and variances relative to the nonparametric bootstrap?

## Motivation

The bootstrap plugs the empirical distribution into a statistic's sampling law, but the empirical distribution is only one possible approximation to the population. A fixed set of representative points compresses a continuous distribution while minimizing expected squared distance. Because its induced discrete distribution preserves the population mean and approaches the population in mean square as the number of points grows, it provides a structured alternative resampling source.

## Contributions

- Establishes convergence of expectations for bounded continuous functions and, under an additional moment condition, convergence of higher raw and absolute central moments of the representative-point distribution.
- Proves consistency of representative-point resampling for sample means under both Mallows-Wasserstein and Kolmogorov metrics and for sample variances under the Kolmogorov metric, including bounds tied to quantization error or differences between limiting normal laws.
- Defines an inference procedure for general location-scale families by transforming representative points of a standard distribution with maximum-likelihood parameter estimates, and proves almost-sure consistency for mean and variance sampling distributions.
- Compares confidence intervals from the proposed method with bootstrap-t, percentile bootstrap, bias-corrected percentile bootstrap, and normal approximation procedures.

## Method

For a continuous univariate distribution $F$, the method chooses $k$ ordered points that minimize the expected squared distance from a draw $X \sim F$ to its nearest point. Their Voronoi regions determine the support probabilities of a discrete distribution $F_{mse,k}$. Self-consistency makes each support point the conditional mean of its region. Consequently, $F_{mse,k}$ has the same mean as $F$, has smaller variance, and converges to $F$ in mean square as $k$ increases.

When $F$ is known, the sampling distribution of a statistic based on $n$ draws from $F$ is approximated by drawing $n$ observations from $F_{mse,k}$. The paper proves that higher moments of this approximation converge when $E|X|^{r+\epsilon}$ is finite. For the sample mean, the Mallows-Wasserstein distance between the two sampling distributions is bounded by the square root of the representative points' mean squared error for every $n$; Kolmogorov consistency follows as both $n$ and $k$ grow. Analogous Kolmogorov consistency is established for the sample variance.

For inference from data, the paper assumes $X$ is a linear transformation of a standard variable $Z$, covering location, scale, and location-scale families. Representative points and their probabilities are computed for the standard family, transformed using maximum-likelihood estimates of the unknown scale and location, and used as the support of the resampling distribution. The proposed procedure sets the number of representative points to the observed sample size, resamples studentized statistics, and uses their empirical quantiles to form confidence intervals.

## Experiments

The simulation study uses normal, exponential, and Weibull populations with scale 1 and location 0 where applicable. For each family and sample size $n \in \{10, 15, 25, 50\}$, the authors generate 10,000 initial samples. Each sampling-distribution approximation uses 5,000 resamples, and intervals are evaluated at 80%, 90%, and 95% nominal coverage using coverage probability and expected length.

For mean intervals, the proposed method is usually near the bootstrap-t result for normal data and is more favorable for the exponential and Weibull cases, particularly at small $n$. With $n=10$ exponential samples and 90% nominal coverage, for example, it reports coverage 0.8961 and expected length 1.3288, compared with 0.8899 and 1.4399 for bootstrap-t.

The differences are larger for variance intervals. Across the reported families, sample sizes, and nominal levels, the proposed intervals are shorter than bootstrap-t intervals and generally have coverage closer to nominal. For $n=10$ exponential samples at 90% nominal coverage, the proposed method reports coverage 0.904 and expected length 7.7720, versus 0.773 and 16.8702 for bootstrap-t; the percentile, bias-corrected percentile, and normal intervals have coverage between 0.560 and 0.583 in that setting.

The real-data example analyzes 15 product lifetimes under an assumed exponential model. Its proposed 90% confidence interval for the mean is $[0.6756, 2.0189]$, with length 1.3433. The bootstrap-t interval is $[0.6841, 2.2275]$, with length 1.5434. The example does not provide repeated-sample coverage because only one observed dataset is available.

## Limitations

The inferential procedure requires a correctly specified general location-scale family and precomputed representative points for its standard member. Its comparison with the nonparametric bootstrap therefore combines a distributional assumption with a change in resampling support; the simulations do not examine model misspecification.

The theory imposes stronger tail conditions than classical bootstrap consistency: a finite $(3+\epsilon)$-order absolute moment for mean inference and a finite $(6+\epsilon)$-order absolute moment for variance inference, compared with second- and fourth-moment conditions cited for the corresponding bootstrap results. Computing representative points can also be costly.

The analysis is restricted to continuous univariate distributions, linear transformations of standard families in the data-driven procedure, and the sample mean and variance. The numerical evaluation covers three distribution families under a limited parameter setting, and the real-data analysis assumes an exponential lifetime distribution from prior experience rather than testing robustness to alternative families.

## Related Concepts

- [[Representative Points]]
- Bootstrap resampling
- Mallows-Wasserstein distance
- Vector quantization

## Related Papers

- Efron (1979), "Bootstrap Methods: Another Look at the Jackknife."
- Bickel and Freedman (1981), "Some Asymptotic Theory for the Bootstrap."
- Fang, Zhou, and Wang (2014), "Applications of the Representative Points in Statistical Simulations."
- Xu, Fang, and He (2022), "Properties and Generation of Representative Points of the Exponential Distribution."
