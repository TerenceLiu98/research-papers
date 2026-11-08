---
title: Intra-Loop Self Distillation
type: concept
aliases:
  - ILSD
tags:
  - self-distillation
  - recurrent-depth
  - adaptive-computation
  - visual-generation
---

## Overview

Intra-Loop Self Distillation (ILSD) trains a weight-shared recurrent network to produce useful representations at multiple loop depths. A maximum-depth execution acts as an online teacher for a randomly selected intermediate prefix of the same forward trajectory. The mechanism targets a common failure of looped networks: a model optimized only at its terminal depth can have poor intermediate outputs and can fail when the inference loop count differs from the training loop count.

## Key Ideas

- **One parameter set, two depths:** Teacher and student use the same shared block parameters. They differ only in how many times the block has been applied.
- **Prefix reuse:** The intermediate student state is already computed on the way to the maximum-depth teacher state, so it does not require a separate student forward pass or model copy.
- **Stochastic depth coverage:** Each training step samples an intermediate loop count $L_{int}$ below $L_{max}$, exposing the shared update to multiple exit depths across training.
- **Mixed supervision:** The maximum-depth output receives the task loss. The intermediate output receives both task supervision and a representation loss toward the stopped-gradient teacher state.
- **Curriculum:** In [[papers/elt-elastic-looped-transformers-for-visual-generation|ELT]], the task-loss weight for the intermediate state decays linearly from 1 to 0 while the distillation weight rises from 0 to 1. This avoids relying on an immature teacher early in training.
- **Elasticity is bounded:** ILSD can stabilize depths near the trained range, but it does not guarantee monotonic improvement or convergence for arbitrarily many loops. ELT reports degradation when the loop count substantially exceeds its training regime.
- **Different from step distillation:** ILSD changes repeated computation inside each generation step. Few-step diffusion distillation instead reduces the number of outer sampling or denoising steps; the two axes can in principle be combined.

## Important Papers

- [[papers/elt-elastic-looped-transformers-for-visual-generation|ELT: Elastic Looped Transformers for Visual Generation]] introduces ILSD for masked-token and diffusion-based image generation and masked-token video generation. Its ablations report substantially more stable quality when inference loop depth differs from the fixed maximum training depth.
- Salimans and Ho (2022), *Progressive Distillation for Fast Sampling of Diffusion Models*, distills outer diffusion sampling steps and helps distinguish inter-step acceleration from ILSD's intra-step elastic depth.
- Song et al. (2023), *Consistency Models*, trains consistency across noise levels for variable-step generation, a related but architecturally distinct route to flexible inference cost.

## Related Concepts

- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]: supplies the weight-shared depth structure whose intermediate loop states ILSD supervises.
- [[concepts/adaptive-computation|Adaptive Computation]]: useful intermediate exits allow a deployment system to select a loop budget, although ILSD itself does not choose that budget.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: the deeper execution supplies a stopped-gradient target to its own shallower prefix.
- [[concepts/diffusion-models|Diffusion Models]]: ILSD can vary within-step network depth independently of the number of denoising steps.
