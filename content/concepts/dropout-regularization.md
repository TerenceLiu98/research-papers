---
title: Dropout Regularization
type: concept
aliases:
  - Dropout
definition: "Dropout regularization randomly deactivates neural units during training, changing which subnetworks receive updates and discouraging dependence on jointly active features."
tags:
  - neural-networks
  - regularization
---

## Overview

Dropout trains shared network parameters through randomly selected subnetworks. In the convention studied here, each hidden unit is active with probability r, and full-network inference rescales output weights by r. Activation probability r and dropout probability 1 − r must be distinguished when comparing rates.

## Key Ideas

- Masking changes both individual update frequency and how often units learn from the same example.
- In a tractable online teacher–student model, dropout reduces correlations between noisy components of hidden-unit weights. This can improve aggregate prediction despite weaker individual signal alignment.
- Optimal masking depends on label noise, learning rate, network width, and training duration. Strong masking can stabilize an unspecialized plateau and obstruct useful feature specialization.
- These mechanistic results are conditional on the model and training regime. In the short-time approximation, jointly tuning learning rate and activation rate favors no dropout.

## Important Papers

- [[papers/analytic-theory-of-dropout-regularization|Analytic theory of dropout regularization]]: derives high-dimensional learning dynamics and analyzes noise suppression, plateau behavior, and specialization.
- Srivastava et al. (2014), “Dropout: A simple way to prevent neural networks from overfitting”: foundational formulation cited by the analytic study.

## Related Concepts

- [[concepts/monte-carlo-dropout|Monte Carlo Dropout]]: retains stochastic masking at inference to generate a distribution of predictions, unlike deterministic full-network rescaling.
