---
title: Time-Series Anomaly Prediction
type: concept
aliases:
  - Future-Window Anomaly Prediction
tags:
  - time-series
  - anomaly-prediction
  - early-warning
---

## Overview

Time-series anomaly prediction estimates whether a future interval will contain abnormal behavior from observations available beforehand. Its target is future anomaly status, whereas anomaly detection labels observed behavior and numerical forecasting predicts future signal values.

## Key Ideas

- **Specify the information boundary.** A prediction from context $X_t$ should be evaluated against a later window's label $y_{t+1}$. A score requiring observed target-window values has a different availability time.
- **Define window labels explicitly.** MTS-JEPA labels a future window anomalous if any constituent time point is anomalous. Window length therefore affects the target and interpretation of reported scores.
- **Separate future status from new-event warning.** An already abnormal context may predict continued abnormality. Claims about anticipating onset require attention to context status, event boundaries, and lead times.
- **Separate representation training from supervision.** Unlabeled pretraining can support a labeled downstream classifier. A frozen encoder does not make the complete pipeline unsupervised, and transfer of pretraining with target labels is not zero-shot prediction.
- **Validate decisions chronologically.** MTS-JEPA trains a readout, chooses an F1 threshold, and evaluates it on successive chronological splits. ROC-AUC assesses ranking, while thresholded F1, precision, and recall assess a chosen decision rule; neither alone measures operational warning usefulness.

## Important Papers

- [[papers/mts-jepa-multi-resolution-joint-embedding-predictive-architecture-for-time-series-anomaly-prediction|MTS-JEPA]] learns fine and coarse future code targets and evaluates a supervised future-window classifier on frozen representations.
- Jhin, Lee, and Park (2023), "Precursor-of-anomaly detection for irregular time series," is cited and evaluated as PAD in MTS-JEPA.

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] provide a latent prediction objective for learning temporal features.
- [[concepts/soft-codebook-bottlenecks|Soft Codebook Bottlenecks]] represent temporal patterns through prototype assignments used by MTS-JEPA's readout.
