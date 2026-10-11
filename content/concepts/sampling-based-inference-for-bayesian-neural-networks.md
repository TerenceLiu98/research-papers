---
title: Sampling-Based Inference for Bayesian Neural Networks
type: concept
aliases:
  - BNN Posterior Sampling
tags:
  - bayesian-neural-networks
  - posterior-sampling
  - uncertainty-quantification
---

## Overview

Sampling-based inference represents a Bayesian neural-network posterior through sampled parameter vectors and approximates predictions by averaging their predictive distributions. In the setting considered here, the likelihood and prior are explicit and differentiable, enabling gradient-based MCMC. This differs from simulation-based inference with an unavailable likelihood.

## Key Ideas

- **Flexible representation, approximate computation.** A sample collection avoids committing to a fixed parametric posterior family. Finite runs can still miss modes, remain correlated, and incur initialization or discretization error.
- **Optimization can initialize exploration.** Independent optimized networks can warm-start parallel chains. An ensemble of point estimates does not generally constitute posterior samples; subsequent exploration and appropriate aggregation remain necessary.
- **Scalability has several costs.** Stochastic gradients reduce per-step data processing, while parallel chains distribute exploration. Neither removes the storage of sampled weights or repeated forward passes at prediction time.
- **Diagnostics and prediction answer different questions.** Parameter symmetries complicate parameter-space convergence checks. Predictive agreement can also conceal inadequate exploration, and good accuracy or calibration does not prove posterior fidelity.
- **The stochastic subset is a modeling choice.** Sampling a subnetwork or adapter with remaining weights fixed can make inference feasible, but it changes the inferential target relative to a fully stochastic network.

## Important Papers

- [[papers/position-the-time-for-sampling-is-now-charting-a-new-course-for-bayesian-deep-learning|Position: The Time for Sampling Is Now! Charting a New Course for Bayesian Deep Learning]]: argues for parallel warm starts and an end-to-end workflow covering sampling, storage, compression, and serving; acknowledges finite-budget convergence limits.
- [[papers/do-bayesian-neural-networks-need-to-be-fully-stochastic|Do Bayesian Neural Networks Need To Be Fully Stochastic?]]: compares full and subset inference and finds predictive disagreement across released HMC chains under corruption.

## Related Concepts

- [[concepts/posterior-sample-distillation|Posterior Sample Distillation]]: compresses sample collections for downstream use.
- [[concepts/partially-stochastic-neural-networks|Partially Stochastic Neural Networks]]: restricts which parameters receive distributional treatment.
- [[concepts/probability-calibration|Probability Calibration]]: evaluates predictive probabilities independently of posterior exploration.
