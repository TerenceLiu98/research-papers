---
title: Estimation of Latent Regression Item Response Theory Models Using a Second-Order Laplace Approximation
type: paper
authors:
  - Bjorn Andersson
  - Tao Xin
year: null
source_job_id: "fcb6c1b7-6209-4d02-bbe5-f71e9d375254"
tags:
  - item-response-theory
  - latent-regression
  - laplace-approximation
  - marginal-maximum-likelihood
---

## TL;DR

Second-order Laplace approximation enables simultaneous estimation of item, regression, and covariance parameters in multidimensional IRT models where each item loads on one latent dimension. It substantially reduces first-order approximation bias in the reported simulations, including a five-dimensional model with 60,000 respondents and 100 covariates. Accuracy and convergence remain sensitive to the number of indicators per dimension; the evidence does not establish the same computational advantage for dense loading structures.

## Research Question

Can a second-order Laplace likelihood approximation make joint estimation of high-dimensional latent regression IRT models practical while retaining accuracy comparable to quadrature and stochastic approximation?

## Motivation

Marginal likelihood estimation in [[concepts/item-response-theory|Item Response Theory]] integrates over unobserved respondent traits. Tensor-product quadrature becomes expensive as dimensionality grows, while first-order Laplace approximation can be biased with few binary indicators. Assessment programs also commonly estimate item parameters first and then hold them fixed during latent regression. The paper develops a computationally feasible way to estimate these parameter blocks together.

## Contributions

- Derives a second-order likelihood approximation and its gradient for simple-structure latent regression IRT, including ordinary IRT as the case without covariates.
- Supports nominal response, graded response, generalized partial credit, and three-parameter logistic item models, including combinations of these models.
- Exploits vanishing higher-order mixed derivatives to reduce the correction sums, implementing direct likelihood optimization in `LaplaceIRT`.
- Evaluates parameter recovery, standard errors, and convergence against first-order Laplace, fixed-quadrature EM, and two MH-RM implementations.

## Method

For respondent $i$, the latent traits have a covariate-dependent Gaussian distribution,

$$
\theta_i\mid x_i\sim N(\beta x_i,\Sigma),\qquad
L_i=\int P(y_i\mid\theta;\alpha)\phi(\theta;\beta x_i,\Sigma)\,d\theta.
$$

Responses are conditionally independent given the traits. Each item depends on one latent coordinate, although the coordinates may be correlated. Define $h_i(\theta)$ as the negative log of the response likelihood times the Gaussian density, with minimizer $\hat\theta_i$ and Hessian $H_i$ there. The approximated log likelihood contribution is

$$
\ell_i^{\mathrm{Lap2}}
=\frac p2\log(2\pi)-\frac12\log|H_i|
-h_i(\hat\theta_i)+\log(1+\epsilon_i).
$$

The correction $\epsilon_i$ uses third and fourth derivatives contracted with inverse-Hessian entries. Simple item loadings and the Gaussian latent distribution make mixed derivatives of order three and above vanish. The largest correction sums consequently involve pairs of dimensions instead of six latent indices. This is the key instance of [[concepts/structure-aware-second-order-laplace-approximation|Structure-Aware Second-Order Laplace Approximation]] used here (Equations 14-17).

The sum of these contributions is maximized jointly over free item, regression, and covariance parameters. Gradients account for the changing respondent-specific modes and require derivatives through order five. The authors favor BFGS for smaller samples and BHHH for larger ones. Standard errors can use the empirical score cross-product, numerically differentiated observed information, or a sandwich estimator; calculating observed information requires additional mode optimizations (Equations 18-24).

## Experiments

The study uses 200 replications per condition. Comparators are Lap1, Lap2, fixed-quadrature EM in `mirt`, MH-RM in `mirt` (MH-RM1), and MH-RM in `flexMIRT` (MH-RM2). EM is restricted to three-dimensional models. Recovery results are reported only for methods reaching at least 50% convergence, and the binary-model comparisons retain replications where all compared estimators converged.

### Binary IRT

Three- and six-dimensional 2PL models have either three or six items per dimension and sample sizes of 500, 1,000, and 2,000. With three dimensions and three items per dimension, Lap2 retains bias as sample size increases. With six indicators per dimension, its recovery is generally comparable to or better than the alternatives in RMSE.

Convergence is a substantive qualification: in the six-dimensional, three-item condition, Lap2 nonconvergence is 22%, 17%, and 25% at the three sample sizes. Lap1 and MH-RM1 fail in every replication in that condition, whereas MH-RM2 has no nonconvergence (Table 3). For six dimensions, six items per dimension, and $n=2{,}000$, average discrimination bias falls from 0.067 with Lap1 to 0.019 with Lap2, and discrimination RMSE falls from 0.134 to 0.110 (Table 7).

### Graded Response Models

Mixed binary and polytomous models have three, six, or twelve dimensions. Nonconvergence rates are below 1% in the conditions considered. Lap2 generally reduces bias relative to Lap1, but Lap1 sometimes has lower small-sample RMSE because of lower variance. In the twelve-dimensional model at $n=2{,}000$, average covariance bias is 0.012 for Lap1, 0.002 for Lap2, and 0.034 for MH-RM2 (Table 10).

MH-RM1 was omitted from the twelve-dimensional simulation because one replication at $n=500$, including observed-information calculation, took more than 150 minutes. This comparison depends on the selected implementation and standard-error settings.

### Large-Scale Latent Regression

A simulation modeled on the NAEQ 2015 mathematics assessment uses five dimensions, 60 generalized partial credit items, 100 uncorrelated covariates, 690 parameters, and 60,000 respondents. Each dimension has six binary and six three-category items. Matrix sampling leaves each respondent with about 20 observed responses. This is a simulated assessment design, not an analysis of actual NAEQ responses.

Only Lap1 and Lap2 were run at this scale. Each replication took approximately 30 minutes; standard errors used the score cross-product because observed-information calculation was too expensive. Table 11 reports:

| Parameter block | Lap1 absolute bias | Lap2 absolute bias | Lap1 RMSE | Lap2 RMSE |
| --- | ---: | ---: | ---: | ---: |
| Item parameters | 0.022 | 0.002 | 0.043 | 0.035 |
| Regression coefficients | 0.002 | 0.001 | 0.020 | 0.020 |
| Covariances | 0.013 | 0.001 | 0.013 | 0.004 |

The largest improvements concern item and covariance parameters. Regression RMSE is unchanged at the reported precision, and standard-error accuracy is similar between the two methods.

## Limitations

- Sparse loading structure drives the computational advantage. The paper contrasts up to $12^6$ correction terms for fully dense loadings with up to $12^2$ for simple structure; these are correction-sum counts, not a bound on total optimizer runtime.
- Few binary indicators can leave substantial approximation bias and convergence problems. More respondents alone do not reliably remove approximation error.
- Recovery summaries conditioned on convergence do not capture the full cost of estimator failure. MH-RM performance depends on implementation, tuning, and standard-error estimation.
- Timing investigations use one CPU core. Parallel implementations and different stochastic draw counts may change comparisons.
- The large assessment simulation tests one condition and compares only Lap1 with Lap2. It does not demonstrate superiority over MH-RM at that scale.
- Support for an item model is distinct from empirical validation: the simulations focus on 2PL, graded response, and generalized partial credit models.
- The supplied Markdown contains damaged mathematical notation and omits the derivative supplement. Publication year and DOI are not supplied; it records acceptance on July 3, 2020. The equations above summarize legible model definitions and the likelihood form rather than reproducing damaged higher-order formulas.

## Related Concepts

- [[concepts/structure-aware-second-order-laplace-approximation|Structure-Aware Second-Order Laplace Approximation]]: exploits loading-induced derivative zeros to make higher-order integration practical.
- [[concepts/item-response-theory|Item Response Theory]]: categorical measurement with latent respondent traits and item-specific parameters.
- [[concepts/marginal-maximum-likelihood-em-for-irt|Marginal Maximum Likelihood EM for IRT]]: an alternative optimization framework for integrated response likelihoods.

## Related Papers

- [[papers/fast-estimation-of-multiple-group-generalized-linear-latent-variable-models-for-categorical-observed-variables|Fast estimation of multiple group generalized linear latent variable models for categorical observed variables]]: the existing library page identifies this paper as a precursor; that work treats multiple groups and more general loading structures.
- Thomas (1993), "Asymptotic corrections for multivariate posterior moments with factored likelihood functions": cited earlier work on higher-order corrections used for latent regression and covariance estimation with fixed item parameters.
- Chalmers (2015), "Extended mixed-effects item response models with the MH-RM algorithm": cited stochastic-approximation approach to explanatory IRT estimation.

[[index|Library home]]
