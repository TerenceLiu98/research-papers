---
title: "The Causal Effect of Polls on Turnout Intention: A Local Randomization Regression Discontinuity Approach"
type: paper
authors:
  - Pablo Brugarolas
  - Luis Miller
year: 2021
doi: 10.1017/pan.2020.50
tags:
  - causal-inference
  - regression-discontinuity
  - voter-turnout
---

## TL;DR

The release of a major Spanish election poll during another survey's fieldwork provides a natural experiment. Comparing respondents interviewed shortly before and after publication, Brugarolas and Miller estimate a 5.1-percentage-point increase in turnout intention, with a reported confidence interval of [2.0, 9.0] points. The estimate concerns short-term intentions and assignment to the post-release information environment; individual exposure and actual voting were not measured.

## Research Question

Does publishing an election forecast increase turnout intention, and can local randomization RD identify this effect when interview timing is recorded in discrete intervals?

## Motivation

Aggregate observational election data complicate causal attribution, while controlled experiments may not reproduce real electoral information environments. Overlapping survey fieldwork and poll publication offer a naturally occurring comparison. Discrete interview-time bins motivate an alternative to continuity-based estimation arbitrarily close to a cutoff.

## Contributions

- Studies a real poll release during Spain's April 2019 national-election period.
- Uses nested covariate-balance tests to select a local comparison window.
- Demonstrates randomization-based inference with a discrete running variable and checks sensitivity to windows and placebo dates.

## Method

The CIS interviewed 16,194 people for the first poll and 17,641 for the second. The first poll was released on 9 April 2019 at 12:30 p.m., while the second remained in the field; 4,125 second-poll respondents were interviewed after publication. The outcome is the proportion reporting an intention to vote.

Interview days and five retained daily time bins form a discrete score, with bins coded in increments of 0.2. Interviews after 9 p.m. are discarded because they are sparse. The ambiguous 12:05–2 p.m. interval on release day is removed, so treated observations begin at 2:05 p.m. These score increments do not represent equal elapsed-time fractions.

[[concepts/local-randomization-regression-discontinuity|Local Randomization Regression Discontinuity]] assumes an as-if randomized comparison within a finite window. Gender, age, and town size supply predetermined covariates for nested balance tests. The selected score window, [-0.8, 0.8], spans 8 April at 2:05 p.m. to 10 April at noon, with four time bins on each side. Hotelling's T-squared tests remain above the 0.05 threshold for the smaller windows. The estimator is the difference in average turnout intention within the selected window, using randomization-based inference implemented in `rdrandinf`.

## Experiments

This is an observational natural experiment, not an investigator-randomized trial.

| Analysis | Reported finding |
|---|---|
| Selected window | 5.1 percentage points; CI [2.0, 9.0] |
| 13 alternative windows | Estimates range from 3.4 to 5.1 percentage points |
| Placebo cutoffs: 26 March, 2 April, 10 April | No significant effects in the tested windows; estimates small and varying in sign |

The smallest candidate window contains 296 respondents; the largest nested window described contains 3,047. These are not the selected-window sample size. Wider comparisons are constrained by the subsequent start of the electoral campaign. Supplementary tables A2–A5 are described in the main text but are absent from the supplied Markdown.

## Limitations

- Turnout intention is an imperfect proxy for actual turnout; effects may be larger for intentions and may fade before election day.
- The survey did not measure whether respondents saw the released poll. An intention-to-treat interpretation is therefore more defensible than a verified exposure effect.
- As-if random assignment within the window is a substantive assumption; balance on three observed covariates does not establish balance on unobservables or exclude other contemporaneous changes.
- This is one poll release in one election. Activation and uncertainty over competing governing coalitions are suggested mechanisms, not separately identified effects.
- The authors report attenuation toward the campaign period, when other events can also affect voting behavior.

## Related Concepts

- [[concepts/local-randomization-regression-discontinuity|Local Randomization Regression Discontinuity]]: finite-window identification and randomization inference for discrete scores.
- [[concepts/regression-discontinuity-design|Regression Discontinuity Design]]: the broader threshold-based causal design.

## Related Papers

- Cattaneo, Frandsen, and Titiunik (2015), *Randomization Inference in the Regression Discontinuity Design*: methodological foundation cited by this paper.
- Muñoz, Falco-Gimeno, and Hernandez (2020), *Unexpected Event During Survey Design: Promise and Pitfalls for Causal Inference*: related identification through events occurring during survey fieldwork.
- [[papers/equivalence-testing-for-regression-discontinuity-designs|Equivalence Testing for Regression Discontinuity Designs]]: complementary library reading on why nonrejection in balance tests does not itself establish substantive equivalence.

Published in *Political Analysis* 29, 554–560; published online 15 February 2021. Replication data and code identifier reported in the paper: `10.7910/DVN/LBEWBR`.
