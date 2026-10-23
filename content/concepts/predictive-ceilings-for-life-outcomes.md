---
title: Predictive Ceilings for Life Outcomes
type: concept
aliases:
  - Predictive Upper Bounds for Life Outcomes
tags:
  - life-outcome-prediction
  - predictive-uncertainty
  - aleatoric-uncertainty
  - computational-social-science
---

## Overview

A predictive ceiling is an assumption-dependent upper bound on attainable performance for a specified outcome, horizon, information set, metric, and population. In life-outcome research, it can be estimated by simulating known stochastic mechanisms while making relevant predictors perfectly observable. The resulting error measures randomness built into that simulation, not an unconditional or timeless limit on prediction.

## Key Ideas

- **The ceiling is task-specific.** Changing the outcome window, class prevalence, performance metric, decision threshold, or target population can change the bound.
- **Aleatoric and epistemic uncertainty are difficult to separate empirically.** Variation treated as chance may become predictable with better biological or behavioral measurements; omitted stochastic pathways can make the simulated ceiling too optimistic.
- **Observed performance and the ceiling answer different questions.** The first measures what current data and models achieved. The second estimates what could be achieved if selected predictors were perfectly known and only modeled random events generated errors.
- **Sensitivity analysis is essential.** When a poorly known quantity controls stochastic outcomes, the ceiling should be reported across credible assumptions rather than as one universal number.
- **Large samples do not guarantee proximity to the ceiling.** Missing subjective variables, measurement mismatch, temporal distance from the outcome, and weak individual-level effects can remain limiting even in full-population administrative data.
- **A ceiling is not a causal decomposition.** The remaining gap can combine omitted predictors, limited methods, measurement error, distribution shift, and unmodeled chance.

## Important Papers

- [[papers/births-are-difficult-to-predict-even-with-rich-survey-and-full-population-register-data|Births are difficult to predict even with rich survey and full-population register data]]: simulates conception timing, fetal survival, and contraceptive failure to bound three-year fertility prediction under alternative assumptions.
- Salganik et al. (2020), *Measuring the predictability of life outcomes with a scientific mass collaboration*: establishes a competitive empirical design for estimating current predictive performance across many modeling teams.
- Lundberg et al. (2024), *The origins of unpredictability in life outcome prediction tasks*: analyzes how data, sample size, and other constraints contribute to observed prediction error.

## Related Concepts

- [[Conditional Prediction Coverage]]: concerns whether uncertainty sets attain target coverage overall or for particular inputs, rather than the maximum achievable classification score.
- [[Probability Calibration]]: evaluates agreement between predicted probabilities and observed frequencies, a distinct property from a predictive ceiling.
