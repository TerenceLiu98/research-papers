---
title: Local-Support Updates
type: concept
aliases:
  - Local Support Learning
  - LSL
tags:
  - continual-learning
  - catastrophic-forgetting
  - support-estimation
  - adapter-routing
---

## Overview

Local-support updates restrict a learned parameter update to inputs or activations from the distribution that produced it. In sequential post-training, this turns an otherwise global adapter into a conditional update: the frozen model handles inputs outside the new phase's estimated support, while the adapter acts within it.

## Key Ideas

- A matrix update generally changes outputs for every input not orthogonal to it, so restricting an update in weight space does not by itself restrict where its functional effect occurs.
- A gate estimates the current phase's support in activation space and conditionally enables its adapter. Gates can operate per matrix, allowing routing decisions to use contextual representations at different network depths.
- Gate errors divide into deficit, rejecting current-phase inputs, and excess, accepting inputs beyond the current support. Excess is particularly relevant to forgetting because it exposes other distributions to the update.
- Density estimators provide a locality bias because their likelihood tends to fall away from observed data. Fixed-size parametric estimators trade memory efficiency for assumptions about how well their family represents the activation distribution.
- Local estimators such as unions of neighborhoods make weaker shape assumptions but may require memory that grows with the number of representative activations.

## Important Papers

- [[papers/local-support-learning|Local Support Learning]]: introduces per-matrix Gaussian-mixture gates for routing phase-specific adapters without access to prior-phase data.
- Saha et al. (2021), "Gradient Projection Memory for Continual Learning": restricts new gradients using subspaces estimated from prior-task inputs, a related but prior-data-dependent approach.

## Related Concepts

- [[concepts/continual-learning|Continual Learning]]
- [[concepts/gaussian-mixture-models|Gaussian Mixture Models]]
- Support estimation
- Parameter-efficient finetuning
- Catastrophic forgetting
