---
title: Bayesian Sensitivity Analysis for Unmeasured Confounding in Causal Panel Data Models
type: paper
authors:
  - Licheng Liu
  - Teppei Yamamoto
year: 2025
doi: 10.1017/pan.2025.10029
tags:
  - causal-inference
  - panel-data
  - sensitivity-analysis
  - bayesian-inference
---

## TL;DR

Liu and Yamamoto develop Bayesian sensitivity analysis for residual unit-specific, time-varying confounding in causal linear factor models. Priors benchmark latent confounding against observed covariates, while transparent parameterization supports posterior computation in a nonidentified model. Simulations show conservative uncertainty intervals; in the war–inheritance-tax application, allowing unmeasured confounding changes the average-effect interval from excluding zero to including it.

## Research Question

How sensitive are counterfactual panel-data estimates to confounders that remain after accounting for observed covariates and latent common factors with heterogeneous unit loadings?

## Motivation

Interactive factors relax the restrictions of additive two-way fixed effects but do not guarantee removal of all time-varying confounding. Conventional sensitivity analyses also require substantive judgments about plausible confounding strengths. The paper represents those judgments probabilistically and benchmarks them using observed covariates.

## Contributions

- Connects Bayesian potential-outcome imputation with parametric sensitivity analysis through a model for the latent confounder conditional on treatment and covariates.
- Uses standardized confounders and exchangeable coefficient priors to calibrate unobserved confounding against observed predictors.
- Develops a Metropolis–Hastings-within-Gibbs sampler using transparent parameterization, enabling indirect posterior learning about sensitivity parameters.

## Method

The target is the average treatment effect on treated unit-periods, permitting heterogeneous effects. Identification is conditional on no anticipation, no carryover, and panel latent ignorability given observed covariates, factors, loadings, and an additional latent confounder.

Writing the factor contribution as $L_{it}$, the augmented model is

$$
Y_{it}=\beta_0+\delta_{it}D_{it}+X_{it}'\beta+\beta_u U_{it}+L_{it}+\varepsilon_{it},
\qquad
U_{it}=\lambda_0+\lambda_dD_{it}+X_{it}'\lambda_x+\lambda_fL_{it}+\nu_{it}.
$$

The product $\beta_u\lambda_d$ determines the confounding adjustment. Models are fitted to untreated observations, then used to impute counterfactuals for treated observations. Because treatment is zero in the fitting sample, learning about $\lambda_d$ depends on its stipulated prior correlation with $\lambda_0$.

Prior restrictions give the latent confounder zero mean and unit variance, comparable to standardized observed covariates. Exchangeable hierarchical Laplacian shrinkage priors on observed and latent outcome coefficients support benchmarking; analogous shrinkage selects effective factors. This calibration remains a substantive assumption.

Integrating out $U$ yields likelihood-informed combinations such as $\widetilde\beta=\beta+\beta_u\lambda_x$ and $\widetilde\sigma^2=\sigma^2+\beta_u^2c_1^2$. Transparent parameterization separates these combinations from nonidentified sensitivity parameters. The transformed prior includes its Jacobian. Treatment-effect draws subtract $\beta_u\lambda_d$ from the reduced-form imputation contrast and average over treated observations. Unlike Monte Carlo sensitivity analysis that simply samples specified scenarios, the method allows indirect Bayesian updating through prior dependence.

## Experiments

Section 4 uses 1,000 replications per design with $N\in\{50,100\}$ and $T\in\{30,50,90\}$. Twenty percent of units receive treatment in the last ten periods. Five covariates are observed, two have direct outcome effects, and the true two-factor dimension is treated as known during fitting.

At zero true ATT, Tables 2–3 report:

| Model | Coverage of nominal 95% intervals across designs | Average interval length across designs |
| --- | --- | --- |
| Oracle factor model observing the confounder | 0.910–0.959 | 0.674–1.131 |
| Naïve factor model omitting it | 0.182–0.566 | 0.690–1.152 |
| Sensitivity analysis with shrinkage | 1.000 | 4.296–4.351 |
| Sensitivity analysis with normal prior | 1.000 | 5.353–5.389 |

Shrinkage produces narrower intervals and better detection of some nonzero effects than the normal prior in these designs. Both sensitivity variants are conservative. Their widths decline little with sample size because uncertainty about confounding scenarios persists.

Section 5 revisits Scheve and Stasavage's inheritance-tax study, whose original dataset covers 19 countries over 1821–2000. The model includes lagged covariates and outcome, additive effects, and ten candidate factors with shrinkage. Average posterior effects remain similar with and without sensitivity analysis, but only the sensitivity-adjusted 95% interval includes zero. This establishes sensitivity under the specified priors, not evidence that warfare has no effect.

Replication data and code: [Harvard Dataverse](https://doi.org/10.7910/DVN/HL7ZYO).

## Limitations

- Sensitivity parameters remain nonidentified; larger samples do not eliminate dependence on substantive priors.
- Linear Gaussian specifications, factor–covariate independence in the baseline model, and i.i.d. residual errors constrain the modeled dependence structure.
- No anticipation and no carryover restrict the causal interpretation.
- The simulation uses a known factor count and a particular confounding mechanism; its perfect coverage is not a universal guarantee.
- MCMC is computationally more demanding than typical frequentist sensitivity procedures.

## Related Concepts

- [[concepts/bayesian-sensitivity-analysis|Bayesian Sensitivity Analysis]]: integrates uncertainty about unmeasured confounding into posterior causal inference.
- [[concepts/honest-event-study-inference|Honest Event Study Inference]]: a complementary approach to assessing causal robustness through explicit bounds on identifying bias.

## Related Papers

- McCandless, Gustafson, and Levy (2007), “Bayesian Sensitivity Analysis for Unmeasured Confounding in Observational Studies”: foundational parametric Bayesian sensitivity framework.
- Pang, Liu, and Xu (2022), “A Bayesian Alternative to Synthetic Control for Comparative Case Studies”: Bayesian factor-model baseline extended here.
- Rambachan and Roth (2023), “A More Credible Approach to Parallel Trends”: assesses departures from parallel trends through restrictions on bias rather than an explicit latent-confounder prior.
