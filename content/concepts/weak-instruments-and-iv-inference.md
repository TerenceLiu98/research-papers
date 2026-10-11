---
title: Weak Instruments and IV Inference
type: concept
aliases:
  - Weak Instruments
  - Weak-Instrument-Robust Inference
tags:
  - instrumental-variables
  - causal-inference
  - statistical-inference
---

## Overview

Weak instruments supply too little first-stage information for conventional instrumental-variable approximations to be reliable. In a single-instrument linear model, the IV estimate divides a reduced-form coefficient by a first-stage coefficient. An imprecisely estimated denominator near zero can produce unstable estimates and misleading conventional t-tests. This inferential problem is distinct from instrument invalidity, although a small first-stage relationship can amplify bias from invalidity.

## Key Ideas

- **Strength and validity answer different questions.** Relevance concerns the instrument-treatment relationship. Unconfoundedness concerns instrument assignment, and exclusion concerns pathways from the instrument to the outcome outside treatment. A large first-stage F-statistic does not prove either validity restriction.
- **Diagnostics must reflect dependence.** Effective F incorporates a suitable first-stage covariance estimate, including heteroskedasticity or clustering. In the single-instrument setting it coincides with the corresponding robust first-stage F. Treat F above 10 as a diagnostic rule of thumb, not a universal guarantee of correct inference.
- **Inference methods have different scopes.** AR tests a hypothesized effect $\tau_0$ through the instrument coefficients in a regression of $y-\tau_0d$ on the instruments and controls. Inverting these tests yields a confidence set without requiring a strong first stage, provided the instrument validity and inferential assumptions hold. The tF procedure adjusts conventional inference using first-stage F for a single treatment and instrument.
- **Bootstrap is not a universal weak-instrument correction.** Percentile and bootstrap-t procedures can reveal sensitivity to outliers and dependence, but resampling alone does not generally resolve failure of the ratio estimator's normal approximation. AR confidence sets can be unbounded or disconnected; this is substantive information about uncertainty.
- **Weakness can magnify invalidity.** In the scalar linear model with nonzero first-stage covariance, asymptotic IV bias is $\operatorname{Cov}(z,\varepsilon)/\operatorname{Cov}(z,d)$. Even a small numerator can matter when the denominator is small. Changing standard errors cannot remove that bias.
- **A large IV/OLS gap is a diagnostic prompt.** Invalidity and selective reporting can produce large gaps, but heterogeneous treatment effects and treatment measurement error can also matter. Compare estimands and first-stage and reduced-form results before interpreting the discrepancy.
- **Placebo evidence needs a suitable population.** A zero-first-stage test examines instrument-outcome associations in a subgroup where the instrument is expected not to change treatment. Such evidence can challenge exclusion, but finding an appropriate subgroup and transporting its information require substantive justification.

These distinctions and procedures are synthesized in Sections 2 and 5 of the Lal et al. replication study. Its findings concern the selected published designs, not a universal frequency of instrument failure.

## Important Papers

- [[papers/how-much-should-we-trust-instrumental-variable-estimates-in-political-science-practical-advice-based-on-67-replicated-studies|How Much Should We Trust Instrumental Variable Estimates in Political Science? Practical Advice Based on 67 Replicated Studies]]: Compares diagnostics and inference across 70 designs and distinguishes uncertainty from possible bias amplification.
- Olea and Pflueger (2013), "A Robust Test for Weak Instruments": Effective F diagnostic, as discussed in the replication study.
- Lee et al. (2022), "Valid t-ratio Inference for IV": First-stage-dependent tF adjustment, as discussed in the replication study.

## Related Concepts

- [[concepts/fixed-effects-instrumental-variables|Fixed-Effects Instrumental Variables]]: Instrument strength must be assessed after the included controls and fixed effects; dependence also affects inference.
- [[concepts/thermal-inversions-as-pollution-instruments|Thermal Inversions as Pollution Instruments]]: A substantive application where relevance depends on exposure construction and exclusion requires separate defense.
