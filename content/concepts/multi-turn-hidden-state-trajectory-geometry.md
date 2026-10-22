---
title: Multi-Turn Hidden-State Trajectory Geometry
type: concept
aliases:
  - Dialogue Hidden-State Trajectory Geometry
tags:
  - llm-agents
  - multi-turn-reasoning
  - hidden-state-monitoring
  - representation-geometry
---

## Overview

Multi-turn hidden-state trajectory geometry studies how an LLM's internal representation changes across successive interaction turns. A fixed activation site is sampled once per turn, producing a temporal path through representation space. Geometric summaries of this path can serve as diagnostics or online control signals for agent behavior.

## Key Ideas

- **The trajectory axis is dialogue time.** Each point comes from the same model layer and token-selection rule at a different turn. This differs from a depthwise trajectory that follows one input across transformer layers.
- **Directional consistency and dispersion are complementary.** Cosine similarity between consecutive state displacements detects reversals, while the slope of prefix covariance trace measures whether visited states spread out or contract.
- **Alignment is part of the measurement.** Comparing one state per turn limits mechanical differences caused by unsuccessful episodes lasting longer. Three-point statistics are unavailable during the first two turns.
- **Agent actions condition interpretation.** The same geometric signal can differ across information acquisition, environment modification, user response, and escalation patterns. Aggregate separation may therefore hide domain-specific behavior mixtures.
- **Prediction does not imply causation.** A trajectory may forecast failure because it reflects task difficulty, accumulated mistakes, or stalled behavior. Intervention experiments are needed to show whether changing the representation itself changes the outcome.
- **Online use requires access and calibration.** Monitoring intermediate activations excludes opaque API models, and thresholds may shift across model sizes, probe layers, tasks, and action distributions.

## Important Papers

- [[papers/geometry-of-divergence-tracking-hidden-state-trajectories-for-adaptive-multi-turn-reasoning|Geometry of Divergence: Tracking Hidden-State Trajectories for Adaptive Multi-Turn Reasoning]] defines temporal curvature and variance slope across turns, analyzes their action dependence, and uses them to trigger adaptive thinking on $\tau$-Bench.

## Related Concepts

- [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]: measures ordered hidden-state paths across network depth rather than interaction time.
- [[concepts/adaptive-computation|Adaptive Computation]]: uses observable signals to vary inference effort across inputs or reasoning stages.
- [[concepts/temporal-straightening|Temporal Straightening]]: regularizes latent trajectory direction during training instead of monitoring dialogue trajectories at inference.
