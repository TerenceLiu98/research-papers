---
title: Accounting for Skewed or One-Sided Measurement Error in the Dependent Variable
type: paper
authors:
  - Daniel L. Millimet
  - Christopher F. Parmeter
year: 2022
doi: 10.1017/pan.2020.45
tags:
  - measurement-error
  - political-methodology
  - econometrics
---

## TL;DR

Asymmetric outcome mismeasurement can bias regression slopes when its conditional mean varies with covariates. Stochastic frontier analysis and nonlinear least squares (NLLS) can model this distortion, but their performance depends on distributional or scaling assumptions and sample size.

## Research Question

When does skewed or one-sided measurement error in a continuous dependent variable bias regression estimates, and how well can frontier models and NLLS correct it?

## Motivation

Recorded conflict deaths, prosecuted crimes, and reported emissions can systematically understate the outcomes researchers want to explain. The usual reassurance that outcome measurement error only reduces precision applies to classical errors, not automatically to these reporting processes.

## Contributions

- Connects asymmetric outcome mismeasurement to a covariate-dependent omitted conditional mean.
- Evaluates stochastic frontier models beyond strictly one-sided errors and introduces scaling-based NLLS as an alternative to full distributional specification.
- Uses simulations and three replications to distinguish useful correction from costly or unstable over-specification.

## Method

Write the latent outcome as $y_i^*=x_i\beta+v_i$ and the observation as $y_i=y_i^*+s u_i$, where $u_i\geq0$ and $s=-1$ denotes under-reporting. A constant error mean shifts the intercept; a covariate-dependent $E[u_i\mid x_i]$ can bias slopes. Under the paper's scale-family models, heteroskedasticity changes this mean as well as variance. Skewness alone is not a general proof of slope bias.

The frontier approach assumes independent normal noise and a half-normal one-sided component, commonly parameterizing its scale through $\sigma_{u_i}^2=\exp(z_i\gamma)$. Maximum likelihood identifies the regression and reporting components under the specified model.

The alternative assumes a scaling property, $u_i=g(z_i;\delta)u_i^*$, with a base distribution independent of $z_i$. An exponential scale gives conditional mean $x_i\beta+s\mu^*\exp(z_i\delta)$, estimated by NLLS. Estimating $\mu^*$ separately requires omitting an intercept from $z_i$; inference needs heteroskedasticity adjustment. This avoids specifying complete error distributions but retains functional-form and identification assumptions. Control functions address regressor endogeneity in the applications; ordinary instrumental variables alone do not automatically correct outcome reporting bias.

## Experiments

Two Monte Carlo studies use 1,000 replications at sample sizes 100 and 10,000, comparing OLS, homoskedastic and heteroskedastic frontiers, and NLLS. Designs vary reporting-error scale, heteroskedasticity, and specification; outcomes include bias, absolute and squared error, and confidence-interval coverage.

OLS slopes perform well under constant reporting-error means. With heteroskedastic one-sided errors, the paper reports slope coverage below 10% for OLS and homoskedastic frontiers even when the simulated measurement-error scale is small relative to ordinary noise. Correctly specified heteroskedastic frontiers perform well. NLLS is imprecise in small samples but improves substantially in large samples and can better tolerate misspecification. Under skewed rather than half-normal errors, frontier point estimates improve on ignoring error, but interval coverage can remain poor.

| Replication | Reported finding |
| --- | --- |
| Nepal conflict, 3,857 villages | Frontier corrections strengthen estimated poverty and inequality associations. Predicted Maoist killings in 1996–2003 are approximately 7,800 versus 2,629 observed; these are model-based estimates, not independently verified totals. |
| Argentine conscription and crime, 5,000 cells | Little evidence of heteroskedasticity accompanies skewed residuals. Frontier estimates of conscription effects remain essentially unchanged; some NLLS controls are unstable. |
| Tariffs and emissions, 1,906 observations; 1,608 with endogeneity | Most frontier findings resemble the original analysis. The estimated Kyoto membership association changes from roughly 3% lower emissions to roughly 8% lower emissions. |

## Limitations

Correcting the wrong reporting process can worsen precision. Frontier inference depends on error distributions and the scale function; NLLS depends on the scaling property and can be weakly identified. Residual skewness and heteroskedasticity are diagnostic clues, not proof of mismeasurement. The study concerns continuous outcomes in linear-in-parameters latent regressions; binary, multinomial, and count outcomes require further methodological work. The supplied text describes supplementary simulation tables that are not included in the parsed article.

## Related Concepts

- [[concepts/asymmetric-outcome-measurement-error|Asymmetric Outcome Measurement Error]] — the reporting mechanism and its consequences for regression identification.

## Related Papers

- Nepal, Bohara, and Gawande (2011), *More Inequality, More Killings: The Maoist Insurgency in Nepal* — conflict replication.
- Galiani, Rossi, and Schargrodsky (2011), *Conscription and Crime: Evidence from the Argentine Draft Lottery* — crime replication.
- Kono (2017), *Tariffs and Carbon Emissions* — emissions replication.

Published online 14 January 2021; *Political Analysis* 30 (2022), 66–88. [Article](https://doi.org/10.1017/pan.2020.45). Replication resources reported by the paper: [Code Ocean](https://doi.org/10.24433/CO.2548901.v1) and [Harvard Dataverse](https://doi.org/10.7910/DVN/IKSE2O).
