---
title: Root Cause Analysis in Time Series
type: concept
aliases:
  - Time-Series Root Cause Analysis
  - Root Cause Localization in Multivariate Time Series
tags:
  - time-series
  - root-cause-analysis
  - anomaly-detection
  - causality
---

## Overview

Root cause analysis in multivariate time series seeks the variables, and sometimes the specific time steps, where an abnormal event originates. Because disturbances can propagate through temporal dependencies, identifying every abnormal measurement is insufficient to identify the original intervention. The meaning of a root cause depends on the assumed system model and intervention class.

## Key Ideas

- **Distinguish origin from propagation.** In an additive temporal structural model, an upstream intervention changes an exogenous input. Downstream observations can become abnormal while remaining predictable from their parents' histories.
- **Use a normal reference mechanism.** AERCA learns on normal observations, estimates each current exogenous input as an autoregressive residual, and scores its deviation from the normal residual distribution. This interpretation depends on the learned mechanism remaining applicable.
- **Separate graph recovery from localization.** A graph can describe dependency pathways without providing a calibrated score for where a disturbance began. AERCA explicitly models exogenous behavior to connect the two tasks.
- **State the intervention class.** Additive exogenous shocks, persistent interventions, and changes to the structural mechanism are distinct possibilities. Evidence for one should not be generalized to the others without evaluation.
- **Match evaluation to the target.** Variable-level ranking collapses repeated interventions on a series, while time-specific ranking considers variable-time candidates. AERCA's AC@K uses $\min(K,\text{number of true roots})$ as its denominator, so it should not be interpreted as ordinary recall at every K. Large K can also saturate in low-dimensional systems.
- **Retain operational assumptions.** Hidden confounding, instantaneous effects, misspecified normal behavior, and dependent exogenous inputs can compromise residual-based attribution. Strong synthetic recovery does not resolve these issues in real systems.

## Important Papers

- [[papers/root-cause-analysis-of-anomalies-in-multi-variate-time-series-through-granger-causal-discovery|Root Cause Analysis of Anomalies in Multi-Variate Time Series through Granger Causal Discovery]]: AERCA estimates exogenous variables and scores interventions at individual time steps.
- Li et al. (2022), "Causal Inference-Based Root Cause Analysis for Online Service Systems with Intervention Recognition": CIRCA, evaluated as a baseline in AERCA.
- Ikram et al. (2022), "Root Cause Analysis of Failures in Microservices through Causal Discovery": RCD, evaluated as a baseline in AERCA.
- Budhathoki et al. (2022), "Causal Structure-Based Root Cause Analysis of Outliers": cited by AERCA as using prior causal-structure knowledge.

## Related Concepts

- [[concepts/granger-causality|Granger Causality]] provides a temporal dependency model used by AERCA.
- [[concepts/time-series-anomaly-prediction|Time-Series Anomaly Prediction]] targets future abnormality; localization based on current residuals becomes available after observing the current measurement.
- [[concepts/causal-representation-learning|Causal Representation Learning]] connects structural models with learned latent or exogenous variables, although AERCA assumes the observed series define the modeled units.
