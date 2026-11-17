---
title: Countering Non-Ignorable Nonresponse in Survey Models with Randomized Response Instruments and Doubly Robust Estimation
type: paper
authors:
  - Michael A. Bailey
year: 2025
doi: 10.1017/pan.2024.13
tags:
  - survey-nonresponse
  - missing-data
  - political-methodology
---

## TL;DR

Randomized survey protocols can identify outcome-dependent nonresponse under additional selection assumptions. Bailey applies MNAR weighting, imputation, and the doubly robust estimator of Sun et al. (2018) to a March 2019 survey, finding substantially different turnout intentions and some subgroup opinions from conventional weighting, but little difference in overall Trump approval.

## Research Question

Can randomized changes in response propensity support population estimates when willingness to respond depends on the unobserved answer itself?

## Motivation

Demographic weighting assumes respondents represent nonrespondents conditional on observed covariates. That assumption fails when political engagement or opinion predicts participation within demographic groups. Increasing sample size does not resolve this selection problem.

## Contributions

- Explains how randomized response instruments identify MNAR weighting and imputation through population orthogonality conditions.
- Introduces an existing doubly robust MNAR estimator to political survey applications, with simulations illustrating its protection against one misspecified nuisance model.
- Documents outcome-specific and subgroup-specific differences between MAR and MNAR estimates in a national survey.

## Method

Let response be $R$, outcome $Y$, covariates $X$, and randomized protocol $Z$. The illustrative response model is

$$
\Pr(R=1\mid X,Y,Z)=\operatorname{logit}^{-1}(\gamma_0+\gamma_ZZ+\gamma_XX+\gamma_YY).
$$

Identification requires an instrument that changes response without directly changing the outcome, positive response probabilities, a correctly specified selection-bias function, and no interaction between $Z$ and $Y$ in the response equation. Randomization alone does not establish the last condition.

MNAR weighting solves estimating equations that balance covariates and instrument assignment while making weighted outcomes orthogonal to residualized assignment. MNAR imputation exponentially tilts the respondent outcome distribution using the selection-bias function to recover the nonrespondent distribution. Instrument–outcome independence in the population identifies the selection parameter even though the outcome is unavailable for nonrespondents.

Writing $\hat m_i^0$ for the predicted nonrespondent outcome and $\hat\pi_i$ for response propensity, the combined estimator is

$$
\hat\mu=\frac1N\sum_i\left[\frac{R_i}{\hat\pi_i}(Y_i-\hat m_i^0)+\hat m_i^0\right].
$$

Its double robustness concerns the weighting and imputation specifications, conditional on the MNAR identification and selection-bias assumptions; it does not protect against an invalid instrument. Standard errors use sandwich estimation.

## Experiments

Simulations compare MAR and MNAR estimators across correct and intercept-only misspecified weighting and outcome models. Across 200 repetitions, MNAR double robustness succeeds when one component is correct and can fail when both are wrong. MAR estimators remain biased under the simulated outcome-dependent selection. Weaker instruments reduce precision.

The March 2019 Ipsos Knowledge Panel application randomly assigns 3,573 adults to a standard political survey or a protocol offering a choice of politics, sports, movies, or health. Choosing another topic counts as nonresponse. For the turnout item, control response is 1,108/1,805 (61%) and treatment response is 393/1,768 (22%), yielding 1,501 respondents and 2,072 nonrespondents.

| Outcome and population | Conventional MAR weighting | MNAR estimate |
| --- | ---: | ---: |
| Absolutely certain to vote, full sample | 75% | Around 57% across MNAR models |
| Trump approval, white Midwesterners | 43% | 58%, doubly robust |
| Support for 2017 tax cuts, Republicans | 64% | 48%, doubly robust |
| Opposition to athletes kneeling, Democrats | 20% | 36%, doubly robust |
| Opposition to athletes kneeling, Republicans | 79% | 71%, doubly robust |

Overall Trump approval changes little. Among white partisan subgroups, the paper reports less extreme Trump attitudes after MNAR adjustment: Democrats not strongly disapproving rise from 13% to 35%, while Republican strong approval falls from about 49% to 34%. These are model-based adjustments, not validation against known population attitudes (Sections 5.1–5.4).

## Limitations

An instrument whose response effect depends on the outcome can produce biased MNAR estimates, potentially worse than MAR estimates. Significant selection parameters therefore do not independently prove non-ignorability. MNAR intervals are wider, especially with weak instruments, small subgroups, or rare outcomes. Voting certainty is not observed turnout and cannot directly validate turnout accuracy. Different nonresponse stages are pooled; modeling their differences is left for future work. The supplied Markdown contains damaged equation typography and coefficient signs, so ambiguous signed numerical coefficients are not reproduced here.

## Related Concepts

- [[concepts/randomized-response-instruments|Randomized Response Instruments]]: experimental variation in participation supports identification of outcome-dependent selection.
- [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]]: a distinct strategy jointly models measurement and participation through a shared latent trait.

## Related Papers

- [[papers/multilevel-calibration-weighting-for-survey-data|Multilevel Calibration Weighting for Survey Data]]: improves observed-covariate balance under within-cell ignorability; the present paper instead allows outcome-dependent response.
- Sun et al. (2018), “Semiparametric Estimation with Data Missing Not at Random Using an Instrumental Variable”: source of the identification framework and doubly robust estimator used here.
- Hartman and Huang (2023), “Sensitivity Analysis for Survey Weights”: cited as a sensitivity-based approach to non-ignorable selection, rather than direct instrument-based estimation.
