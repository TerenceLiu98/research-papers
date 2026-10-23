---
title: Meta-Gaussian Distributions
type: concept
aliases:
  - Meta Gaussian distributions
  - Multivariate Gaussian copula models
tags:
  - copulas
  - multivariate-distributions
  - dependence-modeling
---

## Overview

A meta-Gaussian distribution combines arbitrary continuous univariate marginals with dependence specified by a Gaussian copula. If $Z\sim N_p(0,R)$, then

$$
X_i=F_i^{-1}(\Phi(Z_i)),\qquad i=1,\ldots,p,
$$

has marginal CDFs $F_i$ and a Gaussian copula determined by the correlation matrix $R$. This separates marginal shape from dependence and permits mixtures of, for example, normal, exponential, Weibull, or Student-$t$ marginals within one multivariate model.

## Key Ideas

- Sklar's theorem separates a continuous joint distribution into its marginal distributions and a unique copula.
- Coordinatewise strictly increasing transformations change the marginals but preserve the copula. Copula-based concordance and dependence measures are therefore invariant under such transformations.
- The latent Gaussian correlation matrix controls copula dependence, but it need not equal the Pearson correlation matrix of the transformed observed variables.
- Simulation proceeds by drawing a correlated Gaussian vector, applying the standard normal CDF coordinatewise, and then applying each target marginal quantile function.
- Flexible margins do not create Gaussian tail dependence: the dependence structure remains that of the Gaussian copula.

## Important Papers

- Fang, Fang, and Kotz (2002), "The Meta-Elliptical Distributions with Given Marginals": develops the broader meta-elliptical family.
- Kelly and Krzysztofowicz (1997), "A Bivariate Meta-Gaussian Density for Use in Hydrology": applies the construction in hydrological modeling.
- [[papers/a-new-resampling-method-for-meta-gaussian-distributions|A New Resampling Method for Meta Gaussian Distributions]]: constructs MSE representative points for the family and compares them with MC and QMC designs.

## Related Concepts

- [[concepts/representative-points|Representative Points]]: finite discrete approximations that can compactly represent meta-Gaussian distributions.
- [[concepts/k-means-clustering|K-Means Clustering]]: an empirical quantization method used to compute MSE representative points.
- Copulas
- Quasi-Monte Carlo methods
- Meta-elliptical distributions
