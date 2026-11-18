---
title: Politician Characteristic Regression Discontinuity
type: concept
aliases:
  - PCRD
definition: "A close-election regression discontinuity design comparing district outcomes when a candidate of one type narrowly defeats a candidate of another type, identifying a local electoral-choice effect under continuity assumptions."
tags:
  - causal-inference
  - regression-discontinuity
---

## Overview

PCRD compares districts around the zero victory margin for a designated candidate type. Districts are the units, and treatment selects between the actual candidates in each district. The contrast includes the candidates' associated attributes rather than isolating a single characteristic of a fixed leader.

## Key Ideas

- Potential outcomes refer to the district under each candidate. Candidate bundles may vary across districts while these counterfactuals remain well-defined.
- Selection into candidacy and close races shapes the population and treatment bundle. This matters for mechanisms and external validity without automatically violating local identification.
- Predetermined characteristics of each candidate should be continuous across the cutoff. Winner-selected characteristics need not be: comparing female narrow winners with female narrow losers is a different diagnostic from comparing female with male winners.
- Gradient PCRDs categorize continuous traits, such as age or ideology, sometimes relative to the opponent. Minimum trait-gap restrictions change the analyzed population and should receive sensitivity analysis.
- Density, covariate, and predicted-outcome diagnostics can reveal problems, but cannot certify continuity of unobserved potential outcomes.

## Important Papers

- [[papers/seeing-like-a-district|Seeing Like a District]]: formalizes the district-level estimand, its distinction from attribute effects, and diagnostic implications.
- Marshall (2024), *Can Close Election Regression Discontinuity Designs Identify Effects of Winning Politician Characteristics?*: analyzes selection and compensating differentials, as discussed by Bertoli and Hazlett.

## Related Concepts

- [[concepts/regression-discontinuity-design|Regression Discontinuity Design]]: parent identification framework; PCRD adds specific electoral units and treatment interpretation.
