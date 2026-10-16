---
title: "A Practical Guide to Estimating Conditional Marginal Effects: Modern Approaches"
type: paper
authors:
  - Jiehan Liu
  - Ziyi Liu
  - Yiqing Xu
year: null
source_job_id: "dd230ad6-db99-4101-acf0-0435d0245ced"
tags:
  - causal-inference
  - treatment-effect-heterogeneity
  - double-machine-learning
  - semiparametric-inference
---

## TL;DR

The guide defines [[concepts/conditional-marginal-effects|Conditional Marginal Effects]] (CMEs) as treatment effects indexed by a prespecified moderator, then connects interaction models, kernel regression, AIPW-Lasso, and [[concepts/double-machine-learning|Double Machine Learning]] to that target. Its simulations favor AIPW-Lasso for smooth nuisance functions in modest samples and tuned tree-based DML for discontinuities and high-order interactions. Flexible estimation still requires [[concepts/causal-overlap|Causal Overlap]] and credible identification; variation across moderator values does not establish the causal effect of changing the moderator.

## Research Question

How can researchers estimate and visualize treatment-effect heterogeneity along one predetermined moderator while aligning the estimand, identification assumptions, nuisance models, and uncertainty intervals?

## Motivation

The familiar linear interaction plot can conceal unsupported extrapolation, omitted covariate interactions, and nonlinear effects. Pointwise intervals also do not justify simultaneous claims across the moderator's range. Kernel estimators relax linearity in the moderator but retain restrictions on other covariates. The guide organizes progressively more flexible estimators around a common causal target and supplies implementations in the accompanying R package, interflex.

## Contributions

- Defines CMEs for binary and continuous treatments, separating effect modification from causal moderation.
- Extends the kernel approach with fully moderated covariate coefficients and density-adaptive bandwidths.
- Presents outcome, IPW, and AIPW signals; combines basis expansion, Lasso selection, unpenalized refitting, and smoothing in AIPW-Lasso.
- Develops partialing-out Lasso for continuous treatment and cross-fitted DML workflows for binary and continuous treatments, including discrete outcomes.
- Compares methods through political-science reanalyses and simulations varying nuisance complexity, sample size, and learner tuning.

## Method

### Target and Identification

Let $D$ denote treatment, $Y$ the outcome, $X$ a prespecified pre-treatment moderator, and $Z$ additional adjustment covariates. For binary treatment,

$$
\theta(x)=\mathbb E[Y(1)-Y(0)\mid X=x]
=\int\tau(x,z)\,dF_{Z\mid X=x}(z).
$$

Thus, the CME averages the full-covariate CATE over the conditional distribution of $Z$, rather than fixing $Z$ at its mean. Identification relies on random sampling, SUTVA, unconfoundedness conditional on $(X,Z)$, and overlap. Differences $\theta(x_1)-\theta(x_2)$ describe effect modification; they do not identify an intervention on $X$ (Section 1).

For continuous treatment, the target is $\mathbb E[\partial_d\mu(D,X,Z)\mid X=x]$, where $\mu(d,x,z)=\mathbb E[Y(d)\mid X=x,Z=z]$. This averages derivatives over both treatment doses and remaining covariates.

### Estimation

The guide starts with raw-data, propensity-score, and binning diagnostics. Its kernel estimator fits a smooth varying-coefficient model, allowing the intercept, treatment slope, and coefficients on $Z$ to change with $X$. Local linear terms address boundary behavior; an adaptive bandwidth broadens smoothing in sparse regions. The model remains restrictive when the outcome depends nonlinearly on $Z$ (Section 2).

For binary treatment, write $V=(X,Z)$, $\mu_d(V)=\mathbb E[Y\mid D=d,V]$, and $\pi(V)=P(D=1\mid V)$. The AIPW signal is

$$
\Lambda=\mu_1(V)-\mu_0(V)
+\frac{D\{Y-\mu_1(V)\}}{\pi(V)}
-\frac{(1-D)\{Y-\mu_0(V)\}}{1-\pi(V)}.
$$

Its conditional expectation given $X=x$ identifies the CME when either the outcome regressions or the propensity model is correct, under the identifying assumptions. AIPW-Lasso estimates these nuisance functions using expanded bases and post-Lasso refits, then smooths the estimated signals over $X$. The described implementation clips propensity scores to $[0.01,0.99]$ for stability, accepting possible clipping bias (Section 3).

DML estimates nuisance functions on training folds and evaluates signals on held-out folds. It combines this cross-fitting with Neyman orthogonality and learners such as neural networks, random forests, and histogram gradient boosting. Binary-treatment signals are projected onto a basis in $X$ (Section 4).

For continuous treatment, the implemented methods assume $Y(d)=\theta(X)d+g(X,Z)+\epsilon$. They estimate $\mathbb E[Y\mid V]$ and $\mathbb E[D\mid V]$, residualize both variables, and regress the outcome residual on the treatment residual interacted with a basis in $X$. This targets the derivative-average CME when the partially linear model holds. Under misspecification, the residualized regression instead yields a projection target that need not equal the general derivative average. A more general density-based score is discussed, but requires estimating the conditional treatment density and its derivative (Section 4.3).

### Inference

The guide distinguishes pointwise intervals from simultaneous bands for claims across a prespecified moderator range. It describes bootstrap bands for classical and Lasso estimators and a Gaussian multiplier bootstrap over projected influence functions for DML. Lasso bootstrap replications repeat variable selection and refitting while holding tuning choices fixed. Function-valued DML additionally requires control of basis approximation error, basis growth, nuisance-estimation errors, and score moments (Sections 3.3, 4.4; Appendix C).

## Experiments

### Monte Carlo Evidence

The three main designs use binary treatment and the quadratic CME $\theta(x)=x^2$, while changing nuisance complexity. Comparisons cover the linear interaction model, kernel estimation, AIPW-Lasso, and DML with neural-network, random-forest, or histogram-gradient-boosting learners. Reported metrics include CME RMSE, runtime, and nuisance prediction losses (Section 5).

| Setting | Reported finding |
| --- | --- |
| Linear covariate effects, nonlinear CME | Kernel and AIPW-Lasso recover the curved CME in the illustrated $n=1{,}000$ sample. DML-HGB improves substantially between $n=1{,}000$ and $10{,}000$; the linear interaction estimator remains biased. |
| Exponential effect of an additional covariate | Kernel estimates remain poor at $n=1{,}000$ and $10{,}000$. AIPW-Lasso performs well at the smaller size; DML improves with more data. Figure 18 summarizes 200 simulation runs. |
| Discontinuities and high-order interactions | In the illustrated five-covariate, $n=10{,}000$ design, tuned RF and HGB outperform AIPW-Lasso and the tested neural networks. Smooth basis expansions fail to capture the nuisance structure. |
| Additional tuning study | Across 100 simulations in Appendix D, tuning improves NN and HGB accuracy but provides little benefit for RF, while substantially increasing runtime. |

These comparisons support matching learners to nuisance structure and inspecting out-of-sample nuisance losses. They do not establish a universally best estimator or a universal sample-size threshold.

### Empirical Reanalyses

- **Partisan threat and anger:** Kernel estimates broadly reproduce the near-linear moderation pattern in Huddy, Mason, and Aarøe (2015).
- **UN authorization and public support:** The Chapman (2009) reanalysis identifies severe support problems; the linear CME slope is driven largely by six treated observations and extrapolation.
- **Presidential and legislative elections:** The Clark and Golder (2006) reanalysis finds nonlinear effects and no treatment variation at moderator value zero, where the effect is not identified.
- **Congressional presidential references:** The Noble (2024) reanalysis broadly retains a narrowing out-party/in-party reference gap as district support for the president rises. Flexible estimators differ in local shape and uncertainty, with DML intervals generally wider than AIPW-Lasso intervals.
- **Health care and voting in Turkey:** Reanalysis of Adiguzel, Cansunar, and Corekcioglu (2023), restricted to log property values from 3 to 7, places stronger responses to congestion reductions in poorer neighborhoods. PO-Lasso and DML yield broadly similar patterns, with greater DML uncertainty.

## Limitations

The framework relies on unconfoundedness and adequate support; flexible nuisance learners cannot supply missing treatment comparisons or remove unmeasured confounding. Trimming changes the analyzed population, and clipping weights can introduce bias. The main identification framework concerns cross-sectional data rather than panel designs justified by parallel trends.

Continuous-treatment implementations retain linearity in dose and a treatment slope that varies only with $X$. For nonlinear dose-response functions, including those induced by discrete-outcome link functions, the residualized projection need not equal the stated derivative-average CME. Binary-treatment outcome models have greater flexibility in this respect.

Small samples can make cross-fitted learners unstable, and tuning carries substantial computational cost. The Lasso bootstrap excludes uncertainty from choosing penalties, knots, and smoothing parameters. Valid inference for an entire CME curve needs additional approximation and regularity conditions beyond scalar DML theory. The simulation comparisons are design-specific, and empirical reanalyses do not reveal ground-truth causal effects.

The supplied Markdown contains no explicit publication year or stable identifier for this manuscript; these are left unspecified.

## Related Concepts

- [[concepts/conditional-marginal-effects|Conditional Marginal Effects]]
- [[concepts/double-machine-learning|Double Machine Learning]]
- [[concepts/causal-overlap|Causal Overlap]]
- [[concepts/causal-and-interpretable-heterogeneous-treatment-effects|Causal and Interpretable Heterogeneous Treatment Effects]]: a distinct goal of identifying causal effect modifiers, rather than describing heterogeneity along a chosen moderator.

## Related Papers

- Hainmueller, Mummolo, and Xu (2019), "How much should we trust estimates from multiplicative interaction models? Simple tools to improve empirical practice": the kernel and diagnostic approaches extended here.
- Chernozhukov et al. (2018), "Double/debiased machine learning for treatment and structural parameters": the scalar DML foundation.
- Semenova and Chernozhukov (2021): cited throughout Section 4 and Appendix C for debiased estimation of causal functions.
- Blackwell and Olson (2022), "Reducing model misspecification and bias in the estimation of interactions": fully moderated models and post-double selection.
- [[papers/ud-dml-uniform-design-subsampling-for-double-machine-learning-over-massive-data|UD-DML: Uniform Design Subsampling for Double Machine Learning over Massive Data]]: a library comparison addressing the computational cost of ATE estimation, rather than CME curves; not a citation claimed by this guide.

[[index|Library home]]
