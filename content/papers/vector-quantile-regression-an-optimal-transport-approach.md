---
title: "Vector Quantile Regression: An Optimal Transport Approach"
type: paper
authors:
  - Guillaume Carlier
  - Victor Chernozhukov
  - Alfred Galichon
year: null
tags:
  - quantile-regression
  - optimal-transport
  - distributional-regression
---

## TL;DR

The paper defines conditional vector quantiles as gradients of convex potentials that transport a fixed reference distribution to a multivariate conditional outcome distribution. It develops linear vector quantile regression through covariance maximization subject to mean independence, with a linear-programming implementation and an illustration using household expenditures.

## Research Question

Can quantile regression extend to vector outcomes while preserving both a monotone map and a deterministic representation of the full conditional distribution?

## Motivation

Separate scalar quantile regressions describe marginal distributions without specifying their joint dependence. Existing multivariate quantile definitions preserve different scalar properties; the paper prioritizes transport from a fixed reference distribution and monotonicity through convex gradients.

## Contributions

- Establishes existence and almost-everywhere uniqueness of conditional vector quantile maps, including discrete and mixed outcomes, when the reference law has a density on a convex support.
- Derives inverse vector ranks under conditional absolute continuity of outcomes and an optimal-transport characterization under additional second-moment assumptions.
- Develops linear and quasi-linear regression representations, primal–dual programs, and connections to scalar quantile regression under monotonicity conditions.
- Supplies a finite-dimensional linear program and a bivariate Engel-curve illustration.

## Method

For reference rank $U$ with law $F_U$, a conditional vector quantile satisfies

$$
Y=Q_{Y\mid Z}(U,Z),\qquad U\mid Z\sim F_U,\qquad
Q_{Y\mid Z}(u,z)=\nabla_u\varphi(u,z),
$$

where $\varphi(\cdot,z)$ is convex. This implies $(Q(u,z)-Q(v,z))^\top(u-v)\geq0$. With finite second moments, conditional transport minimizes $\mathbb E\|Y-V\|^2$ subject to $V\mid Z\sim F_U$, equivalently maximizing $\mathbb E[V^\top Y]$.

Writing $X=f(Z)$ with an intercept, linear VQR models $Q(u,X)=\beta(u)^\top X=\nabla_u[B(u)^\top X]$. Its optimization relaxes independence to

$$
\max_V\mathbb E[V^\top Y]\quad\text{subject to}\quad
V\sim F_U,\qquad\mathbb E[X\mid V]=\mathbb E[X].
$$

Under correct specification the population solution recovers the conditional quantile model; under the paper's quasi-linear conditions it yields a mean-independent representation. Mean independence alone is weaker than independence, although they coincide for saturated covariates. The dual imposes $\psi(x,y)+b(u)^\top x\geq u^\top y$.

For $n$ observations and $m$ rank-grid points, the discrete coupling $\pi$ maximizes $\operatorname{Tr}(U^\top\pi Y)$ subject to $\pi\geq0$, $\pi^\top\mathbf1=\nu$, and $\pi X=\mu\nu^\top X$. The intercept enforces the rank marginal. With $p$ regressors this gives $mn$ variables and $mp+n$ equality constraints before removing redundancies (Section 4).

## Experiments

The empirical illustration uses Engel's household expenditure data: 199 Belgian households and 36 households elsewhere in Europe, totaling 235. It models food and housing/domestic-fuel spending using an intercept and total expenditure.

Scalar VQR curves closely resemble classical quantile regression at five expenditure levels, but modest crossing remains. The bivariate fit at median total expenditure 883.99 shows positive own-rank variation and negative cross-rank variation. The authors interpret this pattern as local substitution between food and housing expenditures (Section 5); it is a descriptive interpretation, not an identified causal price response. The study supplies graphical illustration rather than a predictive benchmark or numerical accuracy comparison.

## Limitations

- Existence of a forward transport does not guarantee a uniquely invertible rank for discrete outcomes; inverse ranks require conditional outcome densities.
- Correct specification is needed to interpret the regression ranks as independent of covariates. Mean independence is not sufficient by itself.
- Empirical scalar VQR can still exhibit crossing, despite monotonicity of its rank-score process.
- Vector quantiles are global in rank: computing a single rank value generally requires the whole map. The discrete program grows with the product of sample and grid sizes.
- The supplied text inconsistently numbers the housing expenditure category; this summary retains the verbal outcome description without resolving that discrepancy. No publication year or stable paper identifier is explicit in the supplied Markdown, so these are not inferred.

## Related Concepts

- [[concepts/vector-quantile-regression|Vector Quantile Regression]]
- [[concepts/optimal-transport|Optimal Transport]]

## Related Papers

The theoretical foundations include Brenier (1991), “Polar factorization and monotone rearrangement of vector-valued functions,” and McCann (1995), “Existence and uniqueness of monotone measure-preserving maps.” The scalar comparison is Koenker and Bassett (1978), “Regression quantiles.” Section 2.4 contrasts the construction with geometric quantiles, Rosenblatt-based conditional quantiles, and halfspace-depth approaches.

[[index|Library home]]
