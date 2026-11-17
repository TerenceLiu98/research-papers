---
title: Average Component Preference
type: concept
aliases:
  - ACP
  - Conditional Average Component Preference
  - CACP
definition: "A weighted average of pairwise favorability for a conjoint attribute level against different levels, measured as selection probability minus one half and excluding focal-attribute ties."
tags:
  - conjoint-experiments
  - preference-measurement
---

## Overview

The average component preference summarizes favorability for an attribute level in paired forced-choice conjoint experiments. It distinguishes a preference summary from a causal effect on selection probability under a particular distribution of competitors.

## Key Ideas

- Average pairwise preference terms over alternative levels, excluding the focal level itself. Equal weights standardize the competitor-level distribution; other weights require substantive justification.
- Values range from −0.5 to 0.5. Adding 0.5 gives the corresponding weighted choice probability. The chosen alternatives and weights define the summary.
- Independent randomization and absence of profile-order and task-order effects support identification from observed paired choices.
- Restricted randomization requires conditional ACPs with explicit conditioning populations. Changing those populations can reintroduce compositional differences.
- Signed pair-comparison indicators permit linear regression estimation. Cluster inference by respondent when individuals complete repeated tasks.
- The construction is for paired forced-choice designs; extension to multiple competing profiles is not automatic.

## Important Papers

- [[papers/identification-of-preferences-in-forced-choice-conjoint-experiments|Identification of Preferences in Forced-Choice Conjoint Experiments]]: introduces ACPs, conditional variants, estimation, and immigrant and community preference illustrations.

## Related Concepts

- [[concepts/population-average-marginal-component-effect|Population Average Marginal Component Effect]]: targets causal effects averaged over a specified profile population, serving a different substantive question.
- [[concepts/individual-marginal-component-effects|Individual Marginal Component Effects]]: targets respondent-specific marginal contrasts, whereas ACP changes the form of the preference estimand.
