---
title: Listwise Deletion
type: concept
aliases:
  - Complete-Case Analysis
  - Complete-Case Deletion
definition: "Listwise deletion excludes any row with a missing value in any variable required by an analysis, retaining only complete cases."
tags:
  - missing-data
  - statistical-inference
---

## Overview

Listwise deletion constructs an analysis sample containing complete observations on every required variable. Its consequences include selection bias under some missingness mechanisms, lost precision, and potentially the disappearance of the entire sample.

## Key Ideas

- Completeness is relative to the selected variables. Adding variables can only preserve or reduce the surviving sample.
- Missingness need not bias an estimator to make data unusable: sample survival is a separate concern from the relationship between missingness and outcomes.
- Under independent rows and a uniform conditional observation bound $q_*<1$, the probability of losing every row is at least $(1-q_*^k)^n$. When $k/\log n\to\infty$, this probability tends to one.
- Finite-sample severity depends on missingness rates and dependence patterns. Variables missing together do not each contribute independent opportunities for sample loss.
- Retaining observations by discarding necessary controls can change the validity of the substantive analysis. Alternative missing-data methods also require appropriate assumptions.

## Important Papers

- [[papers/listwise-deletion-in-high-dimensions|Listwise Deletion in High Dimensions]]: establishes finite-sample and asymptotic sample-loss results and illustrates them through variable subsampling in political-science datasets.

## Related Concepts

- [[concepts/multiple-imputation|Multiple Imputation]]: uses several plausible data completions to represent missing-value uncertainty; its suitability depends on the setting rather than sample retention alone.
