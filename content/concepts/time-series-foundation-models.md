---
title: Time Series Foundation Models
type: concept
aliases:
  - TSFMs
tags:
  - time-series-forecasting
  - foundation-models
  - transfer-learning
---

## Overview

Time series foundation models learn reusable temporal representations or forecasting behavior from broad collections of time series. A pretrained model can then forecast new series directly or adapt its parameters to a target task. Their defining feature is reusable pretraining across series, rather than any single architecture or parameter count.

## Key Ideas

- **Long-term dynamics require distinct evaluation:** [[concepts/dynamical-systems-reconstruction|Dynamical Systems Reconstruction]] assesses attractor occupation and temporal statistics beyond pointwise forecast error. DynaMix's synthetic-system experiments show how context repetition or eventual collapse can coexist with plausible near-term forecasts; its empirical results also show that stronger dynamical metrics need not yield lower MAE.
- **Specialization can occur within a series:** MOIRAI-MOE uses shared projections and [[concepts/sparse-mixture-of-experts|sparse expert routing]] to specialize by patch-token patterns rather than sampling frequency. Its results distinguish the small parameter subset activated per token from the substantially larger total model capacity.
- **Architecture and pretraining are separate choices:** Temporal models can use transformers or MLP mixing, as illustrated by TTM in Marconi's report. Using a language-model architecture does not by itself establish that a model inherited text-pretrained weights.
- **Patches connect numeric data to sequence models:** TimesFM embeds consecutive observations as tokens and trains a causal transformer to forecast after each input patch. Output patches can be longer than input patches, reducing autoregressive rollout steps. Partial first-patch masking exposes different history lengths during training.
- **Pretraining diversity includes temporal frequency:** TimesFM mixes real series with synthetic trends, ARMA processes, and seasonal components. Its synthetic-data ablation improves coverage of underrepresented frequencies, with gains on 15-minute ETT data and little change on hourly ETT; this is evidence for that data mixture, not a guarantee across domains.
- **Governing-system diversity differs from sample volume:** [[papers/panda-a-pretrained-forecast-model-for-chaotic-dynamics|Panda]] improves held-out chaotic-system forecasts by increasing the number of unique training systems while keeping total timepoints fixed and reducing initial conditions per system. Holding out founder systems and their descendants tests transfer across equation families within its synthetic generation process.
- **Channel handling matters:** A shared channel-independent backbone can operate across different variables, while multivariate adaptation may add mechanisms for cross-channel interactions. Multivariate input support alone does not explain how covariates influence predictions.
- **Adaptation changes the question:** Zero-shot forecasting tests immediate use of pretrained weights; fine-tuning tests their usefulness as an initialization. A frozen backbone with a trained module is another adaptation regime and should be identified explicitly.
- **Evaluate transfer and practical accuracy separately:** Lower error than the same architecture trained from scratch can coexist with worse performance than a simple statistical model. Learning curves help identify whether pretraining mainly reduces target-data requirements.
- **Frequency and horizon can reverse rankings:** In the EU ETS carbon-price benchmark, MOIRAI leads average daily MAPE beyond 40 days, while Lag-Llama leads monthly MAPE beyond eight months. ARIMA and random forests remain stronger in the corresponding short-horizon groups. A model's advantage at one resolution does not establish an advantage at another.
- **Time boundaries remain essential:** Historical evaluation requires attention to the dates represented in pretraining as well as target-task training. Forecast accuracy from weights exposed to later or correlated observations may overstate prospective performance.
- **Zero-shot protocols still need specification:** Fixed weights can coexist with target-data selection of context length. Report that selection, benchmark exclusions, and whether evaluation uses a final window or rolling origins. Arithmetic and geometric aggregation can also produce different model rankings, as in TimesFM's Monash results.

## Important Papers

- [[papers/multi-step-ahead-carbon-credit-price-forecasting-using-time-series-foundation-models|Multi-step ahead carbon credit price forecasting using time series foundation models]] compares five pretrained models and eleven conventional baselines on daily and monthly EU ETS prices. It demonstrates horizon-dependent rankings, with unresolved differences between headline relative gains and tabulated group means.
- [[papers/moirai-moe-empowering-time-series-foundation-models-with-sparse-mixture-of-experts|MOIRAI-MOE: Empowering Time Series Foundation Models with Sparse Mixture of Experts]] combines token-level expert specialization with decoder-only probabilistic forecasting. It improves aggregate results on 29 in-distribution and 10 held-out datasets, with similar activated parameter counts to dense MOIRAI and larger total models.
- [[papers/a-decoder-only-foundation-model-for-time-series-forecasting|A Decoder-Only Foundation Model for Time-Series Forecasting]] introduces TimesFM's numeric patch-based pretraining and evaluates zero-shot forecasting across Monash, Darts, and ETT. It achieves competitive aggregate accuracy, with qualifications from context selection, benchmark coverage, and aggregation.
- [[papers/time-series-foundation-models-for-multivariate-financial-time-series-forecasting|Time Series Foundation Models for Multivariate Financial Time Series Forecasting]] evaluates TTM and a Chronos setup on three financial tasks. It finds task-dependent transfer advantages for TTM but highlights limits from conventional baselines, tuning, and possible look-ahead bias.
- [[papers/cpiri-channel-permutation-invariant-relational-interaction-for-multivariate-time-series-forecasting|CPiRi: Channel Permutation-Invariant Relational Interaction for Multivariate Time Series Forecasting]] illustrates multivariate adaptation through trainable cross-channel attention between a frozen temporal encoder and decoder.

## Related Concepts

- [[concepts/transferability-evaluation|Transferability Evaluation]]: assessing the contribution of pretrained knowledge under comparable target-task conditions.
- [[concepts/channel-permutation-equivariance|Channel Permutation Equivariance]]: a distinct property governing how forecasts respond to variable reordering.
