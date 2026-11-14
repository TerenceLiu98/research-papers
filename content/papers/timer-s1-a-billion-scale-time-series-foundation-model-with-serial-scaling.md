---
title: "Timer-S1: A Billion-Scale Time Series Foundation Model with Serial Scaling"
type: paper
authors: [Yong Liu, Xingjian Su, Shiyu Wang, Haoran Zhang, Haixuan Liu, Yuxuan Wang, Zhou Ye, Yang Xiang, Jianmin Wang, Mingsheng Long]
year: 2026
tags: [time-series-forecasting, foundation-models, mixture-of-experts, serial-token-prediction]
---

[[index|Library home]]

## TL;DR

Timer-S1 combines sparse expert routing with serial prediction blocks that allocate progressively more computation to later forecast patches. The April 10, 2026 technical report describes 8.3B total parameters, 0.75B activated parameters per token, and an 11,520-point context. It reports GIFT-Eval MASE of 0.693 and CRPS of 0.485 after trillion-point pretraining and capability-focused post-training.

## Research Question

Can time-series models scale effectively by performing serial computations across forecast horizons without repeatedly running the entire backbone for each predicted patch?

## Motivation

Next-token forecasting repeatedly rolls predictions into the input, increasing inference cost and error accumulation. Parallel multi-token heads reduce rolling but use shared representations to predict multiple horizons at once. The authors propose making forecast horizon correspond to additional network depth, preserving serial computation within a forward pass.

## Contributions

- TimeSTP blocks implement serial-token prediction while retaining the same prediction components during training and inference.
- A sparse decoder-only architecture scales to 8.3B parameters with 24 main TimeMoE blocks and 16 TimeSTP blocks.
- TimeBench supplies 1,032 billion regularly sampled points, with resampling and sign-flipping augmentation.
- Continued pretraining emphasizes shorter horizons and extends the context from 2,880 to 11,520 points.

## Method

Inputs are normalized using their own mean and standard deviation, divided into 16-point patches, and embedded together with padding masks. The backbone uses causal attention, rotary positions, query-key normalization, and sparse expert routing with 32 experts and top-2 selection; hidden width is 1,024.

Each TimeSTP block concatenates normalized representations from the preceding block with the original input embeddings, projects them back to the hidden dimension, and applies a TimeMoE block. A shared head predicts the next patch from the main backbone and progressively later patches from successive TimeSTP blocks. Future ground-truth patches are targets, not inputs to these blocks. At inference, last-token representations generate forecasts and the requested horizon determines how many available STP blocks execute. The configured model produces up to 272 points per pass; the single-pass claim is bounded by this capacity (Sections 3.2 and 4.2).

The shared head predicts quantiles 0.1 through 0.9 using weighted quantile loss. Pretraining combines next-token, uniformly weighted serial-token, and expert-balancing losses. Post-training weights STP depth j by 1/sqrt(j), mixes GIFT-Eval Pretrain short-term data with revisited TimeBench data, and extends rotary-position context. The authors report removing potential GIFT-Eval test leakage from the corpus (Section 4).

## Experiments

GIFT-Eval covers 24 datasets, 144,000 series, and 177 million points. Reported aggregate results are MASE 0.693 and CRPS 0.485, with 7.6% lower MASE and 13.2% lower CRPS than Timer-3/Sundial trained on the same TimeBench corpus. The report claims leading leaderboard performance at publication, with particularly strong medium- and long-horizon results; this is a historical reported comparison.

At an equal count of 40 blocks, the 24-main/16-STP model outperforms 40-block next-token and multi-token variants. This matches block count, not necessarily every computational or parameter budget. Continued pretraining and context extension improve the reported results. Ablations find worse performance when future shifted tokens enter STP training, when STP blocks are discarded at inference, or when TimeBench pretraining is omitted. Resampling improves frequency robustness, but sinusoidal tests retain an error spike near the 16-point patch period (Section 5).

## Limitations

The model uses univariate context and does not natively incorporate exogenous covariates or cross-variable interactions. Adaptive performance across short and long horizons remains an open issue. The fixed patch-size error spike shows residual frequency sensitivity. Many ablation and latency results appear only in figures in the supplied Markdown, so exact effect sizes are not transcribed here. Agentic multimodal forecasting is proposed future work, not an evaluated capability.

## Related Concepts

- [[concepts/serial-token-prediction|Serial-Token Prediction]]
- [[concepts/time-series-foundation-models|Time Series Foundation Models]]
- [[concepts/sparse-mixture-of-experts|Sparse Mixture of Experts]]
- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time Series Forecasting]]

## Related Papers

- [[papers/a-decoder-only-foundation-model-for-time-series-forecasting|A Decoder-Only Foundation Model for Time-Series Forecasting]]: cited multi-token forecasting precursor, contrasting larger output patches with serial prediction blocks.
- [[papers/moirai-moe-empowering-time-series-foundation-models-with-sparse-mixture-of-experts|MOIRAI-MOE]]: cited prior sparse-expert time-series foundation model.
- Liu et al., “Sundial: A Family of Highly Capable Time Series Foundation Models” (2025), arXiv:2502.00816: Timer-3 predecessor and same-corpus comparison.

Model release listed in the source: [Timer-S1](https://huggingface.co/bytedance-research/Timer-S1).
