---
title: "Fast Multivariate Probit Estimation via a Two-Stage Composite Likelihood"
type: paper
authors:
  - Bryan Ting
  - Fred Wright
  - Yi-Hui Zhou
year: 2022
tags:
  - multivariate-probit
  - composite-likelihood
  - statistical-inference
---

[[index|Library home]]

## TL;DR

The paper estimates multivariate probit models by fitting univariate probit coefficients first, then estimating each latent correlation from a bivariate likelihood with those coefficients fixed. This avoids high-dimensional normal integration and joint parameter optimization. Examples and simulations show substantial runtime reductions with similar estimates and standard errors, using a robust Murphy-Topel variance correction. Small samples can still yield undercoverage for correlations and an invalid assembled correlation matrix.

## Research Question

Can multivariate probit estimation become substantially faster while retaining useful statistical efficiency and accounting for uncertainty introduced by two-stage estimation?

## Motivation

Correlated binary outcomes arise in longitudinal health data and multi-trait analyses. Full multivariate probit likelihoods require expensive multivariate normal probabilities. Existing chained bivariate estimators reduce this cost but repeatedly estimate coefficients across pairs. Separating marginal regression from dependence estimation makes repeated screening of predictors more computationally practical.

## Contributions

- Develops a two-stage composite likelihood for component-specific regression coefficients and unrestricted pairwise latent correlations.
- Uses robust two-stage variance estimation to account for dependence among composite scores and uncertainty in the first-stage estimates.
- Evaluates estimates, bootstrap standard errors, runtime, confidence coverage, and the need for positive-definiteness repair in real data and simulations.

## Method

For $N$ observations and $K$ binary components, the model uses a latent multivariate normal with unit marginal variances, a correlation matrix $\Sigma$, and a shared design matrix $X$. Component-specific coefficients form $B$, with $P K$ regression parameters and $K(K-1)/2$ correlations.

**Stage one (Section 2.3).** Maximize the sum of univariate probit log-likelihoods:

$$
\hat B = \arg\max_B \sum_{i=1}^{N}\sum_{k=1}^{K}
\log f(y_{ik}\mid x_i;\beta_k).
$$

With no shared coefficient constraints, this separates into $K$ ordinary probit fits. The Six Cities application instead uses coefficients shared across response components, so this independent-fit simplification is specific to the unconstrained formulation.

**Stage two.** For each pair $j<k$, estimate one correlation:

$$
\hat\rho_{jk}=\arg\max_{\rho_{jk}}\sum_{i=1}^{N}
\log f(y_{ij},y_{ik}\mid x_i;\rho_{jk},\hat\beta_j,\hat\beta_k).
$$

All sub-likelihoods have weight one. Fixing the coefficient estimates makes each pairwise optimization one-dimensional; only bivariate normal probabilities are needed. Unlike chained bivariate probit, the procedure does not refit and average regression coefficients across pairs.

**Inference and matrix validity.** A sandwich version of the Murphy-Topel estimator adjusts second-stage uncertainty for estimated first-stage inputs, including cross-stage terms. Pairwise estimates need not assemble into a positive semidefinite matrix. The authors use a nearest positive definite correlation matrix as post-processing when necessary. With a strictly positive definite population matrix and consistent estimates, the probability of needing repair tends to zero as sample size grows.

## Experiments

| Evaluation | Design | Reported result |
| --- | --- | --- |
| Six Cities (Section 3.1, Table 1) | Wheezing at four ages for 537 children; shared coefficients; 250 bootstrap replications | Estimates and standard errors are similar to prior methods. Table 1 reports about 0.025 seconds for parameter estimation. |
| MEPS (Section 3.2, Table 2) | Three disease indicators; 18,273 retained observations; 250 bootstrap replications | About 12 seconds versus 32 seconds for `gjrm()` on the same laptop. Parameter estimates and bootstrap standard errors are generally similar; native `gjrm()` correlation standard errors are larger than bootstrap estimates. |
| Runtime simulation (Table 3) | 500 replications per setting; 4 or 8 components; 5 or 9 predictors | At 10,000 observations, 8 components, and 9 predictors: 5.9 seconds versus 33.2 for the R recoding of chained bivariate probit and 19 for the previously published implementation. |
| Large runtime setting (Table 3) | 50,000 observations, 8 components, 9 predictors | 29.0 seconds versus 157.1 for the R recoding and 86 for the published implementation. |
| Coverage (Section 4.2, Tables 4-5) | 10,000 replications per setting; 4 predictors; 3-5 components; 200-6,400 observations | Coefficient coverage stays near 95%. Correlation coverage is lower at small sample sizes and approaches nominal coverage around 800 observations. |

The simulation designs resample predictors from 728 HapMap observations and generate new multivariate binary responses. Runtime comparisons with the R recoding use the same machine; published chained-probit timings use a different, faster-clocked machine. Matrix checks and repairs are included in two-stage runtimes.

## Limitations

- **Small-sample matrix validity:** At 100 observations and 8 components, repair is needed in 189/500 simulations with 5 predictors and 239/500 with 9 predictors (Table 3). It is absent in the reported runtime settings with at least 500 observations.
- **Correlation undercoverage:** At 200 observations, displayed correlation coverage values range from 92.6% to 94.4%, below the nominal 95%. Marginal coefficient coverage alone therefore does not establish calibrated inference for dependence parameters.
- **Efficiency is empirical:** Similar estimates and standard errors in the studied settings support limited efficiency loss there; they do not establish universal equivalence to full maximum likelihood.
- **Benchmark interpretation:** Hardware differs for published timings, and failed R chained-probit runs at the smallest sample size are excluded from its runtime average. Section 4.1 lists observation counts that differ from Table 3; the numerical runtime summaries above follow the table.
- **Scope:** Mixed binary-continuous responses and heteroskedasticity are proposed extensions, not evaluated capabilities.

## Related Concepts

- [[concepts/multivariate-probit-models|Multivariate Probit Models]]: latent Gaussian dependence for multiple binary outcomes.
- [[concepts/composite-likelihood|Composite Likelihood]]: tractable marginal objectives with dependence-aware uncertainty estimation.

## Related Papers

The following relationships are reported in the supplied paper's literature review:

- Chib and Greenberg (1998), *Analysis of multivariate probit models*: earlier estimation method and Six Cities comparison.
- Mullahy (2016), *Estimation of multivariate probit models via bivariate probit*: chained bivariate estimation used as a runtime comparator.
- Zhao and Joe (2005), *Composite likelihood estimation in multivariate data analysis*: earlier two-stage marginal estimation with constrained familial-model parameters.
- Hardin (2002), *The robust variance estimator for two-stage models*, and Murphy and Topel (1985), *Estimation and inference in two-step econometric models*: foundations for the variance correction.
