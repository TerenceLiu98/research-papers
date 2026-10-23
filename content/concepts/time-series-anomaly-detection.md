---
title: Time-Series Anomaly Detection
type: concept
aliases:
  - TSAD
  - Temporal Anomaly Detection
tags:
  - time-series
  - anomaly-detection
  - evaluation
---

## Overview

Time-series anomaly detection assigns anomaly scores or labels to observed time points or intervals whose behavior differs from expected temporal patterns. Unlike ordinary point-outlier detection, the abnormality of an observation may depend on its local context, duration, sequence position, or relationships among variables. The task is distinct from [[concepts/time-series-anomaly-prediction|Time-Series Anomaly Prediction]], which estimates future abnormality before the target observations are available.

## Key Ideas

- **Training supervision varies.** Unsupervised methods learn from unlabeled mixtures, semi-supervised methods assume normal-only training data, and supervised methods use labeled normal and anomalous examples. These regimes make different assumptions about anomaly prevalence and data cleanliness.
- **Anomalies can be point-wise or contextual.** A value may be globally unusual, or anomalous only relative to neighboring values, seasonality, duration, or cross-channel dependencies. Sliding patches provide one way to expose that local context.
- **Scores and decisions are different objects.** A detector usually produces a continuous score. Operational labels additionally require a threshold and an alert policy, whose selection data and costs should be reported separately.
- **Evaluation is sensitive to temporal structure.** Point adjustment can turn one correctly detected point into credit for an entire anomalous interval. Threshold tuning on test labels can also inflate results. Threshold-independent AUC and volume-under-surface measures reduce some of these problems, while range-aware measures explicitly score anomalous intervals.
- **Benchmark averages conceal heterogeneity.** Dataset labeling, anomaly duration, dimensionality, and the location of train-test splits affect apparent performance. Results should be inspected by dataset or subset as well as in aggregate.
- **Deployment adds non-stationarity.** Normal behavior may drift after training. Updating prototypes or memory banks can adapt a detector, but admitting predicted-normal observations risks incorporating undetected anomalies.
- **Normality may depend on an operating regime.** A detector can condition expected dynamics on a latent environment so that benign regime changes are not automatically treated as faults. The inferred regimes still require validation: using a code at inference does not by itself establish that it corresponds to a real causal state.

## Important Papers

- [[papers/paano-patch-based-representation-learning-for-time-series-anomaly-detection|PaAno]] learns local patch embeddings from normal data and evaluates nearest-memory anomaly scores on TSB-AD.
- [[papers/a-causal-perspective-on-soft-jump-diffusion-for-time-series-anomaly-detection|A Causal Perspective on Soft Jump-Diffusion for Time-Series Anomaly Detection]] conditions latent stochastic dynamics on inferred environments and scores deviations with a soft jump mechanism.
- Liu and Paparrizos (2024), "The Elephant in the Room: Towards a Reliable Time-Series Anomaly Detection Benchmark," introduces TSB-AD and documents benchmark pathologies.
- Paparrizos et al. (2022), "Volume Under the Surface: A New Accuracy Evaluation Measure for Time-Series Anomaly Detection," develops range-aware, threshold-independent VUS measures.
- Kim et al. (2022), "Towards a Rigorous Evaluation of Time-Series Anomaly Detection," studies evaluation choices that can distort method comparisons.
- Boniol et al. (2024), "Dive into Time-Series Anomaly Detection: A Decade Review," surveys the modern field.

## Related Concepts

- [[concepts/time-series-anomaly-prediction|Time-Series Anomaly Prediction]]
- [[concepts/concept-drift-in-time-series|Concept Drift in Time Series]]
- [[concepts/deep-metric-learning|Deep Metric Learning]]
- Representation learning
- Change-point detection
- Outlier detection
