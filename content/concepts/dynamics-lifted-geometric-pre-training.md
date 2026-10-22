---
title: Dynamics-Lifted Geometric Pre-Training
type: concept
aliases:
  - Lifted Geometric Pre-Training
  - Dynamics-Lifted Pre-Training
tags:
  - geometric-pre-training
  - self-supervised-learning
  - neural-simulation
  - neural-operators
---

## Overview

Dynamics-lifted geometric pre-training is a self-supervised strategy for learning neural-simulator representations from static geometry. It augments each geometry with synthetic motion conditions and trains a model to predict how geometry-derived features change along the resulting trajectories. The lifting matters because downstream simulation depends on both boundaries and driving conditions, whereas ordinary geometry reconstruction contains no representation of their interaction.

## Key Ideas

- **Lift the input and target together.** Static geometry $G$ is paired with a sampled pointwise velocity field $V$, and a static geometric feature becomes a time-indexed trajectory. The model therefore learns a map from $(G,V)$ rather than from $G$ alone.
- **Generate supervision without a physics solver.** Query points move under simple free-flight dynamics and stop when they meet the geometry boundary. Vector-distance features along these paths are computed from the mesh, so the pretext labels require geometry operations rather than CFD or finite-element simulation.
- **Reuse the conditioning interface downstream.** Random velocities create diverse pre-training cases. During fine-tuning, they are replaced by velocity fields encoding the actual simulation conditions, such as flow direction and speed or impact direction.
- **Treat static pre-training as a degenerate slice.** When motion is removed, or only the initial time is retained, trajectory prediction reduces to ordinary geometric-feature prediction. Learning the velocity-conditioned family can retain correlations that its static expectation cannot.
- **Use synthetic dynamics as a prior, not a surrogate governing law.** The free-flight process corresponds to collisionless transport with boundary sticking and conserves phase-space mass. This supplies an inductive bias for propagation and boundary interaction, but does not by itself encode the full equations of fluid, solid, or radiative transport.
- **Diversity has two axes.** More base geometries broaden boundary structure, while more sampled dynamics broaden conditional behavior. Their relative value depends on downstream variation; geometry diversity is broadly useful, while dynamics diversity matters more when speed and direction vary substantially.

## Important Papers

- [[GeoPT: Scaling Physics Simulation via Lifted Geometric Pre-Training]]
- Zhang, Wu, Zhang, and Wang (2026), "From cheap geometry to expensive physics: A physics-agnostic pretraining framework for neural operators."
- Herde et al. (2024), "Poseidon: Efficient foundation models for PDEs."
- Hao et al. (2024), "DPOT: Auto-regressive denoising operator transformer for large-scale PDE pre-training."

## Related Concepts

- [[Neural Operators]]
- Self-supervised learning
- Geometric deep learning
- Transport equations
- Physics foundation models
- Scientific machine learning
