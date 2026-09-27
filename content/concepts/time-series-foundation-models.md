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

- **Architecture and pretraining are separate choices:** Temporal models can use transformers or MLP mixing, as illustrated by TTM in Marconi's report. Using a language-model architecture does not by itself establish that a model inherited text-pretrained weights.
- **Channel handling matters:** A shared channel-independent backbone can operate across different variables, while multivariate adaptation may add mechanisms for cross-channel interactions. Multivariate input support alone does not explain how covariates influence predictions.
- **Adaptation changes the question:** Zero-shot forecasting tests immediate use of pretrained weights; fine-tuning tests their usefulness as an initialization. A frozen backbone with a trained module is another adaptation regime and should be identified explicitly.
- **Evaluate transfer and practical accuracy separately:** Lower error than the same architecture trained from scratch can coexist with worse performance than a simple statistical model. Learning curves help identify whether pretraining mainly reduces target-data requirements.
- **Time boundaries remain essential:** Historical evaluation requires attention to the dates represented in pretraining as well as target-task training. Forecast accuracy from weights exposed to later or correlated observations may overstate prospective performance.

## Important Papers

- [[papers/time-series-foundation-models-for-multivariate-financial-time-series-forecasting|Time Series Foundation Models for Multivariate Financial Time Series Forecasting]] evaluates TTM and a Chronos setup on three financial tasks. It finds task-dependent transfer advantages for TTM but highlights limits from conventional baselines, tuning, and possible look-ahead bias.
- [[papers/cpiri-channel-permutation-invariant-relational-interaction-for-multivariate-time-series-forecasting|CPiRi: Channel Permutation-Invariant Relational Interaction for Multivariate Time Series Forecasting]] illustrates multivariate adaptation through trainable cross-channel attention between a frozen temporal encoder and decoder.

## Related Concepts

- [[concepts/transferability-evaluation|Transferability Evaluation]]: assessing the contribution of pretrained knowledge under comparable target-task conditions.
- [[concepts/channel-permutation-equivariance|Channel Permutation Equivariance]]: a distinct property governing how forecasts respond to variable reordering.
