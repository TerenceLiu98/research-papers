---
title: Stochastic Latent Trajectory Search
type: concept
aliases:
  - Stochastic Latent Rollouts
  - Latent Width Scaling
tags:
  - latent-reasoning
  - test-time-compute
  - stochastic-inference
  - verifier-guided-selection
---

## Overview

Stochastic latent trajectory search scales inference by running multiple perturbed trajectories through a recurrent model's hidden state and selecting among their decoded answers. It applies sampling-based search to [[concepts/latent-reasoning|Latent Reasoning]]: diversity arises inside the recursive computation rather than from generating multiple textual chains of thought.

The approach is most useful when deterministic recurrence can settle into an incorrect attractor even though another reachable trajectory produces the right answer. Its practical value depends on two separable capabilities: generating at least one correct candidate and recognizing that candidate without access to ground truth.

## Key Ideas

- **Exploration and selection are distinct.** Oracle pass@$K$ measures whether any of $K$ trajectories succeeds. A learned verifier, voting rule, or constraint checker determines how much of that potential becomes deployable accuracy.
- **Width complements recurrent depth.** More recursive steps extend one sequential path, whereas more rollouts explore multiple paths that can often run in parallel. Equal wall-clock time does not imply equal total compute.
- **Perturbation location matters.** Noise can be applied once to the initial state or repeatedly during recurrence. Recurrent perturbations can create later opportunities to leave an incorrect latent region.
- **The verifier can become the bottleneck.** A growing pass@$K$ with flat selected accuracy means exploration is working but candidate ranking is not. Calibration should therefore be evaluated separately for each task and noise regime.
- **Noise schedules are task-dependent.** Too little noise may preserve deterministic failures, while too much can disrupt useful computation. Rollout width, recurrent depth, and noise scale form interacting inference hyperparameters.
- **Mechanistic language requires restraint.** Projected clusters, fixed points, and changes in decoded accuracy can support an attractor interpretation, but low-dimensional visualizations alone do not establish a unique causal geometry.

## Important Papers

- [[papers/probabilistic-tiny-recursive-model|Probabilistic Tiny Recursive Model]]: injects Gaussian noise at every deep TRM recursion step and selects among parallel candidates with the pretrained Q head.
- Baek et al. (2026), "Generative Recursive Reasoning Models": introduces stochastic hidden-state generation with retraining.
- Efstathiou and Balwani (2026), "Recursive Reasoning as Attractor Landscape Search": studies inference-time perturbation of a recursive reasoner's initial hidden state.
- [[papers/diffusion-as-a-training-curriculum-for-timestep-free-iterative-reasoning|Diffusion as a Training Curriculum for Timestep-Free Iterative Reasoning]]: repeatedly injects noise during a single recurrent trajectory while persistent memory carries computation, illustrating a related stochastic-inference design without best-of-$K$ selection.

## Related Concepts

- [[concepts/latent-reasoning|Latent Reasoning]]: the broader family of methods that perform task-relevant computation in hidden representations.
- [[concepts/adaptive-computation|Adaptive Computation]]: varies or halts recurrent processing; stochastic trajectory search instead emphasizes parallel candidate exploration, though the two can be combined.
- [[concepts/adaptive-test-time-reasoning-routing|Adaptive Test-Time Reasoning Routing]]: allocates inference procedures and budgets per query, potentially including parallel candidates and early stopping.
