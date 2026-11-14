---
title: Poincaré Inequality
type: concept
tags:
  - functional-inequalities
  - markov-processes
---

## Overview

The Poincaré inequality bounds the variance of a function by its average gradient energy. For a probability measure $\pi$, use the rate convention

$$
\gamma\operatorname{Var}_\pi(f)\le\mathbb E_\pi\|\nabla f\|^2.
$$

## Key Ideas

For the reversible overdamped Langevin generator with noise coefficient $\sqrt2$, the optimal $\gamma$ is the spectral gap. The inequality implies chi-squared divergence decay at rate $2\gamma$, when the initial divergence is finite. Products preserve the smallest component rate, and an $L$-Lipschitz transport degrades the rate by at most $L^2$.

PI implies exponential concentration for Lipschitz observables but need not imply Gaussian concentration or logarithmic Sobolev control. The unit-rate exponential law has sharp rate $1/4$ and no positive LSI rate. Weak inequalities accommodate slower relaxation for heavy-tailed measures; weighted inequalities instead change the diffusion's energy and can restore exponential relaxation.

## Important Papers

- [[papers/geometric-functional-inequalities-for-markov-processes-an-invitation-via-the-langevin-diffusion|Geometric Functional Inequalities for Markov Processes: An Invitation via the Langevin Diffusion]]: tutorial deriving the inequality’s dynamical meaning and transfer principles (Sections 2.2–2.6).

## Related Concepts

- [[concepts/logarithmic-sobolev-inequality]]
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]
