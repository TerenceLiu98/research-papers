---
title: Distribution-Weighted Average Marginal Effects
type: concept
aliases:
  - DAME
  - Distribution-Weighted Average Marginal Effect
definition: "An average of model-implied observation-level marginal effects within moderator values or bins, retaining the conditional empirical distribution of all covariates."
tags:
  - marginal-effects
  - interaction-effects
---

## Overview

Distribution-weighted average marginal effects summarize a fitted model's effects among observations sharing a moderator value or bin. Each observation retains its covariate profile, so frequently observed profiles contribute proportionately more to the summary.

## Key Ideas

- Average derivatives or substantively chosen discrete prediction differences within moderator bins. Sampling weights can replace equal observation weights.
- A marginal effect evaluated at mean covariates generally differs from an average of effects in nonlinear models.
- Setting the moderator to a common value for all observations and then averaging uses a different covariate distribution. DAME instead preserves the composition observed within each moderator group.
- Simulate fitted coefficient vectors, recompute effects, and average within bins for each draw to obtain uncertainty intervals.
- Bin resolution, model specification, and sample representativeness remain consequential. Differences across bins reflect both the response function and changing covariate composition; they do not independently identify the causal effect of intervening on the moderator.

## Important Papers

- [[papers/taking-distributions-seriously-on-the-interpretation-of-the-estimates-of-interactive-nonlinear-models|Taking Distributions Seriously]]: introduces the procedure alongside observed-combination visualizations and four substantive reanalyses.

## Related Concepts

- [[concepts/conditional-marginal-effects|Conditional Marginal Effects]]: the broader conditional-averaging target; causal versions additionally require identification assumptions. DAME is a fitted-model summary and does not itself supply those assumptions.
