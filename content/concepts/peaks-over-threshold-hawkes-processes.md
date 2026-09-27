---
title: Peaks-Over-Threshold Hawkes Processes
type: concept
aliases:
  - POT Hawkes Models
  - Two-Tailed Peaks-Over-Threshold Hawkes Model
  - 2T-POT Hawkes Model
tags:
  - hawkes-processes
  - extreme-value-theory
  - temporal-point-processes
---

## Overview

Peaks-over-threshold Hawkes models combine a self-exciting process for the arrival of threshold exceedances with a distribution for their excess magnitudes. They provide a conditional extreme-value model in which past extremes raise the probability of future extremes. In financial applications, this offers an alternative to deriving extreme-event dynamics from volatility estimated using all returns.

## Key Ideas

- **Timing and magnitude are separate components:** A Hawkes intensity describes when extremes arrive, while a generalized Pareto distribution describes how far they cross a threshold. Marks can make larger extremes trigger stronger excitation, and the magnitude scale can depend on current intensity.
- **Two tails can share arrivals:** The 2T-POT common-intensity construction draws each event from one of two tails with equal probability. The resulting daily tail probabilities sum to at most one. This avoids assigning incompatible probabilities to mutually exclusive loss and gain events.
- **Shared probability does not force symmetry:** Source-tail branching strengths, decay rates, magnitude impacts, and Pareto parameters may differ even when the two tail-arrival probabilities are equal. Constraining all such pairs to equality recovers a symmetric model of absolute exceedances.
- **The threshold changes the dynamics:** Moving a threshold changes both the sample of excess magnitudes and the history of excitation events. Threshold selection therefore affects more than the usual Pareto approximation versus sample-size tradeoff.
- **A tail model may need a bulk completion:** If the current exceedance probability is smaller than a requested forecast coverage, the quantile lies outside the modeled tail. Matching a conditional bulk CDF to both threshold probabilities supplies a full distribution. In Tomlinson et al. (2022), bulk location and scale follow Hawkes intensity.
- **Coverage and severity require different checks:** Violation frequencies and their temporal dependence assess quantiles; discrepancies conditional on violations assess tail expectations. Fewer rejections on one diagnostic need not imply better performance on another, especially with sparse violations.

## Important Papers

- [[papers/2t-pot-hawkes-model-for-left-and-right-tail-conditional-quantile-forecasts-of-financial-log-returns-out-of-sample-comparison-of-conditional-evt-models|2T-POT Hawkes model for left- and right-tail conditional quantile forecasts of financial log-returns]]: improves estimation, supplies a subordinate bulk distribution, and compares six equity indices over multiple thresholds and coverage levels (Sections II-IV).
- Tomlinson, Greenwood, and Mucha-Kruczynski (2021), "Asymmetric excitation of left- and right-tail extreme events probed using a Hawkes model: Application to financial returns": the preceding two-tail construction, cited as reference [34] in the 2022 manuscript.
- Chavez-Demoulin, Davison, and McNeil (2005), "Estimating value-at-risk: a point process approach": early financial application, cited as reference [27] in the 2022 manuscript.

## Related Concepts

- [[concepts/temporal-leverage-effect|Temporal Leverage Effect]]: loss/gain asymmetry in both total excitation and its time scale.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: flexible kernel inference offers a different modeling choice from the fixed exponential kernels used in this 2T-POT application.
- [[concepts/dynamic-hawkes-processes|Dynamic Hawkes Processes]]: models changing responsiveness through time modulation and rescaling, distinct from the source-tail asymmetry in 2T-POT.
