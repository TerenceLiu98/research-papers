---
title: Channel-Wise Asynchronous Forecasting
type: concept
aliases:
  - Multi-Source Asynchronous Forecasting
  - Multirate Multivariate Forecasting
tags:
  - time-series-forecasting
  - multivariate-time-series
  - asynchronous-sampling
---

## Overview

Channel-wise asynchronous forecasting predicts related time series whose variables are sampled at different temporal resolutions. A shared physical history and forecast window can contain different numbers of observations and targets for each channel. Fixed but distinct sampling periods are a structured form of asynchrony; they do not cover every form of irregular observation timing.

## Key Ideas

- **Define windows in physical time.** With a common finest-resolution horizon $H$ and relative period $s_i$, channel $i$ has $H_i=\lfloor H/s_i\rfloor$ target points. Equal sequence lengths across channels would generally cover different durations.
- **Preserve observations separately from padding.** A rectangular storage array can contain forward-filled entries, provided the model excludes those entries using sampling information. Storage alignment and using interpolated values as modeling evidence are different choices.
- **Choose metric weights deliberately.** Channel-aggregated MSE first averages over each channel's valid targets and then over channels. Pooling all observed points instead gives densely sampled channels more weight. Targets at unobserved positions should not silently become synthetic ground truth.
- **Separate local processing from cross-channel exchange.** ChannelTokenFormer builds patches at each channel's resolution, summarizes them with learned channel tokens, and exchanges information between summaries. This permits dependency modeling without requiring local patches to align across channels.
- **Control the interpolation comparison.** An interpolation-based baseline differs in both preprocessing and potentially architecture. Adapted baselines that directly accept asynchronous inputs help assess the contribution of preserving observations; they need not lose on every dataset.
- **Keep robustness claims specific.** Different sampling rates, missing blocks, channel reordering, and unseen variables change different aspects of the problem. Success on one does not establish success on the others.

## Important Papers

- [[papers/towards-robust-real-world-multivariate-time-series-forecasting-a-unified-framework-for-dependency-asynchrony-and-missingness|Towards Robust Real-World Multivariate Time Series Forecasting: A Unified Framework for Dependency, Asynchrony, and Missingness]] introduces ChannelTokenFormer and evaluates asynchronous sampling together with missing input blocks. Its scope is fixed channel-specific periods, with selected real-world and adapted benchmark datasets.
- Chang et al. (2025), "Time-IMM: A Dataset and Benchmark for Irregular Multimodal Multivariate Time Series," is cited by ChannelTokenFormer for the observation setting and EPA data source.

## Related Concepts

- [[concepts/patch-masking-for-missing-time-series-inputs|Patch Masking for Missing Time-Series Inputs]] addresses additional gaps within available histories.
- [[concepts/channel-permutation-equivariance|Channel Permutation Equivariance]] concerns how forecasts transform when the same channels are reordered, independently of their sampling rates.
