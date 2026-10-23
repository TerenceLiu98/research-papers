---
title: Adaptive Temporal-Context Routing
type: concept
aliases:
  - Variable-Context Routing
  - Temporal-Scale Routing
tags:
  - time-series-forecasting
  - adaptive-context
  - mixture-of-experts
  - nonstationarity
---

## Overview

Adaptive temporal-context routing chooses how much contiguous history a time-series model processes for each input. Instead of fixing one look-back length for all samples, a router constructs or selects short-, medium-, and long-horizon contexts according to the current signal. Experts can then specialize by temporal scale while preserving the ordering and continuity of observations within each context.

## Key Ideas

- **Context length is conditional.** The useful historical horizon may change across regimes, entities, and forecast times. A router can contract the receptive field during abrupt changes and expand it when older observations remain informative.
- **Contiguity distinguishes scale routing from token routing.** Token-level mixture-of-experts systems group patches by content, potentially across distant positions. Temporal-context routing assigns an expert a contiguous horizon so that attention can model interactions within that scale.
- **Nested contexts create structured redundancy.** Longer windows contain shorter ones, so expert representations can become correlated. Aggregation mechanisms and diversity regularization should account for this overlap rather than treating experts as independent.
- **A global path can hedge selective routing.** A parallel representation of the complete available history preserves information that local context selection may omit.
- **Adaptation remains bounded by design choices.** The maximum history, patch resolution, routing thresholds, and expert count define what contexts are available. Sensitivity and out-of-regime evaluation are therefore necessary even when selection is learned.

## Important Papers

- [[papers/raven-a-regime-aware-variable-context-expert-network-for-financial-time-series-forecasting|RAVEN: A Regime-Aware Variable-context Expert Network for Financial Time Series Forecasting]] learns patch importance, uses cumulative thresholds to create nested recent-history windows, and routes them to scale-specialized experts.
- Corsi (2009), "A Simple Approximate Long-Memory Model of Realized Volatility": combines designer-fixed daily, weekly, and monthly horizons and motivates multi-horizon financial modeling.
- Zhang et al. (2025), "Multi-period Learning for Financial Time Series Forecasting": fuses predefined financial look-back periods rather than selecting sample-dependent context lengths.

## Related Concepts

- [[concepts/sparse-mixture-of-experts|Sparse Mixture of Experts]]: the broader conditional-computation framework within which routing can define expert specialization.
- [[concepts/concept-drift-in-time-series|Concept Drift in Time Series]]: a reason the predictive value of older observations can change over time.
- [[concepts/nonstationary-functional-time-series|Nonstationary Functional Time Series]]: time-varying dependence in function-valued sequences.
