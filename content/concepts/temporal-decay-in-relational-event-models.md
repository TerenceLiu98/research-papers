---
title: Temporal Decay in Relational Event Models
type: concept
aliases:
  - REM Temporal Decay
  - Relational Event Memory Decay
tags:
  - relational-event-models
  - temporal-decay
  - bayesian-inference
  - network-analysis
---

## Overview

Temporal decay in a [[concepts/relational-event-models|Relational Event Model]] determines how much older events contribute to statistics for the next possible event. Under exponential decay, a half-life expresses the lag after which a past event receives half its earlier weight. The half-life is substantively meaningful because it describes the time horizon over which network mechanisms retain influence, but it also changes the covariates used to estimate their coefficients.

## Key Ideas

- **Weighted event memory:** Exponential weighting gives recent events more influence while retaining a diminishing contribution from the more distant past. A larger half-life represents slower forgetting.
- **Coupled parameters:** The decay parameter and network-effect coefficients jointly determine the likelihood. Treating decay as fixed can bias coefficients and understate uncertainty when the assumed half-life differs from the data-supported value.
- **Joint Bayesian estimation:** A positive half-life can be sampled on the log scale alongside effect coefficients, producing a posterior distribution for both the temporal horizon and the network mechanisms.
- **Prior sensitivity:** Positive-support priors such as gamma distributions can encode domain knowledge and stabilize weak identification. Concentrated priors can also pull the posterior toward their chosen mean, so sensitivity analysis is important.
- **Efficient recomputation:** Precomputing only the lags of past events eligible for each statistic avoids repeatedly reconstructing the event history during MCMC, although computation may still grow quadratically with sequence length.
- **Model scope:** A shared half-life is parsimonious but assumes all temporal mechanisms decay at the same rate. Mechanism-specific half-lives and non-exponential kernels are plausible extensions that require adequate information and careful comparison.

## Important Papers

- Arena, Mulder, and Leenders (2022), "A Bayesian semi-parametric approach for modeling memory decay in dynamic social networks": uses Bayesian averaging to address uncertainty over decay.
- Arena, Mulder, and Leenders (2023), "How fast do we forget our past social interactions?": compares parametric memory-decay forms in relational event models.
- [[papers/fully-bayesian-estimation-of-temporal-decay-in-ordinal-relational-event-models|Fully Bayesian estimation of temporal decay in ordinal relational event models]]: directly estimates exponential half-life with REM coefficients and demonstrates fixed-decay bias.

## Related Concepts

- [[concepts/relational-event-models|Relational Event Models]]: the event-history framework in which decay-weighted network statistics enter the hazard or choice probability.
- [[concepts/discrete-time-hawkes-processes|Discrete-Time Hawkes Processes]]: uses lag kernels to represent decaying excitation in aggregated event counts.
