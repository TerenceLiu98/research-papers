---
title: "Implementation Matters: Evaluating the Proportional Hazard Test’s Performance"
type: paper
authors:
  - Shawna K. Metzger
year: 2023
doi: "10.1017/pan.2023.34"
tags:
  - survival-analysis
  - model-diagnostics
  - political-methodology
---

## TL;DR

Monte Carlo simulations show that the full Schoenfeld-based proportional hazards test can incorrectly flag a constant-effect covariate when it correlates with a true PH violator. The traditional approximation controls false positives better in these settings, but can lose power and remains vulnerable to other forms of model misspecification.

## Research Question

How does calculating the full score test rather than its traditional approximation affect covariate-specific PH diagnostics, particularly when covariates are correlated?

## Motivation

False PH diagnoses encourage unnecessary time interactions, reducing estimation efficiency and potentially changing substantive conclusions. The paper reports that R survival changed to the full calculation in version 3.0-10, whereas the older calculation was used in the other implementations discussed. These are historical implementation descriptions, not claims about current software.

## Contributions

- Compares the calculations across 3,600 simulation scenarios with 2,000 attempted draws each.
- Identifies correlation between a PH violator and a non-violator as a major source of full-test false positives.
- Demonstrates the inferential consequences through a reanalysis of conflict-related sexual violence and legislative gender-quota adoption.

## Method

Both calculations assess a covariate interaction with a time transformation through a score-test framework. The approximation treats the event-specific covariate variance–covariance matrix as constant and substitutes its average across failures; the full calculation retains time-specific information and cross-block terms. The paper explains the algebraic differences but uses simulation to establish their performance consequences.

Simulated durations follow an unstratified Weibull hazard with baseline scale 0.15, a normally distributed constant-effect covariate, and a Bernoulli(0.5) covariate with a time-varying effect conditional on log duration. Both covariates enter the estimated base model, without omitted covariates or incorrect covariate functional forms; the time-varying effect remains the violation to detect. Tests use the true time transformation, log duration.

## Experiments

The design varies sample size (100 or 1,000), correlation (−0.65, −0.35, 0, 0.35, 0.65), Weibull shape (0.75, 1, 1.25), censoring fraction (0%, 25%, 50%), and random versus upper-tail censoring. It also varies covariate dispersion and magnitude, duration recording, and the time-varying-to-main-effect ratio. Rejection frequencies at 0.05 measure false positives for the constant-effect covariate and power for the true violator; results condition on convergence.

| Reported comparison | Result |
| --- | --- |
| Full test, n = 100, correlated versus matched uncorrelated scenarios | Higher false positives in 1,439 of 1,440 comparisons |
| Full test, n = 100, absolute correlation 0.35 | Approximately 9 percentage-point average increase in false positives |
| Full test, n = 100, absolute correlation 0.65 | Approximately 33.6 percentage-point average increase |
| Full test, n = 1,000, correlated scenarios | 100% false positives in 330 of 1,440 scenarios; minimum 22.6% in the remainder |

The approximation remains at or near nominal size in the examined settings but can become underpowered as correlation increases. With uncorrelated covariates, the full calculation generally performs well.

In the Agerberg and Kreft (2020) reanalysis, the approximation flags two covariates and the full calculation six. For high-sexual-violence conflict, the diagnostic p-value changes from 0.546 to 0.010. Following the full-test corrections yields a significant hazard ratio only for durations 5–15, altering the original substantive interpretation. The application cannot establish that this diagnosis is false because its true data-generating process is unknown.

## Limitations

The simulations cover two covariates without strata and with correct base functional forms. They do not establish universal superiority of the approximation or resolve performance in larger, stratified models. Prior work reports substantial approximation false positives under functional-form misspecification. The paper’s provisional preference for the approximation is therefore conditional on model structure and specification checks. The supplied Markdown contains damaged equations and lacks referenced footnote bodies and supplementary appendices; detailed implementation adjustments cannot be reconstructed from it alone.

## Related Concepts

- [[concepts/schoenfeld-residual-proportional-hazards-tests|Schoenfeld Residual Proportional Hazards Tests]] — implementation-dependent size and power are the main subject.
- [[concepts/cox-duration-models|Cox Duration Models]] — unnecessary or omitted time interactions affect interpretation of duration-model coefficients.

## Related Papers

- [[papers/proportionally-less-difficult-reevaluating-keeles-proportionally-difficult|Proportionally Less Difficult?]] — earlier comparisons under uncorrelated covariates and functional-form misspecification; this paper extends the performance investigation to correlated covariates.
- Agerberg and Kreft (2020), “Gendered Conflict, Gendered Outcomes: The Politicization of Sexual Violence and Quota Adoption” — the empirical application reanalyzed.

Published online November 7, 2023. [Article](https://doi.org/10.1017/pan.2023.34). Replication: [Code Ocean](https://doi.org/10.24433/CO.0072887.v1) and [Dataverse](https://doi.org/10.7910/DVN/D56UWV).
