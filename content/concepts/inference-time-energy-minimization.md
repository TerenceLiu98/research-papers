---
title: Inference-Time Energy Minimization
type: concept
aliases:
  - Energy-Guided Iterative Prediction
  - Energy-Based Test-Time Computation
tags:
  - energy-based-models
  - test-time-compute
  - iterative-inference
---

## Overview

Inference-time energy minimization treats prediction as optimization against a learned scalar compatibility function. Starting from one or more candidate predictions, the system follows gradients toward lower energy; it can spend more computation by taking additional steps and can compare candidates using their final energies.

## Key Ideas

- **Verification and generation share one function.** A forward pass scores a context-candidate pair, while the gradient of that score supplies the candidate update direction.
- **Compute is adjustable per prediction.** Optimization may stop after a fixed budget, at convergence, or according to a learned or heuristic rule. Extra steps help only when training produces useful trajectories beyond the trained horizon.
- **Relative scores enable selection.** Multiple initialized candidates can be refined and ranked by energy without a separate verifier, although unnormalized energies are not automatically calibrated probabilities.
- **Landscape quality controls behavior.** Local minima, poorly constrained regions, and overly smoothed multimodal landscapes can cause failed refinement or averaged predictions. Noise, replayed trajectories, and varied step sizes can broaden the regions trained.
- **Training requires higher-order differentiation.** When the task loss is backpropagated through energy-gradient updates, Hessian-vector products add compute and can make long optimization chains unstable.
- **It differs from diffusion.** Explicit energy models return a scalar whose gradient is computed at inference; diffusion models generally learn the score or noise update directly and condition it on a denoising schedule.

## Important Papers

- Du et al. (2022), "Learning Iterative Reasoning through Energy Minimization," develops iterative prediction through learned energy descent.
- [[papers/energy-based-transformers-are-scalable-learners-and-thinkers|Energy-Based Transformers are Scalable Learners and Thinkers]] applies the approach to autoregressive and bidirectional Transformers and studies learning and inference-compute scaling.

## Related Concepts

- [[concepts/adaptive-computation|Adaptive Computation]]
- [[concepts/latent-reasoning|Latent Reasoning]]
- [[concepts/joint-energy-based-models|Joint Energy-Based Models]]
- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/energy-constrained-diffusion|Energy-Constrained Diffusion]]
