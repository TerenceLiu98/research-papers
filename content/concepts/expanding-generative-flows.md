---
title: Expanding Generative Flows
type: concept
aliases:
  - Expanding Flow Maps
  - EFlows
  - EFMs
tags:
  - generative-models
  - flow-matching
  - variable-length-generation
---

## Overview

Expanding generative flows transport probability distributions while the state dimension increases over time. They replace the fixed canvas of ordinary [[concepts/flow-matching|Flow Matching]] with a dimension schedule, an operator that inserts new latent coordinates, and transport dynamics that denoise the enlarged state. Expanding flow maps distill this process so expansion and transport can occur in one or a few learned jumps.

## Key Ideas

- **Expanding interpolant.** A non-decreasing schedule $d(t)$ places each marginal on a potentially different state space. Existing coordinates evolve continuously while new coordinates enter at scheduled jump times.
- **Expand then transport.** Before moving from time $s$ to $t$, an expand operator raises the state from dimension $d(s)$ to $d(t)$ with conditional noise. A conventional velocity field or denoiser can then act in the enlarged space.
- **Structured placement.** New coordinates may be appended, inserted at learned positions, or attached to parent coordinates. The placement rule carries domain structure that an ordinary fixed-dimensional flow does not represent.
- **Jump-process interpretation.** Smooth denoising and stochastic insertions form a piecewise-deterministic Markov process. When no dimensions are added, the construction reduces to a standard fixed-dimensional flow.
- **Few-step maps.** An expanding flow map composes the expand operator with a finite-interval transport map. Extended diagonal and semigroup-style consistency objectives support teacher distillation or self-distillation.
- **Discrete insertion dynamics.** For sequences and graphs, a learned head predicts missing counts between active items. Each inserted token or node has a local denoising time, separating when it enters from how far it has been transported.

## Important Papers

- [[papers/expanding-flow-maps|Expanding Flow Maps]]: introduces expanding interpolants, expand operators, their jump-process formulation, and continuous and discrete EFMs for conformers, molecular graphs, and language.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: the fixed-dimensional conditional transport framework generalized by expanding flows.
- [[concepts/average-velocity-fields|Average Velocity Fields]]: finite-interval transport used for one- and few-step sampling on a fixed state space.
- [[concepts/diffusion-models|Diffusion Models]]: related iterative denoising models, including fixed-length discrete variants.
