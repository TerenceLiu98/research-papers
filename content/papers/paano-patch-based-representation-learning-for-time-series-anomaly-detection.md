---
title: "PaAno: Patch-Based Representation Learning for Time-Series Anomaly Detection"
type: paper
authors:
  - Jinju Park
  - Seokho Kang
year: null
tags:
  - time-series
  - anomaly-detection
  - representation-learning
  - metric-learning
---

## TL;DR

PaAno learns a compact embedding of overlapping time-series patches from normal-only training data, then scores each observed time step by how far its surrounding patch embeddings lie from a coreset memory bank of normal patterns. On the TSB-AD univariate and multivariate evaluation sets, the authors report the best average result among the compared methods on all six range-wise and point-wise measures, using a 0.3M-parameter 1D-CNN. The evidence is broad within TSB-AD, but it does not establish performance under contaminated training data, online memory updates, or deployment-specific alert thresholds.

## Research Question

Can a lightweight, locality-biased patch representation outperform larger forecasting-, reconstruction-, and Transformer-based models for semi-supervised [[concepts/time-series-anomaly-detection|Time-Series Anomaly Detection]] under an evaluation protocol that avoids point adjustment and threshold tuning?

## Motivation

Many recent detectors use large architectures to model long-range dependencies, despite anomalies often being defined by short-range disruptions of otherwise repetitive local patterns. The paper also argues that flawed datasets, point adjustment, and threshold tuning have overstated progress in the field. PaAno therefore combines an explicitly local model with the corrected TSB-AD benchmark and threshold-independent metrics.

## Contributions

- A patch-level representation framework for anomaly detection using a small 1D-CNN rather than a forecasting or reconstruction model.
- A joint objective that combines triplet metric learning with an early-training temporal-consecutiveness pretext task.
- A coreset memory bank of normal patch embeddings and a nearest-neighbor score aggregated over every patch containing a query time step.
- Evaluation against 48 baseline methods across the univariate and multivariate TSB-AD collections, with component ablations, hyperparameter sensitivity tests, and runtime comparisons.

## Method

**Patch encoder.** A unit-stride window extracts overlapping length-$w$ patches from a training sequence assumed to contain only normal observations. Each patch is instance-normalized across its channels and passed through a four-layer 1D-CNN followed by global average pooling, yielding a 64-dimensional embedding. The complete training model adds a two-layer projection MLP and a one-layer classification head; only the encoder is retained for detection.

**Representation objective.** For each anchor, a small temporal shift supplies a positive patch. The negative is the minibatch patch with the largest cosine distance from the anchor in encoder space. A margin triplet loss organizes projected embeddings so shifted versions remain close and dissimilar normal patterns remain separated. A binary pretext loss asks whether two encoder embeddings represent consecutive, non-overlapping patches. Its weight decays from one to zero over the first 20 of 100 training iterations, after which training uses only the triplet objective. This is an application of [[concepts/deep-metric-learning|Deep Metric Learning]] to local temporal patterns.

**Memory and scoring.** The trained encoder maps all normal training patches into a memory bank. K-means coreset selection retains the observed embedding nearest each centroid, with the final bank set to 10% of the original patch set. At inference, each query patch is scored by its mean cosine distance to its three nearest bank vectors. A time point's anomaly score is the mean score of all overlapping patches that contain it.

**Reported configuration.** The main experiments use patch length 96, batch size 512, AdamW, an initial learning rate of $10^{-4}$, triplet margin 0.1, maximum positive shift 2, and five random pairs per anchor for the pretext task. Patch length and learning rate are selected on TSB-AD tuning splits using VUS-PR.

## Experiments

**Protocol.** TSB-AD-U contains 48 tuning and 530 evaluation series; TSB-AD-M contains 20 tuning and 180 evaluation series. The paper compares PaAno with 39 applicable univariate and 31 applicable multivariate baselines from statistical, conventional neural, Transformer, and time-series foundation-model families. Each PaAno experiment is repeated with ten random seeds. VUS-PR is primary, supplemented by VUS-ROC, Range-F1, AUC-PR, AUC-ROC, and Point-F1; point adjustment is excluded.

**Main results.** On TSB-AD-U, PaAno reports VUS-PR 0.53, VUS-ROC 0.89, Range-F1 0.49, AUC-PR 0.47, AUC-ROC 0.87, and Point-F1 0.52, ranking first on every measure. On TSB-AD-M, the corresponding results are 0.43, 0.79, 0.41, 0.38, 0.76, and 0.43, also ranked first; KAN-AD ties the reported Range-F1 at 0.41. Average runtime is 5.4 seconds on TSB-AD-U and 9.7 seconds on TSB-AD-M, faster than every compared Transformer model but not every statistical or conventional neural method.

**Ablations.** Removing instance normalization reduces VUS-PR from 53.0 to 45.3 on TSB-AD-U and from 42.6 to 33.4 on TSB-AD-M. Removing both learned losses gives 48.0 and 35.6; replacing triplet loss with InfoNCE gives 48.3 and 36.2. Removing only the pretext loss has a smaller effect, reaching 51.1 and 42.2. The appendix reports broadly stable averages across tested encoder, memory-bank, neighbor-count, patch-size, and minibatch configurations.

## Limitations

- The method assumes the training segment contains only normal observations. Robustness to contamination, imperfect training splits, and previously unseen normal regimes is not evaluated.
- The proposed queue-based online memory update is a deployment suggestion, not an experiment. It also presupposes a reliable way to decide which recent patches are normal.
- Results are aggregated over one benchmark family. Subset-level scores vary substantially, including low results on some collections, so the averages do not imply uniformly strong detection.
- Runtime is averaged over benchmark series and does not report latency distributions, memory use, hardware-resource scaling, or end-to-end alerting cost. Claims about real-time suitability therefore remain suggestive.
- Threshold-independent ranking metrics avoid threshold-selection bias but do not establish false-alarm rates or operating thresholds for a concrete deployment.
- K-means coreset construction and nearest-neighbor retrieval still scale with the amount and diversity of normal training data; the paper evaluates fixed memory ratios rather than long-running memory maintenance.
- The supplied source does not state the paper's publication year, venue, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/time-series-anomaly-detection|Time-Series Anomaly Detection]]: the observed-time detection task, evaluation choices, and normal-only training assumption used by PaAno.
- [[concepts/deep-metric-learning|Deep Metric Learning]]: the triplet-loss framework used to structure PaAno's patch embeddings.
- [[concepts/time-series-anomaly-prediction|Time-Series Anomaly Prediction]]: a distinct task that estimates future abnormality from earlier context rather than scoring observations already available.
- [[concepts/concept-drift-in-time-series|Concept Drift in Time Series]]: the changing-normal-regime problem that motivates the paper's proposed online memory-bank update.

## Related Papers

- Liu and Paparrizos (2024), "The Elephant in the Room: Towards a Reliable Time-Series Anomaly Detection Benchmark": introduces the TSB-AD benchmark adopted by PaAno.
- Paparrizos et al. (2022), "Volume Under the Surface: A New Accuracy Evaluation Measure for Time-Series Anomaly Detection": introduces the VUS measures used in the evaluation.
- Schroff, Kalenichenko, and Philbin (2015), "FaceNet: A Unified Embedding for Face Recognition and Clustering": source of the triplet-loss formulation adapted by PaAno.
- Roth et al. (2022), "Towards Total Recall in Industrial Anomaly Detection": cited visual-anomaly precedent for coreset memory banks.

[[index|Library home]]
