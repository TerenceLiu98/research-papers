---
title: Concept Drift in Time Series
type: concept
aliases:
  - Temporal Concept Drift
tags:
  - time-series
  - concept-drift
  - online-learning
  - nonstationarity
---

## Overview

Concept drift in time series is a change over time in the predictive relationship between historical inputs and future targets. It is distinct from a change only in the input distribution: drift can alter the conditional mapping a forecaster must learn even when marginal observations appear similar.

## Key Ideas

- **Several forms of change:** Drift may be abrupt, gradual, recurring, or incremental. Different forms imply different detection delays and adaptation strategies.
- **Detection and adaptation are separate:** A system may detect changes without updating its forecaster, or adapt through online learning, ensembling, window selection, or fast and slow parameter pathways without explicitly declaring a change point.
- **Time-dependent validation:** Random train-test splits can mix regimes and obscure drift. Chronological evaluation should report performance before, during, and after changes, along with detection delay and false alarms when a detector is claimed.
- **Model changes are proxies:** Changes in parameters, hidden states, or learned functions can indicate drift, but they can also arise from optimization noise, finite samples, or non-identifiability. A usable detector needs a statistic, threshold, and calibration procedure.
- **Interpretability can support monitoring:** Inspectable lag-response functions can help characterize how a predictive relationship changes, provided their stability and forecasting fidelity are measured.

## Important Papers

- Li et al. (2024), "Concept Drift Adaptation by Exploiting Drift Type": studies adaptation conditioned on different drift forms.
- Wen et al. (2024), "OneNet: Enhancing Time Series Forecasting Models under Concept Drift by Online Ensembling": adapts forecasting through online ensembling.
- Pham et al. (2022), "Learning Fast and Slow for Online Time Series Forecasting," arXiv:2202.11672: combines fast and slow learning pathways for changing series.
- [[papers/kolmogorov-arnold-networks-for-time-series-bridging-predictive-power-and-interpretability|Kolmogorov-Arnold Networks for Time Series: Bridging Predictive Power and Interpretability]]: proposes monitoring changes in learned KAN edge functions, but does not quantitatively evaluate drift detection.

## Related Concepts

- [[concepts/continual-learning|Continual Learning]]: updates models as data and tasks evolve while managing retention and adaptation.
- [[concepts/asynchronous-change-point-detection|Asynchronous Change-Point Detection]]: locates changes that need not occur simultaneously across series.
- [[concepts/nonstationary-functional-time-series|Nonstationary Functional Time Series]]: models time-varying dependence in function-valued observations.
