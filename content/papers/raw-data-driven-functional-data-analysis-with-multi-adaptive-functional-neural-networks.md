---
title: "Raw-Data Driven Functional Data Analysis with Multi-Adaptive Functional Neural Networks for Ergonomic Risk Classification Using Facial and Bio-Signal Time-Series Data"
type: paper
authors:
  - Suyeon Kim
  - Afrooz Shakeri
  - Seyed Shayan Darabi
  - Eunsik Kim
  - Kyongwon Kim
year: 2025
doi: "10.3390/s25154566"
tags:
  - functional-data-analysis
  - adaptive-basis-layers
  - multimodal-learning
  - ergonomic-risk
---

## TL;DR

Multi-AdaFNN assigns separate learned functional bases to facial-motion and physiological channels, then fuses their projection coefficients to classify three lifting-risk levels. Full fusion achieves reported accuracy 0.6370 and AUC 0.6320 over 100 sample-level splits. The study supports a multichannel extension of adaptive basis learning, but does not establish generalization to unseen participants; several narrative claims also conflict with its result tables.

## Research Question

Can channel-specific learned functional representations combine facial landmark trajectories, ECG, and EDA to distinguish low-, medium-, and high-risk lifting conditions?

## Motivation

Fixed functional bases need not preserve response-relevant temporal patterns. Facial movement and physiological responses may provide complementary signals of exertion, motivating supervised representation learning across synchronized channels without extensive handcrafted biosignal features.

## Contributions

- Extends AdaFNN with a dedicated adaptive basis layer for each input trajectory and a shared classifier over concatenated coefficients.
- Evaluates five input configurations, including full fusion and functional-variable-selection variants.
- Reports repeated-split comparisons with an LSTM and execution-time trade-offs between full and reduced inputs.

## Method

For channel $f$ and basis $k$, a time-input micro-network produces $\beta_{f,k}(t)$. Trapezoidal quadrature approximates

$$
c_{f,k}=\int_0^1 \beta_{f,k}(t)X_f(t)\,dt.
$$

The $KF$ coefficients feed a two-hidden-layer MLP and three-class softmax. Tanh micro-networks, ReLU classifier layers, normalization, dropout, sparsity penalties, and cosine-similarity penalties support joint training. Inverse-frequency weighted cross-entropy handles class imbalance; Adam uses learning rate 0.0001, up to 500 epochs, and early stopping after 20 epochs without validation improvement.

Facial inputs are consecutive-frame Euclidean landmark displacements, rather than unprocessed images. ECG and EDA are averaged in groups of ten samples to align 300 Hz recordings with 30 Hz video. Sequences have 5300 time points, with zero-padding described for shorter videos. A functional generalized additive model selects 12 of 468 facial trajectories from the initial training split; these indices are reused across subsequent splits.

## Experiments

The laboratory study recruits 20 participants and reports 222 trials. Risk labels derive from lifting-index conditions using the revised NIOSH lifting equation. Evaluation uses 100 stratified 70/30 sample-level train/test splits, with three-fold training-set hyperparameter tuning described in the methods.

Table 4 reports mean ± SD for Multi-AdaFNN:

| Inputs | Accuracy | Weighted F1 | AUC |
| --- | --- | --- | --- |
| 468 facial trajectories | 0.6164 ± 0.0548 | 0.7299 ± 0.0547 | 0.6114 ± 0.0552 |
| ECG + EDA | 0.4352 ± 0.0910 | 0.5093 ± 0.0516 | 0.3179 ± 0.0834 |
| All 470 channels | 0.6370 ± 0.0589 | 0.7546 ± 0.0571 | 0.6320 ± 0.0599 |
| 12 selected facial trajectories | 0.4355 ± 0.0543 | 0.6363 ± 0.0663 | 0.4122 ± 0.0779 |
| Selected facial + biosignals | 0.4485 ± 0.0636 | 0.6480 ± 0.0622 | 0.4421 ± 0.0768 |

Full fusion improves accuracy by 2.06 percentage points over all facial trajectories. Reducing facial channels substantially lowers performance. For full fusion, the LSTM reports accuracy 0.4621 and AUC 0.2972. However, the LSTM exceeds Multi-AdaFNN accuracy on biosignals alone (0.5373 versus 0.4352) and selected facial inputs (0.4997 versus 0.4355), contrary to the prose claim of superiority on every dataset.

Across 50 timing runs, full-fusion Multi-AdaFNN averages 20 min 3 s, versus 1 min 1 s for LSTM. Reduced fusion takes 1 min 29 s. These are execution-time measurements, not demonstrated online inference latency.

## Limitations

- Repeated sample-level splits permit participant overlap. Low variance across these splits does not resolve subject leakage or demonstrate performance on unseen workers, despite the argument in Section 4.1.
- Feature selection is fixed from an initial split rather than nested independently within every later split. Sections 3.5–3.6 are also ambiguous about whether tuning is fixed initially or repeated for each split.
- The source's claim that every configuration exceeds chance conflicts with Table 4 AUC values below 0.5 for three configurations. ROC figures show selected best-F1 runs rather than average performance. Metrics above are transcribed as reported, not independently verified.
- The small controlled sample, wearable camera setup, motion artifacts, and environmental variability limit workplace transfer. Signals may measure effort or stress rather than risk specifically; labels are task-defined, not observed injury outcomes.
- Data are available on request. Real-time deployment and injury prevention remain proposed applications.

## Related Concepts

- [[concepts/adaptive-basis-layers|Adaptive Basis Layers]]: the reusable representation mechanism extended here from a functional input to channel-specific projections and coefficient fusion.

## Related Papers

- [[papers/deep-learning-for-functional-data-analysis-with-adaptive-basis-layers|Deep Learning for Functional Data Analysis with Adaptive Basis Layers]]: the foundational AdaFNN architecture cited and extended by this study.

Source: *Sensors* 25 (2025), 4566. [Publisher DOI](https://doi.org/10.3390/s25154566).
