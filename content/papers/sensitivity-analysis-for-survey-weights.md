---
title: Sensitivity Analysis for Survey Weights
type: paper
authors:
  - Erin Hartman
  - Melody Huang
year: 2024
doi: 10.1017/pan.2023.12
tags:
  - survey-weighting
  - sensitivity-analysis
  - political-methodology
---

## TL;DR

Hartman and Huang quantify how omitted variables can bias weighted survey means. They provide separate analyses for variables observed only in the survey and variables unobserved everywhere, with bias contours and covariate benchmarks. In two 2020 election polls, the Michigan predicted winner is substantially more robust to omitted variables than the North Carolina predicted winner.

## Research Question

How strong would an omitted determinant of survey participation and outcomes have to be to change a weighted survey's substantive conclusion?

## Motivation

Balancing recorded demographic features cannot establish that survey respondents represent the population on unmeasured characteristics. Missing interactions and nonlinear transformations can also invalidate weighting assumptions. The framework makes these residual selection concerns explicit without specifying parametric outcome or selection distributions.

## Contributions

- A bias decomposition separates observable outcome and weight variation from two unknown features of weight error.
- A recalibration procedure evaluates variables measured in respondents but absent from population reference data.
- Robustness values, bias contours, and leave-one-covariate-out benchmarks summarize sensitivity to fully unobserved variables.

## Method

Let estimated and ideal weights, normalized to mean one, be $w$ and $w^*$, and define $\varepsilon=w-w^*$. Under the paper's weighting setup, Equation (1), for $R_\varepsilon^2<1$, gives

$$
\operatorname{Bias}(\hat\mu)=\rho_{\varepsilon,Y}\sqrt{\operatorname{var}_S(Y)\operatorname{var}_S(w)\frac{R_\varepsilon^2}{1-R_\varepsilon^2}},
$$

where $R_\varepsilon^2=\operatorname{var}_S(\varepsilon)/\operatorname{var}_S(w^*)$ and $\rho_{\varepsilon,Y}=\operatorname{cor}_S(\varepsilon,Y)$. The decomposition requires the ideal-weight setup; it is not a generic identity for arbitrary weight vectors. Bias requires both residual imbalance and alignment of the weight error with the outcome. The derivation treats weights as fixed to characterize asymptotic bias.

For a partially observed variable, posit its population mean and recalibrate weights across plausible means while retaining the original constraints. For fully unobserved variables, vary $R_\varepsilon^2$ and $\rho_{\varepsilon,Y}$ and examine the adjusted estimate. A robustness value summarizes equal explanatory strength in outcome and ideal-weight variation sufficient to reach a chosen threshold; contours show unequal-strength combinations.

Benchmarking removes an observed covariate, refits weights, and uses the resulting weight difference to estimate parameters for a hypothetical omitted variable of comparable strength. Minimum relative confounding strength (MRCS) compares the bias needed to reach the threshold with benchmarked bias. Its sign preserves direction: a negative ratio does not mean a weak same-direction confounder overturns the result.

## Experiments

The application uses October 2020 ABC News/Washington Post polls with 770 Michigan respondents and 619 North Carolina respondents. Custom raking weights target CES verified voters (1,213 and 1,101 units respectively), incorporating CES weights. Calibration includes age, gender, race/ethnicity, education, party identification, born-again Christian status, and a party-by-education interaction. These are reconstructed weights, not the polls' proprietary weights.

| State | Weighted Democratic margin (p.p.) | Standard error (p.p.) | Robustness value at zero margin |
| --- | ---: | ---: | ---: |
| Michigan | 4.57 | 2.56 | 0.11 |
| North Carolina | -0.37 | 2.63 | 0.01 |

Table 2 indicates greater sensitivity in North Carolina. In Michigan, varying the population prevalence of high political interest from 0% to 100% leaves the predicted winner unchanged; confidence intervals include zero throughout. Party-identification benchmarking yields estimated biases of -1.87 and -1.17 percentage points in Michigan and North Carolina. North Carolina's MRCS of 0.31 implies that a confounder roughly 30% as strong as party identification could change its predicted winner (Table 3).

## Limitations

The main analysis concerns point estimates, not statistical significance; both baseline margins are statistically indistinguishable from zero. The conclusion discusses percentile-bootstrap intervals conditional on sensitivity parameters. Positivity and an appropriate ideal-weight representation remain assumptions. Continuous partially observed variables require defensible ranges for population moments. Benchmarking depends on substantively informative observed covariates and cannot rule out stronger unobserved confounding; there are no universal robustness cutoffs. The CES-defined target is itself a survey-based reference.

## Related Concepts

- [[concepts/survey-weight-sensitivity-analysis|Survey Weight Sensitivity Analysis]]: quantifies residual selection bias after weighting.
- [[concepts/iterative-proportional-fitting|Iterative Proportional Fitting]]: raking supplies the calibration mechanism in the application.
- [[concepts/weighting-diagnostics-for-causal-estimation|Weighting Diagnostics for Causal Estimation]]: observed balance and weight concentration complement sensitivity analysis but cannot establish ignorability.

## Related Papers

- Cinelli and Hazlett (2020), “Making Sense of Sensitivity: Extending Omitted Variable Bias”: motivates robustness summaries and substantive benchmarking.
- Huang (2022), “Sensitivity Analysis in the Generalization of Experimental Results”: develops weighting sensitivity tools extended here to surveys.
- [[papers/bayesian-sensitivity-analysis-for-unmeasured-confounding-in-causal-panel-data-models|Bayesian Sensitivity Analysis for Unmeasured Confounding in Causal Panel Data Models]]: a methodological comparison using priors over sensitivity parameters rather than a survey-weight parameter grid.

Published in *Political Analysis* 32, 1–16 (2024), online April 28, 2023. Replication data: DOI 10.7910/DVN/YJSJEX.
