---
title: "SimDif: Simpler Yet Better Diffusion Model for Time Series Point Forecasting"
type: paper
authors:
  - Hang Ding
  - Xue Wang
  - Tian Zhou
  - Tao Yao
year: null
tags:
  - time-series
  - diffusion-models
  - point-forecasting
---

[[index|Library home]]

## TL;DR

SimDif uses one conditional Transformer as both denoiser and forecaster, independently normalizes training history and targets, and aggregates generated forecasts with median-of-means. It reports the best MSE on six of nine datasets and second place on the other three, without an auxiliary pretrained predictor.

## Research Question

Can a diffusion model retain useful sample diversity while producing accurate point forecasts through a single end-to-end network?

## Motivation

Forecast samples must reflect historical context closely enough for aggregation to help. The paper argues that unconstrained sample variability hurts point accuracy, while conditioning diffusion on a separate regressor adds complexity and can restrict diversity.

## Contributions

- A unified patch-based Transformer denoiser and predictor.
- Normalization independence to decouple historical and future statistics during training.
- Repeated median-of-means aggregation for robust point estimation from generated samples.
- Comparisons of point error, probabilistic scores, component ablations, and single-sample latency.

## Method

The conditional diffusion process corrupts future targets with Gaussian noise and learns to reconstruct clean futures from noisy states and historical context. The backbone uses overlapping patches, a diffusion-time token, rotary positional embeddings, and channel-independent processing. It removes the U-ViT-style skip connections discussed in the source. Training minimizes a noise-level-weighted absolute reconstruction error (Section 2).

**Normalization independence.** History is standardized using its own mean and standard deviation, then transformed by learned affine parameters. Training targets are separately standardized using their own statistics before corruption. At inference, sampling starts from standard Gaussian noise, and forecasts are restored using historical statistics and the learned affine parameters. Future statistics are used only in training; the supplied algorithm does not estimate them directly at inference.

**Aggregation.** Divide generated samples into groups, compute each group's mean, and take the median of the group means. Repeat with shuffled partitions and average the resulting medians. This is the paper's repeated variant of [[concepts/median-of-means|Median-of-Means]].

## Experiments

Table 2 reports five-run mean MSE across nine multivariate datasets, with an average rank of 1.33. Selected results are shown below; smaller is better.

| Dataset | SimDif | mr-Diff | PatchTST |
| --- | --- | --- | --- |
| NorPool | 0.534 | 0.645 | 0.547 |
| Electricity | 0.145 | 0.155 | 0.147 |
| ETTh1 | 0.394 | 0.411 | 0.405 |
| Weather | 0.299 | 0.296 | 0.302 |
| Traffic | 0.383 | 0.474 | 0.385 |

SimDif does not win every dataset: SCINet scores 0.095 on Caiso versus 0.106, and NBeats scores 0.373 on Traffic versus 0.383. The authors report an average 8.3% MSE reduction relative to mr-Diff.

**Probabilistic scores (Table 1).** SimDif reports CRPS/CRPS-sum of 0.22/0.019 on Electricity, 0.16/0.039 on Traffic, and 0.41/0.057 on Wikipedia. Taxi is weaker: 0.42/0.166, compared with D3VAE's 0.35/0.130.

**Ablations (Tables 4–5).** Removing normalization independence raises Weather MSE from 0.299 to 0.328 and NorPool from 0.534 to 0.555. On ETTh1, single-sample prediction, averaging, and median-of-means score 0.408, 0.398, and 0.394 respectively; Weather scores are 0.317, 0.305, and 0.299.

**Latency (Table 6).** Single-sample ETTh1 inference is reported as 0.22 ms at horizon 96 and 0.46 ms at horizon 720, versus TimeDiff's 4.73 and 8.40 ms. These are single-inference measurements, not complete ensemble timings.

## Limitations

- Detailed experimental settings and theoretical arguments are deferred to an appendix absent from the supplied Markdown; ensemble size, partition settings, and full timing conditions cannot be established here.
- Probabilistic quality is not uniformly best, particularly on Taxi. Point-error improvements alone do not establish predictive calibration.
- Historical-statistics denormalization remains part of inference; the normalization ablation supports empirical benefit rather than a general guarantee of recovering arbitrary future scale shifts.
- Publication year and stable paper identifiers are not supplied and remain unspecified. The parsed text alternates SimDif and SimDiff; this page follows the title's SimDif spelling.

## Related Concepts

- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time Series Forecasting]]
- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/median-of-means|Median-of-Means]]

## Related Papers

- [[papers/predict-refine-synthesize-self-guiding-diffusion-models-for-probabilistic-time-series-forecasting|Predict, Refine, Synthesize]]: TSDiff appears in the probabilistic comparison; its library page describes unconditional diffusion with observation self-guidance.
- Shen and Kwok (2023), “Non-autoregressive Conditional Diffusion Models for Time Series Prediction”: TimeDiff comparator.
- Shen, Chen, and Kwok (2024), “Multi-Resolution Diffusion Models for Time Series Forecasting”: mr-Diff comparator.
- Li et al. (2024), “Transformer-Modulated Diffusion Models for Probabilistic Multivariate Time Series Forecasting”: TMDM comparator with a jointly trained predictor.
