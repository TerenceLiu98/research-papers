---
title: Drifting Models
type: concept
aliases:
  - Drifting Model
tags:
  - generative-models
  - one-step-generation
  - kernel-methods
---

## Overview

Drifting Models learn a static noise-to-data map by prescribing how its generated samples should move during training. The current generated distribution and the target distribution determine a drifting field. Regression toward stopped, drifted targets changes the generator's parameters, while inference uses one generator evaluation.

## Key Ideas

- **Training-time distribution evolution.** For $q_\theta=(f_\theta)_\#p_\epsilon$, parameter updates change the pushforward distribution. The generator does not need to integrate the drifting field when sampling.
- **Attraction and repulsion.** The main construction subtracts a kernel-weighted mean shift toward generated negatives from a mean shift toward real positives. Normalized kernels determine which examples contribute strongly.
- **Stopped targets.** With $x=f_\theta(\epsilon)$, the loss $\|x-\operatorname{sg}(x+V(x))\|^2$ has output gradient $-2V(x)$. Its value equals squared drift, but the target is frozen during differentiation.
- **Equilibrium is directional.** Antisymmetry, $V_{p,q}=-V_{q,p}$, gives $p=q\Rightarrow V=0$. The reverse implication needs additional identifiability assumptions; neither implication establishes convergence of neural-network training.
- **Features define the practical comparison.** Image experiments compute drift across multiple pretrained feature scales and locations. This avoids uninformative raw-space similarities but makes performance depend on the representation. Feature extraction is a training operation, distinct from a latent generator's required inference decoder.
- **Guidance can be learned.** Mixing unconditional real examples into the negative pool and conditioning on the mixture's guidance scale preserves single-pass sampling. This differs from combining conditional and unconditional network outputs at inference.
- **Related fields need distinct foundations.** Gradients of [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]] induce related interactions. [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]] instead specify distribution dynamics from an energy and transport geometry; an arbitrary drifting field need not have that interpretation.

### Kernel-gradient extension

Replacing weighted displacements by normalized kernel gradients gives $V=\nabla\log\hat p_k-\nabla\log\hat q_k$. Gaussian displacement drifting agrees up to bandwidth scaling; other kernels generally require the gradient correction. Under regularity and characteristic-kernel assumptions, vanishing population drift identifies the target distribution. Riemannian gradients and exponential-map targets extend this construction to curved spaces, including categorical relaxations through Fisher–Rao simplex geometry. The associated KL descent argument concerns smoothed Euclidean laws, rather than a general convergence guarantee for practical training.

## Important Papers

- [[papers/generative-modeling-via-drifting|Generative Modeling via Drifting]]: introduces the field-based objective, normalized attraction-repulsion implementation, feature-space image training, and robotics experiments.
- [[papers/one-step-generative-modeling-via-wasserstein-gradient-flows|One-Step Generative Modeling via Wasserstein Gradient Flows]]: compares with Drifting and develops a Sinkhorn-energy approach to training one-step generators.

- [[papers/kernel-gradient-drifting-models|Kernel-Gradient Drifting Models]]: derives the smoothed-score field and evaluates intrinsic and categorical extensions.

## Related Concepts

- [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]]: kernel distribution comparison and its induced sample gradients.
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]: energy-driven evolution of probability distributions.
- [[concepts/flow-matching|Flow Matching]]: training transport vector fields from interpolation targets.
- [[concepts/diffusion-models|Diffusion Models]]: generation through learned reversal of a noising process.
