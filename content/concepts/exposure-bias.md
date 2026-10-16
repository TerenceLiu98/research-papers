---
title: Exposure Bias
type: concept
tags:
  - autoregressive-models
  - sequence-modeling
  - time-series-forecasting
---

## Overview

Exposure bias is the mismatch between the histories a sequential model receives during training and those it encounters when generating its own future inputs. Under teacher forcing, histories come from observed data. During an autoregressive rollout, prediction errors alter the histories on which later predictions depend.

## Key Ideas

- **One-step accuracy and rollout accuracy differ.** Low error conditioned on observed inputs need not imply accurate trajectories when model outputs are fed back repeatedly.
- **Input exposure and gradient flow are separate choices.** Scheduled sampling can introduce generated inputs; differentiable autoregressive training also assigns credit through the predictions that produced those inputs.
- **Validation should reflect deployment.** Autoregressive validation measures the behavior required in free-running forecasts and can reveal deterioration hidden by falling teacher-forced loss.
- **The benefit of correction is empirical.** In the cited forecasting study, scheduled autoregression improves spatial cylinder-flow forecasts but offers little or no improvement on Mackey-Glass and Darwin pressure series. Exposure mismatch alone does not establish the size of its performance impact.

## Important Papers

- [[papers/learning-from-predictions-fusing-training-and-autoregressive-inference-for-long-term-spatiotemporal-forecasts|Learning from Predictions]] compares teacher forcing, scheduled sampling, and differentiable scheduled autoregression in deterministic forecasting.
- Bengio et al. (2015), "Scheduled sampling for sequence prediction with recurrent neural networks," is the input-curriculum precedent cited by that study.
- Schmidt (2019), "Generalization in generation: A closer look at exposure bias," is cited there for the exposure-bias framing.

## Related Concepts

- [[concepts/scheduled-autoregressive-bptt|Scheduled Autoregressive BPTT]] combines changing input exposure with gradients through continuous feedback.
- [[concepts/latent-space-time-series-forecasting|Latent-Space Time Series Forecasting]] can also encounter generated histories when latent predictions are rolled forward.
