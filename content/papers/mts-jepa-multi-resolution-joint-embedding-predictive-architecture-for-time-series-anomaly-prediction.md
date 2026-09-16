---
title: "MTS-JEPA: Multi-Resolution Joint-Embedding Predictive Architecture for Time-Series Anomaly Prediction"
type: paper
authors:
  - Yanan He
  - Yunshi Wen
  - Xin Wang
  - Tengfei Ma
year: null
tags:
  - time-series
  - anomaly-prediction
  - self-supervised-learning
  - latent-prediction
---

## TL;DR

MTS-JEPA predicts future time-series code distributions at fine and coarse resolutions, combining a soft prototype bottleneck with reconstruction and momentum targets. A supervised classifier on frozen representations achieves the highest mean F1 and ROC-AUC among the nine compared baselines on MSL, SMAP, SWaT, and PSM. Codebook removal sharply degrades performance, but the non-collapse theorem is conditional and the evaluation does not establish label-free anomaly prediction or zero-shot transfer.

## Research Question

Can multi-resolution latent prediction and a soft codebook produce stable representations that anticipate anomalies in the next multivariate time-series window?

## Motivation

Early-warning cues may appear as brief disturbances or slow trends, while raw-value prediction can emphasize unpredictable noise. The paper applies [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] to future-window prediction and introduces prototype-based latent constraints to address representation collapse. These are motivations for the design; noise suppression and physical regime discovery are not independently established by the benchmark scores.

## Contributions

- A dual-resolution predictive objective using current fine-scale observations to predict both fine and coarse future targets.
- A [[concepts/soft-codebook-bottlenecks|Soft Codebook Bottleneck]] with alignment, entropy, and reconstruction objectives, plus conditional bounds on latent drift and batch variance.
- Evaluation of [[concepts/time-series-anomaly-prediction|Time-Series Anomaly Prediction]] on four datasets, including cross-dataset pretraining, component ablations, and qualitative code analysis.

## Method

**Views and encoders.** Consecutive context and target windows each contain 100 time steps, with stride 100 between context starts. RevIN normalizes each window. Five length-20 patches form the fine view; averaging every five consecutive time points produces a length-20 coarse view. The channel-independent online encoder sees only the current fine view. The target branch embeds both future views, using momentum updates and stopped gradients. Appendix B.2 specifies EMA copies of both encoder and codebook with decay 0.996.

**Prototype representation.** For a patch embedding $h$, normalized feature-prototype similarities define soft assignments and an expected embedding:

$$
p_k=\frac{\exp(\langle\bar h,\bar c_k\rangle/\tau)}{\sum_j\exp(\langle\bar h,\bar c_j\rangle/\tau)},
\qquad z=\sum_k p_k c_k.
$$

The model uses 128 prototypes of dimension 256 and temperature 0.1. These assignments remain continuous distributions, despite the paper's discrete-regime interpretation. A fine predictor forecasts five future code distributions; a coarse predictor uses a learned query to aggregate the context into one future distribution.

**Training.** The objective combines fine and coarse target-to-prediction KL divergences, fine latent MSE, codebook-feature alignment, per-sample entropy minimization, batch-marginal entropy maximization, and reconstruction after reversing normalization. Reconstruction anchors the codes to the observed signal. The six-layer encoder and two-layer predictors are trained with Adam, batch size 128, learning rate $5\times10^{-4}$, and at most 100 epochs on a single RTX 4090 (Appendix B.2).

**Downstream readout.** The encoder and codebook are frozen. Code probabilities are max-pooled across variables, preserving patch and code dimensions, then flattened for an MLP trained with binary cross-entropy. Its input is the context window; the label is positive if any time point in the next window is anomalous. This is a nonlinear supervised readout, not a score requiring the future observation at inference (Appendix B.4).

**Conditional stability.** Appendix A.3 bounds changes in predicted embeddings using codebook radius, predictive KL error, and assumed target smoothness. Its positive variance bound additionally requires sufficiently sharp assignments, multiple active codes, separated prototypes, and quantitative conditions on their margins. A finite convex hull alone does not rule out a constant representation.

## Experiments

**Protocol.** Unlabeled pretraining uses the official training data with a 9:1 training-validation split. The official test stream is split chronologically 6:2:2 for supervised classifier training, threshold selection, and final evaluation. The threshold maximizes validation F1 and is fixed for evaluation. Reported metrics are window-level, with means and standard deviations over five runs.

**Main results.** Tables 1 and 6 report percentages. Best-baseline F1 and AUC can come from different methods.

| Dataset | MTS-JEPA F1, mean +/- SD | Best baseline F1 | MTS-JEPA ROC-AUC, mean +/- SD | Best baseline ROC-AUC |
| --- | --- | --- | --- | --- |
| MSL | 33.58 +/- 4.34 | 28.44 (TimesNet) | 66.08 +/- 3.25 | 64.86 (TS2Vec) |
| SMAP | 33.64 +/- 1.45 | 33.00 (iTransformer) | 65.41 +/- 2.06 | 61.62 (PatchTST) |
| SWaT | 72.89 +/- 0.70 | 71.95 (TS-JEPA) | 84.95 +/- 0.82 | 83.76 (TS2Vec) |
| PSM | 61.61 +/- 4.32 | 58.17 (PatchTST) | 77.85 +/- 1.28 | 75.76 (PatchTST) |

The remaining baselines are K-Means, DeepSVDD, LSTM-VAE, and PAD. Highest mean F1 and AUC do not imply best precision or recall: on SWaT, for example, MTS-JEPA recall is 58.05%, below TS-JEPA's 62.76%.

**Transfer.** Pretraining on the union of the other three datasets gives F1/AUC of 33.48/67.13 on MSL, 33.81/68.88 on SMAP, 71.10/82.96 on SWaT, and 56.87/66.80 on PSM (Table 2). Target-dataset supervised readout training is retained. PSM AUC drops 11.05 percentage points relative to in-domain pretraining; MSL and SMAP mean AUC improve.

**Ablations.** Removing the codebook module yields AUC of 43.02, 51.00, 50.00, and 46.61 on MSL, SMAP, SWaT, and PSM. This intervention also replaces code-distribution KL matching with continuous MSE, so it changes both representation and objective. Removing only codebook losses gives 58.93, 62.06, 82.63, and 75.85 AUC. Removing reconstruction gives 52.68, 52.80, 53.30, and 69.84; removing downsampling gives 63.16, 61.34, 83.60, and 71.72 (Tables 3 and 8).

**Qualitative evidence and cost.** PSM visualizations associate selected code activations with normal versus anomalous signal shapes. Appendix D.3 reports slower inference than PatchTST, with a smaller latency gap at larger batch sizes; numerical timings are not supplied in the Markdown text.

## Limitations

- Self-supervised pretraining is followed by label-dependent MLP training and threshold selection. Cross-domain experiments assess transferable pretraining with target supervision, rather than zero-shot deployment.
- Section 4.2 says forecasting baselines use prediction errors on target data, whereas MTS-JEPA's readout uses context alone. The information available to all baselines at scoring time is therefore not clearly aligned with strict early warning.
- A positive label means any anomaly in the future window. The described protocol does not require the context to be anomaly-free, so these scores alone do not establish warning before a new event's onset. Event lead time and operational false-alarm burden are not reported.
- The stability and non-collapse theorems rely on explicit assumptions. Although Appendix A points to D.2 as evidence that training satisfies them, D.2 presents code-frequency and signal-shape visualizations rather than direct measurements of all theorem conditions throughout training.
- Small mean advantages, such as SMAP F1, accompany run variability; no significance test establishes a reliable improvement for every comparison. Removing the codebook also changes the loss, limiting causal attribution to bottleneck geometry alone.
- Four benchmark datasets and qualitative code associations do not establish physically identified regimes or broad deployment robustness. Inference is slower than PatchTST in the reported comparison.
- The supplied source does not state this paper's publication year, venue, DOI, or arXiv identifier. These are left unspecified.

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]: prediction of learned targets with an asymmetric context-target design.
- [[concepts/time-series-anomaly-prediction|Time-Series Anomaly Prediction]]: future-window risk estimation and its evaluation requirements.
- [[concepts/soft-codebook-bottlenecks|Soft Codebook Bottlenecks]]: differentiable prototype assignments with conditional stability properties.

## Related Papers

- [[papers/joint-embeddings-go-temporal|Joint Embeddings Go Temporal]]: cited temporal JEPA predecessor and the TS-JEPA baseline; its original task is masked temporal representation learning.
- Jhin, Lee, and Park (2023), "Precursor-of-anomaly detection for irregular time series": the PAD anomaly-prediction baseline.
- Van Den Oord, Vinyals, et al. (2017), "Neural discrete representation learning": cited background for prototype-based latent representations.
- Wang et al. (2024), "TimeMixer: Decomposable multiscale mixing for time series forecasting": cited multi-scale forecasting background, not a baseline in Table 1.

[[index|Library home]]
