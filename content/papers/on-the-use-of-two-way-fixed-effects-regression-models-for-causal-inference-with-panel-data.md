---
title: "On the Use of Two-Way Fixed Effects Regression Models for Causal Inference with Panel Data"
type: paper
authors:
  - Kosuke Imai
  - In Song Kim
year: 2021
doi: "10.1017/pan.2020.33"
source_job_id: "a0be8d76-bd10-4f7a-b7ab-080dbbd28535"
tags:
  - causal-inference
  - panel-data
  - fixed-effects
---

## TL;DR

Two-way fixed effects (2FE) do not automatically provide nonparametric control for both unit-specific and time-specific confounding. Imai and Kim use a matching representation to expose the role of additive modeling assumptions and show that their multi-period difference-in-differences estimator generally differs from unweighted 2FE; its regression representation can require negative observation weights.

## Research Question

When can a regression with unit and time fixed effects be interpreted as a causal estimator, and does its familiar two-group, two-period equivalence to difference-in-differences extend to general panels?

## Motivation

Researchers often justify 2FE by simultaneous removal of stable unit confounders and common time confounders, or by its equivalence to a simple DiD contrast. Neither justification alone establishes causal identification in a general panel with treatment switching.

## Contributions

- Proposition 1 expresses ordinary 2FE as a two-way matching estimator with an adjustment set and a scaling correction for treatment-status mismatches.
- Proposition 2 characterizes a weighted version that eliminates mismatches within unit and time but generally retains them in the adjustment set.
- Theorem 1 represents a specified multi-period DiD estimator as weighted 2FE with potentially negative regression weights, distinguishing it from ordinary unweighted 2FE.
- The analysis permits units to enter and exit treatment, extending beyond staggered, irreversible adoption.

## Method

The starting model is $Y_{it}=\alpha_i+\gamma_t+\beta X_{it}+\epsilon_{it}$ with binary treatment. Unit and time effects may be arbitrary functions of their respective confounders, but their contributions are additive and separable.

The matching representation constructs a counterfactual from the mean of other observations in the same unit, plus the mean of other observations in the same period, minus the mean of observations sharing neither index. These sets can contain observations with the same treatment status as the focal observation, which the paper calls mismatches. A treatment-dependent normalization corrects their contribution in the algebraic representation. Restricting the first two sets to opposite-treatment observations does not generally remove mismatches from the third set. Thus this framework cannot achieve simultaneous nonparametric adjustment merely by adding two sets of fixed effects.

For DiD, the authors instead select transitions from control at $t-1$ to treatment at $t$, comparing each switcher's outcome change with the mean change among units untreated in both periods. Eligible transitions require at least one such control. The estimator averages these transition-specific contrasts. Its parallel-trends assumption equates expected untreated outcome changes between switchers and continuing controls; the target is the ATT conditional on a control-to-treatment transition.

All three comparison sets then contain controls. Theorem 1 derives regression weights from how often each observation appears as a focal observation, a within-unit match, a within-time match, or an adjustment observation. Frequent use in adjustment sets can yield negative total observation weights. This is an algebraic representation of the specified DiD estimator, not a prescription to use conventional positive-weight least squares.

## Experiments

This is an analytical paper, with no empirical application or simulation benchmark in the supplied text. Figure 1 uses a five-unit, four-period treatment matrix to illustrate matching and residual mismatches; Figure 2 illustrates the restricted DiD comparison sets. Evidence consists of two propositions and a theorem. Appendix A gives the theorem's proof; the proposition proofs are assigned to supplementary material not included in the supplied Markdown.

## Limitations

The analysis focuses on binary treatment and presents balanced panels for notational simplicity, while stating that results extend to unbalanced panels. Its nonparametric-adjustment argument concerns the two-way fixed-effects framework, not every possible panel identification strategy. The DiD result concerns the authors' transition-based estimator and requires credible parallel trends for causal interpretation. The paper diagnoses common justifications for 2FE rather than proposing a general replacement estimator.

## Related Concepts

- [[concepts/two-way-fixed-effects|Two-Way Fixed Effects]]: the central regression specification and its causal interpretation.
- [[concepts/fe-ldv-bracketing|FE–LDV Bracketing]]: a distinct warning about interpreting panel regressions under feedback and confounding.

## Related Papers

- Imai and Kim (2019), “When should we use linear unit fixed effects regression models for causal inference with longitudinal data?”: the one-way matching representation extended here.
- [[papers/using-multiple-pretreatment-periods-to-improve-difference-in-differences-and-staggered-adoption-designs|Using Multiple Pretreatment Periods to Improve Difference-in-Differences and Staggered Adoption Designs]]: develops explicit DiD comparisons and separates trend restrictions from estimator efficiency.

Published in *Political Analysis* 29, 405–415 (2021), first published online November 12, 2020. [Article](https://doi.org/10.1017/pan.2020.33).
