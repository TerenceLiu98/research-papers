---
title: "Misspecifying the Shape of a Random Effects Distribution: Why Getting It Wrong May Not Matter"
type: paper
authors:
  - Charles E. McCulloch
  - John M. Neuhaus
year: 2011
doi: "10.1214/11-STS361"
journal: Statistical Science
volume: 26
issue: 3
pages: "388-402"
tags:
  - mixed-models
  - model-misspecification
  - longitudinal-data
---

## TL;DR

Misspecifying a random-intercept distribution often has little effect on maximum-likelihood estimation of covariate effects, especially within-cluster effects. This review, simulation study, and HERS application argue that [[concepts/random-effects-distribution-misspecification|Random Effects Distribution Misspecification]] must be assessed separately for each inferential target. Intercepts and the empirical shape of predicted random effects can be sensitive even when coefficient estimation and prediction mean squared error remain comparatively stable.

## Research Question

Which inferences in generalized linear mixed models for repeated or clustered observations are sensitive to the assumed shape of the random-effects distribution, and why has earlier literature reached conflicting conclusions?

## Motivation

Normal random effects are convenient, but a nonnormal latent distribution need not invalidate every parameter estimate. The authors distinguish [[concepts/within-and-between-cluster-covariate-effects|Within- and Between-Cluster Covariate Effects]], intercept estimation, variance estimation, and prediction. They also distinguish distributional shape errors from dependence of random effects on covariates, which can introduce a different and serious source of bias.

## Contributions

- Organizes theoretical and simulation evidence by inferential target rather than assigning one robustness judgment to an entire model.
- Explains why evaluating misspecification requires holding the generating distribution fixed while varying the fitted distribution. Changing the generating distribution alone confounds misspecification with intrinsic estimation difficulty.
- Compares normal and flexible Tukey random-intercept fits, illustrates distribution sensitivity in HERS data, and revisits a random-intercept-and-slope simulation.
- Separates accuracy of predicted individual random effects from recovery of their population distribution: stable prediction error does not make histograms of predictions reliable distributional diagnostics.

## Method

The main model assumes conditionally independent responses with

$$
g\{E(Y_{it}\mid b_i)\}=\mathbf{x}_{it}^{\mathsf T}\boldsymbol\beta+b_i,
\qquad b_i\overset{\mathrm{iid}}{\sim}F_b,
\qquad E(b_i)=0,\quad \operatorname{Var}(b_i)=\sigma_b^2.
$$

Maximum likelihood integrates over an assumed distribution for $b_i$, usually normal. Sections 3-9 synthesize earlier results using the fact that misspecified likelihood estimators approach parameters minimizing Kullback-Leibler divergence under suitable conditions. Exact consistency results in particular models and consistency at a zero covariate effect support robustness, but do not imply universal unbiasedness at arbitrary nonzero effects.

For informative cluster sizes, the authors represent the relevant mixing distribution as $F_b(b\mid n_i,\mathbf X_i)$. Replacing it with an unconditional distribution is another mixing-distribution error under the stated parameter-separation assumptions. The resulting robustness arguments primarily concern random-intercept models; informative random slopes are more complicated.

## Experiments

### Random-Intercept Simulation

Section 10 uses logistic models with 200 clusters, sizes 2, 4, 6, 10, 20, or 40, and 1,000 replications per setting. True coefficients are intercept -2.5, between-cluster effect 2, and within-cluster effect 1, with random-intercept standard deviation 1. Data use standardized Tukey random effects with $g=0.5$ and $h=0.1$. Fits assume normality, Tukey with known shape parameters, or Tukey with estimated shape parameters; each estimates the random-effects variance.

- Normal fits show virtually no impact on within-cluster coefficient bias, less than 5% bias for the between-cluster effect, and less than 10% for the intercept in this experiment (Figure 1).
- Estimator variability is broadly similar, with modest efficiency loss for the between-cluster effect, especially at larger cluster sizes (Figures 2-3).
- Relative to Tukey fits with known shape, normal fits increase random-effect prediction mean squared error by about 5% at size 2 and about 20% at larger sizes (Figure 4).
- Normal and known-shape Tukey fits converge in more than 95% of runs. Estimated-shape Tukey fits converge in 82.5% and 83.8% of runs at sizes 4 and 6. Figures include final parameter values from nonconverged runs; restricting to converged runs mainly affects the log-standard-deviation results.

### HERS Application

Section 11 analyzes the first four visits for 1,378 initially nondiabetic women with baseline systolic blood pressure below 140. A logistic random-intercept model relates high blood pressure to visit, BMI, and antihypertensive medication. These are associations in the analyzed cohort, not treatment-effect estimates.

Selected Table 1 results are:

| Assumed distribution | -2 log likelihood | Intercept | Visit | BMI | Medication |
| --- | --- | --- | --- | --- | --- |
| Normal | 3695 | -4.28 | 0.86 | 0.024 | -0.36 |
| Exponential | 3732 | -3.96 | 0.84 | 0.023 | -0.30 |
| Three-point discrete | 3674 | -4.05 | 0.87 | 0.021 | -0.37 |
| Tukey | 3677 | -4.10 | 0.86 | 0.022 | -0.36 |

Visit coefficients barely change despite differences in fit. Histograms of predicted random intercepts vary substantially across assumptions (Figure 5). Continuous-distribution fits use posterior modes from SAS NLMIXED, whereas the discrete fit uses posterior means from Stata GLLAMM, so this illustration also differs in prediction convention.

### Random Intercepts and Slopes

Section 12 runs 500 replications with 100 clusters of size 6. Under a true mixture of bivariate normals and an assumed bivariate normal, reducing random-slope variance from 5 to 0.08 changes median estimates from (-6.34, 2.87, 0.86) to (-5.89, 2.26, 0.95), against true intercept, between, and within coefficients (-6, 2, 1). Convergence is 99% and 100%, respectively (Table 2). The larger-variance setting still exhibits appreciable bias; the smaller setting improves robustness without establishing exact unbiasedness.

## Limitations

- The strongest evidence concerns random-intercept models with multiple observations per cluster. Single-observation duration models whose identification depends heavily on parametric assumptions are outside the scope.
- Nonlinear-model intercepts can be substantially biased, affecting estimated outcome means and absolute predictions. Stable covariate slopes do not establish calibration.
- Random-effects dependence on covariates, including covariate-dependent variances, can cause substantial bias; robustness to shape alone does not resolve these violations.
- Between-cluster effects, variance estimation, and random-effect prediction can lose efficiency under strongly discrepant distributions, large random effects, or large clusters. Assuming support narrower than the truth is another prediction risk.
- Random-slope evidence is limited. Fixed effects corresponding to misspecified random slopes may be biased, and the scale of slope variability must be interpreted jointly with the covariate range.
- The supplied Markdown has damaged equation numbering and an ambiguous initial rendering of the Tukey parameter. The later explicit specification in Section 10 gives $h=0.1$, used here. Numerical summaries above come from readable prose and tables; no experiments were rerun.

## Related Concepts

- [[concepts/random-effects-distribution-misspecification|Random Effects Distribution Misspecification]]
- [[concepts/within-and-between-cluster-covariate-effects|Within- and Between-Cluster Covariate Effects]]

## Related Papers

These works are discussed in the supplied paper; matching library pages were not found.

- Neuhaus, Hauck, and Kalbfleisch (1992), "The effects of mixture distribution misspecification when fitting mixed-effects logistic models": supplies asymptotic and local-approximation results used in the robustness argument.
- Heagerty and Kurland (2001), "Misspecified maximum likelihood estimates and generalised linear mixed models": distinguishes shape misspecification from covariate-dependent random-effects variance.
- McCulloch and Neuhaus (2011), "Prediction of random effects in linear and generalized linear models under model misspecification": examines prediction error separately from the distributional shape of predictions.
- Neuhaus and McCulloch (2006), "Separating between and within-cluster covariate effects using conditional and partitioning methods": addresses random-effects association with covariates.

[[index|Library home]]
