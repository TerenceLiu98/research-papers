---
title: Serial-Token Prediction
type: concept
aliases: [STP]
tags: [time-series-forecasting, foundation-models]
---

## Overview

Serial-token prediction assigns successive forecast patches to successive prediction blocks. Later horizons receive more serial computation while the model reuses context representations, reducing the need to rerun a complete autoregressive backbone.

## Key Ideas

- In Timer-S1, each prediction block fuses the preceding hidden representations with the original observed-patch embeddings. Future ground truth is used for supervision rather than supplied as block input.
- Prediction blocks remain active at inference. This keeps the computational path aligned with training, unlike auxiliary heads discarded after training.
- A shared head reads each depth to predict a different future patch. Horizon-dependent early stopping saves computation within the configured stack; it does not provide unlimited single-pass forecasting.
- Uniform horizon supervision and short-horizon-weighted continued pretraining serve different training stages. The architecture and the weighting schedule are distinct design choices.
- Timer-S1's comparisons support this design on GIFT-Eval; they do not establish that every forecasting problem requires this architecture.

## Important Papers

- [[papers/timer-s1-a-billion-scale-time-series-foundation-model-with-serial-scaling|Timer-S1: A Billion-Scale Time Series Foundation Model with Serial Scaling]] introduces retained TimeSTP blocks and compares them with next-token and parallel multi-token forecasting under matched block counts.

## Related Concepts

- [[concepts/time-series-foundation-models|Time Series Foundation Models]]
- [[concepts/sparse-mixture-of-experts|Sparse Mixture of Experts]]: the conditional-computation component inside Timer-S1 blocks, distinct from serial prediction depth.
- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time Series Forecasting]]: Timer-S1 uses a quantile head, while serial prediction specifies how representations evolve across horizons.
