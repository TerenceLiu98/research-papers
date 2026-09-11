---
title: "Stratified Regression Analysis of Zero-Truncated Recurrent Event Data"
type: paper
authors:
  - Anqi A. Chen
  - X. Joan Hu
  - Rhonda J. Rosychuk
year: 2025
tags:
  - recurrent-events
  - zero-truncation
  - survival-analysis
  - administrative-data
---

## TL;DR

The paper combines [[history-stratified-recurrent-event-models|History-Stratified Recurrent Event Models]] with census information to analyze [[zero-truncated-recurrent-event-data|Zero-Truncated Recurrent Event Data]]. Event history enters through a summary such as whether a first event has already occurred, with probabilistic assignment when that history is incomplete. Census augmentation substantially improves first-stratum estimation in the reported simulations. An Alberta application finds different regional associations for first and subsequent mental health emergency visits, without establishing causal effects.

## Research Question

How can population-level, history-dependent event intensities be estimated when administrative records include only people with at least one event during an extraction window, and their earlier event histories are unavailable?

## Motivation

People with no recorded visit are absent from the administrative cohort, including their covariates and observation periods. Treating the cohort as representative of the general population distorts inference. Meanwhile, left censoring means that the first observed visit need not be the first lifetime visit. Marginal models avoid conditioning on history but do not directly answer how intensity differs before and after a previous event.

## Contributions

- Specifies a stratified Cox intensity model in which both baseline intensity and covariate coefficients can depend on a finite summary of event history.
- Develops a likelihood approach for zero-truncated data with constant stratum-specific baselines, including an EM formulation for partially known strata.
- Develops census-augmented estimating equations with unspecified baselines and probabilistic stratum membership, together with reported consistency and asymptotic normality results under regularity conditions.
- Evaluates the estimators in three simulation settings and an application to pediatric mental health-related emergency department (MHED) visits.

## Method

For subject $i$, let $N_i(a)$ count events from birth to age $a$, $Z_i$ denote time-independent covariates, and $S_i(a)$ summarize history immediately before age $a$. Equation (1) specifies

$$
\lambda(a\mid\mathcal H_i(a),Z_i)
=\lambda_{0s}(a)\exp(\beta_s^\top Z_i),\qquad S_i(a)=s.
$$

The main example uses $S_i(a)=1$ if $N_i(a-)=0$ and $S_i(a)=2$ otherwise. Only subjects with $N_i^\star=N_i(C_{Ri})-N_i(C_{Li})>0$ appear in the observed cohort. Absence of an event in this window does not imply absence of events throughout childhood.

**Approach 1: truncated likelihood.** Section 3 derives the conditional intensity induced by selection on $N_i^\star>0$ and fits a constant-baseline stratified model (SSC). When initial stratum membership is unknown, Algorithm 1 averages the complete-data log likelihood over possible histories and maximizes it iteratively. This EM procedure is described, but the simulation comparisons use Approach 1 with fully known strata because of computational complexity.

**Approach 2: census augmentation.** Section 4 approximates population risk-set sums using census counts cross-classified by calendar year, integer age, and discrete covariates. These counts are weighted by model-based population stratum probabilities and covariate intensity factors. Unobserved subject-level stratum indicators are replaced by conditional probabilities given observed records. Equations (7) and (8) jointly estimate coefficients and cumulative baselines; Algorithm 2 alternates probability, coefficient, and baseline updates. The cumulative baseline update is of Breslow form. The general model, labeled SSV, permits age-varying baselines and stratum-specific coefficients.

Section 4.2 uses independent Poisson(1) subject multipliers for variance estimation. Proposition 2 reports strong consistency and asymptotic normality for the coefficient estimator. Appendix B conditions include independent and identically distributed subjects, positive baselines, bounded event counts, step-function strata, and consistent supplementary estimates of covariate and observation-window probabilities. These are conditional theoretical results, not guarantees under arbitrary census or model misspecification.

## Experiments

### Simulations

Section 5 simulates populations of 100,000 subjects, with approximately 7% retained through a seven-year extraction window, three indicator covariates, and 1,000 replicates. Generating models are an unstratified constant-baseline process, a stratified constant-baseline process, and a stratified process whose baselines double after age 11. Comparisons include truncated likelihood, census augmentation, and ideal data with covariates and observation periods for everyone.

Selected results from Tables 2-4 are shown below. Parentheses contain empirical standard deviations across replicates, not standard errors of the simulation means.

| Setting and parameter | Truth | Approach 1, SSC | Approach 2, SSC | Approach 2, SSV |
| --- | --- | --- | --- | --- |
| Scenario 1, first-stratum baseline | 0.05 | 0.027 (0.011) | 0.051 (0.001) | Unspecified function |
| Scenario 2, first-stratum coefficient for $Z_1$ | -2 | -5.030 (3.278) | -2.005 (0.039) | -1.996 (0.038) |
| Scenario 3, first-stratum coefficient for $Z_1$ | -2 | 0.696 (0.740) | -1.932 (0.045) | -2.006 (0.043) |

The largest gains occur before the first event; repeat-event estimates do not show uniformly comparable improvements. Under Scenario 2, omitting stratification gives opposite signs for the $Z_2$ coefficient with the two approaches: 0.457 versus -0.580 in the unstratified constant-baseline model. Neither is the pair of true stratum-specific effects, -1 and 0.5. Under Scenario 3, census augmentation reduces the severe failure of truncated likelihood, but fitting constant baselines still leaves deviations from truth. The evidence supports robustness in the tested settings rather than general immunity to misspecification.

### Alberta Application

Section 6 analyzes 58,166 MHED presentations by 33,299 Alberta residents under age 18 between April 1, 2010 and March 31, 2017. Of these subjects, 67.1% have one observed visit; 88.7% of visits occur above age 11. Covariates are sex and region, treated as fixed using the first observed visit when records change.

Table 7 reports the following census-augmented SSV coefficients, with standard errors based on 1,000 bootstrap samples:

| Contrast | Before first lifetime visit | After first lifetime visit |
| --- | --- | --- |
| Male versus female | -0.379 (0.013) | -0.383 (0.029) |
| Edmonton versus other regions | -0.380 (0.015) | 0.140 (0.037) |
| Calgary versus other regions | -0.277 (0.015) | 0.151 (0.030) |

These are log intensity ratios conditional on the modeled history stratum and other covariates. Regional associations reverse sign between strata. Baseline specification also matters: Calgary's repeat-visit coefficient is 0.030 (0.020) under SSC, compared with 0.151 (0.030) under SSV.

## Limitations

- Independence across subjects can fail with community clustering. Birthdate independence conditional on covariates and stability of event patterns across generations can also fail; these are concerns explicitly discussed in Section 7.
- Census augmentation depends on suitable population coverage and comparable covariate definitions. The implemented approximation uses finitely many discrete covariate combinations and counts grouped by integer age and calendar year.
- The history summary is a substantive modeling restriction. The two-stratum example does not separately capture event count or time since the last visit after the first event. Time-varying coefficients and multi-type events remain future work.
- Approach 1 with partially known strata is formulated but not evaluated in the reported simulations. The supplied Markdown references supplementary comparisons with ideal data, but does not include those supplementary tables or figures; those comparisons cannot be independently checked here.
- The application establishes model-based associations. Differences between first and subsequent visits do not identify a causal effect of having a prior visit.
- The supplied manuscript is dated May 7, 2025, but provides no stable identifier for this paper. Some appendix equations contain extraction damage; this summary uses readable equations, prose, and main-text tables.

## Related Concepts

- [[zero-truncated-recurrent-event-data|Zero-Truncated Recurrent Event Data]]
- [[history-stratified-recurrent-event-models|History-Stratified Recurrent Event Models]]

## Related Papers

The following works are cited in the supplied manuscript; no matching Paper pages were found in the library.

- Hu and Lawless (1996), "Estimation of rate and mean functions from truncated recurrent event data." Develops population-information-based estimation for truncated recurrent events.
- Xiong, Hu, and Rosychuk (2024), "Exploring differences between two decades of mental health related emergency department visits by youth via recurrent events analyses." Provides the census integration approach adapted here from marginal to history-conditioned analysis.
- Andersen and Gill (1982), "Cox's Regression Model for Counting Processes: A Large Sample Study." Supplies the counting-process regression foundation and the unstratified special case.
- Nirmalkanna and Cigsar (2024), "Analysis of recurrent event processes with dynamic models for event counts." Models event-count trends and carryover effects; Section 7 relates a restricted case to the paper's constant-baseline model.

[[index|Library home]]
