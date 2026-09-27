---
title: Dynamic Hawkes Processes
type: concept
aliases:
  - Dynamic Hawkes Process
  - DHP
tags:
  - hawkes-processes
  - temporal-point-processes
  - event-prediction
  - information-diffusion
---

## Overview

Dynamic Hawkes Processes, in the formulation of Okawa et al. (2021), extend multivariate Hawkes excitation with a nonnegative function describing changes in each receiving community. That function modulates current excitation and defines a learned time scale for its decay. Communities are observed labels, such as subreddits or countries; the model estimates their dynamics rather than discovering their membership.

## Key Ideas

For events $(t_j,m_j)$, the conditional intensity of community $m$ is

$$
\lambda_m(t)=\mu_m+f_m(t)\sum_{j:t_j<t}
g_{m,m_j}\bigl(F_m(t)-F_m(t_j)\bigr),
\qquad F_m'(t)=f_m(t)\geq0.
$$

- **Time-dependent responsiveness:** $f_m(t)$ changes how the receiving community responds to past events. Its integral changes the elapsed time seen by the triggering kernel. Setting $f_m=1$ recovers the conventional Hawkes model.
- **Coupled amplitude and decay:** For an exponential kernel and constant $f_m=c$, an event contributes $c\alpha\exp[-c\beta(t-t_j)]$. The coupling is a modeling restriction; amplitude and decay cannot vary independently through this single function.
- **Tractable integration:** Substitution $u=F_m(t)-F_m(t_j)$ transforms the event contribution's integral into $\int g_{m,m_j}(u)\,du$. Exact likelihood evaluation requires a tractable antiderivative for the chosen base kernel.
- **Learn the antiderivative:** A nonnegative mixture of monotonic networks parameterizes $F_m$; automatic differentiation supplies $f_m$. The cumulative function is monotonic, while its derivative may rise and fall.
- **Receiving-community scope:** The evaluated model shares one latent function across all sources acting on the same target. Pair-specific latent functions are a proposed extension.
- **Evidence boundaries:** Better held-out prediction does not establish that fitted temporal states measure interest, awareness, or a causal transmission mechanism. Those interpretations require evidence beyond event timing.

## Important Papers

- [[papers/dynamic-hawkes-processes-for-discovering-time-evolving-communities-states-behind-diffusion-processes|Dynamic Hawkes Processes for Discovering Time-evolving Communities' States behind Diffusion Processes]]: introduces this construction, derives analytic integrated intensity, and evaluates four event datasets (Sections 4-6).

## Related Concepts

- [[concepts/monotonic-neural-networks|Monotonic Neural Networks]]: ensure the learned antiderivative has a nonnegative derivative.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: learn flexible triggering kernels with posterior uncertainty, addressing a different modeling component.
- [[concepts/synchronization-noise-in-temporal-point-processes|Synchronization Noise in Temporal Point Processes]]: concerns observation-clock offsets rather than genuine variation in event dynamics.
