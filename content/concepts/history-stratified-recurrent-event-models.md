---
title: History-Stratified Recurrent Event Models
type: concept
tags:
  - recurrent-events
  - survival-analysis
  - conditional-intensity
---

## Overview

A history-stratified recurrent event model lets event intensity depend on previous events through a finite stratum variable. It provides history-conditioned comparisons without requiring every detail of the past to enter the intensity. The reduction to a summary is a modeling assumption about which aspects of history matter.

## Key Ideas

For a history summary $S_i(a)=s$ and fixed covariates $Z_i$, a stratified Cox specification is

$$
\lambda(a\mid\mathcal H_i(a),Z_i)=\lambda_{0s}(a)\exp(\beta_s^\top Z_i).
$$

- Both baseline intensity and covariate coefficients may vary across strata. Chen, Hu, and Rosychuk (2025) use a finite-valued, left-continuous, nondecreasing summary; their main example distinguishes no prior event from at least one prior event.
- A first-versus-subsequent-event summary allows associations to reverse between strata. Pooling them into one coefficient can conceal those differences.
- Left censoring can make initial membership latent. Before a subject's first observed event, either stratum may be possible; after that event, the subject is known to have a prior event. Conditional membership probabilities can replace unknown indicators in estimating equations.
- Conditional intensities answer questions given event history. Marginal rate models average over histories and address different comparisons.
- A two-stratum summary does not separately model the number of previous events or elapsed time since the last event. Those distinctions require a richer specification.
- With [[zero-truncated-recurrent-event-data|Zero-Truncated Recurrent Event Data]], estimation must also account for missing subjects with zero events in the extraction window. Census risk-set approximation and latent-history weighting address different missing-information problems.

## Important Papers

- [[stratified-regression-analysis-of-zero-truncated-recurrent-event-data|Stratified Regression Analysis of Zero-Truncated Recurrent Event Data]]: develops stratified intensity estimation with census information and partially known history summaries.
- Andersen and Gill (1982), "Cox's Regression Model for Counting Processes: A Large Sample Study": the counting-process foundation cited by Chen, Hu, and Rosychuk; removing stratification yields its model in this formulation.

## Related Concepts

- [[zero-truncated-recurrent-event-data|Zero-Truncated Recurrent Event Data]]: selection on having at least one observed event, which changes the cohort's relationship to the population risk set.
