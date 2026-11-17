---
title: Multilevel Calibration Weighting for Survey Data
type: paper
authors:
  - Eli Ben-Michael
  - Avi Feller
  - Erin Hartman
year: 2024
doi: 10.1017/pan.2023.9
tags:
  - survey-weighting
  - political-methodology
  - calibration
---

## TL;DR

Multilevel calibration exactly balances survey covariate margins while approximately balancing higher-order interactions, trading improved balance against weight dispersion. Double regression with post-stratification (DRP) adds an outcome-model correction for residual imbalance. In a reanalysis of 2016 election polling, interaction balance improves estimation over marginal raking, while DRP provides additional gains.

## Research Question

How can survey weights adjust for interactions among demographic and political characteristics when full post-stratification produces too many empty cells?

## Motivation

Marginal balance can miss selection associated with combinations such as education, race, and region. Full post-stratification requires respondents in every population cell; outcome modeling can fill empty cells but makes estimates outcome-specific. The paper seeks reusable weights that retain exact marginal balance while improving interaction balance.

## Contributions

- A conditional estimation-error decomposition connects bias to covariate imbalance and variance to weight dispersion.
- A quadratic program provides approximate post-stratification with exact marginal constraints and bounded weights.
- DRP combines calibration with flexible outcome regression, with finite-population asymptotic inference under additional regularity and prediction-accuracy conditions.

## Method

Let population and respondent counts in cell $s$ be $N_s$ and $n_s$, with total population $N$ and sample size $n$. Multilevel calibration minimizes squared interaction-count imbalances weighted by $1/\lambda_k$, plus $\sum_s n_s(\gamma_s-N/n)^2$, subject to exact first-order balance and bounds on weights (Equation 9). Smaller $\lambda_k$ prioritizes interaction balance; letting all penalties vanish recovers marginal raking, while increasingly strict balance approaches full post-stratification when feasible. Nonnegative weights constrain the weighting estimate to the observed outcome range.

Given predicted cell means $\hat m_s$, DRP uses (Equation 12)

$$
\hat\mu_{\mathrm{DRP}}=\frac{1}{N}\left[\sum_s N_s\hat m_s+\sum_{s:n_s>0}n_s\hat\gamma_s(\bar Y_s-\hat m_s)\right].
$$

Equivalently, it adds model-predicted residual imbalance to the weighted mean. Its remaining systematic error depends on the interaction of imbalance and outcome-prediction error. The paper considers multilevel models and tree methods; DRP can extrapolate even when its initial calibration weights are nonnegative. Identification assumes missingness at random within cells and positive response probabilities. Software is provided in the multical R package.

## Experiments

The application combines 2,062 respondents from the October 2016 Pew preelection survey with 44,909 CCES postelection respondents. Population targets for estimation use weighted CCES verified voters. The outcomes differ: prospective vote intention in Pew versus retrospective vote choice in CCES. Fine-grained covariates generate 12,347 combinations, making unrestricted post-stratification infeasible.

National comparisons include marginal raking, post-stratification on four coarsened variables, and calibration through sixth-order interactions. A scan of 40 tuning values selects $\lambda=12.8$, retaining 95% of potential imbalance reduction and an effective sample size 30% larger than the least-regularized solution (Section 5).

| Weighting method | Effective sample size |
| --- | ---: |
| Marginal raking | 1,431 |
| Collapsed post-stratification | 1,482 |
| Multilevel calibration | 1,099 |

Multilevel calibration improves interaction balance, especially at second order, at the cost of a longer weight tail and a design effect of 1.87. National Republican-share estimates range from 42.5% under raking to 47.5% under collapsed post-stratification. DRP with ridge regression or boosted trees produces estimates similar to multilevel calibration alone, with smaller standard errors.

For 50 state estimates, the authors use $\lambda=1$ and compare interaction orders through six, with and without restricting respondents to the state's region. Both interaction balance and DRP improve on marginal raking; DRP's incremental gains shrink as more interactions are balanced. Using all respondents lowers aggregate bias but increases RMSE. Region-restricted DRP still underestimates Republican support in most states. The main text reports supporting simulations in the supplement without supplying their numerical results.

## Limitations

Balancing observed cells cannot remove selection within cells, and positivity does not guarantee a respondent in every realized cell. More balance can reduce precision, especially for irrelevant covariates. Tuning follows an inspected balance–effective-sample-size curve rather than a fully automatic selection rule. High-order population targets may be unavailable or estimated with uncertainty. The application addresses nonresponse adjustment, not late vote changes or all sources of polling error, and uses a survey-based reference population.

## Related Concepts

- [[concepts/multilevel-calibration-weighting|Multilevel Calibration Weighting]]: reusable weights balancing margins exactly and interactions approximately.
- [[concepts/iterative-proportional-fitting|Iterative Proportional Fitting]]: conventional marginal raking provides the baseline; the paper's quadratic calibration formulation need not use IPF updates.

## Related Papers

- [[papers/sensitivity-analysis-for-survey-weights|Sensitivity Analysis for Survey Weights]]: assesses residual selection from omitted variables; cited here in its 2022 preprint form.
- Gelman and Little (1997), “Poststratification into Many Categories Using Hierarchical Logistic Regression”: outcome-model alternative to direct cell weighting.
- Hirshberg and Wager (2021), “Augmented Minimax Linear Estimation”: related augmented balancing-weight framework.

Published in *Political Analysis* 32, 65–83 (2024); first published online March 31, 2023. Replication DOI: 10.7910/DVN/J7BSXQ.
