---
title: Temporal Straightening
type: concept
aliases:
  - Latent Trajectory Straightening
tags:
  - representation-learning
  - world-models
  - latent-planning
---

## Overview

Temporal straightening learns representations in which consecutive trajectory displacements point in similar directions. It targets the geometry of observed transitions, with the aim of making latent distances and action optimization more useful for planning. It is distinct from requiring a linear dynamics model: linear systems can generate curved or oscillatory trajectories, and nonlinear predictors can operate on straightened representations.

## Key Ideas

- **Directional regularization.** Given $v_t=z_{t+1}-z_t$, a local loss is $1-\cos(v_t,v_{t+1})$. It penalizes turning rather than directly shrinking displacement magnitudes. This differs from a temporal smoothness penalty $\|z_{t+1}-z_t\|^2$.
- **Prediction and collapse control remain necessary.** In the latent-planning application, curvature regularization accompanies action-conditioned prediction and stop-gradient targets. Straightening alone does not ensure informative representations or rule out degenerate embeddings.
- **Separate prediction and regularization spaces.** Spatial tokens can preserve detailed dynamics while a learned aggregation head provides a global space for straightening. The cited planning study also combines spatial and aggregated goal costs for longer horizons.
- **Conditioning has assumptions.** Near-identity linear state transitions yield a planning-Hessian conditioning bound when action and controllability conditions hold. High velocity cosine similarity constrains visited directions under speed and action assumptions; it does not by itself establish a global spectral bound or nonlinear convergence theorem.
- **Geometry is evaluated through behavior.** Distance heatmaps, trajectory visualizations, and goal-reaching success test different consequences. A more plausible distance map does not establish exact shortest-path distances, and a symmetric latent metric cannot fully encode one-way reachability.
- **Local regularity is not a long-horizon solution.** Compounding prediction errors can defeat planning even after straightening. Empirical gains should be qualified by horizon, representation, task, and planner.

## Important Papers

- [[papers/temporal-straightening-for-latent-planning|Temporal Straightening for Latent Planning]] combines JEPA prediction with curvature regularization and evaluates gradient-based open-loop and closed-loop planning in simulation.
- Goroshin, Mathieu, and LeCun (2015), "Learning to Linearize Under Uncertainty," is identified by that paper as prior work regularizing video-representation curvature.
- Henaff, Goris, and Simoncelli (2019), "Perceptual Straightening of Natural Videos," provides the perceptual motivation cited by the latent-planning paper.

## Related Concepts

- [[concepts/world-models|World Models]] supply action-conditioned predictions through which a planner optimizes controls.
- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] learn prediction targets in representation space and can incorporate geometric regularization.
- [[concepts/slow-feature-analysis|Slow Feature Analysis]] minimizes temporal variation subject to normalization constraints; straightening instead emphasizes alignment between successive displacement directions.
