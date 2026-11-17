---
title: Normal Mode Copulas for Nonmonotonic Dependence
type: paper
authors:
  - Kentaro Fukumoto
year: 2024
doi: 10.1017/pan.2023.45
tags:
  - copulas
  - dependence-modeling
  - political-methodology
---

## TL;DR

Fukumoto develops an empirical application of a trigonometric copula introduced by Chesneau (2021), naming its simplified form the normal mode copula. In a joint model of government formation and duration, NM(1,2) achieves AIC 7,628.2 versus 7,686.7 for the Gaussian copula, capturing nonmonotonic dependence missed by the conventional alternatives tested.

## Research Question

Can a tractable copula accommodate nonmonotonic dependence between jointly determined outcomes and improve a government formation–duration model?

## Motivation

Unobserved heterogeneity can produce positive dependence in one group and negative dependence in another. Their mixture need not exhibit a single monotonic relationship. Flexible marginal distributions alone do not solve this problem when the copula restricts the dependence structure.

## Contributions

- Simplifies Chesneau's trigonometric construction and interprets its amplitude and integer mode numbers.
- Incorporates this family into a joint selection and duration likelihood with censoring.
- Compares 16 mode combinations with conventional copulas and separate and two-step models on the same application.

## Method

For positive integers $\kappa_1,\kappa_2$ and $-1\leq\theta\leq1$, the [[concepts/normal-mode-copulas|Normal Mode Copula]] is

$$
C(u,v)=uv+\frac{\theta}{\kappa_1\kappa_2\pi^2}\sin(\kappa_1\pi u)\sin(\kappa_2\pi v).
$$

Its density is $1+\theta\cos(\kappa_1\pi u)\cos(\kappa_2\pi v)$. Mode numbers select the pattern of dependence; they are model-choice indicators rather than continuously estimated parameters.

The application couples conditional-logit formation probabilities with Weibull durations. Formation covariates include minority status, status quo status, and party indicators; duration covariates include minority status and polarization. With formation probability $a$ and duration CDF value $b=F_2(t)$, an uncensored observation contributes $\partial C(a,b)/\partial b\;f_2(t)$ and a censored observation contributes $a-C(a,b)$. Parameters are estimated jointly by maximum likelihood.

## Experiments

The reanalysis uses 432 formation opportunities and 95,576 potential coalitions. Durations ending for reasons other than political termination are treated as censored. Section 3 compares $\kappa_1,\kappa_2\in\{1,2,3,4\}$ with Gaussian, FGM, AMH, Clayton, and Frank copulas, including associated AMH and Clayton variants.

| Model | AIC (Table 1; lower is better) |
| --- | ---: |
| Separate formation and duration | 7,686.2 |
| Two-step, formation probability as duration covariate | 7,688.2 |
| Gaussian copula | 7,686.7 |
| Normal mode (1,1) | 7,686.3 |
| Normal mode (1,2) | 7,628.2 |

NM(1,2) has the lowest AIC among the tested models. Table 2 reports smaller standard errors than the separate, two-step, and Gaussian models except for duration dependence. The minority-government formation coefficient has standard error 0.119 versus 0.180 in the separate model, a reported reduction of 34%. The two-step formation-probability coefficient is 0.018 (SE 0.143), offering little evidence of a linear relationship.

## Limitations

The evidence is an in-sample model comparison in one substantive application, not a general prediction benchmark. The author notes that neither fitted copula appears to fit the simplified model especially well. Mode selection is restricted to a finite grid. Better AIC and smaller model-based standard errors do not by themselves establish removal of unobserved-confounding bias. The supplied text refers to supplementary full-model results and a companion theoretical paper; those materials are not analyzed here.

## Related Concepts

- [[concepts/normal-mode-copulas|Normal Mode Copulas]]: trigonometric dependence patterns that can reverse direction across the unit square.
- [[concepts/meta-gaussian-distributions|Meta-Gaussian Distributions]]: flexible margins coupled through a Gaussian copula, clarifying why marginal flexibility and dependence flexibility are distinct.

## Related Papers

- Chesneau (2021), “On New Types of Multivariate Trigonometric Copulas”: source of the broader construction simplified here.
- Chiba, Martin, and Stevenson (2015), “A Copula Approach to the Problem of Selection Bias in Models of Government Survival”: Gaussian-copula model and application reanalyzed here.
- Fukumoto (2023), “Not Linearly Correlated, But Dependent: A Family of Normal Mode Copulas,” arXiv:2308.03541: companion investigation of theoretical properties.

Replication data identifier reported in the source: `10.7910/DVN/X94ITA`.
