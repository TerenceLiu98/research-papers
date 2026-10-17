---
title: Hierarchical Diffusion Planning
type: concept
tags:
  - hierarchical-planning
  - diffusion-models
  - offline-reinforcement-learning
---

## Overview

Hierarchical diffusion planning decomposes trajectory generation into a coarse sequence of subgoals and dense local plans connecting them. Diffusion models generate both levels by iterative denoising. Temporal abstraction shortens the high-level sequence while a shared low-level model recovers action detail.

## Key Ideas

- **Temporal subsampling expands coverage in time.** Selecting every $K$-th state lets a fixed temporal convolution span more environment steps. This increases the effective receptive field without requiring larger convolution kernels.
- **Condition local plans on their endpoints.** Clamp the starting and ending subgoal states during low-level denoising. Conditional on the high-level plan, separate segments can be sampled in parallel.
- **Guidance operates at different scales.** A high-level return predictor targets the full trajectory's return from sparse inputs; a low-level predictor targets segment return. Preserving intermediate actions alongside sparse states can help recover information needed by the high-level predictor.
- **Execution determines which segments are needed.** Open-loop control can execute the concatenated plan. Receding-horizon control needs only the first local segment before executing one action and replanning.
- **Abstraction has a cost.** Larger subgoal intervals reduce sequence length but discard state information. Dataset coverage, feasible connections, and guidance accuracy remain constraints; performance need not increase monotonically with the interval.
- **Composition is an empirical capability.** Combining familiar segments can produce routes between unseen start-goal pairs. Success on a constructed maze task does not establish general feasibility or arbitrary out-of-distribution control.

## Important Papers

- [[papers/simple-hierarchical-planning-with-diffusion|Simple Hierarchical Planning with Diffusion]] introduces fixed-interval Sparse Diffuser, low-level refinement in Hierarchical Diffuser, and dense-action variants. It evaluates both benchmark control and a constructed compositional navigation task.
- Li et al. (2023), "Hierarchical Diffusion for Offline Decision Making": a related hierarchical approach with explicit subgoal preprocessing, described and evaluated as HDMI in the paper above.
- Janner et al. (2022), "Planning with Diffusion for Flexible Behavior Synthesis": the flat trajectory-diffusion foundation used by Hierarchical Diffuser.

## Related Concepts

- [[concepts/diffusion-models|Diffusion Models]] supply trajectory priors and guided denoising.
- [[concepts/world-models|World Models]] provide the broader setting of planning with learned environment structure.
