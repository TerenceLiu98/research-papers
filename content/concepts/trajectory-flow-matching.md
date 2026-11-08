---
title: Trajectory Flow Matching
type: concept
aliases:
  - TFM
tags:
  - flow-matching
  - time-series
  - neural-differential-equations
  - irregular-sampling
---

## Overview

Trajectory Flow Matching adapts simulation-free [[concepts/flow-matching|Flow Matching]] to observations that belong to ordered trajectories. It learns local continuous-time dynamics between successive observations while conditioning on trajectory history or covariates so that matching time-indexed marginals does not discard the dependence between points on the same path.

## Key Ideas

- **Trajectory coupling matters.** A model can reproduce the marginal distribution at every time while connecting observations from different trajectories. TFM conditions its velocity field on recent history or trajectory-specific variables to distinguish paths that cross in observation space.
- **Bridge regression avoids solver backpropagation.** Training samples intermediate states from tractable bridges between adjacent observations and regresses their conditional velocity. Differential-equation integration is still needed at inference, but not inside the training loss.
- **Coupling preservation needs identifiability.** The theoretical result requires the conditioned marginal field to equal the trajectory-conditional field. Sufficient cases include deterministic successor maps, histories that uniquely distinguish paths, or unique trajectory-level conditions. These assumptions need not hold exactly in empirical data.
- **Target prediction reparameterizes velocity.** Predicting the next observation and dividing its displacement by the remaining interval yields a time-weighted form of the velocity-matching loss.
- **Irregular observation times can be modeled.** An auxiliary predictor estimates time until the next observation. This treats measurement timing as data, which can be informative when observations are event-driven rather than scheduled.
- **Uncertainty can be learned from prediction error.** A separate network predicts the squared next-observation error and supplies a state-dependent SDE noise estimate. This is an error-prediction heuristic; calibration must be evaluated separately.
- **Multi-marginal paths can smooth segment boundaries.** [[papers/longitudinal-flow-matching-for-trajectory-modeling|Longitudinal Flow Matching for Trajectory Modeling]] conditions each interval on the following segment velocity and adds a quadratic correction to the Gaussian path mean. This retains closed-form velocity and score targets while reducing the discontinuity created by chaining linear bridges.
- **Sparse marginals require an inferred coupling.** IMMFM uses pairwise-additive costs to assemble consecutive optimal transport plans into a joint multi-time coupling. This construction is tractable, but it imposes Markov and alignment assumptions rather than recovering arbitrary higher-order dependence.

## Important Papers

- [[papers/trajectory-flow-matching-with-applications-to-clinical-time-series-modeling|Trajectory Flow Matching with Applications to Clinical Time Series Modeling]]: introduces TFM, its coupling conditions, target and time prediction objectives, uncertainty loss, and clinical experiments.
- [[papers/longitudinal-flow-matching-for-trajectory-modeling|Longitudinal Flow Matching for Trajectory Modeling]]: introduces IMMFM, combining piecewise-quadratic multi-segment paths, score-and-flow SDE training, error-driven diffusion, and multi-marginal transport for longitudinal images.
- Lipman et al. (2023), "Flow Matching for Generative Modeling": establishes the conditional vector-field regression framework adapted by TFM.
- Lahlou et al. (2023), "DEUP: Direct Epistemic Uncertainty Prediction": motivates direct prediction of model error for uncertainty estimation.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: the general simulation-free vector-field learning framework.
- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time Series Forecasting]]: distributional forecasting and calibration of future uncertainty.
- [[concepts/neural-controlled-differential-equations|Neural Controlled Differential Equations]]: continuous-time representation learning from irregular observation streams.
- [[concepts/optimal-transport|Optimal Transport]]: supplies couplings used by several matching methods, whereas TFM begins from observed trajectory pairings.
