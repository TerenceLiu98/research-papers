---
title: "Proportionally Less Difficult?: Reevaluating Keele’s ‘Proportionally Difficult’"
type: paper
authors:
  - Shawna K. Metzger
year: 2023
doi: "10.1017/pan.2022.13"
tags:
  - survival-analysis
  - model-diagnostics
  - political-methodology
---

## TL;DR

Monte Carlo reassessments of Keele’s examples show that Schoenfeld-based proportional hazards diagnostics depend on both the data-generating process and the test calculation. The full score test generally performs better than its traditional approximation in the settings studied; neither implementation’s behavior warrants a universal conclusion about robustness to misspecification.

## Research Question

How often do omitted quadratic or interaction terms distort proportional hazards tests, and does replacing the approximate calculation with the full score test change those distortions?

## Motivation

Keele (2010) illustrated how functional-form misspecification can be mistaken for a time-varying covariate effect. Single simulated datasets cannot establish how frequently that happens. The paper also reports that R’s survival package changed its calculation starting with version 3.0-10, making implementation a substantive part of evaluating the diagnostic.

## Contributions

- Replaces illustrative simulation draws with 10,000 attempted replications per data-generating process.
- Compares approximate and full score calculations under omitted quadratic terms and omitted interactions.
- Shows that even the approximation can perform well under altered covariate ranges, motivating investigation of scope conditions.

## Method

The simulations use exponential baseline hazards with rate 0.15, samples of 100, and two uncorrelated covariates: integer-valued uniform $x_1$ on [22, 90] and Bernoulli $x_2$ with probability 0.5. The rerun specifies log-hazard contributions of $0.001x_1^2+x_2\ln(t)$ in Scenario 1 and $0.001x_1+0.004x_1x_2+x_2\ln(t)$ in Scenario 2. These coefficients differ from Keele’s original values. Only $x_2$ has an explicitly time-varying effect.

Data are generated with simsurv, with 25% right censoring and random or largest-duration censoring listed in the setup. Models include or omit the relevant quadratic or interaction term. Neither base specification corrects the time-varying effect. Thus “correct base specification” does not mean the entire fitted model is correctly specified. Covariate-specific and global PH tests are assessed using p-value distributions and rejection frequencies at 0.05; only converged draws enter the results.

## Experiments

The main figures report 9,334 converged simulations for Scenario 1 and 9,998 for Scenario 2.

| Setting and outcome | Incorrect base specification | Correct base specification |
| --- | ---: | ---: |
| Scenario 1, approximate test: false positives for $x_1$ | 51.7% | 2.24% |
| Scenario 1, full test: false positives for $x_1$ | 4.7% | 9.2% |
| Scenario 2, approximate test: false positives for $x_1$ | 5.7% | 13.9% |
| Scenario 2, approximate test: power for $x_2$ | 90.1% | 21.3% |

In Scenario 1, the approximation detects the true $x_2$ violation about 98% of the time under either base specification. In Scenario 2, the full test avoids the approximation’s severe power loss: the paper reports adequate power for $x_2$ under both specifications. Restoring Keele’s original coefficients while changing $x_1$ to uniform [0, 1] also yields settings where the approximation performs well despite misspecification (Section 3.3).

## Limitations

The evidence covers a narrow family of data-generating processes and conditions on convergence. Full-test false positives are not uniformly at the nominal 5% level, as the 9.2% result demonstrates. The paper leaves broader scope conditions—including covariate correlation and the proportion of failures in $(0,1]$—for future research. Software comparisons describe the implementations studied, not necessarily current software. The supplied Markdown omits the referenced footnote bodies and supplementary appendix, limiting reconstruction of implementation details.

## Related Concepts

- [[concepts/schoenfeld-residual-proportional-hazards-tests|Schoenfeld Residual Proportional Hazards Tests]] — the diagnostic whose calculation and misspecification sensitivity are evaluated.

## Related Papers

- Keele (2010), “Proportionally Difficult: Testing for Nonproportional Hazards in Cox Models,” *Political Analysis* 18(2): 189–205 — the illustrative examples reassessed here.
- Grambsch and Therneau (1994), “Proportional Hazards Tests and Diagnostics Based on Weighted Residuals,” *Biometrika* 81(3): 515–526 — the underlying test framework.

Published in *Political Analysis* 31:156–163 (2023), online June 20, 2022. [Article](https://doi.org/10.1017/pan.2022.13). Replication materials: [Code Ocean](https://doi.org/10.24433/CO.9885736.v1) and [Harvard Dataverse](https://doi.org/10.7910/DVN/ZYOJF6).
