---
title: Multiple Hypothesis Testing
type: concept
aliases:
  - Multiple Comparisons
  - Multiplicity Correction
definition: "Statistical inference over a family of hypotheses, where error control must account for the combined opportunities to make false discoveries."
tags:
  - statistical-inference
  - multiple-testing
---

## Overview

Testing many hypotheses at a fixed per-test significance threshold increases opportunities for false findings. The appropriate correction depends on which aggregate error is consequential and how much power the analyst is willing to sacrifice.

## Key Ideas

- Familywise error is the probability of at least one false rejection. Under independent true nulls tested at alpha, it is 1 − (1 − alpha)^m. The independence condition matters.
- False discovery rate is the expected proportion of false rejections among all rejections, with the proportion defined as zero when there are none. It is not a guaranteed fraction in each realized study.
- Bonferroni uses alpha/m and controls familywise error under valid marginal tests without requiring independence. Its conservatism can increase false negatives.
- Benjamini–Hochberg uses ranked p-values to target false discovery rate under its applicable dependence conditions. Its target differs from familywise error.
- Empirical Bayes adaptive shrinkage pools information across estimates and their standard errors. Its model-based regularization also changes effect estimates, unlike p-value-only corrections.
- Define the family and correction strategy before inspecting results. Subgroup searches and additional contrasts can enlarge the inferential family. Loss of significance after correction does not prove a zero effect.

## Important Papers

- [[papers/multiple-hypothesis-testing-in-conjoint-analysis|Multiple Hypothesis Testing in Conjoint Analysis]]: demonstrates false-positive risk across conjoint contrasts and compares correction methods under sparse and denser signals.

## Related Concepts

- [[concepts/population-average-marginal-component-effect|Population Average Marginal Component Effect]]: conjoint studies often test many such attribute contrasts simultaneously; choosing the target population does not resolve multiplicity.
