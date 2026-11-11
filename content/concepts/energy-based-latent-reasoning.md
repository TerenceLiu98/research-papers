---
title: Energy-Based Latent Reasoning
type: concept
tags:
  - energy-based-models
  - latent-reasoning
---

## Overview

Energy-based latent reasoning defines recurrent computation through the gradient of a learned scalar energy over hidden states conditioned on a problem. A decoder maps refined states to candidate answers. The energy therefore supplies both an update direction and a score for comparing trajectories.

## Key Ideas

- Latent energy descent refines internal representations rather than directly optimizing discrete answer tokens.
- Noise and projection can support exploration while keeping states bounded. Independent initializations can reach different solution modes.
- Tangent-gradient norms provide stopping signals under constrained descent; low gradients alone do not certify a correct answer.
- Training through gradient updates requires second-order derivatives. Segment-wise supervision and truncated backpropagation bound memory cost.
- Matching persistent trajectories to alternative valid targets can shape multiple solution basins, but target availability and matching rules affect diversity.

## Important Papers

- [[papers/energy-based-reasoners-your-recurrent-reasoner-should-be-an-energy-based-model|Energy-Based Reasoners]] unifies latent refinement, candidate ranking, and adaptive stopping with a learned energy, and introduces state-based explorative modeling for multi-solution tasks.

## Related Concepts

- [[concepts/latent-reasoning|Latent Reasoning]]
- [[concepts/adaptive-computation|Adaptive Computation]]
- [[concepts/stochastic-latent-trajectory-search|Stochastic Latent Trajectory Search]]
