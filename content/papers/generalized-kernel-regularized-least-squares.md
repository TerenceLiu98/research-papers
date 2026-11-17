---
title: Generalized Kernel Regularized Least Squares
type: paper
authors:
  - Qing Chang
  - Max Goplerud
year: 2023
doi: 10.1017/pan.2023.27
tags:
  - kernel-methods
  - hierarchical-modeling
  - causal-inference
---

## TL;DR

gKRLS combines a hierarchical formulation of kernel ridge regression with subsampling sketching. This makes kernels modular components alongside unpenalized covariates, random effects, and splines, supports non-Gaussian outcomes, and substantially reduces computation. Simulations and political-science reanalyses show why both model structure and computational approximation matter.

## Research Question

Can flexible kernel regression accommodate theoretically motivated model components and repeated estimation on large datasets without the cubic computational burden of traditional KRLS?

## Motivation

Putting all predictors into one regularized kernel permits complex interactions but can impose unnecessary flexibility, particularly for group indicators. Traditional implementations also make large datasets and repeated nuisance-model fitting prohibitively expensive.

## Contributions

- Integrates KRLS into hierarchical and generalized additive modeling, with separate penalties for different components.
- Uses restricted maximum likelihood (REML) to tune multiple regularization parameters and extends estimation and uncertainty calculations to non-Gaussian outcomes.
- Implements randomly sampled kernel centers to reduce the basis dimension while retaining all observations in fitting.
- Demonstrates modular specification, scalable prediction, and integration with double/debiased machine learning and an R-learner.

## Method

For whitened covariates, the Gaussian kernel is $K_{ij}=\exp(-\|w_i-w_j\|^2/P)$, with bandwidth fixed to the number of predictors $P$. Standard [[concepts/kernel-regularized-least-squares|Kernel Regularized Least Squares]] minimizes squared residuals plus $\lambda\alpha^T K\alpha$. Its hierarchical representation uses $y\sim N(K\alpha,\sigma^2 I)$ and $\alpha\sim N(0,\sigma^2 K^{-}/\lambda)$.

gKRLS replaces the mean by $X\beta+\sum_j Z_j\alpha_j$, assigning each penalized component its own precision matrix and smoothing parameter while leaving $\beta$ unpenalized. REML estimates smoothing parameters; non-Gaussian likelihoods use Laplace approximation and penalized iteratively reweighted least squares. The implementation builds on R's mgcv and provides posterior-Hessian uncertainty, robust or clustered alternatives, and marginal-effect calculations.

Subsampling sketching selects $M$ observations as kernel centers, yielding an $N\times M$ design and a corresponding sampled-kernel penalty. The default dimension follows $M=\delta N^{1/3}$, with multipliers 5 and 15 evaluated. This reduces basis size rather than discarding outcome observations. Different random centers produce different estimates, so sensitivity to the sketch and its dimension matters.

## Experiments

- **Scalability (§4):** Fifty replications of the two-covariate “Three Hills, Three Valleys” design compare KRLS, bigKRLS with and without eigenvalue truncation, and gKRLS. On one core with 8GB RAM, the paper reports roughly 6 seconds at 10,000 observations and 2 minutes at 100,000 for its fast configuration. Predictive RMSE is similar across methods except truncated bigKRLS, which performs worse. These runtimes are specific to this simple design.
- **Group effects (§4.1):** With 50 groups and 10 observations per group, 1,000 replications vary correlation between a predictor and group effects. Unpenalized group indicators outside the kernel improve average-marginal-effect RMSE relative to including them inside it. Correctly specified linear fixed effects still outperform kernel methods under the linear data-generating process.
- **Meritocracy beliefs (§5):** A logistic model combines a kernel, county random intercepts, an earnings-inequality spline, and 24 unpenalized controls. The inverted-U point-estimate pattern resembles Newman (2016), but gKRLS marginal-effect intervals cross zero throughout the evaluated range, weakening evidence for a detectable nonlinear relationship.
- **Electoral quotas (§6):** Reanalysis of 32,461 Indian villages uses geographic or broader kernels and clustered uncertainty. Five-fold [[concepts/double-machine-learning|Double Machine Learning]] requires 10 or 15 gKRLS fits and takes a few minutes. Results broadly preserve the original distributional findings; DML-ATE has approximately 40% larger standard errors than other specifications. The reported R-learner extension finds larger effects in Himachal Pradesh.

## Limitations

Uniformly sampled kernel centers can poorly represent complex data, and the paper does not fully characterize uncertainty induced by sketch randomness. Larger sketches and repeated fits are recommended when results vary. A hierarchical reformulation alone does not solve full-kernel computational cost. Flexibility can reduce accuracy when a simpler model is correctly specified, and penalized treatment-effect estimation remains susceptible to regularization bias; DML addresses this under its own assumptions. Empirical robustness checks do not independently establish causal identification.

## Related Concepts

- [[concepts/kernel-regularized-least-squares|Kernel Regularized Least Squares]]: the base estimator generalized here.
- [[concepts/double-machine-learning|Double Machine Learning]]: repeated nuisance estimation motivates computational acceleration and addresses regularization bias.

## Related Papers

- Hainmueller and Hazlett (2014), “Kernel Regularized Least Squares: Reducing Misspecification Bias with a Flexible and Interpretable Machine Learning Approach”: foundational KRLS formulation.
- Yang, Pilanci, and Wainwright (2017), “Randomized Sketches for Kernels: Fast and Optimal Nonparametric Regression”: sketching background.
- [[papers/ud-dml-uniform-design-subsampling-for-double-machine-learning-over-massive-data|UD-DML: Uniform Design Subsampling for Double Machine Learning over Massive Data]]: a complementary computational approach that selects a working sample for DML, whereas gKRLS reduces the kernel basis.

Replication data: [Harvard Dataverse](https://doi.org/10.7910/DVN/WNW0AD).
