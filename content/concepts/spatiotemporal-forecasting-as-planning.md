---
title: Spatiotemporal Forecasting as Planning
type: concept
aliases:
  - Forecasting as Planning
tags:
  - spatiotemporal-forecasting
  - model-based-reinforcement-learning
  - world-models
  - scientific-machine-learning
---

## Overview

Spatiotemporal forecasting as planning treats a forecast as the outcome of searching possible futures rather than only applying a predictor once. A learned dynamics model supplies candidate evolutions, a domain-specific score ranks them, and selected candidates can supervise a forecasting policy. This is useful when the scientific objective is computable but non-differentiable, so it cannot directly replace a conventional training loss.

## Key Ideas

- **Separate proposal, simulation, and evaluation.** A policy proposes a conditioning action, a [[concepts/world-models|World Model]] generates possible futures, and a planner evaluates those futures. Each component can fail independently.
- **Turn evaluation into supervision.** A black-box metric can select a candidate without providing gradients. Training on the selected future distills the search result into the policy through an ordinary differentiable loss.
- **Diversity determines search value.** Planning helps only when the generator covers plausible alternatives that differ on the reward. A deterministic predictor gives the planner little meaningful choice.
- **Scientific metrics expose the proxy-objective gap.** Threshold-based event scores, spectral errors, and structural measures can favor outcomes that pixel-wise averages suppress. Metric-guided planning makes that preference explicit.
- **Reward availability matters.** Metrics defined against an observed future are suitable for offline pseudo-label construction, but cannot score deployment-time candidates before that future is observed. A practical system must distinguish training-time selection from test-time inference or provide a reference-free reward.
- **Model error can become reward error.** Search may select artifacts that score well inside a learned simulator but are not physically plausible. World-model fidelity and reward robustness therefore limit the method jointly.
- **Search creates a compute-quality trade-off.** Wider beams examine more futures but increase latency. Distilling selected futures may reduce later search needs, but this must be evaluated rather than assumed.

## Important Papers

- [[papers/spatiotemporal-forecasting-as-planning|Spatiotemporal Forecasting as Planning: A Model-Based Reinforcement Learning Approach with Generative World Models]] introduces SFP, combining a conditional vector-quantized world model, beam-search selection under scientific metrics, and pseudo-label policy updates.
- Hafner et al. (2019), "Learning latent dynamics for planning from pixels," is a cited foundation for planning in learned latent dynamics.
- Moerland et al. (2023), "Model-based reinforcement learning: A survey," situates learned-model planning within the broader MBRL literature.

## Related Concepts

- [[concepts/world-models|World Models]] provide learned transition dynamics for imagined rollouts.
- [[concepts/latent-space-time-series-forecasting|Latent-Space Time Series Forecasting]] learns predictive latent dynamics without necessarily searching candidates against a reward.
- [[concepts/hierarchical-diffusion-planning|Hierarchical Diffusion Planning]] also searches generated trajectories, but targets offline control through temporal decomposition rather than scientific forecast metrics.
- [[concepts/vector-quantized-latent-factor-models|Vector-Quantized Latent Factor Models]] use discrete codebooks to represent structured temporal variation.
