---
title: Granger Causality
type: concept
aliases:
  - Granger Causal Discovery
  - Nonlinear Granger Causality
tags:
  - causality
  - time-series
  - causal-discovery
---

## Overview

Granger causality describes whether a series' past contributes predictive information about another series beyond the remaining modeled history. In nonlinear autoregressive formulations, this corresponds to dependence of the target's prediction function on the source's past. Interpreting that dependence as a causal relationship requires assumptions about the observed variables, temporal resolution, and data-generating process.

## Key Ideas

- **Condition on the modeled history.** A source's predictive contribution is assessed alongside other available series and the target's own past. Omitted common causes can undermine a causal interpretation.
- **Distinguish lags from instantaneous effects.** The AERCA formulation assumes lagged effects without contemporaneous causal links and introduces its model for stationary time series. These are substantive scope conditions.
- **Separate functional dependence from noise.** An additive model $x_t^{(j)}=f^{(j)}(\mathbf{x}_{<t})+u_t^{(j)}$ distinguishes history-dependent behavior from an exogenous innovation. A large observed deviation need not imply a large innovation if it is predicted by upstream history.
- **Learn nonlinear dependencies with structure.** Neural coefficient matrices permit data-dependent autoregressive interactions. AERCA adds sparsity, temporal smoothness, and a Gaussian constraint on residuals; these inductive biases do not by themselves prove causal identification.
- **Keep graph summaries distinct from lag-specific models.** Aggregating coefficients across time and lags produces a summary graph, while threshold choice affects its discrete edges. Edge-ranking metrics and thresholded F1 or Hamming distance therefore describe different properties.

## Important Papers

- [[papers/root-cause-analysis-of-anomalies-in-multi-variate-time-series-through-granger-causal-discovery|Root Cause Analysis of Anomalies in Multi-Variate Time Series through Granger Causal Discovery]]: AERCA couples graph learning with exogenous-variable estimation for anomaly localization.
- Granger (1969), "Investigating Causal Relations by Econometric Models and Cross-Spectral Methods": the foundational work cited by AERCA.
- Tank et al., "Neural Granger Causality": cited by AERCA for neural models with structured sparsity.
- Marcinkevics and Vogt (2021), "Interpretable Models for Granger Causality Using Self-Explaining Neural Networks": the cited GVAR model.

## Related Concepts

- [[concepts/root-cause-analysis-in-time-series|Root Cause Analysis in Time Series]] uses temporal mechanisms to distinguish disturbances from their propagated effects.
- [[concepts/information-flow-causality|Information-Flow Causality]] defines directed influence through entropy dynamics, a different criterion from predictive dependence.
- [[concepts/causal-representation-learning|Causal Representation Learning]] addresses learning causal variables and structure when the units themselves may not be directly observed.
