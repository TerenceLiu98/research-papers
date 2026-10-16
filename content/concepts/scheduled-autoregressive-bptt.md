---
title: Scheduled Autoregressive BPTT
type: concept
aliases:
  - BPTT-SA
tags:
  - recurrent-neural-networks
  - curriculum-learning
  - spatiotemporal-forecasting
---

## Overview

Scheduled Autoregressive Backpropagation Through Time trains recurrent forecasters by gradually replacing observed inputs with their own continuous predictions while preserving gradients through the feedback path. It combines a curriculum for [[concepts/exposure-bias|Exposure Bias]] with temporal credit assignment through predicted inputs.

## Key Ideas

- **Begin with observed histories.** Early predictions from random weights are poor inputs. A schedule first emphasizes teacher forcing, then increases the probability of autoregressive feedback.
- **Sample the path, differentiate the prediction.** At each timestep a Bernoulli choice selects observed data or the previous prediction. When prediction feedback is selected, its computational graph is retained.
- **Include output feedback in temporal derivatives.** For recurrent update $f$ and output map $g$, the autoregressive hidden-state Jacobian contains the additional chain-rule term $(\partial f/\partial u_t)(\partial g/\partial h_{t-1})$. Detaching the fed-back prediction removes this term.
- **Distinguish from the scheduled-sampling comparator.** Both change training inputs, but the comparator in Learning from Predictions omits gradients through generated inputs. The distinction matters for differentiable continuous outputs.
- **Select models using rollout behavior.** The proposed procedure uses fully autoregressive validation even while training mixes input modes. Truncated BPTT still limits how far gradients travel.
- **Keep the empirical scope explicit.** The supporting study finds substantial benefits on periodic cylinder flow and weak or absent benefits on scalar time series. The method does not guarantee stable arbitrarily long rollouts.

## Important Papers

- [[papers/learning-from-predictions-fusing-training-and-autoregressive-inference-for-long-term-spatiotemporal-forecasts|Learning from Predictions]] introduces BPTT-SA and evaluates convolutional and latent-space recurrent forecasters.
- Bengio et al. (2015), "Scheduled sampling for sequence prediction with recurrent neural networks," supplies the curriculum idea adapted by BPTT-SA.

## Related Concepts

- [[concepts/exposure-bias|Exposure Bias]] motivates matching training inputs to autoregressive deployment.
- [[concepts/latent-space-time-series-forecasting|Latent-Space Time Series Forecasting]] is one architecture setting in which this training procedure is evaluated.
