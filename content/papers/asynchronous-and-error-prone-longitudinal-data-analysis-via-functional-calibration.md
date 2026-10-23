---
title: "Asynchronous and Error-prone Longitudinal Data Analysis via Functional Calibration"
type: paper
authors:
  - Xinyue Chang
  - Yehua Li
  - Yi Li
tags:
  - longitudinal-data
  - functional-data-analysis
  - measurement-error
  - varying-coefficient-models
---

## TL;DR

Functional Calibration for Asynchronous Regression (FCAR) reconstructs error-prone longitudinal covariates at response observation times using sparse [[concepts/functional-principal-component-analysis|functional principal component analysis]], then fits ordinary time-invariant or varying-coefficient regressions with the calibrated values. The paper establishes root-$n$ inference for time-invariant coefficients and the standard univariate varying-coefficient convergence rate for time-varying coefficients, while showing that valid uncertainty estimates must include calibration and FPCA estimation error. Simulations favor FCAR over kernel-weighted and functional varying-coefficient alternatives, and a SWAN application finds increasingly negative associations of follicle-stimulating hormone with triglycerides and body mass index through the menopausal transition.

## Research Question

How can regression coefficients be estimated efficiently when longitudinal responses and time-varying covariates are observed on different schedules and the covariate measurements contain error?

## Motivation

Longitudinal studies often collect outcomes and covariates with different instruments and schedules, leaving the covariate value at each response time unobserved. Last-observation-carried-forward methods can be biased, while kernel-weighted asynchronous regression converges at nonparametric smoothing rates and does not directly address covariate measurement error. The motivating Study of Women's Health Across the Nation (SWAN) has both problems: follicle-stimulating hormone, triglycerides, and body mass index are measured on different schedules and show short-term fluctuations around their longer-term trajectories.

## Contributions

- Introduces [[concepts/functional-calibration|Functional Calibration]] for asynchronous regression, using FPCA to predict latent covariate trajectories and evaluate them at response times.
- Handles both time-invariant and time-varying coefficient models, with an extension to a modest number of asynchronous covariate processes through multivariate FPCA.
- Establishes root-$n$ consistency and asymptotic normality for time-invariant coefficients and the usual local-linear varying-coefficient rate for time-varying coefficients under undersmoothing.
- Separates variation due to regression noise and imperfect calibration from additional variation caused by estimating FPCA quantities, motivating subject-level bootstrap inference that refits FPCA.
- Evaluates the method in simulations and in a longitudinal study of hormonal changes during menopause.

## Method

For subject $i$, the response $Y_i(t)$ is observed at times $T_{ij}$, while a latent covariate process $X_i(t)$ is observed through noisy surrogates $W_{ij}=X_i(S_{ij})+U_{ij}$ at different times $S_{ij}$. The latent trajectory is represented with a truncated Karhunen-Loeve expansion,

$$
X_i(t)=\mu(t)+\sum_{k=1}^{q}\xi_{ik}\psi_k(t).
$$

Local-linear smoothers estimate the mean, covariance, and measurement-error variance from the sparse surrogate observations. Eigendecomposition of the estimated covariance supplies eigenfunctions and eigenvalues. Best linear unbiased predictors of each subject's FPC scores are then used to reconstruct the trajectory,

$$
\widehat X_i(t)=\widehat\mu(t)+\sum_{k=1}^{q}\widehat\xi_{ik}\widehat\psi_k(t),
$$

which is evaluated at each response time $T_{ij}$. The number of components is selected using a marginal-likelihood AIC or a conditional AIC intended to favor prediction.

The calibrated values enter ordinary least squares for constant coefficients and a local-linear smoother for varying coefficients. The varying-coefficient theory requires FPCA undersmoothing so calibration bias is asymptotically smaller than the second-stage smoothing bias. Treating calibrated values as known omits both prediction uncertainty and FPCA estimation error; the recommended bootstrap resamples subjects and repeats the FPCA fit in every replicate (Sections 3-4).

## Experiments

### Simulations

Both simulations use 200 datasets with $n=200$ subjects and five asynchronous response and covariate observations per subject. Covariates have three FPCs and additive standard-normal measurement error.

For time-invariant regression, FCAR's estimated slope has small bias in all six combinations of two trajectory settings and three residual/measurement-error structures. Naive 95% interval coverage ranges from 0.640 to 0.830, whereas intervals based on 500 subject-level bootstrap replicates attain coverage from 0.925 to 0.965 (Table 1). Against the kernel-weighted estimator, FCAR has much smaller bias and generally better coverage; for example, in Setting II the kernel method's bias is $-0.978$ under both independent and dependent residuals, versus FCAR biases of $-0.008$ and $-0.013$ (Table 2).

For time-varying regression, FCAR is compared with an oracle using synchronized latent covariates, a kernel-weighted method, and a functional varying-coefficient model. Across two coefficient settings, FCAR's mean absolute deviation error is 0.319 and 0.263, compared with 0.209 and 0.180 for the oracle. The kernel and functional varying-coefficient methods have larger errors and unstable squared-error summaries, attributed to their bivariate smoothing and boundary behavior (Table 3; Figure 2).

### SWAN Application

The application begins with 3,302 women followed from 1996 to 2008 and analyzes the first eight years. After excluding missing income, it includes 1,634 higher-income and 1,578 lower-income participants. A multivariate FPCA calibrates triglycerides and BMI before a varying-coefficient regression of follicle-stimulating hormone on those covariates, baseline age, and income. Pointwise intervals use 200 bootstrap replicates.

The fitted associations of follicle-stimulating hormone with triglycerides and BMI are negative and become stronger over the menopausal transition. Baseline age has a positive association, while lower income is associated with higher hormone levels. These are observational associations adjusted within the fitted model, not identified causal effects (Section 6; Figure 3).

## Limitations

- The theory and experiments are confined to Gaussian-type responses; competing asynchronous methods can accommodate generalized outcomes.
- The method assumes a smooth, low-rank covariate process, additive independent measurement error, bounded numbers of observations per subject, and independence between the latent covariate and regression error.
- Varying-coefficient inference depends on an undersmoothing regime, while practical bandwidths and component counts are selected with data-dependent procedures.
- Naive second-stage standard errors are invalid. The recommended bootstrap must repeat FPCA and is substantially more expensive than the kernel comparator's built-in inference.
- Multivariate FPCA becomes computationally and statistically difficult as the number of asynchronous covariates grows because many cross-covariance functions must be estimated. High-dimensional covariate selection with calibration error remains unresolved.
- The simulations use a limited set of Gaussian, low-rank designs, and the SWAN findings come from one observational cohort.

## Related Concepts

- [[concepts/functional-calibration|Functional Calibration]]: the paper's two-stage strategy for synchronizing latent covariates before regression.
- [[concepts/functional-principal-component-analysis|Functional Principal Component Analysis]]: supplies the low-rank trajectory model and predicted subject scores.

## Related Papers

- Cao, Zeng, and Fine (2015), "Regression analysis of sparse asynchronous longitudinal data": the kernel-weighted comparator, which avoids explicit trajectory reconstruction but has slower smoothing rates in the settings considered.
- Senturk and Muller (2010), "Functional varying coefficient models for longitudinal data": the covariance-smoothing comparator for time-varying effects.
- Yao, Muller, and Wang (2005), "Functional data analysis for sparse longitudinal data": a foundation for estimating trajectories and scores from sparse noisy observations.
- Li and Hsing (2010), "Uniform convergence rates for nonparametric regression and principal component analysis in functional/longitudinal data": supplies FPCA convergence results used in the theory.

Source scope: supplied parsed manuscript. It does not state a publication year or stable paper identifier, so neither is assigned here.

[[index|Library home]]
