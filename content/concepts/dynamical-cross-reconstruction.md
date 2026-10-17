---
title: Dynamical Cross-Reconstruction
type: concept
tags:
  - dynamical-systems
  - self-supervised-learning
  - time-series
  - representation-learning
---

## Overview

Dynamical cross-reconstruction learns a representation of shared temporal dynamics by using system information inferred from one trajectory to reconstruct another, together with the target trajectory's initial state. The intended separation is between parameters that transfer across realizations of the same process and factors unique to an individual realization.

## Key Ideas

- **Separate system and state inference.** A system encoder captures dynamics across the source window; a target-specific encoder supplies the initial condition. A recurrent decoder combines these to generate the target trajectory.
- **Pair construction defines the invariance.** Independent trajectories from the same system share system parameters while differing in initial states and noise. Arbitrary trajectories need not share those dynamics, so cross-reconstruction alone does not define a useful learning task.
- **Crops are an approximation.** PULSE replaces labeled independent pairs with random crops from the source window. This varies the starting state while assuming system identity is preserved, but leaves statistical dependence between source and target.
- **Control information leakage.** A sufficiently expressive time-varying system code can copy the target signal. PULSE constrains its dimension and temporal variation to reduce that shortcut.
- **Qualify recovery claims.** PULSE's graphical-model theorem uses acyclicity, invertible generative functions, independent same-system trajectories, and whole-sample masking. It does not establish exact factor recovery for arbitrary crop-based training or realistic physiological measurements.
- **Evaluate representations and generated dynamics separately.** Linear probes and transfer measure downstream utility. Demonstrating faithful long-run behavior of a reconstructed dynamical system requires additional evidence.

## Important Papers

- [[papers/self-supervised-dynamical-system-representations-for-physiological-time-series|Self-Supervised Dynamical System Representations for Physiological Time-Series]] introduces PULSE, independent-pair analysis, practical crop-based pretraining, and synthetic and physiological evaluations.
- Kong and Zhang (2023), "Understanding masked image modeling via learning occlusion invariant feature": the shared-information framework extended by PULSE to paired time series.

## Related Concepts

- [[concepts/disentangled-representations|Disentangled Representations]]: organizing latent information by generative factor.
- [[concepts/dynamical-systems-reconstruction|Dynamical Systems Reconstruction]]: learning generative surrogates whose dynamical fidelity is a separate evaluation target.
- [[concepts/linear-probing|Linear Probing]]: testing class information in the learned system code.
