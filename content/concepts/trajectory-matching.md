---
title: Trajectory Matching
type: concept
aliases:
  - Action-Trajectory Matching
tags:
  - discrete-flow-matching
  - structured-generation
  - continuous-time-markov-chains
---

## Overview

Trajectory matching is a discrete [[concepts/flow-matching|Flow Matching]] framework that conditions tractable training dynamics on a complete sequence of actions connecting source and target states. The sequence fixes which actions occur and in what order; a continuous-time Markov chain randomizes when they occur. Marginalizing over a distribution of valid trajectories yields a flow that can express size-changing, multi-component, and prerequisite-dependent actions.

This meaning differs from [[concepts/trajectory-flow-matching|Trajectory Flow Matching]], where trajectories are temporally coupled observation paths in irregular time-series data.

## Key Ideas

- **Actions replace component edits.** A state exposes a set of available actions, and an action may change several components, alter state size, or become available only after prerequisite actions.
- **Full trajectories make conditional rates tractable.** Once an action ordering is fixed, the conditional process needs to determine only execution times. With uniformly distributed action times, the number completed by time $t$ is binomial and the next-action rate has a closed form.
- **Conditional targets recover a marginal flow.** Averaging valid trajectory-conditioned rates given the current state produces a marginal rate whose continuous-time Markov chain transports the source distribution to the target distribution.
- **The trajectory distribution is an inductive bias.** Uniform permutations represent independent actions; linear extensions represent partial-order dependencies; latent decompositions handle endpoints reachable through different action sets.
- **Rao-Blackwellization reduces target variance.** Averaging over compatible trajectory continuations supervises multiple currently available actions when tractable. Independent actions recover factorized discrete flow matching, while a dependency chain recovers next-action autoregressive supervision.
- **Training and sampling need not share sequentiality.** A sampled training trajectory has one next action, but the learned marginal rate can assign mass to many compatible actions, allowing several actions within an Euler step.

## Important Papers

- [[papers/trajectory-matching-discrete-flow-matching-with-structured-actions|Trajectory Matching: Discrete Flow Matching with Structured Actions]]: introduces the framework, proves marginal-flow recovery and the factorized-flow special case, and evaluates structured actions on tree and molecular graph generation.
- Gat et al. (2024), “Discrete Flow Matching”: supplies a principal fixed-size, factorized special case.
- Holderrieth et al. (2024), “Generator Matching”: provides the broader Markov-generator matching perspective.
- Havasi et al. (2025), “Edit Flows: Flow Matching with Edit Operations”: a variable-length edit model whose marginal rates can be recovered by trajectory matching under alignment-induced action trajectories.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: learns marginal dynamics from tractable conditional regression targets.
- [[concepts/trajectory-flow-matching|Trajectory Flow Matching]]: preserves temporal couplings between observations rather than ordering discrete construction actions.
- [[concepts/diffusion-models|Diffusion Models]]: related iterative generative models, including discrete-state methods based on component-wise corruption and denoising.
