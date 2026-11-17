---
title: Effect Coding
type: concept
aliases:
  - Effects Coding
  - Sum-to-Zero Coding
definition: "Effect coding represents categorical predictors with coefficients constrained to sum to zero, expressing category effects as deviations from an equally weighted category average."
tags:
  - regression
  - categorical-data
  - political-methodology
---

## Overview

Effect coding uses S−1 columns for an S-category predictor, assigning the omitted category −1 in each column. It changes coefficient interpretation while preserving the fitted model when it is an equivalent reparameterization of dummy coding.

## Key Ideas

- A sum-to-zero restriction replaces a selected reference category with an equal-category average. This need not equal the average over observations when category sizes differ.
- In a categorical-only multinomial logit model, intercept contrasts average subgroup log odds. Exponentiating gives geometric, rather than arithmetic, averaging of odds.
- A reference population and a reference choice alternative are distinct. Effect coding removes the former dependency but does not remove the latter identification constraint.
- Remaining covariates still condition interpretation. Coding cannot turn residual alternative preferences into a validated measure of competence or candidate quality.

## Important Papers

- [[papers/vote-choices-and-valence-intercepts-and-alternate-specifications|Vote Choices and Valence: Intercepts and Alternate Specifications]]: derives the implications for valence interpretations and demonstrates coding-sensitive party rankings.

## Related Concepts

- [[concepts/ideological-voting|Ideological Voting]]: demographic coding affects intercept interpretation in models combining proximity and nonpolicy considerations.
