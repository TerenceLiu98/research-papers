---
title: Horizon Forcing
type: concept
aliases:
  - Error Trajectory Tracing
tags:
  - time-series-forecasting
  - chaotic-systems
  - curriculum-learning
  - recurrent-neural-networks
---

## Overview

Horizon Forcing is a training curriculum for recurrent forecasting that starts with one-step prediction and progressively optimizes longer simulated trajectories. Its accompanying Error Trajectory Tracing (ETT) architecture propagates predictions and hidden states through shared recurrent cells, letting future losses assign credit to local prediction errors.

## Key Ideas

- **Optimize consequences of local errors.** In chaotic dynamics, equally small errors can lead to very different future deviations. The training signal evaluates how errors evolve through the learned dynamics.
- **Extend the horizon gradually.** Begin with a teacher-forced model and initialize each longer rollout stage from the preceding trained model. Directly optimizing a distant endpoint can reward trajectories that diverge before accidentally realigning.
- **Share transition parameters.** ETT towers reuse the base cell's weights, so gradients through future predicted inputs update the same transition rule used at every step.
- **Distinguish the objective from a stability guarantee.** The proposed Lyapunov horizon loss is a log ratio of future error magnitude to initial error magnitude, added to one-step squared error. It does not establish a bound on future forecasting errors.
- **Separate training depth from useful forecast duration.** HF20 denotes a training tower horizon, not a promise of exactly 20 valid predictions. Evaluation measures the first crossing of a chosen error threshold by the average test error curve.
- **Expect a computation and coverage tradeoff.** Longer towers increase training cost, and sparse horizon losses can miss intermediate deviations. The published results show strong gains on simulated chaotic systems but mixed rankings on real-world series.

## Important Papers

- [[papers/horizon-forcing-improving-the-recurrent-forecasting-of-chaotic-systems|Horizon Forcing: Improving the Recurrent Forecasting of Chaotic Systems]] introduces ETT and the staged curriculum, with direct-versus-staged horizon ablations and nine datasets.

## Related Concepts

- [[concepts/exposure-bias|Exposure Bias]] motivates training on the model-generated histories encountered in deployment.
- [[concepts/scheduled-autoregressive-bptt|Scheduled Autoregressive BPTT]] changes the probability of generated inputs while retaining feedback gradients; Horizon Forcing instead grows the depth over which future errors are optimized.
