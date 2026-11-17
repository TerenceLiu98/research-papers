---
title: Population Average Marginal Component Effect
type: concept
aliases:
  - pAMCE
  - Population AMCE
definition: "The average causal effect of changing a conjoint attribute level while averaging other attributes and competing profiles over a substantively specified target profile distribution."
tags:
  - conjoint-experiments
  - causal-inference
  - external-validity
---

## Overview

A population average marginal component effect makes the profile distribution explicit in the estimand. The target can describe observed populations or a counterfactual environment motivated by theory. It is distinct from choosing a representative sample of respondents.

## Key Ideas

- The uniform AMCE gives equal weight to profile combinations; the population AMCE uses target frequencies. Neither distribution is substantively appropriate by default.
- Differences arise through the combination of distributional differences and interactions involving the focal attribute. If the focal contrast is constant across other attributes, changing their distribution leaves the effect unchanged.
- Joint target randomization supports weighted nonparametric estimation. Independent randomization from target marginals can suffice when three-way and higher-order interactions are absent.
- Existing experiments can support model-based target averaging, at the cost of interaction-model assumptions and potentially substantial uncertainty.
- Removing implausible combinations alone does not establish the intended target distribution. Specify the profile population and contrast before interpreting an average effect.

In electoral conjoint applications, averaging over both target voters and candidate configurations gives the effect on expected vote share. This remains distinct from winning probability: majority-rule thresholds must be applied to each matchup before averaging across matchups. A positive average effect also need not mean that a majority of voters prefer the attribute.

## Important Papers

- [[papers/improving-the-external-validity-of-conjoint-analysis|Improving the External Validity of Conjoint Analysis]]: defines the estimand, develops designs and estimators, and illustrates real-world and counterfactual targets.

- [[papers/using-conjoint-experiments-to-analyze-election-outcomes|Using Conjoint Experiments to Analyze Election Outcomes]]: establishes the expected-vote-share interpretation and distinguishes nonlinear electoral estimands.

## Related Concepts

- [[concepts/generalizability-of-survey-experiments|Generalizability of Survey Experiments]]: concerns extending effects across respondent populations.
- [[concepts/individual-marginal-component-effects|Individual Marginal Component Effects]]: targets respondent-specific contrasts; profile averaging remains a separate choice.
- [[concepts/adaptive-conjoint-experiments|Adaptive Conjoint Experiments]]: searches for extreme contextual effects rather than averaging over a fixed target distribution.
