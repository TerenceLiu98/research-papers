---
title: Selective Labels
type: concept
aliases:
  - Selective Labels Problem
definition: Selective labels arise when prior decisions determine whether an outcome is observed, making labeled cases systematically different from cases without labels.
tags:
  - policy-evaluation
  - missing-data
---

## Overview

When a human decision determines outcome observability, the observed labels need not represent the population on which an alternative policy would act. For example, outcomes under pretrial release are observed for released defendants but not for detained defendants.

## Key Ideas

- Conditioning on recorded covariates does not solve selection if decision makers use additional information associated with outcomes.
- Policy changes that remove cases from an observed release set can be evaluated more directly than changes that add historically detained cases.
- Variation in decision-maker leniency can extend observable support under suitable assignment and selection assumptions. Cases beyond that support still require bounds or additional evidence.
- Held-out predictive accuracy on labeled cases does not establish the value of a policy applied to unlabeled cases.

## Important Papers

- [[papers/human-decisions-and-machine-predictions|Human Decisions and Machine Predictions]] develops contraction comparisons and sensitivity bounds using quasi-random assignment to judges of differing leniency.

## Related Concepts

- [[concepts/omitted-payoff-bias|Omitted-Payoff Bias]] concerns missing objectives rather than missing outcome labels; both can invalidate comparisons of machine and human decisions.
