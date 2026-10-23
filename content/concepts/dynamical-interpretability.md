---
title: Dynamical Interpretability
type: concept
aliases:
  - Depthwise Dynamical Interpretability
tags:
  - mechanistic-interpretability
  - dynamical-systems
  - representation-learning
  - transformer-dynamics
---

## Overview

Dynamical interpretability treats neural-network depth as discrete time and analyzes hidden representations as trajectories under layerwise update maps. It studies convergence, stability, phase changes, collective motion, and effective dimensionality. The framework is most direct when updates are shared across depth, but it can also provide descriptive tools for untied or explicitly depth-dependent networks.

## Key Ideas

- **Choose the state space carefully:** Raw feature norms may grow with depth even when directions stabilize. Normalizing states to the unit sphere supports angular measurements but discards magnitude information.
- **Convergence is metric-specific:** Increasing cosine similarity to a terminal state indicates directional stabilization over the observed depth. It does not by itself prove an infinite-time fixed point or attractor.
- **Perturbations probe local stability:** Injecting a small hidden-state displacement and measuring downstream deviation tests local self-correction along sampled trajectories. Results depend on perturbation direction, scale, layer, and token type.
- **Token populations can specialize:** Class, register, and patch tokens may have different angular speeds, sensitivities, and convergence schedules. Pooling all tokens can conceal these differences.
- **Collective motion can be low-dimensional:** Falling stable rank and rising update coherence indicate that many token updates concentrate in fewer shared directions. These statistics support, but do not alone establish, a mean-field mechanism.
- **Linear models are local summaries:** Dynamic mode decomposition estimates a linear step operator and its modes. Eigenvalues near the unit circle describe the fitted finite trajectory; they should not be treated as a global nonlinear stability proof.
- **Phase boundaries provide context:** Abrupt changes in speed, sensitivity, or rank can be compared with independently estimated computational phases, linking trajectory geometry to candidate functional regimes.
- **Trajectory axes must remain explicit:** Treating layers as time differs from tracking final-layer states across generated tokens. Both admit dynamical summaries, but evidence about depthwise convergence cannot be transferred automatically to generation-time smoothness or attraction.

## Important Papers

- [[papers/block-recurrent-dynamics-in-vits|Block-Recurrent Dynamics in ViTs]] introduces the term and applies angular convergence, perturbations, update-rank analysis, coherence, and dynamic mode decomposition to DINOv2 token trajectories.
- Schmid (2022), "Dynamic Mode Decomposition and Its Variants," surveys the linear decomposition used to summarize depthwise token dynamics.
- Ostrow et al. (2023), "Beyond Geometry: Comparing the Temporal Structure of Computation in Neural Circuits with Dynamical Similarity Analysis," motivates comparisons based on temporal dynamics.
- Lu et al. (2019), "Understanding and Improving Transformer From a Multi-Particle Dynamic System Point of View," develops an earlier dynamical-systems perspective on self-attention.
- [[papers/latent-trajectory-dynamics-in-large-language-models-a-manifold-evolution-framework-with-empirical-validation|Latent Trajectory Dynamics in Large Language Models]] models generation-time hidden states with continuity, clustering, and topological proxies and applies continuity to adaptive decoding; the proposed potential and attractors remain phenomenological.

## Related Concepts

- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]: supplies repeated phase-local update rules that make the discrete-time view especially concrete.
- [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]: measures path length, curvature, semantic separation, and similarity across layers.
- [[concepts/transformer-green-operators|Transformer Green Operators]]: characterize local propagation of infinitesimal interventions through depth.
- [[concepts/dynamical-systems-reconstruction|Dynamical Systems Reconstruction]]: recovers latent dynamics from observed sequences, whereas dynamical interpretability analyzes trajectories inside a known network.
