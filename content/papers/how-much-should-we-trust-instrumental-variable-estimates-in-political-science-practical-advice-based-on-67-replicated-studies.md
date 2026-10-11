---
title: "How Much Should We Trust Instrumental Variable Estimates in Political Science? Practical Advice Based on 67 Replicated Studies"
type: paper
authors:
  - Apoorva Lal
  - Mac Lockhart
  - Yiqing Xu
  - Ziwen Zu
year: null
source_job_id: "cc3553eb-e3c3-4651-adf2-4d7532fc0341"
replication_data_doi: "10.7910/DVN/MM5THZ"
tags:
  - instrumental-variables
  - causal-inference
  - political-methodology
  - replication
---

## TL;DR

Replicating 70 instrumental-variable designs from 67 political science articles, Lal and colleagues find overstated first-stage strength, sensitivity of statistical significance to inference methods, and IV estimates larger in magnitude than OLS in 68 designs. The association between weaker first stages and larger IV/OLS ratios appears in observational designs but is weak in experimental designs. The authors interpret this as evidence consistent with instrument invalidity amplified by weak instruments and selective reporting; the comparison does not identify which individual instruments are invalid.

## Research Question

How credible are the instrument-strength diagnostics, uncertainty estimates, and effect magnitudes in published political science IV studies, and which diagnostic and inferential practices can improve them?

## Motivation

An instrument must predict treatment while satisfying unconfoundedness and exclusion restrictions. Conventional first-stage F-statistics can exaggerate strength when errors are dependent, and conventional 2SLS t-tests can understate uncertainty. Large IV estimates are especially puzzling when researchers introduce IV to address suspected upward bias in OLS. [[concepts/weak-instruments-and-iv-inference|Weak Instruments and IV Inference]] connects these problems while distinguishing uncertainty from failures of causal identification.

## Contributions

- Reanalyzes a defined sample of IV applications in APSR, AJPS, and JOP published during 2010-2022.
- Compares effective and bootstrapped first-stage diagnostics and several inferential procedures while holding replicated 2SLS point estimates fixed.
- Relates IV/OLS magnitude gaps to first-stage strength and experimental versus observational instrument assignment.
- Provides a research-design and reporting checklist, the R package `ivDiag`, and accompanying Stata tutorials.

## Method

The sampling frame contains 114 articles using a linear IV model with one endogenous variable to support a main-text argument. Appendix-only applications, nonlinear outcome models, multiple endogenous variables within one specification, and dynamic-panel IV/GMM applications are excluded. Replicability means exactly reproducing at least one main 2SLS point estimate, not every standard error or result. The resulting 67 articles supply 70 designs: 12 experimental and 58 observational (Sections 3-4).

For each selected specification, the authors calculate first-stage F-statistics using conventional, heteroskedasticity-robust, cluster-robust where applicable, and bootstrap standard errors, as well as the effective F-statistic. They compare conventional inference with bootstrap percentile intervals (bootstrap-c), bootstrap-t, Anderson-Rubin (AR) testing, and the tF adjustment for 54 single-instrument designs. Clustering follows the original specifications. Corresponding OLS regressions use the treatment and covariates without the instrument.

The theoretical discussion uses a constant-effect linear model. With a single instrument and variables residualized on controls,

$$
\hat\tau_{IV}=\frac{\widehat{\operatorname{Cov}}(z,y)}{\widehat{\operatorname{Cov}}(z,d)},
\qquad
\operatorname{plim}\hat\tau_{IV}=\tau+\frac{\operatorname{Cov}(z,\varepsilon)}{\operatorname{Cov}(z,d)}.
$$

The second expression assumes a nonzero population denominator. A small first-stage covariance can amplify even modest violations of instrument exogeneity. Weak-instrument-robust inference addresses uncertainty under valid instruments; it does not eliminate this identification bias (Section 2).

## Experiments

This is a replication and methodological comparison, not a new randomized experiment. Results below refer to designs unless stated otherwise (Section 4 and Table 3).

| Diagnostic | Reported result |
| --- | --- |
| First-stage F not reported | 12/70 (17%) |
| Effective F below 10 | 8/70 (11%) |
| Bootstrapped F below 10 | 12/70 (17%) |
| Median effective F, experimental / observational | 67.7 / 53.5 |
| Median analytic 2SLS/OLS standard-error ratio | 3.8 |
| Absolute IV estimate exceeds absolute OLS estimate | 68/70 (97%) |
| Mean / median absolute IV/OLS coefficient ratio | 12.4 / 3.4 |
| Absolute IV/OLS coefficient ratio above 5, per Table 3 | 24/70 (34%) |

The fraction failing to reject a zero effect at the 5% level depends on the inferential procedure:

| Procedure | Non-rejections | Denominator |
| --- | ---: | ---: |
| Originally reported inference | 7 (10%) | 70 |
| Anderson-Rubin | 12 (17%) | 70 |
| Bootstrap-t | 13 (19%) | 70 |
| Bootstrap-c | 19 (27%) | 70 |
| tF | 19 (35%) | 54 single-instrument designs |

Within the tF subset, seven designs significant under conventional fixed critical values become insignificant. Non-rejection is not evidence that the true effect is zero, and the tF percentage uses a different denominator from the other rows.

The relationship between first-stage strength and the absolute IV/OLS ratio has adjusted $R^2=0.264$ in observational designs, with a p-value reported as 0.000 (rounded, not literally zero). The experimental comparison has adjusted $R^2=-0.014$ and $p=0.378$. The observational pattern persists when restricting to significant OLS results accepted as main findings. The authors discuss instrument invalidity, publication selection, heterogeneous treatment effects, and treatment measurement error as possible explanations; their preferred interpretation emphasizes the first two.

Section 5 recommends reporting effective F with appropriate error structure, first-stage and reduced-form intervals, and OLS and IV confidence intervals under multiple procedures. It also recommends examining outliers, profiling compliers when invoking effect heterogeneity, using zero-first-stage placebo tests where a suitable subgroup exists, and sensitivity analysis for instrument invalidity. An effective F below 10 calls for suitable inference rather than automatic rejection of the design.

## Limitations

- The results concern selected, replicable linear IV applications in three journals. Missing replication materials and the exclusion criteria limit generalization. Reproducing one point estimate does not validate all results or causal assumptions in an article.
- Cross-study associations cannot establish invalidity for a particular instrument or disentangle publication selection, heterogeneity, measurement error, and exogeneity violations. The experimental comparison contains only 12 designs.
- The theoretical exposition primarily assumes constant effects. Most sampled treatments and instruments are continuous; a binary-treatment complier interpretation is not automatically appropriate.
- Bootstrap procedures do not generally repair weak-identification failures. AR and tF still require instrument validity, and the paper applies tF only to the single-instrument subset. AR confidence sets can be unbounded or disconnected.
- The supplied text has inconsistent sample accounting: the introduction gives 71 articles with complete materials, Section 3 gives 76 and an inconsistent 62%, and Table 1 separates 38 incomplete-data, four incomplete-code, and five replication-error cases. The prose also reverses the APSR/AJPS article totals relative to Table 1. The stable totals are 114 eligible articles, 67 replicated articles, and 70 designs.
- No publication year or valid article DOI is established in the supplied Markdown. The supplementary-material DOI is a placeholder, and the referenced supplement is not included here. Claims about its simulations and heterogeneity analyses are therefore reported as the authors' statements, not independently inspected results.

## Related Concepts

- [[concepts/weak-instruments-and-iv-inference|Weak Instruments and IV Inference]]: Separates first-stage strength, uncertainty, and exogeneity.
- [[concepts/fixed-effects-instrumental-variables|Fixed-Effects Instrumental Variables]]: Panel controls do not remove the need for instrument validation or dependence-aware inference.

## Related Papers

The supplied paper builds on Young (2022), "Consistency without Inference: Instrumental Variables in Practical Application," for bootstrap comparisons; Lee et al. (2022), "Valid t-ratio Inference for IV," for tF inference; Olea and Pflueger (2013), "A Robust Test for Weak Instruments," for effective F; and Cinelli and Hazlett (2022), "An Omitted Variable Bias Framework for Sensitivity Analysis of Instrumental Variables," for sensitivity to invalidity.

Library comparison, not a citation or a replicated case identified by this paper: [[papers/the-cost-of-internet-use-an-examination-of-the-causal-impact-on-body-weight|The Cost of Internet Use: An Examination of the Causal Impact on Body Weight]] illustrates an IV/OLS magnitude gap in a panel application. The present paper supplies diagnostic questions for such a gap, not a finding that this other study's instrument is invalid.

Replication data and code are identified in the source at [Harvard Dataverse](https://doi.org/10.7910/DVN/MM5THZ); this is a dataset DOI, not the article DOI.

[[index|Library home]]
